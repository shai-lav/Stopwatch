document.addEventListener("DOMContentLoaded",function(){
    
    var state={
        timerText:0.00,
        timerInterval:null,
        timerStarted:false,
        timesTracked:[]
    };

    function updateDOMTimer(){
        if(!state.domTimerText){
          var domTimerText=document.getElementById("timerText");
          state.domTimerText=domTimerText;
          state.domTimerText.innerHTML=state.timerText;
        }else{
          state.domTimerText.innerHTML=state.timerText;          
        }
    }

    function setTimerText(n){
        state.timerText=parseFloat(state.timerText);
        state.timerText+=n;
        state.timerText=(Math.round(state.timerText * 100) / 100).toFixed(2);
        updateDOMTimer();
    }

    function toggleTimer(){
        if(state.timerStarted){//stop timer
            state.timerStarted=false;
            clearInterval(state.timerInterval); //leave timertext
        }else{//start timer
            state.timerStarted=true;
            state.timerInterval=setInterval(setTimerText.bind(this,0.01),10);
        }
    }

    function resetTimer(){
        clearInterval(state.timerInterval);
        state.timerText=0.00;
        state.timesTracked=[];
        state.timerStarted=false;
        setTimerText(0.00);
        updateDOMTimesTracked();
    }

    function updateDOMTimesTracked(){
        var domTimesTracked=document.getElementById("timesTracked");
        domTimesTracked.innerHTML="";
        state.timesTracked.forEach((val,ind)=>{
            var tempDOMdiv=document.createElement("div");
            tempDOMdiv.innerHTML=val;
            domTimesTracked.insertBefore(tempDOMdiv,domTimesTracked.firstChild);
        });
    }

    function setTimesTracked(){
        state.timesTracked.push(state.timerText);
        updateDOMTimesTracked();
    }

    function initStopwatch(){
        const RKEY=82,SKEY=83,TKEY=84;
        var domStartStopBut=document.getElementById("startStopBut");
        var domResetBut=document.getElementById("resetBut");
        var domRecordTimeBut=document.getElementById("recordTimeBut");
        domStartStopBut.addEventListener("click",toggleTimer);
        domResetBut.addEventListener("click",resetTimer);
        domRecordTimeBut.addEventListener("click",setTimesTracked);        
        document.addEventListener("keydown",function(e){
            switch(e.keyCode){
              case SKEY:
                toggleTimer();
              break;
              case RKEY:
                resetTimer();
              break;
              case TKEY:
                setTimesTracked();
              break;
            }
        });
        setTimerText(0.00);
    }

    initStopwatch();

});