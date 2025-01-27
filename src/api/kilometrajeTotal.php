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

    // Consulta para sumar el kilometraje recorrido
    $sql = "SELECT SUM(kilometraje_recorrido) AS total_recorrido FROM CargaCombustible";
    $result = $conn->query($sql);

    if ($row = $result->fetch_assoc()) {
        echo json_encode(["success" => true, "total_recorrido" => $row['total_recorrido']]);
    } else {
        echo json_encode(["success" => false, "message" => "No se encontraron registros."]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
} finally {
    $conn->close();
}
?>
