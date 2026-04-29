// Seleziona tutti gli elementi che devono apparire con effetto reveal.
const revealItems = document.querySelectorAll(".reveal");

// Crea observer per attivare le animazioni solo quando gli elementi entrano in viewport.
const observer = new IntersectionObserver(
  (entries) => {
    // Cicla ogni elemento osservato e valuta se e visibile.
    entries.forEach((entry) => {
      // Se l'elemento entra in viewport, aggiunge classe visibile e smette di osservarlo.
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    // Anticipa leggermente il reveal per un effetto piu fluido.
    threshold: 0.16,
  }
);

// Avvia l'osservazione su ogni blocco con classe reveal.
revealItems.forEach((item) => observer.observe(item));
