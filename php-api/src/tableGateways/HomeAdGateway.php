<?php
  class HomeAdGateway {
    private $db = null;

    public function __construct($db) {
      $this->db = $db;
      mysqli_query($this->db, "set names utf8;");
    }

    public function findAll() {
      $today = date("Y-m-d");
      $query = "SELECT *
                FROM homeAd
                WHERE ad_expiration > '$today'";
      $result_array = array();
      $result = mysqli_query($this->db, $query);
      while($row = mysqli_fetch_assoc($result)){
        $row_array['id'] = $row['ad_id'];
        $row_array['url'] = $row['ad_url'];
        $row_array['title'] = $row['ad_title'];
        $row_array['expiration'] = $row['ad_expiration'];
        $row_array['image'] = $row['ad_image'];
        array_push($result_array, $row_array);
      }
      return $result_array;
    }

  }
 ?>
