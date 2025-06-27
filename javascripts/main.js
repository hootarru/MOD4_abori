document.addEventListener("DOMContentLoaded", () => {
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
        smoothScrollTo(targetElement, 1000);
      }
    });
  });

  ъ;
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

  // Карусель с новостями

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

    track.addEventListener("transitionend", onTransitionEnd);
  }

  function onTransitionEnd() {
    track.removeEventListener("transitionend", onTransitionEnd);

    if (currentIndex >= totalItems + 2) {
      currentIndex = 2;
      track.style.transition = "none";
      track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    }

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

  topRow.appendChild(firstCloneTop);
  topRow.appendChild(secondCloneTop);
  topRow.insertBefore(lastCloneTop, itemsTop[0]);
  topRow.insertBefore(prevLastCloneTop, lastCloneTop);

  bottomRow.appendChild(firstCloneBottom);
  bottomRow.appendChild(secondCloneBottom);
  bottomRow.insertBefore(lastCloneBottom, itemsBottom[0]);
  bottomRow.insertBefore(prevLastCloneBottom, lastCloneBottom);

  const updatedItemsTop = Array.from(topRow.children);

  function updateItemWidth() {
    const style = window.getComputedStyle(topRow);
    const gap = parseFloat(style.gap) || 0;
    itemWidth = updatedItemsTop[0].offsetWidth + gap;
  }

  window.addEventListener("load", () => {
    updateItemWidth();

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

  rightArrow.addEventListener("click", () => updateCarousel("next"));
  leftArrow.addEventListener("click", () => updateCarousel("prev"));

  setInterval(() => {
    updateCarousel("next");
  }, 6000);
});

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZабвгдежзиклмнопрстуфхцчшщъыьэюя!?@#$%^&*()_+=-0123456789";

  function scrambleText(element, finalText, duration = 2, delay = 0) {
    element.innerHTML = "";

    let scrambled = "";
    let target = finalText;
    let interval = 50;
    let totalSteps = Math.floor((duration * 1000) / interval);
    let steps = [];

    for (let i = 0; i < target.length; i++) {
      let step =
        Math.floor(Math.random() * totalSteps * 0.5) + totalSteps * 0.5;
      steps.push(step);
    }

    let current = new Array(target.length).fill("");
    let index = 0;

    const span = document.createElement("span");
    element.appendChild(span);

    function updateChar(i) {
      let step = 0;
      const timer = setInterval(() => {
        if (step >= steps[i]) {
          clearInterval(timer);
          current[i] = target[i];
        } else {
          current[i] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        span.textContent = current.join("");
        step++;
      }, interval);
    }

    setTimeout(() => {
      for (let i = 0; i < target.length; i++) {
        setTimeout(() => updateChar(i), i * 30);
      }
    }, delay);
  }

  function glitchLine(el, text, index) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      delay: index * 0.5,
    });

    tl.call(() => {
      scrambleText(el, text, 1, 0);
    });
  }

  const elements = document.querySelectorAll(".text4 .lol");
  elements.forEach((el, i) => {
    const originalText = el.textContent.trim();
    el.textContent = "";
    glitchLine(el, originalText, i);
  });
});
// карусель 2
document.addEventListener("DOMContentLoaded", function () {
  const track = document.getElementById("carouselLocationTrack");
  const images = document.querySelectorAll(".carousel-location-track img");

  const cloneCount = 3;
  for (let i = 0; i < cloneCount; i++) {
    const firstClone = images[i].cloneNode(true);
    const lastClone = images[images.length - 1 - i].cloneNode(true);

    track.insertBefore(lastClone, images[0]);
    track.appendChild(firstClone);
  }

  const allImages = document.querySelectorAll(".carousel-location-track img");

  let imageWidth =
    allImages[0].offsetWidth +
    parseFloat(getComputedStyle(allImages[0]).marginRight);

  let offset = 0;
  const speed = 1;

  let requestId = null;

  function animateCarousel() {
    offset -= speed;

    if (Math.abs(offset) >= imageWidth) {
      offset += imageWidth;

      track.appendChild(track.firstElementChild);
      track.style.transition = "none";
      track.style.transform = `translateX(${offset}px)`;
      void track.offsetWidth;
      track.style.transition = "";
    } else {
      track.style.transform = `translateX(${offset}px)`;
    }

    requestId = requestAnimationFrame(animateCarousel);
  }

  function startAnimation() {
    if (requestId) {
      cancelAnimationFrame(requestId);
    }
    requestId = requestAnimationFrame(animateCarousel);
  }

  window.addEventListener("resize", () => {
    const newImageWidth =
      allImages[0].offsetWidth +
      parseFloat(getComputedStyle(allImages[0]).marginRight);

    if (Math.abs(newImageWidth - imageWidth) > 1) {
      imageWidth = newImageWidth;
      offset = Math.round(offset / imageWidth) * imageWidth;
      track.style.transform = `translateX(${offset}px)`;
      startAnimation();
    }
  });

  startAnimation();
});

