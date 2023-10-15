console.log("js para chat conectado");
const socketClient = io();

let userName = document.getElementById("userName");
let message = document.getElementById("Inputmsg");
let sendMsg = document.getElementById("sendMsg");
let chatPanel = document.getElementById("chatPanel");

let user;
swal.fire({
    title: "Chat",
    text: "Por favor, ingresa tu nombre de usuario",
    input: "text",
    inputValidator:(value) => {
        return !value && "Debes ingresar el nombre de usuario para continuar"
    },
    //Impide que evitemos la validación al dar click fuera del recuadro de alerta
    allowOutsideClick: false,
    //Impide que evitemos la validación al presionar esc
    allowEscapeKey: false,
        //inputValue es un objeto y nosotros queremos su propiedad value que contiene la info del usuario
}).then((inputValue) => {
    user = inputValue.value;
    userName.innerHTML = user;
    socketClient.emit("userConnected", user);
})

//Mandamos mensaje del usuario
sendMsg.addEventListener("click", ()=> {
    const msg = {user: user, message: message.value};
    socketClient.emit("chatMsg", msg);
    message.value = "";
});

//Recibimos el historial de los mensajes de todos los usarios
socketClient.on("chatHistory", (serverData)=> {
    let msgElements = "";
    serverData.forEach(element => {
        msgElements+= `<p>${element.user}>>>> ${element.message}</p>`
    });
    chatPanel.innerHTML = msgElements;
})

socketClient.on("newUserConnected", (user)=> {
    //Antes de mostrar la notificación verificamos que se haya logueado
    if (user) {
        swal.fire({
            //En text ponemos solo user xq desde el emit ya está el mensaje completo
            text: user,
            toast: true,
            position: "top-right"
        })
    }
})

