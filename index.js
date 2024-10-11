
//Used for retrieve previous stroed conversations array if exists in localstroage, otherwise create empty one.
let messages = JSON.parse(localStorage.getItem("chatConversations")) || [];


//-------------------------------------------------------
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");




//---------------------------------------------
//When load the window, if previous conversations exists, then load conversations(Message) & showing the latest conversation at the bottom.
window.onload = () => {
    scrollToBottom();
    loadMessages();
}


//------------------------------------------------------
//send button event listener. Message should be sent when click the Send Button.
sendBtn.addEventListener("click", () => {
    //console.log("YES");
    const messageText = messageInput.value.trim();
    if (messageText) {
        const newMessage = { text: messageText, type: "sent" };
        messages.push(newMessage);
        saveMessage();
        addMessageToChat(newMessage);
        messageInput.value="";


        setTimeout(()=>{
            const replyMessage={text:"This is a reply!!", type:"received"};
            messages.push(replyMessage);
            saveMessage();
            addMessageToChat(replyMessage);


        },1000);
    }

});



//---------------------------------------------------
//Add to message in Chat User Interface.
function addMessageToChat(message) {
    const messageDiv = document.createElement("DIV");
    messageDiv.classList.add("message", message.type);
    messageDiv.textContent = message.text;
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}


//--------------------------------------------------
//Load messages from local stroage if previous conversataions exists.  
function loadMessages(){
    messages.forEach((message)=>{
        addMessageToChat(message);
    });

}


//----------------------------------------------------
//saved message in local storage.
function saveMessage() {
    localStorage.setItem("chatConversations", JSON.stringify(messages));
}

//------------------------------------------------------
//latest message always shows in Bottom.
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}



//-----------------------------------------------------
//If you press enter key, then message should be sent.
window.addEventListener("keydown",(event)=>{
    //console.log(event.key);
    if(event.key=="Enter"){
        //console.log("Y");
        sendBtn.click();
    }
});





//------------------------------------------------------
//This part is little bit tricky.
//If a message is present, it displays a send icon; otherwise it reverts to Send.
let sendImoji=document.querySelector("i");
messageInput.addEventListener("input",()=>{
    //console.log("input works");
    const sendMessage=messageInput.value.trim();
    if(sendMessage){
        //console.log("message length greater than one");
        sendBtn.style.opacity="1.0";
        sendBtn.innerHTML='<i class="fa-solid fa-paper-plane"></i>';
    }
    else{
        sendBtn.style.opacity="";
        sendBtn.innerHTML="Send";
    }

});