<?php 

	//header("Location:instalacion.php");


	/*
		Si GET['p']( definido en la URL pe: www.google.com.ar?p=estoes ) esta definido
		entonces cargamos la página que estamos pidiendo por GET.
		De lo contrario cargamos login por defecto.
	*/

	if (!empty($_GET['p'])) {
		
		include_once ''.$_GET['p'].'.php';

	}else{

		// Pagina para loguear
		include_once 'home.php';

	}

?>