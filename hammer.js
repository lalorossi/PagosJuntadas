var myElement = document.getElementById('myElement');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);
var fixed = myElement.clientWidth;
// listen to events...
mc.on("swipeleft", function(ev){ 
      myElement.style.width = "1700px";
});













var myElement = document.getElementById('myElement');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);
var fixed = myElement.clientWidth;
// listen to events...
var asd = 1;
mc.on("panleft press", function(ev) {    
    var actual = fixed-Math.abs(ev.deltaX);
    if(actual>1500){
      actual += "px";
      //window.alert(actual);
      myElement.style.width = actual;
     }
});

if(myElement.clientWidth>1500 && myElement.style.width>fixed){
  window.alert(myElement.style.width);
  myElement.style.width = fixed;
}

// listen to events...
/*mc.on("panright press", function(ev) {
    var actual = fixed-Math.abs(ev.deltaX);
    if(actual>1500){
      actual += "px";
      //window.alert(actual);
      myElement.style.width = actual;
     }
});*/