// JavaScript Document
var myReceipt = null;
$(document).ready(function(){
			$.mobile.ajaxLinksEnabled = false;
});

$(document).bind('pagecreate',function(){
			var id = qbHtml5mobi.utils.getParam('receipt_id');
			var userName = "";
			var receiptFrom = "";
			var receiptTo = "";
			console.info(id);
			if(id != null && id.length>0){
				$.ajax( {
					async:false,
					type:'GET',
					dataType: 'jsonp',
					jsonp: 'jsoncallback', //默认callback
					url : 'http://127.0.0.1:8080/JAX/services/userService/getReceiptInfo',
					data : {"receiptApplicant":userName,
							"receiptNum":id,
							"receiptFrom":receiptFrom,
							"receiptTo":receiptTo
							},
					contentType:'application/json',
					error : function(msg) {
						alert(msg.statusText);
					},
					success : function(data) {
						myReceipt = data;
						//记录登录信息
						//.append(data[0].userName+"<br/>").css("color", "red");
				        var receiptApplicant = document.getElementById("receiptApplicant");
				        var receiptDate = document.getElementById("receiptDate");
						var receiptTitle = document.getElementById("receiptTitle");
						var receiptDetail = document.getElementById("receiptDetail");
						console.info(myReceipt);
						receiptApplicant.value = myReceipt.receiptApplicant;
						receiptApplicant.disabled='disabled';
						receiptDate.value = myReceipt.receiptDate;
						receiptTitle.value = myReceipt.receiptTitle;
						receiptDetail.value = myReceipt.receiptDetail;
					}
				});		
			}else{
				var receiptApplicant = document.getElementById("receiptApplicant");
				var receiptDate = document.getElementById("receiptDate");
				var receiptTitle = document.getElementById("receiptTitle");
				var receiptDetail = document.getElementById("receiptDetail");
				receiptApplicant.value = qbHtml5mobi.utils.getParam('user_name');
				receiptApplicant.disabled='disabled';
				receiptDate.value = "";
				receiptTitle.value = "";
				receiptDetail.value = "";
			}
			$("#btnSub").bind( "tap", function(event, ui) {
                var receiptApplicant = document.getElementById("receiptApplicant").value;
				var receiptDate = document.getElementById("receiptDate").value;
				var receiptTitle = document.getElementById("receiptTitle").value;
				var receiptDetail = document.getElementById("receiptDetail").value;
				console.info(userName);
				$.ajax( {
					async:false,
					type:'GET',
					dataType: 'jsonp',
					jsonp: 'jsoncallback', //默认callback
					url : 'http://127.0.0.1:9090/JAX/services/userService/saveReceiptInfo',
					data : {"receiptApplicant":receiptApplicant,
							"receiptDate":receiptDate,
							"receiptTitle":receiptTitle,
							"receiptDetail":receiptDetail
							},
					contentType:'application/json',
					error : function(msg) {
						alert(msg.statusText);
					},
					success : function(data) {
						myReceipt = data;
						alert(myReceipt);
						window.location.href = "index.html";
						//记录登录信息
						//.append(data[0].userName+"<br/>").css("color", "red");
					}
				});	
			});
			$("#btnCancel").bind( "tap", function(event, ui) {
				window.location.href = "index.html";						   
			});
});