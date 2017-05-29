//Creo clases
class Persona{
    constructor(nombre){
        this.nombre = nombre;
        this.comprasPorPersona = [];
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

//Agrega un input de compra o persona
function agregar(cla) {

    var nuevo = document.createElement("tr");
    nuevo.className=cla;

    //Toma el primer elemento existente de la clase que quiero crear y copia el HTML a mi nuevo elemento
    var col = document.getElementsByClassName(cla);
    col = col[0].innerHTML;
    nuevo.innerHTML = col;

    //Si quiero agregar una compra, lo agreago a la pagina 1
    if(cla == "compra"){
        document.getElementById("page1").appendChild(nuevo);            
    }

    //Si es una persona, a la pagina 2
    if(cla == "persona"){
        document.getElementById("page2").appendChild(nuevo);    

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
        document.getElementById("pag2").style.display="";
        document.getElementById("pag1").style.display="none";
        //return true;
    }
    else{
        borrarModal();
        var parrafo = document.createElement("p");
        var texto = document.createTextNode("Ingrese al menos una compra con precio");
        parrafo.appendChild(texto);
        setModoModal("error");
        escribirModal(parrafo);
        mostrarModal();
        //window.alert("Ingrese al menos una compra con precio");
        //return false;
    }

}

function borrarModal(){
    //Borrar el modal y dejar el div modal-body vacio
    var modal = document.getElementsByClassName("modal-body")[0];
    modal.innerHTML = "";
}

function mostrarModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";  
}

function escribirModal(elemento){
    document.getElementsByClassName("modal-body")[0].appendChild(elemento);
}

function esconderModal(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    ultimoBoton.id = "activado";
}

function setUltimoBoton(boton){
    ultimoBoton = boton;
}

function setModoModal(estado=""){
    var header = document.getElementsByClassName("modal-header");
    var footer = document.getElementsByClassName("modal-footer");

    header[0].id = estado;
    footer[0].id = estado;
}

function setHeader(algo=""){
    var header = document.getElementsByClassName("modal-header")[0];
    header = header.getElementsByTagName("h2")[0];
    header.innerHTML = algo;
}

function setFooter(algo=""){
    var footer = document.getElementsByClassName("modal-footer")[0];
    footer = footer.getElementsByTagName("h3")[0];
    footer.innerHTML = algo;
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
            div = document.createElement("div");
            checkbox = document.createElement("input");
            txt = document.createTextNode(compras[i].producto);


            checkbox.type = "checkbox";
            checkbox.className = "checkCompra";
            checkbox.value = compras[i].producto;    //No se bien por que hace esto

            //Checkear las compras que ya estan en el array de la persona
            checkbox.checked =  esCompra(personaClicker, compras[i].producto);

            div.appendChild(checkbox);
            div.appendChild(txt);           //Adiciona el texto al lado del checkbox con el nombre de la compra

            escribirModal(div);
        };

        //Crea el boton para confirmar la seleccion de compras
        var boton = document.createElement("input");
        boton.type = "button";
        boton.value = "OK";


        boton.onclick = function() { 
            actualizarPersona(personaClicker, yo);
        };

        escribirModal(boton);
        setHeader("Compras");
        setFooter();
        setModoModal();
        mostrarModal();

        setUltimoBoton(yo);
        yo.id = "desactivado";      //Desactiva el boton para que no sea activado mas de una vez sin seleccionar compras
    }
}


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

function actualizarPersona(pers, boton) {    
    var pos;
    var boxes = document.getElementsByClassName("checkCompra");

    //Busco a la persona en el array de personas
    for (var o = personas.length - 1; o >= 0; o--) {
        if (personas[o].nombre == pers) {
            pos = o;
        }
    }

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
                    if(bandera != 1){
                        compras[o].cantCompras += 1;
                        personas[pos].comprasPorPersona.push(compras[o]);
                    }
                }
            }
        }
    };

    esconderModal();
    boton.id = "activado";
    /*
    for (var i = personas[pos].comprasPorPersona.length - 1; i >= 0; i--) {
        window.alert(personas[pos].comprasPorPersona[i]);
    }
    */       
    
}


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

function filtrarPersonasBorradas(){
    var ingresadas = document.getElementsByClassName("ingresoPersona");
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
    */
}

function calcular(){

    filtrarPersonasBorradas();

    var pago = 0;
    borrarModal();
    for (var i = personas.length - 1; i >= 0; i--) {
        var mensaje = " ";
        mensaje = mensaje.concat(personas[i].nombre);
        mensaje = mensaje.concat(": ");
        var text = document.createTextNode(mensaje);
        var parrafo = document.createElement("p");
        parrafo.appendChild(text);
        escribirModal(parrafo);
        //window.alert(personas[i].nombre);
        var comprasDePersona = personas[i].comprasPorPersona;
            for (var o = comprasDePersona.length - 1; o >= 0; o--) {
                for (var u = compras.length - 1; u >= 0; u--) {
                    //window.alert(compras[u].producto);
                    //window.alert(comprasDePersona[o].producto);
                    if(compras[u].producto == comprasDePersona[o].producto){
                        //window.alert(compras[u].producto);
                        mensaje = "";
                        pago = compras[u].precio / compras[u].cantCompras;
                        mensaje = mensaje.concat(compras[u].producto);
                        mensaje = mensaje.concat(" - $");
                        mensaje = mensaje.concat(pago);
                        text = document.createTextNode(mensaje);
                        parrafo = document.createElement("p");
                        parrafo.appendChild(text);
                        escribirModal(parrafo);

                    }
                }
            }

    }
    setModoModal();
    mostrarModal();
}