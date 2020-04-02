(function(exports){
  'use strict';
  function HomeTemplate(){
    console.log('template created');
    this.menuListTemplate =
      '<li class="nav-item px-lg-4 {{active}}">' +
        '<a class="nav-link text-uppercase text-expanded" href="{{link}}">{{title}}</a>' +
      '</li>';
    this.homeAdSlidesIndicatorsTemplate =
      '<li data-target="#carouselHomeAdSlides" data-slide-to="{{id}}" class="{{active}}"></li>';
    this.homeAdSlidesTemplate =
      '<div class="carousel-item {{active}}">' +
        '<a href="{{url}}">' +
          '<img class="d-block w-100" src="{{image}}" alt="{{title}}">' +
        '</a>' +
      '</div>';
    this.homeImageNavTemplate =
      '<a href="{{url}}" class="col-4">' +
        '<div>' +
          '<img class="img-circle homeImageNav_img" src="{{image}}" alt="{{title}}">' +
          '<p class="d-inline-block homeImageNav_title">{{title}}</p>' +
          '<p class="d-none d-lg-block homeImageNav_explanation">{{explanation}}</p>' +
        '</div>' +
      '</a>';
  }

  HomeTemplate.prototype.setMenu = function(data){
    var view = "";
    for (var i=0; i<data.length; i++){
      var template = this.menuListTemplate;
      template = template.replace('{{link}}', data[i].link);
      template = template.replace('{{title}}', data[i].title);

      if (data[i].title == "Home"){
        template = template.replace('{{active}}', "active");
      } else {
        template = template.replace('{{active}}', "");
      }

      view = view + template;
    }
    return view;
  };

  HomeTemplate.prototype.setHomeAdSlidesIndicators = function(data){
    var view = "";
    for (var i=0; i<data.length; i++){
      var template = this.homeAdSlidesIndicatorsTemplate;
      template = template.replace('{{id}}', data[i].id);
      // 첫 번째 아이템에 active 클래스 추가
      if (i == 0){
        template = template.replace('{{active}}', "active");
      } else {
        template = template.replace('{{active}}', "");
      }
      view = view + template;
    }
    return view;
  };

  HomeTemplate.prototype.setHomeAdSlides = function(data){
    var view = "";
    for (var i=0; i<data.length; i++){
      var template = this.homeAdSlidesTemplate;
      template = template.replace('{{url}}', data[i].url);
      template = template.replace('{{image}}', data[i].image);
      template = template.replace('{{title}}', data[i].title);
      // 첫 번째 아이템에 active 클래스 추가
      if (i == 0){
        template = template.replace('{{active}}', "active");
      } else {
        template = template.replace('{{active}}', "");
      }
      view = view + template;
    }
    return view;
  };

  HomeTemplate.prototype.setHomeImageNav = function(data){
    var view = "";
    for (var i=0; i<data.length; i++){
      var template = this.homeImageNavTemplate;
      template = template.replace(/{{url}}/gi, data[i].url);
      template = template.replace(/{{link}}/gi, data[i].link)
      template = template.replace('{{image}}', data[i].image);
      template = template.replace(/{{title}}/gi, data[i].title);
      template = template.replace(/{{explanation}}/gi, data[i].explanation);
      view = view + template;
    }
    return view;
  };

  common.setNamespace('homeTemplate');
  exports.app = exports.app || {};
  exports.app.homeTemplate = HomeTemplate;
})(this);
