<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "votaciones";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
   
    $nombreApellido = $_POST['nombreApellido'];
    $alias = $_POST['alias'];
    $rut = $_POST['rut'];
    $email = $_POST['email'];
    $region = $_POST['region'];
    $comuna = $_POST['comuna'];
    $candidato = $_POST['candidato'];
    $mediosSeleccionados = isset($_POST['mediosSeleccionados']) ? implode(', ', $_POST['mediosSeleccionados']) : '';

   
    $sql = "INSERT INTO votantes (nombre_apellido, alias, rut, email, id_region, id_comuna, id_candidato, medios_seleccionados) VALUES ('$nombreApellido', '$alias', '$rut', '$email', $region, $comuna, $candidato, '$mediosSeleccionados')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
} else {

    $sqlRegiones = "SELECT id, nombre FROM regiones";
    $resultRegiones = $conn->query($sqlRegiones);

    
    $sqlComunas = "SELECT id, nombre, id_region FROM comunas";
    $resultComunas = $conn->query($sqlComunas);

    
    $sqlCandidatos = "SELECT id, nombre, partido_politico FROM candidatos";
    $resultCandidatos = $conn->query($sqlCandidatos);

   
    $data = array(
        'regiones' => array(),
        'comunas' => array(),
        'candidatos' => array()
    );


    while ($row = $resultRegiones->fetch_assoc()) {
        $data['regiones'][] = $row;
    }

    while ($row = $resultComunas->fetch_assoc()) {
        $data['comunas'][] = $row;
    }

 
    while ($row = $resultCandidatos->fetch_assoc()) {
        $data['candidatos'][] = $row;
    }

  
    echo json_encode($data);
}


$conn->close();
?>
