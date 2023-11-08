
//Display Movie Details 
const displayMovieDetials = (movie)=>
{
    try{
        const base_url = "https://image.tmdb.org/t/p/w500";
        const movieCard = document.getElementById('movie_card');
        let card = document.createElement('div');
        card.className = "row";
    
        //get genres
        let genres = [];
        movie.genres.forEach(genre => {
            genres += `<p>${genre.name}</p>`;
        });
        
        card.innerHTML = `
        <div class="col-4">
            <img src=${base_url + movie['poster_path']} alt="movie image" id="movieDetailsImg">
        </div>
        <div class="col-6">
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
    const api_key = "a2bb91db894787421ec75a2bf612017c";
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

//display movie details
document.addEventListener("DOMContentLoaded",(e)=>
{
    try{
    // Retrieve movie ID from query parameter
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("movieId");
    getMovieDetails(movieId);

    }catch(error){
        console.error(error);
    }
})


