const categoryButtons=document.querySelectorAll(".category-button");
const dishCards=document.querySelectorAll(".dish-card");
const menuSearch=document.getElementById("menuSearch");
const emptyMenu=document.getElementById("emptyMenu");
let activeCategory="todos";
function filterMenu(){const term=menuSearch.value.trim().toLowerCase();let visible=0;dishCards.forEach(card=>{const matchesCategory=activeCategory==="todos"||card.dataset.category===activeCategory;const matchesSearch=card.dataset.name.includes(term);const show=matchesCategory&&matchesSearch;card.hidden=!show;if(show)visible++;});emptyMenu.hidden=visible!==0;}
categoryButtons.forEach(button=>button.addEventListener("click",()=>{categoryButtons.forEach(item=>item.classList.remove("active"));button.classList.add("active");activeCategory=button.dataset.category;filterMenu();}));
menuSearch.addEventListener("input",filterMenu);
