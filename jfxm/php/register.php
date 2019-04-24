<?php
	header("content-type:text/html;charset=utf-8");
	//获取前端发送过来的请求
	$uname = $_GET["uname"];
	$pwd = $_GET["pwd"];
	//echo $uname,$pwd;
	$db = mysqli_connect("localhost","root","","username");
	mysqli_query($db,"set names utf8");
	$sql = "INSERT INTO `user`( `uname`, `upwd`) VALUES ('$uname','$pwd')";
	$result = mysqli_query($db,$sql);
	//echo $result;
	if($result) {
		echo "<script>alert('恭喜，注册成功');location.href='../html/login.html'</script>";
	}else{//表示插入失败 ： 注册失败
		//跳转到注册页
		echo "<script>alert('很遗憾，注册失败！');location.href='register.html'</script>";
	}
?>