
let messages = JSON.parse(localStorage.getItem("chatConversations")) || [];

const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");

const sendBtn = document.getElementById("sendBtn");

window.onload = () => {
    scrollToBottom();
    loadMessages();
}

//send button event listener.
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


//Add to message in Chat User Interface.
function addMessageToChat(message) {
    const messageDiv = document.createElement("DIV");
    messageDiv.classList.add("message", message.type);
    messageDiv.textContent = message.text;
    chatBox.appendChild(messageDiv);
    scrollToBottom();
}


//Load messages from local stroage if exists or conversations.  
function loadMessages(){
    messages.forEach((message)=>{
        addMessageToChat(message);
    })

}


//saved message in local storage.
function saveMessage() {
    localStorage.setItem("chatConversations", JSON.stringify(messages));
}

//latest message always shows in Bottom.
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

window.addEventListener("keydown",(event)=>{
    //console.log(event.key);
    if(event.key=="Enter"){
        //console.log("Y");
        sendBtn.click();
    }
});
