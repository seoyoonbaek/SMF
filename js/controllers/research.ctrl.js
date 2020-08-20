(function(exports){
  'use strict';
  function ResearchController(model, view){
    //console.log("controller created");
    this.model = model;
    this.view = view;
    var self = this;
    this.set_localStorageData_to_dataClass();
    this.setBindMethods_after_all_setHTML();
  }

  ResearchController.prototype.setBindMethods_after_all_setHTML = function(){
    var self = this;
    // setMenu -> setSearchForm -> setTables -> setMobileTools -> setBindMethods
    self.setMenu();
  }

  ResearchController.prototype.setMenu = function(){
    var self = this;
    self.model.getMenuItems(function(data){
      if (self.view.render('setMenu', data)){
        var callback = function(){self.setSearchForm();} || function() {};
        callback.call(self);
      }
    });
  }

  ResearchController.prototype.setSearchForm = function(){
    var self = this;
    self.model.getSearchFormConditions(function(data){
      if (self.view.render('setSearchForm', data)){
        var callback = function(){self.setTables();} || function() {};
        callback.call(self);
      }
    });
  }

  ResearchController.prototype.setTables = function(){
    var self = this;
    // 테이블 초기화에는 note 데이터만 필요하므로
    var table_mode = 'note_table_mode';
    self.model.getNoteTitleList(function(data){
      self.view.set_note_list(data);
    });
    self.model.get_nextResult_by_mode(table_mode, function(data){
      self.model.get_outputState_by_mode(table_mode, function(outputState){
        if (self.view.render('setTables', data)){
          var callback = function(){self.setMobileTools();} || function() {};
          callback.call(self);
        }
      });
    });
  }

  ResearchController.prototype.setMobileTools = function(){
    var self = this;
    var data = new Array();
    self.model.getNoteData(function(noteData){
      data.push(noteData);
      self.model.getSettingData(function(settingData){
        data.push(settingData);
        if (self.view.render('setMobileTools', data)){
          var callback = function(){self.setBindMethods();} || function() {};
          callback.call(self);
        }
      });
    });
  }

  ResearchController.prototype.setBindMethods = function(){
    //console.log('ctrl-setBindMethods');
    var self = this;
    this.view.bind('select_change', function(select){
      self.select_change(select);
    });
    this.view.bind('dropdown_input_focus', function(dropdown_input){
      self.dropdown_input_focus(dropdown_input);
    });
    this.view.bind('dropdown_input_keyup', function(dropdown_input){
      self.dropdown_input_keyup(dropdown_input);
    });
    this.view.bind('dropdown_button_click', function(dropdown_button){
      self.dropdown_button_click(dropdown_button);
    });
    this.view.bind('dropdown_items_click', function(dropdown_item, dropdown_items){
      self.dropdown_items_click(dropdown_item, dropdown_items);
    });
    this.view.bind('select_year_change', function(select, another_select){
      self.select_year_change(select, another_select);
    });
    this.view.bind('mobile_tools_active_body_click', function(target){
      self.mobile_tools_active_body_click(target);
    });
    this.view.bind('radio_click', function(radio_item, radio_array){
      self.radio_click(radio_item, radio_array);
    });
    this.view.bind('checkbox_click', function(target){
      self.checkbox_click(target);
    });
    this.view.bind('research_btn_click', function(searchConditions, currentSearchState){
      self.research_btn_click(searchConditions, currentSearchState);
    });
    this.view.bind('reset_conditions_btn_click', function(){
      self.reset_conditions_btn_click();
    });
    this.view.bind('show_researchwindow_btn_click', function(){
      self.show_researchwindow_btn_click();
    });
    this.view.bind('hide_researchwindow_btn_click', function(){
      self.hide_researchwindow_btn_click();
    });
    this.view.bind('pagination_click', function(currentTableState, currentSearchState, clickedIndex){
      self.pagination_click(currentTableState, currentSearchState, clickedIndex);
    });
    this.view.bind('tableModeTabs_click', function(active_table_mode){
      self.tableModeTabs_click(active_table_mode);
    });
    this.view.bind('mobile_tools_btn_click', function(target){
      self.mobile_tools_btn_click(target);
    });
    this.view.bind('mobile_sort_btn_click', function(){
      self.mobile_sort_btn_click();
    });
    this.view.bind('mobile_setting_btn_click', function(){
      self.mobile_setting_btn_click();
    });
    /*
    this.view.bind('mobile_tools_click', function(target){
      self.mobile_tools_click(target);
    });
    this.view.bind('mobile_note_active_btn_checkbox_click', function(){
      self.mobile_note_active_btn_checkbox_click();
    });
    this.view.bind('mobile_update_settingData_btn_click', function(mobile_setting_td_line, mobile_setting_td_category_array){
      self.mobile_update_settingData_btn_click(mobile_setting_td_line, mobile_setting_td_category_array);
    });
    */
    this.view.bind('note_select_all_records_click', function(target){
      self.note_select_all_records_click(target);
    });
    this.view.bind('tr_data_click', function(target){
      self.tr_data_click(target);
    });
    this.view.bind('save_records_to_note_click', function(checked_trArr){
      self.save_records_to_note_click(checked_trArr);
    });
    this.view.bind('create_new_note_click', function(){
      self.create_new_note_click();
    });
    this.view.bind('delete_note_click', function(){
      self.delete_note_click();
    });
    this.view.bind('select_notes_click', function(target){
      self.select_notes_click(target);
    });
    this.view.bind('delete_records_click', function(checked_tr_indexArr){
      self.delete_records_click(checked_tr_indexArr);
    });
    this.view.bind('select_sort_click', function(table_mode, sort_category, sort_order){
      self.select_sort_click(table_mode, sort_category, sort_order);
    });
    this.view.bind('window_beforeunload', function(){
      self.window_beforeunload();
    });
    this.view.bind('modals_click', function(target, modalID){
      self.modals_click(target, modalID);
    });
  };

  ResearchController.prototype.set_localStorageData_to_dataClass = function(){
    var self = this;
    this.model.get_localStorageData(function(noteData, settingData){
      self.model.init_dataClass_localStorageData(noteData, settingData);
    });
  };

  ResearchController.prototype.select_change = function(select){
    this.view.select_change(select);
  };

  ResearchController.prototype.dropdown_input_focus = function(dropdown_input){
    this.view.dropdown_input_focus(dropdown_input);
  };

  ResearchController.prototype.dropdown_input_keyup = function(dropdown_input){
    this.view.dropdown_input_keyup(dropdown_input);
  };

  ResearchController.prototype.dropdown_button_click = function(dropdown_button){
    this.view.dropdown_button_click(dropdown_button);
  };

  ResearchController.prototype.dropdown_items_click = function(dropdown_item, dropdown_items){
    this.view.dropdown_items_click(dropdown_item, dropdown_items);
  };

  ResearchController.prototype.select_year_change = function(select, another_select){
    this.view.select_year_change(select, another_select);
  };

  ResearchController.prototype.mobile_tools_active_body_click = function(target){
    this.view.mobile_tools_active_body_click(target);
  };

  ResearchController.prototype.radio_click = function(radio_item, radio_array){
    this.view.radio_click(radio_item, radio_array);
  };

  ResearchController.prototype.checkbox_click = function(target){
    this.view.checkbox_click(target);
  };

  ResearchController.prototype.research_btn_click = function(searchConditions, currentSearchState){
    var self = this;
    var searchState = currentSearchState;
    var table_mode = 'result_data_table_mode';
    this.view.setSearchConditionsBar(searchConditions);
    this.view.setTableFields(searchConditions);
    this.view.setSearchResultTable();
    this.view.research_btn_click();
    if (searchState === '검색 모드'){
      this.model.getSearchResult_fromDB(searchConditions, function(){
        self.model.sorting(table_mode, "", "", function(){
          self.model.set_outputState_by_mode(table_mode, function(){
            self.model.get_nextResult_by_mode(table_mode, function(data){
              self.model.get_outputState_by_mode(table_mode, function(outputState){
                self.view.printSearchResult_by_mode(table_mode, data, outputState);
                self.check_saved_data();
              });
            });
          });
        });
      });
    } else if (searchState === '필터링 모드'){
      this.model.getFilteringResult(searchConditions, function(){
        self.model.sorting(table_mode, "", "", function(){
          self.model.set_outputState_by_mode(table_mode, function(){
            self.model.get_nextResult_by_mode(table_mode, function(data){
              self.model.get_outputState_by_mode(table_mode, function(outputState){
                self.view.printSearchResult_by_mode(table_mode, data, outputState);
                self.check_saved_data();
              });
            });
          });
        });
      });
    }
  };

  ResearchController.prototype.reset_conditions_btn_click = function(){
    var self = this;
    this.model.get_researchConditions(function(data){
      self.view.reset_conditions_btn_click(data);
    })
  };

  ResearchController.prototype.show_researchwindow_btn_click = function(){
    var self = this;
    var researchConditions = new Object;
    var filteringConditions = new Object;
    this.model.get_researchConditions(function(data){
      researchConditions = data;
      self.model.get_filteringConditions(function(data){
        filteringConditions = data;
        self.view.show_researchwindow_btn_click(researchConditions, filteringConditions);
      });
    });
  };

  ResearchController.prototype.hide_researchwindow_btn_click = function(){
    this.view.hide_researchwindow_btn_click();
  };

  ResearchController.prototype.pagination_click = function(currentTableState, currentSearchState, clickedIndex){
    var self = this;
    this.view.setSearchResultLoading();
    this.model.set_outputState_current_index_by_mode(currentTableState, clickedIndex, function(){
      self.model.get_nextResult_by_mode(currentTableState, function(data){
        self.model.get_outputState_by_mode(currentTableState, function(outputState){
          self.view.printSearchResult_by_mode(currentTableState, data, outputState);
          self.check_saved_data();
        });
      });
    });
  };

  ResearchController.prototype.tableModeTabs_click = function(active_table_mode){
    var self = this;
    this.view.tableModeTabs_click(active_table_mode);
    this.model.get_outputState_by_mode(active_table_mode, function(outputState){
      self.view.set_Pagination_by_mode(active_table_mode, outputState);
      self.check_saved_data();
    });
  };

  ResearchController.prototype.mobile_tools_btn_click = function(target){
    var self = this;
    this.view.mobile_tools_btn_click(target);
  };

  ResearchController.prototype.mobile_sort_btn_click = function(){
    this.view.mobile_sort_btn_click();
  };

  ResearchController.prototype.mobile_setting_btn_click = function(){
    this.view.mobile_setting_btn_click();
  };

  ResearchController.prototype.mobile_tools_click = function(target){
    var self = this;
    var researchConditions = new Object;
    var filteringConditions = new Object;
    this.model.get_researchConditions(function(data){
      researchConditions = data;
      self.model.get_filteringConditions(function(data){
        filteringConditions = data;
        self.view.mobile_tools_click(target, researchConditions, filteringConditions);
      });
    });
  };

  ResearchController.prototype.mobile_note_active_btn_checkbox_click = function(){
    this.view.mobile_note_active_btn_checkbox_click();
  };

  ResearchController.prototype.mobile_update_settingData_btn_click = function(mobile_setting_td_line, mobile_setting_td_category_array){
    var self = this;
    var td_line = "2";
    var td_count = 0;
    var checked_tdArr = mobile_setting_td_category_array;
    if (mobile_setting_td_line === 'td_single_line'){
      td_line = "1";
    }
    td_count = parseInt(td_line) * 3;
    if (checked_tdArr.length == td_count){
      this.model.setSettingData(mobile_setting_td_line, mobile_setting_td_category_array, function(){
        self.model.getSettingData(function(settingData){
          self.view.updateUI_mobile_settingData(settingData);
        });
      });
    } else {
      alert('출력 항목을 ' + td_count + '개 선택해주세요.');
    }
  };

  ResearchController.prototype.note_select_all_records_click = function(target){
    this.view.note_select_all_records_click(target);
  };

  ResearchController.prototype.tr_data_click = function(target){
    this.view.tr_data_click(target);
  };

  ResearchController.prototype.save_records_to_note_click = function(checked_trArr){
    var self = this;
    var checked_tr_indexArr = new Array();
    var table_mode = 'note_table_mode';
    for (var i=0; i<checked_trArr.length; i++){
      (function(i){
        var tr_index = checked_trArr[i].querySelector('th').innerText;
        checked_tr_indexArr.push(tr_index);
      })(i);
    }
    this.view.save_records_to_note_click();
    this.view.setSearchResultLoading();
    this.model.setNoteData(checked_tr_indexArr, function(){
      self.model.sorting(table_mode, "", "", function(){
        self.model.set_outputState_by_mode(table_mode, function(){
          self.model.get_nextResult_by_mode(table_mode, function(data){
            self.model.get_outputState_by_mode(table_mode, function(outputState){
              self.view.printSearchResult_by_mode(table_mode, data, outputState);
            });
          });
        });
      });
    });
  };

  ResearchController.prototype.check_saved_data = function(){
    var self = this;
    var saved_dataArr = new Array();
    this.model.get_saved_data(function(data){
      self.view.check_saved_data(data);
    });
  };

  ResearchController.prototype.create_new_note_click = function(){
    var self = this;
    var table_mode = 'note_table_mode';
    this.model.createNewNote(function(result){
      if (result){
        self.model.getNoteTitleList(function(data){
          self.view.set_note_list(data);
        });
        self.model.set_outputState_by_mode(table_mode, function(){
          self.model.get_nextResult_by_mode(table_mode, function(data){
            self.model.get_outputState_by_mode(table_mode, function(outputState){
              self.view.printSearchResult_by_mode(table_mode, data, outputState);
              self.check_saved_data();
            });
          });
        });
      } else {
        common.makeToastMsg('노트는 최대 5개까지 만들 수 있습니다!', 4000);
      }
    });
  };

  ResearchController.prototype.delete_note_click = function(){
    var self = this;
    var table_mode = 'note_table_mode';
    this.model.deleteNote(function(result){
      if (result){
        self.model.getNoteTitleList(function(data){
          self.view.set_note_list(data);
        });
        self.model.sorting(table_mode, "", "", function(){
          self.model.set_outputState_by_mode(table_mode, function(){
            self.model.get_nextResult_by_mode(table_mode, function(data){
              self.model.get_outputState_by_mode(table_mode, function(outputState){
                self.view.printSearchResult_by_mode(table_mode, data, outputState);
                self.check_saved_data();
              });
            });
          });
        });
      } else {
        var msg = '남아있는 노트가 1개일 경우 노트 삭제를 하실 수 없습니다.';
        common.makeToastMsg(msg , 4000);
      }
    });
  };

  ResearchController.prototype.select_notes_click = function(target){
    var self = this;
    var new_note_title = target.text;
    var table_mode = 'note_table_mode';
    this.model.setNote(new_note_title, function(){
      self.model.sorting(table_mode, "", "", function(){
        self.model.set_outputState_by_mode(table_mode, function(){
          self.model.get_nextResult_by_mode(table_mode, function(data){
            self.model.get_outputState_by_mode(table_mode, function(outputState){
              self.view.printSearchResult_by_mode(table_mode, data, outputState);
              self.check_saved_data();
            });
          });
        });
      });
    });
  };

  ResearchController.prototype.delete_records_click = function(checked_tr_indexArr){
    var self = this;
    var table_mode = 'note_table_mode';
    this.model.deleteNoteData(checked_tr_indexArr, function(){
      self.model.set_outputState_by_mode(table_mode, function(){
        self.model.get_nextResult_by_mode(table_mode, function(data){
          self.model.get_outputState_by_mode(table_mode, function(outputState){
            self.view.printSearchResult_by_mode(table_mode, data, outputState);
            self.view.delete_records_click();
          });
        });
      });
    });
  };

  ResearchController.prototype.select_sort_click = function(table_mode, sort_category, sort_order){
    var self = this;
    this.model.sorting(table_mode, sort_category, sort_order, function(){
      self.view.setSearchResultLoading();
      self.model.set_outputState_by_mode(table_mode, function(){
        self.model.get_nextResult_by_mode(table_mode, function(data){
          self.model.get_outputState_by_mode(table_mode, function(outputState){
            self.view.printSearchResult_by_mode(table_mode, data, outputState);
          });
        });
      });
    });
  };

  ResearchController.prototype.window_beforeunload = function(){
    var self = this;
    this.model.getNoteData(function(noteData){
      self.model.getSettingData(function(settingData){
        self.model.save_localStorageData(noteData, settingData);
      });
    });
  };

  ResearchController.prototype.modals_click = function(target, modalID){
    var self = this;

    if (target.classList.contains('apply_modal')){
      if (modalID == 'mobile_setting_modal'){

      } else if (modalID == 'mobile_sort_modal'){
        var sort_data = new Array();
        var table_mode = self.view.get_current_active_table_mode();
        sort_data = self.view.get_mobile_sort_data();
        self.select_sort_click(table_mode, sort_data[0], sort_data[1]);
      }
    }
    self.view.close_modals(modalID);
  };

  common.setNamespace('researchController');
  exports.app = exports.app || {};
  exports.app.researchController = ResearchController;
})(this);
