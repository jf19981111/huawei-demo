<?php
	header("content-type:text/html;charset=utf-8");
	$db = mysqli_connect("localhost","root","","username");
	mysqli_query($db,"set names utf8");
	$uname = $_GET["uname"];
	$sql = "select * from user where uname = '$uname'";
	$result = mysqli_query($db,$sql);
	$arr = mysqli_fetch_array($result);
	//print_r($arr);
	if($arr){
		echo 1;//1表示存在
	}else{
		//如果没有表示可以注册
		echo 0;//0表示不存在
	}
?>