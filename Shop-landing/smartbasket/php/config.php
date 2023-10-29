<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . 'smartbasket/php/phpmailer/phpmailer.php');

		// *** SMTP *** //

		 require_once($_SERVER['DOCUMENT_ROOT'] . 'smartbasket/php/phpmailer/smtp.php');
		 const HOST = 'smtp.mail.ru';
		 const LOGIN = 'i_mardanovik@mail.ru';
		 const PASS = 'rYUaREat43-r';
		 const PORT = '465';

		// *** /SMTP *** //
   
    const SENDER = 'i_mardanovik@mail.ru';
    const CATCHER = 'redaxe3946@peogi.com';
    const SUBJECT = 'Заявка с сайта';
    const CHARSET = 'UTF-8';
    