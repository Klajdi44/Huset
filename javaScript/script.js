const template = document.querySelector('template').content;
let myLink = "http://www.lasimi.com/lasimi/kea2/wp-json/wp/v2/MusicEvents?_embed";

function loadData(link) {
    fetch(link).then(e => e.json()).then(data => show(data))
}

const parent =  document.querySelector('main');

function show(data) {
    data.forEach(object => {
        const clone = template.cloneNode(true);
        clone.querySelector('img.preview').src = object.photo.guid;
        clone.querySelector('h1.title').innerHTML = object.title.rendered;
        let newTime = object.timedate;
        clone.querySelector('h3.time').innerHTML = newTime.substring(0, newTime.length -3);
        clone.querySelector('.ticketPrice').innerHTML = object.ticket_price;
        clone.querySelector('section.description').innerHTML = object.content.rendered;

        clone.querySelector('h4').textContent= object.short_description;

        clone.querySelector('.longDes').textContent= object.band_description;
        clone.querySelector('.player').src = 'https://www.youtube.com/embed/' + object.video.split(',')[0] + '?feature=oembed';
        parent.appendChild(clone);





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
