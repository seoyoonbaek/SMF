<?php
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

  require_once "./src/controller/SearchConditionsController.php";

  $requestMethod = $_SERVER['REQUEST_METHOD'];

  $controller = new SearchConditionsController($db, $requestMethod);
  $controller->processRequest();
 ?>
