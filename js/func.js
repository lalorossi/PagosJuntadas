// Wait for device API libraries to load
    //
    function onLoad() {
        //document.addEventListener("deviceready", onDeviceReady, false);
        document.addEventListener("backbutton", onBackKeyDown, false);

        document.getElementsByClassName("plHolderRand")[0].placeholder = cambiarPlaceholder(document.getElementsByClassName("plHolderRand")[0]);

        document.addEventListener(window.nativeGestures.EVENTS.GESTURE_SCALE, (e) => {
            window.alert("hola");
        });

        navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
    }

    function onBackKeyDown() {
        if(document.getElementById("pag1").style.display != "none"){
            navigator.app.exitApp();
        }
        else{
            cambiarPagina("pag1");
        }
    }

    // // device APIs are available
    // //
    // function onDeviceReady() {
    //     // Register the event listener
    //     document.addEventListener("backbutton", onBackKeyDown, false);
    // }

    // // Handle the back button
    // //
    // function onBackKeyDown() {
    //  window.alert("HOLA");
    // }



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

var placeholdersCompra = [  "Papitas",
                            "Chizitos",
                            "Cerveza",
                            "Gaseosas",
                            "Helado",
                            "Pizzas",
                            "Aderezos",
                            "Hamburguesas",
                            "Panes",
                            "Delivery",
                            "Agua mineral",
                            "Verduras",
                            "Mani",
                            "Carbon",
                            "Queso cheddar"
                            ];
var placeholdersExtra = [   "Algo mas?",
                            "Bueno, ya fue no?",
                            "Se fundieron con las compras",
                            "Ricky Fort no compraba tanto",
                            "Oro en polvo",
                            "Se me sobrecarga la app",
                            "El Santo Grial",
                            "Cuerno de unicornio",
                            "Un Bitcoin"
                            ];

//Este array no tiene los numeros para darlos de baja porque cuando llego acá, si sigo agregando compras tengo que repetir en algun punto
var placeholdersExtra2 = [  "Una noche con Pampita",
                            "Enanos",
                            "Dignidad",
                            "Pancho de Bob Esponja",
                            "Trabas",
                            "Ya en serio, para",
                            "El amor de ella"
                            ]

