<?php
include 'db_config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(["success" => false, "message" => "ID no proporcionado"]);
    exit();
}

// Asegurarse de que el método es GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Método no permitido
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit();
}

$conn = getDatabaseConnection("carnesag_transportes");
$sql = "SELECT * FROM Vehiculo WHERE id_vehiculo = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$vehiculo = $result->fetch_assoc();

if ($vehiculo) {
    echo json_encode(["success" => true, "data" => $vehiculo]);
} else {
    echo json_encode(["success" => false, "message" => "Vehículo no encontrado"]);
}
$conn->close();
