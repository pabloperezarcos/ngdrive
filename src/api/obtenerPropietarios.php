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
    $sql = "SELECT id_propietario, razon_social FROM Propietario";
    $result = $conn->query($sql);

    $propietarios = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $propietarios[] = $row;
        }
    }

    echo json_encode(["success" => true, "data" => $propietarios]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
} finally {
    $conn->close();
}
