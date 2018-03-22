
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
