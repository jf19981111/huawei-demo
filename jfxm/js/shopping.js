window.onload = function(){
//二级菜单
	$(function(){
		
		$("#s-dropdown").hover(function(){
			$("#more").stop().slideDown();
			//console.log($(this).children("a"))
		},function(){
			$("#more").stop().slideUp();
		})
		$("#more").find("a").hover(function(){
			$(this).css("color","#ca151d");
		},function(){
			$(this).css("color","#a4a4a4");
		});
		
		
	});
//搜索
	var search = document.getElementById("search");
	var s_key = document.getElementById("s_key");
	var oDiv = document.getElementById("autoComplete");
	//console.log(oDiv)
	search.onfocus = function(){
		s_key.style.display = "none";	
		oDiv.style.display = "block";
	}
	search.onblur = function(){
		if(!this.value){
			s_key.style.display = "block";	
		}
		oDiv.style.display = "none";
	}
	search.onkeyup = function(){
		var s = document.createElement("script");
		document.body.appendChild(s);
		s.src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+this.value+"&cb=fn";
	}
	function fn(res){
		var s = res.s;
		var str = "";
		for (var i = 0; i < s.length; i++) {
			str += "<div><a href='https://www.baidu.com/s?wd="+s[i]+"'>"+s[i]+"</a></div>";
			
		}
		oDiv.innerHTML = str;
	}
//hung-bar
	$(function(){
		var $back = $(".hungBar .back");
		var $a = $(".hungBar_content a");
		var $all = $(".all");
		$(window).scroll(function(){
			
			if($(window).scrollTop() >= 1000) {
				$back.fadeIn(500);
				
			}else {
				$back.fadeOut(500);
				
				
			}
			if($(window).scrollTop() <= 400) {
				$all.addClass("sc-total-fixed");
			}else{
				$all.removeClass("sc-total-fixed");
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
	
//商品渲染
	$(function(){
		//从购物车localstorage中拿到所有的信息
		//从数据库中拿到所有的商品信息
		//对比localstorage中pid与商品中的pid 如果找到同一对应商品的所有信息，添加到页面中显示
//		商品渲染
		//var $wares = $(".wares");
		//console.log($wares);
		var str = "";
		
		new ShowCarts().init();
		var $nameSrc = localStorage.getItem("uname");
		var $sc_title = $(".sc_title");
		//console.log($sc_title)
		function computeNum(){
				var $cart = $("#cart");
				var goodsCart = localStorage.getItem($nameSrc+"goods");
				var goodsArr = JSON.parse(goodsCart);
				var totalNum = 0;
				if(goodsCart){
					//$cart.css("display","block");
					$sc_title.css("display","block");
					for (var i = 0; i < goodsArr.length; i++) {
						totalNum += goodsArr[i].num;
					}
				}else {
					$cart.css("display","none");
				}
				$cart.html(totalNum);
		}
		computeNum();
		function ShowCarts(){
			//computeNum();
			if(!ShowCarts.property){
				ShowCarts.property = {
					wares : $(".wares"),
					empty : $("#empty"),
					userName : decodeURI(location.search.split("=")[1]),
					cartsInfo : [],
					goodsInfo : [],
					init : function(){
						//从购物车中把信息加载出来
						//从数据库中拿到商品信息
						//添加到页面显示
						this.getCarts();
						this.getGoodsInfo();
					},
					getCarts : function(){
						//console.log(this.userName)
						//console.log(empty)
						//console.log(localStorage.getItem(this.userName+"goods"));
						if(localStorage.getItem(this.userName+"goods")){
							var cartsStr = localStorage.getItem(this.userName+"goods");
							//把购物车的信息保存下来
							this.cartsInfo = JSON.parse(cartsStr);
							
							
							empty.style.display = "none";
							
						}else{
							empty.style.display = "block";
						}
					},
					getGoodsInfo : function(){//从数据库中拿到所有的商品信息
						$.getJSON("../php/list.json","json",function(res){
							this.goodsInfo = res;
							//把所有商品信息添加到this.wares
							this.showInfo();
							
						}.bind(this));
						
					},
					showInfo : function(){
						/*console.log(this.cartsInfo)
						console.log(this.goodsInfo)*/
						var str = "";
						//显示商品信息页面
						//对比localstorage中pid与商品中的pid 如果找到同一对应商品的所有信息，添加到页面中显示
						
						for (var i = 0; i < this.goodsInfo.length; i++) {
							for(var j = 0; j < this.cartsInfo.length; j++){
								//console.log(this.goodsInfo)
								if(this.goodsInfo[i].p_id === this.cartsInfo[j].pid){
									//console.log(typeof this.cartsInfo[j].num)
									//console.log (this.goodsInfo[i].p_price * this.cartsInfo[j].num)
									str += `
									
										
										<form method="get">
											<div class="sc_pro">
												<div>
													<div class="sc_pro_list clearfix">
														<label class="checkBox">
															<input class="p_id" type="hidden" value="${this.goodsInfo[i].p_id}"/>
															<input class="checkOne" type="checkbox" readonly="readonly" />
														</label>
														<div class="sc_pro_area">
															<div class="pro_main clearfix">
																<a class="p_img">
																	<img src="${this.goodsInfo[i].p_img}" />
																</a>
																<ul>
																	<li>
																		<a href="#" class="p_name">${this.goodsInfo[i].p_name}</a>
																	</li>
																	<li>
																		<div class="sc_price">
																			<span class="gPrice">${this.goodsInfo[i].p_price}</span>
																		</div>
																	</li>
																	<li>
																		<div class="p_stock">
																			<div class="p_stock_area">
																				<input type="text" value="${this.cartsInfo[j].num}" class="p_text gCount"/>
																				<p class="p_stock_btn">
																					<a class="jia" href="javascript:;">+</a>
																					<a class="jian" href="javascript:;" class="disabled">-</a>
																				</p>
																			</div>
																		</div>
																	</li>
																	<li class="sc_price_total">
																		￥<span class = gTotalPrice>${Number(this.goodsInfo[i].p_price) * Number(this.cartsInfo[j].num)}</span>
																	</li>
																	<li class="del">
																		<a href="javascript:;" class="p_del">删除</a>
																	</li>
																</ul>
															</div>
														</div>
													</div>
												</div>
												
											</div>	
										</form>
									`;
								}
							}
						}
						
						//console.log(str);
						//console.log($(".checkBox.p_id"))
						this.wares.after(str);
						//实现购物车增删改
						new SelectGoods().init();
						
					}
				}
			}
			return ShowCarts.property;
		}
		
		function SelectGoods(){//构造函数
			//这个是所有的input框
			this.c1 = $(".c1");//全选按钮（c1按钮）//是下面那个
			this.c2 = $(".c2");//c2按钮//是上面那个
			this.delAll = $(".delAll");//删除所有
			this.p_del = $(".p_del");//d单个删除
			this.totalPrice = $(".totalPrice");//总计
			this.totalCount = $(".totalCount");//选择的数量
			this.checkOne = $(".checkOne");//单个的选择
			this.compute = new Compute();//构造函数 计算的实例对象
			this.jia = $(".jia");//获取加
			this.jian = $(".jian");//获取减
			//console.log($(".p_del"))
			
			
		}
		
		
		SelectGoods.prototype.init = function(){//初始化
			/*$(".p_del").click(function(){
				//alert(1)
				//console.log($(this).parents().eq(4))
				$(this).parents().eq(4).remove()
			});*/
			//选中所有
			this.selectAll(); 
			//选中单个
			this.selectOne();
			//删除所选
			this.removeSelected();
			//加一的操作
			this.addOne();
			//减一的操作
			this.reduceOne();
			this.delOne();
		}
		SelectGoods.prototype.selectAll = function(){//选中所有的操作
			var _this = this;
			//点击全选按钮
			this.c1.click(function(){
				
				_this.checkOne.prop("checked",$(this).prop("checked"));
				_this.c2.prop("checked",$(this).prop("checked"));
				_this.calculate();
				
			});
			this.c2.click(function(){
				_this.checkOne.prop("checked",$(this).prop("checked"));
				_this.c1.prop("checked",$(this).prop("checked"));
				_this.calculate();
				//console.log(count,price);
				
			});
		
		};
		
		SelectGoods.prototype.selectOne = function(){//单个商品选中操作
			var _this = this;
			//遍历所有的单个商品
			this.checkOne.click(function(){
				
				var flag = false;
				//alert(1)
				//只要选中了所有 全选按钮就要选中 
				//只要有一个未选中状态 全选按钮未选中状态
				//alert(1);
				//*******$(item).eq(index)//这个写法是错误的 因为each遍历的时候 已经可以获取到当前元素
				//*******所以 直接用$(item)即可******
				
				_this.checkOne.each(function(index,item){
					//console.log(index,item,$(item).eq(index).prop("checked"))
					//console.log($(item).eq())
					if($(item).prop("checked")){//表示选中状态
					//console.log($(this).parent().next().children().find("ul").children().eq(4).children())
						flag = true;
					}else {//
						flag = false;
						return false;
					}
				})
				//console.log(flag)
				_this.c1.prop("checked",flag);
				_this.c2.prop("checked",flag);
				_this.calculate();
			})
		};
		SelectGoods.prototype.calculate = function(){//计算操作
			var capitalCount = this.compute.computeCountAndPrice("count");	//单个数量
			var capitalPrice = this.compute.computeCountAndPrice("price");	//单个价格
			var pTotal = $(this).parent().parent().parent().parent().next().find(".gTotalPrice");
			var p_id = $(this).parent().parent().parent().parent().parent().parent().parent().prev().eq(0).children().eq(0).val();
			this.totalPrice.html(capitalPrice);//单个商品总价
			this.totalCount.html(capitalCount);//选中的数量
			
			
		};
		
		SelectGoods.prototype.addOne = function(){//加法操作
			var _this = this;
			this.jia.click(function(){
				//alert(1)
				//在当前商品中的数量要加1，同时当前商品的价格也要加上
				//console.log($(this).parent().parent().parent().parent().parent().parent().parent().prev().eq(0).children().eq(0).val())
				//console.log($(this).parent().prev().val())
				//console.log($(this).parent().parent().parent().parent().prev().find(".gPrice").html())
				var count = $(this).parent().prev();
				var price = $(this).parent().parent().parent().parent().prev().find(".gPrice");
				var pTotal = $(this).parent().parent().parent().parent().next().find(".gTotalPrice");
				var p_id = $(this).parent().parent().parent().parent().parent().parent().parent().prev().eq(0).children().eq(0).val();
				//console.log(p_id)
				count.val(Number(count.val())+1);
				pTotal.html(Number(count.val()) * Number(price.html()));
				
				//更新localstorage
				_this.compute.updateCarts(p_id,1);
				//console.log($(".checkBox .p_id").val())
					
				
				
				
				_this.calculate();
			});
		};
		SelectGoods.prototype.reduceOne = function(){//减法操作
			var _this = this;
			this.jian.click(function(){
				//alert(2)
				//console.log($(".gCount").val())
				//在当前商品中的数量要减1，同时当前商品的价格也要减掉一个商品的价格
				var count = $(this).parent().prev();//单个商品的数量值
				var price = $(this).parent().parent().parent().parent().prev().find(".gPrice");//单价
				var pTotal = $(this).parent().parent().parent().parent().next().find(".gTotalPrice");//单个商品的总价
				var p_id = $(this).parent().parent().parent().parent().parent().parent().parent().prev().eq(0).children().eq(0).val();
					if(count.val() <= 1){
						$(this).css("cursor","not-allowed");
//						count.val("1");
//						price.html(price.html())
						_this.compute.updateCarts(p_id);
					}else {
						count.val(Number(count.val())-1);
						pTotal.html(Number(count.val()) * Number(price.html()));
						//更新localstorage
						_this.compute.updateCarts(p_id,-1);
						$(this).css("cursor","pointer");
						
					}
					
				_this.calculate();
			});
			//鼠标滑过改变指针样式
			this.jian.mouseenter(function(){
				var count = $(this).parent().prev();
				var price = $(this).parent().parent().parent().parent().prev().find(".gPrice");
				var pTotal = $(this).parent().parent().parent().parent().next().find(".gTotalPrice");
				var p_id = $(this).parent().parent().parent().parent().parent().parent().parent().prev().eq(0).children().eq(0).val();
				if(count.val() <= 1){
					$(this).css("cursor","not-allowed");
				}else {
					$(this).css("cursor","pointer");
				}
			})
		};
		//var p_del = $(this).parent().next().children().find("ul").children().eq(4).children();
		//单个商品删除操作
		SelectGoods.prototype.delOne = function(){
			var _this = this;
			//var userName = decodeURI(location.search.split("=")[1]);
			//console.log(userName)
			//var shoppingStr = localStorage.getItem(this.userName+"goods");
			//console.log(localStorage.getItem(this.userName+"goods"))//购物车中的pid
			//var shoppingArr = JSON.parse(shoppingStr);
			this.p_del.each(function(index,item){
				$(item).click(function(){
					//alert(1)
					var p_id = $(item).parents().eq(4).children().eq(0).children().eq(0).val();
					//console.log($(item).parents().eq(4).children().eq(0).children().eq(0))
					$(this).parents().eq(4).remove();
					_this.compute.updateCarts(p_id);
					_this.totalPrice.html(0)
					_this.totalCount.html(0)
					
				})
			})
		};
		//删除所有操作
		SelectGoods.prototype.removeSelected = function(){
			var _this = this;
			userName = decodeURI(location.search.split("=")[1]);
			this.delAll.click(function(){
				var shoppingStr = localStorage.getItem(this.userName+"goods");
				console.log(shoppingStr)//购物车中的pid
				//var shoppingArr = JSON.parse(shoppingStr);
				//alert(1)
				//删除所选
				_this.checkOne.each(function(index,item){
					if($(item).prop("checked")){
						var p_id = $(item).parents(".checkBox").children().eq(0).val();
						_this.compute.updateCarts(p_id);
						//console.log($(item).parents());
						$(item).parents().eq(4).remove();
						_this.totalPrice.html(0)
						_this.totalCount.html(0)
						//console.log($(item).parents(".checkBox").children().eq(0).val())
					}
				})
			})
		}
		
		
		//	计算类
		function Compute(){
			if(!Compute.property){
				Compute.property = {
						p_id : $(".p_id"),
						checkOne : $(".checkOne"),
						gCount : $(".gCount"),//单个数量
						gPrice : $(".gPrice"),//单价
						gTotalPrice : $(".gTotalPrice"),//单个商品的总价
						totalPrice : $(".totalPrice"),//全选的总价
						totalCount : $(".totalCount"),//全选的数量
						userName : decodeURI(location.search.split("=")[1]),
						computeCountAndPrice : function(type){
							//重新获取一下节点
							this.checkOne = $(".checkOne");
							this.gCount = $(".gCount");//单个数量
							this.gPrice = $(".gPrice");//单价
							this.gTotalPrice = $(".gTotalPrice");//单个商品的总价
							var _this = this;
							var sum = 0;
							
							//遍历所有单个商品，只要有选中的 把其中的count累加起来，在把price累加起来
							//最后返回一个累加后的结果
							//console.log(this.checkOne)
							this.checkOne.each(function(index,item){
								
								if($(item).prop("checked")){
									if(type == "count"){
										//console.log(_this.totalCount.html())
										sum += parseInt(_this.gCount.eq(index).val());
										//console.log(sum)
									}else if(type == "price") {
										//bug 要拿到对应的下标来进行计算 所以要用eq(index)
										sum += parseInt(_this.gTotalPrice.eq(index).html());
										//console.log(_this.gPrice.html())
									}
								}
							})
							return sum;
						},
						updateCarts : function(p_id,num){
							//var _this = this;
							//console.log(del)
							//console.log(p_id,num)
							//拿到购物车的信息arr
							var shoppingStr = localStorage.getItem(this.userName+"goods");
							//console.log(shoppingStr)//购物车中的pid
							var shoppingArr = JSON.parse(shoppingStr);
							//根据pid进行更新
							for (var i = 0; i < shoppingArr.length; i++) {
								//console.log(shoppingArr[i].num)
								if(shoppingArr[i].pid == p_id){//pid唯一性
									//console.log(shoppingArr[i].pid)
									//如果说传递了num来，说明要做数量的更新操作
									//如果没由num，意思是要做删除pid这条信息
									if(num){
										shoppingArr[i].num += num;
									}else{
										
										shoppingArr.splice(i,1)
									}
									//console.log(shoppingArr[i].num)
									//***注意 不能用return退出循环 要不然不能实现更新******
									break;
								}
							}
							var shoopingJson = JSON.stringify(shoppingArr);
							localStorage.setItem(this.userName+"goods",shoopingJson);
							//点击这个商品是 要传递过来一个pid
							//这个pid 要与购物车的pid进行比较
							//只要匹配了，就把匹配的这条信息中的num进行更新
							
						}
				}
			}
			return Compute.property;
		}
	
	
	
	})

}
