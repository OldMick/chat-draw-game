!function(){function i(t,s){this.srv=t,this.so=s,this.user={uname:null,level:0,score:0},this.bindEvent()}i.prototype={toString:function(){return"[uname:"+this.user.uname+",sid:"+this.so.id+"]"},bindEvent:function(){if(this.so){var i=this;this.so.on("disconnect",function(){i.doDisconnect()}),this.so.on("login",function(t,s){i.doLogin(t,s)}),this.so.on("gameStart",function(t,s){i.doGameStart(t,s)}),this.so.on("message",function(t){i.doMsg(t)}),this.so.on("startDraw",function(t){i.broadcastStartDraw(t)}),this.so.on("drawing",function(t){i.broadcastDrawing(t)}),this.so.on("paintUpdate",function(t){i.broadcastPaintUpdate(t)}),this.so.on("exit",function(){i.doExit()})}},doDisconnect:function(){this.srv.removeClientByID(this.so.id),this.srv.updateUserInfo()},doGameStart:function(t,s){this.srv.startGameRound(),s()},doLogin:function(t,s){if(t)if(this.user.uname=t.uname,this.srv.allUserEnter(this)){var i=1;0!=this.srv.info.status&&(i=2),s(i),this.so.disconnect("unauthorized"),this.srv.removeClientByID(this.so.id)}else s(0),this.srv.updateUserInfo()},doMsg:function(t){var s=t;if(1==this.srv.info.status&&this.srv.isRightAnswer(s)){s="*";var i=this.srv.getAward(this.user);if(0<i){var n=[];this.user.score+=i,n.push({user:this.user,awd:i}),1==this.srv.info.rUserCount&&(this.srv.info.user.score+=3,n.push({user:this.srv.info.user,awd:3})),this.srv.broadcastEvent("award",n)}}this.srv.broadcastMsg("玩家"+this.user.uname+"說:"+s)},broadcastStartDraw:function(t){this.so.broadcast.emit("startDraw",t)},broadcastDrawing:function(t){this.so.broadcast.emit("drawing",t)},broadcastPaintUpdate:function(t){this.so.broadcast.emit("paintUpdate",t)},doExit:function(){}},exports.newClient=function(t,s){return new i(t,s)}}();