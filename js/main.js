// nikoJart website: full-screen viewer for the works.
// Without JavaScript each image link simply opens the full image.
(function () {
  const links = Array.from(document.querySelectorAll('.work-link'));
  const box = document.querySelector('.lightbox');
  if (!box || !links.length || typeof box.showModal !== 'function') return;

  const img = box.querySelector('img');
  const title = box.querySelector('.title');
  const meta = box.querySelector('.meta');
  let index = 0;

  function show(i) {
    index = (i + links.length) % links.length;
    const a = links[index];
    img.src = a.getAttribute('href');
    img.alt = a.querySelector('img').alt;
    title.textContent = a.dataset.title;
    meta.textContent = a.dataset.caption;
  }

  links.forEach((a, i) => a.addEventListener('click', (e) => {
    e.preventDefault();
    show(i);
    box.showModal();
  }));

  box.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
  box.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
  box.querySelector('.lb-close').addEventListener('click', () => box.close());
  box.addEventListener('click', (e) => { if (e.target === box || e.target.tagName === 'FIGURE') box.close(); });
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  box.addEventListener('close', () => { img.removeAttribute('src'); links[index].focus(); });
})();
