<?php
include "conn.php";
// 每日精选数据拉取
$result=$conn->query("select * from everyday");
$arrdata=array();
for($i=0;$i<$result->num_rows;$i++){
    $arrdata[$i]=$result->fetch_assoc();
}
echo json_encode($arrdata);
