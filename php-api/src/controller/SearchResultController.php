<?php
  require_once "./src/tableGateways/SearchResultGateway.php";
  class SearchResultController {
    private $db;
    private $requestMethod;
    private $searchResultGateway;

    public function __construct($db, $requestMethod) {
      $this->db = $db;
      $this->requestMethod = $requestMethod;
      $this->searchResultGateway = new SearchResultGateway($db);
    }

    public function processRequest() {
      switch ($this->requestMethod) {
        case 'GET':
          $response = $this->getSearchResult();
          break;
      }
      if ($response) {
        echo $response;
      }
    }

    private function getSearchResult() {
      $result = $this->searchResultGateway->findAll();
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
