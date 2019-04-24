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
			//console.log($(this).children("a"))
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
			$oDiv.hide();
		});
		$search.keyup(function(){
			var $s = $("<script></script>");
			$s.appendTo("body");
			//console.log($s)
			$s.get(0).src = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$search.val()+"&cb=fn";
			//console.log($s)
		});
		
	});
	
//轮播图
	$(function(){
		var $ul = $(".banner_inner ul");
		var $li = $ul.children();
		var $slide = $(".banner_inner .slide");
		var count = 0;
		var timer = setInterval(autoPlay,3000);
		function autoPlay(){
			count++;
			if(count == $li.length) {
				count = 0;
			}
			$li.eq(count).stop().fadeIn(3000).siblings().stop().fadeOut(3000);
			$slide.children().eq(count).addClass("current").siblings().removeClass("current");
		};
		
		$ul.hover(function(){
			clearInterval(timer);
		},function(){
			timer = setInterval(autoPlay,3000);
		});
		
		$slide.children().mouseenter(function(){
			var index = 0;
			clearInterval(timer);
//			console.log($(this).index());
			$li.eq($(this).index()).stop().fadeIn(3000).siblings().stop().fadeOut(3000);
			$(this).addClass("current").siblings().removeClass("current");
			
		});
		$slide.children().mouseleave(function(){
			$(this).removeClass("current");
			timer = setInterval(autoPlay,3000);
		})
		
	});	
//滑过特效
	$(function(){
		$li = $(".item_first").children();
		
		$li.mouseenter(function(){
			$(this).addClass("active").siblings("li").removeClass("active");
		})
		$li.mouseleave(function(){
			$(this).removeClass("active");
		})
		
	});
//滑过特效2
	$(function(){
		
		$item_info = $(".item_second li a");
		
		$item_info.hover(function(){
			$(this).find(".item_info").addClass("actived").siblings().removeClass("actived");
		},function(){
			$(this).find(".item_info").removeClass("actived");
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
//数据渲染
	$(function(){
		var $more = $(".channel-more");
		$more.click(function(){
			//alert(1)
			location.href = "../html/list.html";
			$pro_list.html(str)
		})
	})
}

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