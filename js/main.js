/*ARQUIVO JAVA SCRIPT
EMANUEL FELIPE GIROLDO MAZZER -  Teste APPMOOVE
*/

/* Utilizando The Movie DB API*/
/* key: c8ef047748a08ef5a7457d40c0251e37 */

let urlBase = "https://api.themoviedb.org/3/";
let imgBase = "http://image.tmdb.org/t/p/w154//";
let key = "c8ef047748a08ef5a7457d40c0251e37";

function genreRequest(title,ide,cont){
	let url="https://api.themoviedb.org/3/genre/movie/list?api_key="+key+"&language=en-US"
	 fetch(url)
  			.then(function(response){
    			response.json().then(function(data){
      			var vetor=(data.genres);
      			vetor.forEach( function(element, index) {
      				if(ide==element.id){
      					document.getElementById("filme"+(cont+1)).innerHTML=title;
      					document.getElementById("genero"+(cont+1)).innerHTML=element.name;
      					
      				}
      			});
    });
  })
}

/*function getGenres(ide){
	 vetor = genreRequest();
	 console.log(vetor);
	vetor.forEach( function(element, index) {
		console.log(index);

	});

}*/


function getByPopularity(){
	let url="https://api.themoviedb.org/3/movie/popular?api_key="+key+"&language=en-US&page=1"
	fetch(url)
  			.then(function(response){
    			response.json().then(function(data){
    				var i = 0;
    				for (var i = 0; i <5; i++) {
    					var title=data.results[i].title;
    					//console.log(data.results[i].title);
    					//console.log(data.results[i].genre_ids[0]);
    					genreRequest(title,data.results[i].genre_ids[0],i);


    				}
      			/*document.getElementById("linha1").innerHTML*/
    });
  })

}


function txtSearch(event){
	if(event.keyCode===13){
		var data = document.getElementById("textoBusca").value;
		let url = urlBase+"search/movie?api_key="+key+"&query="+data;
		fetch(url)
  			.then(function(response){
    			response.json().then(function(data){
      			console.log(data.results[1].title);
    });
  })
		
	}
}



function getMoviesTheatres(){
	var d = new Date();
	dia=(d.getDate());
	mes=(d.getMonth()+1);
	ano=d.getFullYear();
	fullTime=ano+'-'+mes+'-'+dia;
	let url = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte="+fullTime+"&primary_release_date.lte="+fullTime+"&api_key=c8ef047748a08ef5a7457d40c0251e37&language=en-US"
	fetch(url)
  			.then(function(response){
    			response.json().then(function(data){
    				for (var i = 0; i < 3; i++) {
    					document.getElementById("title"+i).innerHTML=data.results[i].title;
    					document.getElementById("img"+i).src=imgBase+data.results[i].poster_path;

    				}
    });
  })



}