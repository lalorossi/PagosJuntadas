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