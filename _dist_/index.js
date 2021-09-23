/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
//constantes del sistema
const URL = "https://platzi-avo.vercel.app/api/avo";
const URL_BASAE = "https://platzi-avo.vercel.app/";
const appNode = document.querySelector("#app");

//API formato para el precio segun la moneda
function formatoPrecio(precio) {
  const new_precio = new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(precio);
  return new_precio;
}

//JSON -> DATA -> renderizar en el navegador
function renderizarData(items) {
  const ITEMS = [];
  items.map((item) => {
    //imagen
    const imagen = document.createElement("img");
    imagen.src = `${URL_BASAE}${item.image}`;
    imagen.classList =
      "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";

    //titulo
    const titulo = document.createElement("h2");
    titulo.classList = "font-bold text-lg md:leading-4";
    titulo.textContent = item.name;

    //precio
    const precio = document.createElement("div");
    precio.className = "text-gray-600";
    precio.textContent = formatoPrecio(item.price);

    //contenedor contenido
    const contenido = document.createElement("div");
    contenido.classList = "md:text-left";
    contenido.append(titulo, precio);

    // card item
    const card = document.createElement("div");
    card.classList =
      "md:flex bg-white rounded-lg p-6 items-center hover:bg-indigo-200 mt-3";
    card.append(imagen, contenido);

    //item va al arreglo de items
    ITEMS.push(card);
  });
  //Damos estilos al contenedor de padre.
  appNode.classList =
    "grid md:grid-flow-col md:grid-cols-2 md:grid-rows-5 md:gap-4 lg:grid-cols-3 lg:grid-rows-3 mt-6";

  //Renderizamos los items
  appNode.append(...ITEMS);
}

//web api
//nos conectamos al servidor
//Procesamos la respuesta y la comvertimos en json
(async function fetchData() {
  try {
    const DATA = await fetch(URL);
    const DATA_JSON = await DATA.json();
    return renderizarData(DATA_JSON.data);
  } catch (error) {
    console.error("Algo fallo");
    console.error(error);
  }
})();
