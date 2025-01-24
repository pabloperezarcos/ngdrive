<?php
include 'db_config.php'; // Asegúrate de que esta función está definida

header("Content-Type: application/json; charset=utf-8");

// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Detener ejecución si es una solicitud de verificación previa (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Asegurarse de que el método es GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405); // Método no permitido
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
    exit();
}

try {
    // Obtener conexión a la base de datos
    $conn = getDatabaseConnection("carnesag_transportes");

    // Verifica si la conexión fue exitosa
    if ($conn->connect_error) {
        echo json_encode(['success' => false, 'message' => 'Error de conexión: ' . $conn->connect_error]);
        exit();
    }

    // Consulta para obtener todos los vehículos
    $sql = "SELECT id_vehiculo, patente, marca, modelo, anno, estado FROM Vehiculo";
    $result = $conn->query($sql);

    // Preparar el JSON de respuesta
    $vehiculos = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $vehiculos[] = $row;
        }
    }

    // Enviar la respuesta como JSON
    echo json_encode(['success' => true, 'data' => $vehiculos]);
} catch (Exception $e) {
    // Manejo de errores
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Ocurrió un error en el servidor: ' . $e->getMessage()]);
} finally {
    // Cerrar la conexión si existe
    if (isset($conn) && $conn !== null) {
        $conn->close();
    }
}
