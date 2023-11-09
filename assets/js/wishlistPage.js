const api_key = "a2bb91db894787421ec75a2bf612017c";
const base_url = "https://image.tmdb.org/t/p/w500" 


//Display favorite movies
//This function is called after fetching all movies 
const displayWishlistMovies = (movies)=>
{
    try{
        const wishlistMovies = document.getElementById('wishlistMovies');
        //clear the wishlistMovies from all the movies to avoid repeat the movies
        while (wishlistMovies.firstChild) {
            wishlistMovies.removeChild(wishlistMovies.firstChild);
        }
        //display no movies found message when no movies in wishlist
        const noMoviesMessage = document.getElementById('noWishlistMessage');
        if(movies.length === 0)
        {
            noMoviesMessage.style.display = "block";
            return;
        }
        noMoviesMessage.style.display = "none";

        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = "col-lg-3 col-12";
            movieCard.innerHTML = `
                <div class="movie_overlay">
                    <a onClick="showMovieDetails(${movie['id']})">
                            See Details
                        </a>
                </div>
                <div class="wishlist_img">
                    <i class="fa-solid fa-heart like_movie heart-icon" style="display: block;" onclick="removeMovieFromWishlist(event,${movie['id']})"></i>      
                    <img src=${base_url+movie['poster_path']} alt="wishlist movie">
                </div>
                <div class="wishlist_content">
                    <h3>${movie['title']}</h3>
                    <p>${movie['vote_average'].toFixed(1)}</p>
                </div>
            `;
            wishlistMovies.appendChild(movieCard);
        });
    }
    catch(error){
        console.log(error);
    } 
}

//Fetch each movie using the movie id
const fetchWishlistMovie = async(movieId)=> 
{
    try{
        let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}`;
        const options = { method: 'GET', headers: { accept: 'application/json' } };
        let response = await fetch(url, options);
        return response.json();
    }
    catch(error){
        console.log(error);
    } 
}

//Load all wishlist movies
const loadAllWishlist = async()=>
{
    try{
        const wishlistMovies = JSON.parse(localStorage.getItem('wishlistMovieIds')) || [];
        if(wishlistMovies.length > 0) {
            let movies = [];
            
            for (let movieId of wishlistMovies) {
                //fetch each movie alone 
                let movie = await fetchWishlistMovie(movieId);
                //push all wishlist movies to movies array
                movies.push(movie);
            }
            displayWishlistMovies(movies);
        }
    }
    catch(error){
        console.log(error);
    } 

}

//Remove Movie from wishlist
const removeMovieFromWishlist= (event,movieId)=>
{
    try{
        const storedMovieIds = JSON.parse(localStorage.getItem('wishlistMovieIds')) || [];
        let index = storedMovieIds.indexOf(String(movieId));
            if (index > -1) { 
                storedMovieIds.splice(index, 1); 
                event.target.style.color = '#fff';
                localStorage.setItem('wishlistMovieIds', JSON.stringify(storedMovieIds));
                // load all wishlist again to exclude the removed movie
                loadAllWishlist();
            }
    }
    catch(error){
        console.log(error);
    } 
}


//Display favorite movies when the page loaded
/* it will navigate load wishlist movies */ 
document.addEventListener('DOMContentLoaded', (e) => {
    try{
        loadAllWishlist();
    }
    catch(error){
        console.log(error);
    } 
});

//Go to page show movie details
const showMovieDetails =(movieId) =>{
    try{
        //add movie id to params
        const movieDetailsURL = `movieDetails.html?movieId=${movieId}`;
        // Navigate to the movieDetails page with the movieId in the URL
        window.location.href = movieDetailsURL;
    }
    catch(error){
        console.log(error);
    } 
}


