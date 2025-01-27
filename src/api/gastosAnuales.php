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

try {
    $conn = getDatabaseConnection("carnesag_transportes");

    // Obtener el año actual
    $anioActual = date('Y');

    // Consulta para sumar los costos de las cargas del año actual
    $sql = "SELECT SUM(costo_total) AS gasto_total_anual
            FROM CargaCombustible
            WHERE YEAR(fecha_carga) = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $anioActual);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        echo json_encode(["success" => true, "gasto_total_anual" => $row['gasto_total_anual'] ?? 0]);
    } else {
        echo json_encode(["success" => false, "message" => "No se encontraron registros."]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
} finally {
    $conn->close();
}
