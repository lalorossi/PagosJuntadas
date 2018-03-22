function cambiarPagina(idPagina) {
    document.getElementById(idPagina).style.display="";
    if(idPagina == "pag1"){
        document.getElementById("pag2").style.display="none";
    }
    else{
        document.getElementById("pag1").style.display="none";
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
