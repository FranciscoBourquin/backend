console.log("JS de real time products conectado");
const socketClient = io();
let productUl = document.getElementById("productList");

socketClient.on("productsArray", (productList)=> {
    console.log(productList);
    let liElements = ""

    productList.forEach(product => {
        liElements+=
        `<li>nombre: ${product.title}</li>
        <li>precio: ${product.price}</li>
        <li>stock: ${product.stock}</li>
        <hr />`

    })
    console.log(liElements);
    productUl.innerHTML = liElements
})
