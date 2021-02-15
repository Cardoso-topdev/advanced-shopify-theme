/*
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
Table of Contents
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    - Theme View
        - Header View
            - Currency View
            - Navigation View
                - Mobile navigation View
                - Mega navigation View
        - Template View
            - Index View
                - Slideshow View
                - Instagram View
            - Collection View
            - List Collections View
            - Product View
                - Image zoom View
            - Cart View
            - Page View
            - The404View
            - Blog View

=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 */
         

(function() {
  
  var AccountView, BODY, CartView, CollectionView, CurrencyView, HeaderView, ImageZoomView, IndexView, InstagramView, ListCollectionsView, MegaNavigationView, MobileNavigationView, NavigationView, /*ProductView,*/ RTEView, SlideshowView, TOUCH, ThemeView, TwitterView, WINDOW,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  $(function() {
    return new ThemeView();
  });

  WINDOW = $(window);

  BODY = $('body');

  TOUCH = $('html').hasClass('touch');

  ThemeView = (function(superClass) {
    extend(ThemeView, superClass);

    function ThemeView() {
      return ThemeView.__super__.constructor.apply(this, arguments);
    }

    ThemeView.prototype.el = BODY;

    ThemeView.prototype.events = {
      'focus .field': 'removeErrors',
      'submit .comment-form': 'spamCheck',
      'submit .contact-form': 'spamCheck'
    };

    ThemeView.prototype.initialize = function() {
      var j, len, ref, rte;
      this.customerPage = this.$el.attr('class').indexOf('customer') > 0;
      if (navigator.userAgent.indexOf('MSIE 10.0') > 0) {
        $('html').addClass('ie10');
      }
      if ($('html').hasClass('lt-ie10')) {
        this.inputPlaceholderFix();
      }
      new HeaderView();
      ref = $('.rte');
      for (j = 0, len = ref.length; j < len; j++) {
        rte = ref[j];
        new RTEView({
          el: $(rte)
        });
      }
           new QuickShopView();	
      if (BODY.hasClass('template-index')) {	
        new IndexView({	
          el: this.$el	
        });	
      }
      
      if (BODY.hasClass('template-collection')) {
        new CollectionView({
          el: this.$el
        });
      }
      if (BODY.hasClass('template-list-collections')) {
        new ListCollectionsView({
          el: this.$el
        });
      }
      if (BODY.hasClass('template-product')) {
        /*new ProductView({
          el: this.$el
        });*/
      }
      if (BODY.hasClass('template-cart')) {
        new CartView({
          el: this.$el
        });
      }
      if ($('.content-area').hasClass('customer')) {
        new AccountView({
          el: this.$el
        });
      }
      if (Theme.currencySwitcher) {
        return new CurrencyView({
          el: this.$el
        });
      }
    };

    ThemeView.prototype.removeErrors = function(e) {
      var field;
      field = $(e.currentTarget);
      return field.removeClass('error');
    };

    ThemeView.prototype.inputPlaceholderFix = function() {
      var input, j, len, placeholders, text;
      placeholders = $('[placeholder]');
      for (j = 0, len = placeholders.length; j < len; j++) {
        input = placeholders[j];
        input = $(input);
        if (!(input.attr('value').length > 0)) {
          text = input.attr('placeholder');
          input.attr('value', text);
          input.data('original-text', text);
        }
      }
      placeholders.focus(function() {
        input = $(this);
        if (input.val() === input.data('original-text')) {
          return input.val('');
        }
      });
      return placeholders.blur(function() {
        input = $(this);
        if (input.val().length === 0) {
          return input.val(input.data('original-text'));
        }
      });
    };

    ThemeView.prototype.spamCheck = function(e) {
      if (this.$(e.target).find('.comment-check').val().length > 0) {
        return e.preventDefault();
      }
    };

    return ThemeView;

  })(Backbone.View);

  CurrencyView = (function(superClass) {
    extend(CurrencyView, superClass);

    function CurrencyView() {
      return CurrencyView.__super__.constructor.apply(this, arguments);
    }

    CurrencyView.prototype.events = {
      'change [name=currencies]': 'convertAll',
      'switch-currency': 'switchCurrency'
    };

    CurrencyView.prototype.initialize = function() {
      var cents, doubleMoney, j, k, len, len1, money, ref, ref1;
      Currency.format = Theme.currencySwitcherFormat;
      Currency.money_with_currency_format[Theme.currency] = Theme.moneyFormatCurrency;
      Currency.money_format[Theme.currency] = Theme.moneyFormat;
      this.defaultCurrency = Theme.defaultCurrency || Theme.currency;
      this.cookieCurrency = Currency.cookie.read();
      if (this.cookieCurrency) {
        this.$("[name=currencies]").val(this.cookieCurrency);
      }
      ref = this.$('span.money span.money');
      for (j = 0, len = ref.length; j < len; j++) {
        doubleMoney = ref[j];
        $(doubleMoney).parents('span.money').removeClass('money');
      }
      ref1 = this.$('span.money');
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        money = ref1[k];
        if (Currency.format === 'money_with_currency_format') {
          cents = parseInt($(money).html().replace(/[^0-9]/g, ''), 10);
          $(money).html(Shopify.formatMoney(cents, Theme.moneyFormat));
        }
        $(money).attr("data-currency-" + Theme.currency, $(money).html());
      }
      this.switchCurrency();
      return this.$('.selected-currency').text(Currency.currentCurrency);
    };

    CurrencyView.prototype.switchCurrency = function() {
      if (this.cookieCurrency === null) {
        if (Theme.currency === !this.defaultCurrency) {
          return Currency.convertAll(Theme.currency, this.defaultCurrency);
        } else {
          return Currency.currentCurrency = this.defaultCurrency;
        }
      } else if (this.$('[name=currencies]').size() && this.$('[name=currencies] option[value=' + this.cookieCurrency + ']').size() === 0) {
        Currency.currentCurrency = Theme.currency;
        return Currency.cookie.write(Theme.currency);
      } else if (this.cookieCurrency === Theme.currency) {
        return Currency.currentCurrency = Theme.currency;
      } else {
        return Currency.convertAll(Theme.currency, this.cookieCurrency);
      }
    };

    CurrencyView.prototype.convertAll = function(e, variant, selector) {
      var newCurrency;
      newCurrency = $(e.target).val();
      Currency.convertAll(Currency.currentCurrency, newCurrency);
      this.$('.selected-currency').text(Currency.currentCurrency);
      return this.cookieCurrency = newCurrency;
    };

    return CurrencyView;

  })(Backbone.View);

  HeaderView = (function(superClass) {
    extend(HeaderView, superClass);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.el = $('.main-header');

    HeaderView.prototype.events = {
      'click .tools .search': 'toggleSearch',
      'blur .search-wrap.full .search-input': 'toggleSearch',
      'click .compact .search': 'toggleMobileSearch',
      'blur .compact .search-input': 'toggleMobileSearch',
      'click .mini-cart-wrap': 'toggleMiniCart',
      'click .mini-cart.active': 'stopProp'
    };

    HeaderView.prototype.initialize = function() {
      this.tools = $('.tools');
      this.branding = $('.store-title, .logo');
      this.searchWrap = $('.search-wrap.full');
      this.mobileSearchWrap = $('.search-outer-wrap');
      this.searchInput = $('.search-input');
      this.miniCart = $('.mini-cart');
      if (Theme.centerHeader) {
        this.tools = $('.tools-left');
      }
      if (!Theme.centerHeader) {
        this.branding.imagesLoaded((function(_this) {
          return function() {
            return _this.positionHeaderTools();
          };
        })(this));
      }
      $('body').click((function(_this) {
        return function(e) {
          if (_this.miniCart.hasClass('active')) {
            _this.miniCart.hide().removeClass('active');
            return _this.miniCart.parent().removeClass('active');
          }
        };
      })(this));
      WINDOW.resize((function(_this) {
        return function() {
          _this.resize();
          if (!Theme.centerHeader) {
            return _this.positionHeaderTools();
          }
        };
      })(this));
      return new NavigationView({
        el: this.$el
      });
    };

    HeaderView.prototype.stopProp = function(e) {
      return e.stopPropagation();
    };

    HeaderView.prototype.resize = function() {
      if (WINDOW.width() < 720) {
        return this.searchWrap.hide();
      }
    };

    HeaderView.prototype.positionHeaderTools = function() {
      var offset;
      offset = (this.branding.outerHeight() - this.tools.height()) / 2;
      this.tools.css({
        marginTop: offset + 4,
        visibility: 'visible'
      });
      return this.searchWrap.css({
        marginTop: offset + 1,
        visibility: 'visible',
        'min-width': this.tools.outerWidth()
      });
    };

    HeaderView.prototype.toggleSearch = function() {
      if (this.searchWrap.hasClass('active')) {
        this.searchWrap.hide().removeClass('active');
        this.searchInput.val('');
        this.tools.css('visibility', 'visible');
      } else {
        this.searchWrap.show().addClass('active');
        this.searchInput.focus();
        this.tools.css('visibility', 'hidden');
        this.miniCart.hide().removeClass('active');
        this.miniCart.parent().removeClass('active');
      }
      return false;
    };

    HeaderView.prototype.toggleMobileSearch = function() {
      var offset;
      if (this.mobileSearchWrap.hasClass('active')) {
        this.mobileSearchWrap.hide().removeClass('active');
        return this.searchInput.val('');
      } else {
        this.mobileSearchWrap.show().addClass('active');
        offset = this.mobileSearchWrap.find('.search-wrap').outerHeight() / -2;
        this.mobileSearchWrap.find('.search-wrap').css({
          marginTop: offset
        });
        this.searchInput.focus();
        return $('.mobile-dropdown').trigger('close-mobile-nav');
      }
    };

    HeaderView.prototype.toggleMiniCart = function(e) {
      var button;
      button = this.miniCart.parent();
      if (this.miniCart.hasClass('active')) {
        this.miniCart.hide().removeClass('active');
        button.removeClass('active');
      } else {
        this.miniCart.show().addClass('active');
        button.addClass('active');
      }
      return e.stopPropagation();
    };

    return HeaderView;

  })(Backbone.View);

  NavigationView = (function(superClass) {
    extend(NavigationView, superClass);

    function NavigationView() {
      return NavigationView.__super__.constructor.apply(this, arguments);
    }

    NavigationView.prototype.events = {
      'mouseenter .dropdown': 'establishTierDirection',
      'mouseleave .dropdown': 'replaceTrailingDivider',
      'mouseenter .has-mega-nav': 'toggleMegaNav',
      'format-full-navigation': 'formatFullNavigation'
    };

    NavigationView.prototype.initialize = function() {
      var j, len, navItem, ref;
      this.navigation = $('.main-header nav.full');
      this.megaNavButton = this.navigation.find('.has-mega-nav');
      this.mainMenuNavItems = this.navigation.find('> ul > .nav-item');
      this.multiLine = false;
      this.checkIfFontsLoaded();
      this.requiredRoom = 0;
      ref = this.mainMenuNavItems;
      for (j = 0, len = ref.length; j < len; j++) {
        navItem = ref[j];
        navItem = $(navItem);
        this.requiredRoom += navItem.outerWidth();
      }
      new MobileNavigationView();
      new MegaNavigationView();
      return WINDOW.resize((function(_this) {
        return function() {
          return _this.resize();
        };
      })(this));
    };

    NavigationView.prototype.checkIfFontsLoaded = function() {
      var checker, hasRun;
      hasRun = 0;
      return checker = setInterval((function(_this) {
        return function() {
          hasRun += 1;
          if ($('html').hasClass('wf-active') || hasRun === 10) {
            _this.formatFullNavigation();
            return clearInterval(checker);
          }
        };
      })(this), 500);
    };

    NavigationView.prototype.replaceTrailingDivider = function(e) {
      var previousNavItem;
      previousNavItem = ($(e.currentTarget)).prev();
      return previousNavItem.removeClass('hide-divider');
    };

    NavigationView.prototype.resize = function() {
      return this.formatFullNavigation();
    };

    NavigationView.prototype.formatFullNavigation = function() {
      var availableRoom;
      availableRoom = this.navigation.width();
      if (this.requiredRoom >= availableRoom) {
        this.navigation.addClass('compress');
        if (this.navigation.height() > 100) {
          this.multiLine = true;
          return this.navigation.addClass('multi-line');
        } else {
          this.navigation.removeClass('multi-line');
          return this.multiLine = false;
        }
      } else {
        this.navigation.removeClass('compress');
        this.navigation.removeClass('multi-line');
        return this.multiLine = false;
      }
    };

    NavigationView.prototype.establishTierDirection = function(e) {
      var availableRoom, childWidth, children, dropdown, positionLeft, previousNavItem, requiredRoom, secondaryChildren, tertiaryChildren;
      previousNavItem = ($(e.currentTarget)).prev();
      previousNavItem.addClass('hide-divider');
      $('.mega-nav').trigger('dismissMegaNav');
      dropdown = $(e.currentTarget);
      children = dropdown.find('.child');
      secondaryChildren = children.filter('.secondary');
      tertiaryChildren = children.filter('.tertiary');
      childWidth = dropdown.find('.dropdown-wrap').outerWidth();
      positionLeft = dropdown.position().left;
      requiredRoom = tertiaryChildren.length > 0 ? 3 * childWidth : 2 * childWidth;
      availableRoom = this.navigation.width() - positionLeft - dropdown.outerWidth();
      if (requiredRoom > availableRoom) {
        return children.removeClass('right').addClass('left');
      } else {
        return children.removeClass('left').addClass('right');
      }
    };

    NavigationView.prototype.toggleMegaNav = function(e) {
      var previousNavItem;
      if ($(e.currentTarget).hasClass('active')) {
        return;
      }
      previousNavItem = this.megaNavButton.prev();
      if (previousNavItem.hasClass('hide-divider')) {
        previousNavItem.removeClass('hide-divider');
      } else {
        previousNavItem.addClass('hide-divider');
      }
      $('.mega-nav').trigger('toggleMegaNav');
      return false;
    };

    return NavigationView;

  })(Backbone.View);

  MobileNavigationView = (function(superClass) {
    extend(MobileNavigationView, superClass);

    function MobileNavigationView() {
      return MobileNavigationView.__super__.constructor.apply(this, arguments);
    }

    MobileNavigationView.prototype.el = $('.mobile-dropdown');

    MobileNavigationView.prototype.events = {
      'click .dropdown > a': 'toggleExpand',
      'close-mobile-nav': 'closeMobileNav'
    };

    MobileNavigationView.prototype.initialize = function() {
      this.mobileDropdownButton = $('.compact .dropdown');
      this.mobileDropdown = $('.mobile-dropdown');
      if (!TOUCH) {
        $('.compact .dropdown').on('click', (function(_this) {
          return function() {
            return _this.toggleMobileNav();
          };
        })(this));
      } else {
        $('.compact .nav-item.dropdown').on('touchend', (function(_this) {
          return function() {
            return _this.toggleMobileNav();
          };
        })(this));
      }
      this.windowWidth = $(window).width();
      return WINDOW.resize((function(_this) {
        return function() {
          _this.resize();
          return _this.windowWidth = $(window).width();
        };
      })(this));
    };

    MobileNavigationView.prototype.resize = function() {
      var isWidthIncrease;
      isWidthIncrease = this.windowWidth !== $(window).width() ? true : false;
      if (WINDOW.width() > 720 && this.mobileDropdownButton.hasClass('active') && isWidthIncrease) {
        return this.closeMobileNav();
      }
    };

    MobileNavigationView.prototype.openMobileNav = function() {
      this.mobileDropdownButton.addClass('active');
      return this.mobileDropdown.show();
    };

    MobileNavigationView.prototype.closeMobileNav = function() {
      this.mobileDropdownButton.removeClass('active');
      return this.mobileDropdown.hide();
    };

    MobileNavigationView.prototype.toggleMobileNav = function() {
      if (this.mobileDropdownButton.hasClass('active')) {
        return this.closeMobileNav();
      } else {
        return this.openMobileNav();
      }
    };

    MobileNavigationView.prototype.toggleExpand = function(e) {
      var button, childList, listItem;
      button = ($(e.currentTarget)).parent();
      listItem = button.closest('li.list-item');
      childList = button.find('> .list');
      listItem.toggleClass('expanded');
      childList.toggle();
      return false;
    };

    return MobileNavigationView;

  })(Backbone.View);

  MegaNavigationView = (function(superClass) {
    extend(MegaNavigationView, superClass);

    function MegaNavigationView() {
      return MegaNavigationView.__super__.constructor.apply(this, arguments);
    }

    MegaNavigationView.prototype.el = $('.mega-nav');

    MegaNavigationView.prototype.initialize = function() {
      var listCount;
      this.navContainer = $('nav.full');
      this.nav = $('.mega-nav');
      this.megaNavWrap = this.nav.find('.mega-nav-wrap');
      this.navTrigger = $('.has-mega-nav');
      this.mainList = this.$el.find('.main-list');
      this.expandedList = this.$el.find('.expanded-list');
      this.categoriesList = this.$el.find('.category-list');
      this.backButton = this.$el.find('.back');
      listCount = this.mainList.find('.list').length;
      if (listCount === 1) {
        listCount = 'one-col';
      }
      if (listCount === 2) {
        listCount = 'two-col';
      }
      if (listCount === 3) {
        listCount = 'three-col';
      }
      this.mainList.find('.list').addClass(listCount);
      this.nav.css({
        height: this.megaNavWrap.height()
      });
      WINDOW.resize((function(_this) {
        return function() {
          return _this.resize();
        };
      })(this));
      return $('.has-mega-nav, .mega-nav').mouseleave((function(_this) {
        return function(e) {
          return _this.closeMegaNav(e);
        };
      })(this));
    };

    MegaNavigationView.prototype.events = {
      'toggleMegaNav': 'toggle',
      'dismissMegaNav': 'dismiss',
      'click .show-more': 'goDeepWithin',
      'click .has-category': 'goDeepWithin',
      'click .back': 'reset'
    };

    MegaNavigationView.prototype.resize = function() {
      this.nav.css({
        height: this.megaNavWrap.height()
      });
      if (WINDOW.width() < 720) {
        return this.dismiss();
      } else if (this.navTrigger.hasClass('active')) {
        return this.invoke();
      }
    };

    MegaNavigationView.prototype.toggle = function() {
      if (this.navTrigger.hasClass('active')) {
        this.dismiss();
      } else {
        this.invoke();
      }
      return false;
    };

    MegaNavigationView.prototype.invoke = function() {
      var offset;
      offset = Math.floor(this.navContainer.position().top + this.navTrigger.position().top + this.navTrigger.outerHeight());
      this.navTrigger.addClass('active');
      return this.nav.css('top', offset);
    };

    MegaNavigationView.prototype.dismiss = function() {
      this.navTrigger.removeClass('active');
      this.navTrigger.prev().removeClass('hide-divider');
      return this.nav.css('top', '-9999px');
    };

    MegaNavigationView.prototype.closeMegaNav = function(e) {
      if ($(e.currentTarget).hasClass('has-mega-nav')) {
        if (!($(e.relatedTarget).hasClass('.mega-nav') || $(e.relatedTarget).closest('.mega-nav').length)) {
          return this.dismiss();
        }
      } else if ($(e.currentTarget).hasClass('mega-nav')) {
        if (!($(e.currentTarget).hasClass('has-mega-nav') || $(e.relatedTarget).parent().hasClass('has-mega-nav'))) {
          return this.dismiss();
        }
      }
    };

    MegaNavigationView.prototype.goDeepWithin = function(e) {
      var category, link, list, newHeight, origin, target, targetList;
      link = $(e.currentTarget);
      origin = link.closest('ul.mega-nav-list');
      if (link.hasClass('show-more')) {
        list = link.closest('ul.list-wrap').data('list');
        target = this.expandedList;
        targetList = target.find("li[data-list='" + list + "']");
        this.categoriesList.hide();
        this.expandedList.show().find('.list').removeClass('active');
        target.find('.back').data('target', 'main-list');
      } else if (link.hasClass('has-category')) {
        category = ($(e.currentTarget)).data('category');
        target = this.categoriesList;
        targetList = target.find("li[data-category='" + category + "']");
        if (origin.hasClass('main-list')) {
          this.expandedList.hide();
          this.categoriesList.show().find('.list').removeClass('active');
          target.find('.back').data('target', 'main-list');
        } else {
          this.categoriesList.show().find('.list').removeClass('active');
          target.find('.back').data('target', 'expanded-list');
        }
      }
      targetList.addClass('active');
      if (target.hasClass('expanded-list')) {
        target.find('.back').data('origin', 'expanded-list');
      } else {
        target.find('.back').data('origin', 'category-list');
      }
      newHeight = target.height();
      if (newHeight > origin.height()) {
        this.nav.animate({
          height: target.height()
        });
      }
      this.megaNavWrap.animate({
        top: '-=' + origin.height()
      }, (function(_this) {
        return function() {
          return target.find('.back').fadeIn(150);
        };
      })(this));
      return false;
    };

    MegaNavigationView.prototype.reset = function(e) {
      var backButton, origin, target;
      backButton = $(e.currentTarget);
      target = $("." + (backButton.data('target')));
      origin = $("." + (backButton.data('origin')));
      backButton.fadeOut(150);
      this.nav.animate({
        height: target.height()
      });
      this.megaNavWrap.animate({
        top: '+=' + target.height()
      });
      if (backButton.data('origin') === 'category-list') {
        backButton.data('target', 'main-list');
        return backButton.data('origin', 'expanded-list');
      }
    };

    return MegaNavigationView;

  })(Backbone.View);

  IndexView = (function(superClass) {
    extend(IndexView, superClass);

    function IndexView() {
      return IndexView.__super__.constructor.apply(this, arguments);
    }

    IndexView.prototype.initialize = function() {
      setTimeout(((function(_this) {
        return function() {
          return _this.verticallyAlign();
        };
      })(this)), 500);
      WINDOW.resize((function(_this) {
        return function() {
          return _this.verticallyAlign();
        };
      })(this));
      new SlideshowView();
      if (Theme.showInstagramWidget) {
        new InstagramView();
      }
      if (Theme.showTwitterWidget) {
        return new TwitterView();
      }
    };

    IndexView.prototype.verticallyAlign = function() {
      var collection, j, label, labels, len, ref, results;
      ref = $('.collection');
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        collection = ref[j];
        labels = ($(collection)).find('h3, span');
        results.push((function() {
          var k, len1, results1;
          results1 = [];
          for (k = 0, len1 = labels.length; k < len1; k++) {
            label = labels[k];
            results1.push(($(label)).css({
              marginTop: ($(label)).height() / -2
            }).removeClass('preload'));
          }
          return results1;
        })());
      }
      return results;
    };

    return IndexView;

  })(Backbone.View);

  RTEView = (function(superClass) {
    extend(RTEView, superClass);

    function RTEView() {
      return RTEView.__super__.constructor.apply(this, arguments);
    }

    RTEView.prototype.events = {
      'click .tabs li': 'switchTabs'
    };

    RTEView.prototype.initialize = function() {
      this.rte = this.$el;
      this.setupTabs();
      this.setupImages();
      this.setupVideos();
      this.mobilifyTables();
      return WINDOW.resize((function(_this) {
        return function() {
          _this.setupVideos();
          return _this.mobilifyTables();
        };
      })(this));
    };

    RTEView.prototype.setupImages = function() {
      var images;
      images = this.rte.find('p > img');
      return images.imagesLoaded(function() {
        var image, j, len, results;
        results = [];
        for (j = 0, len = images.length; j < len; j++) {
          image = images[j];
          image = $(image);
          results.push(image.wrap('<div class="image-wrap">'));
        }
        return results;
      });
    };

    RTEView.prototype.setupVideos = function() {
      var aspectRatio, contentWidth, j, len, results, video, videos;
      videos = this.rte.not(".special").find('iframe, embed, object');
      contentWidth = this.rte.width();
      results = [];
      for (j = 0, len = videos.length; j < len; j++) {
        video = videos[j];
        video = $(video);
        aspectRatio = video.height() / video.width();
        results.push(video.css({
          width: contentWidth,
          height: contentWidth * aspectRatio
        }));
      }
      return results;
    };

    RTEView.prototype.switchTabs = function(e) {
      var aspectRatio, content, contentWidth, j, len, position, tab, tabContainer, tabContentContainer, video, videos;
      tab = $(e.currentTarget);
      tabContainer = tab.parent();
      tabContentContainer = tabContainer.next();
      position = tab.index();
      content = tabContentContainer.find('> li').eq(position);
      tabContainer.find('> li').removeClass('active');
      tabContentContainer.find('> li').removeClass('active');
      tab.addClass('active');
      content.addClass('active');
      videos = content.find('iframe, embed, object');
      contentWidth = content.width();
      for (j = 0, len = videos.length; j < len; j++) {
        video = videos[j];
        video = $(video);
        aspectRatio = video.height() / video.width();
        video.css({
          width: contentWidth,
          height: contentWidth * aspectRatio,
          visibility: 'visible'
        });
      }
      return false;
    };

    RTEView.prototype.setupTabs = function() {
      var tabs, tabsContent;
      tabs = this.rte.find('.tabs');
      tabsContent = this.rte.find('.tabs-content');
      if (this.rte.find(':first-child').hasClass('tabs')) {
        this.rte.parent().addClass('no-border');
      }
      tabs.find('li:first').addClass('active');
      return tabsContent.find('li:first').addClass('active');
    };

    RTEView.prototype.mobilifyTables = function() {
      return this.$('table').mobileTable();
    };

    return RTEView;

  })(Backbone.View);

  /*ProductView = (function(superClass) {
    extend(ProductView, superClass);

    function ProductView() {
      return ProductView.__super__.constructor.apply(this, arguments);
    }

    ProductView.prototype.initialize = function() {
      this.productArea = $('#product-area');
      this.fullscreenViewer = $('.fullscreen-product-viewer');
      this.fullscreenModal = this.fullscreenViewer.find('.modal');
      this.thumbsCount = this.productArea.find('.thumb').length;
      this.product = window.productJSON;
      this.variants = this.product.variants;
      this.selectedThumbIndex = 0;
      this.processing = false;
      this.setupVariants();
      this.productArea.find('.showcase .container').spin('small');
      this.fullscreenViewer.find('.showcase .container').spin('small');
      this.transitionend = (function(transition) {
        var transEndEventNames;
        transEndEventNames = {
          "-webkit-transition": "webkitTransitionEnd",
          "-moz-transition": "transitionend",
          "-o-transition": "oTransitionEnd",
          transition: "transitionend"
        };
        return transEndEventNames[transition];
      })(Modernizr.prefixed("transition"));
      WINDOW.resize((function(_this) {
        return function() {
          return _this.resize();
        };
      })(this));
      if (Theme.imageZoom) {
        new ImageZoomView({
          el: this.$(".product-main-image")
        });
      }
      return Shopify.onError = (function(_this) {
        return function(XMLHttpRequest) {
          return _this.handleErrors(XMLHttpRequest);
        };
      })(this);
    };

    ProductView.prototype.events = {
      "click #product-area .thumb": "determineSelectedThumb",
      "click .modal-wrap .thumb": "determineSelectedThumb",
      "click .toggle-fullview": "openFullview",
      "click .fullscreen-product-viewer": "closeFullview",
      "click .fullscreen-product-viewer .modal": "stopProp",
      "click .submit": "addProductToCart",
      "click .modal-wrap .close": "closeFullview",
      "change .single-option-selector": "resetErrors"
    };

    ProductView.prototype.resize = function() {
      this.formatTheModal();
      return this.resizeShowcase();
    };

    ProductView.prototype.stopProp = function(e) {
      return e.stopPropagation();
    };

    ProductView.prototype.handleErrors = function(error) {
      var max, message, target, variant, variantID;
      error = $.parseJSON(error.responseText);
      if (error.message === "Cart Error") {
        variantID = parseInt(this.$("#product-select").val(), 10);
        if (this.product.variants.length === 1) {
          max = this.product.variants[0].inventory_quantity;
        } else {
          target = (function() {
            var j, len, ref, results;
            ref = this.product.variants;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              variant = ref[j];
              if (variant.id === variantID) {
                results.push(variant);
              }
            }
            return results;
          }).call(this);
          max = target[0].inventory_quantity;
        }
        message = Theme.errorStock.replace("{{ stock }}", max);
      } else {
        message = Theme.errorGeneral.replace("{{ stock }}", max);
      }
      this.$(".product-form").append("<div class='error-message'>" + message + "</div>");
      return this.$(".product-form .submit").val(error.message);
    };

    ProductView.prototype.resetErrors = function() {
      this.$(".error-message").remove();
      return this.processing = false;
    };

    ProductView.prototype.addProductToCart = function(e) {
      var quantity, submitButton, variant;
      if (Theme.ajax) {
        e.preventDefault();
        submitButton = this.$(e.target);
        if (this.processing === false) {
          submitButton.data("original-text", submitButton.val()).val(Theme.pleaseWait).addClass("disabled");
          this.processing = true;
          variant = this.$(".product-select").val();
          quantity = this.$(".product-quantity").val();
          var form = $('.product-form')[0];
          if (form != undefined)
          {
            BOLD.helpers.addItemFromForm(form, () => {
            	Shopify.getCart((cart) => {
                return this.updateMiniCart(cart, product);
              });
              submitButton.val(Theme.addedToCart);
              return setTimeout(() => {
                submitButton.val(submitButton.data("original-text")).removeClass("disabled");
                return this.processing = false;
              }, 2000);
            })
          } else{
          
          return Shopify.addItem(variant, quantity, (function(_this) {
            return function(product) {
              Shopify.getCart(function(cart) {
                return _this.updateMiniCart(cart, product);
              });
              submitButton.val(Theme.addedToCart);
              return setTimeout(function() {
                submitButton.val(submitButton.data("original-text")).removeClass("disabled");
                return _this.processing = false;
              }, 2000);
            };
          })(this));
        }
        } else {
          return false;
        }
      }
    };

    ProductView.prototype.updateMiniCart = function(cart, product) {
      var existingItem, itemText, productPrice;
      if (cart.item_count !== 1) {
        itemText = Theme.cartItemsOther;
      } else {
        itemText = Theme.cartItemsOne;
        $(".mini-cart .options").show();
        $(".mini-cart-items-wrap .no-items").hide();
      }
      $(".mini-cart-wrap label").html("<span class='item-count'>" + cart.item_count + "</span> " + itemText);
      productPrice = Shopify.formatMoney(product.line_price, Theme.moneyFormat);
      existingItem = $("#item-" + product.variant_id);
      if (existingItem.length > 0) {
        existingItem.find(".price").html("<span class='money' data-currency-' + Theme.currency + '='" + productPrice + "'>" + productPrice + "</span>");
        existingItem.find(".quantity .count").text(product.quantity);
      } else {
        $(".mini-cart-items-wrap").append("<div id=\"item-" + product.variant_id + "\" class=\"item clearfix\">\n    <div class=\"image-wrap\">\n        <img alt=\"" + product.title + "\" src=\"" + product.image + "\">\n        <a class=\"overlay\" href=\"" + product.url + "\"></a>\n    </div>\n    <div class=\"details\">\n        <p class=\"brand\">" + product.vendor + "</p>\n        <p class=\"title\"><a href=\"" + product.url + "\">" + product.product_title + "</a><span class=\"quantity\">× <span class=\"count\">" + product.quantity + "</span></span></p>\n        <p class=\"price\"><span class=\"money\">" + productPrice + "</span></p>\n        <p class=\"variant\">" + product.variant_title + "</p>\n    </div>\n</div>");
      }
      if (Theme.currencySwitcher) {
        return $(document.body).trigger("switch-currency");
      }
    };

    ProductView.prototype.setupVariants = function() {
      var j, label, labels, len, width;
      if (this.product.options.length === 1) {
        $(".single-option-selector").closest(".selector-wrapper").prepend("<label>" + this.product.options[0] + "</label>");
      }
      labels = this.productArea.find('.selector-wrapper > label');
      if (labels.length > 1) {
        width = 0;
        for (j = 0, len = labels.length; j < len; j++) {
          label = labels[j];
          if (($(label)).width() > width) {
            width = ($(label)).width();
          }
        }
        labels.width(width);
      }
      return this.productArea.find('.single-option-selector').sexyDrop({
        autoWidth: false
      });
    };

    ProductView.prototype.resizeShowcase = function() {
      var container, imgHeight;
      container = this.productArea.find('.container');
      imgHeight = container.find('img').height();
      return container.height(imgHeight);
    };

    ProductView.prototype.openFullview = function(e) {
      BODY.css({
        'overflow': 'hidden'
      });
      this.fullscreenViewer.show();
      this.formatTheModal();
      if (!$('html').hasClass('lt-ie9')) {
        this.fullscreenViewer.fadeTo(300, 1, (function(_this) {
          return function() {
            _this.parent = _this.fullscreenModal;
            if (_this.thumbsCount > 0) {
              return _this.updateProductShowcase();
            }
          };
        })(this));
      } else {
        this.parent = this.fullscreenModal;
        if (this.thumbsCount > 0) {
          this.updateProductShowcase();
        }
      }
      $(document).bind('keyup', (function(_this) {
        return function(e) {
          if (e.keyCode === 27) {
            return _this.closeFullview();
          }
        };
      })(this));
      return false;
    };

    ProductView.prototype.closeFullview = function(e) {
      if ((e == null) || e.target === e.currentTarget) {
        if (!$('html').hasClass('lt-ie9')) {
          this.fullscreenViewer.fadeTo(300, 0, (function(_this) {
            return function() {
              _this.parent = _this.productArea;
              if (_this.thumbsCount > 0) {
                _this.updateProductShowcase();
              }
              _this.fullscreenViewer.hide();
              return BODY.css({
                'overflow': 'auto'
              });
            };
          })(this));
        } else {
          this.parent = this.productArea;
          if (this.thumbsCount > 0) {
            this.updateProductShowcase();
          }
          this.fullscreenViewer.hide();
          BODY.css({
            'overflow': 'auto'
          });
        }
        return $(document).unbind('keyup');
      }
    };

    ProductView.prototype.formatTheModal = function() {
      var container, imgHeight;
      container = this.fullscreenModal.find('.container');
      imgHeight = container.find('img').height();
      container.height(imgHeight);
      this.scroller = this.fullscreenViewer.find('.pager').antiscroll({
        autoHide: false
      }).data('antiscroll');
      this.fullscreenViewer.find('.pager').height(imgHeight).one(this.transitionend, (function(_this) {
        return function(e) {
          return _this.scroller.refresh();
        };
      })(this));
      return container.imagesLoaded((function(_this) {
        return function() {
          return _this.verticallyAlignModal();
        };
      })(this));
    };

    ProductView.prototype.verticallyAlignModal = function(imageHeight) {
      var modalHeight, offset, windowHeight;
      windowHeight = WINDOW.height();
      if (imageHeight) {
        modalHeight = imageHeight + 118;
      } else {
        modalHeight = this.fullscreenModal.outerHeight();
      }
      if (windowHeight <= modalHeight) {
        return this.fullscreenModal.css({
          'margin-top': 0
        });
      } else {
        offset = (windowHeight - modalHeight) / 2;
        this.fullscreenModal.css({
          'margin-top': offset
        });
        return window.setTimeout(function() {
          return $('.fullscreen-product-viewer .modal').addClass('transitions-are-go');
        }, 50);
      }
    };

    ProductView.prototype.determineSelectedThumb = function(e) {
      this.selectedThumbIndex = ($(e.currentTarget)).index();
      if (this.fullscreenViewer.is(":visible")) {
        this.parent = this.$('.modal-wrap');
      } else {
        this.parent = this.productArea;
      }
      return this.updateProductShowcase();
    };

    ProductView.prototype.updateProductShowcase = function() {
      var activeThumb, animationSpeed, img, selectedImg, selectedThumb, showcaseContainer, showcaseImage, showcaseWrap, src;
      showcaseContainer = this.parent.find('.showcase .container');
      showcaseWrap = showcaseContainer.find('.wrap');
      showcaseImage = showcaseContainer.find('img');
      showcaseContainer.height(showcaseImage.height());
      activeThumb = this.parent.find('.thumb.active');
      selectedThumb = this.parent.find('.thumb').eq(this.selectedThumbIndex);
      selectedImg = selectedThumb.find('img');
      src = selectedImg.data('high-res-url');
      if (this.selectedThumbIndex !== activeThumb.index()) {
        img = new Image();
        img.src = src;
        img = $(img);
        animationSpeed = 200;
        return showcaseWrap.fadeTo(animationSpeed, 0, (function(_this) {
          return function() {
            showcaseImage.remove();
            return img.imagesLoaded(function() {
              showcaseWrap.append(img).trigger("prepare-zoom");
              showcaseContainer.animate({
                height: img.height()
              }, animationSpeed, 'linear', function() {
                activeThumb.removeClass('active');
                selectedThumb.addClass('active');
                return showcaseWrap.fadeTo(animationSpeed, 1);
              });
              if (_this.fullscreenViewer.is(":visible")) {
                _this.verticallyAlignModal(img.height());
                return _this.fullscreenViewer.find('.pager').height(img.height()).one(_this.transitionend, function(e) {
                  return _this.scroller.refresh();
                });
              }
            });
          };
        })(this));
      }
    };

    return ProductView;

  })(Backbone.View);
  */
  
  ImageZoomView = (function(superClass) {
    extend(ImageZoomView, superClass);

    function ImageZoomView() {
      return ImageZoomView.__super__.constructor.apply(this, arguments);
    }

    ImageZoomView.prototype.events = {
      "prepare-zoom": "prepareZoom",
      "click": "toggleZoom",
      "mouseout .product-zoom": "toggleZoom",
      "mousemove .product-zoom": "zoomImage"
    };

    ImageZoomView.prototype.initialize = function() {
      this.zoomArea = this.$(".product-zoom");
      return this.$el.imagesLoaded((function(_this) {
        return function() {
          return _this.prepareZoom();
        };
      })(this));
    };

    ImageZoomView.prototype.prepareZoom = function() {
      var newImage, photoAreaHeight, photoAreaWidth;
      photoAreaWidth = this.$el.width();
      photoAreaHeight = this.$el.height();
      newImage = new Image();
      $(newImage).on("load", (function(_this) {
        return function() {
          var ratio, ratios;
          _this.zoomImageWidth = newImage.width;
          _this.zoomImageHeight = newImage.height;
          ratios = new Array();
          ratios[0] = _this.zoomImageWidth / photoAreaWidth;
          ratios[1] = _this.zoomImageHeight / photoAreaHeight;
          ratio = Math.max.apply(Math, ratios);
          if (ratio < 1.4) {
            _this.$el.removeClass("zoom-enabled");
          } else {
            _this.$el.addClass("zoom-enabled");
            return _this.zoomArea.css({
              backgroundImage: "url(" + newImage.src + ")"
            });
          }
        };
      })(this));
      return newImage.src = this.$("img").attr("src");
    };

    ImageZoomView.prototype.toggleZoom = function(e) {
      if (this.$el.hasClass("zoom-enabled")) {
        if (e.type === "mouseout") {
          this.zoomArea.removeClass("active");
          return;
        }
        this.zoomArea.toggleClass("active");
        return this.zoomImage(e);
      }
    };

    ImageZoomView.prototype.zoomImage = function(e) {
      var bigImageOffset, bigImageX, bigImageY, mousePositionX, mousePositionY, newBackgroundPosition, ratioX, ratioY, zoomHeight, zoomWidth;
      zoomWidth = this.zoomArea.width();
      zoomHeight = this.zoomArea.height();
      bigImageOffset = this.$el.offset();
      bigImageX = Math.round(bigImageOffset.left);
      bigImageY = Math.round(bigImageOffset.top);
      mousePositionX = e.pageX - bigImageX;
      mousePositionY = e.pageY - bigImageY;
      if (mousePositionX < zoomWidth && mousePositionY < zoomHeight && mousePositionX > 0 && mousePositionY > 0) {
        if (this.zoomArea.hasClass("active")) {
          ratioX = Math.round(mousePositionX / zoomWidth * this.zoomImageWidth - zoomWidth / 2) * -1;
          ratioY = Math.round(mousePositionY / zoomHeight * this.zoomImageHeight - zoomHeight / 2) * -1;
          if (ratioX > 0) {
            ratioX = 0;
          }
          if (ratioY > 0) {
            ratioY = 0;
          }
          if (ratioX < -(this.zoomImageWidth - zoomWidth)) {
            ratioX = -(this.zoomImageWidth - zoomWidth);
          }
          if (ratioY < -(this.zoomImageHeight - zoomHeight)) {
            ratioY = -(this.zoomImageHeight - zoomHeight);
          }
          newBackgroundPosition = ratioX + "px " + ratioY + "px";
          return this.zoomArea.css({
            backgroundPosition: newBackgroundPosition
          });
        }
      }
    };

    return ImageZoomView;

  })(Backbone.View);

  CartView = (function(superClass) {
    extend(CartView, superClass);

    function CartView() {
      return CartView.__super__.constructor.apply(this, arguments);
    }

    CartView.prototype.events = {
      'change .quantity .field': 'updateQuantity',
      'change .instructions textarea': 'saveNote',
      //'click .get-rates': 'calculateShipping',
      //'keydown #address_zip': 'calculateShipping'
    };

    CartView.prototype.initialize = function() {
      this.textarea = $('.instructions textarea');
      this.mobileInstructions = $('.mobile.instructions');
      this.standardInstructions = $('.standard.instructions');
      //if (Theme.shippingCalculator && Theme.userLoggedIn && Theme.userAddress.length) {
        //this.calculateShipping();
      //}
      Shopify.onError = (function(_this) {
        return function(XMLHttpRequest) {
          return _this.handleErrors(XMLHttpRequest);
        };
      })(this);
      $('.styled-select').sexyDrop();
      this.breakpointFixes();
      return WINDOW.resize((function(_this) {
        return function() {
          return _this.breakpointFixes();
        };
      })(this));
    };

    CartView.prototype.breakpointFixes = function() {
      if (WINDOW.width() < 720) {
        return this.mobileInstructions.append(this.textarea);
      } else {
        return this.standardInstructions.append(this.textarea);
      }
    };

    CartView.prototype.updateQuantity = function(e) {
      var id, input, quantity, url;
      if (Theme.ajax) {
        input = $(e.currentTarget);
        quantity = input.val();
        id = input.data('id');
        url = "/cart/change/" + id + "?quantity=" + quantity;
        return window.location = url;
      }
    };

    CartView.prototype.saveNote = function() {
      var newNote;
      newNote = $('.instructions textarea').val();
      return Shopify.updateCartNote(newNote, function(cart) {});
    };

    
    
    CartView.prototype.calculateShipping = function(e) {
      var shippingAddress;
      if (e && e.type === 'keydown') {
        if (e.keyCode === 13) {
          e.preventDefault();
          $('.wrapper-response').empty();
        } else {
          return;
        }
      }
      shippingAddress = {};
      shippingAddress.zip = $('.address-zip').val() || '';
      shippingAddress.country = $('.address-country').val() || '';
      shippingAddress.province = $('.address-province').val() || '';
      return Shopify.getCartShippingRatesForDestination(shippingAddress, function() {
        var address, firstRate, j, len, multipleShippingRates, oneShippingRate, price, rate, rateValues, ratesFeedback, results;
        address = shippingAddress.zip + ", " + shippingAddress.province + ", " + shippingAddress.country;
        if (!shippingAddress.province.length) {
          address = shippingAddress.zip + ", " + shippingAddress.country;
        }
        if (!shippingAddress.zip.length) {
          address = shippingAddress.province + ", " + shippingAddress.country;
        }
        if (!(shippingAddress.province.length && shippingAddress.zip.length)) {
          address = shippingAddress.country;
        }
        $('.wrapper-response').empty().append("<p class='shipping-calculator-response message'/><ul class='shipping-rates'/>");
        ratesFeedback = $('.shipping-calculator-response');
        if (rates.length > 1) {
          firstRate = Shopify.Cart.ShippingCalculator.formatRate(rates[0].price);
          multipleShippingRates = Theme.shippingCalcMultiRates.replace('{{ address }}', address).replace('{{ number_of_rates }}', rates.length).replace('{{ rate }}', "<span class='money'>" + firstRate + "</span>");
          ratesFeedback.html(multipleShippingRates);
        } else if (rates.length === 1) {
          oneShippingRate = Theme.shippingCalcOneRate.replace('{{ address }}', address);
          ratesFeedback.html(oneShippingRate);
        } else {
          ratesFeedback.html(Theme.shippingCalcNoRates);
        }
        results = [];
        for (j = 0, len = rates.length; j < len; j++) {
          rate = rates[j];
          price = Shopify.Cart.ShippingCalculator.formatRate(rate.price);
          rateValues = Theme.shippingCalcRateValues.replace('{{ rate_title }}', rate.name).replace('{{ rate }}', "<span class='money'>" + price + "</span>");
          results.push($('.shipping-rates').append("<li>" + rateValues + "</li>"));
        }
        return results;
      });
    };
    

    CartView.prototype.handleErrors = function(errors) {
      var errorMessage;
      errorMessage = $.parseJSON(errors.responseText);
      errorMessage = Theme.shippingCalcErrorMessage.replace('{{ error_message }}', errorMessage.zip);
      return $('.wrapper-response').html("<p class='message'>" + errorMessage + "</p>");
    };

    return CartView;

  })(Backbone.View);

  ListCollectionsView = (function(superClass) {
    extend(ListCollectionsView, superClass);

    function ListCollectionsView() {
      return ListCollectionsView.__super__.constructor.apply(this, arguments);
    }

    ListCollectionsView.prototype.initialize = function() {
      setTimeout(((function(_this) {
        return function() {
          return _this.verticallyAlign();
        };
      })(this)), 500);
      return WINDOW.resize((function(_this) {
        return function() {
          return _this.verticallyAlign();
        };
      })(this));
    };

    ListCollectionsView.prototype.verticallyAlign = function() {
      var collection, j, label, labels, len, ref, results;
      ref = $('.collection');
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        collection = ref[j];
        labels = ($(collection)).find('h2');
        results.push((function() {
          var k, len1, results1;
          results1 = [];
          for (k = 0, len1 = labels.length; k < len1; k++) {
            label = labels[k];
            results1.push(($(label)).css({
              marginTop: ($(label)).height() / -2
            }).removeClass('preload'));
          }
          return results1;
        })());
      }
      return results;
    };

    return ListCollectionsView;

  })(Backbone.View);

  CollectionView = (function(superClass) {
    extend(CollectionView, superClass);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.initialize = function() {
      this.titleContainer = $('.page-title');
      this.title = this.titleContainer.find('.label');
      this.tagsWrap = $('.tags-wrap');
      this.tags = this.tagsWrap.find('.tags');
      ($('.tags-dropdown')).sexyDrop();
      this.tagsWrap.removeClass('preload');
      this.formatTags();
      return WINDOW.resize((function(_this) {
        return function() {
          return _this.formatTags();
        };
      })(this));
    };

    CollectionView.prototype.formatTags = function() {
      var availableRoom, dropdown, tagsWidth, titleContainerWidth, titleWidth;
      dropdown = this.tagsWrap.find('.pxuSexyDropWrapper');
      titleWidth = this.title.width();
      tagsWidth = this.tags.outerWidth(true);
      titleContainerWidth = this.titleContainer.width();
      availableRoom = titleContainerWidth - titleWidth;
      if (WINDOW.width() >= 720) {
        if (tagsWidth > availableRoom) {
          this.tags.hide();
          dropdown.show();
          return this.titleContainer.css({
            paddingRight: dropdown.width() + 30
          });
        } else {
          this.tags.show();
          dropdown.hide();
          return this.titleContainer.css({
            paddingRight: ""
          });
        }
      } else {
        this.tags.hide();
        dropdown.show();
        return this.titleContainer.css({
          paddingRight: ""
        });
      }
    };

    return CollectionView;

  })(Backbone.View);
