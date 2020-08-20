var app = app || {};

function Common() {}

Common.prototype = (function() {
  return {
    getScripts: function(scripts, callback) {
      var progress = 0;
      scripts.forEach(function(script) {
        $.getScript(script, function() {
          // scripts 다 로딩했으면 콜백함수 실행
          if (++progress == scripts.length) {
            callback();
          }
        });
      });
    },
    // 범용 네임스페이스 함수
    setNamespace: function(ns_string) {
      var sections = ns_string.split('.'),
        parent = app,
        i;
      if (sections[0] === "app") {
        sections = sections.slice(1);
      }
      var s_length = sections.length;
      for (i = 0; i < s_length; i += 1) {
        if (typeof parent[sections[i]] === "undefined") {
          parent[sections[i]] = {};
        } else {
          console.log("프로퍼티 중복: " + sections[i]);
        }
        parent = parent[sections[i]];
      }
      return parent;
    },
    // 부모노드의 모든 children 배열에서 자기 이외의 요소들을 배열로 반환
    siblings: function(target) {
      var children = target.parentElement.children;
      var tempArr = [];
      for (var i = 0; i < children.length; i++) {
        tempArr.push(children[i]);
      }
      return tempArr.filter(function(e) {
        return e != target;
      });
    },
    // array의 요소(문자)들을 []로 감싼 후 붙인 string으로 반환
    idArr_to_single_string: function(idArr) {
      var array = new Array;
      var single_string = "";
      if (idArr) {
        for (var i = 0; i < idArr.length; i++) {
          array.push(idArr[i].getAttribute('id'));
        }
        for (var i = 0; i < array.length; i++) {
          var temp = "[" + array[i] + "]";
          single_string += temp;
        }
      } else {
        single_string = "";
      }
      return single_string;
    },
    // []로 감싸져 있는 string을 array로 반환
    string_with_square_brakets_to_array: function(string) {
      var tempStr = string.replace(/\[/g, "");
      var tempArr = tempStr.split("]");
      var resultArr = new Array;
      for (var i = 0; i < tempArr.length; i++) {
        if (tempArr[i] != "") {
          resultArr.push(tempArr[i]);
        }
      }
      return resultArr;
    },
    extand: function(obj, src) {
      for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
      }
      return obj;
    },
    // 동적으로 css 스타일시트 내용을 바꾸는 함수
    // common.changeCSSRules('researchApp.css', 'only screen and (max-width: 986px)', '#mobile_tools_content p', 'background-color: white;'); 이런 형식으로 쓰면 됨.
    changeCSSRules: function(fileName, mediaText, selectorText, changeText) {
      var changeStyleSheet = new Object;
      var cssRuleType = 1; // style_rule
      var styleSheets = document.styleSheets;
      var mediaText = mediaText.replace(/ /gi, "");
      for (var i = 0; i < styleSheets.length; i++) {
        (function(i) {
          var styleSheet = styleSheets[i];
          if (styleSheet.href.indexOf(fileName) !== -1) {
            changeStyleSheet = styleSheet;
          }
        })(i);
      }
      if (mediaText !== "") {
        cssRuleType = 4;
      }
      switch (cssRuleType) {
        case 1:
          var cssRules = changeStyleSheet.cssRules;
          for (var i = 0; i < cssRules.length; i++) {
            (function(i) {
              var cssRule = cssRules[i];
              if ((cssRule.type === 1)) {
                if (cssRule.selectorText === selectorText) {
                  cssRule.style.cssText = changeText;
                }
              }
            })(i);
          }
          break;
        case 4:
          var cssRules = changeStyleSheet.cssRules;
          for (var i = 0; i < cssRules.length; i++) {
            (function(i) {
              var mediaRule = cssRules[i];
              if ((mediaRule.type === 4)) {
                var mediaRule_mediaText = mediaRule.media.mediaText.replace(/ /gi, "");
                if (mediaRule_mediaText === mediaText) {
                  for (var j = 0; j < mediaRule.cssRules.length; j++) {
                    (function(j) {
                      var cssRule = mediaRule.cssRules[j];
                      if (cssRule.selectorText === selectorText) {
                        cssRule.style.cssText = changeText;
                      }
                    })(j);
                  }
                }
              }
            })(i);
          }
          break;
      }
    },
    // 토스트 메시지 띄우기
    makeToastMsg: function(string, time) {
      var snackbar_html = '<div id="snackbar">' + string + '</div>';
      document.body.insertAdjacentHTML('beforeend', snackbar_html);
      var snackbar = document.getElementById('snackbar');
      snackbar.classList.add('show');
      setTimeout(function() {
        snackbar.classList.remove('show');
        snackbar.remove();
      }, time);
    },
    cloneObject: function(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
  }
})();

var common = new Common();
