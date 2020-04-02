<?php
  // HomeAdGateway 클래스 정의한 파일 호출
  require_once "./src/tableGateways/HomeAdGateway.php";

  class HomeAdController {
    private $db;
    private $requestMethod;
    private $homeAdGateway;

    public function __construct($db, $requestMethod) {
      $this->db = $db;
      $this->requestMethod = $requestMethod;
      $this->homeAdGateway = new HomeAdGateway($db);
    }

    // 요청 메소드 별 작업 수행하는 함수
    public function processRequest() {
      switch ($this->requestMethod) {
        case 'GET':
          $response = $this->getHomeAd();
          break;
      }
      if ($response){
        echo $response;
      }
    }

    private function getHomeAd() {
      $result = $this->homeAdGateway->findAll();
      $response = json_encode($result);
      $response = $this->to_han($response);
      return $response;
    }

    // json_encode 함수가 한글을 유니코드 형태로 자동 변환하는 문제에 대한 PHP 5.4 하위 버전에서의 해결 방안
  	private function han ($s) {
  		return reset(json_decode('{"s":"'.$s.'"}'));
  	}

  	private function to_han ($str) {
  		return preg_replace('/(\\\u[a-f0-9]+)+/e', '$this->han("$0")', $str);
  	}
  }
 ?>
