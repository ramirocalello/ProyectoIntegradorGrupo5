var apiKey = 'bfaef3fe6aa228ec1ff3d56dae5a9aa8'; // Tu API Key de TMDB

var pathname = window.location.pathname;

var url = '';
var contenedor;

if (pathname.indexOf('moviesgenres.html') !== -1) {
  url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' + apiKey + '&language=es-ES';
  contenedor = document.getElementById('lista-generos-peliculas');
} else if (pathname.indexOf('seriesgenres.html') !== -1) {
  url = 'https://api.themoviedb.org/3/genre/tv/list?api_key=' + apiKey + '&language=es-ES';
  contenedor = document.getElementById('lista-generos-series');
}

function cargarGeneros(url) {
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      contenedor.innerHTML = '';

      for (var i = 0; i < data.genres.length; i++) {
        var genero = data.genres[i];

        var li = document.createElement('li');
        var a = document.createElement('a');
        var h3 = document.createElement('h3');

        a.href = 'detail-genres.html?id=' + genero.id;
        h3.textContent = genero.name;

        a.appendChild(h3);
        li.appendChild(a);
        contenedor.appendChild(li);
      }
    });
}

if (url !== '') {
  cargarGeneros(url);
}
