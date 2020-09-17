(function(exports) {
  'use strict';
  function ResearchView(template) {
    //console.log("view created");
    this.template = template;
    this.$menuList = document.getElementById('menu');
    this.$selectTargets = document.querySelectorAll('.selectbox select');
    this.$checkboxTargets = document.querySelectorAll('.custom-checkbox');
    this.$dropdownInput = document.querySelectorAll('.dropdown_input');
    this.$dropdownButton = document.querySelectorAll('.dropdown_button');
    this.$dropdownItems = document.querySelectorAll('.dropdown_items');
    this.$searchForm_wrapper = document.querySelector('#searchForm_wrapper');
    this.$searchForm_tools = document.querySelector('#searchForm_tools');
    this.$resetConditionsButton = document.querySelector('.reset_conditions_btn');
    this.$researchButton = document.querySelector('.research_btn');
    this.$hideResearchWindowButton = document.querySelector('.hide_researchwindow_btn');
    this.$showResearchWindowButton = document.querySelector('.show_researchwindow_btn');
    this.$searchConditionsBar = document.querySelector('#searchConditions_bar');
    this.$searchConditionsBarContent = document.querySelector('#searchConditions_bar_content');
    this.$currentSearchState = document.querySelector('.current_search_state');
    this.$searchStateWrapper = document.querySelector('#searchForm_state_badge');
    this.$searchStateResearch = document.querySelector('.search_state_research');
    this.$searchStateFiltering = document.querySelector('.search_state_filtering');
    this.$document_main = document.querySelector('main');
    this.$searchForm = document.querySelector('#searchForm');
    this.$searchForm_input_text = document.querySelectorAll('#searchForm input[type=text]');
    this.$searchForm_input_group = document.querySelectorAll('#searchForm .input-group');
    this.$searchForm_checkbox_items = document.querySelectorAll('#searchForm .checkbox_items');
    this.$searchForm_radio = document.querySelectorAll('#searchForm .radio_items');
    this.$searchForm_select = document.querySelectorAll('#searchForm select');
    this.$searchForm_name = document.querySelector('#searchForm_player-name');
    this.$searchForm_sex = document.querySelector('#searchForm_player-sex');
    this.$searchForm_sex_select = document.querySelector('#select_player-sex');
    this.$searchForm_age = document.querySelector('#searchForm_age');
    this.$searchForm_style = document.querySelector('#searchForm_style');
    this.$searchForm_distance = document.querySelector('#searchForm_distance');
    this.$searchForm_year = document.querySelectorAll('#searchForm_year select');
    this.$searchForm_year_from = document.querySelector('#searchForm_year #select_year-from');
    this.$searchForm_year_to = document.querySelector('#searchForm_year #select_year-to');
    this.$searchForm_competition_name = document.querySelector('#searchForm_competition_name');
    this.$searchForm_team = document.querySelector('#searchForm_team');
    this.$searchForm_competition_name_input = document.querySelector('#searchForm_competition_name_input');
    this.$searchForm_team_input = document.querySelector('#searchForm_team_input');
    this.$searchForm_competition_name_button = document.querySelector('#searchForm_competition_name_button');
    this.$searchForm_team_button = document.querySelector('#searchForm_team_button');
    this.$tableModeTabs = document.querySelector('#table_mode_tabs');
    this.$tableWrapper = document.querySelector('#table_wrapper');
    this.$searchResult_table = document.querySelector('#result_data_table');
    this.$note_table = document.querySelector('#note_table');
    this.$paginationWrapper = document.querySelectorAll('.paginationWrapper');
    this.$paginationWrapper_result = document.querySelector('#paginationWrapper_result');
    this.$paginationWrapper_note = document.querySelector('#paginationWrapper_note');
    this.$note_selectNotes = document.querySelectorAll('#select_notes');
    this.$note_saveRecordsToNoteBtn = document.querySelectorAll('.save_records_to_note');
    this.$note_createNewNoteBtn = document.querySelectorAll('.create_new_note');
    this.$note_deleteRecordsBtn = document.querySelectorAll('.delete_records');
    this.$mobile_tools_list = document.querySelector('#mobile_tools_list');
    this.$mobile_tools = document.querySelector('#mobile_tools');
    this.$mobile_tools_btn = document.querySelector('#mobile_tools_btn');
    this.$mobile_sort_btn = document.querySelector('#mobile_sort_btn');
    this.$mobile_setting_btn = document.querySelector('#mobile_setting_btn');
    this.$close_mobile_tools_btn = document.querySelector('#mobile_tools_btn .close_tools');
    this.$open_mobile_tools_btn = document.querySelector('#mobile_tools_btn .open_tools');
    this.$mobile_tools_result_active = document.querySelectorAll('.mobile_tool.result_active');
    this.$mobile_tools_note_active = document.querySelectorAll('.mobile_tool.note_active');
    this.$mobile_modal_container = document.querySelector('.modal-container');
    this.$mobile_modal_content = document.querySelector('.modal-content');
    this.$mobile_tools_content = document.querySelector('#mobile_tools_content');
    this.$mobile_note_table_tools = document.querySelector('#mobile_note_table_tools');
    this.$modals = document.querySelector('#modals');
    this.$errorMsg_modal = document.querySelector('#errorMsg_modal');
    this.$mobile_sort_modal = document.querySelector('#mobile_sort_modal');
    this.$mobile_setting_modal = document.querySelector('#mobile_setting_modal');
    this.$mobile_sort_tools = document.querySelector('#mobile_sort_modal .modal-dialog .modal-content .modal-body');
    this.$mobile_setting_tools = document.querySelector('#mobile_setting_modal .modal-dialog .modal-content .modal-body');
    this.$modal_backdrop = '<div class="modal-backdrop fade show"></div>';
    // 전역변수
    this.reset_conditions_btn_click_count = 0;
  }

  ResearchView.prototype.bind = function(event, handler) {
    var self = this;
    if (event === 'select_change') {
      var tempArr = document.querySelectorAll('.selectbox select');
      for (var i=0; i<tempArr.length; i++){
        (function(index) {
          var select = tempArr[index];
          select.addEventListener('change', function(){
            handler(select);
          });
        })(i);
      }
    } else if (event === 'dropdown_input_focus') {
      var tempArr = document.querySelectorAll('.dropdown_input');
      for (var i=0; i<tempArr.length; i++){
        (function(index) {
          var dropdown_input = tempArr[index];
          dropdown_input.addEventListener('focus', function(){
            handler(dropdown_input);
          })
        })(i);
      }
    } else if (event === 'dropdown_input_keyup') {
      var tempArr = document.querySelectorAll('.dropdown_input');
      for (var i=0; i<tempArr.length; i++){
        (function(index) {
          var dropdown_input = tempArr[index];
          dropdown_input.addEventListener('keyup', function() {
            handler(dropdown_input);
          });
        })(i);
      }
    } else if (event === 'dropdown_button_click') {
      var tempArr = document.querySelectorAll('.dropdown_button');
      for (var i=0; i<tempArr.length; i++){
        (function(index) {
          var dropdown_button = tempArr[index];
          dropdown_button.addEventListener('click', function() {
            handler(dropdown_button);
          });
        })(i);
      }
    } else if (event === 'dropdown_items_click') {
      var tempArr = document.querySelectorAll('.dropdown_items');
      for (var i=0; i<tempArr.length; i++){
        (function(i){
          var dropdown_items = tempArr[i];
          dropdown_items.addEventListener('click', function(event){
            if (event.target.tagName === 'SPAN'){
              handler(event.target, dropdown_items);
            }
          });
        })(i);
      }
    } else if (event === 'select_year_change') {
      var tempArr = self.$searchForm_year;
      for (var i=0; i<tempArr.length; i++){
        (function(index) {
          var select = tempArr[index];
          select.addEventListener('change', function() {
            var another_select = common.siblings(select.parentElement.parentElement)[0].querySelector('select');
            handler(select, another_select);
          });
        })(i);
      }
    } else if (event === 'mobile_tools_active_body_click'){
      var item = document.querySelector('body');
      item.addEventListener('click', function(event){
        var target = event.target;
        if ((target.parentElement.getAttribute('id') != 'mobile_tools_btn') && (target.parentElement.parentElement.getAttribute('id') != 'mobile_tools_btn')){
          if (!target.classList.contains('mobile_tool_span') && (target.getAttribute('id') != 'mobile_tools_list')){
            handler(target);
          }
        }
      });
    } else if (event === 'radio_click') {
      var tempArr = document.querySelectorAll('.radio_items');
      for (var i=0; i<tempArr.length; i++){
        (function(i){
          var radio_items = tempArr[i];
          radio_items.addEventListener('click', function(event){
            if (event.target.type === 'radio'){
              var radio_array = radio_items.querySelectorAll('input[type=radio]');
              handler(event.target, radio_array);
            }
          });
        })(i);
      }
    } else if (event === 'checkbox_click') {
      var tempArr = document.querySelectorAll('.checkbox_items');
      for (var i=0; i<tempArr.length; i++){
        (function(i){
          var checkbox = tempArr[i];
          checkbox.addEventListener('click', function(event){
            if (event.target.type === 'checkbox'){
              handler(event.target);
            }
          });
        })(i);
      }
    } else if (event === 'research_btn_click') {
      var item = self.$researchButton;
      item.addEventListener('click', function() {
        var searchForm = self.$searchForm;
        var currentSearchState = document.querySelector('.current_search_state').innerText;
        var searchConditions = {
          player_name: searchForm.querySelector('#searchForm_player-name').value,
          player_sex: searchForm.querySelector('#searchForm_player-sex .select_label').innerText,
          player_age: common.idArr_to_single_string(searchForm.querySelectorAll('#searchForm_age input[type=checkbox]:checked')),
          player_age_criteria: searchForm.querySelector('#searchForm_age_criteria input[type=radio]:checked').getAttribute('id'),
          style: common.idArr_to_single_string(searchForm.querySelectorAll('#searchForm_style input[type=checkbox]:checked')),
          distance: common.idArr_to_single_string(searchForm.querySelectorAll('#searchForm_distance input[type=checkbox]:checked')),
          competition_year_from: searchForm.querySelector('#select_year-from').parentElement.querySelector('.select_label').innerText,
          competition_year_to: searchForm.querySelector('#select_year-to').parentElement.querySelector('.select_label').innerText,
          competition_name: searchForm.querySelector('#searchForm_competition_name_input').value,
          player_team: searchForm.querySelector('#searchForm_team_input').value
        }
        handler(searchConditions, currentSearchState);
      });
    } else if (event === 'reset_conditions_btn_click') {
      var item = self.$resetConditionsButton;
      item.addEventListener('click', function() {
        handler();
      });
    } else if (event === 'show_researchwindow_btn_click') {
      var item = self.$showResearchWindowButton;
      item.addEventListener('click', function() {
        handler();
      });
    } else if (event === 'hide_researchwindow_btn_click') {
      var item = self.$hideResearchWindowButton;
      item.addEventListener('click', function() {
        handler();
      });
    } else if (event === 'pagination_click') {
      var items = self.$paginationWrapper;
      for (var i=0; i<items.length; i++){
        (function(i){
          var item = items[i];
          item.addEventListener('click', function(event) {
            if (event.target.tagName === 'SPAN'){
              var clickedIndex = event.target.innerText;
              var currentSearchState = document.querySelector('.current_search_state').innerText;
              var currentTableState = self.get_current_active_table_mode();
              handler(currentTableState, currentSearchState, clickedIndex);
            }
          });
        })(i);
      }
    } else if (event === 'tableModeTabs_click'){
      var item = self.$tableModeTabs;
      item.addEventListener('click', function(event){
        if (event.target.tagName === 'SPAN'){
          var active_table_mode = event.target.parentElement.getAttribute('id');
          if (active_table_mode == null){
            active_table_mode = event.target.parentElement.parentElement.getAttribute('id');
          }
          handler(active_table_mode);
        }
      });
    }
    else if (event === 'mobile_tools_btn_click'){
      var item = self.$mobile_tools_btn;
      item.addEventListener('click', function(event){
        if (event.target.tagName === 'BUTTON') {
          handler(event.target);
        } else if (event.target.tagName === 'IMG') {
          handler(event.target.parentElement);
        }
      });
    }
    else if (event === 'mobile_sort_btn_click'){
      var item = self.$mobile_sort_btn;
      item.addEventListener('click', function(){
        handler();
      });
    }
    else if (event === 'mobile_setting_btn_click'){
      var item = self.$mobile_setting_btn;
      item.addEventListener('click', function(){
        handler();
      });
    }
    /*
    else if (event === 'mobile_update_settingData_btn_click'){
      var item = self.$mobile_setting_tools.querySelector('.update_settingData_btn');
      item.addEventListener('click', function(){
        var mobile_setting_td_line = self.$mobile_setting_tools.querySelector('#mobile_setting_td_line input[type=radio]:checked').getAttribute('id');
        var mobile_setting_td_category_array = self.$mobile_setting_tools.querySelectorAll('#mobile_setting_td_category input[type=checkbox]:checked');
        handler(mobile_setting_td_line, mobile_setting_td_category_array);
      });
    }
*/
    else if (event === 'note_select_all_records_click'){
      var items = document.querySelectorAll('.select_all_records');
      for (var i=0; i<items.length; i++){
        (function(i){
          var item = items[i];
          item.addEventListener('click', function(){
            handler(item);
          });
        })(i);
      }
    } else if (event === 'tr_data_click'){
      var tables = document.querySelectorAll('table');
      for (var i=0; i<tables.length; i++){
        (function(){
          var item = tables[i];
          item.addEventListener('click', function(event){
            var tagName = event.target.tagName;
            if (tagName === 'TR'){
              handler(event.target);
            } else if (tagName === 'TD'){
              var tr = event.target.parentElement;
              handler(tr);
            } else if (tagName === 'INPUT'){
              var tr = event.target.parentElement.parentElement;
              handler(tr);
            }
          });
        })(i);
      }
    } else if (event === 'save_records_to_note_click'){
      var items = document.querySelectorAll('.save_records_to_note');
      for (var i=0; i<items.length; i++){
        (function(i){
          var item = items[i];
          item.addEventListener('click', function(){
            var checked_trArr = document.querySelectorAll('#result_data_table tr.data.checked');
            handler(checked_trArr);
          });
        })(i);
      }
    } else if (event === 'create_new_note_click'){
      var items = document.querySelectorAll('.create_new_note');
      for (var i=0; i<items.length; i++){
        (function(i){
          var item = items[i];
          item.addEventListener('click', function(){
            handler();
          });
        })(i);
      }
    } else if (event === 'delete_note_click'){
      var items = document.querySelectorAll('.delete_note');
      for (var i=0; i<items.length; i++){
        (function(i){
          var item = items[i];
          item.addEventListener('click', function(){
            handler();
          });
        })(i);
      }
    } else if (event === 'select_notes_click'){
      var items = document.querySelectorAll('.select_notes');
      for (var i=0; i<items.length; i++){
        (function(i){
          var item = items[i];
          item.addEventListener('click', function(event){
            if (event.target.tagName === 'OPTION'){
              handler(event.target);
            }
          })
        })(i);
      }
    } else if (event === 'delete_records_click'){
      var items = document.querySelectorAll('.delete_records');
      for (var i=0; i<items.length; i++){
        (function(i){
          var item = items[i];
          item.addEventListener('click', function(){
            var all_trArr = document.querySelectorAll('#note_table tr.data');
            var checked_tr_indexArr = new Array();
            for (var i=0; i<all_trArr.length; i++){
                var tr = all_trArr[i];
                if(tr.classList.contains('checked')){
                    checked_tr_indexArr.push(i);
                }
            }
            handler(checked_tr_indexArr);
          });
        })(i);
      }
    } else if (event === 'select_sort_click'){
      var items = document.querySelectorAll('.select_sort');
      for (var i=0; i<items.length; i++){
        (function(i){
          var item = items[i];
          item.addEventListener('click', function(event){
            var target = event.target;
            var select = event.target.parentElement;
            var sort_category = "";
            var sort_order = "";
            if (target.tagName === 'SELECT'){
              var label = select.querySelector('label');
              if (select.getAttribute('id') == 'searchResult_sort_category'){
                sort_category = label.innerText;
              } else if (select.getAttribute('id') == 'searchResult_sort_order'){
                sort_order = label.innerText;
              }
              var table_mode = self.get_current_active_table_mode();
              handler(table_mode, sort_category, sort_order);
            }
          });
        })(i);
      }
    } else if (event === 'window_beforeunload'){
      window.addEventListener('beforeunload', function(){
        handler();
      });
    } else if (event === 'modals_click'){
      var item = this.$modals;
      item.addEventListener('click', function(event){
        var target = event.target;
        if (target.tagName === 'BUTTON'){
          var modalID = target.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
          handler(target, modalID);
        }
      });
    }
  };

  ResearchView.prototype.render = function(viewCmd, data, callback) {
    var self = this;
    var viewCommands = {
      setMenu: function(callback) {
        if (self.setMenu(data)) {
          //console.log('setMenu-return_true');
        }
      },
      setSearchForm: function(callback) {
        if (self.setSearchForm(data)) {
          //console.log('setSearchForm-return_true');
        }
      },
      setTables: function(callback){
        if (self.setTables(data)){
          //console.log('setTables-return_true');
        }
      },
      setMobileTools: function(callback){
        if (self.setMobileTools(data)){
          //console.log('setMobileTools-return_true');
        }
      }
    };
    viewCommands[viewCmd](callback);
    return true;
  };

  ResearchView.prototype.setMenu = function(data) {
    this.$menuList.innerHTML = this.template.setMenu(data);
    return true;
  };

  ResearchView.prototype.setSearchForm = function(data) {
    this.$searchForm_style.innerHTML = this.template.setSearchForm_style(data);
    this.$searchForm_age.innerHTML = this.template.setSearchForm_age(data);
    this.$searchForm_distance.innerHTML = this.template.setSearchForm_distance(data);
    this.$searchForm_year_from.innerHTML = this.template.setSearchForm_year_from(data);
    this.$searchForm_year_from.parentElement.querySelector('label').innerHTML = this.$searchForm_year_from.options[this.$searchForm_year_from.selectedIndex].text;
    this.$searchForm_year_to.innerHTML = this.template.setSearchForm_year_to(data);
    this.$searchForm_year_to.parentElement.querySelector('label').innerHTML = this.$searchForm_year_to.options[this.$searchForm_year_to.selectedIndex].text;
    this.$searchForm_competition_name.innerHTML = this.template.setSearchForm_competition_name(data);
    this.$searchForm_team.innerHTML = this.template.setSearchForm_team(data);
    return true;
  };

  ResearchView.prototype.setTables = function(data){
    this.initTableFields();
    this.setSearchResultTable();
    this.initNoteTable(data);
    return true;
  };

  ResearchView.prototype.initTableFields = function(){
    this.template.initTableTemplates();
  };

  ResearchView.prototype.setSearchResultTable = function(){
    this.$searchResult_table.innerHTML = this.template.setResultTable();
  };

  ResearchView.prototype.initNoteTable = function(data){
    this.$note_table.innerHTML = this.template.setNoteTable(data);
    this.reset_Pagination_by_mode('note_table_mode');
  };

  ResearchView.prototype.setMobileTools = function(data){
    var noteData = new Array;
    noteData = data[0];
    var settingData = new Object;
    settingData = data[1];
    //this.$mobile_note_table_tools.innerHTML = this.template.setMobileToolNoteTemplate('result_data_table_active', noteData);
    this.$mobile_sort_tools.innerHTML = this.template.setMobileToolSortTemplate();
    this.$mobile_setting_tools.innerHTML = this.template.setMobileToolSettingTemplate();
    //this.updateUI_mobile_settingData(settingData);
    return true;
  }

  ResearchView.prototype.select_change = function(select){
    var select_label = select.parentElement.querySelector('.select_label');
    var selectedItem_name = select.options[select.selectedIndex].text;
    select_label.innerHTML = selectedItem_name;
  };

  ResearchView.prototype.dropdown_input_focus = function(dropdown_input){
    var dropdown_button = dropdown_input.parentElement.querySelector('.dropdown_button');
    var dropdown_items = dropdown_input.parentElement.querySelector('.dropdown_items');
    dropdown_button.innerHTML = '▲';
    dropdown_items.classList.add("show");
  };

  ResearchView.prototype.dropdown_input_keyup = function(dropdown_input){
    var dropdown_button = dropdown_input.parentElement.querySelector('.dropdown_button');
    var dropdown_items = dropdown_input.parentElement.querySelector('.dropdown_items');
    var dropdown_items_spans = dropdown_items.querySelectorAll('span');
    var filter, span, i, count, equalValue_count;
    count = 0;
    equalValue_count = 0;
    filter = dropdown_input.value.toUpperCase();
    span = dropdown_items_spans;
    for (var i=0; i<span.length; i++){
      var item = span[i];
      var textValue = item.innerText;
      var textValue_no_space = textValue.replace(/(\s*)/g, "");
      var dropdown_input_no_space = dropdown_input.value.replace(/(\s*)/g, "");
      if (textValue.toUpperCase().indexOf(filter) > -1){
        item.style.display = "";
        count += 1;
      } else {
        item.style.display = "none";
      }
      if (textValue_no_space == dropdown_input_no_space){
        equalValue_count += 1;
        dropdown_input.value = textValue;
      }
      if (equalValue_count >= 1 || count < 1){
        dropdown_items.classList.remove("show");
        dropdown_button.innerHTML = '▼';
      } else {
        dropdown_items.classList.add("show");
        dropdown_button.innerHTML = '▲';
      }
    }
  };

  ResearchView.prototype.dropdown_button_click = function(dropdown_button){
    var dropdown_items = dropdown_button.parentElement.parentElement.querySelector('.dropdown_items');
    if (dropdown_items.classList.contains('show')){
      dropdown_button.innerHTML = '▼';
    } else {
      dropdown_button.innerHTML = '▲';
    }
    dropdown_items.classList.toggle("show");
  };

  ResearchView.prototype.dropdown_items_click = function(dropdown_item, dropdown_items){
    var dropdown_button = dropdown_item.parentElement.parentElement.querySelector('.dropdown_button');
    var dropdown_input = dropdown_item.parentElement.parentElement.querySelector('.dropdown_input');
    dropdown_button.innerHTML = '▼';
    dropdown_input.value = dropdown_item.innerText;
    dropdown_items.classList.remove('show');
  };

  ResearchView.prototype.select_year_change = function(select, another_select){
    var select_name, another_select_name;
    select_name = select.options[select.selectedIndex].text;
    another_select_name = another_select.options[another_select.selectedIndex].text;
    if (select.getAttribute('id') === 'select_year-from'){
      if (select_name > another_select_name) {
        common.makeToastMsg('대회 년도 입력이 잘못되었습니다.', 4000);
        common.siblings(select)[0].innerHTML = another_select_name;
      } else {
        common.siblings(select)[0].innerHTML = select_name;
      }
    } else if (select.getAttribute('id') === 'select_year-to'){
      if (select_name < another_select_name) {
        common.makeToastMsg('대회 년도 입력이 잘못되었습니다.', 4000);
        common.siblings(select)[0].innerHTML = another_select_name;
      } else {
        common.siblings(select)[0].innerHTML = select_name;
      }
    }
  };

  ResearchView.prototype.mobile_tools_active_body_click = function(target){
    if (this.$close_mobile_tools_btn.classList.contains('active')) {
      this.$close_mobile_tools_btn.classList.remove('active');
      this.$open_mobile_tools_btn.classList.add('active');
      this.close_mobile_tools_list();
    }
  };

  ResearchView.prototype.radio_click = function(radio_item, radio_array){
    for (var i=0; i<radio_array.length; i++){
      var item = radio_array[i];
      item.checked = false;
    }
    radio_item.checked = true;
  };

  ResearchView.prototype.checkbox_click = function(target) {
    var checkboxTarget = target;
    if (checkboxTarget.checked){
      checkboxTarget.checked = true;
    } else {
      checkboxTarget.checked = false;
    }
  };

  ResearchView.prototype.setTableFields = function(data){
    this.template.setTableTemplates(data);
  }

  ResearchView.prototype.setSearchResultLoading = function() {
    var searchResult_tbody = this.$searchResult_table.querySelector('tbody');
    if (searchResult_tbody.querySelector('tbody .initMemo')) {
      var memo = searchResult_tbody.querySelector('.initMemo');
      memo.parentNode.removeChild(memo);
    }
    this.$searchResult_table.insertAdjacentHTML('afterend', this.template.setSearchResultLoading());
    this.reset_Pagination_by_mode('result_data_table_mode');
  };

  ResearchView.prototype.printSearchResult_by_mode = function(mode, data, outputState) {
    var self = this;
    var tbody = null;
    if (mode === 'result_data_table_mode'){
      tbody = this.$searchResult_table.querySelector('tbody');
    } else {
      tbody = this.$note_table.querySelector('tbody');
    }
    if (data.length > 0) {
      tbody.innerHTML = this.template.setSearchResult('searchResult', data);
      this.set_Pagination_by_mode(mode, outputState);
    } else {
      tbody.innerHTML = this.template.noDataErrorMsg_by_mode(mode);
      this.reset_Pagination_by_mode(mode);
    }
    var loading = this.$document_main.querySelector('.displayLoading');
    if (loading){
      loading.parentNode.removeChild(loading);
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  ResearchView.prototype.research_btn_click = function() {
    this.set_researchwindow_display_none();
    this.remove_modal_popup_parent_scroll_disabled();
    this.$searchResult_table.querySelector('tbody').innerHTML = "";
    this.setSearchResultLoading();
  };

  ResearchView.prototype.reset_conditions_btn_click = function(researchConditions) {
    var self = this;
    var currentSearchState = document.querySelector('.current_search_state').innerText;
    this.reset_researchwindow();
    if (this.reset_conditions_btn_click_count > 0){
      this.unblock_researchwindow();
      this.$searchStateResearch.classList.add('current_search_state');
      this.$searchStateFiltering.classList.remove('current_search_state');
    } else {
      this.set_searchConditions_in_the_researchwindow(researchConditions);
      common.makeToastMsg('한번 더 누르시면 입력하신 검색조건이 모두 초기화됩니다.', 3000);
      this.reset_conditions_btn_click_count++;
    }
  };

  ResearchView.prototype.delete_records_click = function(){
    var note_table_th_table_checkbox = document.querySelector('#note_table thead th.table_checkbox');
    var note_table_select_all_records = note_table_th_table_checkbox.querySelector('input[type=checkbox]');
    if (note_table_select_all_records.checked){
      note_table_select_all_records.checked = false;
      note_table_th_table_checkbox.classList.remove('checked');
    }
  };

  ResearchView.prototype.set_searchConditions_in_the_researchwindow = function(searchConditions){
    if (searchConditions.player_name !== "") {
      this.$searchForm_name.value = searchConditions.player_name;
    }
    if (searchConditions.player_sex !== "전체"){
      this.set_researchwindow_select(this.$searchForm_sex_select, searchConditions.player_sex);
    }
    if (searchConditions.player_age !== ""){
      this.set_researchwindow_checkbox(searchConditions.player_age);
    }
    if (searchConditions.player_age_criteria !== ""){
      var searchForm_age_criteria = searchForm.querySelector('#searchForm_age_criteria');
      var age_criteria_itemArr = searchForm_age_criteria.querySelectorAll('input[type=radio]');
      for (var i=0; i<age_criteria_itemArr.length; i++){
        (function(i){
          var item = age_criteria_itemArr[i];
          if (searchConditions.player_age_criteria === item.getAttribute('id')){
            item.checked = true;
          } else {
            item.checked = false;
          }
        })(i);
      }
    }
    if (searchConditions.style !== ""){
      this.set_researchwindow_checkbox(searchConditions.style);
    }
    if (searchConditions.distance !== ""){
      this.set_researchwindow_checkbox(searchConditions.distance);
    }
    if (searchConditions.competition_year_from !== ""){
      this.set_researchwindow_select(this.$searchForm_year_from, searchConditions.competition_year_from);
    }
    if (searchConditions.competition_year_to !== ""){
      this.set_researchwindow_select(this.$searchForm_year_to, searchConditions.competition_year_to);
    }
    if (searchConditions.competition_name !== ""){
      this.$searchForm_competition_name_input.value = searchConditions.competition_name;
    }
    if (searchConditions.player_team !== ""){
      this.$searchForm_team_input.value = searchConditions.player_team;
    }
  };

  ResearchView.prototype.reset_researchwindow = function(){
    var searchForm_input = searchForm.querySelectorAll('input[type=text]');
    var searchForm_checkbox = searchForm.querySelectorAll('input[type=checkbox]:checked');
    var searchForm_radio = searchForm.querySelectorAll('.radio_items');
    var searchForm_select = searchForm.querySelectorAll('select');
    for (var i=0; i<searchForm_input.length; i++){
      var item = searchForm_input[i];
      item.value = "";
    }
    for (var i=0; i<searchForm_checkbox.length; i++){
      var item = searchForm_checkbox[i];
      item.checked = false;
    }
    for (var i=0; i<searchForm_radio.length; i++){
      var radio = searchForm_radio[i];
      var itemArr = radio.querySelectorAll('input[type=radio]');
      for (var j=0; j<itemArr.length; j++){
        (function(index){
          var item = itemArr[index];
          if (index == 0){
            item.checked = true;
          } else {
            item.checked = false;
          }
        })(j);
      }
    }
    for (var i=0; i<searchForm_select.length; i++){
      var select = searchForm_select[i];
      var searchForm_select_label = common.siblings(select)[0];
      var items = select.querySelectorAll('option');
      for (var j=0; j<items.length; j++){
        (function(index){
          var item = items[index];
          if (index == 0){
            item.selected = true;
            searchForm_select_label.innerHTML = item.text;
          } else {
            item.selected = false;
          }
        })(j);
      }
    }
  };

  ResearchView.prototype.block_researchwindow = function() {
    var inputGroup = document.querySelectorAll('#searchForm .input-group');
    var checkboxItems = document.querySelectorAll('#searchForm .checkbox_items');
    var selectboxes = document.querySelectorAll('#searchForm .selectbox');
    var radioItems = document.querySelectorAll('#searchForm .radio_items');
    if (this.$searchForm_name.value != "") {
      this.$searchForm_name.disabled = true;
    }
    for (var i=0; i<inputGroup.length; i++){
      (function(i){
        var item = inputGroup[i];
        var text = item.querySelector('input[type=text]');
        var button = item.querySelector('button');
        if (text.value != "") {
          text.disabled = true;
          button.disabled = true;
        }
      })(i);
    }
    for (var i=0; i<checkboxItems.length; i++){
      (function(i){
        var div = checkboxItems[i];
        var all_items = div.querySelectorAll('input[type=checkbox]');
        var checked_items = div.querySelectorAll('input[type=checkbox]:checked');
        if (checked_items.length > 0){
          for (var j=0; j<all_items.length; j++){
            (function(j){
              all_items[j].disabled = true;
            })(j);
          }
        } else {
          for (var j=0; j<all_items.length; j++){
            (function(j){
              all_items[j].disabled = false;
            })(j);
          }
        }
        if (checked_items.length > 1) {
          for (var j=0; j<checked_items.length; j++){
            (function(j){
              checked_items[j].disabled = false;
            })(j);
          }
        }
      })(i);
    }
    for (var i=0; i<selectboxes.length; i++){
      (function(i){
        var selectbox = selectboxes[i];
        var select_items = selectbox.querySelectorAll('select');
        for (var j=0; j<select_items.length; j++){
          (function(j){
            var item = select_items[j];
            var itemID = select_items[j].getAttribute('id');
            switch (itemID) {
              case 'select_player-sex':
                if (item.selectedIndex != 0) {
                  item.disabled = true;
                  selectbox.classList.add('disabled');
                }
                break;
              case 'select_year-from':
                var selected_value = parseInt(item.options[item.selectedIndex].text);
                for (var k=0; k<item.length; k++){
                  (function(k){
                    var value = parseInt(item[k].value);
                    if (value < selected_value){
                      item[k].disabled = true;
                    } else {
                      item[k].disabled = false;
                    }
                  })(k);
                }
                break;
              case 'select_year-to':
                var selected_value = parseInt(item.options[item.selectedIndex].text);
                for (var k=0; k<item.length; k++){
                  (function(k){
                    var value = parseInt(item[k].value);
                    if (value > selected_value){
                      item[k].disabled = true;
                    } else {
                      item[k].disabled = false;
                    }
                  })(k);
                }
                break;
            }
          })(j);
        }
      })(i);
    }
  };

  ResearchView.prototype.unblock_researchwindow = function() {
    var disabled_items = document.querySelectorAll(':disabled');
    var disabled_class_items = document.querySelectorAll('.disabled');
    for (var i=0; i<disabled_items.length; i++){
      var item = disabled_items[i];
      item.disabled = false;
      item.removeAttribute('disabled');
    }
    for (var i=0; i<disabled_class_items.length; i++){
      var item = disabled_class_items[i];
      item.classList.remove('disabled');
    }
  };

  ResearchView.prototype.show_researchwindow_btn_click = function(researchConditions, filteringConditions) {
    var currentSearchState = document.querySelector('.current_search_state').innerText;
    var currentTableState = this.get_current_active_table_mode();
    if (this.$close_mobile_tools_btn.classList.contains('active')){
      this.$close_mobile_tools_btn.classList.remove('active');
      this.$open_mobile_tools_btn.classList.add('active');
      this.close_mobile_tools_list();
    }

    if (currentTableState === 'result_data_table_mode'){
      this.set_researchwindow_display_block();
      this.set_modal_popup_parent_scroll_disabled();
      this.reset_researchwindow();
      if (Object.keys(researchConditions).length > 0){
        this.set_searchConditions_in_the_researchwindow(researchConditions);
        this.block_researchwindow();
        if (currentSearchState === '필터링 모드'){
          this.reset_researchwindow();
          this.set_searchConditions_in_the_researchwindow(filteringConditions);
        }
      } else {
        this.$searchStateResearch.classList.add('current_search_state');
        this.$searchStateFiltering.classList.remove('current_search_state');
      }
    } else {
      this.$errorMsg_modal.classList.add('show');
      this.show_modal_backdrop();
    }
  };

  ResearchView.prototype.show_modal_backdrop = function(){
    document.body.insertAdjacentHTML('beforeend', this.$modal_backdrop);
  };

  ResearchView.prototype.close_modals = function(modalID){
    document.querySelector('.modal-backdrop').remove();
    document.querySelector('#' + modalID).classList.remove('show');
  };

  ResearchView.prototype.hide_researchwindow_btn_click = function(){
    this.set_researchwindow_display_none();
    this.remove_modal_popup_parent_scroll_disabled();
  };

  ResearchView.prototype.setSearchConditionsBar = function(data){
    this.$searchConditionsBarContent.innerHTML = this.template.setSearchConditionsBar(data);
  };

  ResearchView.prototype.tableModeTabs_click = function(active_table_mode){
    var self = this;
    if (active_table_mode === 'result_data_table_mode'){
      this.set_result_data_table_active();
    } else if (active_table_mode === 'note_table_mode') {
      this.set_note_table_active();
      this.hide_researchwindow_btn_click();
    }
    this.set_mobile_tools();
  };

  ResearchView.prototype.mobile_tools_btn_click = function(target){
    if (target.classList.contains('active')){
      target.classList.remove('active');
      common.siblings(target)[0].classList.add('active');
    } else {
      target.classList.add('active');
      common.siblings(target)[0].classList.remove('active');
    }

    var current_active_btn = document.querySelector('#mobile_tools_btn button.active');
    if (current_active_btn.classList.contains('close_tools')){
      this.hide_researchwindow_btn_click();
      this.open_mobile_tools_list();
    } else {
      this.close_mobile_tools_list();
    }

  };

  ResearchView.prototype.open_mobile_tools_list = function(){
    this.$mobile_tools_list.classList.add('active');
    this.set_mobile_tools();
  };

  ResearchView.prototype.set_mobile_tools = function(){
    var current_table_state = this.get_current_active_table_mode();
    var result_active_tools = this.$mobile_tools_result_active;
    var note_active_tools = this.$mobile_tools_note_active;
    // 결과 탭일 때
    if (current_table_state === 'result_data_table_mode'){
      for (var i = 0; i < result_active_tools.length; i++){
        (function(i){
          var tool = result_active_tools[i];
          tool.style['pointer-events'] = 'auto';
          if (tool.classList.contains('click_disabled')){
            tool.classList.remove('click_disabled');
          }
        })(i);
      }
      for (var i = 0; i < note_active_tools.length; i++){
        (function(i){
          var tool = note_active_tools[i];
          tool.style['pointer-events'] = 'none';
          tool.classList.add('click_disabled');
        })(i);
      }
    }
    // 노트 탭일 때
    else {
      for (var i = 0; i < result_active_tools.length; i++){
        (function(i){
          var tool = result_active_tools[i];
          tool.style['pointer-events'] = 'none';
          tool.classList.add('click_disabled');
        })(i);
      }
      for (var i = 0; i < note_active_tools.length; i++){
        (function(i){
          var tool = note_active_tools[i];
          tool.style['pointer-events'] = 'auto';
          if (tool.classList.contains('click_disabled')){
            tool.classList.remove('click_disabled');
          }
        })(i);
      }
    }
  };

  ResearchView.prototype.close_mobile_tools_list = function(){
    this.$mobile_tools_list.classList.remove('active');
  };

  ResearchView.prototype.mobile_sort_btn_click = function(){
    this.$mobile_sort_modal.classList.add('show');
    this.show_modal_backdrop();
  };

  ResearchView.prototype.mobile_setting_btn_click = function(){
    this.$mobile_setting_modal.classList.add('show');
    this.show_modal_backdrop();
  };

/*
  ResearchView.prototype.mobile_tools_click = function(target, researchConditions, filteringConditions){
    var clicked_tool = target;
    var clicked_tool_id = clicked_tool.getAttribute('id');
    var previous_active_tool = this.$mobile_tools_list.querySelector('.active');
    var previous_active_mobile_tool_item = this.$mobile_tools_content.querySelector('.mobile_tool_item.active');
    var currentTableState = this.get_current_active_table_mode();
    if (previous_active_mobile_tool_item){
      previous_active_mobile_tool_item.classList.remove('active');
    }
    if (previous_active_tool){
      previous_active_tool.classList.remove('active');
    }
    if (clicked_tool == previous_active_tool){
      this.$mobile_modal_container.classList.add('mobile_none');
      this.remove_modal_popup_parent_scroll_disabled();
    } else {
      this.set_researchwindow_display_none();
      switch (clicked_tool_id) {
        case 'mobile_researchwindow_btn':
          this.show_researchwindow_btn_click(researchConditions, filteringConditions);
          break;
        case 'mobile_note_btn':
          this.$mobile_note_table_tools.classList.add('active');
          break;
        case 'mobile_sort_btn':
          this.$mobile_sort_tools.classList.add('active');
          break;
        case 'mobile_setting_btn':
          this.$mobile_setting_tools.classList.add('active');
          break;
      }
      if ((currentTableState !== 'note_table_mode') || (clicked_tool_id !== 'mobile_researchwindow_btn')){
        clicked_tool.classList.add('active');
        this.$mobile_modal_container.classList.remove('mobile_none');
        this.set_modal_popup_parent_scroll_disabled();
      }
    }
  };
*/
  ResearchView.prototype.mobile_note_active_btn_checkbox_click = function(){
    var self = this;
    var prev_active_table_mode = this.get_current_active_table_mode();
    if (prev_active_table_mode === 'result_data_table_mode'){
      self.set_note_table_active();
    } else if (prev_active_table_mode === 'note_table_mode'){
      self.set_result_data_table_active();
    }
  };

  ResearchView.prototype.note_select_all_records_click = function(target){
    var current_page_table_checkboxes = document.querySelectorAll('.select_record');
    if ((target.checked) || (!target.classList.contains('checked'))){
      for (var i=0; i<current_page_table_checkboxes.length; i++){
        var checkbox = current_page_table_checkboxes[i];
        var tr_data = checkbox.parentElement.parentElement;
        checkbox.checked = true;
        tr_data.classList.add('checked');
      }
      target.classList.add('checked');
    } else {
      for (var i=0; i<current_page_table_checkboxes.length; i++){
        var checkbox = current_page_table_checkboxes[i];
        var tr_data = checkbox.parentElement.parentElement;
        checkbox.checked = false;
        tr_data.classList.remove('checked');
      }
      target.classList.remove('checked');
    }
  };

  ResearchView.prototype.tr_data_click = function(target){
    var tr_data = target;
    var td_checkbox = tr_data.querySelector('.table_checkbox');
    var checkbox = tr_data.querySelector('input[type=checkbox]');
    var result_data_table_th_checkbox = document.querySelector('#result_data_table thead th.table_checkbox input[type=checkbox]');
    if (tr_data.classList.contains('checked')){
      tr_data.classList.remove('checked');
      td_checkbox.classList.remove('checked');
      checkbox.checked = false;
      result_data_table_th_checkbox.checked = false;
      result_data_table_th_checkbox.classList.remove('checked');
    } else {
      tr_data.classList.add('checked');
      td_checkbox.classList.add('checked');
      checkbox.checked = true;
      var checked_all_tr = document.querySelectorAll('#result_data_table tr.data.checked');
      if (checked_all_tr.length == 30){
        result_data_table_th_checkbox.checked = true;
        result_data_table_th_checkbox.classList.add('checked');
      }
    }
  };

  ResearchView.prototype.save_records_to_note_click = function(){
    var checked_trArr = this.$searchResult_table.querySelectorAll('tr.data.checked');
    for (var i=0; i<checked_trArr.length; i++){
      (function(i){
        var tr = checked_trArr[i];
        tr.classList.remove('checked');
        tr.classList.add('saved');
      })(i);
    }
  };

  ResearchView.prototype.check_saved_data = function(saved_data_indexArr){
    var result_data_table_trArr = document.querySelectorAll('#result_data_table tr.data');
    var result_data_table_th_checkbox = document.querySelector('#result_data_table thead th.table_checkbox input[type=checkbox]');

    result_data_table_th_checkbox.checked = false;
    result_data_table_th_checkbox.classList.remove('checked');
    for (var i=0; i<result_data_table_trArr.length; i++){
      (function(i){
        var tr = result_data_table_trArr[i];
        var td_checkbox = tr.querySelector('.table_checkbox');
        var checkbox = td_checkbox.querySelector('input[type=checkbox]');
        tr.classList.remove('saved');
        tr.classList.remove('checked');
        td_checkbox.classList.remove('checked');
        checkbox.checked = false;
      })(i);
    }
    for (var i=0; i<saved_data_indexArr.length; i++){
      (function(i){
        var index = saved_data_indexArr[i];
        var tr = result_data_table_trArr[index];
        var td_checkbox = tr.querySelector('.table_checkbox');
        var checkbox = td_checkbox.querySelector('input[type=checkbox]');
        tr.classList.add('saved');
        td_checkbox.classList.add('checked');
        checkbox.checked = true;
      })(i);
    }

    if (saved_data_indexArr.length == 30){
      result_data_table_th_checkbox.checked = true;
      result_data_table_th_checkbox.classList.add('checked');
    }
  };

  ResearchView.prototype.set_note_list = function(data){
    var current_note_title = data[0];
    var select_notes = document.querySelectorAll('.select_notes');
    for (var i=0; i<select_notes.length; i++){
      var select = select_notes[i];
      select.innerHTML = this.template.set_note_list(data);
      select.value = current_note_title;
    }
  };

  ResearchView.prototype.set_researchwindow_select = function(selectTarget, searchCondition){
    var optionArr = selectTarget.querySelectorAll('option');
    var selectBox = selectTarget.parentElement;
    for (var i=0; i<optionArr.length; i++){
      (function(i){
        var text = optionArr[i].text;
        if (i > 0){
          if (text === searchCondition){
            var label = selectBox.querySelector('.select_label');
            label.innerHTML = text;
            selectTarget.options[i].selected = true;
          }
        }
      })(i);
    }
  };

  ResearchView.prototype.set_researchwindow_checkbox = function(searchCondition){
    var checked_itemArr = common.string_with_square_brakets_to_array(searchCondition);
    for (var i=0; i<checked_itemArr.length; i++){
      (function(i){
        document.getElementById(checked_itemArr[i]).checked = true;
      })(i);
    }
  };

  ResearchView.prototype.get_current_active_table_mode = function(){
    var active_table_mode = "";
    if (this.$tableWrapper.classList.contains('result_data_table_active')){
      active_table_mode = 'result_data_table_mode';
    } else if (this.$tableWrapper.classList.contains('note_table_active')){
      active_table_mode = 'note_table_mode';
    }
    return active_table_mode;
  };

  ResearchView.prototype.set_result_data_table_active = function(){
    this.$tableModeTabs.querySelector('.active').classList.remove('active');
    this.$tableModeTabs.querySelector('#result_data_table_mode span').classList.add('active');
    this.$searchResult_table.classList.add('active');
    this.$note_table.classList.remove('active');
    this.$tableWrapper.classList.remove('note_table_active');
    this.$tableWrapper.classList.add('result_data_table_active');
    /*
    this.$mobile_note_table_tools.classList.remove('note_table_active');
    this.$mobile_note_table_tools.classList.add('result_data_table_active');
    this.$mobile_note_table_tools.querySelector('.mobile_note_active_btn .switch input[type=checkbox]').checked = false;
    */
  };

  ResearchView.prototype.set_note_table_active = function(){
    this.$tableModeTabs.querySelector('.active').classList.remove('active');
    this.$tableModeTabs.querySelector('#note_table_mode span').classList.add('active');
    this.$searchResult_table.classList.remove('active');
    this.$note_table.classList.add('active');
    this.$tableWrapper.classList.remove('result_data_table_active');
    this.$tableWrapper.classList.add('note_table_active');
    /*
    this.$mobile_note_table_tools.classList.add('note_table_active');
    this.$mobile_note_table_tools.classList.remove('result_data_table_active');
    this.$mobile_note_table_tools.querySelector('.mobile_note_active_btn .switch input[type=checkbox]').checked = true;
    */
  };

  ResearchView.prototype.set_researchwindow_display_block = function(){
    this.$searchStateWrapper.classList.add('show_inline_block');
    this.$resetConditionsButton.classList.add('show_inline_block');
    this.$researchButton.classList.add('show_inline_block');
    this.$searchForm.classList.add('show');
    this.$showResearchWindowButton.classList.remove('show_inline_block');
    this.$hideResearchWindowButton.classList.add('show_inline_block');
    this.$searchConditionsBar.classList.remove('d-inline-block');
    this.$searchConditionsBar.classList.add('d-none');
    this.$searchForm_wrapper.classList.remove('mobile_none');
    this.$searchStateWrapper.classList.add('mobile_show_inline_block');
    this.$resetConditionsButton.classList.add('mobile_show_inline_block');
    this.$researchButton.classList.add('mobile_show_inline_block');
    this.reset_conditions_btn_click_count = 0;
  };

  ResearchView.prototype.set_researchwindow_display_none = function() {
    var currentSearchState = document.querySelector('.current_search_state').innerText;
    if (currentSearchState === '검색 모드'){
      this.$searchStateResearch.classList.remove('current_search_state');
      this.$searchStateFiltering.classList.add('current_search_state');
    }
    this.$searchStateWrapper.classList.remove('show_inline_block');
    this.$resetConditionsButton.classList.remove('show_inline_block');
    this.$researchButton.classList.remove('show_inline_block');
    this.$searchForm.classList.remove('show');
    this.$showResearchWindowButton.classList.add('show_inline_block');
    this.$hideResearchWindowButton.classList.remove('show_inline_block');
    this.$mobile_modal_container.classList.add('mobile_none');
    this.$searchConditionsBar.classList.remove('d-none');
    this.$searchConditionsBar.classList.add('d-inline-block');
    this.$searchForm_wrapper.classList.add('mobile_none');
    this.$searchStateWrapper.classList.remove('mobile_show_inline_block');
    this.$resetConditionsButton.classList.remove('mobile_show_inline_block');
    this.$researchButton.classList.remove('mobile_show_inline_block');
  };

  ResearchView.prototype.set_modal_popup_parent_scroll_disabled = function(){
    document.body.classList.add('mobile_body_overflow_hidden');
    this.$mobile_modal_container.addEventListener('scroll', function(event){
      event.preventDefault();
    });
    this.$mobile_modal_container.addEventListener('touchmove', function(event){
      event.preventDefault();
    });
    this.$mobile_modal_container.addEventListener('mousewheel', function(event){
      event.preventDefault();
    });
    this.$mobile_modal_content.addEventListener('scroll', function(event){
      event.stopPropagation();
    });
    this.$mobile_modal_content.addEventListener('touchmove', function(event){
      event.stopPropagation();
    });
    this.$mobile_modal_content.addEventListener('mousewheel', function(event){
      event.stopPropagation();
    });
  };

  ResearchView.prototype.remove_modal_popup_parent_scroll_disabled = function(){
    document.body.classList.remove('mobile_body_overflow_hidden');
    this.$mobile_modal_container.removeEventListener('scroll', function(event){
      event.preventDefault();
    });
    this.$mobile_modal_container.removeEventListener('touchmove', function(event){
      event.preventDefault();
    });
    this.$mobile_modal_container.removeEventListener('mousewheel', function(event){
      event.preventDefault();
    });
    this.$mobile_modal_content.removeEventListener('scroll', function(event){
      event.stopPropagation();
    });
    this.$mobile_modal_content.removeEventListener('touchmove', function(event){
      event.stopPropagation();
    });
    this.$mobile_modal_content.removeEventListener('mousewheel', function(event){
      event.stopPropagation();
    });
  };

  ResearchView.prototype.get_mobile_setting_data = function(){
    var self = this;
    var result = new Array();
    var td_category = document.querySelectorAll('#mobile_setting_td_category input[type=checkbox]');
    for (var i=0; i < td_category.length; i++){
      (function(i){
        var obj = new Object;
        var category = td_category[i].getAttribute('id');
        var checked = td_category[i].checked;
        obj.checked = checked;
        switch (category) {
          case '이름':
            obj.class_name = 'mobile_table_pname';
            break;
          case '성별':
            obj.class_name = 'mobile_table_sex';
            break;
          case '나이':
            obj.class_name = 'mobile_table_age';
            break;
          case '종목':
            obj.class_name = 'mobile_table_style';
            break;
          case '거리':
            obj.class_name = 'mobile_table_distance';
            break;
          case '기록':
            obj.class_name = 'mobile_table_record';
            break;
          case '팀(소속)':
            obj.class_name = 'mobile_table_team';
            break;
          case '대회일시':
            obj.class_name = 'mobile_table_competitionDate';
            break;
          case '대회장소':
            obj.class_name = 'mobile_table_competition_name';
            break;
          case '비고':
            obj.class_name = 'mobile_table_remark';
            break;
        }
        result.push(obj);
      })(i);
    }
    return result;
  };

  ResearchView.prototype.updateUI_mobile_settingData = function(settingData){
    var self = this;
    for (var i=0; i < settingData.length; i++){
      (function(i){
        var data = settingData[i];
        var display_str = "";
        if (data.checked == true){
          display_str = "display: table-cell;";
        } else {
          display_str = "display: none;";
        }
        console.log(data.class_name);
        console.log(display_str);
        common.changeCSSRules('researchApp.css', 'only screen and (max-width:992px)', '.' + data.class_name, display_str);
      })(i);
    }
  };

  ResearchView.prototype.set_Pagination_by_mode = function(mode, outputState){
    if (mode === 'result_data_table_mode'){
      this.$paginationWrapper_result.innerHTML = this.template.setPagination(outputState);
    } else {
      this.$paginationWrapper_note.innerHTML = this.template.setPagination(outputState);
    }
  };

  ResearchView.prototype.reset_Pagination_by_mode = function(mode){
    if (mode === 'result_data_table_mode'){
      this.$paginationWrapper_result.innerHTML = "";
    } else {
      this.$paginationWrapper_note.innerHTML = "";
    }
  };

  ResearchView.prototype.get_mobile_sort_data = function(){
    var self = this;
    var result = new Array();
    var current_sort_category = document.querySelector('#mobile_searchResult_sort_category .select_label').innerText;
    var current_sort_order = document.querySelector('#mobile_searchResult_sort_order .select_label').innerText;
    result.push(current_sort_category);
    result.push(current_sort_order);

    return result;
  };

  ResearchView.prototype.synchronize_sort_data = function(sort_category, sort_order){
    if (sort_category != ""){
      document.querySelector('#mobile_searchResult_sort_category .select_label').innerText = sort_category;
      document.querySelector('#searchResult_sort_category .select_label').innerText = sort_category;
    }
    if (sort_order != ""){
      document.querySelector('#mobile_searchResult_sort_order .select_label').innerText = sort_order;
      document.querySelector('#searchResult_sort_order .select_label').innerText = sort_order;
    }
  };

  common.setNamespace('researchView');
  exports.app = exports.app || {};
  exports.app.researchView = ResearchView;
})(this);
