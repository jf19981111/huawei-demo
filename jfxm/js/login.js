window.onload = function(){
		new Login().init();
	}
	class Login{
		constructor(){
			this.sub = $("#sub");
			this.uname = $(":text");
			//console.log(this.uname)
			this.pwd = $(":password");
			this.userName = "";
		};
		init(){//初始化登录功能
			//登录方法
			this.goLogin();
		};
		goLogin(){
			//alert(1)
			//点击登录 发送ajax请求	
			this.sub.click(function(){
				var _this = this;
				//console.log($(":text").val())
				
				//alert(1)
				$.ajax({
					type : "get",
					url : "../php/login.php",
					data : {
						uname : $(":text").val(),
						pwd : $(":password").val()
					},
					success : function(res){
						//console.log(res);
						if(res == 1){
							alert("用户名不存在 请重新登录！");
						}else if(res == 0){
							alert("密码不对 请重新登录");
						}else {
							//登录成功 返回登录的用户名
							alert("登录成功");
							localStorage.setItem("uname",res);
							
							//_this.userName = res;
							location.href = "../html/index.html";
							//console.log(_this.userName);
						}
					}
				});
			})
		}
	}