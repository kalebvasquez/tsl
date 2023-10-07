const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');
let scrollStarted = false;

btn.addEventListener('click', navToggle);
document.addEventListener('scroll', scrollPage);

function navToggle() {
  btn.classList.toggle('open');
  overlay.classList.toggle('overlay-show');
  document.body.classList.toggle('stop-scrolling');
  menu.classList.toggle('show-menu');
}

function scrollPage() {
  const scrollPos = window.scrollY;

  if (scrollPos > 100 && !scrollStarted) {
    countUp();
    scrollStarted = true;
  } else if (scrollPos < 100 && scrollStarted) {
    reset();
    scrollStarted = false;
  }
}

function countUp() {
  counters.forEach((counter) => {
    counter.innerText = '0';

    const updateCounter = () => {
      // Get count target
      const target = +counter.getAttribute('data-target');
      // Get current counter value
      const c = +counter.innerText;

      // Create an increment
      const increment = target / 100;

      // If counter is less than target, add increment
      if (c < target) {
        // Round up and set counter value
        counter.innerText = `${Math.ceil(c + increment)}`;

        setTimeout(updateCounter, 75);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

function reset() {
  counters.forEach((counter) => (counter.innerHTML = '0'));
}

let lastScrollTop = 0;
let header = document.querySelector('.main-header');
let sectionA = document.querySelector('.section-a');

window.addEventListener('scroll', function() {
  let st = window.pageYOffset || document.documentElement.scrollTop;
  let halfway = sectionA.clientHeight / 2;

  if (st > lastScrollTop) { // Scrolling Down
      if (st > halfway) {
          header.style.opacity = "0";
      } else {
          header.style.opacity = "1";
      }
  } else { // Scrolling Up
      header.style.opacity = "1";
      if (st <= halfway) {
          header.classList.remove('black-background');
      } else {
          header.classList.add('black-background');
      }
  }

  lastScrollTop = st <= 0 ? 0 : st; // For negative scrolling
}, false);

document.addEventListener('click', function(event) {
  // Check if the click was outside both the hamburger menu and the button
  if (!menu.contains(event.target) && !btn.contains(event.target)) {
      // Close the menu
      if(menu.classList.contains('show-menu')) {
          navToggle();  // This calls your existing navToggle function to close the menu
      }
  }
});