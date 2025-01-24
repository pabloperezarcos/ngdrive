<?php
include 'db_config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$vehiculoId = $_GET['vehiculo_id'] ?? null;

try {
    if (!$vehiculoId) {
        throw new Exception("ID del vehículo no proporcionado.");
    }

    $conn = getDatabaseConnection("carnesag_transportes");

    $sql = "SELECT kilometraje_actual FROM CargaCombustible WHERE vehiculo_id_vehiculo = ? ORDER BY fecha_carga DESC LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $vehiculoId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode(["success" => true, "kilometraje_anterior" => $row['kilometraje_actual']]);
    } else {
        echo json_encode(["success" => true, "kilometraje_anterior" => 0]); // Si no hay registros previos
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
} finally {
    $conn->close();
}
