function registrarVotante() {
    
    var nombreApellido = $('#nombreApellido').val();
    var alias = $('#alias').val();
    var rut = $('#rut').val();
    var email = $('#email').val();
    var region = $('#region').val();
    var comuna = $('#comuna').val();
    var candidato = $('#candidato').val();

        
        var mediosSeleccionados = [];
        $('input[name^="mediosSeleccionados"]:checked').each(function () {
            mediosSeleccionados.push($(this).val());
        });

        
        $.ajax({
            url: 'php/get.php',
            type: 'POST',
            data: {
                nombreApellido: nombreApellido,
                alias: alias,
                rut: rut,
                email: email,
                region: region,
                comuna: comuna,
                candidato: candidato,
                mediosSeleccionados: mediosSeleccionados
            },
            success: function (response) {
               
                console.log('Votante registrado:', response);
            },
            error: function (error) {
                console.log('Error al registrar votante:', error);
                console.log('Detalles del error:', error.responseText);
                alert('Error al registrar votante. Por favor, inténtelo de nuevo.');
            }
        });
    }
