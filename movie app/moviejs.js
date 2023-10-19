const API_KEY='api_key=4bcfcda8bf787ef4e3d00cdc88684dc4';
const BASE_URL='https://api.themoviedb.org/3'
const API_URL=BASE_URL+'/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500';
const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');
const SEARCH_URL=BASE_URL+'/search/movie?'+API_KEY;
// here the search used is from the api documentation.....
//so the search used as a id and here SEARCH_URL search are different. 




getMovies(API_URL);



function getMovies(url){
    fetch(url).then((res)=>res.json()).then((data) => {
        console.log(data);
        showmovies(data.results);
    })
}

function showmovies(moviedata){
    main.innerHTML='';
    moviedata.forEach(movie=>{
        /* object destructuring*/
        const{title,poster_path,overview,vote_average}=movie;
        const moviesEl=document.createElement('div'); //dynamically ek chota movie ka page bn jaega jo hmne main ki hmtl code m lkha h 
        moviesEl.classList.add('movie'); // class movie jod di
        moviesEl.innerHTML=`
        <img src="${IMG_URL+poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3> <span class="${getcolor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
       
            <h3>Overview</h3>
            ${overview}
        </div>`

        main.appendChild(moviesEl);
    })
    
}
function getcolor(vote){
    if(vote>=8){
        return "green";
    }
    else if(vote>=5 && vote<8){
        return "orange";
    }
    else{
        return "red";
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchterm=search.value;

    if(searchterm){
        //getMovies(SEARCH_URL+'/'+searchterm);..this not work ..
        getMovies(SEARCH_URL+'&query='+searchterm);
    }
    else{
        getMovies(API_URL);
    }
})
