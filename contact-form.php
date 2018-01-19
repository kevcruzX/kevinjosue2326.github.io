<?php 

	// Type here your email
	define( 'EMAIL_TO', 'your_email_here@domain.com' );
	
	// Type default mail subject here
	define( 'EMAIL_SUBJECT', 'Feedback from website' );
	
	// that's all, stop editing here :)
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	if( $_SERVER['REQUEST_METHOD'] == 'POST' ) {
		
		$email_from = isset( $_POST['email'] ) ? $_POST['email'] : '';
		
		$phone_from = isset( $_POST['phone'] ) ? $_POST['phone'] : '';
		
		$name_from = isset( $_POST['name'] ) ? trim( $_POST['name'] ) : 'Anonymous';
		
		$email_subject = isset( $_POST['subject'] ) && trim( $_POST['subject'] ) <> '' ? htmlspecialchars( trim( $_POST['subject'] ) ) : EMAIL_SUBJECT;
		
		$message = 'Phone: ' . $phone_from . "\r\n";
		
		$message .= isset( $_POST['message'] ) ? htmlspecialchars( trim( $_POST['message'] ) ) : 'No text...';
		
		$headers = 'From: ' . $name_from . ' <' . $email_from . '>' . "\r\n" .'X-Mailer: PHP/' . phpversion();
		
		@mail( EMAIL_TO, $email_subject, $message, $headers );
		
	}