//window.onload = document.getElementsByClassName("plHolderRand")[0].placeholder = cambiarPlaceholder(document.getElementsByClassName("plHolderRand")[0]);
//Agrega un input de compra o persona
function agregar() {
    /*
    var nuevo = document.createElement("tr");
    nuevo.className=cla;
    */
    if(document.getElementById("pag1").style.display != "none"){
        var cla = "compra";
    }
    else{
        var cla = "persona";
    }
    //window.alert(cla);

    var nuevo = crearNodo("tr", cla);
    nuevo.classList.add("texto2");

    //Si quiero agregar una compra, lo agreago a la pagina 1
    if(cla == "compra"){
        nuevo.innerHTML = primerCampoCompra;
        var inputNuevo = nuevo.getElementsByTagName("input")[0];
        inputNuevo.placeholder = cambiarPlaceholder(inputNuevo);
        document.getElementById("page1").getElementsByTagName("tbody")[0].appendChild(nuevo);
        if(cordova.plugins.Keyboard.isVisible){
            inputNuevo.focus();
        }
        // var asd = document.getElementsByClassName("plHolderRand");
        // asd = asd[asd.length-1];
        // asd.focus();
    }

    //Si es una persona, a la pagina 2
    if(cla == "persona"){
        nuevo.innerHTML = primerCampoPersona;
        var inputNuevo = nuevo.getElementsByTagName("input")[0];
        document.getElementById("page2").getElementsByTagName("tbody")[0].appendChild(nuevo);    
        if(cordova.plugins.Keyboard.isVisible){
            inputNuevo.focus();
        }
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
/*
function filtrarPlaceholders(array){
    arrayFiltrado = [];
    var o = 0;
    for (var i = 0; i < array.length; i++) {
        if(array[i][1] == 0){
            arrayFiltrado[o] = array[i][0];
            o++;
        }
    }
    return arrayFiltrado;
}
*/
function cambiarPlaceholder(inputNuevo){
    var inputs = document.getElementsByClassName("plHolderRand");
    if(inputs.length < 8){
        var indiceRand = Math.floor(Math.random()*placeholdersCompra.length);
        var ph = placeholdersCompra[indiceRand];
        placeholdersCompra.splice(indiceRand, 1);
    }else if(inputs.length < 13){
        var indiceRand = Math.floor(Math.random()*placeholdersExtra.length);
        var ph = placeholdersExtra[indiceRand];
        placeholdersExtra.splice(indiceRand, 1);
    }else{
        var indiceRand = Math.floor(Math.random()*placeholdersExtra2.length);
        var ph = placeholdersExtra2[indiceRand];
    }
    return ph;
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
        //document.getElementsByClassName("boton-header")[0].style.color="#4285f4";
        document.getElementsByClassName("boton-header")[0].style.display="none";
        document.getElementsByClassName("boton-header")[0].disabled=true
        document.getElementById("nombre-pagina").innerHTML = "Compras"
        //document.getElementsByClassName("plus")[1].innerHTML = "keyboard_arrow_right";
    }
    else{
        document.getElementById("pag1").style.display="none";
        //document.getElementsByClassName("boton-header")[0].style.color="#fff";
        document.getElementsByClassName("boton-header")[0].style.display="";
        document.getElementsByClassName("boton-header")[0].disabled=false;
        document.getElementById("nombre-pagina").innerHTML = "Personas"
        //document.getElementsByClassName("plus")[1].innerHTML = "check";
    }
    //Funciona, pero le cambio el display en vez del color de letra para esconderlo
    // document.getElementsByClassName("boton-header")[0].classList.toggle("textoInvisible");
    // document.getElementsByClassName("boton-header")[0].classList.toggle("texto1");
}

function existeCompra(compra) {
    for (var i = compras.length - 1; i >= 0; i--) {
        if(compras[i].producto == compra){
            return true;
        }
    }
    return false;
}

function avanzar(){
    if(document.getElementById("pag1").style.display != "none"){
        checkSubmit();
    }
    else{
        calcular();
    }
}

function alertDismissed(){
    
}

compras = [];   //Notar que al no poner var, se hace global
function checkSubmit(){
    //Checkea que se pueda pasar a la siguiente pagina viendo si al menos un campo de compra está completo
    var vacio = 0;

    var rows = document.getElementsByClassName("compra");

    //Selecciona todas las compras y se fija si al menos una tiene todos los valores asignados
    for (var i = rows.length - 1; i >= 0; i--) {
        var celdas = rows[i].getElementsByTagName('input');

        if(celdas[0].value=="" || celdas[1].value=="" || celdas[1].value == 0){
        }
        else{
            //Cuando encuentra una compra completa la agrega al array de compras
            //Verifica que el nombre de la compra no exista
            var nuevaCompra = new Compra(celdas[0].value, celdas[1].value);
            if(!existeCompra(nuevaCompra.producto)){
                compras.push(nuevaCompra);
            }
            vacio=1;
        }
    }

    //Si encontro al menos una compra, pasa a la pagina2        
    if (vacio==1) {
        cambiarPagina("pag2");
        //return true;
    }
    else{
        /*
        borrarModal();
        //var parrafo = document.createElement("p");
        var parrafo = crearNodo("P");
        parrafo.classList.add("textoModal");
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

        boton.classList.add("botonMaterial");
        boton.classList.add("textoBotonMaterial");


        setElementFooter(boton);
        setModoModal("error");
        escribirModal(parrafo);
        mostrarModal();
        */

        navigator.notification.alert(
            'Ingrese al menos una compra con precio',  // message
            alertDismissed,         // callback
            'Ups...',            // title
            'Ok'                  // buttonName
        );
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
    header = header.getElementsByTagName("h3")[0];
    header.innerHTML = "";
}

function setTextHeader(algo=""){
    var header = document.getElementsByClassName("modal-header")[0];
    header = header.getElementsByTagName("h3")[0];
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

function round(value, step) {
    step || (step = 1.0);
    var inv = 1.0 / step;
    return Math.round(value * inv) / inv;
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
            checkbox.checked = esCompra(personaClicker, compras[i].producto);

            div.appendChild(checkbox);
            div.appendChild(txt);           //Adiciona el texto al lado del checkbox con el nombre de la compra
            div.classList.add("textoModal");

            div.classList.add("textoModal");
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
        div.classList.add("textoModal");
        txt = document.createTextNode("Puso $");
        /*
        var input = document.createElement("input");
        input.className = "modal-input"
        */
        var input = crearNodo("input", "modal-input");
        input.classList.add("transparente1");
        input.type = "number";
        if(valor>0){
            input.value = valor;
        }
        else{
            input.placeholder = valor;
        }

        input.classList.add("transparente1");

        div.appendChild(txt)
        div.appendChild(input);
        div.classList.add("textoModal");
        escribirModal(div);

        //Crea el boton para confirmar la seleccion de compras
        //var boton = document.createElement("input");
        var boton = crearNodo("input", "modal-boton");
        boton.type = "button";
        boton.value = "CONFIRMAR";


        boton.classList.add("botonMaterial");
        boton.classList.add("textoBotonMaterial");


        boton.classList.add("botonMaterial");
        boton.classList.add("textoBotonMaterial");



        boton.onclick = function() { 
            actualizarPersona(personaClicker, yo);
        };
        var botonCancelar = crearNodo("input", "modal-boton");
        botonCancelar.type = "button";
        botonCancelar.value = "CANCELAR";
        botonCancelar.style.color = "#000";


        botonCancelar.classList.add("botonMaterial");
        botonCancelar.classList.add("textoBotonMaterial");


        botonCancelar.onclick = function() { 
            esconderModal();
        };

        var divBotones = crearNodo("div");
        divBotones.appendChild(botonCancelar);
        divBotones.appendChild(boton);

        setElementFooter(divBotones);
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

function actualizable(nombre){
    if(nombre){
            //window.alert(nombre);
            isNombreSeteado = true;
            nombreseteado = nombre;
    }else{
        isNombreSeteado = false;
    }
}

//Guarda el nombre de la persona ingresda
function guardarPersona(inp){
    nombre = inp.value;
    //window.alert(nombre);
    var bandera = 0;
    if(nombre != ""){
        for (var i = personas.length - 1; i >= 0; i--) {
            if(personas[i].nombre == nombre){
                bandera = 1;
            }
        }
        if(bandera != 1){
            if(isNombreSeteado){
                for (var i = personas.length - 1; i >= 0; i--) {
                    if(personas[i].nombre == nombreseteado){
                        personas[i].nombre = nombre;
                    }           
                }
            }
            else{
                nuevaPersona = new Persona(nombre);
                personas.push(nuevaPersona);
            }
        }
        for (var i = personas.length - 1; i >= 0; i--) {
        }
    }
    else{
        //No funciona todavia   
        inp.parentNode.parentNode.getElementsByTagName("td")[2].innerHTML = "";
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
        //window.alert(personas[o].nombre);
    }
    //No se buscarian las compras si la persona no existiera
    if(pos>=0){
        personas[pos].plataPuesta = puso;
        vaciarComprasPersona(pos);

        var marcadas = 0;

        //Despues de eliminar las compras de la persona "clikcer", agrega las compras checkeadas al apretar OK
        for (var i = boxes.length - 1; i >= 0; i--) {
            if(boxes[i].checked){
                marcadas++;
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
    else{
        var marcadas = 0;
    }

    var rows = document.getElementsByClassName("persona");

    for (var i = rows.length - 1; i >= 0; i--) {
        var nombrePers = rows[i].getElementsByTagName("td")[1];
        //window.alert(nombrePers);
        nombrePers = nombrePers.getElementsByTagName("input")[0].value;
        //window.alert(nombrePers);
        if(nombrePers == pers){
            if(marcadas==0){
                rows[i].getElementsByTagName("td")[2].innerHTML = "";    
            }else{
                rows[i].getElementsByTagName("td")[2].innerHTML = "(" + marcadas + ")";
            }
            break;
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
    var ingresadas = document.getElementsByClassName("inputNombre");
    for (var i = personas.length - 1; i >= 0; i--) {
        var bandera = 0;
        //window.alert("1");
        for (var o = ingresadas.length - 1; o >= 0; o--) {
            //window.alert("2");
            if(ingresadas[o].value == personas[i].nombre){
                //window.alert("Encuentra el nombre");
                //window.alert(personas[i].plataPuesta);
                if(personas[i].comprasPorPersona.length>0 || personas[i].plataPuesta>0){
                    bandera = 1;
                }
                else{
                    //window.alert("Encuentra el nombre sin compras");
                    var personaSinCompras = o;
                }
            }
        }
        if(bandera != 1){
            //window.alert("Tiene que borrar");
            ingresadas[personaSinCompras].value = "";
            vaciarComprasPersona(i);
            personas.splice(i, 1);
            //window.alert("Borra bien");
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
            mensajeCompra = mensajeCompra.concat(" : +$");
            mensajeCompra = mensajeCompra.concat(round(pagoCompra, 0.5));
            text = document.createTextNode(mensajeCompra);
            //parrafo = document.createElement("p");
            var parrafo2 = crearNodo("p");
            parrafo2.appendChild(text);
            //escribirModal(parrafo);
            div2.appendChild(parrafo2);
        }
        div2.style = "text-indent : 1em";
        div2.style.display = "none";
        div2.className = "detalles-" + personas[i].nombre;
        
        if (personas[i].plataPuesta>0) {
            text = "Puso : -$" + round(personas[i].plataPuesta, 0.5);
            text = document.createTextNode(text);
            var parrafo2 = crearNodo("p");
            parrafo2.appendChild(text);
            div2.appendChild(parrafo2);
        }

        pagoTotal -= personas[i].plataPuesta;

        var parrafo = crearNodo("p");

        if(pagoTotal!=0 || personas[i].plataPuesta>0){   
            var mensajeTotal = "";
            mensajeTotal = mensajeTotal.concat(personas[i].nombre);
            mensajeTotal = mensajeTotal.concat(": ");
            var text1 = document.createTextNode(mensajeTotal);
            parrafo.appendChild(text1);
        }

        var span = crearNodo("span");
        if(pagoTotal<=0){
            span.style="color:green;font-weight:bold";
        }
        else{
            span.style="color:red;font-weight:bold";
        }
        mensajeTotal = "$" + round(pagoTotal, 0.5);
        var textPrecio = document.createTextNode(mensajeTotal);
        span.appendChild(textPrecio);

        //var parrafo = document.createElement("p");

        var botonDetalles = crearNodo("button");
        //var textBoton = document.createTextNode("+");
        //botonDetalles.appendChild(textBoton);

        botonDetalles.innerHTML = '<i class="material-icons" style="font-size: 1.3em;">info_outline</i>';

        botonDetalles.id = div2.className;
        //window.alert(div2.id);
        botonDetalles.addEventListener("click", function(){
            //window.alert(this.id);
            //window.alert(document.getElementsByClassName(this.id)[0].style.display);
            if (document.getElementsByClassName(this.id)[0].style.display != "none"){
                document.getElementsByClassName(this.id)[0].style.display = "none";
            }else{
                document.getElementsByClassName(this.id)[0].style.display = "block";
            }
        });

        parrafo.appendChild(span);
        if(pagoTotal!=0 || personas[i].plataPuesta>0){
            parrafo.appendChild(botonDetalles);
        }

        parrafo.style = "font-size:1.3em";



        //escribirModal(parrafo);
        var div1 = crearNodo("div");
        div1.appendChild(parrafo);
        escribirModal(div1);
        escribirModal(div2);

    }
    //Solo muestra los detalles de las compras si todas las personas tienen compras asignadas
    //Esto falla si solo la primer persona es vacio
    if(personas.length>0 && personas[0].nombre != ""){
        //window.alert("HOLA");
        setModoModal();   
        //Crear boton de OK que esconde el modal
        //var boton = document.createElement("input");
        var boton = crearNodo("input", "boton-modal");
        boton.type = "button";
        boton.value = "OK";

        boton.onclick = function() { 
            esconderModal();
        };
        boton.classList.add("botonMaterial");
        boton.classList.add("textoBotonMaterial");


        setElementFooter(boton);
        mostrarModal();
    }
    else{
        /*
        borrarModal();
        //var parrafo = document.createElement("p");
        var parrafo = crearNodo("P");
        parrafo.classList.add("textoModal");
        var texto = document.createTextNode("Ingrese al menos una persona con compras");
        parrafo.appendChild(texto);

        setModoModal("error");
        escribirModal(parrafo);
        */
        navigator.notification.alert(
            'Ingrese al menos una persona con compras',  // message
            alertDismissed,         // callback
            'Ups...',               // title
            'Ok'                    // buttonName
        );
    }
}








/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
    opcActivadas = true;
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
}

function onConfirm(buttonIndex) {
    if(buttonIndex==1){
        navigator.notification.alert(
            'Podés volver a empezar de nuevo',  // message
            alertDismissed,         // callback
            'Se borraron todos los datos',            // title
            'Ok'                  // buttonName
        );
    }else{
        navigator.notification.alert(
            'No se borró nada',  // message
            alertDismissed,         // callback
            'Tibio',            // title
            'OK'                  // buttonName
        );
    }
}
function borrar(){

navigator.notification.confirm(
    'Se borrarán todos los datos ingresados', // message
     onConfirm,            // callback to invoke with index of button pressed
    'Estás Seguro?',           // title
    ['Borrar','Cancelar']     // buttonLabels
);
}