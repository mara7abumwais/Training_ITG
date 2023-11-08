const api_key = "a2bb91db894787421ec75a2bf612017c";
const base_url = "https://image.tmdb.org/t/p/w500";


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

//Display Movie Details 
const displayMovieDetials = (movie)=>
{
    try{
        const movieCard = document.getElementById('movie_card');
        let card = document.createElement('div');
        card.className = "row";
    
        //get genres
        let genres = [];
        movie.genres.forEach(genre => {
            genres += `<p>${genre.name}</p>`;
        });
        
        card.innerHTML = `
        <div class="col-lg-4 col-12">
            <img src=${base_url + movie['poster_path']} alt="movie image" id="movieDetailsImg">
        </div>
        <div class="col-lg-6 col-12 movie_desc">
            <h2>${movie['title']}</h2>
            <h3> ${movie['vote_average'].toFixed(1)}</h3>
            <p>${movie['release_date']}</p>
            <p>${movie['overview']}</p>
            <div class="movie_geners">
                ${genres}
            </div>
        </div>
        `;
        movieCard.appendChild(card);
    }catch(error)
    {
        console.log(error);
    }
}

//Get Movie Details using moviedId in params
const getMovieDetails = async(movieId)=>
{
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`;
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    
    try{
        const response = await fetch(url, options);
        const data = await response.json();
        displayMovieDetials(data);
    }catch(error){
        console.error(error);
    }
}

//Display similar movies
//Display movies in the home page
const displaySimilarMovies = (movies)=>
{
try{
    const cards = document.getElementById("similarMovies");
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
        new_card.className = "card";
        new_card.dataset.movieId = movie['id'];
        new_card.innerHTML = `
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
                    </div>
                <div class="movie_genre">
                    ${movieGenres}
                </div>
                </div>
            </div>
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
const fetchSimilarMovies = async (url) => {
    try {
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        const response = await fetch(url, options);
        const data = await response.json(); 
        let movies = data['results'];
        displaySimilarMovies(movies);
    }
    catch (error) {
        console.log(error);
    }
}

//display movie details
document.addEventListener("DOMContentLoaded", async(e)=>
{
    try{
        await getGenres();
        // Retrieve movie ID from query parameter
        const params = new URLSearchParams(window.location.search);
        const movieId = params.get("movieId");
        let url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}&language=en-US&page=1`;

        getMovieDetails(movieId);
        fetchSimilarMovies(url);
    }catch(error){
        console.error(error);
    }
})

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



