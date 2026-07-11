const API_KEY = "47ed41f8";
const input=document.getElementById("movie");
const btn=document.getElementById("search");
const themeBtn=document.getElementById("toggle-theme")
const movies=document.getElementById("movies");
const historyDiv = document.getElementById("history");
const savedTheme = JSON.parse(localStorage.getItem("isDark"));
if(savedTheme === true){
document.body.classList.add("dark");
themeBtn.textContent="☀️ Light Mode";
}else{
document.body.classList.remove("dark");
 themeBtn.textContent = "🌙 Dark Mode";
}
input.addEventListener("keydown", function(event){
if(event.key==="Enter"){
    btn.click();
}
});
let movieHistory = JSON.parse(localStorage.getItem("movies")) || [];
localStorage.removeItem("movies");
renderHistory();
btn.addEventListener("click" , function(){
if(input.value.trim()===""){
   return;
}

getmovie();

});

themeBtn.addEventListener("click", function () {

const isDark = document.body.classList.toggle("dark");

if (isDark) {
    themeBtn.textContent = "☀️ Light Mode";
} else {
    themeBtn.textContent = "🌙 Dark Mode";
}

localStorage.setItem("isDark", JSON.stringify(isDark));
});

async function getmovie(){
    try{
    const movie=input.value;
     movies.innerHTML = "<h2>🔍 Searching...</h2>";
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`);
    const data = await response.json();
     console.log(data);
     if(data.Response==="False"){
    movies.innerHTML="<h2>Movie Not Found</h2>";
    return;
    }
     movieHistory.push(movie);

localStorage.setItem(
    "movies",
    JSON.stringify(movieHistory)
);

renderHistory();
    movies.innerHTML = `
    <div class="movie-card">
    <h2>${data.Title}</h2>
    <p>Year: ${data.Year}</p>
    <img src="${data.Poster}">
    <p>IMDb: ${data.imdbRating}</p>
    <p>Genre: ${data.Genre}</p>
    <p>Director: ${data.Director}</p>
    <p>Actors: ${data.Actors}</p>
    <p>Plot: ${data.Plot}</p>
    </div>
`;
    }catch(error){
    movies.innerHTML=`<h2>Something went wrong !</h2>`
    }
   
}
function renderHistory(){

    historyDiv.innerHTML = "";

    movieHistory.forEach(function(movie){
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = movie;
    li.appendChild(span);
    historyDiv.appendChild(li);
    });

}