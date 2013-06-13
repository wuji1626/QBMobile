// JavaScript Document
var qbHtml5mobi = {
  author: 'wuji1626',
  version: '0.5.0',
  //website: 'http://quickbundle.org/'
  website: 'http://127.0.0.1:8080/JAX/services/'
}
qbHtml5mobi.utils = {
  setParam: function(name, value){
	localStorage.setItem(name, value)  
  },
  getParam: function(name){
	return localStorage.getItem(name)  
  }
}
qbHtml5mobi.constants = {
  space:'  ',
  colon:'：',
  //单据相关
  receiptName:'单据',
  receiptDate:'单据日期',
  receiptApplicant:'申请人'
}