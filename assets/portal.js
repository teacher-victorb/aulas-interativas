document.querySelectorAll("[data-year]").forEach((node)=>{node.textContent=new Date().getFullYear();});

const normalizeText=(text)=>text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");

const lessonSearch=document.querySelector("[data-lesson-search]");
if(lessonSearch){
  const cards=[...document.querySelectorAll("[data-lesson-card]")];
  const empty=document.querySelector("[data-empty-state]");
  const filter=()=>{const q=normalizeText(lessonSearch.value.trim());let visible=0;cards.forEach((card)=>{const match=!q||normalizeText(card.textContent).includes(q);card.hidden=!match;if(match)visible++;});if(empty)empty.style.display=visible?"none":"block";};
  lessonSearch.addEventListener("input",filter);
}

const moduleSearch=document.querySelector("[data-module-search]");
if(moduleSearch){
  const cards=[...document.querySelectorAll("[data-module-card]")];
  const empty=document.querySelector("[data-module-empty]");
  const filter=()=>{const q=normalizeText(moduleSearch.value.trim());let visible=0;cards.forEach((card)=>{const match=!q||normalizeText(card.textContent).includes(q);card.hidden=!match;if(match)visible++;});if(empty)empty.style.display=visible?"none":"block";};
  moduleSearch.addEventListener("input",filter);
}
