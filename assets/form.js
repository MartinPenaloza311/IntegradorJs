function validarFormulario() {
    // Obtener valores de los campos del formulario
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var mensaje = document.getElementById("mensaje").value;

    // Validar que los campos no estén vacíos
    if (nombre === "" || email === "" || mensaje === "") {
        alert("Todos los campos son obligatorios.");
        return false;
    }

    // Validar el formato del correo electrónico usando una expresión regular simple
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email.match(emailRegex)) {
        alert("Por favor, ingrese una dirección de correo electrónico válida.");
        return false;
    }

    // Si todas las validaciones son exitosas, el formulario se envía
    return true;
}

