(function(){
 var Csetting={
   "qtype":["成語","世界名人"],
   "qdata":[["老當易壯","五體投地","唇亡齒寒","掩耳盜鈴","好山好水"],["劉德華","特斯拉","成吉思汗","金正恩","川普","希拉蕊","諸葛亮"]],
   "time":60,
   "round":2,   
   "score":[3,2,1]
 }
//////////////////////////////0：等待大廳 1：開始 :2:結束一輪/////////////////////////////////////////////
 var MessageC ={
   "uIdx":-1,  
   "user":null,
   "askToUser":{"type":null,"data":null},
   "time":0, 
   "round":0,
   "status":0,
   "rUserCount":0,
   "rUser":null
 }
 exports.getContent = function(){
	 return {
       "cfg":Csetting,  
       "info":MessageC 
	 };
  }
}())