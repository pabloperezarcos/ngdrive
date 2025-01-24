<?php
include 'db_config.php';

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Manejo de solicitud preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Validar el método POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Método no permitido
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit();
}

// Leer los datos enviados en la solicitud
$data = json_decode(file_get_contents("php://input"), true);

try {
    $conn = getDatabaseConnection("carnesag_transportes");

    $sql = "INSERT INTO Vehiculo (patente, dv, marca, modelo, anno, nro_motor, nro_chasis, estado, fecha_registro)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE())";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "ssssisss",
        $data['patente'],
        $data['dv'],
        $data['marca'],
        $data['modelo'],
        $data['anno'],
        $data['nro_motor'],
        $data['nro_chasis'],
        $data['estado']
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Vehículo creado exitosamente"]);
    } else {
        throw new Exception("Error al insertar el vehículo");
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
} finally {
    $conn->close();
}
