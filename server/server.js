!function(){function t(){this.io=null,this.clients=[],this.tHand=null,this.info=null,this.cfg=null}var n=require("./client"),i=require("./data"),s=require("http");t.prototype={listen:function(t){var n=s.createServer(function(t,n){});this.io=require("socket.io").listen(n),this.io.set("log level",1),n.listen(t),this.bindEvent(),this.info=i.getContent().info,this.cfg=i.getContent().cfg},bindEvent:function(){var n=this;this.io.sockets.on("connection",function(t){n.doConnect(t)})},doConnect:function(t){this.addClient(t)},addClient:function(t){console.log("add new client:"+t.id),this.clients.push(n.newClient(this,t))},removeClientByID:function(t){for(var n=-1,i=0;i<this.clients.length;i++)if(this.clients[i].so.id==t){n=i;break}-1!=n&&this.clients.splice(n,1),0!=this.info.status&&0==this.clients.length&&(clearInterval(this.tHand),this.resetGameInfo())},allUserEnter:function(t){for(var n=0;n<this.clients.length;n++)if(t!=this.clients[n]&&this.clients[n].user.uname==t.user.uname)return!0;return!1},toAllPlayers:function(){for(var t=[],n=0;n<this.clients.length;n++)t.push(this.clients[n].user);return t},broadcastMsg:function(t){this.io.sockets.send(t)},broadcastEvent:function(t,n){this.io.sockets.emit(t,n)},updateUserInfo:function(){var t=this.toAllPlayers();0!=t.length&&this.broadcastEvent("updateUserInfo",t)},isRightAnswer:function(t){return t==this.info.askToUser.data},getRandQuestion:function(){var t=Math.random()*this.cfg.qtype.length|0,n=Math.random()*this.cfg.qdata[t].length|0;return{type:this.cfg.qtype[t],data:this.cfg.qdata[t][n]}},getNextUser:function(){if(0==this.clients.length)return null;var t=++this.info.uIdx%this.clients.length;return this.info.uIdx=t,this.clients[t].user},resetGameInfo:function(){var t=this.info;t.time=0,t.round=0,t.uIdx=-1,t.user=null,t.askToUser={type:null,data:null},t.status=0,t.rUserCount=0,t.rUser=null},processQuestion:function(){this.isQuestionOver()?this.endQuestion():this.broadcastEvent("processQuestion",{time:this.cfg.time-this.info.time}),8==this.info.time?this.broadcastEvent("hint",this.info.askToUser.data.length+"個字"):16==this.info.time&&this.broadcastEvent("hint","類型:"+this.info.askToUser.type)},startGameRound:function(){this.info.round!=this.cfg.round?(this.info.status=1,this.info.round++,this.broadcastMsg("--第"+this.info.round+"回合開始--"),this.startQuestion()):this.endGameRound()},startQuestion:function(){var t=this.info;t.time=0,t.status=1,t.askToUser=this.getRandQuestion(),t.user=this.getNextUser(),t.rUserCount=0,t.rUser=null,this.broadcastEvent("startQuestion",[t,this.cfg.time,this.cfg.round]),this.doQuestionReady()},doQuestionReady:function(){var t=5,n=this;this.io.sockets.emit("questionReady",t),this.tHand=setInterval(function(){t<0?(clearInterval(n.tHand),n.tHand=setInterval(function(){n.info.time++,n.processQuestion()},1e3)):n.io.sockets.emit("questionReady",--t)},1e3)},isQuestionOver:function(){return 1==this.info.status&&(this.isAllRight()||this.info.time==this.cfg.time)},endQuestion:function(){var t=this;clearInterval(this.tHand),this.info.status=2;var n=3;this.broadcastEvent("endquestion"),t.tHand=setInterval(function(){0==--n&&(t.info.uIdx!=t.clients.length-1?t.startQuestion():t.startGameRound())},1e3)},endGameRound:function(){clearInterval(this.tHand),this.resetGameInfo(),this.broadcastEvent("gameover",this.toAllPlayers())},isAllRight:function(){return this.clients.length-1==this.info.rUserCount},getAward:function(t){var n=0;return t.uname!=this.info.user.uname&&(this.info.rUserCount++,n=1==this.info.rUserCount?2:1),n}},(new t).listen(9e3)}();
console.log('page start here');

const http = require('http');
const url = require('url');

//connection settings
//a port is an end point of communication
const port = 3000;
//hostname: IP which is associated with any device connected to a computer network
const hostname = '127.0.0.1'; //localhost

const cars = [
    {
        make: 'Audi',
        model: 'A3',
        year: '2015',
        price: 10000,
        transmission: 'Automatic',
        url: `https://images.pexels.com/photos/2394/lights-clouds-dark-car.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`
    },
    {
        make: 'Mercedes',
        model: 'B Class',
        year: '2018',
        price: 20000,
        transmission: 'Manual',
        url: `https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`
    },
    {
        make: 'Ford',
        model: 'Focus',
        year: '2018',
        price: 13000,
        transmission: 'Manual',
        url: `https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`
    }
];

//callback function to be executed when a user makes a request to our server
const respond = (request, response) => {
    if(request.url !== '/favicon.ico'){
        console.log(request.url);
        const query = url.parse(request.url, true).query;
        console.log(query);
        const pathname = url.parse(request.url, true).pathname;  
        console.log(pathname);

        //response.setHeader(header name, value)
        response.setHeader('Content-Type', 'text/plain');
        //writeHead(status code, {headers})
        response.writeHead(200, {'Content-Type': 'text/html'});
        //response.write sends the body of the response
        response.write(`
<html>
<head>
<script src="./jquery.js" charset="utf-8"></script>
<script src="./client.js" charset="utf-8"></script>
<script src="./socket.io.js" charset="utf-8"></script>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<title>你畫我猜</title>
<link href="images/CSS.css" rel="stylesheet" type="text/css">
</head>
<body>
<div id="EntryPoint">
</div>
<div id="main" class="main">
</div>
<div id="msg"></div>
</body>
<script src="./ui_dat.js" charset="utf-8"></script>
<script src="./canvasAct.js" charset="utf-8"></script>
<script src="./controlUImethod.js" charset="utf-8"></script>
</html>`)}

};

//create a server
const server = http.createServer(respond);


//listen to user request
server.listen(port, hostname, () => {console.log(`listening on port: ${port}, hostname: ${hostname}`)});