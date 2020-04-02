<?php
  // CORS 문제에 대한 처리내용
  // 이게 response header에 붙게 됨. 크롬 개발자도구로 확인 가능
  header("Access-Control-Allow-Origin: *");
  header("Content-Type: application/json; charset=UTF-8");
  header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
  header("Access-Control-Max-Age: 3600");
  header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

  // dbConnection
  $servername = 'localhost';
  $username = 'sblim2';
  $password = 'forever~';
  $dbname = 'sblim2';

  // db
  $db = mysqli_connect($servername, $username, $password, $dbname);
  if (!$db) {
    die("Connection failed : ".mysqli_connect_error());
  }

  // HomeAdController 클래스 정의한 파일 호출
  require_once "./src/controller/HomeAdController.php";

  $requestMethod = $_SERVER['REQUEST_METHOD'];

  $controller = new HomeAdController($db, $requestMethod);
  $controller->processRequest();

 ?>
