const socketClient = io();
console.log("js para rtp conectado");
let productUl = document.getElementById("productList");
const createProductForm = document.getElementById("createProductForm");
const deleteProductForm = document.getElementById("deleteProductForm");

// Función para eliminar producto
const deleteProduct = productId =>{
    console.log(`Datos enviados desde el cliente... se eliminará el producto con ID ${productId}`);
     return socketClient.emit("deleteProduct", productId)
};

// Enviamos info del formulario para crear producto
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

// Recibimos productos
socketClient.on("productsArray", (productList)=> {
    let liElements = "";

    productList.forEach(product => {
        liElements +=
        `<li>nombre: ${product.title}</li>
        <img src="${product.thumbnail}"/>
        <li>precio: ${product.price}</li>
        <li>stock: ${product.stock}</li>
        <button id= "delete-btn-${product.id}" data-product-id="${product.id}">Eliminar Producto</button>
        <hr />`;
    });

    productUl.innerHTML = liElements;

    productList.forEach(product=> {
        document.getElementById(`delete-btn-${product.id}`).addEventListener("click", ()=> {
            deleteProduct(product.id)
        })
    })
});

console.log(deleteProduct);
