const  coll = document.getElementsByClassName("collapsible");
  let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    const content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

const pageTitle = document.getElementById("PageTitle");
const eventFilters = document.getElementById("EventFilters");
const eventfiltersContent = document.getElementById("FiltersContent");

Array.from(document.getElementsByTagName('a')).forEach(element => {
	element.onclick = function() { 
		pageTitle.innerHTML = (element.innerHTML);
		if (element.innerHTML != 'Events') {
			eventFilters.style.display = 'none';
		} else {
			eventFilters.style.display = 'block';
		}		
		
	};
});

function myFunction(){
	const burgermeny = document.getElementsByClassName("burgerMenu");
	burgermeny.classList.add('.slide-top ');
}

function showFilters() {
	eventfiltersContent.classList.toggle('hidden');
}




















//Klajdi's part starts here
const template = document.querySelector('template').content;
let myLink = "http://www.lasimi.com/lasimi/kea2/wp-json/wp/v2/boardgame?_embed";
const parent =  document.querySelector('main');

function loadData(link){
fetch(link).then(e=>e.json()).then(data=>show(data))
}



function show(data){
    data.forEach(Object=>{
        console.log(Object);

        //clone the template
        const clone = template.cloneNode(true);

        //polulate it
        const h1 = clone.querySelector('h1');
        const h3 = clone.querySelector('h3');
        const h4 = clone.querySelector('h4');
        const section = clone.querySelector('section');

        clone.querySelector("a").href = "details.html?BoardgameID="+Object.id;

        h1.innerHTML = Object.title.rendered;
        let newTime = Object.time;
        h3.textContent = Object.time;
        clone.querySelector('h3').innerHTML = newTime.substring(0, newTime.length -3);
      section.innerHTML= Object.content.rendered;
        clone.querySelector('img').src=Object._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;

        h4.textContent = Object.rating;

    if(Object.rating <=5){
   h4.style.background = 'red';
            h4.style.color = "#fff";

 } else if(Object.rating <=7){
     h4.style.background = 'orange';
         h4.style.color = "#fff";


}else{
         h4.style.background = 'green';
    h4.style.color = "#fff";
}







        //_embedded[""wp:featuredmedia""][""0""].author get the author
        //apend to dom
       parent.appendChild(clone);
    })


}

loadData(myLink);
