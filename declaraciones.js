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

