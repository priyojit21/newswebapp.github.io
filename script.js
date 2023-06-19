const API_KEY = "f05293a535b44b3a9153479093cdf893";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("tesla"));
async function fetchNews(query) {
    // fetch (api_key)
    const res =  await fetch(`${url}${query}&apikey=${API_KEY}`); 
    const data = await res.json();
    console.log(data);
    bindData(data.articles);
}

function bindData(articles) {
    const cardscontainer = document.getElementById('cards-container');
    const newstemplate = document.getElementById('news-template');

    cardscontainer.innerHTML= ' ';

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardclone = newstemplate.content.cloneNode(true);
        fillDatainCard(cardclone,article);
        cardscontainer.appendChild(cardclone);
    });
}

function fillDatainCard(cardclone,article) {
    const newsimg = cardclone.querySelector("#news-image");
    const newstitle = cardclone.querySelector("#news-title");
    const newsdesc = cardclone.querySelector("#news-desc");
    const newssource = cardclone.querySelector("#news-source");

    newsimg.src = article.urlToImage;
    newstitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;
    

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    })
    newssource.innerHTML = `${article.source.name} . ${date}`;

    cardclone.firstElementChild.addEventListener("click" ,() => {
        // new tab will open
        window.open(article.url, "_blank");
    });
}

const search = document.getElementById("search");
const searchbutton = document.getElementById("search-button");

searchbutton.addEventListener("click" , () => {
    const query = search.value;
    if(!query) return;
    fetchNews(query);
})

let selectednavitem = null;
function onNavitemclick(query)
{
    fetchNews(query);
    navitem = document.getElementById(query);
    selectednavitem?.classList.remove('active');
    selectednavitem = navitem;
    selectednavitem.classList.add('active');
}

// reload korar function
function reload()
{
    window.location.reload();
}

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}
function closemenu() {
    sidemenu.style.right = "-200px";
}