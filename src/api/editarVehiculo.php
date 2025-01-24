<?php
include 'db_config.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Manejo de solicitudes preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Validar que el método sea PUT
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405); // Método no permitido
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit();
}


// Leer los datos enviados en la solicitud
$data = json_decode(file_get_contents("php://input"), true);

try {
    $conn = getDatabaseConnection("carnesag_transportes");



    $sql = "UPDATE Vehiculo SET patente = ?, dv = ?, marca = ?, modelo = ?, anno = ?, nro_motor = ?, nro_chasis = ?, estado = ? WHERE id_vehiculo = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "ssssisssi",
        $data['patente'],
        $data['dv'],
        $data['marca'],
        $data['modelo'],
        $data['anno'],
        $data['nro_motor'],
        $data['nro_chasis'],
        $data['estado'],
        $data['id_vehiculo']
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Vehículo actualizado exitosamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al actualizar el vehículo"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
} finally {
    $conn->close();
}
