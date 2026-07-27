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


// Nautical learning map used on level and module pages.
const nauticalLevels = [
  {code:"A1", name:"Beginner"},
  {code:"A2", name:"Elementary"},
  {code:"B1", name:"Intermediate"},
  {code:"B2", name:"Upper-Intermediate"},
  {code:"B2+", name:"Pre-Advanced"},
  {code:"C1", name:"Advanced"},
  {code:"C1+", name:"Advanced Plus"}
];

document.querySelectorAll("[data-current-level]").forEach((panel) => {
  const current = panel.dataset.currentLevel;
  const currentIndex = nauticalLevels.findIndex((item) => item.code === current);
  const boatPosition = currentIndex < 0 ? 0 : (currentIndex / (nauticalLevels.length - 1)) * 100;
  const mapLabel = panel.dataset.mapLabel || `Port ${current}`;

  const ports = nauticalLevels.map((item, index) => {
    const state = index < currentIndex ? "visited" : index === currentIndex ? "current" : "future";
    const ariaCurrent = index === currentIndex ? ' aria-current="step"' : "";
    return `
      <div class="mini-port ${state}" style="--port-position:${index / (nauticalLevels.length - 1) * 100}%;--port-mobile:${index * 55}px"${ariaCurrent}>
        <span class="mini-port-marker"><span></span></span>
        <b>${item.code}</b>
        <small>${item.name}</small>
      </div>`;
  }).join("");

  panel.innerHTML = `
    <div class="level-map-top">
      <div>
        <span class="level-map-kicker">Nautical learning chart</span>
        <strong>${mapLabel}</strong>
      </div>
      <span class="mini-compass" aria-hidden="true"><i></i></span>
    </div>
    <div class="mini-map-track">
      <div class="mini-route-line"></div>
      <div class="mini-boat" style="--boat-position:${boatPosition}%;--boat-mobile:${Math.max(currentIndex,0) * 55}px" aria-hidden="true">
        <span class="mini-boat-hull"></span>
        <span class="mini-boat-mast"></span>
        <span class="mini-boat-sail one"></span>
        <span class="mini-boat-sail two"></span>
      </div>
      ${ports}
    </div>
    <div class="level-map-foot">
      <span class="map-coordinate">ROUTE 01 · ATLANTIC LEARNING CHART</span>
      <span class="you-are-here">You are here: <b>${current}</b></span>
    </div>`;
});
