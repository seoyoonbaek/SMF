(function(exports){
  'use strict';
  function HomeController(model, view){
    console.log('Ctrl created');
    this.model = model;
    this.view = view;
    this.setMenu();
    this.setHomeAd();
    this.setHomeImageNav();
  }

  HomeController.prototype.setMenu = function(){
    var self = this;
    this.model.getMenuItems(function(data){
      self.view.render('setMenu', data);
    });
  };

  HomeController.prototype.setHomeAd = function(){
    var self = this;
    this.model.getHomeAdImages(function(data){
      self.view.render('setHomeAd', data);
    });
  };

  HomeController.prototype.setHomeImageNav = function() {
    var self = this;
    this.model.getHomeImageNav(function(data){
      self.view.render('setHomeImageNav', data);
    });
  };

  common.setNamespace('homeController');
  exports.app = exports.app || {};
  exports.app.homeController = HomeController;
})(this);
