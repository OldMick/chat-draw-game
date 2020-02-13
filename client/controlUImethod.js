//////////////20191231//////////////////////////////////////////////////////////////
$(document).ready(function(){ 
    $("#btnCon").click(function(){       
      var host = $("#host").val(),
	      user = $("#tUser").val();
	  console.log(host);
	  Client.connect(host,9000);
	  Client.user.uname = user;
	  Client.login(function(data){	    
	    if(data==1)
		{
		  alert("User Exist please try another one");
		}
		else if(data==2)
		{
		  alert("on processing");
		}
		else
		{		   
		  $("#EntryPoint").hide();
          $("#main").show();
		}
	  });
   });
////////////////////////////////////////////////////////////////////////按BTN鍵觸發後座動
   $("#btnSendMsg").click(function(){
     var txt = $("#txtMsg").val();     
	 Client.sendMsg(txt);
	 $("#txtMsg").val("");
   });
////////////////////////////////////////////////////////////////////////按Enter鍵觸發後座動
   $("#txtMsg").on("keydown",function(e){     
     if(e.keyCode==13)
	 {
       var txt = $("#txtMsg").val();
	   Client.sendMsg(txt);
	   $("#txtMsg").val("");
	 }
   })  
})