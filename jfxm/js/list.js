window.onload = function(){
	//迷你购物车
	$(function(){
		
		$("#mincart_down").hover(function(){
			$("#mincart").show();
		},function(){
			$("#mincart").hide();
		});
		
		$("#s-dropdown").hover(function(){
			$("#more").stop().slideDown();
			console.log($(this).children("a"))
		},function(){
			$("#more").stop().slideUp();
		})
		$("#more").find("a").hover(function(){
			$(this).css("color","#ca151d");
		},function(){
			$(this).css("color","#a4a4a4");
		})
	});
//搜索框
	$(function(){
		var $search = $("#search");
		var $s_key = $("#s_key");
		var $oDiv = $("#autoComplete");
		//console.log($oDiv)
		//$oDiv.show()
		$search.focus(function(){
			$s_key.hide();	
			$oDiv.show();
		});
		$search.blur(function(){
			if(!$(this).val()){
				$s_key.show();
			}
			//$oDiv.hide();
		});
		$search.keyup(function(){
			var $s = $("<script></script>");
			$s.appendTo("body");
			//console.log($s)
			$s.get(0).src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$search.val()+"&cb=fn";
			//console.log($s)
		});
		
	});
//数据渲染
	
	$(function(){
		var $pro_list = $(".pro_list");
		var $listInfo = [];
		var $li = $(".pro_list ul");
		var $sc_title = $(".sc_title");
		//console.log($li.length)
		var str = "";
		$.getJSON("../php/list.json",function(res){
			var $nameSrc = localStorage.getItem("uname");
			//console.log($nameSrc)
			//console.log(res[0].p_img)
			$listInfo = res;
			//console.log($listInfo)
			
			for (var i = 0; i < $listInfo.length; i++) {
				str += `
					<li>
						<div class="pro_panels">
							<p class="p_id" style="display:none;">${$listInfo[i].p_id}</p>
							<p class="p_img">
								<a href="../html/carts.html">
									<img src="${$listInfo[i].p_img}" />
								</a>
							</p>
							<p class="p_name">
								<a href="#">
									<span>${$listInfo[i].p_name}</span>
								</a>
							</p>
							<p class="p_price">
								<b>${$listInfo[i].p_price}</b>
							</p>
							<div class="p_button">
								<table colspan="0" border="0" rowspan="0">
									<tbody>
										<tr>
											<td>
												<i class='choose'>选购</i>
											</td>
											<td>
												<label class="p_score">
													<span>${$listInfo[i].p_val}</span>
												</label>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</li>
				`;
			}
			//console.log(str);
			$pro_list.html(str);
			
			//添加原则，找到对应的信息 添加进去
			var $choose = $(".choose");
			//console.log($(".choose"))
			$choose.click(function(){
				//var $nameSrc = localStorage.getItem("uname");
				//alert($(this).html())
				//console.log($(".p_id").html());
				//console.log(localStorage.getItem("uname"))
				var pid = $(this).parent().parent().parent().parent().parent().parent().find("p").eq(0).html();
				var arr = [
					{pid:pid,num:1}
				];
				//console.log($(this).parent().parent().parent().parent().parent().parent().find("p").eq(0).html())
				//保存的是pid 到购物车中去
				//每次保存如果pid不同，就追加到value后面去
				/*var arr = [{pid : pid}];
				var str = JSON.stringify(arr);
				localStorage.setItem("goods",str)*/;//如果这样做 后面的会覆盖前面的，如何解决？
				//如果第一次购物 购物车为空，直接添加
				//如果不是第一次 购物车存在
				if(localStorage.getItem($nameSrc+"goods")){
					//解决：在保存前 先去获取购物车中该商品的信息 再去遍历里面的pid
					//找到所有的pid 与当前点击的pid相比较 如果相等 说明存在，
					//有就在原来基础上增加一个数量
					//如果没有 在所有信息后追加一条
					var goodsStr = localStorage.getItem($nameSrc+"goods");//这里是一个字符串
					var goodsArr = JSON.parse(goodsStr);
					var hasGood = true;//表示在原购物车信息中没有这个商品 ，可以追加一条信息
					for (var i = 0; i < goodsArr.length; i++) {
						if(goodsArr[i].pid == pid){
							goodsArr[i].num += 1;
							hasGood = false;
							//因为pid是惟一的所以只有可能是这一个，所以没必要在循环下去
							break;
						}
					}
					if(hasGood) {
						goodsArr.push({pid : pid,num:1});
					}
					//把处理好的信息在保存回购物车 localstorage
						var goodsJson = JSON.stringify(goodsArr);
						localStorage.setItem($nameSrc+"goods",goodsJson);
					
				}else{//购物车为空
					var arrStr = JSON.stringify(arr);
					localStorage.setItem($nameSrc+"goods",arrStr);
				}
				computeNum();
			})
			function computeNum(){
				
				//计算数量
				//获取购物车商品所有购物信息 遍历这个信息 
				//获取每个信息的num 进行累加
				//累加得到的最后结果 赋值给 购物车图标
				var $cart = $("#cart");
				//console.log($cart)
				var goodsCart = localStorage.getItem($nameSrc+"goods");
				var goodsArr = JSON.parse(goodsCart);
				var totalNum = 0;
				if(goodsCart){
					$cart.css("display","block");
					for (var i = 0; i < goodsArr.length; i++) {
						totalNum += goodsArr[i].num;
					}
				}else {
					$sc_title.css("display","none");
				}
				$cart.html(totalNum);
			}
			computeNum();
		})
	//点击购物车 跳转到购物车页面
		var $cartBtn = $("#cartBtn");
		$cartBtn.click(function(){
			//****核心部分 就是以什么身份进来的 所以要加上用户名****
			location.href = "../html/shopping.html?uname="+localStorage.getItem("uname");
			
		})
	
	});
	//hung-bar
	$(function(){
		var $back = $(".hungBar .back");
		var $a = $(".hungBar_content a");
		$(window).scroll(function(){
			
			if($(window).scrollTop() >= 1000) {
				$back.fadeIn(500);
			}else {
				$back.fadeOut(500);
			}
		});	
		
		$a.each(function(index,ele){
			//console.log(index,ele);
			$(ele).hover(function(){
				$(this).find("span").css("display","block");
				
			},function(){
				$(this).find("span").css("display","none");
			})
		});
		
		$back.click(function(){
			$("html,body").animate({scrollTop:0},1000);
		})
		
	});
}
//搜索框
		var $oDiv = $("#autoComplete");
		function fn(res){
			//console.log(res);
			var s = res.s;
			//console.log(s)
			var str = "";
			for (var i = 0; i < s.length; i++) {
				//console.log(s[i])
				str += "<div><a href='https://www.baidu.com/s?wd="+s[i]+"'>"+s[i]+"</a></div>";
				
			}
			//console.log(str)
			$oDiv.html(str);
		}
