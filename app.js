
const headerMenu=document.querySelector('.hm-header');

console.log(headerMenu.offsetTop);

window.addEventListener('scroll',()=>{
    if(window.pageYOffset > 20){
        headerMenu.classList.add('header-fixed');
    }else{
        headerMenu.classList.remove('header-fixed');
    }
})

/*=========================================
    Tabs
==========================================*/

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get('categoria');
    if(categoria)
        desplegar(categoria);
});

function desplegar(categoria){
    const tabLinks=document.querySelectorAll('.hm-tab-link');
    document.getElementById("menu").style.display = "none";
    switch (categoria) {
        case 'Cartas':
            tabLinks[1].click();
            break;
        case 'Estrategia':
            tabLinks[2].click();
            break;
        case 'Juegos De Rol':
            tabLinks[3].click();
            break;
        case 'Habilidad':
            tabLinks[0].click();
            break;
        default:
            break;
        }

}

        /*=========================================
            CAMBIO DE TAB
        ==========================================*/

        
if(document.querySelector('.hm-tabs')){

    const tabLinks=document.querySelectorAll('.hm-tab-link');
    const tabsContent=document.querySelectorAll('.tabs-content');

    tabLinks[0].classList.add('active');

    if(document.querySelector('.tabs-content')){
        tabsContent[0].classList.add('tab-active');
    }
    

    for (let i = 0; i < tabLinks.length; i++) {
        
        tabLinks[i].addEventListener('click',()=>{

            tabLinks.forEach((tab) => tab.classList.remove('active'));
            tabLinks[i].classList.add('active');
            
            tabsContent.forEach((tabCont) => tabCont.classList.remove('tab-active'));
            tabsContent[i].classList.add('tab-active');
            
        });
        
    }

}
        /*=========================================
            DISPLAY JSON 
        ==========================================*/
let displayRol = document.querySelector("#gridRol");
let displayEstrategia = document.querySelector("#gridEstrategia");
let displayHabilidad = document.querySelector("#gridHabilidad");
let displayCartas = document.querySelector("#gridCartas");
let displayDestacados = document.querySelector("#gridDestacados");

const apiEndPoint = 'productos.json';
const getData = async function loadNewContent(){
    const rest = await fetch(apiEndPoint);
    const data = rest.json();
    return data;
};

const displayItems = async () =>{
    if(displayRol&&displayEstrategia&&displayHabilidad&&displayCartas){
        const payload = await getData();

        //Usamos para recorreer los elementos del objeto recuperado
        dataDisplay = payload.map((object)=>{

            let htmlBit= `<div class="product-item">
                                <div class="p-portada">
                                    <div class="grid-item">
                                        <a href="producto.html">
                                            <img src="${object.imagen}" alt="">
                                        </a>
                                            <div class="c-info">
                                                <h6>Licencia limitada para fines personales no comerciales
                                                Mas <a target="_blank" href="https://www.amazon.es/gp/help/customer/display.html?ref_=hp_gcs_csd_d2_000_1_GLSBYFE9MGKKQXXM_2D1Z4OLVh0&nodeId=GLSBYFE9MGKKQXXM&qid=1709828322571&sr=1">info</a> En el apartado 5.
                                                </h6>
                                            </div>
                                    </div>
                                </div>

                                <div class="p-info">
                                <a><h3>${object.nombre}</h3></a>
                                    <div class="precio">
                                        <span>${object.precio}</span>
                                    </div>
                                    <a id="${object.id}" class="hm-btn btn-primary">Añadir al Carrito</a>
                                </div>

                            </div>`;

            switch (object.categoría) {
                case 'Cartas':
                    displayCartas.innerHTML += htmlBit;
                    break;
                case 'Estrategia':
                    displayEstrategia.innerHTML += htmlBit;
                    break;
                case 'Juegos de Rol':
                    displayRol.innerHTML += htmlBit;
                    break;
                case 'Habilidad':
                    displayHabilidad.innerHTML += htmlBit;
                    break;
                default:
                    break;
                }
        });
    }
    if(displayDestacados){
        const payload = await getData();

        //Usamos para recorreer los elementos del objeto recuperado
        dataDisplay = payload.map((object)=>{

            let htmlBit= `<div class="product-item">
                                <div class="p-portada">
                                    <div class="grid-item">
                                        <a href="producto.html">
                                            <img src="${object.imagen}" alt="">
                                        </a>
                                            <div class="c-info">
                                                <h6>Licencia limitada para fines personales no comerciales
                                                Mas <a target="_blank" href="https://www.amazon.es/gp/help/customer/display.html?ref_=hp_gcs_csd_d2_000_1_GLSBYFE9MGKKQXXM_2D1Z4OLVh0&nodeId=GLSBYFE9MGKKQXXM&qid=1709828322571&sr=1">info</a> En el apartado 5.
                                                </h6>
                                            </div>
                                    </div>
                                </div>

                                <div class="p-info">
                                <a><h3>${object.nombre}</h3></a>
                                    <div class="precio">
                                        <span>${object.precio}</span>
                                    </div>
                                    <a id="${object.id}" class="hm-btn btn-primary">Añadir al Carrito</a>
                                </div>

                            </div>`;
            if(object.id <= 12){
                displayDestacados.innerHTML += htmlBit;
            }
                
        });
    }
    const botonesCompra = document.getElementsByClassName("hm-btn btn-primary");
        for (let boton of botonesCompra){
             try{
                boton.onclick = function() {
                    agregaCesta(boton.id,5);
                };
             }catch(error){
                console.log(error);
             }
        }
}
displayItems();

