
var movieBase = 'https://api.themoviedb.org/3/'
var imageBase = 'http://image.tmdb.org/t/p/w300/'
var apiKey = 'api_key=798ee2806b267f1a8d3406936e444551'

function getPopularMovies() {
    var popularQuery = movieBase+'movie/popular?'+apiKey
    fetch(popularQuery)
        .then(function(response){
            response.json().then(function(data){
				var movies={};
                for (let index = 0; index < 5; index++) {
					var movie = {title: data.results[index].title,
						 genre: data.results[index].genre_ids}
					movies[index] = movie
				}
				setPopularMovies(movies);
            });
		})
    .catch(function(err){
        console.error('Faliled retrieving information',err)
    })
}

function setPopularMovies(movies){
	for (let index = 0; index < 5; index++) {
		document.getElementById("movie"+index).innerHTML=movies[index].title;		
	}
	getMovieGenre(movies)
};

function getMovieGenre(movies){
	var genreQuery = movieBase+'genre/movie/list?'+apiKey
    fetch(genreQuery)
        .then(function(response){
            response.json().then(function(data){
				setGenreList(data.genres,movies)
            });
		})
    .catch(function(err){
        console.error('Faliled retrieving information',err)
    })
}

function setGenreList(list, movies){
	for (let i = 0; i < 5; i++) {
		var genres = []
		for (let j = 0; j < movies[i].genre.length; j++) {			
			var genreId = movies[i].genre[j]
			for (let k = 0; k < list.length; k++) {
				if (genreId === list[k].id) {
					genres.push(list[k].name)
				}	
			}
		}
		document.getElementById("genre"+i).innerHTML=genres;
	}
}

function getMovieDetails(movieId){
    var detailsQuery = movieBase+'movie/'+movieId+'?'+apiKey
}

function getMovieByName(event){
    if(event.keyCode === 13){
		var movieName = document.getElementById("search").value
		var searchQuery = movieBase+'search/movie?'+apiKey+'&query='+movieName
		fetch(searchQuery)
			.then(function (response){
				response.json().then(function (data){
					//resposta estranha...
					console.log(data.results);
				})
			})
		.catch(function(err){
			console.error('Faliled retrieving information',err)
		})
    }
}

function getLancamentos(){
	var date = new Date();
	var todayDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
	var searchQuery = movieBase+'discover/movie?primary_release_date.gte='+todayDate+
	'&primary_release_date.lte='+todayDate+'&'+apiKey
	fetch(searchQuery)
		.then(function (response){
			response.json().then(function (data){
				var movies = {}
				for (let index = 0; index < 3; index++) {
					movies[index] = data.results[index]					
				}
				setLancamentos(movies);
			});
		})
	.catch(function(err){
		console.error('Faliled retrieving information',err)
	})
	

}

function setLancamentos(movies){
	for (let index = 0; index < 3; index++) {
		document.getElementById("desc"+index).innerHTML=movies[index].title;
		imgQuery = imageBase+movies[index].poster_path;
		document.getElementById("latest"+index).src=imgQuery;
	}
}

function main(){
	getPopularMovies();
	getLancamentos();
}