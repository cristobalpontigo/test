async function validarFormulario() {
    var nombreApellido = $('#nombreApellido').val();
    var alias = $('#alias').val();
    var checkboxes = $('input[name="mediosSeleccionados[]"]:checked');
    var rut = $('#rut').val();

    
    if (!validarRut(rut)) {
        alert('El formato del RUT es incorrecto');
        mostrarError('errorRut', 'El formato del RUT es incorrecto');
        return false;
    } else {
        ocultarError('errorRut');
    }

    if (nombreApellido.trim() === '') {
        alert('Nombre y Apellido no pueden estar en blanco');
        mostrarError('errorNombreApellido', 'Nombre y Apellido no pueden estar en blanco');
        return false;
    } else {
        ocultarError('errorNombreApellido');
    }

    if (alias.trim().length <= 5 || !contieneLetrasYNumeros(alias)) {
        alert('Alias debe tener más de 5 caracteres y contener letras y números');
        mostrarError('errorAlias', 'Alias debe tener más de 5 caracteres y contener letras y números');
        return false;
    } else {
        ocultarError('errorAlias');
    }

    if (checkboxes.length < 2) {
        alert('Debe seleccionar al menos dos opciones');
        mostrarError('errorComoSeEntero', 'Debe seleccionar al menos dos opciones');
        return false;
    } else {
        ocultarError('errorComoSeEntero');
    }

    try {
        var duplicado = await validarDuplicacionVotos(rut);
        if (duplicado) {
            alert('Este RUT ya ha votado anteriormente');
            mostrarError('errorDuplicacionVotos', 'Este RUT ya ha votado anteriormente');
            return false;
        } else {
            ocultarError('errorDuplicacionVotos');
            console.log('Duplicación de votos validada correctamente.');
        }
    } catch (error) {
        alert('Error en la validación de duplicación de votos: ' + error);
        console.error('Error en la validación de duplicación de votos:', error);
        return false; 
    }

    
    console.log('Formulario validado correctamente. Puedes enviar el formulario ahora.');
    return true;
}

function validarRut(rut) {
    rut = rut.replace(/\./g, '').replace(/-/g, '');
    var splitRut = rut.split('');

    if (splitRut.length !== 9) {
        return false; 
    }

    var num = parseInt(splitRut.slice(0, 8).join(''), 10);
    var dv = splitRut[8].toLowerCase();

    var m = 0, s = 1;
    for (; num; num = Math.floor(num / 10)) {
        s = (s + num % 10 * (9 - m++ % 6)) % 11;
    }
    var calculatedDv = s ? s - 1 : 'k';

    return dv === calculatedDv.toString();
}

async function validarDuplicacionVotos(rut) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            type: 'POST',
            url: 'php/get.php',
            data: { rut: rut },
            async: true,
            success: function(response) {
                var duplicado = response === 'true';
                resolve(duplicado);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('Error al verificar duplicación de votos: ' + textStatus + ' - ' + errorThrown);
                console.error('Error al verificar duplicación de votos:', textStatus, errorThrown);
                reject("Error al verificar duplicación de votos: " + textStatus + " - " + errorThrown);
            }
        });
    });
}

function mostrarError(idElemento, mensaje) {
    $('#' + idElemento).text(mensaje).show();
}

function ocultarError(idElemento) {
    $('#' + idElemento).text('').hide();
}

function contieneLetrasYNumeros(str) {
    return /[a-zA-Z]/.test(str) && /\d/.test(str);
}
