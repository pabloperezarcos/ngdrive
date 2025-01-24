<?php
include 'db_config.php';

// Cabeceras CORS
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Manejo de solicitudes preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200); // Responder con éxito
    exit();
}

// Leer datos enviados en el cuerpo de la solicitud
$data = json_decode(file_get_contents("php://input"), true);

// Validar datos requeridos
if (!isset($data['fecha_carga']) || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $data['fecha_carga'])) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Fecha de carga inválida."]);
    exit();
}

if (!is_numeric($data['litros_cargados']) || $data['litros_cargados'] <= 0) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Los litros cargados deben ser un número positivo."]);
    exit();
}

// Validar campos opcionales (kilometraje_anterior y rendimiento)
$data['kilometraje_anterior'] = isset($data['kilometraje_anterior']) && is_numeric($data['kilometraje_anterior'])
    ? $data['kilometraje_anterior']
    : null;

$data['rendimiento'] = isset($data['rendimiento']) && is_numeric($data['rendimiento'])
    ? $data['rendimiento']
    : null;

try {
    // Conexión a la base de datos
    $conn = getDatabaseConnection("carnesag_transportes");

    // Consulta SQL para insertar la carga
    $sql = "INSERT INTO CargaCombustible (fecha_carga, tipo_combustible, litros_cargados, costo_por_litro, costo_total, kilometraje_actual, kilometraje_anterior, rendimiento, vehiculo_id_vehiculo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception("Error al preparar la consulta: " . $conn->error);
    }

    // Vincular parámetros
    $stmt->bind_param(
        "ssdddiddi", // Cambiado para reflejar los tipos correctos
        $data['fecha_carga'],
        $data['tipo_combustible'],
        $data['litros_cargados'],
        $data['costo_por_litro'],
        $data['costo_total'],
        $data['kilometraje_actual'],
        $data['kilometraje_anterior'],
        $data['rendimiento'],
        $data['vehiculo_id']
    );

    // Ejecutar consulta
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Carga registrada exitosamente."]);
    } else {
        throw new Exception("Error al ejecutar la consulta: " . $stmt->error);
    }
} catch (Exception $e) {
    // Manejo de errores
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
} finally {
    // Cerrar la conexión
    if (isset($conn)) {
        $conn->close();
    }
}