/*=========================================
    MENU
==========================================*/

const menu=document.querySelector('.icon-menu');
const menuClose=document.querySelector('.cerrar-menu');

menu.addEventListener('click',()=>{
    document.querySelector('.header-menu-movil').classList.add('active');
})

menuClose.addEventListener('click',()=>{
    document.querySelector('.header-menu-movil').classList.remove('active');
})


/*=========================================
    CESTA
==========================================*/
var cestaProductos=[];
var carro = document.getElementById('cart-container');
const cesta = document.getElementById("cesta");

function agregaCesta(id,precio){
    alert("Tu producto se ha añadido, id del producto:" +id);
    cestaProductos.push([id,precio]);
    cantidadCesta.innerHTML = cestaProductos.length;

    let htmlBit= `
        <h2>Tus artículos: ${cestaProductos.length} <h2>
        <div class="subtotal">
            Subtotal del carrito: <span id="cantidadTotal">0.00 €</span>
        </div>
        <button class="checkout-button btn-primary">Tramitar pedido</button>
        <div class="products">
            <div class="product">
                <div class="product-name">La Baraja</div>
                <div class="quantity">Cantidad: 1</div>
            </div>
        </div>
        `
    ;
    carro.innerHTML = htmlBit;
}

cesta.onclick = showCesta;


async function showCesta() {
    if (carro.style.display == "none"){
        let total = 0;
        let htmlBit="";
        carro.style.display = "block";
        for (let producto of cestaProductos){
            console.log(cestaProductos);
            total += producto[1];
            htmlBit+=`<div class="product">
                        <div class="product-name"></div>
                        <div class="quantity">Cantidad:</div>
                     </div> `;

        }
        document.getElementById("cantidadTotal").innerHTML=total +" €";
    }else{
        carro.style.display = "none";
    }







//         // Array de ejemplo
// var array = [1, 2, 3, 1, 2, 3, 1, 2, 3];

// // Objeto que queremos contar en el array
// var objeto = 2;

// // Contador para mantener el conteo
// var contador = array.reduce(function (conteo, elemento) {
//     return conteo + (elemento === objeto ? 1 : 0);
// }, 0);

// // Imprimir el resultado
// console.log("El objeto", objeto, "aparece", contador, "veces en el array.");
// console.log("Array después del reduce: "+ array);
}