function cargarRegionesYComunas() {
    $.ajax({
        url: 'php/get.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var selectRegion = $('#region');
            var selectComuna = $('#comuna');
            selectRegion.empty().append('<option value="">Seleccione una región</option>');
            selectComuna.empty().append('<option value="">Seleccione una comuna</option>');

          
            $.each(data.regiones, function (index, region) {
                selectRegion.append('<option value="' + region.id + '">' + region.nombre + '</option>');
            });

            
            selectRegion.on('change', function () {
                var selectedRegionId = $(this).val();
                selectComuna.empty().append('<option value="">Seleccione una comuna</option>');

              
                var comunasRegion = $.grep(data.comunas, function (comuna) {
                    return comuna.id_region == selectedRegionId;
                });

                $.each(comunasRegion, function (index, comuna) {
                    selectComuna.append('<option value="' + comuna.id + '">' + comuna.nombre + '</option>');
                });
            });
        },
        error: function (error) {
            console.log('Error al cargar regiones y comunas:', error);
            console.log('Detalles del error:', error.responseText);
        }
    });
}
function cargarCandidatos() {
    $.ajax({
        url: 'php/get.php', 
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var selectCandidato = $('#candidato');
            selectCandidato.empty().append('<option value="">Seleccione un candidato</option>');

           
            if (data && data.candidatos) {
              
                $.each(data.candidatos, function (index, candidato) {
                    selectCandidato.append('<option value="' + candidato.id + '">' + candidato.nombre + ' - ' + candidato.partido_politico + '</option>');
                });
            } else {
                console.log('La respuesta del servidor no contiene la lista de candidatos esperada:', data);
            }
        },
        error: function (error) {
            console.log('Error al cargar candidatos:', error);
            console.log('Detalles del error:', error.responseText);
        }
    });
}