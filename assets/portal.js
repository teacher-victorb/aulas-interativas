document.querySelectorAll("[data-year]").forEach((node)=>{
  node.textContent = new Date().getFullYear();
});

const search = document.querySelector("[data-lesson-search]");
if (search){
  const cards = [...document.querySelectorAll("[data-lesson-card]")];
  const empty = document.querySelector("[data-empty-state]");

  const normalize = (text) =>
    text.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filter = () => {
    const q = normalize(search.value.trim());
    let visible = 0;

    cards.forEach((card)=>{
      const match = !q || normalize(card.textContent).includes(q);
      card.hidden = !match;
      if (match) visible++;
    });

    if (empty) empty.style.display = visible ? "none" : "block";
  };

  search.addEventListener("input", filter);
}
