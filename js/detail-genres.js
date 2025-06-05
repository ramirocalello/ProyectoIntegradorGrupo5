var apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8'; // Tu API Key de TMDB

// Capturo el ID del género
var queryString = window.location.search;
var queryStringObj = new URLSearchParams(queryString);
var generoId = queryStringObj.get('id');

// Capturo donde voy a poner las cosas
var tituloGenero = document.getElementById('titulo-genero');
var lista = document.getElementById('lista-peliculas-series');

// Función para cargar películas por género
function cargarPeliculasPorGenero(idGenero) {
  var url = 'https://api.themoviedb.org/3/discover/movie?api_key=' + apiKey + '&with_genres=' + idGenero + '&language=es-ES';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      lista.innerHTML = '';

      for (var i = 0; i < data.results.length; i++) {
        var pelicula = data.results[i];

        var li = document.createElement('li');
        var a = document.createElement('a');
        var img = document.createElement('img');
        var p = document.createElement('p');

        a.href = 'detail-movie.html?id=' + pelicula.id;
        img.src = pelicula.poster_path ? 'https://image.tmdb.org/t/p/w200' + pelicula.poster_path : './img/placeholder.jpg';
        img.alt = pelicula.title;
        p.textContent = pelicula.title;

        a.appendChild(img);
        a.appendChild(p);
        li.appendChild(a);
        lista.appendChild(li);
      }
    });
}

// Cargar el nombre del género
function cargarNombreGenero(idGenero) {
  var urlGeneros = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=es-ES';

  fetch(urlGeneros)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      for (var i = 0; i < data.genres.length; i++) {
        if (data.genres[i].id == idGenero) {
          tituloGenero.textContent = data.genres[i].name;
        }
      }
    });
}

// Solo si hay id de género
if (generoId) {
  cargarNombreGenero(generoId);
  cargarPeliculasPorGenero(generoId);
}
