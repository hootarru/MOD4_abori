document.addEventListener("DOMContentLoaded", () => {
  // === Скрытие/показ меню при скролле ===
  const nav = document.querySelector(".main-nav");
  let lastScrollTop = 0;

  if (!nav) {
    console.error("Элемент .main-nav не найден");
  } else {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop === 0) {
        nav.classList.remove("hidden");
      } else if (scrollTop > lastScrollTop) {
        nav.classList.add("hidden");
      } else {
        nav.classList.remove("hidden");
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

  // === Плавный скролл к якорям ===
  function smoothScrollTo(target, duration = 2000) {
    const start = window.scrollY;
    const targetPosition = target.getBoundingClientRect().top;
    const startTime = performance.now();

    function scrollStep(currentTime) {
      const timeElapsed = currentTime - startTime;
      const run = easeInOut(timeElapsed, start, targetPosition, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(scrollStep);
      }
    }

    function easeInOut(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(scrollStep);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        smoothScrollTo(targetElement, 4000); // 4 секунды скролл
      }
    });
  });

  // === Анимация появление при скролле ===
  const ress = document.querySelector(".ress");

  if (ress) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(ress);
  }

  // === Карусель с новостями ===
  // Бесконечная карусель
  const track = document.querySelector(".news-track");
  const items = document.querySelectorAll(".news-item");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (!track || !items.length || !leftArrow || !rightArrow) {
    console.warn("Элементы карусели не найдены");
    return;
  }

  let itemWidth;
  let currentIndex = 0;
  const totalItems = items.length;

  const firstClone = items[0].cloneNode(true);
  const secondClone = items[1].cloneNode(true);
  const lastClone = items[items.length - 1].cloneNode(true);
  const prevLastClone = items[items.length - 2].cloneNode(true);

  track.appendChild(firstClone);
  track.appendChild(secondClone);
  track.insertBefore(lastClone, items[0]);
  track.insertBefore(prevLastClone, lastClone);

  const updatedItems = document.querySelectorAll(".news-item");

  function updateItemWidth() {
    const trackStyle = getComputedStyle(track);
    const gap = parseFloat(trackStyle.gap) || 0;
    itemWidth = updatedItems[0].offsetWidth + gap;
  }

  window.addEventListener("load", () => {
    updateItemWidth();

    track.style.transition = "none";
    currentIndex = 2;
    track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  });
  window.addEventListener("resize", updateItemWidth);

  function updateCarousel(direction) {
    track.style.transition = "transform 0.5s ease-in-out";

    if (direction === "right") {
      currentIndex++;
    } else if (direction === "left") {
      currentIndex--;
    }

    const offset = -currentIndex * itemWidth;
    track.style.transform = `translateX(${offset}px)`;

    // После окончания анимации проверяем, нужно ли "перепрыгнуть"
    track.addEventListener("transitionend", onTransitionEnd);
  }

  function onTransitionEnd() {
    track.removeEventListener("transitionend", onTransitionEnd);

    // Если дошли до конца — перескакиваем на начало
    if (currentIndex >= totalItems + 2) {
      currentIndex = 2;
      track.style.transition = "none";
      track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

    // Если дошли до начала — перескакиваем на конец
    if (currentIndex <= 1) {
      currentIndex = totalItems + 1;
      track.style.transition = "none";
      track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }
  }

  rightArrow.addEventListener("click", () => updateCarousel("right"));
  leftArrow.addEventListener("click", () => updateCarousel("left"));
  // setInterval(() => {
  //   updateCarousel("right");
  // }, 6000); // каждые 4 секунды
});
const track = document.querySelector(".news-track");
const trackBottom = document.querySelector(".news-track-bottom"); // НОВАЯ ЛЕНТА
const items = document.querySelectorAll(".news-item");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let itemWidth;
let currentIndex = 0;
const totalItems = items.length;

// === Остальной код клонирования остаётся как есть ===

