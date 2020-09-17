(function(exports) {
  'use strict';

  function ResearchDataClass() {
    //console.log('dataclass created');
    this.outputState_resultTable = new Object;
    this.outputState_noteTable = new Object;
    this.researchConditions = new Object;
    this.filteringConditions = new Object;
    this.research_result = new Array();
    this.filtering_data = new Array();
    this.localStorageData_note = new Array();
    this.localStorageData_setting = new Object;
    this.sort_category = '기록';
    this.sort_order = '오름차순';
  }


  ResearchDataClass.prototype.init_researchResult = function(data) {
    var self = this;
    this.research_result = data;
    this.filtering_data = data;
    this.outputState_resultTable.currentIndex = 1;
    this.outputState_resultTable.finalIndex = 0;
  };

  ResearchDataClass.prototype.init_localStorageData = function(noteData, settingData) {
    var self = this;
    this.localStorageData_note = noteData;
    this.localStorageData_setting = settingData;
    var current_note_title = this.localStorageData_note.current_note_title;
    if (this.localStorageData_note[current_note_title].length > 0) {
      this.set_outputState_by_mode('note_table_mode');
    } else {
      this.outputState_noteTable.currentIndex = 1;
      this.outputState_noteTable.finalIndex = 0;
    }
  };

  ResearchDataClass.prototype.get_noteData = function() {
    return this.localStorageData_note;
  };

  ResearchDataClass.prototype.set_note = function(new_note_title) {
    this.localStorageData_note.current_note_title = new_note_title;
    this.outputState_noteTable.currentIndex = 1;
  };

  ResearchDataClass.prototype.set_noteData = function(checked_tr_indexArr) {
    var self = this;
    var new_dataArr = new Array();
    var tempArr = new Array();
    var current_note_title = this.localStorageData_note.current_note_title;
    var current_note_data = this.localStorageData_note[current_note_title];
    var current_note_last_index = 0;
    if (current_note_data.length > 0) {
      current_note_last_index = current_note_data[current_note_data.length - 1].index;
    }
    var original_data = self.research_result;
    for (var i = 0; i < checked_tr_indexArr.length; i++) {
      (function(i) {
        var index = checked_tr_indexArr[i];
        new_dataArr.push(original_data[index]);
      })(i);
    }
    tempArr = current_note_data.concat(new_dataArr);
    console.log(tempArr);
    this.localStorageData_note[current_note_title] = tempArr;
  };

  ResearchDataClass.prototype.create_new_note = function() {
    var result = false;
    var self = this;
    var note_titleArr = Object.keys(this.localStorageData_note);
    var first_empty_note_title = "";
    var compareArr = ['노트1', '노트2', '노트3', '노트4', '노트5'];
    if (note_titleArr.length < 6) {
      for (var i = 0; i < compareArr.length; i++) {
        var compare_title = compareArr[i];
        if (note_titleArr.indexOf(compare_title) == -1) {
          first_empty_note_title = compare_title;
          break;
        }
      }
      this.localStorageData_note[first_empty_note_title] = new Array();
      this.localStorageData_note.current_note_title = first_empty_note_title;
      this.outputState_noteTable.currentIndex = 1;
      this.outputState_noteTable.finalIndex = 0;
      result = true;
    }
    return result;
  };

  ResearchDataClass.prototype.delete_note = function() {
    var result = false;
    var noteDataKeys = Object.keys(this.localStorageData_note);
    var current_note_title = this.localStorageData_note.current_note_title;
    if (noteDataKeys.length > 2) {
      delete this.localStorageData_note[current_note_title];
      noteDataKeys = Object.keys(this.localStorageData_note);
      var first_note_title = noteDataKeys[1];
      this.localStorageData_note.current_note_title = first_note_title;
      this.outputState_noteTable.currentIndex = 1;
      result = true;
    }
    return result;
  };

  ResearchDataClass.prototype.delete_note_data = function(checked_tr_indexArr) {
    var current_note_title = this.localStorageData_note.current_note_title;
    var current_note_data = this.localStorageData_note[current_note_title];
    for (var i = 0; i < checked_tr_indexArr.length; i++) {
      var index = checked_tr_indexArr[i];
      current_note_data[index] = "";
    }
    while (current_note_data.indexOf("") != -1) {
      var index = current_note_data.indexOf("");
      if (index != -1) {
        current_note_data.splice(index, 1);
      }
    }
    this.set_index_with_noteData(current_note_data);
  };

  ResearchDataClass.prototype.get_note_title_list = function() {
    var result = Object.keys(this.localStorageData_note);
    result[0] = this.localStorageData_note.current_note_title;
    return result;
  };

  ResearchDataClass.prototype.get_settingData = function() {
    return this.localStorageData_setting;
  };

  ResearchDataClass.prototype.set_settingData = function(td_line, td_array) {
    var displayedItem = this.localStorageData_setting.displayedItem;
    var checked_tdArr = new Array();
    for (var i = 0; i < td_array.length; i++) {
      (function(i) {
        var td_node = td_array[i];
        var td_id = td_node.getAttribute('id');
        checked_tdArr.push(td_id);
      })(i);
    }
    this.localStorageData_setting.line = td_line;
    for (var i = 0; i < displayedItem.length; i++) {
      (function(i) {
        var item = displayedItem[i];
        if (checked_tdArr.indexOf(item.title) !== -1) {
          item.style = "display: inline-block;";
        } else {
          item.style = "display: none;";
        }
      })(i);
    }
  };

  ResearchDataClass.prototype.get_researchConditions = function() {
    return this.researchConditions;
  };

  ResearchDataClass.prototype.set_researchConditions = function(data) {
    this.researchConditions = data;
  };

  ResearchDataClass.prototype.get_filteringConditions = function() {
    return this.filteringConditions;
  };

  ResearchDataClass.prototype.set_filteringConditions = function(data) {
    this.filteringConditions = data;
  };

  ResearchDataClass.prototype.set_outputState_current_index_by_mode = function(mode, clickedIndex) {
    var self = this;
    var data = new Array();
    var data_currentIndex = 0;
    if (mode === 'result_data_table_mode') {
      data = this.outputState_resultTable;
      data_currentIndex = data.currentIndex;
    } else {
      data = this.outputState_noteTable;
      data_currentIndex = data.currentIndex;
    }
    switch (clickedIndex) {
      case '«':
        var temp_index = parseInt(data.currentIndex) - 1;
        if (temp_index < 1) {
          data.currentIndex = 1;
        } else {
          data.currentIndex = temp_index;
        }
        break;
      case '»':
        var temp_index = parseInt(data.currentIndex) + 1;
        if (temp_index > data.finalIndex) {
          data.currentIndex = data.finalIndex;
        } else {
          data.currentIndex = temp_index;
        }
        break;
      default:
        data.currentIndex = clickedIndex;
    }
  };

  ResearchDataClass.prototype.set_outputState_by_mode = function(mode) {
    var self = this;
    var temp_outputState = new Object;
    var data = new Array();
    if (mode === 'result_data_table_mode') {
      data = self.filtering_data;
      temp_outputState = this.outputState_resultTable;
    } else if (mode === 'note_table_mode') {
      var current_note_title = self.localStorageData_note.current_note_title;
      data = self.localStorageData_note[current_note_title];
      temp_outputState = this.outputState_noteTable;
    }
    temp_outputState.currentIndex = 1;
    if ((data.length % 30) > 0) {
      temp_outputState.finalIndex = parseInt(data.length / 30) + 1;
    } else {
      temp_outputState.finalIndex = parseInt(data.length / 30);
    }
  };

  ResearchDataClass.prototype.get_outputState_by_mode = function(mode) {
    var self = this;
    var temp_outputState = new Object;
    if (mode === 'result_data_table_mode') {
      temp_outputState = this.outputState_resultTable;
    } else if (mode === 'note_table_mode') {
      temp_outputState = this.outputState_noteTable;
    }
    return temp_outputState;
  };

  ResearchDataClass.prototype.output_data_by_mode = function(mode) {
    var self = this;
    var datablock_index, start_index, final_index = 0;
    var output = new Array();
    var all_data = new Array();
    if (mode === 'result_data_table_mode') {
      all_data = this.filtering_data;
      datablock_index = this.outputState_resultTable.currentIndex - 1;
    } else {
      all_data = this.localStorageData_note[self.localStorageData_note.current_note_title];
      datablock_index = this.outputState_noteTable.currentIndex - 1;
    }
    start_index = 30 * datablock_index;
    final_index = start_index + 30;
    for (var i = start_index; i < final_index; i++) {
      if ((i < all_data.length) && (all_data.length > 0)) {
        var temp = new Object;
        temp.index = all_data[i].index;
        temp.player_name = all_data[i].player_name;
        temp.player_sex = all_data[i].player_sex;
        temp.player_age_competition = all_data[i].age_from + '~' + all_data[i].age_to;
        temp.player_age_current = self.get_age_current(all_data[i].year, all_data[i].age_from, all_data[i].age_to);
        temp.style = all_data[i].style;
        temp.distance = all_data[i].distance + 'm';
        temp.record = self.get_record_form(all_data[i].record);
        temp.competition_date = self.get_date_form(all_data[i].year, all_data[i].month, all_data[i].day);
        temp.competition_name = all_data[i].competition_name;
        temp.player_team = all_data[i].player_team;
        temp.remark = all_data[i].remark
        output.push(temp);
      } else {
        break;
      }
    }
    return output;
  };

  ResearchDataClass.prototype.getSavedData = function() {
    var self = this;
    var saved_data_indexArr = new Array();
    var current_page_result_data = new Array();
    var current_note_data = this.localStorageData_note[this.localStorageData_note.current_note_title];
    var original_data = this.filtering_data;
    var current_index_resultTable = this.outputState_resultTable.currentIndex - 1;
    var start_index = 30 * current_index_resultTable;
    var final_index = start_index + 30;
    for (var i = start_index; i < final_index; i++) {
      if (i < original_data.length) {
        current_page_result_data.push(original_data[i]);
      }
    }
    var temp_note_data = common.cloneObject(current_note_data);
    var temp_page_result_data = common.cloneObject(current_page_result_data);
    for (var i=0; i<temp_note_data.length; i++){
      delete temp_note_data[i].index;
      temp_note_data[i] = JSON.stringify(temp_note_data[i]);
    }
    for (var i=0; i<temp_page_result_data.length; i++){
      delete temp_page_result_data[i].index;
      temp_page_result_data[i] = JSON.stringify(temp_page_result_data[i]);
    }
    for (var i = 0; i < temp_note_data.length; i++) {
      var note_data = temp_note_data[i];
      var index = temp_page_result_data.indexOf(note_data);
      if (index != -1) {
        saved_data_indexArr.push(index);
      }
    }
    return saved_data_indexArr;
  };

  ResearchDataClass.prototype.sorting_data = function(mode, sort_category, sort_order) {
    var self = this;
    var data = new Array();
    if (sort_category != ""){
      this.sort_category = sort_category;
    }
    if (sort_order != ""){
      this.sort_order = sort_order;
    }
    var category = this.sort_category;
    var order = this.sort_order;
    if (mode === 'result_data_table_mode') {
      data = this.filtering_data;
    } else {
      data = this.localStorageData_note[self.localStorageData_note.current_note_title];
    }
    switch (category) {
      case '이름':
        data.sort(function(a, b) {
          var nameA = a.player_name.toUpperCase();
          var nameB = b.player_name.toUpperCase();
          var result = self.sort_by_order(order, nameA, nameB);
          return result;
        });
        break;
      case '성별':
        data.sort(function(a, b){
          var sexA = a.player_sex;
          var sexB = b.player_sex;
          var result = self.sort_by_order(order, sexA, sexB);
          return result;
        });
        break;
      case '나이그룹':
        data.sort(function(a, b){
          var ageFromA = parseInt(a.age_from);
          var ageFromB = parseInt(b.age_from);
          var result = self.sort_by_order(order, ageFromA, ageFromB);
          return result;
        });
        break;
      case '종목':
        data.sort(function(a, b){
          var styleA = a.style;
          var styleB = b.style;
          var result = self.sort_by_order(order, styleA, styleB);
          return result;
        });
        break;
      case '거리':
        data.sort(function(a, b){
          var distanceA = parseInt(a.distance);
          var distanceB = parseInt(b.distance);
          var result = self.sort_by_order(order, distanceA, distanceB);
          return result;
        });
        break;
      case '기록':
        data.sort(function(a, b){
          var recordA = a.record;
          var recordB = b.record;
          var result = self.sort_by_order(order, recordA, recordB);
          return result;
        });
        break;
      case '소속':
        data.sort(function(a, b){
          var teamA = a.player_team;
          var teamB = b.player_team;
          var result = self.sort_by_order(order, teamA, teamB);
          return result;
        });
        break;
      case '대회명':
        data.sort(function(a, b){
          var competitionNameA = a.competition_name;
          var competitionNameB = b.competition_name;
          var result = self.sort_by_order(order, competitionNameA, competitionNameB);
          return result;
        });
        break;
      case '대회일시':
        data.sort(function(a, b){
          var competitionDateA, competitionDateB;
          competitionDateA = a.year;
          competitionDateB = b.year;
          if (a.month.length < 2){
            competitionDateA += '0';
          }
          if (b.month.length < 2){
            competitionDateB += '0';
          }
          competitionDateA += a.month;
          competitionDateB += b.month;
          if (a.day.length < 2){
            competitionDateA += '0';
          }
          if (b.day.length < 2){
            competitionDateB += '0';
          }
          competitionDateA += a.day;
          competitionDateB += b.day;
          var result = self.sort_by_order(order, competitionDateA, competitionDateB);
          return result;
        });
        break;
    }
    if (mode === 'note_table_mode'){
      this.set_index_with_noteData(data);
    }
  };

  ResearchDataClass.prototype.sort_by_order = function(mode, a, b){
    if (mode === '오름차순'){
      if (a < b){
        return -1;
      }
      if (a > b){
        return 1;
      }
      return 0;
    } else if (mode === '내림차순'){
      if (a < b){
        return 1;
      }
      if (a > b){
        return -1;
      }
      return 0;
    }
  };

  ResearchDataClass.prototype.filtering = function(searchConditions) {
    var self = this;
    var original_data = this.research_result;
    var player_name = searchConditions.player_name;
    var player_sex = common.string_with_square_brakets_to_array(searchConditions.player_sex);
    var player_age = common.string_with_square_brakets_to_array(searchConditions.player_age);
    var player_age_criteria = searchConditions.player_age_criteria;
    var style = common.string_with_square_brakets_to_array(searchConditions.style);
    var distance = common.string_with_square_brakets_to_array(searchConditions.distance);
    var player_team = searchConditions.player_team;
    var competition_year_from = searchConditions.competition_year_from;
    var competition_year_to = searchConditions.competition_year_to;
    var competition_name = searchConditions.competition_name;
    this.outputState_resultTable.currentIndex = 1;
    this.filtering_data = new Array();
    // 필터링
    this.filtering_data = original_data.filter(function(item, index, array) {
      return (
        self.filtering_player_name(item, player_name) &&
        self.filtering_player_sex(item, player_sex) &&
        self.filtering_style(item, style) &&
        self.filtering_distance(item, distance) &&
        self.filtering_player_age(item, player_age, player_age_criteria) &&
        self.filtering_competition_name(item, competition_name) &&
        self.filtering_competition_year(item, competition_year_from, competition_year_to) &&
        self.filtering_player_team(item, player_team)
      );
    });
  };

  ResearchDataClass.prototype.get_age_current = function(year, age_from, age_to) {
    var age_current = '';
    var currentYear = new Date().getFullYear();
    var competitionYear = year;
    var gap = currentYear - parseInt(competitionYear);
    age_current = (parseInt(age_from) + gap) + '~' + (parseInt(age_to) + gap);
    return age_current;
  };

  ResearchDataClass.prototype.get_record_form = function(record) {
    var recordData = '';
    var minutes = record.substring(0, 2);
    var seconds = record.substring(2, 4);
    var mseconds = record.substring(4, 6);
    if (minutes != "00") {
      recordData = minutes + ':' + seconds + '.' + mseconds;
    } else {
      recordData = seconds + '.' + mseconds;
    }
    return recordData;
  };

  ResearchDataClass.prototype.get_date_form = function(year, month, date) {
    var dateData = '';
    var secondDate_startIndex = date.indexOf('~');
    if (secondDate_startIndex != -1) {
      dateData = date.substr(0, secondDate_startIndex);
    } else {
      dateData = date;
    }
    return year + '.' + month + '.' + dateData;
  };

  ResearchDataClass.prototype.filtering_player_name = function(item, condition) {
    var result = true;
    if (condition != "") {
      if (item.player_name === condition) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  };

  ResearchDataClass.prototype.filtering_player_sex = function(item, condition) {
    var result = true;
    var count = 0;
    if (condition.length > 0) {
      for (var i = 0; i < condition.length; i++) {
        (function(i) {
          var condition_value = condition[i].replace("자", "");
          if ((item.player_sex === condition_value) || (item.player_sex === condition[i]) || (condition[i] === '전체')) {
            count++;
          }
        })(i);
      }
    }
    if (count < 1) {
      result = false;
    }
    return result;
  };

  ResearchDataClass.prototype.filtering_style = function(item, condition) {
    var result = true;
    var count = 0;
    if (condition.length > 0) {
      for (var i = 0; i < condition.length; i++) {
        (function(i) {
          var condition_value = condition[i];
          if (item.style === condition_value) {
            count++;
          }
        })(i);
      }
      if (count < 1) {
        result = false;
      }
    }
    return result;
  };

  ResearchDataClass.prototype.filtering_distance = function(item, condition) {
    var result = true;
    var count = 0;
    if (condition.length > 0) {
      for (var i = 0; i < condition.length; i++) {
        (function(i) {
          var condition_value = condition[i].replace(/m/gi, "");
          if (item.distance === condition_value) {
            count++;
          }
          if (condition_value === "400") {
            if (item.distance === "800") {
              count++;
            }
          }
        })(i);
      }
      if (count < 1) {
        result = false;
      }
    }
    return result;
  };

  ResearchDataClass.prototype.filtering_player_age = function(item, condition, criteria) {
    var result = true;
    var count = 0;
    var wavePoint, condition_age_from, condition_age_to, item_age_from, item_age_to;
    item_age_from = item.age_from;
    item_age_to = item.age_to;
    if (condition.length > 0) {
      for (var i = 0; i < condition.length; i++) {
        (function(i) {
          var condition_value = condition[i];
          wavePoint = condition_value.indexOf('~');
          condition_age_from = condition_value.substring(0, wavePoint);
          condition_age_to = condition_value.substring(wavePoint + 1, condition_value.length);
          if (criteria === 'age_criteria_present') {
            var currentYear = new Date().getFullYear();
            var gap = currentYear - parseInt(item.year);
            item_age_from = item_age_from + gap;
            item_age_to = item_age_to + gap;
          }
          if ((condition_age_from >= item_age_from) && (condition_age_from <= item_age_to)) {
            count++;
          } else if ((condition_age_to >= item_age_from) && (condition_age_to <= item_age_to)) {
            count++;
          } else if ((condition_age_from <= item_age_from) && (condition_age_to >= item_age_to)) {
            count++;
          } else if ((condition_age_to >= item_age_from) && (condition_age_to <= item_age_to)) {
            count++;
          }
        })(i);
      }
      if (count < 1) {
        result = false;
      }
    }
    return result;
  };

  ResearchDataClass.prototype.filtering_competition_name = function(item, condition) {
    var result = true;
    if (condition != "") {
      if (item.competition_name === condition) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  };

  ResearchDataClass.prototype.filtering_competition_year = function(item, condition_year_from, condition_year_to) {
    var result = true;
    var from = parseInt(condition_year_from);
    var to = parseInt(condition_year_to);
    var item_year = parseInt(item.year);
    if (!((from <= item_year) && (item_year <= to))) {
      result = false;
    }
    return result;
  };

  ResearchDataClass.prototype.filtering_player_team = function(item, condition) {
    var result = true;
    if (condition != "") {
      if (item.player_team === condition) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  };

  ResearchDataClass.prototype.set_index_with_noteData = function(dataArr) {
    for (var i = 0; i < dataArr.length; i++) {
      dataArr[i].index = String(i);
    }
  };

  common.setNamespace('researchDataClass');
  exports.app = exports.app || {};
  exports.app.researchDataClass = ResearchDataClass;
})(this);
