<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // --- SET YOUR EMAIL HERE ---
    $to = "sales@adeeze.com"; 
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

    // 1. Send Email
    $mail_sent = mail($to, $subject, $message, $headers);

    // 2. Send to Privyr Webhook
    $privyr_url = "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/3nri0J5X";
    $privyr_data = [
        "name" => $name,
        "email" => $email,
        "phonenumber" => $phone,
        "website" => $website,
        "ad_spend" => $ad_spend,
        "source" => "Adeeze Website"
    ];

    $ch = curl_init($privyr_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($privyr_data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    $privyr_response = curl_exec($ch);
    curl_close($ch);

    if ($mail_sent) {
        echo json_encode(["status" => "success", "privyr" => "synced"]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error"]);
    }
} else {
    http_response_code(403);
    echo "Forbidden";
}
?>
