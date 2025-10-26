<?php
header('Content-Type: application/json');

$targetDir = "../../asset/img/";

if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

if (isset($_FILES['foto'])) {
    $fileName = basename($_FILES['foto']['name']);
    $targetFile = $targetDir . $fileName;

    $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    if (in_array($fileType, $allowedTypes)) {
        if (move_uploaded_file($_FILES['foto']['tmp_name'], $targetFile)) {
            echo json_encode([
                "success" => true,
                "filePath" => $targetFile
            ]);
        } else {
            echo json_encode(["success" => false, "error" => "Gagal memindahkan file."]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Format file tidak diizinkan."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Tidak ada file yang diupload."]);
}
?>
