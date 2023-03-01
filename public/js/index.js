const socket = io()
console.log("hola mundo")


socket.on('conectado', (mensaje)=>{
console.log(mensaje)
socket.disconnect()
})


  