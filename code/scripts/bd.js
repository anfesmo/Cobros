var id = 0;
var listaId = "";

function configurar_db() {

    function execute(tx) {        
		//tx.executeSql('DROP TABLE IF  EXISTS clientes ');
        tx.executeSql('CREATE TABLE IF NOT EXISTS clientes (CodCliente, Nombre, Telefono, NroIdentificacion, CodGestor, CodPrestamo, FechaPrestamo, FechaVencimientoPrestamo, NroCuotasPrestamo, NroCuotasResta, VlrCuota, VlrIntreses, VlrPrestamo, VlrSaldoConInteres, VlrSaldoSinInteres, esNuevo, Latitud, Longitud, Calificacion)');
        //tx.executeSql('DROP TABLE IF  EXISTS recaudos ');
        tx.executeSql('CREATE TABLE IF NOT EXISTS recaudos (idrecaudo integer primary key autoincrement, CodCliente, CodPrestamo, CodGestor, Fecha, NroCuotas, Ajuste, Latitud, Longitud, Observacion, Sincronizado text)');        
        
    }

    function error(error) {
        console.log("Error al configurar base de datos", error)
    }

    function exito() {
        console.log("Configuración exitosa")
    }

    var db = window.openDatabase("bd_cobros", "1.0", "Gestion cobros", 200000);
    db.transaction(execute, error, exito);

}

function guardarMarcador() {
    var db = window.openDatabase("bd_reportes", "1.0", "Guardar Marcador", 100000);
    db.transaction(GuardarMarca, errorOperacion, operacionEfectuada);
}

function GuardarMarca(tx) {
    var latitud = localStorage.getItem("latitud");
    var longitud = localStorage.getItem("longitud");
    var texto = localStorage.getItem("texto");
    
    tx.executeSql('INSERT INTO marcadores (latitud, longitud, texto) VALUES ("' + latitud + '", "' + longitud + '", "' + texto + '")');
}


// Transaction error callback
function errorOperacion(err) {
    console.log(err);
    alert("Error de operación: " + err);
}

function operacionEfectuada() {
    console.log("Operación Exitosa!");
}

$(document).ready(function () {
    if (localStorage.getItem("nombreUsuario") != null) {
        localStorage.setItem("nombreUsuario", localStorage.getItem("nombreUsuario"));
        $("#opc_Registrar").show();
        $("#opc_VerMias").show();
    }
    else{
        $("#opc_Registrar").hide();
        $("#opc_VerMias").hide();
    }

});

//Ocultar Div cargando...
function OcultarDivCargando() {
    $('#loading').css("display", "none");
}

//Mostrar Div cargando...
function MostrarDivCargando() {
    $('#loading').css("display", "block");
}


