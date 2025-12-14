(function () {
  const track = document.getElementById('escalator');
  const slides = Array.from(track.children);
  const slideWidth = slides[0].getBoundingClientRect().width + 12;

  function duplicateSlides() {
    const frag = document.createDocumentFragment();
    slides.forEach(s => frag.appendChild(s.cloneNode(true)));
    track.appendChild(frag);
  }
  duplicateSlides();

  let position = 0;
  let speed = 0.6;
  let rafId = null;

  function step() {
    position -= speed;

    const resetThreshold = slideWidth * slides.length;
    if (Math.abs(position) >= resetThreshold) {
      position += resetThreshold;
    }
    track.style.transform = `translateX(${position}px)`;
    rafId = requestAnimationFrame(step);
  }

  rafId = requestAnimationFrame(step);

  track.addEventListener('mouseenter', () => cancelAnimationFrame(rafId));
  track.addEventListener('mouseleave', () => {
    rafId = requestAnimationFrame(step);
  });

  window.addEventListener('resize', () => {
    clearTimeout(window._escalatorResize);
    window._escalatorResize = setTimeout(() => {
      position = 0;
      track.style.transform = `translateX(0px)`;
    }, 120);
  });
})();

function createSnowflake() {
  const snow = document.createElement("div");
  snow.classList.add("snowflake");
  snow.textContent = "❄";

  snow.style.left = Math.random() * 100 + "vw";
  snow.style.fontSize = (Math.random() * 10 + 10) + "px";
  snow.style.animationDuration = (Math.random() * 5 + 5) + "s";

  document.body.appendChild(snow);

  setTimeout(() => snow.remove(), 10000);
}
setInterval(createSnowflake, 200);
