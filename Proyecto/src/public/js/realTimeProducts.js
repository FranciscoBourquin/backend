console.log("JS de real time products conectado");

const socketClient = io();

let productUl = document.getElementById("productList");
const createProductForm = document.getElementById("createProductForm");
const deleteProductForm = document.getElementById("deleteProductForm");

//Enviamos info del formulario para crear producto
createProductForm.addEventListener("submit", (e)=> {
    e.preventDefault();
    const formData = new FormData(createProductForm);
    const jsonData = {};
    for (const [key, value] of formData.entries()) {
        jsonData[key] = value;
    }
    socketClient.emit("addProduct", jsonData);
    createProductForm.reset();
});

//Recibimos productos
socketClient.on("productsArray", (productList)=> {
    console.log(productList);
    let liElements = ""

    productList.forEach(product => {
        liElements+=
        `<li>nombre: ${product.title}</li>
        <img src="${product.thumbnail}"/>
        <li>precio: ${product.price}</li>
        <li>stock: ${product.stock}</li>
        <hr />`

    })
    console.log(liElements);
    productUl.innerHTML = liElements
})

//after websocket 1:10:00
