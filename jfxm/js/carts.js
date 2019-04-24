//迷你购物车
window.onload = function(){
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
//标题固定
	$(function(){
		
		$(window).scroll(function(){
			
			if($("html,body").scrollTop() >= 829) {
				$(".product_tab").css("position","fixed");
				$(".pictures").css("marginTop",97);
				$(".product_tab p").css({
					"paddingTop" : 11,
					"paddingRight" : 0,
					"paddingBottom" : 12,
					"paddingLeft" : 0
				});
				$(".product_tab_btn").css("display","block");
			}else {
				$(".product_tab").css("position","relative");
				$(".pictures").css("top",0);
				$(".product_tab_btn").css("display","none");
			}	
		})
	});
//收起参数详情
	$(function(){
		var $flag = true;
		var $btn = $(".format_hide_btn");
		$btn.click(function(){
			if($flag){
				
				$(".pictures").css("max-height",10000);
				$(this).html("收起参数详情");
				$flag = false;
			}else {
				$(".pictures").css("max-height",1874);
				$(this).html("查看全部参数");
				$flag = true;
			}
		})
		
		var $paramFlag = true;
		$(".param_hide_btn").click(function(){
			//alert(1)
			if($paramFlag){
				$(".format").css("max-height",5000);
				$(this).html("收起参数详情");
				$paramFlag = false;
			}else{
				$(".format").css("max-height",503);
				$(this).html("查看全部参数");
				$paramFlag = true;
			}
			
		})
		
	});
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
			if($(window).scrollTop() <= 100) {
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
//商品放大
	$(function(){
		var $mousetrap = $(".mousetrap");
		var $small = $mousetrap.prev().children(".cloud_zoom_lens");
		var $big = $mousetrap.next();
		$mousetrap.mouseenter(function(){
			$(".cloud_zoom_lens").css("display","block");
			$(".cloud-zoom-big").css("display","block");
		});
		$mousetrap.mouseleave(function(){
			$(".cloud_zoom_lens").css("display","none");
			$(".cloud-zoom-big").css("display","none");
		});
		//鼠标在$mousetrap上移动
		$mousetrap.mousemove(function(e){
			var l = e.offsetX;
			var t = e.offsetY;
			var maxL = $mousetrap.width() - $small.width();
			var maxT = $mousetrap.height() - $small.height();
			$small[0].style.left = l - $small.width()/2 + "px";
			$small[0].style.top = t - $small.height()/2 + "px";
			var x = parseInt($small[0].style.left);
			var y = parseInt($small[0].style.top);
			x = x < 0 ? 0 : (x > maxL ? maxL : x);
			y = y < 0 ? 0 : (y > maxT ? maxT : y);
			$small[0].style.left = x + "px";
			$small[0].style.top = y + "px";
			var $bigL = 2*x;
			var $bigT = 2*y;
			$big.children()[0].style.left = -$bigL + "px";
			$big.children()[0].style.top = -$bigT + "px";
			
		})
		var arr = [
		"../images/bigImg1.png",
		"../images/bigImg2.png",
		"../images/bigImg3.png",
		"../images/bigImg4.png",
		"../images/bigImg6.png",
		"../images/bigImg7.png",
		"../images/bigImg8.png"
		];
		var brr = [
			["【老用户专享】HUAWEI Mate 20 6GB+64GB 全网通版（亮黑色）","￥3999"],
			["HUAWEI Mate 20 Pro (UD) 8GB+128GB 全网通版（翡冷翠）","￥5999"],
			["HUAWEI P20 6GB+64GB 全网通版（极光色）","￥3388"],
			["华为 HUAWEI nova 4 4800万超广角三摄 高配 8GB+128GB 全网通版（贝母白）","￥3399"],
			["华为畅享9 Plus 4GB+128GB 全网通版（樱语粉）","￥1699"],
			["HUAWEI nova 3 6GB+128GB 全网通版（亮黑色）","￥2399"],
			["华为畅享8 Plus 4GB+64GB 全网通版（金色）","￥1499"]
		];
		$li = $(".thumb").children();
		
		//下面导航的小图 a
		var $li = $(".thumb").children();
		//小蒙版图 和大蒙版图
		var $smallImg = $(".cloud_zoom").children("img");
		var $bigImg = $(".cloud-zoom-big").children();
//		console.log($smallImg.attr("src"),$bigImg[0].src)
		$li.hover(function(){
			$(this).children("a").css("borderColor","#ca141d");
			//console.log(arr[$(this).index()]);
			$smallImg.attr("src",arr[$(this).index()]);
			$bigImg.attr("src",arr[$(this).index()]);
			$(".note").html(brr[$(this).index()][0]);
			$(".n_price").html(brr[$(this).index()][1]);
			//console.log($(this).index())
		},function(){//
			$(this).children("a").css("borderColor","#fff");
			
		});
		//左右滑动
		var $prev = $(".img_prev");
		var $next = $(".img_next");
		var index = 1;
		$prev.click(function(){
			
			if(index == 0){
				index = 0;
			}else{
				index--;
			};
			$(".thumb").animate({
				left : -74*index
			})
			
		});
		$next.click(function(){
			//alert(2)
			$(".thumb").animate({
				left : -74*index
			})
			if(index == 2) {
				index = 2;
			}else {
				index++;
			}
		})
		
		
	});
}
