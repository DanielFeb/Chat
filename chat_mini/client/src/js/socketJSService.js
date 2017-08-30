var ws = null;  
var url = null;  
var transports = [];  

function setConnected(connected) {  
    document.getElementById('connect').disabled = connected;  
    document.getElementById('disconnect').disabled = !connected;  
    document.getElementById('echo').disabled = !connected;  
}  

function connect() {
      
    ws = new SockJS("http://localhost:7777/minchat/sockjs");  
          
    ws.onopen = function () {  
        setConnected(true);  
        log('Info: connection opened.');  
    };  
      
    ws.onmessage = function (event) {  
        //log('From: ' + event.data.sendUserID + ', Content:' + event.data.textMessage);  
        log('Received: ' + event.data);  
    };  
      
    ws.onclose = function (event) {  
        setConnected(false);  
        log('Info: connection closed.');  
        log(event);  
    };  
}  

function disconnect() {  
    if (ws != null) {  
        ws.close();  
        ws = null;  
    }  
    setConnected(false);  
}  

function echo() {  
    if (ws != null) {  
        var message = {
        };
        message.textMessage = document.getElementById('message').value;  
        message.recieveUserID = document.getElementById('recieveUserID').value;  
        message.sendUserID = 0;

        var text = "{textMessage:" + message.textMessage + ",recieveUserID:" +  message.recieveUserID + ",sendUserID:" + message.sendUserID + "}";
        var text1 = JSON.stringify(message);
        ws.send(text1);  
    } else {  
        alert('connection not established, please connect.');  
    }  
}  

function log(message) {  
    var console = document.getElementById('console');  
    var p = document.createElement('p');  
    p.style.wordWrap = 'break-word';  
    p.appendChild(document.createTextNode(message));  
    console.appendChild(p);  
    while (console.childNodes.length > 25) {  
        console.removeChild(console.firstChild);  
    }  
    console.scrollTop = console.scrollHeight;  
}  