function updateCarousel(direction) {
  track.style.transition = "transform 0.5s ease-in-out";
  if (trackBottom) trackBottom.style.transition = "transform 0.5s ease-in-out";

  if (direction === "right") {
    currentIndex++;
  } else if (direction === "left") {
    currentIndex--;
  }

  const offset = -currentIndex * itemWidth;
  track.style.transform = `translateX(${offset}px)`;
  if (trackBottom) trackBottom.style.transform = `translateX(${offset}px)`;

  track.addEventListener("transitionend", onTransitionEnd);
}
document.addEventListener("DOMContentLoaded", function () {
  // === Элементы карусели ===
  const topRow = document.getElementById("topRow");
  const bottomRow = document.getElementById("bottomRow");
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (!topRow || !bottomRow || !leftArrow || !rightArrow) {
    console.warn("Элементы карусели не найдены");
    return;
  }

  let itemWidth;
  let currentIndex = 0;
  const itemsTop = Array.from(topRow.children);
  const totalItems = itemsTop.length;

  // === Клонируем элементы для бесконечности ===
  const firstCloneTop = itemsTop[0].cloneNode(true);
  const secondCloneTop = itemsTop[1].cloneNode(true);
  const lastCloneTop = itemsTop[itemsTop.length - 1].cloneNode(true);
  const prevLastCloneTop = itemsTop[itemsTop.length - 2].cloneNode(true);

  const itemsBottom = Array.from(bottomRow.children);
  const firstCloneBottom = itemsBottom[0].cloneNode(true);
  const secondCloneBottom = itemsBottom[1].cloneNode(true);
  const lastCloneBottom = itemsBottom[itemsBottom.length - 1].cloneNode(true);
  const prevLastCloneBottom =
    itemsBottom[itemsBottom.length - 2].cloneNode(true);

  // Добавляем клоны в DOM
  topRow.appendChild(firstCloneTop);
  topRow.appendChild(secondCloneTop);
  topRow.insertBefore(lastCloneTop, itemsTop[0]);
  topRow.insertBefore(prevLastCloneTop, lastCloneTop);

  bottomRow.appendChild(firstCloneBottom);
  bottomRow.appendChild(secondCloneBottom);
  bottomRow.insertBefore(lastCloneBottom, itemsBottom[0]);
  bottomRow.insertBefore(prevLastCloneBottom, lastCloneBottom);

  // Обновляем список элементов после клонирования
  const updatedItemsTop = Array.from(topRow.children);

  // === Расчёт ширины элемента + gap ===
  function updateItemWidth() {
    const style = window.getComputedStyle(topRow);
    const gap = parseFloat(style.gap) || 0;
    itemWidth = updatedItemsTop[0].offsetWidth + gap;
  }

  window.addEventListener("load", () => {
    updateItemWidth();
    // Смещаем начальное положение без анимации
    topRow.style.transition = "none";
    bottomRow.style.transition = "none";
    currentIndex = 2;
    const offset = -currentIndex * itemWidth;
    topRow.style.transform = `translateX(${offset}px)`;
    bottomRow.style.transform = `translateX(${offset}px)`;
  });

  window.addEventListener("resize", () => {
    updateItemWidth();
  });

  function updateCarousel(direction) {
    topRow.style.transition = "transform 0.5s ease-in-out";
    bottomRow.style.transition = "transform 0.5s ease-in-out";

    if (direction === "next") {
      currentIndex++;
    } else if (direction === "prev") {
      currentIndex--;
    }

    const offset = -currentIndex * itemWidth;
    topRow.style.transform = `translateX(${offset}px)`;
    bottomRow.style.transform = `translateX(${offset}px)`;

    topRow.addEventListener("transitionend", onTransitionEnd);
  }

  function onTransitionEnd() {
    topRow.removeEventListener("transitionend", onTransitionEnd);

    if (currentIndex >= totalItems + 2) {
      currentIndex = 2;
      topRow.style.transition = "none";
      bottomRow.style.transition = "none";
      const offset = -currentIndex * itemWidth;
      topRow.style.transform = `translateX(${offset}px)`;
      bottomRow.style.transform = `translateX(${offset}px)`;
    }
    if (currentIndex <= 1) {
      currentIndex = totalItems + 1;
      topRow.style.transition = "none";
      bottomRow.style.transition = "none";
      const offset = -currentIndex * itemWidth;
      topRow.style.transform = `translateX(${offset}px)`;
      bottomRow.style.transform = `translateX(${offset}px)`;
    }
  }

  // === Обработчики событий ===
  rightArrow.addEventListener("click", () => updateCarousel("next"));
  leftArrow.addEventListener("click", () => updateCarousel("prev"));

  // === Опционально: автопрокрутка ===
  setInterval(() => {
    updateCarousel("next");
  }, 6000);
});
