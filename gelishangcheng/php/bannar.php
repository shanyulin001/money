<?php
include "conn.php";
// 轮播图数据拉取
$bannar=$conn->query("select * from bannar");
$arrpic=array();
for($i=0;$i<$bannar->num_rows;$i++){
    $arrpic[$i]=$bannar->fetch_assoc();
}
echo json_encode($arrpic);