<?php
  $mail_from = "smfOfficial@swimforever.net";
  $from_name = "swimforever"; // 보내는 사람 이름
  $mail_to = "qpwlalf96@naver.com"; // 받는 사람 메일 주소
  $Headers = "from: =?utf-8?B?".base64_encode($from_name)."?= <$mail_from>\r\n";
  $Headers .= "Content-Type: text/html;";
  $subject = '=?UTF-8?B?'.base64_encode("본인인증을 위한 메일입니다:)").'?=';

  function generateRandomString($length = 6) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
      $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
  }

  $authenticationStr = generateRandomString();

  $contents = '
    <html>
    <body style="font-family: Noto Sans KR, Malgun Gothic, 돋움, Dotum, Arial, Helvetica, sans-serif;">
      <div style="background: #00a3d2; padding: 0.5rem; border: 1px solid gray;">
        <p style="font-size: 12pt; color: #ffffff;">Swimforever 회원가입을 위한 본인인증 절차를 진행해주셔서 감사합니다!</p>
      </div>
      <div style="background: #ffffff; padding: 1rem; border: 1px solid gray;">
        <p style="font-size: 10.5pt;">Swimforever의 본인인증 코드 입력창에 아래에 나와 있는 코드를 입력해주세요.</p>
        <p style="font-weight: bolder; font-size: 10.5pt;">회원님의 코드: '.$authenticationStr.'</p>
      </div>
    </body>
    </html>
    ';
  mail($mail_to, $subject, $contents, $Headers);
  echo $authenticationStr;

 ?>
