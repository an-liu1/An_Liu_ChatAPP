import ChatMessage from './modules/ChatMessage.js';
import {userCONMsg, userDCMsg} from './modules/connectmessage.js';


const socket = io();

function logConnect ({sID, message}){
    console.log(sID, message);
    vm.socketID = sID; 
    // document.querySelector('.notification').innerText = sID + ' join in the chat channel';
    // document.querySelector('.namelist').innerText = sID;
}

function AppendMessage(message){
    message.type = 'chatMessage';
    vm.messages.push(message);
}

// function disConnect(data){
// 	document.querySelector('.notification').innerText = data + ' left the chat channel';
// }

function appendnote(message) {

    if (message.event === 'usercon') {
        message.type = 'userconMsg';
    } else {
        message.type = 'userdcMsg';
    } 
    vm.messages.push(message);
}
const vm = new Vue({
    data:{
        socketID: "",
        nickname: "",
        message: "",
        messages: []
    },

    methods: {
        dispatchMessage(){
            socket.emit('chat message', {content: this.message, name: this.nickname || "anonymous"});
            this.message = "";
        }
    },

    components: {
        chatMessage: ChatMessage,
        userconMsg: userCONMsg,
        userdcMsg: userDCMsg
    }

}).$mount(`#app`);

socket.on('connected', logConnect);
socket.addEventListener('chat message', AppendMessage);
socket.addEventListener('note', appendnote);
socket.addEventListener('disconnect', appendnote);

