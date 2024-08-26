document.addEventListener("DOMContentLoaded", function(){
    // Mostrar el modal al cargar la página
    var modal = document.getElementById("inicioModal");
    modal.style.display = "flex";
    
    // Cerrar el modal después de 3 segundos (puedes ajustar este tiempo)
    setTimeout(function() {
        modal.style.display = "none";
    }, 10000);
});

const map = L.map('map', {
    scrollWheelZoom: false // Deshabilitar el zoom con la rueda del mouse
}).setView([-34.901245911385935, -57.98964996061926], 13);
const url="https://raw.githubusercontent.com/Luisao86/Futsal-La-plata-y-alrededores/main/list_f5.json";
// Cargar una capa de mapa (puedes cambiar el estilo si lo deseas)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Cargar el archivo JSON desde GitHub
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Recorrer los barrios y canchas
        for (let ciudad in data) {
            let barrios = data[ciudad];
            for (let barrio in barrios) {
                let canchas = barrios[barrio];
                canchas.forEach(function(cancha) {
                    // Verificar si cancha.latLong es una lista con al menos dos elementos
                    if (Array.isArray(cancha.latLong) && cancha.latLong.length >= 2) {
                        // Agregar un marcador para cada cancha
                        L.marker([cancha.latLong[0], cancha.latLong[1]])
                            .addTo(map)
                            .bindPopup(`<b>${cancha.Nombre}</b><br>${cancha.Dirección}<br>Tel: ${cancha.Teléfono}<br>Horario: ${cancha.Horario}`);
                    } else {
                        console.warn('LatLong no es válido para:', cancha);
                    }
                });
            }
        }
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
