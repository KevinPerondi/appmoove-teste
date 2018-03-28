//api_key=798ee2806b267f1a8d3406936e444551

window.onload = function getPopularMovies() {
    var popularQuery = 'api.themoviedb.org/3/movie/popular?api_key=798ee2806b267f1a8d3406936e444551'
	/*$.getJSON(popularQuery, function(data) {
        console.log(data)
    });*/

	//console.log(data)

/*	$.each(json, function () {

  var newApplicant = $("body").find("#applicant > div").clone();

  newApplicant.find(".name").append(this.name);
  newApplicant.find(".email").append(this.email);
  newApplicant.find(".gender").append(this.gender);
  newApplicant.find(".age").append(this.age);

  $(newApplicant).appendTo(".applicant-list");
});*/



}
function getMovieDetails(movieId){
    var detailsQuery = 'https://api.themoviedb.org/3/'+movieId+'/343611?api_key=798ee2806b267f1a8d3406936e444551'
}


function getMovieByName(movieName){
    var text = document.getElementById("search").value
    console.log(text)
    var searchQuery = 'https://api.themoviedb.org/3/search/movie?api_key=798ee2806b267f1a8d3406936e444551&query='+movieName

}