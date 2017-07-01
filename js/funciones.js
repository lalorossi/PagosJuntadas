//Creo clases
class Persona{
    constructor(nombre){
        this.nombre = nombre;
        this.comprasPorPersona = [];
        this.plataPuesta = 0;
    }
}

class Compra{
    constructor(producto, precio){
        this.producto = producto;
        this.precio = precio;
        this.cantCompras = 0;
    }
}

var cantPersonas = 1;

var ultimoBoton;

var personas = [];

//De entrada tomo los primeros elementos de compras y personas para copiarlos al agregar un nuevo elemento a la tabla
var primerCampoPersona = document.getElementsByClassName("persona")[0].innerHTML;
var primerCampoCompra = document.getElementsByClassName("compra")[0].innerHTML;


//Agrega un input de compra o persona
function agregar(cla) {

    /*
    var nuevo = document.createElement("tr");
    nuevo.className=cla;
    */

    var nuevo = crearNodo("tr", cla);

    //Si quiero agregar una compra, lo agreago a la pagina 1
    if(cla == "compra"){
        nuevo.innerHTML = primerCampoCompra;
        document.getElementById("page1").getElementsByTagName("tbody")[0].appendChild(nuevo);            
    }

    //Si es una persona, a la pagina 2
    if(cla == "persona"){
        nuevo.innerHTML = primerCampoPersona;
        document.getElementById("page2").getElementsByTagName("tbody")[0].appendChild(nuevo);    

        //Activa el boton de seleccion de compras para ser usado
        //Esto va a cambiar con el uso de "modals" (para mostrar las compras en una ventana)
        var td = document.getElementById("page2").getElementsByTagName("tr");
        td = td[td.length - 1];
        td = td.getElementsByTagName("td");
        td = td[td.length - 1];
        td = td.lastChild;
        td.id = "activado";
    }
}

function chau0(child)  {
    var grand = document.getElementById("page1");
    grand.removeChild(child.parentNode);
}

function chau(yo) {
    //Elimina el input de una compra/persona. Se activa con el boton de eliminar
    var papa=yo.parentNode.parentNode;
    papa.parentNode.removeChild(papa);
}

function cambiarPagina(idPagina) {
    document.getElementById(idPagina).style.display="";
    if(idPagina == "pag1"){
        document.getElementById("pag2").style.display="none";
    }
    else{
        document.getElementById("pag1").style.display="none";
    }
}

function checkSubmit(){
    //Checkea que se pueda pasar a la siguiente pagina viendo si al menos un campo de compra está completo
    var vacio = 0;
    compras = [];   //Notar que al no poner var, se hace global

    var rows = document.getElementsByClassName("compra");

    //Selecciona todas las compras y se fija si al menos una tiene todos los valores asignados
    for (var i = rows.length - 1; i >= 0; i--) {
        var celdas = rows[i].getElementsByTagName('input');

        if(celdas[0].value=="" || celdas[1].value=="" || celdas[1].value == 0){
        }
        else{
            //Cuando encuentra una compra completa la agrega al array de compras
            var nuevaCompra = new Compra(celdas[0].value, celdas[1].value);
            compras.push(nuevaCompra);
            vacio=1;
        }
    }

    //Si encontro al menos una compra, pasa a la pagina2        
    if (vacio==1) {
        cambiarPagina("pag2");
        //return true;
    }
    else{
        borrarModal();
        //var parrafo = document.createElement("p");
        var parrafo = crearNodo("P");
        var texto = document.createTextNode("Ingrese al menos una compra con precio");
        parrafo.appendChild(texto);

        //Crear boton de OK que esconde el modal
        //var boton = document.createElement("input");
        var boton = crearNodo("input", "boton-modal");
        boton.type = "button";
        boton.value = "OK";

        boton.onclick = function() { 
            esconderModal();
        };


        setElementFooter(boton);
        setModoModal("error");
        escribirModal(parrafo);
        mostrarModal();
        //return false;
    }
}

function borrarModal(){
    //Borrar el modal y dejar el div modal-body vacio
    var modal = document.getElementsByClassName("modal-body")[0];
    modal.innerHTML = "";
    resetFooter();
    resetHeader();
}

