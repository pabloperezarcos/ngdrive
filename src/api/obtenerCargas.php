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

    $sql = "SELECT c.id_carga, c.fecha_carga, c.tipo_combustible, c.litros_cargados, c.costo_por_litro, 
                   c.costo_total, c.kilometraje_actual, c.rendimiento, v.patente AS vehiculo
            FROM CargaCombustible c
            JOIN Vehiculo v ON c.vehiculo_id_vehiculo = v.id_vehiculo
            ORDER BY c.fecha_carga DESC";

    $result = $conn->query($sql);
    $cargas = [];

    while ($row = $result->fetch_assoc()) {
        $cargas[] = $row;
    }

    echo json_encode($cargas);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
} finally {
    $conn->close();
}
