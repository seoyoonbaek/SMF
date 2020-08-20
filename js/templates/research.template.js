(function(exports){
  'use strict';
  function ResearchTemplate(){
    //console.log("template created");
    this.menuListTemplate =
      '<li class="nav-item {{active}}">' +
        '<a class="nav-link text-uppercase text-expanded" href="{{link}}">{{title}}</a>' +
      '</li>';
    this.searchConditionTemplate_style =
      '<div class="custom-control custom-checkbox">' +
        '<input type="checkbox" class="custom-control-input" id="{{style}}">' +
        '<label class="custom-control-label" for="{{style}}">{{style}}</label>' +
      '</div>';
    this.searchConditionTemplate_age =
      '<div class="col-4 col-sm-3 pr-0 custom-control custom-checkbox custom-control-inline">' +
        '<input type="checkbox" class="custom-control-input" id="{{age}}">' +
        '<label class="custom-control-label" for="{{age}}">{{age}}</label>' +
      '</div>';
    this.searchConditionTemplate_distance =
      '<div class="custom-control custom-checkbox">' +
        '<input type="checkbox" class="custom-control-input" id="{{distance}}">' +
        '<label class="custom-control-label" for="{{distance}}">{{distance}}</label>' +
      '</div>';
    this.searchConditionTemplate_year =
      '<option {{selected}}>{{year}}</option>';
    this.searchConditionTemplate_competition_name =
      '<span>{{competition_name}}</span>';
    this.searchConditionTemplate_team =
      '<span>{{team}}</span>';
    this.tableTemplate =
      '<thead>' +
        '<tr>' +
          '{{th0}}' +
          '{{th1}}' +
          '{{th2}}' +
          '{{th3}}' +
          '{{th4}}' +
          '{{th5}}' +
          '{{th6}}' +
          '{{th7}}' +
          '{{th8}}' +
          '{{th9}}' +
          '{{th10}}' +
          '{{th11}}' +
        '</tr>' +
      '</thead>' +
      '<tbody>' +
        '{{initMemo}}' +
      '</tbody>';
    this.initial_tableTemplate = this.tableTemplate;
    this.th_number_template =
      '<th scope="row" class="table_number">' +
        '<div class="th-text">번호</div>' +
       '</th>';
    this.th_pname_template =
      '<th scope="row" class="table_pname">' +
        '<div class="th-text">이름</div>' +
      '</th>';
    this.th_sex_template =
      '<th scope="row" class="table_sex">' +
        '<div class="th-text">성별</div>' +
      '</th>';
    this.th_age_template =
      '<th scope="row" class="table_age">' +
        '<div class="th-text">나이 그룹</div>' +
      '</th>';
    this.th_style_template =
      '<th scope="row" class="table_style">' +
        '<div class="th-text">종목</div>' +
      '</th>';
    this.th_distance_template =
      '<th scope="row" class="table_distance">' +
        '<div class="th-text">거리</div>' +
      '</th>';
    this.th_record_template =
      '<th scope="row" class="table_record">' +
        '<div class="th-text">기록</div>' +
      '</th>';
    this.th_team_template =
      '<th scope="row" class="table_team">' +
        '<div class="th-text">소속</div>' +
      '</th>';
    this.th_competition_name_template =
      '<th scope="row" class="table_competition_name">' +
        '<div class="th-text">대회명</div>' +
      '</th>';
    this.th_competitionDate_template =
      '<th scope="row" class="table_competitionDate">' +
        '<div class="th-text">대회일시</div>' +
      '</th>';
    this.th_remark_template =
      '<th scope="row" class="table_remark">' +
        '<div class="th-text">비고</div>' +
      '</th>';
    this.th_checkbox_template =
      '<th scope="row" class="table_checkbox">' +
        '<input class="select_all_records" type="checkbox">' +
      '</th>';
    this.loading_searchResultTemplate =
      '<div class="displayLoading spinner-border text-primary" role="status">' +
        '<span class="sr-only">Loading...</span>' +
      '</div>';
    this.no_data_ErrorMsgTemplate =
      '<tr class="initMemo">' +
        '<th scope="row"></th>' +
        '<td colspan="12">' +
          '<span>{{message}}</span>' +
        '</td>' +
      '</tr>';
    this.searchResultTemplate =
      '<tr class="data">' +
        '<th scope="row" style="display: none">{{index}}</th>' +
        '{{td0}}' +
        '{{td1}}' +
        '{{td2}}' +
        '{{td3}}' +
        '{{td4}}' +
        '{{td5}}' +
        '{{td6}}' +
        '{{td7}}' +
        '{{td8}}' +
        '{{td9}}' +
        '{{td10}}' +
        '{{td11}}' +
      '</tr>';
    this.initial_searchResultTemplate = this.searchResultTemplate;
    this.td_number_template =
      '<td class="table_number mobile_table_number mobile_col-4">{{number}}</td>';
    this.td_pname_template =
      '<td class="table_pname mobile_table_pname mobile_col-4">{{player_name}}</td>';
    this.td_sex_template =
      '<td class="table_sex mobile_table_sex mobile_col-4">{{player_sex}}</td>';
    this.td_age_template =
      '<td class="table_age mobile_table_age mobile_col-4">{{player_age_competition}}</td>';
    this.td_style_template =
      '<td class="table_style mobile_table_style mobile_col-4">{{style}}</td>';
    this.td_distance_template =
      '<td class="table_distance mobile_table_distance mobile_col-4">{{distance}}</td>';
    this.td_record_template =
      '<td class="table_record mobile_table_record mobile_col-4">{{record}}</td>';
    this.td_team_template =
      '<td class="table_team mobile_table_team mobile_col-4">{{player_team}}</td>';
    this.td_competition_name_template =
      '<td class="table_competition_name mobile_table_competition_name mobile_col-4">{{competition_name}}</td>';
    this.td_competitionDate_template =
      '<td class="table_competitionDate mobile_table_competitionDate mobile_col-4">{{competition_date}}</td>';
    this.td_remark_template =
      '<td class="table_remark mobile_table_remark mobile_col-4">{{remark}}</td>';
    this.td_checkbox_template =
      '<td class="table_checkbox">' +
        '<input class="select_record" type="checkbox">' +
      '</td>';
    this.noteTableTemplate =
      '<thead>' +
        '<tr>' +
          '<th scope="row" class="table_number">' +
            '<div class="th-text">번호</div>' +
          '</th>' +
          '<th scope="row" class="table_pname">' +
            '<div class="th-text">이름</div>' +
          '</th>' +
          '<th scope="row" class="table_sex">' +
            '<div class="th-text">성별</div>' +
          '</th>' +
          '<th scope="row" class="table_age">' +
            '<div class="th-text">나이 그룹</div>' +
          '</th>' +
          '<th scope="row" class="table_style">' +
            '<div class="th-text">종목</div>' +
          '</th>' +
          '<th scope="row" class="table_distance">' +
            '<div class="th-text">거리</div>' +
          '</th>' +
          '<th scope="row" class="table_record">' +
            '<div class="th-text">기록</div>' +
          '</th>' +
          '<th scope="row" class="table_team">' +
            '<div class="th-text">소속</div>' +
          '</th>' +
          '<th scope="row" class="table_competition_name">' +
            '<div class="th-text">대회명</div>' +
          '</th>' +
          '<th scope="row" class="table_competitionDate">' +
            '<div class="th-text">대회일시</div>' +
          '</th>' +
          '<th scope="row" class="table_remark">' +
            '<div class="th-text">비고</div>' +
          '</th>' +
          '<th scope="row" class="table_checkbox">' +
            '<input class="select_all_records" type="checkbox">' +
          '</th>' +
        '</tr>' +
      '</thead>' +
      '<tbody>' +
        '{{initMemo}}' +
      '</tbody>';
    this.noteDataTemplate =
      '<tr class="data">' +
        '<th scope="row" style="display: none">{{index}}</th>' +
        '<td class="table_number mobile_table_number mobile_col-4">{{number}}</td>' +
        '<td class="table_pname mobile_table_pname mobile_col-4">{{player_name}}</td>' +
        '<td class="table_sex mobile_table_sex mobile_col-4">{{player_sex}}</td>' +
        '<td class="table_age mobile_table_age mobile_col-4">{{player_age_competition}}</td>' +
        '<td class="table_style mobile_table_style mobile_col-4">{{style}}</td>' +
        '<td class="table_distance mobile_table_distance mobile_col-4">{{distance}}</td>' +
        '<td class="table_record mobile_table_record mobile_col-4">{{record}}</td>' +
        '<td class="table_team mobile_table_team mobile_col-4">{{player_team}}</td>' +
        '<td class="table_competition_name mobile_table_competition_name mobile_col-4">{{competition_name}}</td>' +
        '<td class="table_competitionDate mobile_table_competitionDate mobile_col-4">{{competition_date}}</td>' +
        '<td class="table_remark mobile_table_remark mobile_col-4">{{remark}}</td>' +
        '<td class="table_checkbox">' +
          '<input class="select_record" type="checkbox">' +
        '</td>' +
      '</tr>';
    this.paginationTemplate =
      '<ul class="pagination justify-content-center" style="margin:20px 0">' +
        '{{pagelist}}' +
      '</ul>';
    this.searchConditionsTemplate =
      '<p class="{{is_single}}">#{{searchCondition}}</p>';
    this.mobileTool_noteTemplate =
      '<div class="current_table_state d-block d-sm-inline-block mb-3 mb-sm-0">' +
        '<div class="mobile_note_active_btn mr-2 d-inline-block">' +
          '<select class="select_notes mr-2">' +
            '{{notelist}}' +
          '</select>' +
          '<label class="switch mr-1 mb-0">' +
            '<input type="checkbox">' +
            '<span class="slider round"></span>' +
          '</label>' +
          '<p class="p_note_hide active">노트 숨김</p>' +
          '<p class="p_note_open">노트 열림</p>' +
        '</div>' +
      '</div>' +
      '<div class="mobile_note_table_tools_btn d-block d-sm-inline-block">' +
        '<div class="select_all_records btn btn-secondary mr-2">' +
          '전체 기록 선택' +
        '</div>' +
        '<div class="save_records_to_note btn btn-secondary mr-2">' +
        '기록 담기' +
        '</div>' +
        '<div class="create_new_note btn btn-secondary mr-2">' +
          '새 노트' +
        '</div>' +
        '<div class="delete_note btn btn-secondary mr-2">' +
          '노트 삭제' +
        '</div>' +
        '<div class="delete_records btn btn-secondary mr-2">' +
          '기록 삭제' +
        '</div>' +
      '</div>';
    this.mobileTool_sortTemplate =
      '<div class="text-center m-1 mobile_select_sort">' +
        '<span class="pt-2 mr-2">기준:</span>' +
        '<div class="selectbox mr-2 d-inline-block" id="mobile_searchResult_sort_category">' +
          '<label class="select_label" for="mobile_select_searchResult_sort_category">기록</label>' +
          '<select id="mobile_select_searchResult_sort_category" class="select_sort_category">' +
            '<option selected>기록</option>' +
            '<option>이름</option>' +
            '<option>성별</option>' +
            '<option>나이그룹</option>' +
            '<option>종목</option>' +
            '<option>거리</option>' +
            '<option>기록</option>' +
            '<option>소속</option>' +
            '<option>대회명</option>' +
            '<option>대회일시</option>' +
          '</select>' +
        '</div>' +
        '<div class="selectbox d-inline-block" id="mobile_searchResult_sort_order">' +
          '<label class="select_label" for="mobile_select_searchResult_sort_order">오름차순</label>' +
          '<select id="mobile_select_searchResult_sort_order" class="select_sort_order">' +
            '<option selected>오름차순</option>' +
            '<option>내림차순</option>' +
          '</select>' +
        '</div>' +
      '</div>';
    this.mobileTool_settingTemplate =
    /*
      '<div class="form-group col-12 col-sm-5 p-0">' +
        '<label class="ml-2 small">출력 형식</label>' +
        '<div id="mobile_setting_td_line" class="radio_items">' +
          '<div class="custom-control custom-radio custom-control-inline">' +
            '<input type="radio" id="td_single_line" class="custom-control-input">' +
            '<label class="custom-control-label" for="td_single_line">1줄로 보기(3개)</label>' +
          '</div>' +
          '<div class="custom-control custom-radio custom-control-inline">' +
            '<input type="radio" id="td_double_line" class="custom-control-input" checked>' +
            '<label class="custom-control-label" for="td_double_line">2줄로 보기(6개)</label>' +
          '</div>' +
        '</div>' +
      '</div>' +
    */
      '<div class="form-group col-12 col-sm-7 p-0">' +
        '<label class="ml-2 small">출력 항목</label>' +
        '<div class="row checkbox_items mr-0 ml-0" id="mobile_setting_td_category">' +
          '{{categorylist}}' +
        '</div>' +
      '</div>';
      /*
      '<div class="w-100">' +
        '<button type="button" name="button" class="btn btn-warning update_settingData_btn" aria-label="Update settingData">' +
          '<span>적용</span>' +
        '</button>' +
      '</div>';*/
  }

  ResearchTemplate.prototype.setMenu = function(data){
    var view = "";
    for (var i=0; i<data.length; i+=1){
      var template = this.menuListTemplate;
      template = template.replace('{{link}}', data[i].link);
      template = template.replace('{{title}}', data[i].title);
      if (data[i].title == "기록 검색"){
        template = template.replace('{{active}}', "active");
      } else {
        template = template.replace('{{active}}', "");
      }
      view = view + template;
    }
    return view;
  };

  ResearchTemplate.prototype.setSearchForm_style = function(data){
    var view = "";
    if (data.style){
      for (var i=0; i<data.style.length; i+=1){
        var template = this.searchConditionTemplate_style;
        template = template.replace(/{{style}}/gi, data.style[i].title);
        view = view + template;
      }
    }
    return view;
  };

  ResearchTemplate.prototype.setSearchForm_age = function(data){
    var view = "";
    if (data.age){
      for (var i=0; i<data.age.length; i+=1){
        var template = this.searchConditionTemplate_age;
        template = template.replace(/{{age}}/gi, data.age[i].title);
        view = view + template;
      }
    }
    return view;
  };

  ResearchTemplate.prototype.setSearchForm_distance = function(data){
    var view = "";
    if (data.distance){
      for (var i=0; i<data.distance.length; i+=1){
        var template = this.searchConditionTemplate_distance;
        template = template.replace(/{{distance}}/gi, data.distance[i].title);
        view = view + template;
      }
    }
    return view;
  };

  ResearchTemplate.prototype.setSearchForm_year_from = function(data){
    var view = "";
    if (data.year){
      for (var i=0; i<data.year.length; i+=1){
        var template = this.searchConditionTemplate_year;
        if (i==0){
          template = template.replace('{{selected}}', 'selected');
        } else {
          template = template.replace('{{selected}}', '');
        }
        template = template.replace(/{{year}}/gi, data.year[i].title);
        view = view + template;
      }
    }
    return view;
  };

  ResearchTemplate.prototype.setSearchForm_year_to = function(data){
    var view = "";
    if (data.year){
      for (var i=(data.year.length - 1); i>=0; i--){
        var template = this.searchConditionTemplate_year;
        if (i == (data.year.length - 1)){
          template = template.replace('{{selected}}', 'selected');
        } else {
          template = template.replace('{{selected}}', '');
        }
        template = template.replace(/{{year}}/gi, data.year[i].title);
        view = view + template;
      }
    }
    return view;
  };

  ResearchTemplate.prototype.setSearchForm_competition_name = function(data){
    var view = "";
    if (data.competition_name){
      for (var i=0; i<data.competition_name.length; i+=1){
        var template = this.searchConditionTemplate_competition_name;
        template = template.replace(/{{competition_name}}/gi, data.competition_name[i].title);
        view = view + template;
      }
    }
    return view;
  };

  ResearchTemplate.prototype.setSearchForm_team = function(data){
    var view = "";
    if (data.team){
      for (var i=0; i<data.team.length; i+=1){
        var template = this.searchConditionTemplate_team;
        template = template.replace(/{{team}}/gi, data.team[i].title);
        view = view + template;
      }
    }
    return view;
  };

  ResearchTemplate.prototype.initTableTemplates = function(){
    this.tableTemplate = this.tableTemplate.replace(/{{th0}}/gi, this.th_number_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th1}}/gi, this.th_pname_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th2}}/gi, this.th_sex_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th3}}/gi, this.th_age_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th4}}/gi, this.th_style_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th5}}/gi, this.th_distance_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th6}}/gi, this.th_record_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th7}}/gi, this.th_team_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th8}}/gi, this.th_competition_name_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th9}}/gi, this.th_competitionDate_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th10}}/gi, this.th_remark_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th11}}/gi, this.th_checkbox_template);

    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td0}}/gi, this.td_number_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td1}}/gi, this.td_pname_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td2}}/gi, this.td_sex_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td3}}/gi, this.td_age_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td4}}/gi, this.td_style_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td5}}/gi, this.td_distance_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td6}}/gi, this.td_record_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td7}}/gi, this.td_team_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td8}}/gi, this.td_competition_name_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td9}}/gi, this.td_competitionDate_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td10}}/gi, this.td_remark_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td11}}/gi, this.td_checkbox_template);
  };

  ResearchTemplate.prototype.setTableTemplates = function(conditions){
    var self = this;
    var fieldsOrderMap = this.get_fieldsOrder(conditions);
    var th_templates = [];
    var td_templates = [];

    this.tableTemplate = this.initial_tableTemplate;
    this.searchResultTemplate = this.initial_searchResultTemplate;

    fieldsOrderMap.forEach((value, key) => {
      switch (value) {
        case "player_name":
          th_templates.push(self.th_pname_template);
          td_templates.push(self.td_pname_template);
          break;
        case "player_sex":
          th_templates.push(self.th_sex_template);
          td_templates.push(self.td_sex_template);
          break;
        case "player_age":
          th_templates.push(self.th_age_template);
          td_templates.push(self.td_age_template);
          break;
        case "style":
          th_templates.push(self.th_style_template);
          td_templates.push(self.td_style_template);
          break;
        case "distance":
          th_templates.push(self.th_distance_template);
          td_templates.push(self.td_distance_template);
          break;
        case "record":
          th_templates.push(self.th_record_template);
          td_templates.push(self.td_record_template);
          break;
        case "player_team":
          th_templates.push(self.th_team_template);
          td_templates.push(self.td_team_template);
          break;
        case "competition_name":
          th_templates.push(self.th_competition_name_template);
          td_templates.push(self.td_competition_name_template);
          break;
        case "competition_date":
          th_templates.push(self.th_competitionDate_template);
          td_templates.push(self.td_competitionDate_template);
          break;
        default:
      }
    });

    this.tableTemplate = this.tableTemplate.replace(/{{th0}}/gi, this.th_number_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td0}}/gi, this.td_number_template);

    for(var i = 0; i < 9; i++){
      var temp = "{{th" + (i + 1) + "}}";
      this.tableTemplate = this.tableTemplate.replace(temp, th_templates[i]);
      temp = "{{td" + (i + 1) + "}}";
      this.searchResultTemplate = this.searchResultTemplate.replace(temp, td_templates[i]);
    }

    this.tableTemplate = this.tableTemplate.replace(/{{th10}}/gi, this.th_remark_template);
    this.tableTemplate = this.tableTemplate.replace(/{{th11}}/gi, this.th_checkbox_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td10}}/gi, this.td_remark_template);
    this.searchResultTemplate = this.searchResultTemplate.replace(/{{td11}}/gi, this.td_checkbox_template);

  };

  ResearchTemplate.prototype.setResultTable = function(){
    var view = "";
    var template = this.tableTemplate;
    var result_data_table_initMemo = '<tr class="initMemo">' +
                                      '<td colspan="12">' +
                                        '<span>검색 조건을 입력한 후 검색 버튼을 눌러주세요!</span>' +
                                      '</td>' +
                                     '</tr>';
    template = template.replace(/{{initMemo}}/gi, result_data_table_initMemo);
    view = view + template;
    return view;
  };

  ResearchTemplate.prototype.setNoteTable = function(data) {
    var self = this;
    var view = "";
    var template = this.noteTableTemplate;
    var note_table_initMemo = '<tr class="initMemo">' +
                                '<td colspan="12">' +
                                  '<span>아직 노트에 담은 기록이 없습니다!</span>' +
                                '</td>' +
                              '</tr>';
    var table_data_template = "";
    if (data.length > 0){
      table_data_template = self.setSearchResult('note', data);
      template = template.replace(/{{initMemo}}/gi, table_data_template);
    } else {
      template = template.replace(/{{initMemo}}/gi, note_table_initMemo);
    }
    view = view + template;
    return view;
  };

  ResearchTemplate.prototype.setSearchResultLoading = function(){
    var view = this.loading_searchResultTemplate;
    return view;
  };

  ResearchTemplate.prototype.setSearchResult = function(table_mode, data){
    var view = "";
    var self = this;
    if (data){
      for (var i=0; i<data.length; i++){
        var template;
        if (table_mode == 'searchResult')
          template = this.searchResultTemplate;
        else
          template = this.noteDataTemplate;
        template = template.replace(/{{index}}/gi, data[i].index);
        template = template.replace(/{{number}}/gi, (i + 1));
        template = template.replace(/{{player_name}}/gi, self.get_name_form(data[i].player_name));
        template = template.replace(/{{player_sex}}/gi, data[i].player_sex);
        template = template.replace(/{{player_age_competition}}/gi, data[i].player_age_competition);
        template = template.replace(/{{player_age_current}}/gi, data[i].player_age_current);
        template = template.replace(/{{style}}/gi, data[i].style);
        template = template.replace(/{{distance}}/gi, data[i].distance);
        template = template.replace(/{{record}}/gi, data[i].record);
        template = template.replace(/{{competition_date}}/gi, data[i].competition_date);
        template = template.replace(/{{competition_name}}/gi, data[i].competition_name);
        template = template.replace(/{{player_team}}/gi, data[i].player_team);
        template = template.replace(/{{remark}}/gi, data[i].remark);
        view = view + template;
      }
    }
    return view;
  };

  ResearchTemplate.prototype.get_name_form = function(name){
    var result = "";
    var index = name.indexOf(' ');
    if (index != -1){
      var temp = name.substring(0, index);
      for (var i=0; i<temp.length; i++){
        result += '*';
      }
      result += ' ' + name.substring(index + 1, name.length);
    } else {
      var temp = name.substring(1, name.length);
      result += '*' + temp;
    }
    return result;
  }

  ResearchTemplate.prototype.noDataErrorMsg_by_mode = function(mode){
    var view = this.no_data_ErrorMsgTemplate;
    if (mode === 'result_data_table_mode'){
      view = view.replace('{{message}}', "입력하신 조건에 해당하는 데이터가 없습니다!");
    } else if (mode === 'note_table_mode'){
      view = view.replace('{{message}}', "아직 노트에 담은 기록이 없습니다!");
    }
    return view;
  };

  ResearchTemplate.prototype.setPagination = function(data){
    var self = this;
    var view = "";
    var currentIndex = parseInt(data.currentIndex);
    var finalIndex = parseInt(data.finalIndex);
    var totalIndexCount = finalIndex;
    var template = self.paginationTemplate;
    if (finalIndex > 0){
      var temp_pagelist = '<li class="page-item"><a><span class="page-link" aria-hidden="true">&laquo;</span></a></li>';
      var temp_pageItem = '<li class="page-item {{active}}"><span class="page-link">{{value}}</span></li>';
      if (totalIndexCount < 5){
        for (var i=1; i<=totalIndexCount; i++){
          var index = i;
          var temp = temp_pageItem;
          if (index == currentIndex){
            temp = temp.replace('{{active}}', 'active');
          } else {
            temp = temp.replace('{{active}}', '');
          }
          temp = temp.replace('{{value}}', index);
          temp_pagelist = temp_pagelist + temp;
        }
      } else {
        // 1 index
        var temp = temp_pageItem;
        if (currentIndex === 1){
          temp = temp.replace('{{active}}', 'active');
        } else {
          temp = temp.replace('{{active}}', '');
        }
        temp = temp.replace('{{value}}', '1');
        temp_pagelist = temp_pagelist + temp;
        // 2 ~ finalIndex-1
        if (currentIndex === 2){
          var temp = temp_pageItem;
          temp = temp.replace('{{active}}', 'active');
          temp = temp.replace('{{value}}', currentIndex);
          temp_pagelist = temp_pagelist + temp;
        }
        var temp = temp_pageItem;
        temp = temp.replace('{{active}}', '');
        temp = temp.replace('{{value}}', '...');
        temp_pagelist = temp_pagelist + temp;
        if ((currentIndex > 2) && (currentIndex < (finalIndex - 1))){
          var temp = temp_pageItem;
          temp = temp.replace('{{active}}', 'active');
          temp = temp.replace('{{value}}', currentIndex);
          temp_pagelist = temp_pagelist + temp;
          var temp = temp_pageItem;
          temp = temp.replace('{{active}}', '');
          temp = temp.replace('{{value}}', '...');
          temp_pagelist = temp_pagelist + temp;
        }
        if (currentIndex === (finalIndex - 1)){
          var temp = temp_pageItem;
          temp = temp.replace('{{active}}', 'active');
          temp = temp.replace('{{value}}', currentIndex);
          temp_pagelist = temp_pagelist + temp;
        }
        // finalIndex
        var temp = temp_pageItem;
        if (currentIndex === finalIndex){
          temp = temp.replace('{{active}}', 'active');
        } else {
          temp = temp.replace('{{active}}', '');
        }
        temp = temp.replace('{{value}}', finalIndex);
        temp_pagelist = temp_pagelist + temp;
      }
      temp_pagelist = temp_pagelist + '<li class="page-item"><span class="page-link" aria-hidden="true">&raquo;</span></li>';
      template = template.replace('{{pagelist}}', temp_pagelist);
      view = view + template;
    }
    return view;
  };

  ResearchTemplate.prototype.setSearchConditionsBar = function(data){
    var view = "";
    if (data){
      if (data.player_name != ""){
        var template = this.searchConditionsTemplate;
        template = template.replace('{{searchCondition}}', data.player_name);
        view = view + template;
      }
      if (data.player_sex != ""){
        var template = this.searchConditionsTemplate;
        if (data.player_sex == "전체"){
          template = template.replace('{{is_single}}', 'd-none d-lg-inline-block');
        } else {
          template = template.replace('{{is_single}}', 'd-inline-block');
        }
        template = template.replace('{{searchCondition}}', data.player_sex);
        view = view + template;
      }
      if (data.player_age != ""){
        var ageArr = common.string_with_square_brakets_to_array(data.player_age);
        if (ageArr.length > 1){
          for (var i=0; i<ageArr.length; i++){
            var template = this.searchConditionsTemplate;
            template = template.replace('{{is_single}}', 'd-none d-lg-inline-block');
            template = template.replace('{{searchCondition}}', ageArr[i] + '세');
            view = view + template;
          }
        } else {
          var template = this.searchConditionsTemplate;
          template = template.replace('{{is_single}}', 'd-inline-block');
          template = template.replace('{{searchCondition}}', ageArr[0] + '세');
          view = view + template;
        }
        var template = this.searchConditionsTemplate;
        if (data.player_age_criteria === "age_criteria_competition"){
          template = template.replace('{{searchCondition}}', "대회당시나이");
        } else {
          template = template.replace('{{searchCondition}}', "현재나이");
        }
        view = view + template;
      }
      if (data.style != ""){
        var styleArr = common.string_with_square_brakets_to_array(data.style);
        if (styleArr.length > 1){
          for (var i=0; i<styleArr.length; i++){
            var template = this.searchConditionsTemplate;
            template = template.replace('{{is_single}}', 'd-none d-lg-inline-block');
            template = template.replace('{{searchCondition}}', styleArr[i]);
            view = view + template;
          }
        } else {
          var template = this.searchConditionsTemplate;
          template = template.replace('{{is_single}}', 'd-inline-block');
          template = template.replace('{{searchCondition}}', styleArr[0]);
          view = view + template;
        }
      }
      if (data.distance != ""){
        var distanceArr = common.string_with_square_brakets_to_array(data.distance);
        if (distanceArr.length > 1){
          for (var i=0; i<distanceArr.length; i++){
            var template = this.searchConditionsTemplate;
            template = template.replace('{{is_single}}', 'd-none d-lg-inline-block');
            template = template.replace('{{searchCondition}}', distanceArr[i]);
            view = view + template;
          }
        } else {
          var template = this.searchConditionsTemplate;
          template = template.replace('{{is_single}}', 'd-inline-block');
          template = template.replace('{{searchCondition}}', distanceArr[0]);
          view = view + template;
        }
      }
      if (data.player_team != ""){
        var template = this.searchConditionsTemplate;
        template = template.replace('{{is_single}}', 'd-inline-block');
        template = template.replace('{{searchCondition}}', data.player_team);
        view = view + template;
      }
      if (data.competition_name != ""){
        var template = this.searchConditionsTemplate;
        template = template.replace('{{is_single}}', 'd-inline-block');
        template = template.replace('{{searchCondition}}', data.competition_name);
        view = view + template;
      }

      var template = this.searchConditionsTemplate;
      template = template.replace('{{is_single}}', 'd-inline-block');
      template = template.replace('{{searchCondition}}', data.competition_year_from + '부터');
      view = view + template;

      var template = this.searchConditionsTemplate;
      template = template.replace('{{is_single}}', 'd-inline-block');
      template = template.replace('{{searchCondition}}', data.competition_year_to + '까지');
      view = view + template;
    } else {
      template = template.replace('{{searchCondition}}', "전체");
    }
    return view;
  };

  ResearchTemplate.prototype.setMobileToolNoteTemplate = function(active_table_mode, noteData){
    var self = this;
    var view = "";
    var notelist = "";
    var template = this.mobileTool_noteTemplate;
    var noteTitleList = new Array();
    var all_noteData_keys = Object.keys(noteData);
    for (var i=0; i<all_noteData_keys.length; i++){
      var prop = all_noteData_keys[i];
      if (prop != "current_note_title"){
        noteTitleList.push(prop);
      }
    }
    template = template.replace('{{active_table}}', active_table_mode);
    for (var i=0; i<noteTitleList.length; i++){
      var title = noteTitleList[i];
      var select_option_template = '<option>{{value}}</option>';
      select_option_template = select_option_template.replace('{{value}}', title);
      notelist = notelist + select_option_template;
    }
    template = template.replace('{{notelist}}', notelist);
    view = view + template;
    return view;
  };

  ResearchTemplate.prototype.setMobileToolSortTemplate = function(){
    var view = "";
    var template = this.mobileTool_sortTemplate;
    view = view + template;
    return view;
  };

  ResearchTemplate.prototype.setMobileToolSettingTemplate = function(){
    var view = "";
    var template = this.mobileTool_settingTemplate;
    var categoryArr = ['이름', '성별', '나이', '종목', '거리', '기록', '팀(소속)', '대회일시', '대회장소'];
    var categorylist_template = "";
    for (var i=0; i<categoryArr.length; i++){
      var checkboxItem_template =
        '<div class="col-6 col-sm-4 col-md-3 pr-0 mr-0 custom-control custom-checkbox custom-control-inline">' +
          '<input class="custom-control-input" id="{{category}}" type="checkbox">' +
          '<label class="custom-control-label" for="{{category}}">{{category}}</label>' +
        '</div>';
      checkboxItem_template = checkboxItem_template.replace(/{{category}}/gi, categoryArr[i]);
      categorylist_template = categorylist_template + checkboxItem_template;
    }
    template = template.replace(/{{categorylist}}/gi, categorylist_template);
    view = view + template;
    return view;
  };

  ResearchTemplate.prototype.set_new_selectNotes_optionTemplate = function(new_note_title){
    var view = "";
    var template = '<option>{{value}}</option>';
    template = template.replace('{{value}}', new_note_title);
    view = view + template;
    return view;
  };

  ResearchTemplate.prototype.set_note_list = function(note_title_list){
    var view = "";
    for (var i=1; i<note_title_list.length; i++){
      var title = note_title_list[i];
      var template = '<option>{{value}}</option>';
      template = template.replace('{{value}}', title);
      view = view + template;
    }
    return view;
  };

  ResearchTemplate.prototype.get_fieldsOrder = function(conditions){
    var fieldsOrderMap = new Map();
    var single_conditions = [];
    var multi_conditions = [];
    var number = 0;

    if (conditions.player_name != ""){
      single_conditions.push("player_name");
    } else {
      multi_conditions.push("player_name");
    }

    if (conditions.player_sex != "전체"){
      single_conditions.push("player_sex");
    } else {
      multi_conditions.push("player_sex");
    }

    if (conditions.player_age != "" && common.string_with_square_brakets_to_array(conditions.player_age).length == 1){
      single_conditions.push("player_age");
    } else {
      multi_conditions.push("player_age");
    }

    if (conditions.style != "" && common.string_with_square_brakets_to_array(conditions.style).length == 1){
      single_conditions.push("style");
    } else {
      multi_conditions.push("style");
    }

    if (conditions.distance != "" && common.string_with_square_brakets_to_array(conditions.distance).length == 1){
      single_conditions.push("distance");
    } else {
      multi_conditions.push("distance");
    }

    multi_conditions.push("record");

    if (conditions.player_team != ""){
      single_conditions.push("player_team");
    } else {
      multi_conditions.push("player_team");
    }

    if (conditions.competition_name != ""){
      single_conditions.push("competition_name");
    } else {
      multi_conditions.push("competition_name");
    }

    multi_conditions.push("competition_date");

    for(var i = 0; i < multi_conditions.length; i++){
      fieldsOrderMap.set(number++, multi_conditions[i]);
    }

    for(var i = 0; i < single_conditions.length; i++){
      fieldsOrderMap.set(number++, single_conditions[i]);
    }

    return fieldsOrderMap;
  };

  common.setNamespace('researchTemplate');
  exports.app = exports.app || {};
  exports.app.researchTemplate = ResearchTemplate;
})(this);