function escribirModal(elemento){
    document.getElementsByClassName("modal-body")[0].appendChild(elemento);
}

function mostrarModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";  
}

function esconderModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    ultimoBoton.id = "activado";
}

function setModoModal(estado=""){
    var header = document.getElementsByClassName("modal-header");
    var footer = document.getElementsByClassName("modal-footer");

    header[0].id = estado;
    footer[0].id = estado;
}

function resetFooter() {
    var footer = document.getElementsByClassName("modal-footer")[0];
    footer.innerHTML = "";
    //var h = document.createElement("h3");
    var h = crearNodo("h3");
    footer.appendChild(h);
}

function resetHeader() {
    var header = document.getElementsByClassName("modal-header")[0];
    header = header.getElementsByTagName("h2")[0];
    header.innerHTML = "";
}

function setTextHeader(algo=""){
    var header = document.getElementsByClassName("modal-header")[0];
    header = header.getElementsByTagName("h2")[0];
    header.innerHTML = algo;
}

function setTextFooter(algo=""){
    var footer = document.getElementsByClassName("modal-footer")[0];
    footer = footer.getElementsByTagName("h3")[0];
    footer.innerHTML = algo;
}

function setElementFooter(element){
    var footer = document.getElementsByClassName("modal-footer")[0];
    footer.innerHTML = '';
    if (!element) {
        resetFooter();
    }
    else{
        footer.appendChild(element);
    }
}

function setElementHeader(element=""){
    var header = document.getElementsByClassName("modal-header")[0];
    header.innerHTML = '';
    if(!element){
        resteHeader();
    }
    else{
        header.appendChild(element);
    }
}


function setUltimoBoton(boton){
    ultimoBoton = boton;
}

function crearNodo(tipo, clase="", id=""){
    var nodo = document.createElement(tipo);
    nodo.id = id;
    nodo.className = clase;

    return nodo;
}

//Se fija si una compra dada por nombre esta en el array de una persona
function esCompra(persona, prod){
    //Buscar el objeto persona
    for (var i = personas.length - 1; i >= 0; i--) {
        if(personas[i].nombre == persona){
            //Ver si ya tiene la compra
            var bandera = 0;
            for (var o = personas[i].comprasPorPersona.length - 1; o >= 0; o--) {
                if(personas[i].comprasPorPersona[o].producto == prod){
                    bandera = 1;
                    return true;
                }
            }
            return false;
            break;
        }
    };
}

//Muestra las compras siempre que el boton de la persona este activado
//Creo que la activacion del boton quedo obsoleta
function mostrarCompras(yo){
    var checkbox;
    var txt;
    var div;

    var personaClicker = yo.parentNode.parentNode.getElementsByTagName("td")[1];
    personaClicker = personaClicker.getElementsByTagName('input')[0].value;

    borrarModal();

    if(yo.id == "activado"){
        //Busca los datos de las compras desde el array de compras
        //Hace una lista conm checkboxes para seleccionar las compras
        for (var i = compras.length - 1; i >= 0; i--) {
            //div = document.createElement("div");
            div = crearNodo("div");
            //checkbox = document.createElement("input");
            checkbox = crearNodo("input");

            // Agrega el texto con "compra ($precio)" al checkbox
            txt = compras[i].producto;
            txt += " ($" + compras[i].precio + ")";
            txt = document.createTextNode(txt);

            checkbox.type = "checkbox";
            checkbox.className = "checkCompra";
            checkbox.value = compras[i].producto;    //No se bien por que hace esto

            //Checkear las compras que ya estan en el array de la persona
            checkbox.checked =  esCompra(personaClicker, compras[i].producto);

            div.appendChild(checkbox);
            div.appendChild(txt);           //Adiciona el texto al lado del checkbox con el nombre de la compra

            escribirModal(div);
        };

        var valor = 0;

        for (var i = personas.length - 1; i >= 0; i--) {
            if(personas[i].nombre == personaClicker){
                valor = personas[i].plataPuesta; 
            }
        }

        //Al final de los checkboxes, mostrar el input de lo que ya puso
        //div = document.createElement("div");
        div = crearNodo("div");
        txt = document.createTextNode("Puso $");
        /*
        var input = document.createElement("input");
        input.className = "modal-input"
        */
        var input = crearNodo("input", "modal-input");
        input.type = "number";
        if(valor>0){
            input.value = valor;
        }
        else{
            input.placeholder = valor;
        }
        div.appendChild(txt)
        div.appendChild(input);
        escribirModal(div);

        //Crea el boton para confirmar la seleccion de compras
        //var boton = document.createElement("input");
        var boton = crearNodo("input", "modal-boton");
        boton.type = "button";
        boton.value = "OK";


        boton.onclick = function() { 
            actualizarPersona(personaClicker, yo);
        };
        setElementFooter(boton);
        setTextHeader("Compras");
        setModoModal();
        mostrarModal();

        setUltimoBoton(yo);
        yo.id = "desactivado";      //Desactiva el boton para que no sea activado mas de una vez sin seleccionar compras
    }
}

