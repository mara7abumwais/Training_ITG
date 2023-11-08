const api_key = "a2bb91db894787421ec75a2bf612017c";
const movieSearchInput = document.getElementById('movieSearch'); 
const like_movie = document.getElementsByClassName('like_movie');
const base_url = "https://image.tmdb.org/t/p/w500" 
let genres = [];

//Get All Movies Genres
/* Store the genres list in the genres variable */
const getGenres = async()=>
{ 
  try{
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`;
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    const response = await fetch(url, options);
    const data = await  response.json();
    genres = data.genres;
  }
  catch(error){
    console.log(error);
  } 
}

//Display movies in the home page
const displayMovies = (movies)=>
{
  try{
    const cards = document.getElementById("cards");
    //Delete All cards
    while (cards.firstChild) {
      cards.removeChild(cards.firstChild);
    }
    //Get wishlist movieId's to change the like (heart) color
    const storedMovieIds = JSON.parse(localStorage.getItem('wishlistMovieIds')) || [];

    movies.forEach(movie => {
      /*Exclude any movie withour poster picture */
      if(movie['poster_path'] !=null)
      {
        /* Get genres of each movie */
        let movieGenres = "";
        movie.genre_ids.forEach(id => {
          const genre = genres.find(genre => genre.id === id);
          movieGenres += `<p>${genre.name}</p>`;
        });

        let new_card = document.createElement('li');
        new_card.innerHTML = `
        <li class="card" data-movie-id=${movie['id']}>
              <div class="card_overlay">
                <a onClick="showMovieDetails(event)">
                    See Details
                </a>
                <div class="movie_info">
                    <h3 class="movie_year">${movie['release_date'].split("-")[0]}</h3>
                    <h2 class="movie_title">${movie['title']}</h2>
                </div>
              </div>
              <div class="card_img">
                <img src="${base_url+movie['poster_path']}" alt="movie image">
              </div>
              <div class="card_content">
                <div class="movie_rate">
                    <p class="movie_rating">${movie['vote_average'].toFixed(1)}</p>
                    <i class="fa-solid fa-heart like_movie ${storedMovieIds.indexOf(String(movie['id'])) > -1 ? 'added' : 'removed'}" style="display: block;" onclick="addMovieToWishlist(event)"></i>
                    </div>
                <div class="movie_genre">
                  ${movieGenres}
                </div>
                </div>
              </div>
          </li>
        `;
        cards.appendChild(new_card);
      }
    });
  }
  catch(error){
    console.log(error);
  } 
}

//Fetch movies -Receives url-
const fetchMovies = async (url) => {
  try {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    const response = await fetch(url, options);
    const data = await response.json(); 
    let movies = data['results'];
    displayMovies(movies);
  }
  catch (error) {
    console.log(error);
  }
}


//Load popular movies when the page is uploaded
document.addEventListener('DOMContentLoaded',  async()=> {
  try{
    await getGenres();
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&language=en-US&page=1`;
    fetchMovies(url);
  }
  catch(error){
    console.log(error);
  } 
})

//Search for movies
movieSearchInput.addEventListener('change',(e)=>{
  try{
    const searchedMovie= e.target.value;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&include_adult=false&query=${searchedMovie}`;
    fetchMovies(url);
  }
  catch(error){
    console.log(error);
  } 
})

//Add or Remove Specific movie to/from Local Storage
const addMovieToLS = (movieId,add=true)=>
{
  try{
    const storedMovieIds = JSON.parse(localStorage.getItem('wishlistMovieIds')) || [];
    if(add && storedMovieIds.indexOf(movieId) == -1 )
    {
      storedMovieIds.push(movieId);
    }else{
      let index = storedMovieIds.indexOf(movieId);
      if (index > -1) { 
        storedMovieIds.splice(index, 1); 
      }
    }
    localStorage.setItem('wishlistMovieIds', JSON.stringify(storedMovieIds));
  }
  catch(error){
    console.log(error);
  } 

}

//Add movie to wishlist
/* Change the like (heart icon) color and call add movies to local storage */
const addMovieToWishlist=(event) => {
  try{
    const clickedElement = event.target;
    const movieCard =  event.target.closest('li');
    const movieId = movieCard.dataset.movieId;
  
    if (clickedElement.classList.contains('added')) {
      clickedElement.classList.remove('added');
      clickedElement.classList.add('removed');
      addMovieToLS(movieId, false);
    } else {
      clickedElement.classList.add('added');
      clickedElement.classList.remove('removed');
      addMovieToLS(movieId, true);
    }
  }
  catch(error){
    console.log(error);
  } 
}


//Go to page show movie details
const showMovieDetails= (event)=> {
  try{
    const clickedCard = event.target.closest('li');
    const movieId = clickedCard.dataset.movieId;
    
    //add movie id to params
    const movieDetailsURL = `movieDetails.html?movieId=${movieId}`;
    
    // Navigate to the movieDetails page with the movieId in the URL
    window.location.href = movieDetailsURL;
  }
  catch(error){
    console.log(error);
  } 

}
