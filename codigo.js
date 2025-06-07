import Dexie from "https://cdn.jsdelivr.net/npm/dexie@4.0.11/+esm";

const db = new Dexie('PersonasDB');
db.version(1).stores({
    personas: '++id,nombre,apellido,anoNacimiento, mesNacimiento'
});

$(document).ready(function () {
    $('.enviar').click(() => {
        let nombreV = $('#nombre').val();
        let apellidoV = $('#apellido').val();
        let anoNacimiento = $('#anoNacimiento').val();
        let mesNacimiento = $('#mesDeNacimiento').val();

        db.personas.add({
            nombre: nombreV,
            apellido: apellidoV,
            anoNacimiento: anoNacimiento,
            mesNacimiento: mesNacimiento
        }).then(() => {
            console.log('Persona agregada');
            mostrarPersonas();
            limpiarFomrulario();

        }).catch((error) => {
            console.log('Error al agregar persona: ', error);
        });

    });
    mostrarPersonas();
    limpiarFomrulario();

});

// Limpiar formulario
function limpiarFomrulario() {
    $('#nombre').val('');
    $('#apellido').val('');
    $('#anoNacimiento').val('');
    $('#mesDeNacimiento').val('');
}

// Calcular si es año ingresado por la persona es bisiesto
function esAnoBisiesto(anoNacimiento) {
    const ano = parseInt(anoNacimiento);
    return (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0) ? 'Sí' : 'No';
}

// Calcular si el mes es impar o par
function esPar(mesNacimiento) {
    return (mesNacimiento === 'febrero' || mesNacimiento === 'abril' || mesNacimiento === 'mayo' || mesNacimiento === 'julio' || mesNacimiento === 'agosto' || mesNacimiento === 'septiembre' || mesNacimiento === 'Febrero' || mesNacimiento === 'Abril' || mesNacimiento === 'Mayo' || mesNacimiento === 'Julio' || mesNacimiento === 'Agosto' || mesNacimiento === 'Septiembre') ? 'Par' : 'Impar'
    
}

function mostrarPersonas() {
    db.personas.toArray().then((personas) => {
        let listaPersonas = $('#tablaDatos');
        listaPersonas.empty();
        personas.forEach((p) => {
            let html = "<tr>";
            html += "<td>" + p.nombre + "</td>";
            html += "<td>" + p.apellido + "</td>";
            html += "<td>" + p.anoNacimiento + "</td>";
            html += "<td>" + p.mesNacimiento + "</td>";
            html += "<td>" + esAnoBisiesto(p.anoNacimiento) + "</td>";
            html += "<td>" + esPar(p.mesNacimiento) + "</td>";
            html += "</tr>";
            listaPersonas.append(html);
        });
    });
}


$('.limpiar').click(() => {
    db.personas.clear().then(() => {
        console.log('Personas borradas');
        mostrarPersonas();
    }).catch((error) => {
        console.log('Error al borrar personas: ', error);
    });
});