//Vacia el array de compras de una persona para llenarlo nuevamente cuendo las seleccione en el modal
function vaciarComprasPersona(pos){
    //Resto en 1 la cantidad de compras de cada compra de la persona, para resetear las compras 
    for (var i = compras.length - 1; i >= 0; i--) {
        for (var o = personas[pos].comprasPorPersona.length - 1; o >= 0; o--) {
            if(personas[pos].comprasPorPersona[o].producto == compras[i].producto){
                compras[i].cantCompras -= 1;
                break;  //NO TESTEADO
            }
        };
    };

    //Vacio el array de compras de la persona
    personas[pos].comprasPorPersona = [];
}

//Guarda el nombre de la persona ingresda
function guardarPersona(nombre){
    var bandera = 0;
    if(nombre != ""){
        for (var i = personas.length - 1; i >= 0; i--) {
            if(personas[i].nombre == nombre){
                bandera = 1;
            }
        }
        if(bandera != 1){
            nuevaPersona = new Persona(nombre);
            personas.push(nuevaPersona);
        }
        for (var i = personas.length - 1; i >= 0; i--) {
        }
    }
}

//Guarda las compras seleccionadas para una persona
function actualizarPersona(pers, boton) {    
    var pos=-1;     //Valor imposible por si no se encuentran personas
    var boxes = document.getElementsByClassName("checkCompra");
    var puso = document.getElementsByClassName("modal-body")[0];
    puso = puso.getElementsByTagName("div");
    puso = puso[puso.length-1];
    puso = puso.getElementsByTagName("input");
    puso = puso[puso.length-1].value;
    if(puso <= 0){
        puso = 0;
    }


    //Busco a la persona en el array de personas
    for (var o = personas.length - 1; o >= 0; o--) {
        if (personas[o].nombre == pers) {
            pos = o;
        }
    }

    //No se buscarian las compras si la persona no existiera
    if(pos>=0){
        personas[pos].plataPuesta = puso;
        vaciarComprasPersona(pos);

        //Despues de eliminar las compras de la persona "clikcer", agrega las compras checkeadas al apretar OK
        for (var i = boxes.length - 1; i >= 0; i--) {
            if(boxes[i].checked){
                for (var o = compras.length - 1; o >= 0; o--) {
                    if(compras[o].producto == boxes[i].value){
                        var bandera = 0;
                        for (var u = personas[pos].comprasPorPersona.length - 1; u >= 0; u--) {
                            if(personas[pos].comprasPorPersona[u].producto == boxes[i].value){
                                bandera = 1;
                            }
                        }
                        //Si no encuentra el producto en la lista de compras de la persona, lo agrega
                        if(bandera != 1){
                            compras[o].cantCompras += 1;
                            personas[pos].comprasPorPersona.push(compras[o]);
                        }
                    }
                }
            }
        }
    }

    esconderModal();
    boton.id = "activado";
    /*
    for (var i = personas[pos].comprasPorPersona.length - 1; i >= 0; i--) {
        window.alert(personas[pos].comprasPorPersona[i]);
    }
    */
}

