var apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8';

// Captura de elementos
var poster = document.getElementById('poster');
var titulo = document.getElementById('titulo');
var calificacion = document.getElementById('calificacion');
var duracion = document.getElementById('duracion');
var fecha = document.getElementById('fecha');
var descripcion = document.getElementById('descripcion');
var generos = document.getElementById('generos');

// Obtener ID de la URL
var url = window.location.search; // ejemplo: ?id=123
var partes = url.split('=');
var movieId = partes.length > 1 ? partes[1] : null;

if (movieId) {
  obtenerDetallePelicula(movieId);
} else {
  document.body.innerHTML = "<h2 style='text-align:center;margin-top:50px;'>No se encontró ninguna película seleccionada.</h2>";
}

function obtenerDetallePelicula(id) {
  var urlApi = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey + '&language=es-ES';
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
      poster.alt = data.title;

      titulo.textContent = data.title ? data.title : 'Sin título';
      calificacion.textContent = data.vote_average ? data.vote_average + ' / 10' : 'Sin calificación';
      duracion.textContent = data.runtime ? data.runtime + ' minutos' : 'Duración desconocida';
      fecha.textContent = data.release_date ? data.release_date : 'Fecha desconocida';
      descripcion.textContent = data.overview ? data.overview : 'Sin sinopsis disponible';

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
