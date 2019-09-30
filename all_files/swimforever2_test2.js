// 초기 검색 조건 전역변수
var searchConditions_string = '';
var name = '';
var sex_string = '';
var style_string = '';
var distance_string = '';
var age_string = '';
var competitionName = '';
var teamName = '';
var period_to = '';
var period_from = '';
var age_criteria = '';
var age_gap = 0;

// 이전 페이지에서 전달받은 데이터들 쪼개서 각 변수에 저장
temp = decodeURI(location.href).split("?");
data = temp[1].split(":");
name = data[0];
sex_string = data[1];
style_string = data[2];
distance_string = data[3];
age_string = data[4];
competitionName = data[5];
period_from = data[6];
period_to = data[7];
teamName = data[8];
age_criteria = data[9];

// 필터 검색 관련 전역변수
// 초기 필터 검색 조건 전역변수
var initial_filterCondition = new Object;
initial_filterCondition.pname = '';
initial_filterCondition.psex = new Array(); // 중복선택
initial_filterCondition.age = new Array(); // 중복선택
initial_filterCondition.style = new Array(); // 중복선택
initial_filterCondition.distance = new Array(); // 중복선택
initial_filterCondition.competitionName = '';
initial_filterCondition.competitionPeriod_from = period_from;
initial_filterCondition.competitionPeriod_to = period_to;
initial_filterCondition.teamName = '';
initial_filterCondition.age_criteria = age_criteria;
// 노트 필터 검색 조건 전역변수
var note_filterCondition = new Object;
// 결과 필터 검색 조건 전역변수
var result_filterCondition = new Object;

// 검색 결과 페이징 처리 관련 전역변수
var total_pages;

// 검색 결과 관련 전역변수
var response, response_temp;

// 정렬 관련 전역변수
var resultTable_sortingCriteria = new Object;
resultTable_sortingCriteria.criteria = 'record';
resultTable_sortingCriteria.mode = '0';
var noteTable_sortingCriteria = new Object;
noteTable_sortingCriteria.criteria = 'record';
noteTable_sortingCriteria.mode = '0';

// 노트 관련 전역변수
var currentNote_num = 1;
var all_notes = new Array();
var selected_tr_from_note = new Array();
var selected_but_not_saved_tr = new Array(); // 선택은 됐지만 아직 저장은 안 된 데이터
all_notes[0] = new Array();
all_notes[0].push(noteTable_sortingCriteria);
all_notes[0][1] = new Array(); // 노트 데이터 원본 저장
all_notes[0][2] = new Array(); // 노트 데이터 복사본 저장

// 페이지 로드 시 실행되는 명령
$(document).ready(function() {
  initialize_filterConditions_and_checkbox();
  //check_and_set_notes();
  // 초기 검색 조건 정리: string에 있는 _를 ,로 바꿔주기
  var sex_string_tmp = sex_string;
  var style_string_tmp = style_string;
  var distance_string_tmp = distance_string;
  var age_string_tmp = age_string;
  sex_string_tmp = sex_string_tmp.replace(/_/g, ',');
  style_string_tmp = style_string_tmp.replace(/_/g, ',');
  distance_string_tmp = distance_string_tmp.replace(/_/g, ',');
  age_string_tmp = age_string_tmp.replace(/_/g, ',');
  if (age_criteria == "대회당시") {
    $(".age_search_criteria input[type='radio'][value='대회당시']").attr('checked', true);
    $(".age_search_criteria input[type='radio'][value='대회당시']").prop('checked', true);
    age_criteria = 0;
  } else if (age_criteria == "현재나이") {
    $(".age_search_criteria input[value='현재나이']").attr('checked', true);
    $(".age_search_criteria input[value='대회당시']").prop('checked', true);
    age_criteria = 1;
  }
  // 데이터 가져오기
  // GET 방식으로 서버에 HTTP Request를 보냄.
  $.get("swimforever2_search_response_test.php", {
      // 검색 조건 전달 변수
      name: name,
      sex: sex_string_tmp,
      style: style_string_tmp,
      distance: distance_string_tmp,
      age: age_string_tmp,
      competitionName: competitionName,
      period_from: period_from,
      period_to: period_to,
      teamName: teamName,
      age_criteria: age_criteria
    },
    // 콜백 함수
    function(data, status) {
      // 반환 값 파싱
      response = JSON.parse(data);
      response_temp = JSON.parse(data);
      num = (response_temp).length;
      make_new_table_rows('resultTable', response_temp, 1);
      set_sortingExpression(resultTable_sortingCriteria);
      var tr_num = check_table_is_empty();
      if (tr_num > 0) {
        make_pageList_and_set_currentPage(response_temp);
      }
    });
});

// 로컬스토리지에 저장된 노트 데이터가 있는지 확인하고 불러오기
function check_and_set_notes() {
  if (!(localStorage.getItem("notes") === null)) {
    all_notes = JSON.parse(localStorage.getItem("notes"));
  }
  console.log("1");
  console.log(all_notes);
}

// 데이터 개수에 대한 페이지 리스트 목록 생성
function make_pageList_and_set_currentPage(obj) {
  var total_data_count = obj.length;
  var current_pageNum;
  // 현재 페이지 값 구하기
  var first_tr_index = $(".fixed-table-wrapper:visible > table > tbody > tr:first > td.retrieval_index").text();
  for (var i in obj) {
    if (obj[i]['index'] == first_tr_index) {
      current_pageNum = parseInt(i / 50) + 1;
    }
  }
  $(".pageList").remove();
  if ((total_data_count % 50) > 0) {
    total_pages = parseInt(total_data_count / 50) + 1;
  } else {
    total_pages = parseInt(total_data_count / 50);
  }
  // 페이지 리스트 목록 만들고 html로 출력
  var pageList_html = "<div class='pageList'><ul>";
  pageList_html += "<li class='pageList_prev'> \<\< </li><li class='pageList_first'>1</li><li class='pageList_skip_left'>...</li>";
  for (var i = 1; i <= total_pages; i++) {
    if (i > 5) {
      pageList_html += "<li class='pageList_item' style='display: none;'>" + i + "</li>";
    } else {
      pageList_html += "<li class='pageList_item'>" + i + "</li>";
    }
  }
  pageList_html += "<li class='pageList_skip_right'>...</li><li class='pageList_last'>" + total_pages + "</li><li class='pageList_next'> \>\> </li>";
  pageList_html += "</ul></div>";
  $("#main-content_result").append(pageList_html);
  $(".pageList_item").eq(current_pageNum - 1).addClass("current");
  if (total_pages <= 5) {
    $(".pageList_first").hide();
    $(".pageList_last").hide();
    $(".pageList_skip_left").hide();
    $(".pageList_skip_right").hide();
    $(".pageList_prev").hide();
    $(".pageList_next").hide();
  }
}

// 페이지 이동 시 데이터 로딩 및 페이지 리스트 변경
$(document).on("click ", ".pageList li", function() {
  // 페이지 번호 처리
  var obj = $(this);
  var prev_pageNum = $(".pageList_item.current").text() * 1;
  var current_pageNum;
  // ... 가 아닌 다른 걸 클릭했을 때
  if ((!obj.hasClass("pageList_skip_left")) && (!obj.hasClass("pageList_skip_right"))) {
    // << 클릭 시
    if (obj.hasClass("pageList_prev")) {
      if (prev_pageNum > 5) {
        current_pageNum = prev_pageNum - 5;
      } else {
        current_pageNum = 1;
      }
    }
    // >> 클릭 시
    else if (obj.hasClass("pageList_next")) {
      if (prev_pageNum < (total_pages - 5)) {
        current_pageNum = prev_pageNum + 5;
      } else {
        current_pageNum = total_pages;
      }
    }
    // 숫자 클릭 시
    else {
      current_pageNum = obj.text();
    }
    current_pageNum = current_pageNum * 1;
    change_pageList(current_pageNum);
    if ($(".fixed-table-wrapper:visible").hasClass("resultTable")) {
      make_new_table_rows('resultTable', response_temp, current_pageNum);
    } else if ($(".fixed-table-wrapper:visible").hasClass("noteTable")) {
      make_new_table_rows('noteTable', all_notes[currentNote_num - 1][2], current_pageNum);
      check_table_state_and_change_table_color();
    }
    $("#ContentWrap").scrollTop(0);
  }
});

// 페이지 이동 시 페이지 리스트 변경 함수
function change_pageList(current_pageNum) {
  total_pages = total_pages * 1;
  $(".pageList_item.current").removeClass("current");
  $(".pageList li").hide();
  var left = current_pageNum * 1 - 3;
  var right = current_pageNum * 1 + 1;
  // 총 페이지 수 5개 이상
  if (total_pages > 5) {
    // << 1 2 3 4 5 ... >> 형식
    if (current_pageNum <= 3) {
      $(".pageList_item").each(function(index, item) {
        if ((index >= 0) && (index <= 4)) {
          $(this).show();
        }
      });
      $(".pageList_skip_right").show();
      $(".pageList_last").show();
    }
    // << 1 ... n-4 n-3 n-2 n-1 n >> 형식
    else if (current_pageNum >= (total_pages - 2)) {
      $(".pageList_item").each(function(index, item) {
        if ((index >= (total_pages - 5)) && (index <= total_pages)) {
          $(this).show();
        }
      });
      $(".pageList_skip_left").show();
      $(".pageList_first").show();
    }
    // << 1 ... 2 3 4 5 6 ... n >> 형식
    else {
      $(".pageList_item").each(function(index, item) {
        if ((index >= left) && (index <= right)) {
          $(this).show();
        }
      });
      $(".pageList_skip_left").show();
      $(".pageList_skip_right").show();
      $(".pageList_first").show();
      $(".pageList_last").show();
    }
    $(".pageList_prev").show();
    $(".pageList_next").show();
  }
  // 총 페이지 수 5개 이하
  else {
    $(".pageList_item").show();
  }
  $(".pageList_item").eq(current_pageNum - 1).addClass("current");
}

// searchCondition_bar 내용 동적으로 생성하는 함수
function make_searchCondition_bar_content() {
  searchConditions_string += "<dl class='searchConditions'><dt>초기검색 조건</dt>";
  if (name != '') {
    searchConditions_string += "<dd><span> 이름 : " + name + "</span></dd>";
  }
  if (sex_string != '') {
    var content = sex_string.split("_");
    searchConditions_string += "<dd><span> 성별 : ";
    for (i = 0; i < content.length; i++) {
      searchConditions_string += content[i] + " ";
      if (content[i] + " " == "여 ") {} else if (content[i] + " " == "남 ") {}
    }
    searchConditions_string += "</span></dd>";
  }
  if (style_string != '') {
    var content = style_string.split("_");
    searchConditions_string += "<dd><span> 종목 : ";
    for (i = 0; i < content.length; i++) {
      searchConditions_string += content[i] + " ";
    }
    searchConditions_string += "</span></dd>";
  }
  if (distance_string != '') {
    content = distance_string.split("_");
    searchConditions_string += "<dd><span> 거리 : ";
    for (i = 0; i < content.length; i++) {
      searchConditions_string += content[i] + " ";
    }
    searchConditions_string += "</span></dd>";
  }
  if (age_string != '') {
    content = age_string.split("_");
    searchConditions_string += "<dd><span> 나이 : ";
    for (i = 0; i < content.length; i++) {
      searchConditions_string += content[i] + " ";
    }
    searchConditions_string += "</span></dd>";
  }
  if (competitionName != '') {
    searchConditions_string += "<dd><span> 대회명 : " + competitionName + "</span></dd>";
  }

  searchConditions_string += "<dd><span> 기간 : " + period_from + "년 ~ " + period_to + "년" + "</span></dd>";

  if (teamName != '') {
    searchConditions_string += "<dd><span> 소속 :  " + teamName + "</span></dd>";
  }
  searchConditions_string += "</dl>";
  $("#viewSearchConditions").append(searchConditions_string);
}