//Elimina a las personas que no están en input al momento de calcular
function filtrarPersonasBorradas(){
    var ingresadas = document.getElementsByClassName("table-text");
    for (var i = personas.length - 1; i >= 0; i--) {
        var bandera = 0;
        for (var o = ingresadas.length - 1; o >= 0; o--) {
            if(ingresadas[o].value == personas[i].nombre){
                bandera = 1;
            }
        }
        if(bandera != 1){
            vaciarComprasPersona(i);
            personas.splice(i, 1);
        }
    }


    /*
    //Mostrar como queda el array de personas (por checkeo)
    borrarModal();
    var div = document.createElement("div");
    for (var i = personas.length - 1; i >= 0; i--) {
        var parrafo = document.createElement("p");
        var texto = document.createTextNode(personas[i]);
        parrafo.appendChild(texto);
        div.appendChild(parrafo)
    }
    escribirModal(div);
    esconderModal();
    mostrarModal();
    */
}

function calcular(){

    filtrarPersonasBorradas();

    var pagoCompra = 0;
    borrarModal();
    for (var i = personas.length - 1; i >= 0; i--) {
        //window.alert(personas[i].nombre);
        var comprasDePersona = personas[i].comprasPorPersona;
        var pagoTotal = 0;
        var div2 = crearNodo("div");
        for (var o = comprasDePersona.length - 1; o >= 0; o--) {
            /*
            for (var u = compras.length - 1; u >= 0; u--) {
                //window.alert(compras[u].producto);
                //window.alert(comprasDePersona[o].producto);

                //Se podria evitar. En cada persona, ya estan los objetos compra, no hace falta buscarlos por coincidencias con el array de compras
                if(compras[u].producto == comprasDePersona[o].producto){
                    //window.alert(compras[u].producto);
                    mensaje = "";
                    pago = compras[u].precio / compras[u].cantCompras;
                    pago = pago - personas[i].plataPuesta;
                    mensaje = mensaje.concat(compras[u].producto);
                    mensaje = mensaje.concat(" - $");
                    mensaje = mensaje.concat(pago);
                    text = document.createTextNode(mensaje);
                    //parrafo = document.createElement("p");
                    parrafo = crearNodo("p");
                    parrafo.appendChild(text);
                    escribirModal(parrafo);

                }
            }
            */
            mensajeCompra = "";
            var pagoCompra = comprasDePersona[o].precio / comprasDePersona[o].cantCompras;
            pagoTotal += pagoCompra;
            mensajeCompra = mensajeCompra.concat(comprasDePersona[o].producto);
            mensajeCompra = mensajeCompra.concat(" : $");
            mensajeCompra = mensajeCompra.concat(pagoCompra);
            text = document.createTextNode(mensajeCompra);
            //parrafo = document.createElement("p");
            var parrafo2 = crearNodo("p");
            parrafo2.appendChild(text);
            //escribirModal(parrafo);
            div2.appendChild(parrafo2);
            div2.style = "text-indent : 1em";
        }

        pagoTotal -= personas[i].plataPuesta;

        var mensajeTotal = "";
        mensajeTotal = mensajeTotal.concat(personas[i].nombre);
        mensajeTotal = mensajeTotal.concat(": ");
        var text1 = document.createTextNode(mensajeTotal);

        var span = crearNodo("span");
        if(pagoTotal<0){
            span.style="color:green;font-weight:bold";
        }
        else{
            span.style="color:red;font-weight:bold";
        }
        mensajeTotal = "$" + pagoTotal;
        var textPrecio = document.createTextNode(mensajeTotal);
        span.appendChild(textPrecio);

        //var parrafo = document.createElement("p");
        var parrafo = crearNodo("p");
        parrafo.appendChild(text1);
        parrafo.appendChild(span);
        //escribirModal(parrafo);
        var div1 = crearNodo("div");
        div1.appendChild(parrafo);
        escribirModal(div1);
        escribirModal(div2);

    }
    setModoModal();
    mostrarModal();
}