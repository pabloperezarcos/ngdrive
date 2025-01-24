<?php
include 'db_config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Manejo de solicitud preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $conn = getDatabaseConnection("carnesag_transportes");
    $sql = "SELECT COUNT(*) AS total FROM Vehiculo WHERE estado = 'operativo'";
    $result = $conn->query($sql);
    $data = $result->fetch_assoc();

    echo json_encode(["success" => true, "total" => $data['total']]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
} finally {
    $conn->close();
}
