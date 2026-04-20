<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // --- SET YOUR EMAIL HERE ---
    $to = "hello@adeeze.com"; 
    $subject = "New Lead from Adeeze Website";

    // Get form data
    $name = $_POST['full_name'] ?? 'Not provided';
    $email = $_POST['email'] ?? 'Not provided';
    $phone = $_POST['phone_number'] ?? 'Not provided';
    $website = $_POST['website'] ?? 'Not provided';
    $ad_spend = $_POST['ad_spend'] ?? 'Not provided';

    // Email Body
    $message = "You have a new lead from your website:\n\n";
    $message .= "Full Name: $name\n";
    $message .= "Email: $email\n";
    $message .= "Phone: $phone\n";
    $message .= "Website: $website\n";
    $message .= "Monthly Ad Spend: $ad_spend\n";

    // Headers
    $headers = "From: no-reply@adeeze.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send Email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error"]);
    }
} else {
    http_response_code(403);
    echo "Forbidden";
}
?>
