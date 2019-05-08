const template = document.querySelector('template').content;
let myLink = "http://www.lasimi.com/lasimi/kea2/wp-json/wp/v2/cinema?_embed";

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

loadData(myLink);

function expand(article) {
    Array.from(document.getElementsByClassName("post")).forEach(post=>{
      if (post != article) post.classList.toggle('hidden');
    });
    article.querySelector(".price").classList.toggle("hidden");
    article.querySelector(".description").classList.toggle("hidden");
    article.querySelector(".trailer").classList.toggle("hidden");
    article.querySelector(".social").classList.toggle("hidden");
}