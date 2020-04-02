(function(exports){
  'use strict';
  function ResearchModel(dataClass) {
    //console.log("model created");
    this.dataClass = dataClass;
  }

  ResearchModel.prototype.getMenuItems = function(callback){
    // 바뀔 가능성이 매우 낮기 때문에 data를 직접 js파일에 작성한 것.
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
    ];
    callback = callback || function() {};
    callback.call(this, menuItems);
  };

  ResearchModel.prototype.getSearchFormConditions = function(callback){
    var conditions = {
      "age": [
        {"title": "19세 이하"},
        {"title": "20~24"},
        {"title": "25~29"},
        {"title": "30~34"},
        {"title": "35~39"},
        {"title": "40~44"},
        {"title": "45~49"},
        {"title": "50~54"},
        {"title": "55~59"},
        {"title": "60~64"},
        {"title": "65~69"},
        {"title": "70~74"},
        {"title": "75세 이상"}
      ],
      "style": [
        {"title": "자유형"},
        {"title": "접영"},
        {"title": "배영"},
        {"title": "개인 혼영"},
        {"title": "단체전"}
      ],
      "distance": [
        {"title": "25m"},
        {"title": "50m"},
        {"title": "100m"},
        {"title": "200m"},
        {"title": "400m"}
      ]
    };
    $.ajax({
      url: "../php-api/searchConditions.php",
      method: "GET",
      dataType: "json"
    })
    .done(function(json){
      var result = common.extand(conditions, json);
      callback = callback || function() {};
      callback.call(this, result);
    })
    .fail(function(xhr, status, errorThrown){
      //console.log("오류명: " + errorThrown);
      //console.log("상태: " + status);
    })
    .always(function(xhr, status){
      //console.log("searchConditions api 접근함");
    });
  };

  ResearchModel.prototype.getSearchResult_fromDB = function(searchConditions, callback){
    var self = this;
    this.dataClass.set_researchConditions(searchConditions);
    this.dataClass.set_filteringConditions(searchConditions);
    $.ajax({
      url: "../php-api/searchResult.php",
      data: {
        player_name: searchConditions.player_name,
        player_sex: searchConditions.player_sex,
        player_age: searchConditions.player_age,
        player_age_criteria: searchConditions.player_age_criteria,
        style: searchConditions.style,
        distance: searchConditions.distance,
        competition_year_from: searchConditions.competition_year_from,
        competition_year_to: searchConditions.competition_year_to,
        competition_name: searchConditions.competition_name,
        player_team: searchConditions.player_team
      },
      method: "GET",
      dataType: "json"
    })
    .done(function(json){
      self.dataClass.init_researchResult(json);
      callback = callback || function() {};
      callback.call(this);
    })
    .fail(function(xhr, status, errorThrown){
      //console.log("오류명: " + errorThrown);
      //console.log("상태: " + status);
    })
    .always(function(xhr, status){
      //console.log("searchResult api 접근함");
    });
  };

  ResearchModel.prototype.get_nextResult_by_mode = function(active_mode, callback){
    var output_data = this.dataClass.output_data_by_mode(active_mode);
    callback = callback || function() {};
    callback.call(this, output_data);
  };

  ResearchModel.prototype.set_outputState_current_index_by_mode = function(mode, index, callback){
    this.dataClass.set_outputState_current_index_by_mode(mode, index);
    callback = callback || function() {};
    callback.call(this);
  };

  ResearchModel.prototype.get_localStorageData = function(callback){
    var noteData = new Array();
    var settingData = new Object;
    //localStorage.removeItem('swimforever_note');
    //localStorage.removeItem('swimforever_setting');
    var temp = localStorage.getItem('swimforever_note');
    if (temp){
      noteData = JSON.parse(temp);
    } else {
      var init_noteData_str = '{"current_note_title": "노트1", "노트1": []}';
      localStorage.setItem('swimforever_note', init_noteData_str);
      noteData = JSON.parse(init_noteData_str);
    }
    var temp = localStorage.getItem('swimforever_setting');
    if (temp){
      settingData = JSON.parse(temp);
    } else {
      var init_settingData_str =
        '{"line": "2",' +
         '"displayedItem": [' +
         '{"title": "이름", "selector": ".mobile_table_pname", "style": "display: inline-block;"},' +
         '{"title": "성별", "selector": ".mobile_table_sex", "style": "display: inline-block;"},' +
         '{"title": "나이", "selector": ".mobile_table_age", "style": "display: inline-block;"},' +
         '{"title": "종목", "selector": ".mobile_table_style", "style": "display: inline-block;"},' +
         '{"title": "거리", "selector": ".mobile_table_distance", "style": "display: inline-block;"},' +
         '{"title": "기록", "selector": ".mobile_table_record", "style": "display: inline-block;"},' +
         '{"title": "팀(소속)", "selector": ".mobile_table_team", "style": "display: none;"},' +
         '{"title": "대회일시", "selector": ".mobile_table_competitionDate", "style": "display: none;"},' +
         '{"title": "대회장소", "selector": ".mobile_table_competition_name", "style": "display: none;"}' +
         ']}';
      localStorage.setItem('swimforever_setting', init_settingData_str);
      settingData = JSON.parse(init_settingData_str);
    }
    callback = callback || function() {};
    callback.call(this, noteData, settingData);
  };

  ResearchModel.prototype.init_dataClass_localStorageData = function(noteData, settingData){
    this.dataClass.init_localStorageData(noteData, settingData);
  };

  ResearchModel.prototype.getSettingData = function(callback){
    var settingData = new Object;
    settingData = this.dataClass.get_settingData();
    callback = callback || function() {};
    callback.call(this, settingData);
  };

  ResearchModel.prototype.setSettingData = function(td_line, td_array, callback){
    this.dataClass.set_settingData(td_line, td_array);
    callback = callback || function() {};
    callback.call(this);
  };

  ResearchModel.prototype.getNoteData = function(callback){
    var noteData = new Array();
    noteData = this.dataClass.get_noteData();
    callback = callback || function() {};
    callback.call(this, noteData);
  };

  ResearchModel.prototype.setNote = function(new_note_title, callback){
    this.dataClass.set_note(new_note_title);
    callback = callback || function() {};
    callback.call(this);
  };

  ResearchModel.prototype.setNoteData = function(checked_tr_indexArr, callback){
    this.dataClass.set_noteData(checked_tr_indexArr);
    callback = callback || function() {};
    callback.call(this);
  };

  ResearchModel.prototype.deleteNote = function(callback){
    var result = this.dataClass.delete_note();
    callback = callback || function() {};
    callback.call(this, result);
  };

  ResearchModel.prototype.deleteNoteData = function(checked_tr_indexArr, callback){
    this.dataClass.delete_note_data(checked_tr_indexArr);
    callback = callback || function() {};
    callback.call(this);
  };

  ResearchModel.prototype.createNewNote = function(callback){
    var result = this.dataClass.create_new_note();
    callback = callback || function() {};
    callback.call(this, result);
  };

  ResearchModel.prototype.getNoteTitleList = function(callback){
    var data = this.dataClass.get_note_title_list();
    callback = callback || function() {};
    callback.call(this, data);
  };


  ResearchModel.prototype.save_localStorageData = function(noteData, settingData){
    localStorage.setItem('swimforever_note', JSON.stringify(noteData));
    localStorage.setItem('swimforever_setting', JSON.stringify(settingData));
  };

  ResearchModel.prototype.get_researchConditions = function(callback){
    var data = new Object;
    data = this.dataClass.get_researchConditions();
    callback = callback || function() {};
    callback.call(this, data);
  };

  ResearchModel.prototype.get_filteringConditions = function(callback){
    var data = new Object;
    data = this.dataClass.get_filteringConditions();
    callback = callback || function() {};
    callback.call(this, data);
  };

  ResearchModel.prototype.getFilteringResult = function(searchConditions, callback){
    this.dataClass.set_filteringConditions(searchConditions);
    this.dataClass.filtering(searchConditions);
    callback = callback || function() {};
    callback.call(this);
  };

  ResearchModel.prototype.get_outputState_by_mode = function(active_mode, callback){
    var outputState = this.dataClass.get_outputState_by_mode(active_mode);
    callback = callback || function() {};
    callback.call(this, outputState);
  };

  ResearchModel.prototype.set_outputState_by_mode = function(active_mode, callback){
    this.dataClass.set_outputState_by_mode(active_mode);
    callback = callback || function() {};
    callback.call(this);
  };

  ResearchModel.prototype.get_saved_data = function(callback){
    var data = this.dataClass.getSavedData();
    callback = callback || function() {};
    callback.call(this, data);
  };

  ResearchModel.prototype.sorting = function(mode, category, order, callback){
    this.dataClass.sorting_data(mode, category, order);
    callback = callback || function() {};
    callback.call(this);
  };

  common.setNamespace('researchModel');
  exports.app = exports.app || {};
  exports.app.researchModel = ResearchModel;
})(this);