QuickShopView = (function(superClass) {	
    extend(QuickShopView, superClass);	
    function QuickShopView() {	
      return QuickShopView.__super__.constructor.apply(this, arguments);	
    }	
    QuickShopView.prototype.el = $('.quick-shop');	
    QuickShopView.prototype.events = {	
      'click': 'close',	
      'click .close-modal': 'close',	
      'click .quick-shop-content .thumb': 'updateQuickShopShowcase',	
      'click .submit:not(.disabled)': 'addToCart'	
    };	
    QuickShopView.prototype.initialize = function() {	
      this.quickShop = $('.quick-shop');	
      this.quickShopModal = this.quickShop.find('.quick-shop-modal');	
      this.errorWrap = $('.error-wrap');	
      $('.product-inner .overlay').click((function(_this) {	
        return function(e) {	
          return _this.open(e);	
        };	
      })(this));	
      this.verticallyAlignTriggers();	
      return WINDOW.resize((function(_this) {	
        return function() {	
          _this.formatTheModal();	
          _this.setupVideos();	
          return _this.verticallyAlignTriggers();	
        };	
      })(this));	
    };	
    QuickShopView.prototype.verticallyAlignTriggers = function() {	
      var j, label, len, ref, results;	
      ref = $('.product-inner .label');	
      results = [];	
      for (j = 0, len = ref.length; j < len; j++) {	
        label = ref[j];	
        results.push(($(label)).css({	
          marginTop: ($(label)).height() / -2	
        }));	
      }	
      return results;	
    };	
    QuickShopView.prototype.formatTheModal = function() {	
      var container, imgHeight, offset;	
      container = this.quickShopModal.find('.container');	
      imgHeight = container.find('img').height();	
      container.height(imgHeight);	
      if (WINDOW.height() <= $('.quick-shop-modal').outerHeight()) {	
        return this.quickShopModal.css({	
          'margin-top': 0	
        });	
      } else {	
        offset = (WINDOW.height() - $('.quick-shop-modal').outerHeight()) / 2;	
        return this.quickShopModal.css({	
          'margin-top': offset	
        });	
      }	
    };	
    QuickShopView.prototype.setupVideos = function() {	
      var aspectRatio, contentWidth, j, len, results, video, videos;	
      videos = this.quickShopModal.find('.rte iframe:visible, .rte embed:visible, .rte object:visible');	
      contentWidth = this.quickShopModal.find('.rte').width();	
      results = [];	
      for (j = 0, len = videos.length; j < len; j++) {	
        video = videos[j];	
        video = $(video);	
        aspectRatio = video.height() / video.width();	
        results.push(video.css({	
          width: contentWidth,	
          height: contentWidth * aspectRatio,	
          visibility: 'visible'	
        }));	
      }	
      return results;	
    };	
    QuickShopView.prototype.setupVariants = function(quickShopContent) {	
      var j, label, labels, len, optionTitle, width;	
      optionTitle = quickShopContent.data("option");	
      if (optionTitle) {	
        quickShopContent.find(".single-option-selector").closest(".selector-wrapper").prepend("<label>" + optionTitle + "</label>");	
      }	
      labels = quickShopContent.find('.selector-wrapper > label');	
      width = 0;	
      for (j = 0, len = labels.length; j < len; j++) {	
        label = labels[j];	
        if (($(label)).width() > width) {	
          width = ($(label)).width();	
        }	
      }	
      labels.width(width);	
      return quickShopContent.find('.single-option-selector').sexyDrop({	
        autoWidth: false	
      });	
    };	
    QuickShopView.prototype.open = function(e) {	
      var id, quickShopContent;	
      id = ($(e.currentTarget)).data('id');	
      quickShopContent = $("#quick-shop-" + id);	
      BODY.css({	
        'overflow': 'hidden'	
      });	
      this.quickShop.show();	
      this.quickShopModal.append(quickShopContent);	
      this.setupVariants(quickShopContent);	
      this.formatTheModal();	
      this.setupVideos();	
      if (Theme.currencySwitcher) {	
        $(document.body).trigger('switch-currency');	
      }	
      if (!$('html').hasClass('lt-ie9')) {	
        this.quickShop.fadeTo(200, 1);	
      }	
      this.quickShop.find('.showcase .container').spin('small');	
      return $(document).bind('keyup', (function(_this) {	
        return function(e) {	
          if (e.keyCode === 27) {	
            return _this.close();	
          }	
        };	
      })(this));	
    };	
    QuickShopView.prototype.close = function(e) {	
      var id, quantity, quickShopContent, submit;	
      if ((e == null) || e.target === e.currentTarget) {	
        submit = this.quickShopModal.find('.submit');	
        quantity = this.quickShopModal.find('.product-quantity');	
        quickShopContent = this.quickShopModal.find('.quick-shop-content');	
        id = quickShopContent.attr('id').split('-')[2];	
        $('.product-' + id).append(quickShopContent);	
        if ($('html').hasClass('lt-ie9')) {	
          this.quickShop.hide();	
          this.quickShopModal.html('');	
          BODY.css({	
            'overflow': 'auto'	
          });	
          quantity.val('1');	
        } else {	
          this.quickShop.fadeTo(200, 0, (function(_this) {	
            return function() {	
              _this.quickShop.hide();	
              _this.quickShopModal.html('');	
              BODY.css({	
                'overflow': 'auto'	
              });	
              return quantity.val('1');	
            };	
          })(this));	
        }	
        this.errorWrap.html('');	
        return $(document).unbind('keyup');	
      }	
    };	
    QuickShopView.prototype.updateQuickShopShowcase = function(e) {	
      var activeThumb, img, selectedImg, selectedThumb, showcaseContainer, showcaseImage, showcaseWrap, src;	
      showcaseContainer = this.quickShop.find('.showcase .container');	
      showcaseWrap = showcaseContainer.find('.wrap');	
      showcaseImage = showcaseContainer.find('img');	
      showcaseContainer.height(showcaseImage.height());	
      activeThumb = this.quickShop.find('.pager .thumb.active');	
      selectedThumb = $(e.currentTarget);	
      selectedImg = selectedThumb.find('img');	
      src = selectedImg.data('high-res-url');	
      img = new Image();	
      img.src = src;	
      img = $(img);	
      img.removeAttr('height width');	
      return showcaseWrap.fadeTo(200, 0, (function(_this) {	
        return function() {	
          showcaseImage.remove();	
          return img.imagesLoaded(function() {	
            showcaseWrap.append(img);	
            return showcaseContainer.animate({	
              height: img.height()	
            }, function() {	
              activeThumb.removeClass('active');	
              selectedThumb.addClass('active');	
              return showcaseWrap.fadeTo(200, 1);	
            });	
          });	
        };	
      })(this));	
    };	
    QuickShopView.prototype.updateMiniCart = function(data, properties) {	
      var cartCount, cartHTML, cartItemText, cartLabelWrap, existingItem, html, image, imageClass, item;	
      properties.price = Shopify.formatMoney(data.line_price, Theme.moneyFormat);	
      properties.id = data.id;	
      properties.vendor = data.vendor;	
      properties.quantity.total = data.quantity;	
      image = properties.matching_image.length ? properties.matching_image : data.image;	
      existingItem = $("#item-" + properties.id);	
      imageClass = Theme.productImageBorders ? 'overlay' : '';	
      cartLabelWrap = $('.mini-cart-wrap > label');	
      cartCount = parseInt(cartLabelWrap.find('.item-count').text()) + parseInt(properties.quantity.added);	
      cartItemText = cartCount === 1 ? Theme.cartItemsOne : Theme.cartItemsOther;	
      cartHTML = "<span class='item-count'>" + cartCount + "&nbsp;" + cartItemText + "</span>";	
      cartLabelWrap.html(cartHTML);	
      $('.mini-cart').removeClass('empty-cart');	
      if (existingItem.length > 0) {	
        existingItem.find('.price').html('<span class="money" data-currency-' + Theme.currency + '="' + properties.price + '">' + properties.price + '</span>');	
        existingItem.find('.quantity .count').text(properties.quantity.total);	
      } else {	
        item = $("<div class='item clearfix'>");	
        html = "<div class='image-wrap'>\n    <img src='" + image + "'>\n    <a class='" + imageClass + "' href='" + properties.product.url + "'></a>\n</div>\n<div class='details'>\n    <p class='brand'>" + properties.vendor + "</p>\n    <p class='title'>\n        <a href='" + properties.product.url + "'>" + properties.product.title + "</a>\n        <span class='quantity'>× " + properties.quantity.total + "</span>\n    </p>\n    <p class='price'><span class='money'>" + properties.price + "</span></p>\n    <p class='variant'>" + properties.variant.title + "</p>\n</div>";	
        $('.mini-cart-items-wrap').append(item.html(html));	
      }	
      if (Theme.currencySwitcher) {	
        return $(document.body).trigger('switch-currency');	
      }	
    };	
    QuickShopView.prototype.addToCart = function(e) {	
      var button, imageAlt, j, k, len, len1, postToCartUrl, properties, ref, selector, thumb, variantSelectors, variantTitle;	
      if (Theme.ajax) {	
        e.preventDefault();	
        variantTitle = '';	
        variantSelectors = this.quickShop.find('.single-option-selector');	
        for (j = 0, len = variantSelectors.length; j < len; j++) {	
          selector = variantSelectors[j];	
          selector = $(selector);	
          variantTitle += selector.val() + " / ";	
        }	
        variantTitle = variantTitle.substring(0, variantTitle.length - 3);	
        properties = {};	
        properties.variant = {};	
        properties.product = {};	
        properties.quantity = {};	
        properties.matching_image = {};	
        properties.quantity.added = this.quickShop.find('.product-quantity').val();	
        properties.variant.id = this.quickShop.find('.product-select').val();	
        properties.variant.title = this.quickShop.find('.product-select').data('variant-title') || variantTitle;	
        properties.product.title = this.quickShop.find('.title').text();	
        properties.product.url = this.quickShop.find('.title a').attr('href');	
        ref = this.quickShop.find('.thumb');	
        for (k = 0, len1 = ref.length; k < len1; k++) {	
          thumb = ref[k];	
          imageAlt = $(thumb).find('img').attr('alt');	
          if (variantTitle.indexOf(imageAlt) > -1) {	
            properties.matching_image = $(thumb).find('img').attr('src');	
          }	
        }	
        postToCartUrl = "/cart/add.js?quantity=" + properties.quantity.added + "&id=" + properties.variant.id;	
        button = this.quickShop.find('.submit');	
        button.data('original-text', button.val());	
        button.val(Theme.pleaseWait).addClass('disabled');	
        return $.ajax({	
          type: 'POST',	
          dataType: 'json',	
          url: postToCartUrl,	
          error: (function(_this) {	
            return function(data) {	
              var error, errorMsg;	
              button.val(button.data('original-text')).removeClass('disabled');	
              error = $.parseJSON(data.responseText);	
              errorMsg = "<p>" + error.description + "</p>";	
              return _this.errorWrap.html(errorMsg);	
            };	
          })(this),	
          success: (function(_this) {	
            return function(data) {	
              button.val(Theme.addedToCart);	
              _this.errorWrap.html('');	
              return _this.updateMiniCart(data, properties);	
            };	
          })(this)	
        });	
      }	
    };	
    return QuickShopView;	
  })(Backbone.View);	


  AccountView = (function(superClass) {
    extend(AccountView, superClass);

    function AccountView() {
      return AccountView.__super__.constructor.apply(this, arguments);
    }

    AccountView.prototype.events = function() {
      return {
        'click .guest-login a': 'submitGuestCheckout'
      };
    };

    AccountView.prototype.initialize = function() {
      return $('.styled-select').sexyDrop({
        autoWidth: false,
        verticallyAlign: false
      });
    };

    AccountView.prototype.submitGuestCheckout = function() {
      $('#customer_login_guest').submit();
      return false;
    };

    return AccountView;

  })(Backbone.View);

  SlideshowView = (function(superClass) {
    extend(SlideshowView, superClass);

    function SlideshowView() {
      return SlideshowView.__super__.constructor.apply(this, arguments);
    }

    SlideshowView.prototype.el = $('.slideshow');

    SlideshowView.prototype.slideFadeSpeed = 400;

    SlideshowView.prototype.initialize = function() {
      var _slide, fn, i, interval, j, len, ref, rotateFreq;
      this.slides = this.$('.slide');
      this.jumpLinksWrap = $('.jump-to-slide');
      this.slides.first().addClass('first');
      this.slides.last().addClass('last');
      ref = this.slides;
      fn = (function(_this) {
        return function() {
          var slide;
          slide = _slide;
          if (Theme.slideshowPagination && _this.slides.length > 0) {
            _this.jumpLinksWrap.append($('<li>'));
          }
          if (i === 0) {
            slide = $(slide);
            return slide.imagesLoaded(function() {
              return slide.fadeTo('200', 1, function() {
                var height;
                height = slide.height();
                slide.css('z-index', 2000).addClass('active');
                return slide.parent().css('height', height);
              });
            });
          }
        };
      })(this);
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        _slide = ref[i];
        fn();
      }
      this.jumpLinks = this.jumpLinksWrap.find('li');
      this.jumpLinksWrap.find('li:first').addClass('active');
      if (this.slides.length === 1) {
        this.$('.next, .prev, .jump-to-slide').remove();
      }
      if (Theme.autoplaySlideshow) {
        rotateFreq = parseInt(Theme.autoplayDelay, 10) || 5;
        interval = setInterval(((function(_this) {
          return function() {
            return _this.nextSlide();
          };
        })(this)), rotateFreq * 1000);
        this.$el.on('click.stopplaying', function() {
          clearInterval(interval);
          return this.$el.off('click.stopplaying');
        });
      }
      return WINDOW.resize((function(_this) {
        return function() {
          return _this.$el.css({
            height: _this.slides.filter('.active').height()
          });
        };
      })(this));
    };

    SlideshowView.prototype.events = {
      'click .next': 'nextSlide',
      'click .prev': 'previousSlide',
      'click .jump-to-slide li:not(.active)': 'jumpToSlide'
    };

    SlideshowView.prototype.nextSlide = function() {
      var isLast, upcomingSlide;
      isLast = this.$('.slide.active').hasClass('last');
      upcomingSlide = isLast ? this.slides.first() : this.$('.slide.active').next();
      return this.switchToSlide(upcomingSlide);
    };

    SlideshowView.prototype.previousSlide = function() {
      var isFirst, upcomingSlide;
      isFirst = this.$('.slide.active').hasClass('first');
      upcomingSlide = isFirst ? this.slides.last() : this.$('.slide.active').prev();
      return this.switchToSlide(upcomingSlide);
    };

    SlideshowView.prototype.jumpToSlide = function(e) {
      var jumpPosition, upcomingSlide;
      jumpPosition = ($(e.currentTarget)).index();
      upcomingSlide = this.slides.eq(jumpPosition);
      return this.switchToSlide(upcomingSlide);
    };

    SlideshowView.prototype.switchToSlide = function(upcomingSlide) {
      var currentJumpLink, currentSlide, j, jumpLinks, jumpLinksWrap, len, ref, upcomingJumpLink, upcomingSlidePosition;
      currentSlide = this.$('.slide.active');
      upcomingSlidePosition = upcomingSlide.index();
      ref = this.jumpLinksWrap;
      for (j = 0, len = ref.length; j < len; j++) {
        jumpLinksWrap = ref[j];
        jumpLinksWrap = $(jumpLinksWrap);
        jumpLinks = jumpLinksWrap.find('li');
        upcomingJumpLink = jumpLinks.eq(upcomingSlidePosition);
        currentJumpLink = jumpLinks.filter('.active');
        currentJumpLink.removeClass('active');
        upcomingJumpLink.addClass('active');
      }
      this.$el.css({
        'height': upcomingSlide.height()
      });
      currentSlide.fadeTo(this.slideFadeSpeed, 0, function() {
        return currentSlide.removeClass('active');
      });
      return upcomingSlide.fadeTo(this.slideFadeSpeed, 1, function() {
        return upcomingSlide.addClass('active');
      });
    };

    return SlideshowView;

  })(Backbone.View); 

  InstagramView = (function(superClass) {
    extend(InstagramView, superClass);

    function InstagramView() {
      return InstagramView.__super__.constructor.apply(this, arguments);
    }

    InstagramView.prototype.el = $('.instagram-widget');

    InstagramView.prototype.initialize = function() {
      this.photoContainer = this.$('.instagram-photos');
      this.setContainerHeight();
      return this.getImages();
    };

    InstagramView.prototype.setContainerHeight = function() {
      var containerHeight, containerWidth, windowWidth;
      containerWidth = this.$el.outerWidth();
      windowWidth = window.innerWidth || $(window).width();
      if (windowWidth > 960) {
        containerHeight = (containerWidth - 100) / 5;
      } else if (windowWidth > 720) {
        containerHeight = ((containerWidth - 40) / 3) * 2 + 40;
      } else if (windowWidth > 480) {
        containerHeight = ((containerWidth - 110) / 3) * 2 + 40;
      } else if (windowWidth <= 480) {
        containerHeight = ((containerWidth - 90) / 2) * 3 + 60;
      }
      return this.photoContainer.height(containerHeight);
    };

    InstagramView.prototype.getImages = function() {
      var url;
      if (Theme.instagramShowTag) {
        url = "https://api.instagram.com/v1/tags/" + Theme.instagramTag + "/media/recent?access_token=" + Theme.instagramAccessToken + "&count=5&callback=";
      } else {
        url = "https://api.instagram.com/v1/users/self/media/recent?access_token=" + Theme.instagramAccessToken + "&count=5&callback=";
      }
      return $.ajax({
        type: "GET",
        dataType: "jsonp",
        url: url,
        success: (function(_this) {
          return function(response) {
            var j, len, photo, ref;
            if (response.meta.code === 200) {
              ref = response.data;
              for (j = 0, len = ref.length; j < len; j++) {
                photo = ref[j];
                _this.photoContainer.append("<a class='instagram-photo' target='_blank' href='" + photo.link + "'><img src='" + photo.images.low_resolution.url + "'/></a>");
              }
              return _this.photoContainer.imagesLoaded(function() {
                _this.photoContainer.addClass('visible').height('auto');
                return _this.$('.loading').hide();
              });
            } else {
              _this.$el.remove();
              return console.log("Instagram error: " + response.meta.error_message);
            }
          };
        })(this),
        error: (function(_this) {
          return function(response) {
            _this.$el.remove();
            return console.log("Instagram error: " + response.meta.error_message);
          };
        })(this)
      });
    };

    return InstagramView;

  })(Backbone.View);

  TwitterView = (function(superClass) {
    extend(TwitterView, superClass);

    function TwitterView() {
      return TwitterView.__super__.constructor.apply(this, arguments);
    }

    TwitterView.prototype.el = $('.twitter-widget');

    TwitterView.prototype.initialize = function() {
      return this.fetchTweets();
    };

    TwitterView.prototype.fetchTweets = function() {
      var config;
      config = {
        'id': Theme.twitterWidgetId,
        'maxTweets': 1,
        'enableLinks': true,
        'showUser': true,
        'showTime': true,
        'showRetweet': Theme.twitterRetweets,
        'customCallback': this.renderTweets,
        'showInteraction': false
      };
      return twitterFetcher.fetch(config);
    };

    TwitterView.prototype.renderTweets = function(tweets) {
      var j, len, results, tweet;
      if (tweets.length) {
        results = [];
        for (j = 0, len = tweets.length; j < len; j++) {
          tweet = tweets[j];
          tweet = $(tweet);
          results.push(this.$('.twitter-tweet').append(tweet[1].innerHTML, "<span class='timestamp'>" + tweet[2].innerHTML + " <span class='divider'>/</span> " + tweet[0].innerHTML + "</span>"));
        }
        return results;
      } else {
        $('.twitter-widget').remove();
        return console.log("No tweets to display. Most probable cause is an incorrectly entered Widget ID.");
      }
    };

    return TwitterView;

  })(Backbone.View);
  
}).call(this);