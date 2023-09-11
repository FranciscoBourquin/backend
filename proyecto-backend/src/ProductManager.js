import { readFile, writeFile } from 'fs/promises';

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.productIdCounter = 1;
  }

  async readFile() {
    try {
      const data = await readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  async writeFile(data) {
    try {
      await writeFile(this.path, JSON.stringify(data, null, 2));
    } catch (error) {
      throw error;
    }
  }

  async addProduct(product) {
    const products = await this.readFile();
    if (!product.id) {
      product.id = this.productIdCounter;
      this.productIdCounter++;
    }
    products.push(product);
    await this.writeFile(products);
  }

  async getProducts() {
    const products = await this.readFile();
    return products;
  }

  async getProductById(id) {
    const products = await this.readFile();
    const product = products.find((p) => p.id === id);
    if (!product) {
      console.log("Not found");
    }
    return product || null;
  }

  async deleteProduct(id) {
    const products = await this.readFile();
    const updatedProducts = products.filter((p) => p.id !== id);
    await this.writeFile(updatedProducts);
    console.log(`Se ha eliminado el producto de id ${id}`);
  }
}

const productManager = new ProductManager('products.json');

//Agregamos los productos
(async () => {
  await productManager.addProduct({
    title: "Notebook Lenovo Ideapad 1i Intel I3 1215u 4gb Ram (ampliable Hasta 12gb) 128gb Ssd Windows 11s",

    description: "Procesador Intel Core i3.Memoria RAM de 4GB. Pantalla TN de 14\".Resolución de 1366 x 768p. Conexión wifi y bluetooth. Cuenta con puerto USB y puerto HDMI. La duración de la batería depende del uso que se le dé al producto.",

    price: "198.799",

    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_787180-MLA54518190876_032023-O.webp",

    code: 'P1',

    stock: 10
  });

  await productManager.addProduct({
    title: "Notebook gamer Asus Rog Strix G15 G513RM eclipse gray 15.6\", AMD Ryzen 7 6800H 16GB de RAM 512GB SSD, Nvidia RTX 3060 165 Hz 2560x1440px Windows 11 Home",

    description: "Procesador AMD Ryzen 7. Memoria RAM de 16GB. Resolución de 2560x1440 px. Placa de video Nvidia RTX 3060. Conexión wifi y bluetooth. Cuenta con 4 puertos USB y puerto HDMI. Con teclado retroiluminado.La duración de la batería depende del uso que se le dé al producto.",

    price:  "1.329.999",

    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_806340-MLA51423594714_092022-O.webp",

    code: 'P2',

    stock: 10,
  });

  await productManager.addProduct({
    title: "Samsung Galaxy A04e 32 GB negro 3 GB RAM",

    description: "Dispositivo liberado para que elijas la compañía telefónica que prefieras. Pantalla PLS de 6.5\". Tiene 2 cámaras traseras de 13Mpx/2Mpx. Cámara delantera de 5Mpx. Procesador MediaTek Helio P35 Octa-Core de 2.3GHz con 3GB de RAM. Batería de 5000mAh. Memoria interna de 32GB. Con reconocimiento facial.",

    price:  "56.999",

    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_867179-MLA53352656840_012023-O.webp",

    code: 'P3',

    stock: 10,
  });

  await productManager.addProduct({
    title: "Moto G13 Dual SIM 128 GB azul difuso 4 GB RAM",

    description:"Dispositivo liberado para que elijas la compañía telefónica que prefieras. Pantalla IPS de 6.5\". Tiene 3 cámaras traseras de 50Mpx/2Mpx/2Mpx. Cámara delantera de 8Mpx. Procesador MediaTek Helio G85 Octa-Core de 2GHz con 4GB de RAM. Batería de 5000mAh. Memoria interna de 128GB. Resistente a las salpicaduras. Con reconocimiento facial y sensor de huella dactilar.",

    price:  "79.999",

    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_867179-MLA53352656840_012023-O.webp",

    code: 'P4',

    stock: 10,
  });

  await productManager.addProduct({
    title:"Campera Topper Puffer Men Negro",

    description:"Campera puffer corta, a la primera cadera, hombro caido. Matelaseado ancho horizontal en frente y espalda. Con capucha y bolsillos laterales. Elástico en puños y cintura. Cierre diente de perro. Logo estampado",

    price:  "40.899",

    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_785391-MLA69692746305_052023-O.webp",

    code: 'P5',

    stock: 10,
  });

  await productManager.addProduct({
    title:"Buzo Canguro Back To Basics O'neill",

    description:"Buzo canguro con capucha embolsada en Jersey. Parche de goma marcario sobre bolsillo. Ojalillos y punteras metálicas marcarias con cordón redondo a tono. Cintura y puños con ribb. Estampa en frente y en manga a 1 color.",

    price:  "13.930",

    thumbnail:"https://http2.mlstatic.com/D_NQ_NP_610164-MLA70456016669_072023-O.webp",

    code: 'P6',

    stock: 10,
  });

  await productManager.addProduct({
    title:"Pantalones Hombre Cargo Bolsillos Casuales Jogger Alpina",

    description:"COLORES:\n\nNEGRO\nGRIS OSCURO\nVERDE MILITAR\nAZUL MARINO\nMARRÓN CLARO\nBEIGE",

    price:  "6.330",

    thumbnail:"https://http2.mlstatic.com/D_NQ_NP_729627-MLA53269627205_012023-O.webp",

    code: 'P7',

    stock: 10,
  });

  await productManager.addProduct({
    title:"Short Fútbol Topper Line Hombre En Gris | Dexter",

    description:"Confeccionado pensando en tu comodidad y rendimiento, este short cuenta con bolsillos y ajuste con cordón para brindarte la máxima versatilidad. Su diseño te permitirá moverte con libertad y comodidad, mientras su tejido transpirable te mantiene fresco durante el juego.",

    price:  "6.119",

    thumbnail:"https://http2.mlstatic.com/D_NQ_NP_650656-MLA69202768781_052023-O.webp",

    code: 'P8',

    stock: 10,
  });

  await productManager.addProduct({
    title:"Campera Gery De Nylon Mujer 47 Street",

    description:"Campera oversize en nylon, con guata interna y matelaseado. Forrado al tono. Cierre frontal al tono. Bolsillos con snaps. Capucha incorporada, con avios marcarios. Elastico circular en bajo con tanca para ajustar. Multiples bolsillos. Modelo super canchero.",

    price:  "50.399",

    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_704050-MLA54549278415_032023-O.webp",

    code: 'P9',

    stock: 10,
  });

  await productManager.addProduct({
    title:"Buzo De Mujer Mindtrip O'neill",

    description:"Buzo canguro estampado con tintas ecológicas con capucha embolsada en Jersey. Estampa 1 color en frente, parche de goma marcario sobre bolsillo. Ojalillos metálicos, cordón redondo con puntera metálica marcaria. Cintura y puños con ribb.",

    price:  "18.200",

    thumbnail:  "https://http2.mlstatic.com/D_NQ_NP_914014-MLA69537184354_052023-O.webp",

    code: 'P10',

    stock: 10,
  });

  await productManager.addProduct({
    title:"Remera Mujer Entrenamiento Deportiva Gym Running Kadur",

    description:"Corte regular fit: corte al cuerpo. Confeccionadas en set de poliéster de primera calidad. Ideal para entrenamiento funcional, running, crossfit, ciclismo, vóley, entre otros deportes.",

    price:  "2.740",

    thumbnail:   "https://http2.mlstatic.com/D_NQ_NP_938532-MLA49077015453_022022-O.webp",

    code: 'P11',

    stock: 10,
  });

  await productManager.addProduct({
    title:"Pijama Remeron Y Pantalon Otoño Invierno Sol Y Oro 70106sy",

    description:"Pijama Otoño - Invierno Remerón largo de lanilla con abertura a los costados y volados a la altura de los hombros. Pantalón ajustado con abertura en tobillos. ¡Súper versátil!. No es solo un pijama más, también podés usarla para hacer otras actividades. Incluye vincha de regalo",

    price:  "10.900",

    thumbnail:   "https://http2.mlstatic.com/D_NQ_NP_756016-MLA54915028961_042023-O.webp",

    code: 'P12',

    stock: 10,
  });

  await productManager.addProduct({
    title:"titulo",

    description:"descripción",

    price:  "precio",

    thumbnail:   "imagen del producto",

    code: 'P13',

    stock: 10,
  });

  //Muestra todos los productos
  console.log(await productManager.getProducts());

  //Muestra el producto con ID 1
  console.log(await productManager.getProductById(1));

  //Arroja 'not found' porque el producto con ID 14 no existe
  console.log(await productManager.getProductById(14));

  //Borra el producto con ID 13
  await productManager.deleteProduct(13);
});

export default ProductManager
