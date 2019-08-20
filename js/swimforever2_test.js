// mobile버전 메뉴 리스트 보기 접기
$(document).on("click ", ".mobileMenu", function(){
  var obj = $(this);
  if (obj.hasClass("mobileMenu_open")){
    $("#mobileMenuList").show();
    return false;
  } else {
    $("#mobileMenuList").hide();
    return false;
  }
})

// 조건 검색 추가 플래그
var searchConditions_expanded = 0;

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

// 아직 완성되지 않은 서비스 사용 막아놓기
$(document).on("click ", ".inaccessible_service", function(){
  var obj = $(this);
  alert("아직 사용하실 수 없는 서비스입니다.");
})

/*사용자가 입력한 검색 조건 처리*/
var name = '';
var sex_string = '';
var style_string = '';
var distance_string = '';
var age_string = '';
var competitionName = '';
var period_to;
var period_from;
var teamName = '';
var age_criteria = "대회당시";
var uriString = '';

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




/*
//div 옆으로 넘기기
$(document).on("click", ".slideButton", function() {
  var obj = $(this);
  var currentPage = $('.prediction_result.current');
  var currentIndex = parseInt(currentPage.attr('id'));
  // 이전 결과 페이지로
  if (obj.hasClass('prev')) {
    var nextIndex = "#" + (currentIndex - 1);
    if ($(nextIndex).length) {
      currentPage.hide();
      $(nextIndex).show();
      currentPage.removeClass("current");
      $(nextIndex).addClass("current");
      return false;
    } else {
      alert("처음입니다!");
      return false;
    }
    return false;
  }
  // 다음 결과 페이지로
  else {
    var nextIndex = "#" + (currentIndex + 1);
    if ($(nextIndex).length) {
      currentPage.hide();
      $(nextIndex).show();
      currentPage.removeClass("current");
      $(nextIndex).addClass("current");
      return false;
    } else {
      alert("마지막입니다!");
      return false;
    }
    return false;
  }
  return false;
})

// 필터 검색에서 초기 검색으로 돌아왔을 때
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
// 페이지 로드 시 실행되는 명령
$(window).load(function() {
  $("#searchCondition_bar_WhiteVer").show();
  make_searchCondition_bar_content();
})

// searchCondition_bar 내용 동적으로 생성하는 함수
function make_searchCondition_bar_content() {
  // searchConditions bar 에 대한 소스 동적으로 만들기 및 체크박스 체크 상태 유지
  searchConditions_string += "<dl class='searchConditions'><dt style='color: #0A3E62; font-weight: 500;'>이전 선택조건</dt>";
  if (name != '') {
    searchConditions_string += "<dd style='color: #0A3E62; font-weight: 500;'><span> 이름 : " + name + "</span></dd>";
  }
  if (sex_string != '') {
    var content = sex_string.split("_");
    searchConditions_string += "<dd style='color: #0A3E62; font-weight: 500;'><span> 성별 : ";
    for (i = 0; i < content.length; i++) {
      searchConditions_string += content[i] + " ";
      if (content[i] + " " == "여 ") {} else if (content[i] + " " == "남 ") {}
    }
    searchConditions_string += "</span></dd>";
  }
  if (style_string != '') {
    var content = style_string.split("_");
    searchConditions_string += "<dd style='color: #0A3E62; font-weight: 500;'><span> 종목 : ";
    for (i = 0; i < content.length; i++) {
      searchConditions_string += content[i] + " ";
    }
    searchConditions_string += "</span></dd>";
  }
  if (distance_string != '') {
    content = distance_string.split("_");
    searchConditions_string += "<dd style='color: #0A3E62; font-weight: 500;'><span> 거리 : ";
    for (i = 0; i < content.length; i++) {
      searchConditions_string += content[i] + " ";
    }
    searchConditions_string += "</span></dd>";
  }
  if (age_string != '') {
    content = age_string.split("_");
    searchConditions_string += "<dd style='color: #0A3E62; font-weight: 500;'><span> 나이 : ";
    for (i = 0; i < content.length; i++) {
      searchConditions_string += content[i] + " ";
    }
    searchConditions_string += "</span></dd>";
  }
  if (competitionName != '') {
    searchConditions_string += "<dd style='color: #0A3E62; font-weight: 500;'><span> 대회명 : " + competitionName + "</span></dd>";
  }

  searchConditions_string += "<dd style='color: #0A3E62; font-weight: 500;'><span> 기간 : " + period_from + "년 ~ " + period_to + "년" + "</span></dd>";

  if (teamName != '') {
    searchConditions_string += "<dd style='color: #0A3E62; font-weight: 500;'><span> 소속 :  " + teamName + "</span></dd>";
  }
  searchConditions_string += "</dl>";
  $("#viewSearchConditions").append(searchConditions_string);
}
*/
