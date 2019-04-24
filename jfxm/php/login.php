<?php
	header("content-type:text/html;charset=utf-8");
	//获取前端 发送过来的请求
	$uname = $_GET["uname"];
	$pwd = $_GET["pwd"];
	//echo $uname,$pwd;
	//去数据库中查询uname
	$db = mysqli_connect("localhost","root","","username");
	mysqli_query($db,"set names utf8");
	$sql = "SELECT `uname`, `upwd` FROM `user` WHERE uname = '$uname'";
	$result = mysqli_query($db,$sql);
	
	//print_r($result);
	$arr = mysqli_fetch_array($result);
	//print_r($arr);
	
	//查到有这一条数据，说明用户名存在
	if($arr){//说明有这个用户在
		//判断这条数据中的密码与请求过来的密码是否匹配，
		if($pwd == $arr["upwd"]){//登录成功
			//如果匹配说明登录成功
			//跳转到学生信息页
			echo $uname;//返回一个用户名
			//echo "<script>alert('登录成功！');location.href='../index/index.html'</script>";
		}else{
			//如果不匹配说明密码有误
			//跳转到登录页
			echo 0;//表示密码不对
			//echo "<script>alert('密码有误，请重新登录！');location.href='login.html'</script>";
		}
		
	}else{//如果没有查询到这一条数据，说明用户名不存在
		//跳转到登录页
		echo 1;//表示用户名不存在
		//echo "<script>alert('用户名有误，请重新登录！');location.href='login.html'</script>";
	}
	
?>