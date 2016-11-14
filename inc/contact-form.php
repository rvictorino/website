<?php

$responsetext = "unknown-error";
if(isset($_POST['name'])) {
	$name = $_POST['name'];
}
if(isset($_POST['email'])) {
 	$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
}
if(isset($_POST['subject'])) {
	$subject = $_POST['subject'];
}
if(isset($_POST['message'])) {
	$message = $_POST['message'];
}
if(isset($_POST['g-recaptcha-response'])) {
	$captcha = $_POST['g-recaptcha-response'];
}

if(!$captcha) {
       $responsetext = "no-captcha";
} else {
	$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=6LeABw4TAAAAAAUtoxmeiLx79V34omOFaCI_DLWQ&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
	if($response.success==false) {
		$responsetext = "captcha-failed";
	} else {
		if(mail("victorino.robin@gmail.com", $name." (".$email.") via rvictorino.com: ".$subject, $message)) {
			$responsetext = "success";
		} else {
			$responsetext = "mail-failed";
		}
	}
}

echo json_encode($responsetext);
?>
