// main.js

$(document).ready(function () {
    cargarRegionesYComunas();
    cargarCandidatos();

    $('#miFormulario').submit(function (event) {
        if (!validarFormulario()) {
            event.preventDefault();
        } else {
            registrarVotante();
        }
    });
});
