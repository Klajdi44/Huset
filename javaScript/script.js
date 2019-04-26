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