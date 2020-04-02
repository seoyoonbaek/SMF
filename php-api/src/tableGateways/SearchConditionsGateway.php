<?php
  class SearchConditionsGateway {
    private $db = null;

    public function __construct($db) {
      $this->db = $db;
      mysqli_query($this->db, "set names utf8;");
    }

    public function findAll() {
      $result_array = array();
      $temp_array = array();
      $query = "SELECT DISTINCT `team`
                FROM `individual_game_result`
                WHERE `team` NOT LIKE '' AND `team` NOT LIKE ' '
                ORDER BY `team` ASC";
      $result = mysqli_query($this->db, $query);
      while($row = mysqli_fetch_assoc($result)){
        $row_array['title'] = $row['team'];
        array_push($temp_array, $row_array);
      }
      $result_array['team'] = $temp_array;

      $temp_array = array();
      $query = "SELECT DISTINCT `year`
                FROM `masters_meet`
                WHERE `year` NOT LIKE ' ' AND `year` NOT LIKE ''
                ORDER BY `year` ASC";
      $result = mysqli_query($this->db, $query);
      while($row = mysqli_fetch_assoc($result)){
        $row_array['title'] = $row['year'];
        array_push($temp_array, $row_array);
      }
      $result_array['year'] = $temp_array;

      $temp_array = array();
      $query = "SELECT DISTINCT `mname`
                FROM `masters_meet`
                WHERE `mname` NOT LIKE ' ' AND `mname` NOT LIKE ''
                ORDER BY `mname` ASC";
      $result = mysqli_query($this->db, $query);
      while($row = mysqli_fetch_assoc($result)){
        $row_array['title'] = $row['mname'];
        array_push($temp_array, $row_array);
      }
      $result_array['competition_name'] = $temp_array;

      return $result_array;
    }
  }
 ?>
