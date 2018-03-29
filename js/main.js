/*ARQUIVO JAVA SCRIPT
EMANUEL FELIPE GIROLDO MAZZER -  Teste APPMOOVE
*/

/* Utilizando The Movie DB API*/
/* key: c8ef047748a08ef5a7457d40c0251e37 */

let urlBase = "https://api.themoviedb.org/3/";
let imgBase = "http://image.tmdb.org/t/p/w154//";
let imgBase185 = "http://image.tmdb.org/t/p/w185//";
let key = "c8ef047748a08ef5a7457d40c0251e37";



http://api.themoviedb.org/3/movie/47933?api_key=c8ef047748a08ef5a7457d40c0251e37

function abrirModal(dados){
 var id = dados.getAttribute("id-number");
 let url = urlBase+"movie/"+id+"?api_key="+key+"&language=pt-BR";
 var titulo = document.getElementById("tituloModal");
 var genero = document.getElementById("generoModal");
 var overview = document.getElementById("overviewModal");
 var relasedate = document.getElementById("releaseDateModal");
 var runtime = document.getElementById("runtimeModal");
 var modalHeadTitle=document.getElementById("modal-head-title");
 var imagemModal = document.getElementById("imagemModal");
 var gen="";
 fetch(url)
        .then(function(response){
          response.json().then(function(data){
            modalHeadTitle.innerHTML=data.title;
            titulo.innerHTML="<b>Titulo Original: </b>"+data.original_title;
            var generosSize = data.genres.length;
            for (var i =0; i < generosSize; i++) {
              gen=data.genres[i].name+", ";

            }
            gen=gen.substring(0, gen.length-2);
            genero.innerHTML="<b>Genero: </b>"+gen;
            overview.innerHTML="<b>Resumo: </b>"+data.overview;
            console.log(url);

            var datetime=data.release_date.split("-");
            var novadata=datetime[2]+"-"+datetime[1]+"-"+datetime[0];
            relasedate.innerHTML="<b>Data de Lançamento: </b>"+novadata;
            runtime.innerHTML="<b>Duração: </b>"+data.runtime+" minutos.";

            imagemModal.src = imgBase185+data.poster_path


    });
  })
 
document.getElementById("myModal").style.display='block';

console.log(url);
}

function fecharModal(){
  document.getElementById("myModal").style.display='none';
}

window.onclick = function(event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
}








function genreRequest(title,ide,cont,idFilme){
	let url="https://api.themoviedb.org/3/genre/movie/list?api_key="+key+"&language=en-US"
	 fetch(url)
  			.then(function(response){
    			response.json().then(function(data){
      			var vetor=(data.genres);
      			vetor.forEach( function(element, index) {
      				if(ide==element.id){
      					document.getElementById("filme"+(cont+1)).innerHTML=title;
                document.getElementById("filme"+(cont+1)).setAttribute("id-number", idFilme);
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
              var idFilme = data.results[i].id;
    					genreRequest(title,data.results[i].genre_ids[0],i,idFilme);


    				}
      			/*document.getElementById("linha1").innerHTML*/
    });
  })

}


function txtSearch(event){
	if(event.keyCode===13){
		var data = document.getElementById("textoBusca").value;
    var valor = document.getElementById("textoBusca")
		let url = urlBase+"search/movie?api_key="+key+"&query="+data;
		fetch(url)
  			.then(function(response){
    			response.json().then(function(data){
            if(response.ok){
              document.getElementById("textoBusca").setAttribute("id-number", data.results[0].id);
              abrirModal(valor);

            }else{
              console.log("Connection problem");
            }
            
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