// 초기 검색 이용한 체크박스 및 필터 조건 초기화
// 초기 검색 창 체크박스 상태도 같이 초기화해줌.
function initialize_filterConditions_and_checkbox() {
  if (name != '') {
    $("#name-filter").attr('value', name + "");
    $("#name-filter").attr('placeholder', name + "");
    $("#name-filter").prop('readOnly', true);
    $("#name-filter").prop('disabled', true);
    $("#name-filter").addClass("disabled");
    $("#name-retrieval").attr('value', name + "");
    initial_filterCondition['pname'] = name;
  }
  if (sex_string != '') {
    $(".sex_filter input[type=checkbox]").prop('disabled', true);
    var content = sex_string.split("_");
    for (i = 0; i < content.length; i++) {
      if (content[i] + " " == "여 ") {
        $("input:checkbox[id='women-filter']").addClass("checked");
        $("input:checkbox[id='women-filter']").prop('checked', true);
        $("input:checkbox[id='women-filter']").prop('disabled', false);
        $("input:checkbox[id='women-filter']").parent().addClass("selected");
        $("input:checkbox[id='women-retrieval']").parent().addClass("selected");
        initial_filterCondition['psex'].push("women-filter");
      } else if (content[i] + " " == "남 ") {
        $("input:checkbox[id='men-filter']").addClass("checked");
        $("input:checkbox[id='men-filter']").prop('checked', true);
        $("input:checkbox[id='men-filter']").prop('disabled', false);
        $("input:checkbox[id='men-filter']").parent().addClass("selected");
        $("input:checkbox[id='men-retrieval']").parent().addClass("selected");
        initial_filterCondition['psex'].push("men-filter");
      }
    }
  }
  if (sex_string == '') {
    $(".sex_filter input[type=checkbox]").addClass("checked");
    $(".sex_filter input[type=checkbox]").prop('checked', true);
    $(".sex_filter input[type=checkbox]").prop('disabled', false);
    initial_filterCondition['psex'].push("women-filter");
    initial_filterCondition['psex'].push("men-filter");
  }
  if (style_string != '') {
    $(".style_filter input[type=checkbox]").prop('disabled', true);
    var content = style_string.split("_");
    for (i = 0; i < content.length; i++) {
      if (content[i] + " " == "자유형 ") {
        $("input:checkbox[id='free-filter']").addClass("checked");
        $("input:checkbox[id='free-filter']").prop('checked', true);
        $("input:checkbox[id='free-filter']").prop('disabled', false);
        $("input:checkbox[id='free-filter']").parent().addClass("selected");
        $("input:checkbox[id='free-retrieval']").parent().addClass("selected");
        initial_filterCondition['style'].push("free-filter");
      } else if (content[i] + " " == "배영 ") {
        $("input:checkbox[id='backstroke-filter']").addClass("checked");
        $("input:checkbox[id='backstroke-filter']").prop('checked', true);
        $("input:checkbox[id='backstroke-filter']").prop('disabled', false);
        $("input:checkbox[id='backstroke-filter']").parent().addClass("selected");
        $("input:checkbox[id='backstroke-retrieval']").parent().addClass("selected");
        initial_filterCondition['style'].push("backstroke-filter");
      } else if (content[i] + " " == "평영 ") {
        $("input:checkbox[id='breaststroke-filter']").addClass("checked");
        $("input:checkbox[id='breaststroke-filter']").prop('checked', true);
        $("input:checkbox[id='breaststroke-filter']").prop('disabled', false);
        $("input:checkbox[id='breaststroke-filter']").parent().addClass("selected");
        $("input:checkbox[id='breaststroke-retrieval']").parent().addClass("selected");
        initial_filterCondition['style'].push("breaststroke-filter");
      } else if (content[i] + " " == "접영 ") {
        $("input:checkbox[id='butterfly-filter']").addClass("checked");
        $("input:checkbox[id='butterfly-filter']").prop('checked', true);
        $("input:checkbox[id='butterfly-filter']").prop('disabled', false);
        $("input:checkbox[id='butterfly-filter']").parent().addClass("selected");
        $("input:checkbox[id='butterfly-retrieval']").parent().addClass("selected");
        initial_filterCondition['style'].push("butterfly-filter");
      } else if (content[i] + " " == "개인혼영 ") {
        $("input:checkbox[id='individual_medley-filter']").addClass("checked");
        $("input:checkbox[id='individual_medley-filter']").prop('checked', true);
        $("input:checkbox[id='individual_medley-filter']").prop('disabled', false);
        $("input:checkbox[id='individual_medley-filter']").parent().addClass("selected");
        $("input:checkbox[id='individual_medley-retrieval']").parent().addClass("selected");
        initial_filterCondition['style'].push("individual_medley-filter");
      }
    }
  }
  if (style_string == '') {
    $(".style_filter input[type=checkbox]").addClass("checked");
    $(".style_filter input[type=checkbox]").prop('checked', true);
    $(".style_filter input[type=checkbox]").prop('disabled', false);
    initial_filterCondition['style'].push("free-filter");
    initial_filterCondition['style'].push("backstroke-filter");
    initial_filterCondition['style'].push("breaststroke-filter");
    initial_filterCondition['style'].push("butterfly-filter");
    initial_filterCondition['style'].push("individual_medley-filter");
  }
  if (distance_string != '') {
    $(".distance_filter input[type=checkbox]").prop('disabled', true);
    var content = distance_string.split("_");
    for (i = 0; i < content.length; i++) {
      content[i] = content[i].replace(/,/g, '');
      if (content[i] + " " == "25 ") {
        $("input:checkbox[id='25M-filter']").addClass("checked");
        $("input:checkbox[id='25M-filter']").prop('checked', true);
        $("input:checkbox[id='25M-filter']").prop('disabled', false);
        $("input:checkbox[id='25M-filter']").parent().addClass("selected");
        $("input:checkbox[id='25M-retrieval']").parent().addClass("selected");
        initial_filterCondition['distance'].push("25M-filter");
      } else if (content[i] + " " == "50 ") {
        $("input:checkbox[id='50M-filter']").addClass("checked");
        $("input:checkbox[id='50M-filter']").prop('checked', true);
        $("input:checkbox[id='50M-filter']").prop('disabled', false);
        $("input:checkbox[id='50M-filter']").parent().addClass("selected");
        $("input:checkbox[id='50M-retrieval']").parent().addClass("selected");
        initial_filterCondition['distance'].push("50M-filter");
      } else if (content[i] + " " == "100 ") {
        $("input:checkbox[id='100M-filter']").addClass("checked");
        $("input:checkbox[id='100M-filter']").prop('checked', true);
        $("input:checkbox[id='100M-filter']").prop('disabled', false);
        $("input:checkbox[id='100M-filter']").parent().addClass("selected");
        $("input:checkbox[id='100M-retrieval']").parent().addClass("selected");
        initial_filterCondition['distance'].push("100M-filter");
      } else if (content[i] + " " == "200 ") {
        $("input:checkbox[id='200M-filter']").addClass("checked");
        $("input:checkbox[id='200M-filter']").prop('checked', true);
        $("input:checkbox[id='200M-filter']").prop('disabled', false);
        $("input:checkbox[id='200M-filter']").parent().addClass("selected");
        $("input:checkbox[id='200M-retrieval']").parent().addClass("selected");
        initial_filterCondition['distance'].push("200M-filter");
      } else if (content[i] + " " == "400 ") {
        $("input:checkbox[id='400M-filter']").addClass("checked");
        $("input:checkbox[id='400M-filter']").prop('checked', true);
        $("input:checkbox[id='400M-filter']").prop('disabled', false);
        $("input:checkbox[id='400M-filter']").parent().addClass("selected");
        $("input:checkbox[id='400M-retrieval']").parent().addClass("selected");
        initial_filterCondition['distance'].push("400M-filter");
      } else if (content[i] + " " == "800 ") {
        $("input:checkbox[id='800M-filter']").addClass("checked");
        $("input:checkbox[id='800M-filter']").prop('checked', true);
        $("input:checkbox[id='800M-filter']").prop('disabled', false);
        $("input:checkbox[id='800M-filter']").parent().addClass("selected");
        $("input:checkbox[id='800M-retrieval']").parent().addClass("selected");
        initial_filterCondition['distance'].push("800M-filter");
      }
    }
  }
  if (distance_string == '') {
    $(".distance_filter input[type=checkbox]").addClass("checked");
    $(".distance_filter input[type=checkbox]").prop('checked', true);
    $(".distance_filter input[type=checkbox]").prop('disabled', false);
    initial_filterCondition['distance'].push("25M-filter");
    initial_filterCondition['distance'].push("50M-filter");
    initial_filterCondition['distance'].push("100M-filter");
    initial_filterCondition['distance'].push("200M-filter");
    initial_filterCondition['distance'].push("400M-filter");
    initial_filterCondition['distance'].push("800M-filter");
  }
  if (age_string != '') {
    $(".age_filter input[type=checkbox]").prop('disabled', true);
    content = age_string.split("_");
    for (i = 0; i < content.length; i++) {
      content[i] = content[i].replace(/,+$/, '');
      if (content[i] + " " == "0,19 ") {
        $("input:checkbox[id='0~19-filter']").addClass("checked");
        $("input:checkbox[id='0~19-filter']").prop('checked', true);
        $("input:checkbox[id='0~19-filter']").prop('disabled', false);
        $("input:checkbox[id='0~19-filter']").parent().addClass("selected");
        $("input:checkbox[id='0~19-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("0~19-filter");
      } else if (content[i] + " " == "20,24 ") {
        $("input:checkbox[id='20~24-filter']").addClass("checked");
        $("input:checkbox[id='20~24-filter']").prop('checked', true);
        $("input:checkbox[id='20~24-filter']").prop('disabled', false);
        $("input:checkbox[id='20~24-filter']").parent().addClass("selected");
        $("input:checkbox[id='20~24-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("20~24-filter");
      } else if (content[i] + " " == "25,29 ") {
        $("input:checkbox[id='25~29-filter']").addClass("checked");
        $("input:checkbox[id='25~29-filter']").prop('checked', true);
        $("input:checkbox[id='25~29-filter']").prop('disabled', false);
        $("input:checkbox[id='25~29-filter']").parent().addClass("selected");
        $("input:checkbox[id='25~29-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("25~29-filter");
      } else if (content[i] + " " == "30,34 ") {
        $("input:checkbox[id='30~34-filter']").addClass("checked");
        $("input:checkbox[id='30~34-filter']").prop('checked', true);
        $("input:checkbox[id='30~34-filter']").prop('disabled', false);
        $("input:checkbox[id='30~34-filter']").parent().addClass("selected");
        $("input:checkbox[id='30~34-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("30~34-filter");
      } else if (content[i] + " " == "35,39 ") {
        $("input:checkbox[id='35~39-filter']").addClass("checked");
        $("input:checkbox[id='35~39-filter']").prop('checked', true);
        $("input:checkbox[id='35~39-filter']").prop('disabled', false);
        $("input:checkbox[id='35~39-filter']").parent().addClass("selected");
        $("input:checkbox[id='35~39-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("35~39-filter");
      } else if (content[i] + " " == "40,44 ") {
        $("input:checkbox[id='40~44-filter']").addClass("checked");
        $("input:checkbox[id='40~44-filter']").prop('checked', true);
        $("input:checkbox[id='40~44-filter']").prop('disabled', false);
        $("input:checkbox[id='40~44-filter']").parent().addClass("selected");
        $("input:checkbox[id='40~44-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("40~44-filter");
      } else if (content[i] + " " == "45,49 ") {
        $("input:checkbox[id='45~49-filter']").addClass("checked");
        $("input:checkbox[id='45~49-filter']").prop('checked', true);
        $("input:checkbox[id='45~49-filter']").prop('disabled', false);
        $("input:checkbox[id='45~49-filter']").parent().addClass("selected");
        $("input:checkbox[id='45~49-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("45~49-filter");
      } else if (content[i] + " " == "50,54 ") {
        $("input:checkbox[id='50~54-filter']").addClass("checked");
        $("input:checkbox[id='50~54-filter']").prop('checked', true);
        $("input:checkbox[id='50~54-filter']").prop('disabled', false);
        $("input:checkbox[id='50~54-filter']").parent().addClass("selected");
        $("input:checkbox[id='50~54-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("50~54-filter");
      } else if (content[i] + " " == "55,59 ") {
        $("input:checkbox[id='55~59-filter']").addClass("checked");
        $("input:checkbox[id='55~59-filter']").prop('checked', true);
        $("input:checkbox[id='55~59-filter']").prop('disabled', false);
        $("input:checkbox[id='55~59-filter']").parent().addClass("selected");
        $("input:checkbox[id='55~59-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("55~59-filter");
      } else if (content[i] + " " == "60,64 ") {
        $("input:checkbox[id='60~64-filter']").addClass("checked");
        $("input:checkbox[id='60~64-filter']").prop('checked', true);
        $("input:checkbox[id='60~64-filter']").prop('disabled', false);
        $("input:checkbox[id='60~64-filter']").parent().addClass("selected");
        $("input:checkbox[id='60~64-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("60~64-filter");
      } else if (content[i] + " " == "65,69 ") {
        $("input:checkbox[id='65~69-filter']").addClass("checked");
        $("input:checkbox[id='65~69-filter']").prop('checked', true);
        $("input:checkbox[id='65~69-filter']").prop('disabled', false);
        $("input:checkbox[id='65~69-filter']").parent().addClass("selected");
        $("input:checkbox[id='65~69-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("65~69-filter");
      } else if (content[i] + " " == "70,110 ") {
        $("input:checkbox[id='70~110-filter']").addClass("checked");
        $("input:checkbox[id='70~110-filter']").prop('checked', true);
        $("input:checkbox[id='70~110-filter']").prop('disabled', false);
        $("input:checkbox[id='70~110-filter']").parent().addClass("selected");
        $("input:checkbox[id='70~110-retrieval']").parent().addClass("selected");
        initial_filterCondition['age'].push("70~110-filter");
      }
    }
  }
  if (age_string == '') {
    $(".age_filter input[type=checkbox]").addClass("checked");
    $(".age_filter input[type=checkbox]").prop('checked', true);
    $(".age_filter input[type=checkbox]").prop('disabled', false);
    initial_filterCondition['age'].push("0~19-filter");
    initial_filterCondition['age'].push("20~24-filter");
    initial_filterCondition['age'].push("25~29-filter");
    initial_filterCondition['age'].push("30~34-filter");
    initial_filterCondition['age'].push("35~39-filter");
    initial_filterCondition['age'].push("40~44-filter");
    initial_filterCondition['age'].push("45~49-filter");
    initial_filterCondition['age'].push("50~54-filter");
    initial_filterCondition['age'].push("55~59-filter");
    initial_filterCondition['age'].push("60~64-filter");
    initial_filterCondition['age'].push("65~69-filter");
    initial_filterCondition['age'].push("70~110-filter");
  }
  if (competitionName != '') {
    $('.competitionName').attr('value', competitionName + " ");
    $('.competitionName').prop('readOnly', true);
    initial_filterCondition['competitionName'] = competitionName;
  }
  if (teamName != '') {
    $('.teamName').attr('value', teamName + " ");
    $('.teamName').prop('readOnly', true);
    initial_filterCondition['teamName'] = teamName;
  }
  if (age_criteria == "대회당시") {
    $("#age_search_criteria[value='대회당시']").prop('checked', true);
    initial_filterCondition['age_criteria'] = 0;
  } else if (age_criteria == "현재나이") {
    $("#age_search_criteria[value='현재나이']").prop('checked', true);
    initial_filterCondition['age_criteria'] = 1;
  }
  // 값 없었을 때만 초기값 설정
  if (!(result_filterCondition.hasOwnProperty('pname'))) {
    $.extend(true, result_filterCondition, initial_filterCondition);
    $.extend(true, note_filterCondition, initial_filterCondition);
  }
}

//검색 조건에 맞는 데이터에 따른 테이블 만들기
function make_new_table_rows(obj_string, result_array, startNum) {
  obj_string = obj_string.replace("Table", "");
  var total_data_count = result_array.length;
  $("#" + obj_string + "-table").remove();
  table_tags = ""
  table_tags += "<table id='" + obj_string + "-table'><tbody>";
  // startIndex와 endIndex 설정
  var data_start_index;
  var data_end_index;
  data_start_index = (startNum - 1) * 50;
  data_end_index = (startNum * 50) - 1;
  // 마지막 페이지 데이터 개수가 50개 미만일 때
  if (data_end_index > total_data_count) {
    data_end_index = total_data_count;
  }
  for (var i = data_start_index; i < data_end_index; i++) {
    var table_array = result_array[i];
    t_row = " <tr class='added_row'>" +
      "<td class='retrieval_index' style='display: none'>" + table_array.index + "</td>" +
      "<td style='min-width: 35px;' class='table_checkbox'><input type='checkbox' id='selected_records'></td>" +
      "<td style='min-width: 55px;' class='table_pname'>" + table_array.pname +
      "</td><td style='min-width: 50px;' class='table_sex'>" + table_array.psex +
      "</td><td style='min-width: 165px;' class='table_age'>" + changeAgeForm(table_array.year, table_array.age_from, table_array.age_to) +
      "</td><td style='min-width: 55px;' class='table_style'>" + table_array.style +
      "</td><td style='min-width: 55px;' class='table_distance'>" + table_array.distance + 'm' +
      "</td><td style='min-width: 70px;' class='table_record'>" + changeRecordForm(table_array.record) +
      "</td><td style='min-width: 110px;' class='table_competitionDate'>" + table_array.year + '.' + table_array.month + '.' + changeDateForm(table_array.day) +
      "</td><td style='min-width: 80px;' class='table_competitionName'>" + table_array.mname +
      "</td><td style='min-width: 120px;' class='table_team'>" + table_array.team +
      "</td><td style='min-width: 80px;' class='table_remark'>" + table_array.remark +
      "</td></tr>";
    table_tags += t_row;
  }
  table_tags += "</tbody></table>";
  $("." + obj_string + "Table").append(table_tags);
}

// 인자로 받은 검색 조건에 따라 필터 조건 검색 입력 창 상태 변경하는 함수
function initialize_filterSidebar_state(obj) {
  // 이름
  if (obj['pname'] != '') {
    $("#name-filter").attr('value', name + "");
  }
  // 성별
  if (obj['psex'].length != 0) {
    $(".sex_filter input[type=checkbox]").removeClass("checked");
    $(".sex_filter input[type=checkbox]").prop("checked", false);
    $(".sex_filter input[type=checkbox]").parent().removeClass("selected");
    for (i = 0; i < obj['psex'].length; i++) {
      var content = obj['psex'][i];
      $("input:checkbox[id='" + content + "']").addClass("checked");
      $("input:checkbox[id='" + content + "']").prop("checked", true);
      $("input:checkbox[id='" + content + "']").parent().addClass("selected");
    }
  }
  if (obj['psex'].length == 0) {
    $(".sex_filter input[type=checkbox]").addClass("checked");
    $(".sex_filter input[type=checkbox]").prop('checked', false);
  }
  // 종목
  if (obj['style'].length != 0) {
    $(".style_filter input[type=checkbox]").removeClass("checked");
    $(".style_filter input[type=checkbox]").prop('checked', false);
    $(".style_filter input[type=checkbox]").parent().removeClass("selected");
    for (i = 0; i < obj['style'].length; i++) {
      var content = obj['style'][i];
      $("input:checkbox[id='" + content + "']").addClass("checked");
      $("input:checkbox[id='" + content + "']").prop('checked', true);
      $("input:checkbox[id='" + content + "']").parent().addClass("selected");
    }
  }
  if (obj['style'].length == 0) {
    $(".style_filter input[type=checkbox]").addClass("checked");
    $(".style_filter input[type=checkbox]").prop('checked', false);
  }
  // 거리
  if (obj['distance'].length != 0) {
    $(".distance_filter input[type=checkbox]").removeClass("checked");
    $(".distance_filter input[type=checkbox]").prop('checked', false);
    $(".distance_filter input[type=checkbox]").parent().removeClass("selected");
    for (i = 0; i < obj['distance'].length; i++) {
      var content = obj['distance'][i];
      $("input:checkbox[id='" + content + "']").addClass("checked");
      $("input:checkbox[id='" + content + "']").prop('checked', true);
      $("input:checkbox[id='" + content + "']").parent().addClass("selected");
    }
  }
  if (obj['distance'].length == 0) {
    $(".distance_filter input[type=checkbox]").addClass("checked");
    $(".distance_filter input[type=checkbox]").prop('checked', false);
  }
  // 나이
  if (obj['age'].length != 0) {
    $(".age_filter input[type=checkbox]").removeClass("checked");
    $(".age_filter input[type=checkbox]").prop('checked', false);
    $(".age_filter input[type=checkbox]").parent().removeClass("selected");
    for (i = 0; i < obj['age'].length; i++) {
      var content = obj['age'][i];
      $("input:checkbox[id='" + content + "']").addClass("checked");
      $("input:checkbox[id='" + content + "']").prop('checked', true);
      $("input:checkbox[id='" + content + "']").parent().addClass("selected");
    }
  }
  if (obj['age'].length == 0) {
    $(".age_filter input[type=checkbox]").addClass("checked");
    $(".age_filter input[type=checkbox]").prop('checked', false);
  }
  // 대회 이름
  if (obj['competitionName'] != '') {
    $('.competitionName').attr('value', obj['competitionName'] + " ");
  }
  // 소속 이름
  if (obj['teamName'] != '') {
    $('.teamName').attr('value', obj['teamName'] + " ");
  }
  if (obj['age_criteria'] == "대회당시") {
    $("#age_search_criteria[value='대회당시']").prop('checked', true);
  } else if (obj['age_criteria'] == "현재나이") {
    $("#age_search_criteria[value='현재나이']").prop('checked', true);
  }
}

// 필터, 정렬, 노트에 따라 테이블 색상 변경
function check_table_state_and_change_table_color() {
  // 결과 탭
  if ($(".fixed-table-wrapper:visible").hasClass("resultTable")) {
    // 탭 색 초기화
    $(".additionalFunctions_Block > div.table_mode_handler > div").css("background", "#e1e8ea");
    // 필터링인 경우
    if (response_temp.length < response.length) {
      $(".additionalFunctions_Block .current").css("background", "#0a3e62");
      $("#table_header > thead > tr > th").css("background", "#0a3e62");
    }
    // 필터링 없는 결과
    else if (response_temp.length == response.length) {
      $(".additionalFunctions_Block .current").css("background", "#1b94d2");
      $("#table_header > thead > tr > th").css("background", "#1b94d2");
    }
  }
  // 노트 탭
  else if ($(".fixed-table-wrapper:visible").hasClass("noteTable")) {
    // 탭 색 초기화
    $(".additionalFunctions_Block > div.table_mode_handler > div").css("background", "#e1e8ea");
    // 필터링인 경우
    if (all_notes[currentNote_num - 1][2].length < all_notes[currentNote_num - 1][1].length) {
      $(".additionalFunctions_Block .current").css("background", "#0a3e62");
      $("#table_header > thead > tr > th").css("background", "#0a3e62");
    }
    // 필터링 없는 노트
    else if (all_notes[currentNote_num - 1][2].length == all_notes[currentNote_num - 1][1].length) {
      $(".additionalFunctions_Block .current").css("background", "#ffc952");
      $("#table_header > thead > tr > th").css("background", "#ffc952");
    }
  }
}

// 검색 결과랑 노트 탭
// 버튼들도 바뀌어야 함
$(document).on("click ", ".table_mode_handler div", function() {
  var obj = $(this);
  // 검색 결과 화면
  if (obj.hasClass("table_ver")) {
    // 테이블 변경
    $(".resultTable").show();
    $(".noteTable").hide();
    // 결과 데이터 필터 체크박스 설정
    initialize_filterConditions_and_checkbox();
    initialize_filterSidebar_state(result_filterCondition);
    // 버튼 변경
    $(".save_records_to_note").show();
    $(".create_new_note").hide();
    $(".delete_records").hide();
    // 탭 변경
    $(".table_ver").addClass("current");
    $(".note_ver").removeClass("current");
    // 정렬에 대한 테이블 헤더 설정
    $("#table_header > thead > tr > th").removeClass("sortingCriteria_as");
    $("#table_header > thead > tr > th").removeClass("sortingCriteria_des");
    set_sortingExpression(resultTable_sortingCriteria);
    check_table_state_and_change_table_color();
    // 결과 화면 데이터 체크
    var tr_num = check_table_is_empty();
    if (tr_num > 0) {
      // 페이지 리스트 변경
      make_pageList_and_set_currentPage(response_temp);
      change_pageList($(".pageList_item.current").text() * 1);
    }
    // 현재 노트에 있는 데이터 결과 테이블에서 tr 처리
    set_savedTR_and_selectedTR();
  }
  // 노트 화면
  else {
    // 테이블 변경
    $(".resultTable").hide();
    $(".noteTable").show();
    // 노트 데이터 배열 초기화, 필터 조건 + 체크박스 초기화
    all_notes[currentNote_num - 1][2] = all_notes[currentNote_num - 1][1];
    $.extend(true, note_filterCondition, initial_filterCondition);
    initialize_filterConditions_and_checkbox();
    initialize_filterSidebar_state(note_filterCondition);
    // 버튼 변경
    $(".save_records_to_note").hide();
    $("#select_notes").show();
    $(".create_new_note").show();
    $(".delete_records").show();
    // 탭 변경
    $(".note_ver").addClass("current");
    $(".table_ver").removeClass("current");
    // 정렬에 대한 테이블 헤더 설정
    $("#table_header > thead > tr > th").removeClass("sortingCriteria_as");
    $("#table_header > thead > tr > th").removeClass("sortingCriteria_des");
    // 정렬 후 데이터 출력
    sort_table('note', all_notes[currentNote_num - 1][0]);
    make_new_table_rows('noteTable', all_notes[currentNote_num - 1][2], 1);
    check_table_state_and_change_table_color();
    // 노트 화면 데이터 체크
    var tr_num = check_table_is_empty();
    // 페이지 리스트 변경
    make_pageList_and_set_currentPage(all_notes[currentNote_num - 1][2]);
    change_pageList($(".pageList_item.current").text() * 1);
    $("#table_header > thead > tr > th.table_checkbox > input[type=checkbox]").prop("checked", false);
    $("#table_header > thead > tr > th.table_checkbox > input[type=checkbox]").prop("disabled", false);
  }
});

// record 필드 값 출력형식 설정하는 함수
function changeRecordForm(record) {
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
}

// competitionDate 필드의 date 값 출력형식 설정하는 함수
function changeDateForm(date) {
  var dateData = '';
  var secondDate_startIndex = date.indexOf('~');
  if (secondDate_startIndex != -1) {
    dateData = date.substr(0, secondDate_startIndex);
  } else {
    dateData = date;
  }
  return dateData;
}

// age 필드의 출력형식 설정하는 함수
function changeAgeForm(competitionYear, from, to) {
  var full_ageForm = '';
  var age_competition = from + '~' + to;
  var age_current = '';
  var currentYear = new Date().getFullYear();
  var gap = currentYear - parseInt(competitionYear);

  age_current = (parseInt(from) + gap) + '~' + (parseInt(to) + gap);
  full_ageForm = age_competition + ' (' + age_current + ')';

  return full_ageForm;
}


// 필터 검색 관련 이벤트
$(document).ready(function() {
  // 필터 검색 중 이름 검색 처리
  $("#name-filter").on("blur", function() {
    var current_ver = $(".fixed-table-wrapper:visible > table").attr("id");
    current_ver = current_ver.replace("-table", "");
    if (current_ver == "result") {
      result_filterCondition['pname'] = $(this).val();
    } else if (current_ver == "note") {
      note_filterCondition['pname'] = $(this).val();
    }
    filtering(current_ver);
  })
  // 필터 검색 중 대회명 검색 처리
  $(document).on("change", "#competitionName-filter", function() {
    var current_ver = $(".fixed-table-wrapper:visible > table").attr("id");
    current_ver = current_ver.replace("-table", "");
    if (current_ver == "result") {
      result_filterCondition['competitionName'] = $(this).val();
    } else if (current_ver == "note") {
      note_filterCondition['competitionName'] = $(this).val();
    }
    filtering(current_ver);
  })
  // 필터 검색 중 기간 검색 처리
  $(document).on("change", "#period_from-filter", function() {
    var current_ver = $(".fixed-table-wrapper:visible > table").attr("id");
    current_ver = current_ver.replace("-table", "");
    if (current_ver == "result") {
      result_filterCondition['competitionPeriod_from'] = $("#period_from-filter option:selected").val();
    } else if (current_ver == "note") {
      note_filterCondition['competitionPeriod_from'] = $("#period_from-filter option:selected").val();
    }
    filtering(current_ver);

  })
  $(document).on("change", "#period_to-filter", function() {
    var current_ver = $(".fixed-table-wrapper:visible > table").attr("id");
    current_ver = current_ver.replace("-table", "");
    if (current_ver == "result") {
      result_filterCondition['competitionPeriod_to'] = $("#period_to-filter option:selected").val();
    } else if (current_ver == "note") {
      note_filterCondition['competitionPeriod_to'] = $("#period_to-filter option:selected").val();
    }
    filtering(current_ver);
  })
  // 필터 검색 중 소속 검색 처리
  $(document).on("change", "#teamName-filter", function() {
    var current_ver = $(".fixed-table-wrapper:visible > table").attr("id");
    current_ver = current_ver.replace("-table", "");
    if (current_ver == "result") {
      result_filterCondition['teamName'] = $(this).val();
    } else if (current_ver == "note") {
      note_filterCondition['teamName'] = $(this).val();
    }
    filtering(current_ver);
  })
})

// 필터 검색 중 체크박스 처리 (필터 조건 생성(중복 허용), 필터 적용)
// 전체 or 초기화 추가(보류)
$(document).on("click", "#filter_sidebar input:checkbox", function() {
  var current_ver = $(".fixed-table-wrapper:visible > table").attr("id");
  current_ver = current_ver.replace("-table", "");
  var obj = $(this);
  var conditionObject = obj.parent().parent().parent().parent().parent().parent();
  // 필터 조건 추가
  if (!(obj.hasClass("checked"))) {
    obj.parent().addClass("selected");
    obj.addClass("checked");
    // 필터 검색 조건 값 전달
    if (conditionObject.attr('class') == "sex_filter") {
      if (obj.attr('id') == "all-filter") {
        var temp = obj.parent().parent().parent();
        temp.find('input').each(function() {
          // 필터 조건 갱신할 때 '전체'는 제외하고 모든 값 추가하기
          if ($(this).attr('id') != "all-filter") {
            $(this).addClass("checked");
            // 결과 테이블에서 필터링 시
            if (current_ver == 'result') {
              result_filterCondition['psex'].push($(this).attr('id'));
            }
            // 노트 테이블에서 필터링 시
            else if (current_ver == 'note') {
              note_filterCondition['psex'].push($(this).attr('id'));
            }
          }
        });
      } else {
        // 결과 테이블에서 필터링 시
        if (current_ver == 'result') {
          result_filterCondition['psex'].push(obj.attr('id'));
        }
        // 노트 테이블에서 필터링 시
        else if (current_ver == 'note') {
          note_filterCondition['psex'].push(obj.attr('id'));
        }
      }
    }
    if (conditionObject.attr('class') == "style_filter") {
      // 결과 테이블에서 필터링 시
      if (current_ver == 'result') {
        result_filterCondition['style'].push(obj.attr('id'));
      }
      // 노트 테이블에서 필터링 시
      else if (current_ver == 'note') {
        note_filterCondition['style'].push(obj.attr('id'));
      }
    }
    if (conditionObject.attr('class') == "distance_filter") {
      // 결과 테이블에서 필터링 시
      if (current_ver == 'result') {
        result_filterCondition['distance'].push(obj.attr('id'));
      }
      // 노트 테이블에서 필터링 시
      else if (current_ver == 'note') {
        note_filterCondition['distance'].push(obj.attr('id'));
      }
    }
    if (conditionObject.attr('class') == "age_filter") {
      // 결과 테이블에서 필터링 시
      if (current_ver == 'result') {
        result_filterCondition['age'].push(obj.attr('id'));
      }
      // 노트 테이블에서 필터링 시
      else if (current_ver == 'note') {
        note_filterCondition['age'].push(obj.attr('id'));
      }
    }
    filtering(current_ver);
    return false;
  }
  // 필터 조건 삭제
  else {
    if (conditionObject.find('input.checked').length >= 2) {
      obj.parent().removeClass("selected");
      obj.removeClass("checked");
      // 필터 검색 조건 값 삭제
      if (conditionObject.attr('class') == "sex_filter") {
        if (obj.attr('id') == "all-filter") {
          var temp = obj.parent().parent().parent();
          temp.find('input').each(function() {
            $(this).removeClass("checked");
            if (current_ver == 'result') {
              result_filterCondition['psex'].splice(result_filterCondition['psex'].indexOf($(this).attr('id')), 1);
            }
            // 노트 테이블에서 필터링 시
            else if (current_ver == 'note') {
              note_filterCondition['psex'].splice(note_filterCondition['psex'].indexOf($(this).attr('id')), 1);
            }
          });
        } else {
          if (current_ver == 'result') {
            result_filterCondition['psex'].splice(result_filterCondition['psex'].indexOf(obj.attr('id')), 1);
          }
          // 노트 테이블에서 필터링 시
          else if (current_ver == 'note') {
            note_filterCondition['psex'].splice(note_filterCondition['psex'].indexOf(obj.attr('id')), 1);
          }
        }
      }
      if (conditionObject.attr('class') == "style_filter") {
        if (current_ver == 'result') {
          result_filterCondition['style'].splice(result_filterCondition['style'].indexOf(obj.attr('id')), 1);
        }
        // 노트 테이블에서 필터링 시
        else if (current_ver == 'note') {
          note_filterCondition['style'].splice(note_filterCondition['style'].indexOf(obj.attr('id')), 1);
        }
      }
      if (conditionObject.attr('class') == "distance_filter") {
        if (current_ver == 'result') {
          result_filterCondition['distance'].splice(result_filterCondition['distance'].indexOf(obj.attr('id')), 1);
        }
        // 노트 테이블에서 필터링 시
        else if (current_ver == 'note') {
          note_filterCondition['distance'].splice(note_filterCondition['distance'].indexOf(obj.attr('id')), 1);
        }
      }
      if (conditionObject.attr('class') == "age_filter") {
        if (current_ver == 'result') {
          result_filterCondition['age'].splice(result_filterCondition['age'].indexOf(obj.attr('id')), 1);
        }
        // 노트 테이블에서 필터링 시
        else if (current_ver == 'note') {
          note_filterCondition['age'].splice(note_filterCondition['age'].indexOf(obj.attr('id')), 1);
        }
      }
      filtering(current_ver);
      return false;
    }
  }
});

// response에 필터조건을 적용해서 response_temp에 저장하는 함수
function filtering(mode) {
  var filtering_obj;
  var filterCondition_pname;
  var filterCondition_psex;
  var filterCondition_style;
  var filterCondition_distance;
  var filterCondition_age;
  var filterCondition_age_criteria;
  var filterCondition_competitionName;
  var filterCondition_competitionPeriod_from;
  var filterCondition_competitionPeriod_to;
  var filterCondition_teamName;
  // 결과 테이블에서 필터링 할 때 필터 관련 변수 설정
  if (mode == 'result') {
    filtering_obj = response;
    filterCondition_pname = result_filterCondition['pname'];
    filterCondition_psex = result_filterCondition['psex'];
    filterCondition_style = result_filterCondition['style'];
    filterCondition_distance = result_filterCondition['distance'];
    filterCondition_age = result_filterCondition['age'];
    filterCondition_age_criteria = result_filterCondition['age_criteria'];
    filterCondition_competitionName = result_filterCondition['competitionName'];
    filterCondition_competitionPeriod_from = result_filterCondition['competitionPeriod_from'];
    filterCondition_competitionPeriod_to = result_filterCondition['competitionPeriod_to'];
    filterCondition_teamName = result_filterCondition['teamName'];
  }
  // 노트 테이블에서 필터링 할 때 필터 관련 변수 설정
  else if (mode == 'note') {
    var filtering_obj = all_notes[currentNote_num - 1][1];
    filterCondition_pname = note_filterCondition['pname'];
    filterCondition_psex = note_filterCondition['psex'];
    filterCondition_style = note_filterCondition['style'];
    filterCondition_distance = note_filterCondition['distance'];
    filterCondition_age = note_filterCondition['age'];
    filterCondition_age_criteria = note_filterCondition['age_criteria'];
    filterCondition_competitionName = note_filterCondition['competitionName'];
    filterCondition_competitionPeriod_from = note_filterCondition['competitionPeriod_from'];
    filterCondition_competitionPeriod_to = note_filterCondition['competitionPeriod_to'];
    filterCondition_teamName = note_filterCondition['teamName'];
  }
  var filtered_data = new Array();
  // 필터링
  $.each(filtering_obj, function(index, item) {
    var temp = item;
    var tempValue;
    if ((filterCondition_pname != '') && (temp.hasOwnProperty('index'))) {
      if (temp.pname.match(filterCondition_pname) == null) {
        temp = {};
      }
    }
    if ((filterCondition_psex.length != 0) && (temp.hasOwnProperty('index'))) {
      var filtering_count = 0;
      for (var i = 0; i < filterCondition_psex.length; i++) {
        tempValue = filterCondition_psex[i].replace("-filter", "");
        tempValue = tempValue.replace("women", "여");
        tempValue = tempValue.replace("men", "남");
        if (temp.psex.match(tempValue) != null) {
          filtering_count += 1;
        }
      }
      if (filtering_count < 1) {
        temp = {};
      }
    }
    if ((filterCondition_style.length != 0) && (temp.hasOwnProperty('index'))) {
      var filtering_count = 0;
      for (var i = 0; i < filterCondition_style.length; i++) {
        tempValue = filterCondition_style[i].replace("-filter", "");
        tempValue = tempValue.replace("free", "자유형");
        tempValue = tempValue.replace("backstroke", "배영");
        tempValue = tempValue.replace("breaststroke", "평영");
        tempValue = tempValue.replace("butterfly", "접영");
        tempValue = tempValue.replace("individual_medley", "개인혼영");
        if (temp.style.match(tempValue) != null) {
          filtering_count += 1;
        }
      }
      if (filtering_count < 1) {
        temp = {};
      }
    }
    if ((filterCondition_distance.length != 0) && (temp.hasOwnProperty('index'))) {
      var filtering_count = 0;
      for (var i = 0; i < filterCondition_distance.length; i++) {
        tempValue = filterCondition_distance[i].replace("-filter", "");
        tempValue = tempValue.replace("M", "");
        if (temp.distance.match(tempValue) != null) {
          filtering_count += 1;
        }
        if (tempValue == "400") {
          if (temp.distance.match('800') != null) {
            filtering_count += 1;
          }
        }
      }
      if (filtering_count < 1) {
        temp = {};
      }
    }
    // filter_age 가 필터 조건이고, tdText 가 db검색 결과 데이터 값
    if ((filterCondition_age.length != 0) && (temp.hasOwnProperty('index'))) {
      var filtering_count = 0;
      var wavePoint, filter_age_to, filter_age_from, tdText, tdText_age_to, tdText_age_from;
      for (var i = 0; i < filterCondition_age.length; i++) {
        tempValue = filterCondition_age[i].replace("-filter", "");
        wavePoint = tempValue.indexOf("~");
        filter_age_from = tempValue.substring(0, wavePoint);
        filter_age_to = tempValue.substring(wavePoint + 1, tempValue.length);
        // 나이 검색이 현재인지, 대회당시인지
        if (filterCondition_age_criteria == 0) {
          tdText_age_from = temp.age_from;
          tdText_age_to = temp.age_to;
        } else {
          var currentYear = new Date().getFullYear();
          var gap = currentYear - parseInt(temp.year);
          tdText_age_from = temp.age_from + gap;
          tdText_age_to = temp.age_to + gap;
        }
        // 나이 검색
        if ((filter_age_from >= tdText_age_from) && (filter_age_from <= tdText_age_to)) {
          filtering_count += 1;
        } else if ((filter_age_to >= tdText_age_from) && (filter_age_to <= tdText_age_to)) {
          filtering_count += 1;
        } else if ((filter_age_from <= tdText_age_from) && (filter_age_to >= tdText_age_to)) {
          filtering_count += 1;
        } else if ((filter_age_to >= tdText_age_from) && (filter_age_to <= tdText_age_to)) {
          filtering_count += 1;
        }
      }
      if (filtering_count < 1) {
        temp = {};
      }
    }
    if ((filterCondition_competitionName != '') && (temp.hasOwnProperty('index'))) {
      if (temp.mname.match(filterCondition_competitionName) == null) {
        temp = {};
      }
    }
    if ((filterCondition_competitionPeriod_from != '') && (temp.hasOwnProperty('index'))) {
      var filtering_count = 0;
      var tempValue = parseInt(filterCondition_competitionPeriod_from);
      if (tempValue > parseInt(filterCondition_competitionPeriod_to)) {
        filterCondition_competitionPeriod_to = filterCondition_competitionPeriod_from;
      }
      var tempPeriod = parseInt(filterCondition_competitionPeriod_to) - parseInt(filterCondition_competitionPeriod_from);
      for (var i = 0; i <= tempPeriod; i++) {
        if (temp.year.match(String(tempValue))) {
          filtering_count += 1;
        }
        tempValue++;
      }
      if (filtering_count < 1) {
        temp = {};
      }
    }
    if ((filterCondition_teamName != '') && (temp.hasOwnProperty('index'))) {
      if (temp.team.match(filterCondition_teamName) == null) {
        temp = {};
      }
    }
    if (temp.hasOwnProperty('index')) {
      filtered_data.push(temp);
    }
  });
  // 결과 테이블에서 필터링 한 경우 결과 저장 및 출력
  if (mode == 'result') {
    response_temp = filtered_data;
    $(".pageList_item.current").removeClass("current");
    $(".pageList_item").eq(0).addClass("current");
    sort_table('result', resultTable_sortingCriteria);
    make_new_table_rows('resultTable', response_temp, 1);
    check_table_state_and_change_table_color();
    make_pageList_and_set_currentPage(response_temp);
    $("#ContentWrap").scrollTop(0);
    check_table_is_empty();
    set_savedTR_and_selectedTR();
  }
  // 노트 테이블에서 필터링 한 경우 결과 저장 및 출력
  else if (mode == 'note') {
    all_notes[currentNote_num - 1][2] = filtered_data;
    $(".pageList_item.current").removeClass("current");
    $(".pageList_item").eq(0).addClass("current");
    sort_table('note', all_notes[currentNote_num - 1][0]);
    make_new_table_rows('noteTable', all_notes[currentNote_num - 1][2], 1);
    check_table_state_and_change_table_color();
    make_pageList_and_set_currentPage(all_notes[currentNote_num - 1][2]);
    $("#ContentWrap").scrollTop(0);
    check_table_is_empty();
  }
}

//직접입력과 선택입력
function setselectedValue(selectedValue, objClass) {
  if (selectedValue != "직접입력") {
    $('.' + objClass).attr('value', selectedValue);
    $('.' + objClass).attr('readOnly', true);
  } else {
    $('.' + objClass).removeAttr('readOnly', false);
    $('.' + objClass).attr('value', "");
    $('.' + objClass).focus();
  }
};

// 필터 검색 초기화
$(document).on("click", ".reset_searchConditions_filter", function() {
  // 결과 필터 초기화
  if ($(".fixed-table-wrapper:visible").hasClass("resultTable")) {
    // 결과 필터 조건 변수 초기화
    response_temp = response;
    $.extend(true, result_filterCondition, initial_filterCondition);
    initialize_filterConditions_and_checkbox();
    initialize_filterSidebar_state(result_filterCondition);
    // 필터 초기화 해도 정렬은 살리기
    sort_table('result', resultTable_sortingCriteria);
    // 초기 검색 결과 테이블 출력
    make_pageList_and_set_currentPage(response_temp);
    make_new_table_rows('resultTable', response_temp, 1);
    check_table_state_and_change_table_color();
    check_table_is_empty();
    set_savedTR_and_selectedTR();
    $(".pageList_item.current").removeClass("current");
    $(".pageList_item").eq(0).addClass("current");
  }
  // 노트 필터 초기화
  else if ($(".fixed-table-wrapper:visible").hasClass("noteTable")) {
    // 노트 필터 조건 변수 초기화
    all_notes[currentNote_num - 1][2] = all_notes[currentNote_num - 1][1];
    $.extend(true, note_filterCondition, initial_filterCondition);
    initialize_filterConditions_and_checkbox();
    initialize_filterSidebar_state(note_filterCondition);
    // 정렬
    sort_table('note', all_notes[currentNote_num - 1][0]);
    // 초기 검색 결과 테이블 출력
    make_pageList_and_set_currentPage(all_notes[currentNote_num - 1][2]);
    make_new_table_rows('noteTable', all_notes[currentNote_num - 1][2], 1);
    check_table_state_and_change_table_color();
    check_table_is_empty();
    $(".pageList_item.current").removeClass("current");
    $(".pageList_item").eq(0).addClass("current");
  }
});

// 나이 검색 기준에 대한 플래그 저장하는 함수
$(document).on("click", "#age_search_criteria", function() {
  if ($(".fixed-table-wrapper:visible").hasClass("resultTable")) {
    if ($(this).val() == "대회당시") {
      result_filterCondition['age_criteria'] = "대회당시";
    } else if ($(this).val() == "현재나이") {
      result_filterCondition['age_criteria'] = "현재나이";
    }
  } else if ($(".fixed-table-wrapper:visible").hasClass("noteTable")) {
    if ($(this).val() == "대회당시") {
      note_filterCondition['age_criteria'] = "대회당시";
    } else if ($(this).val() == "현재나이") {
      note_filterCondition['age_criteria'] = "현재나이";
    }
  }
});


// mobile버전 메뉴 리스트 보기 접기
$(document).on("click ", ".mobileMenu", function() {
  var obj = $(this);
  if (obj.hasClass("mobileMenu_open")) {
    $("#mobileMenuList").show();
    return false;
  } else {
    $("#mobileMenuList").hide();
    return false;
  }
});

// 1220px 이하 화면에서 필터 접었다 펼치기
// 결과테이블 사이즈 및 위치 변경
$(document).on("click ", ".filter_sidebar_handler, .filter_sidebar_handler_expandBtn, .filter_sidebar_handler_hideBtn, .filter_sidebar_handler_expandBtn div, .filter_sidebar_handler_hideBtn div", function() {
  var obj = $(this);
  // 웹에서 필터 검색 창 열기
  if (obj.hasClass("web")) {
    if (obj.hasClass("expand")) {
      $(".filter_sidebar_handler.web").hide();
      $(".filter_sidebar_handler_expandBtn.web").hide();
      $(".filter_sidebar_handler_hideBtn.web").show();
      $("#filter_sidebar.web").show();
      $("#main-content_result").css('left', '375px');
      var main_content_width = window.innerWidth * 0.98 - 380;
      $("#main-content_result").css('width', main_content_width);
      $("#filter_sidebar.web").css('left', '0');
      return false;
    } else {
      $(".filter_sidebar_handler.web").show();
      $(".filter_sidebar_handler_expandBtn.web").show();
      $(".filter_sidebar_handler_hideBtn.web").hide();
      $("#filter_sidebar.web").hide();
      $("#main-content_result").css('left', '');
      $("#main-content_result").css('width', '90%');
      $("#filter_sidebar.web").css('left', '25px');
      return false;
    }
  }
  // 모바일에서 필터 검색 창 열기
  else {
    if (obj.hasClass("expand")) {
      $(".filter_sidebar_handler.expand.mobile").hide();
      $(".filter_sidebar_handler.hide.mobile").show();
      $(".filter_sidebar_handler_expandBtn.mobile").hide();
      $(".filter_sidebar_handler_hideBtn.mobile").show();
      $("#filter_sidebar.mobile").show();
      return false;
    } else {
      $(".filter_sidebar_handler.expand.mobile").show();
      $(".filter_sidebar_handler.hide.mobile").hide();
      $(".filter_sidebar_handler_expandBtn.mobile").show();
      $(".filter_sidebar_handler_hideBtn.mobile").hide();
      $("#filter_sidebar.mobile").hide();
      return false;
    }
  }
});

$(document).ready(function() {
  // 브라우저 창 resize 시 이벤트
  $(window).resize(function() {
    // 결과 테이블에 대한 css 작업 처리
    if ($(".fixed-table-wrapper").css("width") == $("#fixed-table-container").css("width")) {
      $(".fixed-table-wrapper").css("left", 0);
    }
    var window_width = window.innerWidth;
    // 주로 필터랑 결과 화면 관련 처리
    // js/jquery를 통해서 style 건들면 그 다음에 css 안 먹는 것 같음.
    /*웹*/
    if (window_width > 1220) {
      // 사이드바 열림/닫힘 상태와 관련없이 공통적으로 실행되어야 하는 부분
      // 필터
      $(".filter_sidebar_handler.web").hide();
      $(".filter_sidebar_handler_hideBtn.web").hide();
      $(".filter_sidebar_handler_expandBtn.web").hide();
      $(".filter_sidebar_handler.mobile").hide();
      $(".filter_sidebar_handler_expandBtn.mobile").hide();
      $(".filter_sidebar_handler_hideBtn.mobile").hide();
      $("#filter_sidebar.mobile").hide();
      $("#filter_sidebar.web").show();
      $("#filter_sidebar.web").css('left', '25px');
      // 결과 화면
      $("#main-content_result").css('left', '');
      if (window_width <= 1350) {
        $("#main-content_result").css('width', '70%');
      } else {
        $("#main-content_result").css('width', '72%');
      }
    }
    /*웹(필터 숨김)*/
    else if ((window_width <= 1220) && (window_width > 767)) {
      // 필터
      $(".filter_sidebar_handler.web").show();
      $(".filter_sidebar_handler_hideBtn.web").hide();
      $(".filter_sidebar_handler_expandBtn.web").show();
      $("#filter_sidebar.web").hide();
      $(".filter_sidebar_handler.mobile").hide();
      $(".filter_sidebar_handler_expandBtn.mobile").hide();
      $(".filter_sidebar_handler_hideBtn.mobile").hide();
      $("#filter_sidebar.mobile").hide();
      // 결과 화면
      $("#main-content_result").css('left', '');
      $("#main-content_result").css('width', '90%');
    }
    /*모바일*/
    else if (window_width <= 767) {
      // 필터
      $(".filter_sidebar_handler.web").hide();
      $(".filter_sidebar_handler_expandBtn.web").hide();
      $(".filter_sidebar_handler_hideBtn.web").hide();
      $("#filter_sidebar.web").hide();
      $(".filter_sidebar_handler.expand.mobile").show();
      $(".filter_sidebar_handler.hide.mobile").hide();
      $(".filter_sidebar_handler_expandBtn.mobile").show();
      $(".filter_sidebar_handler_hideBtn.mobile").hide();
      $("#filter_sidebar.mobile").hide();
      // 결과 화면
      $("#main-content_result").css('left', '');
      $("#main-content_result").css('width', '');
    }
  });
});

// 초기 검색 조건이 bar를 오버플로우하게 될 경우에만 더보기 버튼 출력
function display_searchConditions_handler() {
  var bar_height = $("#searchCondition_bar").css('height');
  bar_height = bar_height.replace("px", "");
  var searchConditions_height = $(".searchConditions").css('height');
  searchConditions_height = searchConditions_height.replace("px", "");
  if ((searchConditions_height * 1) > (bar_height * 1)) {
    $(".searchConditions_handler").show();
    $(".searchConditions_handler").removeClass("hide");
    $(".searchConditions_handler").addClass("expand");
    $(".searchConditions_expand").show();
    $(".searchConditions_hide").hide();
    return false;
  } else {
    $(".searchConditions_handler").hide();
    return false;
  }
}

var original_bar_height;
// 초기검색 더보기/접기
$(document).on("click ", ".searchConditions_handler", function() {
  var obj = $(this);
  if (obj.hasClass("expand")) {
    obj.removeClass("expand");
    obj.addClass("hide");
    $(".searchConditions_expand").hide();
    $(".searchConditions_hide").show();
    original_bar_height = $("#searchCondition_bar").css('height');
    original_bar_height = original_bar_height.replace("px", "");
    var searchConditions_height = $(".searchConditions").css('height');
    searchConditions_height = searchConditions_height.replace("px", "");
    $("#searchCondition_bar").css('height', (searchConditions_height * 1 + 5));
    return false;
  } else {
    obj.removeClass("hide");
    obj.addClass("expand");
    $(".searchConditions_hide").hide();
    $(".searchConditions_expand").show();
    $("#searchCondition_bar").css('height', (original_bar_height * 1));
    return false;
  }
});

// 기간 검색 옵션 조절
$(document).on("change", "#period_from-filter", function() {
  var val = $(this).val();
  if (val > $("#period_to-filter").val()) {
    $("#period_to-filter").val(val);
  }
  $("#period_to-filter option").each(function() {
    var temp = $(this).val();
    if (temp < val) {
      $('#period_to-filter option[value=' + temp + ']').prop('disabled', true);
      $('#period_to-filter option[value=' + temp + ']').css("background-color", "#cfd1d2");
    } else {
      $('#period_to-filter option[value=' + temp + ']').prop('disabled', false);
      $('#period_to-filter option[value=' + temp + ']').css("background-color", "white");
    }
  });
});

// 헤더 고정이 잘 안돼서 스크롤에 따라서 같이 움직이게끔 하려고 함
$(document).ready(function() {
  $("#fixed-table-container").scroll(function() {
    $(".fixed-table-wrapper").scrollLeft($("#fixed-table-container").scrollLeft());
    var margin_left = $("#fixed-table-container").scrollLeft();
    $(".fixed-table-wrapper").css("left", margin_left);
  });
});

function check_table_is_empty() {
  var tr_num = $(".fixed-table-wrapper:visible > table > tbody > tr").length;
  if (tr_num > 0) {
    $(".fixed-table-wrapper:visible .empty_table_message").hide();
  } else {
    $(".fixed-table-wrapper:visible .empty_table_message").show();
  }
  return tr_num;
}

/* 노트 기능*/
// 결과테이블에서 선택된 데이터에 selected_tr 클래스 추가
$(document).on("click ", ".resultTable input[type=checkbox], .noteTable input[type=checkbox]", function() {
  var obj = $(this);
  handle_selected_tr(obj);
  check_all_tr_selected_or_saved();
});

function handle_selected_tr(obj) {
  var selected_temp = new Array();
  // selected_tr 클래스 처리
  if (obj.parent().parent().hasClass("selected_tr")) {
    obj.parent().parent().removeClass("selected_tr");
  } else {
    obj.parent().parent().addClass("selected_tr");
  }
  var current_ver = $(".fixed-table-wrapper:visible > table").attr("id");
  current_ver = current_ver.replace("-table", "");
  // 선택된 tr 저장
  $("." + current_ver + "Table .selected_tr").each(function(i) {
    var index = $(this).children('td.retrieval_index').text();
    selected_temp.push(response[index]);
  });
  // 결과 테이블, 노트 테이블 따로
  if (current_ver == "result") {
    selected_but_not_saved_tr = new Array();
    selected_but_not_saved_tr = selected_but_not_saved_tr.concat(selected_temp);
  } else if (current_ver == "note") {
    selected_tr_from_note = new Array();
    selected_tr_from_note = selected_tr_from_note.concat(selected_temp);
  }
}

// 노트에 기록 추가하는 버튼 클릭 이벤트
// 기록 담기 누르는 것과 동시에 선택되었던 tr selected_tr 클래스 없애고 disabled 상태로 바꿔놓기
$(document).on("click ", ".save_records_to_note", function() {
  var note_temp = new Array();
  $(".resultTable .selected_tr").each(function(i) {
    var obj = $(this);
    var index = obj.children('td.retrieval_index').text();
    // 선택된 행 값 가져와서 all_notes[num]에 추가
    note_temp.push(response[index]);
    // 선택된 행 클래스 처리
    obj.removeClass("selected_tr");
    obj.addClass("saved_tr");
    obj.find("input[type='checkbox']").prop('disabled', true);
  });
  // selected_but_not_saved_tr 배열 초기화
  selected_but_not_saved_tr = new Array();
  // 노트 데이터 처리(원본)
  all_notes[currentNote_num - 1][1] = all_notes[currentNote_num - 1][1].concat(note_temp);
  // 노트 데이터 처리(복사본)
  all_notes[currentNote_num - 1][2] = all_notes[currentNote_num - 1][2].concat(note_temp);
  console.log("모든 노트: ");
  console.log(all_notes);
});

function set_savedTR_and_selectedTR() {
  $("#result-table > tbody > tr.selected_tr").removeClass("selected_tr");
  $("#result-table > tbody > tr.saved_tr").find("input[type='checkbox']").prop('checked', false);
  $("#result-table > tbody > tr.saved_tr").find("input[type='checkbox']").prop('disabled', false);
  $("#result-table > tbody > tr.saved_tr").removeClass("saved_tr");
  // all_notes[currentNote_num]에 저장되어 있는 tr은 saved 클래스 추가 + disabled 처리
  $("#result-table > tbody").find('tr').each(function(index, item_result) {
    var tr_index = $(item_result).children(".retrieval_index").text();
    for (var i in all_notes[currentNote_num - 1][1]) {
      var saved_tr_index = all_notes[currentNote_num - 1][1][i].index;
      if (tr_index == saved_tr_index) {
        $(item_result).addClass("saved_tr");
        $(item_result).find("input[type='checkbox']").prop('checked', true);
        $(item_result).find("input[type='checkbox']").prop('disabled', true);
      }
    }
  });
  // selected_but_not_saved_tr에 저장되어 있는 tr은 selected 클래스 추가
  $("#result-table > tbody").find('tr').each(function(index, item_result) {
    var tr_index = $(item_result).children(".retrieval_index").text();
    for (var i in selected_but_not_saved_tr) {
      var selected_tr_index = selected_but_not_saved_tr[i].index;
      if (tr_index == selected_tr_index) {
        $(item_result).addClass("selected_tr");
        $(item_result).find("input[type='checkbox']").prop('checked', true);
      }
    }
  });
  check_all_tr_selected_or_saved();
}

// 테이블 내의 모든 tr들이 선택되었거나 저장된 것들이라면 헤더의 선택 체크박스도 체크 표시해줘야 함
function check_all_tr_selected_or_saved() {
  var current_ver = $(".fixed-table-wrapper:visible > table").attr("id");
  current_ver = current_ver.replace("-table", "");
  var disabled_flag = true;
  var checked_flag = true;
  $("#" + current_ver + "-table > tbody").find('tr').each(function(index, item_result) {
    // 한 tr이라도 selected_tr / save_tr 클래스가 있지 않은 것이 있다면 false 반환
    if (!($(item_result).hasClass("selected_tr")) && !($(item_result).hasClass("saved_tr"))) {
      checked_flag = false;
    }
    if (!($(item_result).hasClass("saved_tr"))) {
      disabled_flag = false;
    }
  });
  if (checked_flag == true) {
    $("#table_header > thead > tr > th.table_checkbox > input[type=checkbox]").prop("checked", true);
  } else if (checked_flag == false) {
    $("#table_header > thead > tr > th.table_checkbox > input[type=checkbox]").prop("checked", false);
  }
  if (disabled_flag == true) {
    $("#table_header > thead > tr > th.table_checkbox > input[type=checkbox]").prop("disabled", true);
  } else if (disabled_flag == false) {
    $("#table_header > thead > tr > th.table_checkbox > input[type=checkbox]").prop("disabled", false);
  }
  return checked_flag;
}

// 새 노트 생성
$(document).on("click ", ".create_new_note", function() {
  var prev_index = all_notes.length;
  new_index = prev_index * 1 + 1;
  // select에 option 추가
  $("select#select_notes").append("<option value='" + new_index + "'>노트" + new_index + "</option>");
  // currentNote_num 갱신
  currentNote_num = new_index;
  // all_notes 갱신
  all_notes[currentNote_num - 1] = new Array();
  all_notes[currentNote_num - 1].push(noteTable_sortingCriteria);
  all_notes[currentNote_num - 1][1] = new Array();
  all_notes[currentNote_num - 1][2] = new Array();
  // 새 노트로 자동 화면 변환해주기
  change_notes(currentNote_num);
  make_pageList_and_set_currentPage(all_notes[currentNote_num - 1][2]);
  change_pageList($(".pageList_item.current").text() * 1);
});

// 노트 선택
$(document).on("change", "#select_notes", function() {
  var selected_notes_index = $("#select_notes").val();
  currentNote_num = selected_notes_index;
  change_notes(currentNote_num);
  make_pageList_and_set_currentPage(all_notes[currentNote_num - 1][2]);
  // result가 아니라 note 버전일 때만 실행
  if ($(".fixed-table-wrapper:visible").hasClass("noteTable")) {
    change_pageList($(".pageList_item.current").text() * 1);
  }
  // note가 아니라 result 버전일 때만 실행
  else if ($(".fixed-table-wrapper:visible").hasClass("resultTable")) {
    set_savedTR_and_selectedTR();
  }
});

// 노트 화면 전환될 때마다 노트 데이터 배열, 노트 필터 검색, 노트필터창 초기화
function change_notes(index) {
  make_new_table_rows('noteTable', all_notes[currentNote_num - 1][2], 1);
  check_table_state_and_change_table_color();
  check_table_is_empty();
  $("select#select_notes").val(index);
  all_notes[currentNote_num - 1][2] = all_notes[currentNote_num - 1][1];
  $.extend(true, note_filterCondition, initial_filterCondition);
  initialize_filterConditions_and_checkbox();
  initialize_filterSidebar_state(note_filterCondition);
  selected_tr_from_note = new Array();
  $("#table_header > thead > tr > th.table_checkbox > input[type=checkbox]").prop("checked", false);
  $("#table_header > thead > tr > th.table_checkbox > input[type=checkbox]").prop("disabled", false);
}

// 테이블 기록 전체 선택
$(document).on("click ", "#table_header > thead > tr > th.table_checkbox > input[type=checkbox]", function() {
  var current_ver = $(".fixed-table-wrapper:visible > table").attr("id");
  current_ver = current_ver.replace("-table", "");
  var select_all_flag = check_all_tr_selected_or_saved();
  if (select_all_flag == false) {
    // 선택된 tr 저장
    $("." + current_ver + "Table .added_row").each(function(i) {
      var obj_tr = $(this);
      if (!(obj_tr.hasClass("saved_tr")) && !(obj_tr.hasClass("selected_tr"))) {
        var obj_td = obj_tr.find("input[type=checkbox]");
        obj_td.prop("checked", true);
        handle_selected_tr(obj_td);
      }
    });
    $("#table_header > thead > tr > th.table_checkbox > input[type=checkbox]").prop("checked", true);
  } else if (select_all_flag == true) {
    // 선택된 tr 저장
    $("." + current_ver + "Table .added_row").each(function(i) {
      var obj_tr = $(this);
      var obj_td = obj_tr.find("input[type=checkbox]");
      obj_td.prop("checked", false);
      handle_selected_tr(obj_td);
      selected_tr_from_note = new Array();
    });
    $("#table_header > thead > tr > th.table_checkbox > input[type=checkbox]").prop("checked", false);
    set_savedTR_and_selectedTR();
  }
})

// 노트 삭제
$(document).on("click ", ".delete_records", function() {
  var temp = new Array();
  for (var i in selected_tr_from_note){
    const idx = all_notes[currentNote_num - 1][1].findIndex(function(item){
      return item.index == selected_tr_from_note[i].index;
    })
    if (idx > -1){
      all_notes[currentNote_num - 1][1].splice(idx, 1);
    }
  }
  change_notes(currentNote_num);
});

//브라우저 닫을 때 노트 로컬스토리지에 저장
window.addEventListener("beforeunload", function() {
  //localStorage.setItem("notes", all_notes);
});


/*정렬 기능*/
// 테이블 헤더 클릭 이벤트 : 정렬 수행
// 정렬 수행 후 페이지리스트 갱신해줘야함
$(document).on("click ", "#table_header thead tr th", function() {
  var obj = $(this);
  if (!(obj.hasClass("table_checkbox"))) {
    $("#table_header > thead > tr > th").removeClass("sortingCriteria_as");
    $("#table_header > thead > tr > th").removeClass("sortingCriteria_des");
    var criteria_temp = $(this).attr("class");
    criteria_temp = criteria_temp.replace("table_", "");
    if ($(".fixed-table-wrapper:visible > table > tbody > tr").length >= 2) {
      // 결과 테이블 정렬
      if ($(".fixed-table-wrapper:visible").hasClass("resultTable")) {
        set_sortingCriteria(resultTable_sortingCriteria, criteria_temp);
        sort_table('result', resultTable_sortingCriteria);
        make_new_table_rows('resultTable', response_temp, 1);
        check_table_state_and_change_table_color();
        make_pageList_and_set_currentPage(response_temp);
        set_savedTR_and_selectedTR();
      }
      // 노트 테이블 정렬
      else if ($(".fixed-table-wrapper:visible").hasClass("noteTable")) {
        set_sortingCriteria(all_notes[currentNote_num - 1][0], criteria_temp);
        sort_table('note', all_notes[currentNote_num - 1][0]);
        make_new_table_rows('noteTable', all_notes[currentNote_num - 1][2], 1);
        check_table_state_and_change_table_color();
        make_pageList_and_set_currentPage(all_notes[currentNote_num - 1][2]);
      }
      change_pageList(1);
    }
  }
})

// 정렬 기준 표시 갱신
function set_sortingExpression(obj) {
  var sortingCriteria = obj['criteria'];
  sortingCriteria = 'table_' + sortingCriteria;
  var sorting_table_header = $("#table_header > thead > tr > th." + sortingCriteria);
  if (obj['mode'] == 0) {
    sorting_table_header.addClass("sortingCriteria_as");
  } else if (obj['mode'] == 1) {
    sorting_table_header.addClass("sortingCriteria_des");
  }
}

// 정렬 기능 수행
function sort_table(obj, sort) {
  set_sortingExpression(sort);
  if (obj == 'result') {
    if (sort['mode'] == 0) {
      sort_table_ascending(response_temp, sort['criteria']);
    } else if (sort['mode'] == 1) {
      sort_table_descending(response_temp, sort['criteria']);
    }
  } else if (obj == 'note') {
    if (sort['mode'] == 0) {
      sort_table_ascending(all_notes[currentNote_num - 1][2], sort['criteria']);
    } else if (sort['mode'] == 1) {
      sort_table_descending(all_notes[currentNote_num - 1][2], sort['criteria']);
    }
  }
}

// 정렬 기준 갱신
function set_sortingCriteria(obj, criteria) {
  if (obj['criteria'] != criteria) {
    obj['criteria'] = criteria;
    obj['mode'] = 0;
  } else {
    if (obj['mode'] == 0) {
      obj['mode'] = 1;
      return false;
    } else if (obj['mode'] == 1) {
      obj['mode'] = 0;
      return false;
    }
  }
}

// 내림차순
function sort_table_descending(obj, criteria) {
  switch (criteria) {
    // 숫자 (나이, 거리, 기록, 대회일시)
    case 'age':
      obj.sort(function(a, b) {
        return parseFloat(b['age_from']) - parseFloat(a['age_from']);
      });
      break;
    case 'distance':
      obj.sort(function(a, b) {
        return parseFloat(b['distance']) - parseFloat(a['distance']);
      });
      break;
    case 'record':
      obj.sort(function(a, b) {
        return parseFloat(b['record']) - parseFloat(a['record']);
      });
      break;
    case 'competitionDate':
      obj.sort(function(a, b) {
        if (parseFloat(a['year']) == parseFloat(b['year'])) {
          if (parseFloat(a['month']) == parseFloat(b['month'])) {
            return parseFloat(changeDateForm(b['day'])) - parseFloat(changeDateForm(a['day']));
          } else {
            return parseFloat(b['month']) - parseFloat(a['month']);
          }
        } else {
          return parseFloat(b['year']) - parseFloat(a['year']);
        }
      });
      break;
      // 문자 (이름, 성별, 종목, 대회명, 소속, 비고)
    case 'pname':
      obj.sort(function(a, b) {
        return a['pname'] > b['pname'] ? -1 : a['pname'] < b['pname'] ? 1 : 0;
      })
      break;
    case 'sex':
      obj.sort(function(a, b) {
        return a['psex'] > b['psex'] ? -1 : a['psex'] < b['psex'] ? 1 : 0;
      })
      break;
    case 'style':
      obj.sort(function(a, b) {
        return a['style'] > b['style'] ? -1 : a['style'] < b['style'] ? 1 : 0;
      })
      break;
    case 'competitionName':
      obj.sort(function(a, b) {
        return a['mname'] > b['mname'] ? -1 : a['mname'] < b['mname'] ? 1 : 0;
      })
      break;
    case 'team':
      obj.sort(function(a, b) {
        return a['team'] > b['team'] ? -1 : a['team'] < b['team'] ? 1 : 0;
      })
      break;
    case 'remark':
      obj.sort(function(a, b) {
        return a['remark'] > b['remark'] ? -1 : a['remark'] < b['remark'] ? 1 : 0;
      })
      break;
  }
}

// 오름차순
function sort_table_ascending(obj, criteria) {
  switch (criteria) {
    // 숫자 (나이, 거리, 기록, 대회일시)
    case 'age':
      obj.sort(function(a, b) {
        return parseFloat(a['age_from']) - parseFloat(b['age_from']);
      });
      break;
    case 'distance':
      obj.sort(function(a, b) {
        return parseFloat(a['distance']) - parseFloat(b['distance']);
      });
      break;
    case 'record':
      obj.sort(function(a, b) {
        return parseFloat(a['record']) - parseFloat(b['record']);
      });
      break;
    case 'competitionDate':
      obj.sort(function(a, b) {
        if (parseFloat(a['year']) == parseFloat(b['year'])) {
          if (parseFloat(a['month']) == parseFloat(b['month'])) {
            return parseFloat(changeDateForm(a['day'])) - parseFloat(changeDateForm(b['day']));
          } else {
            return parseFloat(a['month']) - parseFloat(b['month']);
          }
        } else {
          return parseFloat(a['year']) - parseFloat(b['year']);
        }
      });
      break;
      // 문자 (이름, 성별, 종목, 대회명, 소속, 비고)
    case 'pname':
      obj.sort(function(a, b) {
        return a['pname'] < b['pname'] ? -1 : a['pname'] > b['pname'] ? 1 : 0;
      })
      break;
    case 'sex':
      obj.sort(function(a, b) {
        return a['psex'] < b['psex'] ? -1 : a['psex'] > b['psex'] ? 1 : 0;
      })
      break;
    case 'style':
      obj.sort(function(a, b) {
        return a['style'] < b['style'] ? -1 : a['style'] > b['style'] ? 1 : 0;
      })
      break;
    case 'competitionName':
      obj.sort(function(a, b) {
        return a['mname'] < b['mname'] ? -1 : a['mname'] > b['mname'] ? 1 : 0;
      })
      break;
    case 'team':
      obj.sort(function(a, b) {
        return a['team'] < b['team'] ? -1 : a['team'] > b['team'] ? 1 : 0;
      })
      break;
    case 'remark':
      obj.sort(function(a, b) {
        return a['remark'] < b['remark'] ? -1 : a['remark'] > b['remark'] ? 1 : 0;
      })
      break;
  }
}

// 아직 완성되지 않은 서비스 사용 막아놓기
$(document).on("click ", ".inaccessible_service", function() {
  var obj = $(this);
  alert("아직 사용하실 수 없는 서비스입니다.");
});


/*초기 검색 기능 관련 함수*/
// 초기 검색 조건 상태 바 클릭하면 초기 검색 창 show/hide
$(document).on("click", "#viewSearchConditions", function(){
  if ($(".retrievalSearch_window").is(":visible")){
    $(".retrievalSearch_window").hide();
    return false;
  } else {
    $(".retrievalSearch_window").show();
    return false;
  }
})

// 초기 검색 창으로 돌아가기 (+ 이전에 검색했던 조건들을 검색창 위 또는 옆에 표시해줘야 함)
$(document).on("click", ".return_to_retrievalSearchPage", function() {
  uriString = "swimforever2_test.html?" + name + ":" + sex_string + ":" + style_string + ":" +
    distance_string + ":" + age_string + ":" + competitionName + ":" + period_from + ":" + period_to + ":" + teamName;
  // 검색 결과 html로 이동 및 변수 전달
  window.location.href = encodeURI(uriString);
});

// 검색 조건 더보기
$(document).on("click ", ".more_or_hide", function() {
  var obj = $(this);
  if (obj.hasClass("moreOptions_Button")) {
    obj.hide();
    $(".detailSearchOptions").show();
    obj.next().show();
    obj.next().css('display', 'inline-block');
    return false;
  } else {
    obj.hide();
    $(".detailSearchOptions").hide();
    obj.prev().show();
    obj.prev().css('display', 'inline-block');
    return false;
  }
})

// 검색 조건 전체 해제
$(document).on("click ", ".reset_searchConditions", function(){
  $("#name-retrieval").val("");
  $(".selected").removeClass("selected");
  $(".competitionName").attr('value', "");
  $(".competitionName").removeAttr('readonly', false);
  $(".competitionName").children('select').find('option:first').attr('selected', 'selected');
  $("#period_from").find('option:first').attr('selected', 'selected');
  $("#period_to").find('option:first').attr('selected', 'selected');
  $(".teamName").attr('value', "");
  $(".teamName").removeAttr('readonly', false);
  $(".teamName").children('select').find('option:first').attr('selected', 'selected');
})

// 체크박스 선택시 해당 요소 클래스에 selected 추가 및 해제 & 체크박스 값 체크 설정
// 모바일 웹에서 버튼 해제 css 적용이 바로 이루어지지 않아 이벤트 처리해줌(여전히 버벅거림)
$(document).on("click ", ".option", function() {
  var obj = $(this);
  if (!(obj.hasClass("selected"))) {
    obj.addClass("selected");
    return false;
  } else {
    obj.removeClass("selected");
    obj.parent().prev().find(".all-retrieval").removeClass("selected");
    return false;
  }
});

// 체크박스 각 항목당 전체선택/전체해제 옵션 처리
// 모바일 웹에서 버튼 해제 css 적용이 바로 이루어지지 않아 이벤트 처리해줌(여전히 버벅거림)
$(document).on("click ", ".all-retrieval", function(){
  var obj = $(this);
  if (!(obj.hasClass("selected"))) {
    obj.addClass("selected");
    obj.parent().parent().next().children('span').addClass("selected");
    return false;
  } else {
    obj.removeClass("selected");
    obj.parent().parent().next().children('span').removeClass("selected");
    return false;
  }
})

// 사용자로부터 입력받은 검색 조건 각 변수에 저장 (중복선택 지원하는 항목)
function save_SearchConditions(values, category) {
  var conditions = '';
  var string = '';
  values.each(function() {
    if ($(this).hasClass(category)) {
      if ($(this).children('input').attr('id') != "all-retrieval"){
        string += $(this).children('input').val();
        string += '_';
      }
      if ($(this).children('input').attr('id') == "400M-retrieval"){
        string += "800";
        string += '_';
      }
    }
  })
  return string;
}

// 사용자로부터 입력받은 검색 조건 각 변수에 저장 (전체)
function save_All_SearchConditions() {
  var searchConditions = $(".selected");

  name = $("#name-retrieval").val();
  if ($(".sex").hasClass("selected")) {
    sex_string = save_SearchConditions(searchConditions, "sex");
  }
  if ($(".style").hasClass("selected")) {
    style_string = save_SearchConditions(searchConditions, "style");
  }
  if ($(".distance").hasClass("selected")) {
    distance_string = save_SearchConditions(searchConditions, "distance");
  }
  if ($(".age").hasClass("selected")) {
    age_string = save_SearchConditions(searchConditions, "age");
  }
  competitionName = $(".competitionName").children('input').val();
  period_from = $("#period_from option:selected").val();
  period_to = $("#period_to option:selected").val();
  teamName = $(".teamName").children('input').val();
  uriString = "swimforever2_test2.html?" + name + ":" + sex_string + ":" + style_string + ":" +
    distance_string + ":" + age_string + ":" + competitionName + ":" + period_from + ":" + period_to + ":" + teamName + ":" + age_criteria;
}

// 나이 검색 기준에 대한 플래그 저장하는 함수
$(document).on("click ", "#age_search_criteria", function(){
  if ($(this).val() == "대회당시"){
    age_criteria = "대회당시";
  } else if ($(this).val() == "현재나이"){
    age_criteria = "현재나이";
  }
})


// 검색 결과 페이지로 이동 및 변수 전달
$(document).on("click ", "#retrievalSearch_Button", function() {
    // 다시 통합검색 할 때를 위한 검색 조건 초기화 작업
    name = '';
    sex_string = '';
    style_string = '';
    distance_string = '';
    age_string = '';
    competitionName = '';
    period_to;
    period_from;
    teamName = '';
    save_All_SearchConditions();
    // 검색 결과 html로 이동 및 변수 전달
    window.location.href = encodeURI(uriString);
});

$(document).keydown(function(key){
  if (key.keyCode == 13){
      // 다시 통합검색 할 때를 위한 검색 조건 초기화 작업
      name = '';
      sex_string = '';
      style_string = '';
      distance_string = '';
      age_string = '';
      competitionName = '';
      period_to;
      period_from;
      teamName = '';
      save_All_SearchConditions();
  }
});
