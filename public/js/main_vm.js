import ChatMessage from './modules/ChatMessage.js';

const socket = io();

function logConnect ({sID, message}){
    console.log(sID, message);
    vm.socketID = sID; 
    document.querySelector('.notification').innerText = sID + ' join in the chat channel';
    // document.querySelector('.namelist').innerText = sID;
}

function AppendMessage(message){
    vm.messages.push(message);
}

function disConnect(data){
	document.querySelector('.notification').innerText = data + ' left the chat channel';
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
        newmessage: ChatMessage
    }

}).$mount(`#app`);

socket.on('connected', logConnect);
socket.addEventListener('chat message', AppendMessage);
socket.addEventListener('disconnect', disConnect);

