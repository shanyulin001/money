<?php
include "conn.php";
// 热销推荐数据拉取
$result=$conn->query("select * from information");
$arrdata=array();
for($i=0;$i<$result->num_rows;$i++){
    $arrdata[$i]=$result->fetch_assoc();
}
echo json_encode($arrdata);
