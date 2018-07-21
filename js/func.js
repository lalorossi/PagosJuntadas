// Wait for device API libraries to load
    //
    function onLoad() {
        //document.addEventListener("deviceready", onDeviceReady, false);
        document.addEventListener("backbutton", onBackKeyDown, false);

        document.getElementsByClassName("plHolderRand")[0].placeholder = cambiarPlaceholder(document.getElementsByClassName("plHolderRand")[0]);


        /*
        navigator.notification.alert(
            'You are the winner!',  // message
            alertDismissed,         // callback
            'Game Over',            // title
            'Done'                  // buttonName
        );
        */
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
//Manda el forzado para poder agregar personas aunque la pagina de personas no este abierta (durante la carga)
function agregar(claseForzada) {
    /*
    var nuevo = document.createElement("tr");
    nuevo.className=cla;
    */
    if(claseForzada == ""){
        if(document.getElementById("pag1").style.display != "none"){
            var cla = "compra";
        }
        else{
            var cla = "persona";
        }
    }
    //Si quiero forzar el agregar una persona, me aseguro con personasForzado
    else{
        var cla = claseForzada;
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
    if(idPagina == "pag1" && modalGlobal.style.display == "none"){
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
        checkSubmit(false);
    }
    else{
        if(modalGlobal.style.display == "none"){
            calcular(false);
        }
    }
}

function alertDismissed(){
    
}

function actualizarParentesisPersonas(compraBorrada){
    for (var i = personas.length - 1; i >= 0; i--) {
        var bandera = 0;
        for (var o = personas[i].comprasPorPersona.length - 1; o >= 0; o--) {
            //Busco las personas que tengan la compra en su lista
            if(personas[i].comprasPorPersona[o].producto == compraBorrada.producto){

                //Si la persona tiene lal compra, le saco el parentesis
                // window.alert("persona a actualizar");
                var filasPersonas = document.getElementsByClassName("persona");
                for (var u = filasPersonas.length - 1; u >= 0; u--) {
                    if(filasPersonas[u].getElementsByTagName("input")[0].value == personas[i].nombre){
                        var parentesisPersona = filasPersonas[i].getElementsByTagName("td")[2].innerHTML;
                        parentesisPersona = parentesisPersona.substr(1,1);
                        // window.alert(parentesisPersona);
                        if(parentesisPersona > 1){
                            filasPersonas[i].getElementsByTagName("td")[2].innerHTML = "(" + (parentesisPersona-1) + ")";                    
                        }
                        else{
                            filasPersonas[i].getElementsByTagName("td")[2].innerHTML = "";                    

                        }                            
                    }
                }
                personas[i].comprasPorPersona.splice(o, 1);
            }
        }
    }
}

compras = [];   //Notar que al no poner var, se hace global

function filtrarComprasBorradas(){
    var ingresadas = document.getElementsByClassName("compra");
    for (var i = compras.length - 1; i >= 0; i--) {
        var bandera = 0;
        //window.alert("1");
        for (var o = ingresadas.length - 1; o >= 0; o--) {
            //window.alert("2");
            var compraInput = ingresadas[o].getElementsByTagName("input")[0].value;
            if(compraInput == compras[i].producto){
                bandera = 1;
                //window.alert("Encuentra el nombre");
                //window.alert(personas[i].plataPuesta);
            }
        }
        if(bandera != 1){
            // window.alert("tiene que borrar");
            actualizarParentesisPersonas(compras[i]);
            compras.splice(i, 1);
            //Saca tambien el (1) de las personas con esa compra (deberia)
        }
    }

}

function checkSubmit(seQueda){
    //Checkea que se pueda pasar a la siguiente pagina viendo si al menos un campo de compra está completo
    var vacio = 0;

    var rows = document.getElementsByClassName("compra");
    filtrarComprasBorradas();
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
        if(seQueda==false){
            cambiarPagina("pag2");
        }
        else{
            return true;
        }
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
        return false;
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
    //ultimoBoton.id = "activado";
    //
    //  
    //  
    //          ESTO PUEDE FALLAR  
    //  
    //  
    //  

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
    header.innerHTML = "";
    //var h = document.createElement("h3");
    var h = crearNodo("h3");
    header.appendChild(h);
}

function setTextHeader(algo=""){
    var header = document.getElementsByClassName("modal-header")[0];
    header = header.getElementsByTagName("h3")[0];
    header.innerHTML = algo;
    header.style = "text-align: left";
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

function setElementHeader(element){
    var headerModal = document.getElementsByClassName("modal-header")[0];
    headerModal.innerHTML = '';
    headerModal.style = "text-align: right";
    if(!element){
        resteHeader();
    }
    else{
        headerModal.appendChild(element);
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

    //OJO ACÁ. 
    if(yo.id == "activado"){
        //Busca los datos de las compras desde el array de compras
        //Hace una lista conm checkboxes para seleccionar las compras
        for (var i = compras.length - 1; i >= 0; i--) {
            //div = document.createElement("div");
            div = crearNodo("p");
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
        setTextHeader(personaClicker);
        setModoModal();
        if(personaClicker != "")
            mostrarModal();
        else{
            navigator.notification.alert(
                'Ingrese el nombre de la persona',  // message
                alertDismissed,         // callback
                'Ups..',            // title
                'OK'                  // buttonName
            );
        }

        setUltimoBoton(yo);
        //yo.id = "desactivado";      //Desactiva el boton para que no sea activado mas de una vez sin seleccionar compras
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

function calcular(carga){

    if(carga == false){
        filtrarPersonasBorradas();
    }
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
            parrafo2.style.margin = "10px";
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

        var botonDetalles = crearNodo("button", "botonMaterial");
        botonDetalles.classList.add("texto2");
        //var textBoton = document.createTextNode("+");
        //botonDetalles.appendChild(textBoton);

        botonDetalles.innerHTML = '<i class="material-icons" style="font-size: 1.6em;">keyboard_arrow_down</i>';

        botonDetalles.id = div2.className;
        //window.alert(div2.id);
        botonDetalles.addEventListener("click", function(){
            //window.alert(this.id);
            //window.alert(document.getElementsByClassName(this.id)[0].style.display);
            if (document.getElementsByClassName(this.id)[0].style.display != "none"){
                document.getElementsByClassName(this.id)[0].style.display = "none";
                botonDetalles.innerHTML='<i class="material-icons" style="font-size: 1.6em;">keyboard_arrow_down</i>';
            }else{
                document.getElementsByClassName(this.id)[0].style.display = "block";
                botonDetalles.innerHTML='<i class="material-icons" style="font-size: 1.6em;">keyboard_arrow_up</i>';
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

        var botonShare = crearNodo("button", "botonMaterial");
        botonShare.innerHTML = '<i style="padding:0px" class="material-icons">share</i>'
        botonShare.classList.add("texto2");
        botonShare.style = "padding-top: 10px";

        botonShare.onclick = function() { 
            guardarImagen();
        };
        setElementHeader(botonShare);
        

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





var modalGlobal = document.getElementById("myModal");



/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdown() {
    if(modalGlobal.style.display == "none"){
        document.getElementById("myDropdown").classList.toggle("show");
        opcActivadas = true;
    }
}

//Para ver si un elemento esta entre los descendientes de otro
function isDescendant(parent, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
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
      var header = document.getElementsByClassName("header")[0];
      if(event.target == modalGlobal){
        modalGlobal.style.display = "none";
      }
}

function onConfirm(buttonIndex) {
    if(buttonIndex==1){
        //Esto mostraria una notificacion de borrado, pero me parece molesta
        /*
        navigator.notification.alert(
            'Podés volver a empezar de nuevo',  // message
            alertDismissed,         // callback
            'Se borraron todos los datos',            // title
            'Ok'                  // buttonName
        );
        */
        location.reload(true);
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

//Funciones para guardar imagenes
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function savebase64AsImageFile(folderpath,filename,content,contentType){
// Convert the base64 string in a Blob
    var DataBlob = b64toBlob(content,contentType);
    
    console.log("Starting to write the file :3");
    
    window.resolveLocalFileSystemURL(folderpath, function(dir) {
        console.log("Access to the directory granted succesfully");
        dir.getFile(filename, {create:true}, function(file) {
            console.log("File created succesfully.");
            file.createWriter(function(fileWriter) {
                console.log("Writing content to file");
                fileWriter.write(DataBlob);
            }, function(){
                alert('Unable to save file in path '+ folderpath);
            });
        });
    });
}

//document.getElementById('btn').addEventListener('click', function() {
function guardarImagen(){
var node = document.getElementsByClassName('modal-body')[0];

    domtoimage.toPng(node, {bgcolor: "white"})
    .then(function(dataUrl) {
        console.log(dataUrl);
        //window.open(dataUrl);
        //var img = new Image();
        //img.src = dataUrl;
        //document.getElementById("here-appear-theimages").appendChild(img);
        //var asd = document.getElementById("aaa");
        //asd.href = dataUrl;
        //asd.click();
        var pathImagenGuardada = cordova.file.cacheDirectory;
        pathImagenGuardada = pathImagenGuardada + "/myimage.png";
        //window.alert(pathImagenGuardada);
        var opcionesCompartir = {
            message: '', // not supported on some apps (Facebook, Instagram)
            subject: '', // fi. for email
            files: [pathImagenGuardada], // an array of filenames either locally or remotely
            url: '',
            chooserTitle: 'Enviar pot medio de:' // Android only, you can override the default share sheet title
        }

        var exitoCompartir = function(result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        }
     
        var errorCompartir = function(msg) {
          console.log("Sharing failed with message: " + msg);
        }

        //window.alert(dataUrl);

        /** Process the type1 base64 string **/
        var myBaseString = dataUrl; //"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkYAAA.....";

        // Split the base64 string in data and contentType
        var block = myBaseString.split(";");

        // Get the content type
        var dataType = block[0].split(":")[1];// In this case "image/png"
        //window.alert(dataType);

        // get the real base64 content of the file
        var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."

        // The path where the file will be created
        var folderpath = cordova.file.cacheDirectory;//"file:///storage/emulated/0/";
        // The name of your file, note that you need to know if is .png,.jpeg etc
        var filename = "myimage.png";

        //Guardar la imagen en el dispositivo
        savebase64AsImageFile(folderpath,filename,realData,dataType);

        //Agregar la imagen a la vista
        //var imagen = document.createElement("img");
        //imagen.src = pathImagenGuardada;
        //window.alert(imagen.innerHTML);
        //document.getElementById("here-appear-theimages").appendChild(imagen);

        //Saber si se puede compartir pot whatsapp
        //window.plugins.socialsharing.canShareVia('whatsapp', 'msg', null, pathImagenGuardada, null, function(e){alert(e)}, function(e){alert(e)});

        //Compartir imagen creada
        window.plugins.socialsharing.shareWithOptions(opcionesCompartir, exitoCompartir, errorCompartir);
        //window.plugins.socialsharing.shareViaWhatsApp('Message via WhatsApp', pathImagenGuardada /* img */, null /* url */, function() {console.log('share ok')}, function(errormsg){alert(errormsg)});

        esconderModal();
    })
    .catch(function(error) {
      console.error('oops, something went wrong!', error);
    });
}


//GUARDAR REGISTRO
/*


**Primero habría que comprobar que los campos de compras y/o personas no estén vacíos
    Basicamente eso significa saber si se podría iniciar un cálculo con los datos que se presentan
**Me parece que convendría guardar los datos de los objetos en vez de los datos de los inputs
    Porque en esos datos también están las relaciones de compras por persona
Se podría hacer un guardado del tipo relacional, guardando los objetos por separado y después las relaciones como algo aparte
    Para eso habría que pensar si se les asigna una key para poder hace la "tabla relacional"
Una vez que tenga decidido cómo y qué guardar, se tiene que pasar todo a texto para guardarlo en un archivo
    Supongo que el formato es xml pero la verdad que no tengo ni idea
    Capaz que con JSon o algo así se estandariza y se hace más fácil poder pasarlo después a objetos
**Tiene que haber 4 funciones
    La primera controla que se cumplan los requisitos previos al guardado
    La segunda crea el string de datos que se va a guardar
    Otra pordía crear y guardar el archivo (capaz que se pueden por separado)
    El siguiente paso/función es para agregarle un comentario o nombre de guardado para que se amigable
    Una función que deje buscar y seleccionar un archivo entre los ya guardados
    Acá tiene que haber una opción para conservar los datos previos a la búsqueda (ver solo resultados)
        Y orta para que se carguen los datos en los input (poder modificar el registro)
    Otra que cree los objetos necesarios para que el programa siga funcinando desde donde esté
    Y finalmente una que llene los inputs necesarios

-----USUARIO-----
Abrir el menú y seleccionar la opcion de "guardar registro"
**
Elegir entre guardar todos los datos o solo compras y precios
    Si elije guardar solo compras, comprobar que al menos haya una
    Si elije guardar todo, guarda las cosas "completas" que haya (compras con nombre y precio, personas con nombre y una compra)
Capaz que acá no sería necesario la selccion. Que guarde todo lo que haya completo y despúes la opción se da al cargar los datos
**
Escribir una etiqueta opcional para el archivo
El nombre final es: AA_MM_DD_HH_MM - <etiqueta>
GUARDAR

Abrir el menú y seleccionar la opción "explorar registros"
Seleccionar para un regisrto las opciones "editar" o "utilizar"
    Si elije "editar" permite cambiar la etiqueta o borrarlo (confimando cambios)
    Si elije "utilizar" puede seleccionar entre "cargar datos" o "mostrar resultado"
        Cargar datos deja elejir entre cargar todo o solo compras 
            Cargar todo llena los inputs y crea los objetos necesarios con sus "relaciones" y deja continuar
            Cargar solo compras solo llena los inputs de compra y crea esos objetos
                (HABRIA QUE VER SI SE CONSERVAN LAS COMPRAS Y PERSONAS YA INGRESADAS)
        Después rellena los inputs para que puedan ser editados antes de calcular
        Mostrar resultado solo muestra el modal (si fuera posible hacer el cálculo)

-----SISTEMA-----
**
Para guardar solo compras
    Lee los input de compra
        Guarda nombre y precio de cada compra
**
Para guardar todo
    Lee los objetos compras y personas (al menos debe existir un objeto compra o persona)
                                        Ver si no es requisito que haya al menos una compra
    De cada persona guarda:
        nombre
        plata puesta
        arreglo de nombres de compras
    De cada compra guarda:
        producto
        precio
        cantidad de compras



Para cargar datos
    Lee los datos de compras y los mete en inputs
    Crea cada objeto compra
    Si la opción es cargar también personas:
        Lee los datos de personas y los mete en inputs
        Crea cada objeto persona
        Asigna a cada persona las compras que tiene


Para mostrar resultado
    Crea un conjunto de objetos aparte para no sobreescribir los que ya hay
    Solo muestra el modal de resultados con el cálculo correspondiente


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

*/

function crearNombreArchivo(){
    //Nombre de guardado del archivo
    var fecha = new Date();
    var anno = fecha.getFullYear();
    var mes = ("0" + fecha.getMonth()).slice(-2);
    var dia = ("0" + fecha.getDate()).slice(-2);
    var horas = ("0" + fecha.getHours()).slice(-2);
    var minutos = ("0" + fecha.getMinutes()).slice(-2);
    nombreArchivo = anno + "_" + mes + "_" + dia + "-" + horas + "_" + minutos;
    return nombreArchivo;
}

function aceptarGuardado(totalJson, resultado, msj) { 
    if(resultado.buttonIndex == 1){
        var nombreArchivo = crearNombreArchivo();

        //Crea el nombre del archivo con la etiqueta
        var etiqueta = document.getElementsByClassName("modal-body")[0];
        //etiqueta = etiqueta.getElementsByTagName("input");
        //etiqueta = etiqueta[etiqueta.length-1].value;
        var etiqueta = resultado.input1;
        //window.alert(etiqueta);
        if(etiqueta != ""){
            nombreArchivo += ("-" + etiqueta);
        }
        nombreArchivo += ".txt";
        // window.alert(nombreArchivo);

        //Guardar el archivo en cordova.file.dataDirectory
        var directorio = "file:///storage/emulated/0";  //Solo para pruebas
        //var directorio = cordova.file.dataDirectory;
        //var nombreArchivo = "myfile.txt"; //Solo para pruebas
        // window.alert(directorio);
        window.resolveLocalFileSystemURL(directorio, function(dir) {
            dir.getFile(nombreArchivo, {create:true}, function(fileEntry) {
                // el archivo ha sido creado satisfactoriamente.
                // Usa fileEntry para leer el contenido o borrar el archivo

                fileEntry.createWriter(function (fileWriter) {
                    fileWriter.write(totalJson);
                    navigator.notification.alert(
                        msj,  // message
                        alertDismissed,         // callback
                        'Registro Guardado',               // title
                        'Ok'                    // buttonName
                    );
                    }, onErrorWriteFile);
                }, onErrorWriteFile);
            }, onErrorWriteFile);
    }
}

function onErrorWriteFile(){
    navigator.notification.alert(
        'Ocurrió un error en la escritura. Reintente la operación',  // message
        alertDismissed,         // callback
        'Ups...',               // title
        'Ok'                    // buttonName
    );
}   


//Permite guardar todos los datos ingresados de compras y personas para poder buscarlos después
function guardarRegistro(){
    if(checkSubmit(true)){
        //Pasar los objetos de compras usados (los que tienen input, aunque no se si es necesario ese checkeo)
        var comprasJson = "";
        compras.forEach(function(unaCompra){
            var objetoJson = JSON.stringify(unaCompra);
            comprasJson += objetoJson;
        });

        //Pasar los objetos de personas usados (idem compras)
        filtrarComprasBorradas();
        var personasJson = "";
        personas.forEach(function(unaPersona){
            var objetoJson = JSON.stringify(unaPersona);
            personasJson += objetoJson;
        });

        var totalJson = comprasJson + " " + personasJson;

        //window.alert(totalJson);


        //Mostrar el numero de compras y personas que se van a guardar
        borrarModal();
        setTextHeader("Guardar registro")
        // div = crearNodo("div");
        // div.classList.add("textoModal");

        //Crear mensaje de guardado
        var msj = "El registro contiene " + compras.length + " compra";
        if(compras.length>1)
            msj + "s";
        if(personas.length>0){
            msj += " y " + personas.length + " persona";
            if(personas.length>1)
                msj += "s";
        }
        /*
        txtCant = document.createTextNode(msj);
        var parrafo = crearNodo("p", "textoModal");
        parrafo.appendChild(txtCant);
        parrafo.style.fontSize="0.8em";
        parrafo.style.marginTop = "6px";
        //div.appendChild(parrafo);
        //div.appendChild(crearNodo("br"));

        //Ingreso de etiqueta (opcional para el usuario)
        txt = document.createTextNode("Etiqueta del registro (opcional):");
        var input = crearNodo("input", "modal-input");
        input.classList.add("transparente1");
        input.type = "text";
        input.placeholder = "_";
        input.style.width = "90%";

        input.classList.add("transparente1");
        var parrafo2 = crearNodo("p", "textoModal");
        parrafo2.appendChild(txt);
        parrafo2.appendChild(input);
        // div.appendChild(parrafo2);
        // div.appendChild(input);
        // div.classList.add("textoModal");
        escribirModal(parrafo2);
        escribirModal(input);
        escribirModal(parrafo);
        //escribirModal(div);

        //Crea el boton para confirmar la etiqueta
        var boton = crearNodo("input", "modal-boton");
        boton.type = "button";
        boton.value = "GUARDAR";
        boton.classList.add("botonMaterial");
        boton.classList.add("textoBotonMaterial");

        var botonCancelar = crearNodo("input", "modal-boton");
        botonCancelar.type = "button";
        botonCancelar.value = "CANCELAR";
        botonCancelar.style.color = "#000";
        botonCancelar.classList.add("botonMaterial");
        botonCancelar.classList.add("textoBotonMaterial");

        //Funcion que hace todos los pasos de guardado
        boton.onclick = function() {
            aceptarGuardado(totalJson);
        }

        botonCancelar.onclick = function() { 
            esconderModal();
        };

        var divBotones = crearNodo("div");
        divBotones.appendChild(botonCancelar);
        divBotones.appendChild(boton);

        setElementFooter(divBotones);

        //mostrarModal();
        */
        navigator.notification.prompt(
            'Etiqueta del registro (opcional)',  // message
            function(results) {
                aceptarGuardado(totalJson, results, msj);
            },                  // callback to invoke
            'Guardar registro',            // title
            ['Guardar','Cancelar'],             // buttonLabels
            ''                 // defaultText
        );
    }
    else{
        //ERROR
    }
}

function explorarRegistro(despuesDeBorrado){
    //Buscar archivos del tipo de registro
    var directorio = "file:///storage/emulated/0";  //Solo para pruebas
    // Leer un archivo de tetxo
    window.resolveLocalFileSystemURL(directorio, function(dir) {
            //Lector de directorio
            var directoryReader = dir.createReader();
            //Mostrar la lisa de directorios
            directoryReader.readEntries(function(entries){
                    verArchivos(entries, despuesDeBorrado);
                } ,onErrorReadFile);

        }, 
    onErrorReadFile);


    //Mostrar lista de archivos (si hubiera) o error
    //Permitir seleccionar uno para edición o ser usado
        //Edicion permite eliminarlo o cambiarle la etiqueta
            //Cambiar etiqueta crea un nuevo archivo con la nueva etiqueta (misma fecha) y borra el anterior. O simlemente le cambia el nombre (no se si se puede hacer eso)
            //Eliminar simplemente elimina el archivo
            //Ambas opciones requieren de confirmación
        //Usar el archivo muestra eleccion entre cargar datos o solo calcular
            //Solo calcular crea los objetos necesarios sin sobreescribir los anteriores en uso
            //Calcula y muestra el modal de resultados
            //Editar archivo resetea la aplicación
            //Crea los objetos y sus relaciones
            //Llena los inputs        


/*
            dir.getFile(nombreArchivo, {create: false}, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();

                    reader.readAsText(file);
                    reader.onloadend = function() {
                        window.alert("Successful file read: " + this.result);
                        //displayFileData(fileEntry.fullPath + ": " + this.result);
                    };
                }, onErrorReadFile);
            }, onErrorReadFile);
            */


}


function onErrorReadFile(){
    navigator.notification.alert(
        'Ocurrió un error en la lectura. Reintente la operación',  // message
        alertDismissed,         // callback
        'Ups...',               // title
        'Ok'                    // buttonName
    );
}


function verArchivos(lecturas, despuesDeBorrado) {
    var i;
    var registros = filtrarArchivos(lecturas);
    if(registros.length <= 0){
        if(despuesDeBorrado == false){
            navigator.notification.alert(
                'No hay registros guardados',  // message
                alertDismissed,         // callback
                'Ups...',               // title
                'Ok'                    // buttonName
            );
        }
    }else{
        //El div que contiene los radio button, con id "divContenedor"
        var divContenedor = crearNodo("div", "", "divContenedor");
        for (i=0; i<registros.length; i++) {
            var checked = i==0;
            //window.alert(checked);
            var dir = registros[i].name;
            divContenedor.appendChild(radioButton(dir, checked));
        }

        //Crea el boton para confirmar la etiqueta
        var boton = crearNodo("input", "modal-boton");
        boton.type = "button";
        boton.value = "CARGAR";
        boton.classList.add("botonMaterial");
        boton.classList.add("textoBotonMaterial");

        var botonCancelar = crearNodo("input", "modal-boton");
        botonCancelar.type = "button";
        botonCancelar.value = "CANCELAR";
        botonCancelar.style.color = "#000";
        botonCancelar.classList.add("botonMaterial");
        botonCancelar.classList.add("textoBotonMaterial");

        //Funcion que hace todos los pasos de carga
        boton.onclick = function() {
            esconderModal();
            //Hay que pasarle el value del radio o directamente el archivo
            cargarRegistro();
        }

        botonCancelar.onclick = function() { 
            esconderModal();
        };

        var divBotones = crearNodo("div");
        divBotones.appendChild(botonCancelar);
        divBotones.appendChild(boton);

        borrarModal();
        setElementFooter(divBotones);
        setTextHeader("Explorar registros");    
        esconderModal();
        escribirModal(divContenedor);
        mostrarModal();
    }
}

//Filtra para dejar solo los archivos de interes de registro
function filtrarArchivos(lecturas){
    var registros = lecturas;
    for (i=0; i<registros.length; i++) {
        var dir = registros[i].name;
        var tipo = dir.substr(dir.length -4);
        if(tipo==".txt" && dir[4]=="_" && dir[7]=="_" && dir[10]=="-" && dir[13]=="_"){
        }
        else{
            registros.splice(i, 1);
            i--;
        }
    }
    return registros;
}




//Devuelve un input radio con el nombre amigable para el usuario
function radioButton(nombreArchivo, checked){
    var contenido = nombreVisual(nombreArchivo);
    var inputRadio = '<input type="radio" name="seleccion" value="' + nombreArchivo + '"';
    if(checked)
        inputRadio += ' checked';
    inputRadio += '/>'+contenido+'</br>';
    //window.alert("asdfgh");
    //window.alert(inputRadio);
    var divContenedor = agregarOpciones(inputRadio, nombreArchivo);
    return divContenedor;
}


//Cambia el nombre de archivo para que sea amigable
function nombreVisual(nombreArchivo){
    //AAAA_MM_DD-HH_MM-CCCCCCCCC
    //01234567890123456789012345
    var anno = nombreArchivo.substr(0,4);
    var mes = nombreArchivo.substr(5,2);
    var dia = nombreArchivo.substr(8,2);
    var hora = nombreArchivo.substr(11,2);
    var minuto = nombreArchivo.substr(14,2);
    var nombreAmigable = dia + "/" + mes +"/" + anno;
    nombreAmigable += " " + hora + ":" + minuto;
    //Si tiene comentario: <fecha y hora (comentario)> cambia el formato de fecha
    if(nombreArchivo[16] == "-"){
        var comentario = nombreArchivo.substr(17, nombreArchivo.length-21);
        nombreAmigable += " (" + comentario + ")";
    }
    return nombreAmigable;

}

//Toma un div con el radio input y le agrega boton de borrar o editar
function agregarOpciones(inputRadio, nombreArchivo){
    //Crea el boton de borrado
    var botonBorrar = crearNodo("button", "botonMaterial");
    botonBorrar.classList.add("texto2");
    botonBorrar.classList.add("eliminar");

    botonBorrar.innerHTML = '<i class="material-icons" style="font-size: 1.6em;">delete</i>';

    botonBorrar.addEventListener("click", function(){
        esconderModal();
        //Confirmar borrado
        navigator.notification.confirm(
            "Seguro que desea eliminar el registro?", // message
            confirmarBorrado,            // callback to invoke with index of button pressed
            'Borrar registro',           // title
            ['Eliminar','Cancelar']     // buttonLabels
        );
    });

    //Crea el boton de cambiar nombre
    var botonEditar = crearNodo("button", "botonMaterial");
    botonEditar.classList.add("texto2");

    botonEditar.innerHTML = '<i class="material-icons" style="font-size: 1.6em;">edit</i>';

    botonEditar.addEventListener("click", function(){
        //Muestra un prompt para conseguir el nombre de archivo
        esconderModal();
        navigator.notification.prompt(
            'Etiqueta del registro (opcional)',  // message
            function(results) {
                cambiarNombre(results, nombreArchivo);
            },                  // callback to invoke
            'Editar registro',            // title
            ['Guardar','Cancelar'],             // buttonLabels
            ''                 // defaultText
        );
        //El aceptar del prompt llama a la funcion que lo busca y le cambia el nombre
        //Muestra resultado de modificacion y deja el modal de archivos abierto (actualizado)
        //Muestra con etiqueta que desaparece??
    });
    var divContenedor = crearNodo("div");
    divContenedor.innerHTML += inputRadio;
    divContenedor.appendChild(botonEditar);
    divContenedor.appendChild(botonBorrar);
    return divContenedor;
}

//Borra un registro dado por su nombre (puede cambiar)
function confirmarBorrado(indexBoton){
    if(indexBoton == 1){
        //Obtener archivo
        var nombreArchivo = buscarArchivoRadio();
        var directorio = "file:///storage/emulated/0";  //Solo para pruebas
        //Borrarlo
        window.resolveLocalFileSystemURL(directorio, function(dir) {
            dir.getFile(nombreArchivo, {create:false}, function(fileEntry) {
                    fileEntry.remove(function(){
                        // The file has been removed succesfully
                        navigator.notification.alert(
                            'Se eliminó el registro correctamente',  // message
                            function(){
                                esconderModal();
                                explorarRegistro(true);
                            },         // callback
                            'Registro eliminado',               // title
                            'Ok'                    // buttonName
                        );
                      },function(error){
                          // Error deleting the file
                          navigator.notification.alert(
                            'Ocurrió un error borrando el registro. Reintente la operación',  // message
                            alertDismissed,         // callback
                            'Ups...',               // title
                            'Ok'                    // buttonName
                        );
                      },function(){
                         // The file doesn't exist
                         navigator.notification.alert(
                            'Ocurrió un error buscando el regisrto. Reintente la operación',  // message
                            alertDismissed,         // callback
                            'Ups...',               // title
                            'Ok'                    // buttonName
                        );
                      });
            });
        });
    }
    if(indexBoton == 2){

    }
}

//Cambia el nombre de un registro
function cambiarNombre(resultado, nombreArchivo){
    if(resultado.buttonIndex == 1){
        var directorio = "file:///storage/emulated/0";  //Solo para pruebas
        var fechaArchivo = nombreArchivo.substr(0, 16);
        var nuevoComentario = resultado.input1;
        if(nuevoComentario == ""){
            var nuevoNombreArchivo = fechaArchivo + ".txt";
        }
        else{
            var nuevoNombreArchivo = fechaArchivo + "-" + nuevoComentario + ".txt";   
        }
        //Obtener archivo
        window.resolveLocalFileSystemURL(directorio, function(dir) {
            dir.getFile(nombreArchivo, {create:false}, function(fileEntry) {
                fileEntry.moveTo(dir, nuevoNombreArchivo, function(){
                    //Mover bien
                    navigator.notification.alert(
                        'Se editó el registro correctamente',  // message
                        function(){                                                
                            esconderModal();
                            explorarRegistro(false);
                        },         // callback
                        'Registro editado',               // title
                        'Ok'                    // buttonName
                    );
                }, function(){
                    //Mover mal
                    navigator.notification.alert(
                        'Ocurrió un error buscando el regisrto. Reintente la operación',  // message
                        alertDismissed,         // callback
                        'Ups...',               // title
                        'Ok'                    // buttonName
                    );
                });
            });
        });
    }
}

//Carga el registro, preguntando si es solo compras o todo
function cargarRegistro(){
    //NO SEPARAR LA LECTURA DE LA BUSQUEDA DEL ARCHIVO
    var nombreArchivo = buscarArchivoRadio();
    //Obetener el filentry a partir del nombre del archivo
    var directorio = "file:///storage/emulated/0";  //Solo para pruebas
    window.resolveLocalFileSystemURL(directorio, function(dir) {
        dir.getFile(nombreArchivo, {create: false}, function (fileEntry) {
            fileEntry.file(function (file) {
                /*
                var reader = new FileReader();

                reader.readAsText(file);
                reader.onloadend = function() {
                    window.alert("Successful file read: " + this.result);
                    //displayFileData(fileEntry.fullPath + ": " + this.result);
                };
                */          
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onloadend = function() {
                    //window.alert("Successful file read: " + this.result);
                    stringObjetos = this.result;
                    //displayFileData(fileEntry.fullPath + ": " + this.result);
                    var objetosCarga = obtenerObjetos(stringObjetos);
                    //Los hace globales como los arrays originales de compras y personas
                    comprasCarga = separarCompras(objetosCarga);
                    personasCarga = separarPersonas(objetosCarga);  //Ver si se puede "restar" los dos arrays anteriores

                    //Confirm: "El registro contiene x compras (y x personas)" Botones cargar o ver resultados
                    var msjAlerta = "El registro contiene " + comprasCarga.length + " compra";
                    if(comprasCarga.length>1)
                        msjAlerta += "s";
                    if(personasCarga.length>0){
                        msjAlerta += " y " + personasCarga.length + " persona";
                        if(personas.length>1)
                            msjAlerta += "s";
                    }
                    navigator.notification.confirm(
                        msjAlerta, // message
                        confirmarCarga,            // callback to invoke with index of button pressed
                        'Opciones de carga',           // title
                        ['Cargar todo','Solo resultado']     // buttonLabels
                    );
                };
                //Ojo: puede que no guarde la variable cuando salga de la funcion
                archivoRadio = file;
            }, onErrorReadFile);
        }, onErrorReadFile);
    });
    //Obtener TODOS los obejtos en un array (compras y personas)
    //Falta comprobar que haga bien las asosiaciones entre personas y compras
    //Si no, puedo hacer una funcion que cambie los arrays de compras por personas para que "apunten"
    //a cada compra creada y no a un nuevo objeto


    //HACER TODO ADENTRO DE LA LECTURA???


    
    
}

//Busca el archivo seleccionado en radio input
function buscarArchivoRadio(){
    var divContenedor = document.getElementById("divContenedor");
    var radios = divContenedor.getElementsByTagName("input");
    for (var i = radios.length - 1; i >= 0; i--) {
        if(radios[i].checked)
            var radioSeleccionado = radios[i].value;
    }

    return radioSeleccionado;
}

//Lee un string y crea todos los objetos de cualquier tipo en un array
function obtenerObjetos(stringObjetos){
    var objetos = [];
    var unaLectura = "";
    /*
    for (var i = 0; i <stringObjetos.length; i++) {
        //A menos que encuentre el fin de un objeto, guarda el string
        if(stringObjetos[i] != '}'){
            unaLectura += stringObjetos[i];
        }
        //Si encuentra el fin del objeto, lo guarda y resetea el string
        else{
            unaLectura += stringObjetos[i];     //Pone el } al final
            var obj = JSON.parse(unaLectura);
            objetos.push(obj);
            unaLectura = "";
        }
    }
    */
    var abiertos = 0;
    for(var i = 0; i < stringObjetos.length; i++){
        //Si encuentra unn { abre un objeto (los siguientes { no lo hacen)
        if(stringObjetos[i] == "{"){
            unaLectura += stringObjetos[i];
            abiertos += 1;
        }
        else if(stringObjetos[i] == "}"){
            //Si encuentra un } dentro de un objeto comun
            if(abiertos == 1){
                //Termina el objeto
                unaLectura += stringObjetos[i];     //Pone el } al final
                //window.alert(unaLectura);
                var obj = JSON.parse(unaLectura);
                objetos.push(obj);
                unaLectura = "";
            }
            //Si encuentra un } dentro de otro {}, continua leyendo
            else{
                //Continua leyendo
                unaLectura += stringObjetos[i];
            }
            abiertos -= 1;
        }
        //Cualquier otro caracter se agrega a la lectura
        else
            unaLectura += stringObjetos[i];
    }
    return objetos;
}

//Comprueba si cada objeto tiene la propiedad producto para diferenciar las compras
function separarCompras(objetosCarga){
    // obj.producto == undefined
    var comprasCarga = [];
    objetosCarga.forEach(function(unObjeto){
        if(unObjeto.producto != undefined){
            comprasCarga.push(unObjeto);
        }
    });
    return comprasCarga;
}

//Comprueba si cada objeto tiene la propiedad nombre para diferenciar las personas
function separarPersonas(objetosCarga){
    // obj.producto == undefined
    var personasCarga = [];
    objetosCarga.forEach(function(unObjeto){
        if(unObjeto.nombre != undefined){
            personasCarga.push(unObjeto);
        }
    });
    return personasCarga;
}

function confirmarCarga(indexBoton){
    //Haga lo que haga, esconde el modal primero
    esconderModal();

    //Si presiono el boton de Cargar todo
    if(indexBoton == 1){
        //Borrar los inputs (no borrar la aplicacion porque se borran todos los arrays que se cargan)
        vaciarInputs();

        //Como ya se borró la app, setea las compras y personas globales
        compras = comprasCarga;
        personas = personasCarga;

        //Llena los inputs de compras
        llenarInputsCompra();

        //Llena los nombres de personas
        llenarInputsPersona();

        //Revisar como se rellenan originalmente los modals de cada personas
        //Porque si lo hace con datos de objetos, sería automático con solo tener compras creadas
        //REVSISAR PARA ESO LA FUNCION esCompra
        //Al parecer sí es automático
    }

    //Si presiono el boton de solo resultados
    if(indexBoton == 2){
        //Guarda el estado de compras y personas actuales
        comprasAnt = compras;
        personasAnt = personas;
        compras = comprasCarga;
        personas = personasCarga;

        //Realiza el mismo proceso que para calcular desde los inputs
        calcular(true);
        //No esta mostrando el calculo por alguna razon (puede que ni siquiera lo haga y haya un error en el medio)
        //Si trato de mostrar solo resultados y despues calcular lo que ya habia, no funciona

        //Reestablece las compras y personas originales
        compras = comprasAnt;
        personas = personasAnt;
    }
}

function vaciarInputs(){
    var productos = document.getElementsByClassName("inputProducto");
    var precios = document.getElementsByClassName("inputPrecio");
    var nombres = document.getElementsByClassName("inputNombre");
    for (var i = productos.length - 1; i >= 0; i--) {
        chau(productos[i]);
    }
    /*
    for (var i = precios.length - 1; i >= 0; i--) {
        chau(precios[i]);
    }
    */
    for (var i = nombres.length - 1; i >= 0; i--) {
        chau(nombres[i]);
    }
    agregar("compra");
    agregar("persona");
}

function llenarInputsCompra(){
    for (var i = compras.length - 1; i >= 0; i--) {
        llenarUnaCompra(compras[i].producto, compras[i].precio);
    }
}

function llenarUnaCompra(producto, precio){
    //Busca un input disponible
    var ultimoProducto = document.getElementsByClassName("inputProducto");
    var valorUltimoProducto = ultimoProducto[ultimoProducto.length -1].value;
    var ultimoPrecio = document.getElementsByClassName("inputPrecio");
    var valorUltimoPrecio = ultimoPrecio[ultimoPrecio.length -1].value;
    //Si el producto o precio del ultimo input son vacios, los uso
    if(valorUltimoPrecio == "" || valorUltimoProducto == ""){
        //Creo que si directamente uso ultimoPrecio, ultimoPrecio, escribe en los inputs
        ultimoPrecio[ultimoPrecio.length -1].value = precio;
        ultimoProducto[ultimoProducto.length -1].value = producto;
        //Comprobar, y de ultima volver a buscar los inputs
    }
    //Si el ultimo input ya esta cargado
    else{
        //Agrega un espacio para compra
        agregar("compra");

        //LLena el ultimo espacio
        ultimoPrecio[ultimoPrecio.length -1].value = precio;
        ultimoProducto[ultimoProducto.length -1].value = producto;
    }

}

function llenarInputsPersona(){
    for (var i = personas.length - 1; i >= 0; i--) {
        llenarUnaPersona(personas[i].nombre);
    }
}

function llenarUnaPersona(nombre){
    //Busca un input disponible
    var ultimoNombre = document.getElementsByClassName("inputNombre");
    var valorUltimoNombre = ultimoNombre[ultimoNombre.length -1].value;
    //Si el producto o precio del ultimo input son vacios, los uso
    if(valorUltimoNombre == ""){
        //Creo que si directamente uso ultimoNombre, escribe en los inputs
        ultimoNombre[ultimoNombre.length -1].value = nombre;
        //Comprobar, y de ultima volver a buscar los inputs
    }
    //Si el ultimo input ya esta cargado
    else{
        //Agrega un espacio para persona
        agregar("persona");

        //LLena el ultimo espacio
        ultimoNombre[ultimoNombre.length -1].value = nombre;
    }

}

