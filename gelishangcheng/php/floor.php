<?php
include "conn.php";
// 楼层数据拉取
$result=$conn->query("select * from onefloor");
$arrdata=array();
for($i=0;$i<$result->num_rows;$i++){
    $arrdata[$i]=$result->fetch_assoc();
}
echo json_encode($arrdata);