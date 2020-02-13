/////DOM first act for flow control to avoid shark
/////
var JPUI_SettingManager = {
    Select_ItemList: null,
    _Content_Title: null,
    _Content_Data: null,
    FirstSelection: [],
    SecondSelection: [],
	Initial: false,
	init: function() {
        JPUI_SettingManager.Select_ItemList = document.getElementById("EntryPoint");
        JPUI_SettingManager._Content_Title = document.getElementById('main');
        //this._Content_Data = document.getElementById('msg');
	},
	run: function(){
		if(!this.Initial){
			this.Initial = true;
			this.init();
		}
        JPUI_SettingManager.Create_SettingPage();
	},
    Create_SettingPage: function(){
		var i;
		var HTML='',HTML2='';
        JPUI_SettingManager.Select_ItemList.innerHTML="";
		JPUI_SettingManager._Content_Title.innerHTML="";
		JPUI_SettingManager.Select_ItemList.innerHTML='<div class="kimkii">'+
			'<div>主 機:<input id="host" type="text" name="textfield" value="127.0.0.1"><br></div>'+
			'<div>玩 家:<input id="tUser" type="text" name="textfield"></div>'+
			'<div class="dlfwq" id="btnCon"><img src="images/dlfwq.png"  border="0"></div></div>'
//		
		HTML ='<div class="tx"></div><div class="wz"><div id="roundNum"></div><span id="askToUser"></span></div>'+
			'<div id="TimeCountNum" class="time">60</div> <div class="tc">LEAVE<img src="images/edit_undo.png" align="absmiddle">'+
			'</div><div class="qc"></div> <div class="checkPPint"><div id="hb" class="hb"> <div id="effect">'+
			'</div><canvas id="paintArea" width="525" height="370" style="display:none" ></canvas></div><div id="userArea">'+
			'</div> </div><div class="Sdkele"><div id="Div_opt" style="display:none"><div id="ys" class="ys">'+
			'</div><div id="bc" class="bc"></div><div id="ssx" class="tb"><div id="btnRub" class="tb2">'+
			'<img src="images/01945.png"></div><div id="btnClear" class="tb3"><img src="images/tcan.gif">'+
			'</div></div></div><div id="msgArea" class="msgArea"></div> <div class="bd">'+
			'<input type="button" id="btnSendMsg" value="發送"><input type="text" size="13" id="txtMsg"></div></div>'
		JPUI_SettingManager._Content_Title.innerHTML = HTML;
        //this._Content_Data.innerHTML = HTML2;
		// for change UI define !!----20191125
	}
}
JPUI_SettingManager.run();