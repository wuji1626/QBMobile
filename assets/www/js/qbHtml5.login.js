// JavaScript Document
function changepage(){
  window.location.href = "login.html";	
}
$('#load_index').live("pagecreate", function(){
  var id = setInterval("changepage()", 3000);											
})
$(document).ready(function(){
			$.mobile.ajaxLinksEnabled = false;
});

$(document).bind('pagecreate',function(){

			$("#btnSub").bind( "tap", function(event, ui) {
				var userName = document.getElementById("userName").value;
				var userPass = document.getElementById("userPass").value;
				console.warn(userName + "," + userPass + "<br/>");
				$.ajax( {
					async:false,
					type:'GET',
					dataType: 'jsonp',
					jsonp: 'jsoncallback', //默认callback
					url : qbHtml5mobi.website + 'loginUser',
					data : {"userName":userName,"userPass":userPass},
					contentType:'application/json',
					error : function(msg) {
						alert(msg.statusText);
					},
					success : function(data) {
						$("#result").html(data.name+"登录成功<br/>").css("color", "red");
						//记录登录信息
						qbHtml5mobi.utils.setParam('user_name',data.name);
						alert(data.name);
						window.location.href = "index.html";
						//.append(data[0].userName+"<br/>").css("color", "red");
					}
				});	
			});
		});