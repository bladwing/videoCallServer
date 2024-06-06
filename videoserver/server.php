<?php
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $type = $input['type'];

        switch($type) {
            case 'offer':
                file_put_contents('offer.json', json_encode($input['data']));
                echo json_encode(['status' => 'offer saved']);
                break;
            case 'answer':
                file_put_contents('answer.json', json_encode($input['data']));
                echo json_encode(['status' => 'answer saved']);
                break;
            case 'candidate':
                $candidates = json_decode(file_get_contents('candidates.json'), true);
                $candidates[] = $input['data'];
                file_put_contents('candidates.json', json_encode($candidates));
                echo json_encode(['status' => 'candidate saved']);
                break;
        }
        break;

    case 'GET':
        $type = $_GET['type'];

        switch($type) {
            case 'offer':
                echo file_get_contents('offer.json');
                break;
            case 'answer':
                echo file_get_contents('answer.json');
                break;
            case 'candidates':
                echo file_get_contents('candidates.json');
                break;
        }
        break;
}
?>
