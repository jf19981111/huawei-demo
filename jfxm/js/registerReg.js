window.onload = function(){
	//通过id名称获取元素标签
function $id(idName){
	return document.getElementById(idName);
}

var sub = $id("sub");
var form = $id("form");
//开关控制器
	var unameFlag = false;
	var pwdFlag = false;
	var emailFlag = false;
//用户名获取
	var uname = $id("uname");
	var info_user = $id("info_user");
	var error_user = $id("error_user");
	var succ_user = $id("succ_user");
	var exist = $id("exist");
//密码获取
	var pwd = $id("pwd");
	var info_pass = $id("info_pass");
	var error_pass = $id("error_pass");
	var succ_pass = $id("succ_pass");
	var q1 = $id("q1");
	var q2 = $id("q2");
	var q3 = $id("q3");
	var s1 =$id("s1");
	var s2 =$id("s2");
	var s3 =$id("s3");
	var s4 =$id("s4");
//邮箱获取
	var email = $id("email");
	var info_email = $id("info_email");
	var error_email = $id("error_email");
	var succ_email = $id("succ_email");
	var all_email = $id("all_email");
	var emailText = document.getElementsByClassName("emailText");
	var allLi = all_email.children;
	
//年月日获取
	var year = $id("year");
	var month = $id("month");
	var day = $id("day");
	
//---------------用户名验证------------------
	//2~20位，由字母、数字和下划线、或中文组成
	var unameReg = /^(\w|[\u4e00-\u9fa5]){2,20}$/;
	//alert(unameReg.test("zzz"))
	uname.onfocus = function(){
		info_user.style.display = "block";
		succ_user.style.display = "none";
		error_user.style.display = "none";
		exist.style.display = "none";
	}
	uname.onblur = function(){
		
		
		//获取uname的value
		var $uVal = $(uname).val();
		//对value进行正则验证
		if(unameReg.test($uVal)){//通过返回true
			
			succ_user.style.display = "block";
			info_user.style.display = "none";
			error_user.style.display = "none";
			exist.style.display = "none";
			
				//发送一个ajax请求
				$.ajax({
					type : "get",
					url : "../php/checkName.php",
					data : {
						uname : $("#uname").val(),
						upwd : $("#pwd").val()
					},
					success : function(res){
						if(res== "1"){
							exist.style.display = "inline-block";
							succ_user.style.display = "none";
							unameFlag = false;
						}else {
							unameFlag = true;
						}
					}
					
				})
		}
	}
	
	
//---------------密码验证-----------------
	//6-20个字符 只能包含大小写字母、数字和非空格字符
	var pwdReg = /^[a-zA-Z0-9]{6,20}$/;
	pwd.onfocus = function(){
		info_pass.style.display = "block";
		succ_pass.style.display = "none";
		error_pass.style.display = "none";
	}
	pwd.onblur = function(){
		if(checkPwd()){
			succ_pass.style.display = "block";
			error_pass.style.display = "none";
			info_pass.style.display = "none";
			pwdFlag = true;
		}else{
			error_pass.style.display = "block";
			succ_pass.style.display = "none";
			info_pass.style.display = "none";
			pwdFlag = false;
		}
	}
	
	//表示输入了这些就让q2高亮显示
	var reg1 = /[a-zA-Z0-9]/;
	//让他们两两匹配，让q3高亮显示
	var dxReg =/[A-Z]/;
	var szReg = /\d/;
	var xxReg = /[a-z]/;
	//密码强度验证
	//6-20个字符
	//只能包含大小写字母、数字和非空格字符
	//大、小写字母、数字、非空字符，2种以上
	pwd.onkeyup = function(){
		//获取value值
		var pVal = pwd.value;
		if(pVal.length >= 6 && pVal.length <= 20){
			s1.style.color = "#000";
			s4.innerHTML = "初级";
			//大于等于8的时候 并且有两种字符以上为中级
			if(pVal.length >= 8 && ((pVal.search(dxReg) != -1 && pVal.search(xxReg) != -1) || (pVal.search(dxReg) != -1 && pVal.search(szReg) != -1) || (pVal.search(szReg) != -1 && pVal.search(xxReg) != -1))){
				s2.style.color = "#000";
				s4.innerHTML = "中级";
				//大于等于10，并且三种字符
				if(pVal.length >= 10 && (pVal.search(dxReg) != -1 && pVal.search(xxReg) != -1 && pVal.search(szReg) != -1)){
					s3.style.color = "#000";
					s4.innerHTML = "高级";
				}else{
					s3.style.color = "#ccc";
					s4.innerHTML = "中级";
				}
				
			}else{
				s2.style.color = "#ccc";
				s4.innerHTML = "初级";
			}
			q1.innerHTML = "●";
		}else {
			s1.style.color = "#ccc";
			s4.innerHTML = "";
			q1.innerHTML = "○";
		}
		if(reg1.test(pVal)){
			q2.innerHTML = "●";
		}else{
			q2.innerHTML = "○";
		}
		if((pVal.search(dxReg) != -1 && pVal.search(xxReg) != -1) || (pVal.search(dxReg) != -1 && pVal.search(szReg) != -1) || (pVal.search(szReg) != -1 && pVal.search(xxReg) != -1)){
			q3.innerHTML = "●";
		}else{
			q3.innerHTML = "○";
		}
	}
//验证pwd	
	function checkPwd(){
		var pVal = pwd.value;
		if(pwdReg.test(pVal)){
			return true;
		}else{
			return false;
		}
	}
	
//-----------------------邮箱验证------------------------
	var emailReg = /^\w{3,}@[0-9a-z]{2,4}(\.[a-zA-Z]{2,4}){1,2}$/;
	email.onfocus = function(){
		info_email.style.display = "block";
		succ_email.style.display = "none";
		error_email.style.display = "none"
	}
	email.onblur = function(){
		if(checkEmail()){
			succ_email.style.display = "block";
			info_email.style.display = "none";
			error_email.style.display = "none";
			emailFlag = true;
		}else{
			error_email.style.display = "block"
			info_email.style.display = "none";
			succ_email.style.display = "none";
			emailFlag = false;
		}
	}
//email补全系统	
	email.onkeydown = function(){
		//获取value值
		var eVal = this.value;
	//这里有一个bug 就是如果说有@符号 那么赋值的时候会把@前面的内容一起拼接到后面
		//所以要判断是否有@,如果有就把@及后面的内容截取掉
		//98@dsad@qq.com
		if(eVal.indexOf("@") != -1){//说明存在
			eVal = eVal.split("@")[0];
		}
		//按下时要让all_email显示
		all_email.style.display = "block";
		//把 eVal拼接到所有的emailText
		for (var i = 0; i < emailText.length; i++) {
			emailText[i].innerHTML = eVal;
		}
	}
//鼠标移入事件
	all_email.onmouseover = function(eve){
		var e = eve || event;
		var target = e.target || e.srcElement;
		if(target.nodeName.toLowerCase() == "li"){
			for (var i = 0; i < this.children.length; i++) {
				this.children[i].style.background = "#fff";
			}
			target.style.background = "#ccc";
			target.onclick = function(){
	//这里有个bug ： 就是当点击的时候 是先执行验证 在把内容拼接进去 所以会不合法
				email.value = target.innerText;
				all_email.style.display = "none";
		//解决bug ： 就是把值放进去后 在执行onblur事件
				email.onblur();
			}
		}
	}
//键盘事件 上 38下键40 回车键13
	var index = -1;
	document.onkeydown = function(eve){
		var e = eve || event;
		var code = e.keyCode || e.which || e.charCode;
		for (var i = 0; i < allLi.length; i++) {
			allLi[i].style.background = "#fff";
		}
	//这里要注意上下键的结合bug问题 index的问题
		switch(code){
			case 38:
			//这个单独if就是解决bug
				if(index < 0){
					index = 0;
				}
				if(index == 0){
					index = allLi.length - 1;
				}else{
					index--;
				}
				allLi[index].style.background = "#ccc";
				break;
			case 40:
				if(index == allLi.length - 1){
					index = 0;
				}else{
					index++;
				}
				allLi[index].style.background = "#ccc";
				break;
			case 13:
				//把当前所在的下标内容拼接进去
				email.value = allLi[index].innerText
				all_email.style.display = "none";
				email.onblur();
				e.preventDefault();
				break;
		}
	}
	
//点击外面的时候处理
//有事件冒泡 但是没关系 因为都是阻止的同一个事情
	document.onclick = function(){
		all_email.style.display = "none";
	}	
	function checkEmail(){
		var eVal = email.value;
		if(emailReg.test(eVal)){
			return true;
		}else{
			return false;
		}
	}

//------------------------年月日验证-------------------------

	for (var i = 1900; i <= 2100; i++) {
		var option = new Option(i,i);
		year.appendChild(option);
	}
	
	year.onchange = function(){
		var yVal = this.value;
		month.options.length = 1;	
		day.options.length = 1;
		//要对value进行判断
		if(yVal != 0){
			for (var i = 0; i <= 12; i++) {
				var option = new Option(i,i);
				month.appendChild(option);
			}
		}
	}
	
	month.onchange = function(){
		var mVal = Number(month.value);
		var yVal = year.value;
		day.options.length = 1;
		if(mVal != 0){
			switch(mVal){
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					getDay(31);
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					getDay(30);
					break;
				case 2:
					if((yVal % 4 == 0 && yVal % 100 != 0) || yVal % 400 == 0){
						getDay(29);
					}else{
						getDay(28);
					}
					break;
			}
		}
	}
	
	function getDay(days){
		for (var i = 1; i <= days; i++) {
			var option = new Option(i,i);
			day.appendChild(option);
		}
	}

	
	
	form.onsubmit = function(){
		console.log(unameFlag,pwdFlag,emailFlag)
		if(unameFlag && pwdFlag && emailFlag){//用户名，密码 邮箱
			return true;
		}else{
			alert("请正确填写信息");
			return false;
		}
	}
}
