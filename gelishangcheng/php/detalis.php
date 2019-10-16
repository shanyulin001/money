<?php
include "conn.php";
// 拉取表和表中的数据拉取
// if (isset($_GET['excel'])) {
//     $table = $_GET['excel'];
//     $chart = $conn->query("select * from $table");
//     $arrpic = array();
//     for ($i = 0; $i < $bannar->num_rows; $i++) {
//         $arrpic[$i] = $bannar->fetch_assoc();
//     }
//     echo json_encode($arrpic);
// }

if (isset($_GET['id'])) {
    $sid = $_GET['id'];
    $result = $conn->query("select * from bannar where sid=$sid");
    echo json_encode($result->fetch_assoc());
}
