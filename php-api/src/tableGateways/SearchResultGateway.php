<?php
  class SearchResultGateway {
    private $db = null;

    public function __construct($db){
      $this->db = $db;
      mysqli_query($this->db, "set names utf8;");
    }

    public function findAll() {
      $player_name = $_GET['player_name'];
      $player_sex = $_GET['player_sex'];
      $player_age = $_GET['player_age'];
      $player_age_criteria = $_GET['player_age_criteria'];
      $style = $_GET['style'];
      $distance = $_GET['distance'];
      $competition_year_from = $_GET['competition_year_from'];
      $competition_year_to = $_GET['competition_year_to'];
      $competition_name = $_GET['competition_name'];
      $player_team = $_GET['player_team'];

      // 기본 쿼리문
    	$temp = "SELECT *
               FROM `individual_game_result` AS I
    	         JOIN `masters_meet` AS M
    		       ON I.`mindex` = M.`mindex`
    	         WHERE I.`mindex` NOT LIKE '' AND I.`age_from` < I.`age_to`";

    	// 대회 기간 검색
    	if ($competition_year_from != ""){
    		$temp .= " AND M.year >= '$competition_year_from'";
    	}

    	if ($competition_year_to != ""){
    		$temp .= " AND M.year <= '$competition_year_to'";
    	}

    // 선수 이름 검색
    if ($player_name != ""){
    	$temp .= " AND I.pname LIKE '%$player_name%'";
    }

    // 선수 성별 검색 - 중복선택 가능
    if ($player_sex != ""){
      if ($player_sex != '전체'){
        //문자열로 받은 style을 배열로 변환시키는 부분
        $sex_array = $this->string_with_square_brakets_to_array($player_sex);
        $temp .= " AND (";
        for ($i = 0; $i < count($sex_array) ; $i++) {
          $temp .= "I.psex LIKE '$sex_array[$i]'";
          if ($sex_array[$i] === '여자'){
            $temp .= "OR I.psex LIKE '여'";
          }
          if ($sex_array[$i] === '남자'){
            $temp .= "OR I.psex LIKE '남'";
          }
          if ($i < count($sex_array)-2) {
            $temp .= " OR ";
          }
        }
        $temp .= ")";
      }
    }

    // 종목 검색 - 중복선택 가능
    if ($style != ""){
    	//문자열로 받은 style을 배열로 변환시키는 부분
    	$style_array = $this->string_with_square_brakets_to_array($style);
    	$temp .= " AND (";
    	for ($i = 0; $i < count($style_array)-1 ; $i++) {
    		$temp .= "I.style LIKE '$style_array[$i]'";
    		if ($i < count($style_array)-2) {
    			$temp .= " OR ";
    		}
    	}
    	$temp .= ")";
    }

    // 거리 검색 - 중복선택 가능
    if ($distance != ""){
    	//문자열로 받은 distance을 배열로 변환시키는 부분
    	$distance_array = $this->string_with_square_brakets_to_array($distance);
    	$temp .= " AND (";
    	for ($i = 0; $i < count($distance_array)-1 ; $i++) {
        $distance_value = str_replace("m", "", $distance_array[$i]);
    		$temp .= "I.distance LIKE '$distance_value'";
    		if ($i < count($distance_array)-2) {
    			$temp .= " OR ";
    		}
    	}
    	$temp .= ")";
    }

    // 나이 검색 - 중복선택 가능
    if ($player_age != ""){
    	//문자열로 받은 age을 배열로 변환시키는 부분
    	$age_array_temp = $this->string_with_square_brakets_to_array($player_age);
      $age_array = array();
      for ($i = 0; $i < count($age_array_temp); $i++){
        $age_array = array_merge($age_array, explode("~", $age_array_temp[$i]));
      }

    	$temp .= " AND (";

    	for ($i = 0; $i < count($age_array)-1 ; $i++) {
    	  if ($player_age_criteria != 'age_criteria_competition'){
    		  $current = date("Y");
    			$temp .= "( ( (I.age_from + ($current - M.year)) >= $age_array[$i] AND ";
    				$i++;
    				$temp .= "(I.age_from + ($current - M.year)) <= $age_array[$i]) OR (";
    					$i -= 1;
    					$temp .="(I.age_to + ($current - M.year)) >= $age_array[$i] AND";
    					$i++;
    					$temp .= " (I.age_to + ($current - M.year)) <= $age_array[$i]) OR (";
    					$i -= 1;
    					$temp .= "( (I.age_from + ($current - M.year)) <= $age_array[$i]) AND (";
    					$i++;
    					$temp .= "(I.age_to + ($current - M.year)) >= $age_array[$i]) ) )";
    		}
    	  else {
    		  $temp .= "( ( (I.age_from) >= $age_array[$i] AND ";
    			  $i++;
    			  $temp .= "(I.age_from) <= $age_array[$i]) OR (";
    				  $i -= 1;
    				  $temp .="(I.age_to) >= $age_array[$i] AND";
    				  $i++;
    				  $temp .= " (I.age_to) <= $age_array[$i]) OR (";
    				  $i -= 1;
    				  $temp .= "( (I.age_from) <= $age_array[$i]) AND (";
    				  $i++;
    			  	$temp .= "(I.age_to) >= $age_array[$i]) ) )";
    		}
    		if ($i < count($age_array)-2) {
    			$temp .= " OR ";
    		}
    	}
    	$temp .= ")";
    }

    // 선수 소속 검색
    if ($player_team != ""){
    	$temp .= " AND I.team LIKE '%$player_team%'";
    }

    // 대회 이름 검색 & 대회 기간 검색
    if ($competition_name != ""){
    	//$temp .= " AND M.mname LIKE '%$competition_name%'";
    	$temp .= " AND (M.mname, M.year) IN (SELECT mname, year FROM masters_meet AS M WHERE M.mname LIKE '%$competition_name%' AND M.year >= $competition_year_from AND M.year <= $competition_year_to)";
    }


    //마지막에 검색 결과 기록에 대한 오름차순으로 정렬
    //(근데 불참, 실격에 해당하는 record=1000000이 제일 먼저 뜸..왜지..)
      $temp .= "ORDER BY I.record ASC ";

      $startIndex = 0;
    	$result_array = array(); //결과를 받을 배열 선언
    	$sql = $temp;
    	$result = mysqli_query($this->db, $sql); // 데이터베이스에 쿼리 요청

    	while ($row = mysqli_fetch_assoc($result)){
    		$row_array['index'] = (string)($startIndex++);
    		$row_array['player_name'] = $row['pname'];
    		$row_array['player_sex'] = $row['psex'];
    		$row_array['style'] = $row['style'];
    		$row_array['distance'] = $row['distance'];
    		$row_array['record'] = $row['record'];
    		$row_array['age_from'] = $row['age_from'];
    		$row_array['age_to'] = $row['age_to'];
    		$row_array['year'] = $row['year'];
    		$row_array['month'] = $row['month'];
    		$row_array['day'] = $row['day'];
    		$row_array['competition_name'] = $row['mname'];
    		$row_array['player_team'] = $row['team'];
    		$row_array['remark'] = $row['remark'];
    		array_push($result_array, $row_array);
    	}

      return $result_array;
    }

    private function string_with_square_brakets_to_array($string_sq){
      $tempArr = explode("]", $string_sq);
      for ($i = 0; $i < count($tempArr); $i++){
        $temp_str = str_replace('[','',$tempArr[$i]);
        $tempArr[$i] = $temp_str;
      }
      return $tempArr;
    }
  }
 ?>
