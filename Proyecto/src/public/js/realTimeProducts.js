console.log("JS de real time products conectado");
const socketClient = io();

socketClient.on("productsArray", (productList)=> {
    console.log(productList);

})