document.addEventListener("DOMContentLoaded", function () {
  ymaps.ready(initMap);
});

function initMap() {
  const map = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 10,
  });

  const placemark = new ymaps.Placemark([55.76, 37.64], {
    hintContent: "Москва",
  });

  map.geoObjects.add(placemark);
}
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZабвгдежзиклмнопрстуфхцчшщъыьэюя!?@#$%^&*()_+=-0123456789";

  function scrambleText(element, finalText, duration = 2, delay = 0) {
    element.innerHTML = "";

    let scrambled = "";
    let target = finalText;
    let interval = 50;
    let totalSteps = Math.floor((duration * 1000) / interval);
    let steps = [];

    for (let i = 0; i < target.length; i++) {
      let step =
        Math.floor(Math.random() * totalSteps * 0.5) + totalSteps * 0.5;
      steps.push(step);
    }

    let current = new Array(target.length).fill("");
    let index = 0;

    const span = document.createElement("span");
    element.appendChild(span);

    function updateChar(i) {
      let step = 0;
      const timer = setInterval(() => {
        if (step >= steps[i]) {
          clearInterval(timer);
          current[i] = target[i];
        } else {
          current[i] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        span.textContent = current.join("");
        step++;
      }, interval);
    }

    setTimeout(() => {
      for (let i = 0; i < target.length; i++) {
        setTimeout(() => updateChar(i), i * 30);
      }
    }, delay);
  }

  function glitchLine(el, text, index) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      delay: index * 0.5,
    });

    tl.call(() => {
      scrambleText(el, text, 1, 0);
    });
  }

  const elements = document.querySelectorAll(".here, .here2");

  elements.forEach((el, i) => {
    const originalText = el.textContent.trim();
    el.textContent = "";
    glitchLine(el, originalText, i);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZабвгдежзиклмнопрстуфхцчшщъыьэюя!?@#$%^&*()_+=-0123456789";

  function scrambleText(element, finalText, duration = 1, delay = 0) {
    element.innerHTML = "";

    let current = new Array(finalText.length).fill("");
    const span = document.createElement("span");
    element.appendChild(span);

    const interval = 50;
    const totalSteps = Math.floor((duration * 1000) / interval);
    const steps = finalText
      .split("")
      .map(
        () => Math.floor(Math.random() * totalSteps * 0.5) + totalSteps * 0.5
      );

    function updateChar(i) {
      let step = 0;
      const timer = setInterval(() => {
        if (step >= steps[i]) {
          clearInterval(timer);
          current[i] = finalText[i];
        } else {
          current[i] = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        span.textContent = current.join("");
        step++;
      }, interval);
    }

    setTimeout(() => {
      for (let i = 0; i < finalText.length; i++) {
        setTimeout(() => updateChar(i), i * 30);
      }
    }, delay);
  }

  function glitchLine(el, text, index) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      delay: index * 0.5,
    });

    tl.call(() => {
      scrambleText(el, text, 0.5, 0);
    });
  }

  const container = document.querySelector(".overlay-text");
  const container2 = document.querySelector(".textauthor2 .highlight2");
  const containerLines = document.querySelectorAll(".textauthor .highlight");

  if (containerLines.length > 0) {
    containerLines.forEach((el, i) => {
      const originalText = el.textContent.trim();
      if (originalText.length > 0) {
        el.textContent = "";
        glitchLine(el, originalText, i);
      }
    });
  }
  if (container2) {
    const originalText = container2.textContent.trim();
    container2.textContent = "";

    glitchLine(container2, originalText, 0);
  }
  if (container) {
    const elements = Array.from(container.children).filter(
      (el) => el.tagName === "P"
    );

    elements.forEach((el, i) => {
      const originalText = el.textContent.trim();
      if (originalText.length > 0) {
        el.textContent = "";
        glitchLine(el, originalText, i);
      }
    });
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".random-initi-container");

  if (!container) {
    console.warn("Контейнер .random-initi-container не найден");
    return;
  }

  // функция для создания одного .initi
  function createIniti() {
    const initi = document.createElement("div");
    initi.classList.add("initi");

    const img = document.createElement("img");
    img.src = "images/initi.svg";
    img.alt = "";
    initi.appendChild(img);

    const maxX = container.clientWidth - 50;
    const maxY = container.clientHeight - 50;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    initi.style.left = `${randomX}px`;
    initi.style.top = `${randomY}px`;

    container.appendChild(initi);

    setTimeout(() => {
      initi.remove();
    }, 1300);
  }

  function spawnManyIniti(count = 30, interval = 80) {
    let created = 0;
    const loop = setInterval(() => {
      createIniti();
      created++;

      if (created >= count) {
        clearInterval(loop);
      }
    }, interval);
  }

  setInterval(() => {
    const amount = Math.floor(Math.random() * 8) + 5;
    const speed = 80;
    spawnManyIniti(amount, speed);
  }, 1200);
});
document.addEventListener("DOMContentLoaded", function () {
  const sled = document.querySelector(".sled");
  const frog1Img = document.querySelector(".frog1 img");
  const frog2Img = document.querySelector(".frog2 img");
  const linkElement = document.querySelector(".silka1-link10");

  if (!sled || !frog1Img || !frog2Img || !linkElement) {
    console.warn("Один из элементов не найден");
    return;
  }

  // исход значения
  const original = {
    frog1Src: "images/frogg1.svg",
    frog2Src: "images/frog_2.svg",
    linkHref: "https://hootarru.github.io/multiABORIGLUB/",
  };

  // новые значения
  const updated = {
    frog1Src: "images/project2_op.svg",
    frog2Src: "images/project_2_op.svg",
    linkHref: "https://hootarru.github.io/ABO/",
  };

  let isToggled = false;

  sled.addEventListener("click", function () {
    if (!isToggled) {
      frog1Img.src = updated.frog1Src;
      frog2Img.src = updated.frog2Src;
      linkElement.href = updated.linkHref;
    } else {
      frog1Img.src = original.frog1Src;
      frog2Img.src = original.frog2Src;
      linkElement.href = original.linkHref;
    }

    frog1Img.style.opacity = "0";
    frog2Img.style.opacity = "0";

    setTimeout(() => {
      frog1Img.style.opacity = "1";
      frog2Img.style.opacity = "1";
    }, 300);

    isToggled = !isToggled;
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && localStorage.getItem("isLoggedIn") === "true") {
    showProfile(user);
  }

  window.showForm = function (type) {
    document.getElementById("authChoice").style.display = "none";
    document.getElementById("registerForm").style.display =
      type === "register" ? "flex" : "none";
    document.getElementById("loginForm").style.display =
      type === "login" ? "flex" : "none";
  };

  // регистрация с подсветкой полей
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const usernameInput = document.getElementById("regUsername");
      const emailInput = document.getElementById("regEmail");
      const passwordInput = document.getElementById("regPassword");

      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let isValid = true;

      [usernameInput, emailInput, passwordInput].forEach((input) => {
        input.classList.remove("input-success");
      });

      if (username.length >= 3) {
        usernameInput.classList.add("input-success");
      } else {
        isValid = false;
      }

      if (emailRegex.test(email)) {
        emailInput.classList.add("input-success");
      } else {
        isValid = false;
      }

      if (password.length >= 6) {
        passwordInput.classList.add("input-success");
      } else {
        isValid = false;
      }

      if (!isValid) {
        alert("Пожалуйста, исправьте ошибки в форме");
        return;
      }

      const user = {
        username,
        email,
        password: btoa(password),
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("isLoggedIn", "true");

      //  галочка
      const check = document.createElement("div");
      check.className = "success-check";
      check.innerHTML = "✔️";
      registerForm.appendChild(check);

      setTimeout(() => {
        check.classList.add("show");
      }, 10);

      setTimeout(() => {
        showProfile(user);
      }, 600);
    });
  }

  // вход
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value;
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (
        !storedUser ||
        storedUser.email !== email ||
        storedUser.password !== btoa(password)
      ) {
        alert("Неверный email или пароль");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");
      showProfile(storedUser);
    });
  }
});

