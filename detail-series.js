var apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

// Captura de elementos
var poster = document.getElementById('poster');
var titulo = document.getElementById('titulo');
var calificacion = document.getElementById('calificacion');
var fecha = document.getElementById('fecha');
var descripcion = document.getElementById('descripcion');
var generos = document.getElementById('generos');

// Obtener ID de la URL
var url = window.location.search; // ejemplo: ?id=123
var partes = url.split('=');
var serieId = partes.length > 1 ? partes[1] : null;

if (serieId) {
  obtenerDetalleSerie(serieId, 'es-ES');
} else {
  document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>No se encontró ninguna serie seleccionada.</h2>";
}

function obtenerDetalleSerie(id, idioma) {
  var urlApi = 'https://api.themoviedb.org/3/tv/' + id + '?api_key=' + apiKey + '&language=' + idioma;
  fetch(urlApi)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error en la API');
      }
    })
    .then(function(data) {
      if (data.poster_path) {
        poster.src = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
      } else {
        poster.src = './img/placeholder.jpg';
      }
      poster.alt = data.name;

      titulo.textContent = data.name ? data.name : 'Sin título';
      calificacion.textContent = data.vote_average ? data.vote_average + ' / 10' : 'Sin calificación';
      fecha.textContent = data.first_air_date ? data.first_air_date : 'Fecha desconocida';

      if (data.overview && data.overview.trim() !== '') {
        descripcion.textContent = data.overview;
      } else if (idioma === 'es-ES') {
        obtenerDetalleSerie(id, 'en-US');
      } else {
        descripcion.textContent = 'Sin sinopsis disponible';
      }

      if (data.genres && data.genres.length > 0) {
        var generosHTML = '';
        for (var i = 0; i < data.genres.length; i++) {
          generosHTML += '<a href="detail-genres.html?id=' + data.genres[i].id + '">' + data.genres[i].name + '</a>';
          if (i < data.genres.length - 1) {
            generosHTML += ', ';
          }
        }
        generos.innerHTML = generosHTML;
      } else {
        generos.textContent = 'Sin géneros disponibles';
      }
    });
}
