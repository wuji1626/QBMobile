// JavaScript Document
//首页创建事件
  var $strSubStr = "";
  var myReceipt = null;
  var result = null;

$(document).ready(function(){
			$.mobile.ajaxLinksEnabled = false;
});

$(document).bind('pagecreate',function(){

			$("#searchreceipt").bind( "tap", function(event, ui) {
                var userName = qbHtml5mobi.utils.getParam('user_name');
				var receiptNum = "";
				var receiptFrom = "";
				var receiptTo = "";
				console.info(userName);
				$.ajax( {
					async:false,
					type:'GET',
					dataType: 'jsonp',
					jsonp: 'jsoncallback', //默认callback
					url : qbHtml5mobi.website + 'getReceiptInfo',
					data : {"receiptApplicant":userName,
							"receiptNum":receiptNum,
							"receiptFrom":receiptFrom,
							"receiptTo":receiptTo
							},
					contentType:'application/json',
					error : function(msg) {
						alert(msg.statusText);
					},
					success : function(data) {
						myReceipt = data;
						formatReceiptList(myReceipt);
						//记录登录信息
						//.append(data[0].userName+"<br/>").css("color", "red");
					}
				});	
			});
			$("#newreceipt").bind( "tap", function(event, ui) {
			    qbHtml5mobi.utils.setParam('receipt_id',"");	
				window.location.href = "newreceipt.html";
			});
});

function formatReceiptList(data){
	$("#result").append("<ul data-role='listview' data-dividertheme='e'>");
  	for(var i=0; i < data.length;i++){
		var li = "<li class='lst' data-icon='false' >" + 
		"<a href='#' data-ajax='false' style='margin:0px;padding:0px 0px 0px 55px' onclick='changeToReceiptEdit(" +data[i].receiptNum+ ")'>" +
		"<font size=2>" + 
		//申请人
		qbHtml5mobi.constants.receiptApplicant + qbHtml5mobi.constants.colon + data[i].receiptApplicant + qbHtml5mobi.constants.space +
		//单据
		qbHtml5mobi.constants.receiptName + qbHtml5mobi.constants.colon + data[i].receiptTitle + qbHtml5mobi.constants.space +
		//单据日期
		qbHtml5mobi.constants.receiptDate + qbHtml5mobi.constants.colon + data[i].receiptDate + "</font></a>" +
		"<a href='#' onclick='deleteReceipt(" + data[i].receiptNum + ")'><img src='images/delete.png' /></a>" +
		"</li>";
		$("#result").append(li);
	}
	$("#result").append("</ul>");
}
function changeToReceiptEdit(id){
  	qbHtml5mobi.utils.setParam('receipt_id',id);
	window.location.href = "newreceipt.html";
}
function deleteReceipt(id){
	$.ajax( {
					async:false,
					type:'GET',
					dataType: 'jsonp',
					jsonp: 'jsoncallback', //默认callback
					url : qbHtml5mobi.website + 'deleteReceiptInfo',
					data : {"receiptNum":id},
					contentType:'application/json',
					error : function(msg) {
						alert(msg.statusText);
					},
					success : function(data) {
						alert(data);
					    window.location.href = "index.html";
					}
				});	
}