const template = document.querySelector('#postTemplate').content;
const templateAbout = document.querySelector('#aboutTemplate').content;
const menu = document.getElementById('menu');
let cinema = "http://www.lasimi.com/lasimi/kea2/wp-json/wp/v2/cinema?_embed";
let about = "http://www.lasimi.com/lasimi/kea2/wp-json/wp/v2/abouthuset?_embed";
let contact = "http://www.lasimi.com/lasimi/kea2/wp-json/wp/v2/contacthuset?_embed";

function loadData(link) {
    fetch(link).then(e => e.json()).then(data => show(data))
}

const parent =  document.querySelector('main');

function show(data) {
    data.forEach(object => {
        const clone = template.cloneNode(true);
        clone.querySelector('img.preview').src = object._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        clone.querySelector('h1.title').innerHTML = object.title.rendered;
        clone.querySelector('h3.time').innerHTML = object.datetime;
        clone.querySelector('.ticketPrice').innerHTML = object.ticket_price;
        clone.querySelector('section.description').innerHTML = object.content.rendered;
        clone.querySelector('.player').src = 'https://www.youtube.com/embed/' + object.videos.split(';')[0] + '?feature=oembed';
        parent.appendChild(clone);
    })
}

loadData(cinema);

function expand(article) {
    Array.from(document.getElementsByClassName("post")).forEach(post=>{
      if (post != article) post.classList.toggle('hidden');
    });
    article.querySelector(".price").classList.toggle("hidden");
    article.querySelector(".description").classList.toggle("hidden");
    article.querySelector(".trailer").classList.toggle("hidden");
    article.querySelector(".back").classList.toggle("hidden");
    article.querySelector(".social").classList.toggle("hidden");
    article.querySelector(".buttonBackground").classList.toggle("hidden");
    article.classList.toggle("focused");
}

function expandForum(social, forum) {
    social.querySelector(".discussions").classList.add("hidden");
    social.querySelector(".reviews").classList.add("hidden");
    social.querySelector("." + forum).classList.remove("hidden");
}

function loadEvents() {
    menu.checked = false;
    document.querySelectorAll(".post").forEach(post => { // find the top menu position of the selected class and mark it as 'selected'
	    post.remove();
	});
    loadData(cinema);
}

function loadInfo(link) {
    menu.checked = false;
    document.querySelectorAll(".post").forEach(post => { // find the top menu position of the selected class and mark it as 'selected'
	    post.remove();
	});
    fetch(link).then(e => e.json()).then(data => data.forEach(object => {
        const clone = templateAbout.cloneNode(true);
        clone.querySelector('img.preview').src = object._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
        clone.querySelector('h1.title').innerHTML = object.title.rendered;
        clone.querySelector('section.description').innerHTML = object.content.rendered;
        parent.appendChild(clone);
    }));
}
function loadContact() {
    loadInfo(contact);
}
function loadAbout() {
    loadInfo(about);
}