<?php
include "conn.php";//引入数据库连接文件
//用户注册表手机号传输，验证手机号是否注册过
if(isset($_POST['phonenum']) || isset($_POST['submit'])){//获取手机号码
    $phone=@$_POST['phonenum'];//取值
    $result=$conn->query("select * from user where phone='$phone'");//如果能够找到记录，手机号存在的
    if($result->fetch_assoc()){//如果$result->fetch_assoc()有值，返回true,否则就是false;
        echo true;//1 存在
    }else{
        echo false;
    }
}else{
    exit('非法操作');//输出非法操作，终止程序
}
// 邮箱注册表手机号传输，验证用户名是否注册过
// if(isset($_POST['xingming']) || isset($_POST['submit2'])){//获取手机号码
//     $name=@$_POST['xingming'];//取值
//     $result1=$conn->query("select * from user where username='$name'");//如果能够找到记录，手机号存在的
//     if($result1->fetch_assoc()){//如果$result->fetch_assoc()有值，返回true,否则就是false;
//         echo true;//1 存在
//     }else{
//         echo false;
//     }
// }else{
//     exit('非法操作');//输出非法操作，终止程序
// }



//将表单的值接收，放入数据库。
if(isset($_POST['submit'])){//点击了注册1按钮
    $phone=$_POST['phonenum'];
    $pass=sha1($_POST['password']);
    $conn->query("insert user values(null,null,'$phone',null,'$pass',NOW())");
    // header('http://10.31.155.21/secondJavaScript/gelishangcheng/src/denlu.html');//php的跳转
    // echo "<script> location.href='http://10.31.155.21/secondJavaScript/gelishangcheng/src/denglu.html'; </script>";
}
// // 邮箱注册表单的值接收，放入数据库。
// if(isset($_POST['submit2'])){//点击了注册2按钮
//     $name2=$_POST['usename'];
//     $email2=$_POST['email'];
//     $phone2=$_POST['phonenum1'];
//     $pass2=sha1($_POST['password1']);
//     $conn->query("insert user values(null,'$name2','$phone2','$email2','$pass2',NOW())");
//     // header('http://10.31.155.21/secondJavaScript/gelishangcheng/src/denlu.html');//php的跳转
//     // echo "<script> location.href='http://10.31.155.21/secondJavaScript/gelishangcheng/src/denglu.html'; </script>";
// }
