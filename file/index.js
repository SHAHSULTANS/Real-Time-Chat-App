
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


async function getAIResponse(messageText) {

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer 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`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                inputs: messageText,
                parameters: {
                    max_length: 100,
                    temperature: 1.0,
                    top_k: 50,
                    top_p: 0.9

                }
            })

        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log(errorMessage);
            throw new Error(`Error: ${response.status} - ${response.statusText}\n Response: ${errorMessage}`);
        }
        const data = await response.json();
        return data[0]?.generated_text || "No response";
        // console.log(data[0]);

    }
    catch (error) {
        console.error("The error is: " + error);
        return "Error generating response.";

    }

    //return "This is your reply";

}

//------------------------------------------------------
//send button event listener. Message should be sent when click the Send Button.
// async function getAIResponse(messageText) {
//     try {
//         const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer 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`,  // Your Hugging Face API Key
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 inputs: messageText,
//                 parameters: {
//                     max_length: 100, // Increase as needed
//                     temperature: 1.0, // Higher value for more randomness
//                     top_k: 50, // Limits sampling to top 50 tokens
//                     top_p: 0.9 // Nucleus sampling          
//                 } 
//             })
//         });

//         if (!response.ok) {
//             const errorMessage = await response.text(); // Get detailed error message
//             throw new Error(`Error: ${response.status} - ${response.statusText}\nResponse: ${errorMessage}`);
//         }

//         const data = await response.json();
//         console.log(data);
//         return data[0]?.generated_text || "No response";

//     } catch (error) {
//         console.error("Error fetching AI response:", error);
//         return "Error generating response.";
//     }
// }



// // Example of adding event listener similar to your setup
// sendBtn.addEventListener("click", async () => {
//     const messageText = messageInput.value.trim();
//     if (messageText) {
//         const newMessage = { text: messageText, type: "sent" };
//         messages.push(newMessage);
//         saveMessage();
//         addMessageToChat(newMessage);
//         messageInput.value = "";

//         const aiReply = await getAIResponse(messageText);  // Call the modified function
//         console.log(aiReply);

//         const replyMessage = { text: aiReply, type: "received" };
//         messages.push(replyMessage);
//         saveMessage();
//         addMessageToChat(replyMessage);
//     }
// });

sendBtn.addEventListener("click", async () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        const newMessage = { text: messageText, type: "sent" };
        messages.push(newMessage);
        saveMessage();
        addMessageToChat(newMessage);
        messageInput.value = "";
        if(!messageInput.value){
         sendBtn.innerHTML = "Send";
        }


        //--------reply part.------------
        const AIreply = await getAIResponse(messageText);
        //console.log(AIreply);
        //AIreply=AIreply.replace(newMessage,"");
        const reply=AIreply.replace(messageText,"");
        //console.log(reply);
        const replyMessage = { text: reply, type: "received" };
        messages.push(replyMessage);
        saveMessage();
        addMessageToChat(replyMessage);
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
function loadMessages() {
    messages.forEach((message) => {
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
window.addEventListener("keydown", (event) => {
    //console.log(event.key);
    if (event.key == "Enter") {
        //console.log("Y");
        sendBtn.click();
    }
});





//------------------------------------------------------
//This part is little bit tricky.
//If a message is present, it displays a send icon; otherwise it reverts to Send.
let sendImoji = document.querySelector("i");
messageInput.addEventListener("input", () => {
    //console.log("input works");
    const sendMessage = messageInput.value.trim();
    if (sendMessage) {
        //console.log("message length greater than one");
        sendBtn.style.opacity = "1.0";
        sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';
    }
    else {
        sendBtn.style.opacity = "";
        sendBtn.innerHTML = "Send";
    }

});