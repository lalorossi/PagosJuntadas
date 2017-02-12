<html>
<head>
<title></title>

<script type="text/javascript">
function agregarConcepto()		{
	var hola = document.createElement("div");
	hola.id="ingreso";
	var divs = document.getElementById("ingreso").innerHTML;
	window.alert(divs);
	hola.innerHTML = divs;
	document.getElementById("marco").appendChild(hola);

}
</script>

</head>

<body>

	<form action="upload.php" id="form" method="post">
		<div id ="marco">
			<div id="ingreso">
				Ingrese el concepto
				<input type="text" name="concepto[]" id="concepto"> 
				Precio: $
				<input type="number" name="precio[]" id="precio">
				<br></br>
			</div>
		</div>
		
	  	<input type="button" value="+" onclick="agregarConcepto()">
    	<br></br>
	    <input type="submit" id="botonSubmit" value="Siguiente" name="submit">

	</form>
</body>
</html>

