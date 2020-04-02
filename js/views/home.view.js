(function(exports){
  'use strict';

  function HomeView(template){
    console.log('view created');
    this.template = template;
    this.$menuList = document.getElementById('menu');
    this.$homeAdSlidesIndicators = document.getElementById('homeAdSlides-indicators');
    this.$homeAdSlides = document.getElementById('homeAdSlides-inner');
    this.$homeImageNav = document.getElementById('homeImageNav');
  }

  HomeView.prototype.bind = function(event, handler){
    var self = this;
  };

  HomeView.prototype.render = function(viewCmd, data){
    var self = this;
    var viewCommands = {
      setMenu : function() {
        self.setMenu(data);
      },
      setHomeAd : function() {
        self.setHomeAdSlidesIndicators(data);
        self.setHomeAdSlides(data);
      },
      setHomeImageNav: function() {
        self.setHomeImageNav(data);
      }
    };
    viewCommands[viewCmd]();
  };

  HomeView.prototype.setMenu = function(data){
    this.$menuList.innerHTML = this.template.setMenu(data);
  };

  HomeView.prototype.setHomeAdSlidesIndicators = function(data){
    this.$homeAdSlidesIndicators.innerHTML = this.template.setHomeAdSlidesIndicators(data);
  };

  HomeView.prototype.setHomeAdSlides = function(data){
    this.$homeAdSlides.innerHTML = this.template.setHomeAdSlides(data);
  };

  HomeView.prototype.setHomeImageNav = function(data){
    this.$homeImageNav.innerHTML = this.template.setHomeImageNav(data);
  };

  common.setNamespace('homeView');
  exports.app = exports.app || {};
  exports.app.homeView = HomeView;
})(this);