window.showProfile = function (userData) {
  document.getElementById("authChoice").style.display = "none";
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("userData").style.display = "block";

  document.getElementById("userUsername").textContent = userData.username;
  document.getElementById("userEmail").textContent = userData.email;
};

window.logout = function () {
  localStorage.removeItem("isLoggedIn");
  location.reload();
};
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reviewForm");
  const reviewsList = document.getElementById("reviewsList");

  if (!form || !reviewsList) {
    console.warn("Форма или контейнер отзывов не найден на этой странице");
    return;
  }

  let reviews = JSON.parse(localStorage.getItem("aboriglub-reviews")) || [];

  function renderReviews() {
    reviewsList.innerHTML = "";
    reviews.forEach((review, index) => {
      const card = document.createElement("div");
      card.classList.add("review-card");
      card.innerHTML = `
        <h3>${review.name}</h3>
        <p>${review.text}</p>
      `;
      reviewsList.appendChild(card);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const reviewInput = document.getElementById("review");

    const name = nameInput.value.trim();
    const text = reviewInput.value.trim();

    if (name.length < 2 || text.length < 10) {
      alert("Пожалуйста, заполните все поля корректно.");
      return;
    }

    reviews.push({ name, text });

    localStorage.setItem("aboriglub-reviews", JSON.stringify(reviews));

    nameInput.value = "";
    reviewInput.value = "";

    renderReviews();
  });

  renderReviews();
});
function changeSeries(seriesNumber) {
  const gallery = document.querySelector(".poster-gallery");
  if (gallery) {
    gallery.dataset.series = seriesNumber;
  }
}
