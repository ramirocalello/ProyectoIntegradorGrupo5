var apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8'; // API Key de TMDB

function crearItem(item, tipo) {
  var li = document.createElement('li');

  var titulo;
  var fecha;
  if (tipo === 'movie') {
    titulo = item.title;
    fecha = item.release_date;
  } else {
    titulo = item.name;
    fecha = item.first_air_date;
  }

  var imagen;
  if (item.poster_path) {
    imagen = 'https://image.tmdb.org/t/p/w200' + item.poster_path;
  } else {
    imagen = './img/placeholder.jpg';
  }

  var link;
  if (tipo === 'movie') {
    link = 'detail-movie.html?id=' + item.id;
  } else {
    link = 'detail-serie.html?id=' + item.id;
  }

  li.innerHTML = 
    '<a href="' + link + '">' +
      '<img src="' + imagen + '" alt="' + titulo + '">' +
      '<p>' + titulo + '<br>' + (fecha ? fecha : 'Fecha desconocida') + '</p>' +
    '</a>';

  return li;
}

function cargarDatos(url, idContenedor, tipo) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var contenedor = document.getElementById(idContenedor);
      contenedor.innerHTML = ''; // Limpio primero
      var resultados = [];
      for (var i = 0; i < 5; i++) {
        resultados.push(data.results[i]);
      }

      for (var j = 0; j < resultados.length; j++) {
        var li = crearItem(resultados[j], tipo);
        contenedor.appendChild(li);
      }
    });
}

// URLs
var urlPeliculasPopulares = 'https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey + '&language=es-ES';
var urlSeriesPopulares = 'https://api.themoviedb.org/3/tv/popular?api_key=' + apiKey + '&language=es-ES';
var urlPeliculasMejorValoradas = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' + apiKey + '&language=es-ES';

// Llamadas
cargarDatos(urlPeliculasPopulares, 'peliculas-populares', 'movie');
cargarDatos(urlSeriesPopulares, 'series-populares', 'tv');
cargarDatos(urlPeliculasMejorValoradas, 'peliculas-mejor-valoradas', 'movie');

