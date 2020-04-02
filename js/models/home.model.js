(function(exports){
  'use strict';
  function HomeModel(){
    console.log('Model created');
  }

  HomeModel.prototype.getMenuItems = function(callback){
    var menuItems = [
      {
        "id": 0,
        "title": "Home",
        "link": "./index.html"
      },
      {
        "id": 1,
        "title": "기록 검색",
        "link": "./research.html"
      },
      /*
      {
        "id": 2,
        "title": "게시판",
        "link": "#"
      },
      {
        "id": 3,
        "title": "About Us",
        "link": "#"
      }
      */
    ];
    callback = callback || function() {};
    callback.call(this, menuItems);
  };

  HomeModel.prototype.getHomeAdImages = function(callback){
    var homeAdImages = new Array();
    $.ajax({
      url: "../php-api/homeAd.php",
      method: "GET",
      dataType: "json"
    })
    .done(function(json){
      callback = callback || function() {};
      callback.call(this, json);
    })
    .fail(function(xhr, status, errorThrown){
      console.log("오류명: " + errorThrown);
      console.log("상태: " + status);
    })
    .always(function(xhr, status){
      console.log("homeAd api 접근함");
    });
  };

  HomeModel.prototype.getHomeImageNav = function(callback){
    var homeImageNav = [
      {
        "image": "../img/icon/search.png",
        "title": "기록 검색",
        "explanation": "관심 있는 종목 또는 선수에 대한 기록을 편하게 찾아볼 수 있는 기록 검색 서비스입니다.다양한 조건을 통한 기록 검색뿐만 아니라 원하는 기록들만 따로 모아서 볼 수 있는 노트 기능까지!",
        "url": "./research.html",
      },
      /*
      {
        "image": "../img/icon/community.png",
        "title": "게시판",
        "explanation": "SwimForever과 사용자분들과의 소통을 위한 게시판 서비스입니다.SwimForever의 공지사항을 확인할 수 있고, 원하는 경기 기록에 대한 업데이트를 문의하실 수 있습니다.",
        "url": "#",
      },
      {
        "image": "../img/icon/information.png",
        "title": "About Us",
        "explanation": "SwimForever에 대해 좀 더 자세한 정보를 알고 싶다면 여기를 클릭하세요!",
        "url": "#",
      }
      */
    ];
    callback = callback || function() {};
    callback.call(this, homeImageNav);
  };

  common.setNamespace('homeModel');
  exports.app = exports.app || {};
  exports.app.homeModel = HomeModel;
})(this);
