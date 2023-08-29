// Check if there is local storage color option
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  //Remove active class from cheldrin
  document.querySelectorAll(".color-list li").forEach((element) => {
    element.classList.remove("active");

    // Add active class on element with data color === local storage item
    if (element.dataset.color === mainColor) {
      // Add active class
      element.classList.add("active");
    }
  });
}

// Random Background option
let backgroubdOption = true;

// Variable to control the background interVal
let backgroundInterval;

// Check if there's local background item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if random background image is not empty

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroubdOption = true;
  } else {
    backgroubdOption = false;
  }

  console.log(backgroundLocalItem);

  // Remove active class from all spans
  document.querySelectorAll(".random-background span").forEach((el) => {
    el.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

// Toggle Spin Class On Icon
let toggleclass = document.querySelector(".toggle-setting .fa-gear");

toggleclass.onclick = function () {
  // Toggle Class Fa-Spin For Rotation On Self
  this.classList.toggle("fa-spin");

  //   Toggle Class Open Main Setting Box
  document.querySelector(".setting-box").classList.toggle("open");
};

//Switch Colors

const colorsLi = document.querySelectorAll(".color-list li");

// Loop on all list item
colorsLi.forEach((el) => {
  el.addEventListener("click", (e) => {
    // Click in every list item

    //Set color on Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    //Remove all class active from children
    handleActive(e);
  });
});

//Switch random backgroubd spans
const randomBackEl = document.querySelectorAll(".random-background span");

// Loop on all spans
randomBackEl.forEach((el) => {
  el.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroubdOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroubdOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element

let LandingPage = document.querySelector(".landing-page");

// Get Array Of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function to randomize imgs
function randomizeImgs() {
  if (backgroubdOption === true) {
    backgroundInterval = setInterval(() => {
      let randomImgs = Math.floor(Math.random() * imgsArray.length);
      LandingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomImgs] + '")';
    }, 10000);
  } else {
    clearInterval(backgroundInterval);
  }
}

randomizeImgs();

// Select Skills selctors

let ourskills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills offset top

  let skillsOffsetTop = ourskills.offsetTop;

  // Skills outer hieght
  let skillsOuterHeight = ourskills.offsetHeight;

  //  Window height
  let windowHeight = this.innerHeight;

  // Window scroll top
  let windowScrollTop = this.pageYOffset;

  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowHeight - 100
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

//

let ourGallery = document.querySelectorAll(".gallery  img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");

    overlay.className = "popup-overlay";

    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");

    popupBox.className = "popup-box";

    if (img.alt !== null) {
      let popupHeading = document.createElement("h3");

      let popupHeadingText = document.createTextNode(img.alt);
      popupHeadingText.className = "popup-text";

      popupHeading.appendChild(popupHeadingText);

      popupBox.appendChild(popupHeading);
    }

    let popupImg = document.createElement("img");

    popupImg.src = img.src;

    popupBox.appendChild(popupImg);

    document.body.appendChild(popupBox);

    let removePopup = document.createElement("span");

    let removePopupText = document.createTextNode("X");

    removePopup.appendChild(removePopupText);

    removePopup.className = "remove-popup";

    popupBox.appendChild(removePopup);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "remove-popup") {
    e.target.parentElement.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

// Select all bullets

let allBullets = document.querySelectorAll(".bullet");

// Select all bullets
let allLinks = document.querySelectorAll(".links a");

// Function runs the scroll on the bullets and the links
function scrollToTarget(element) {
  element.forEach((elm) => {
    elm.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToTarget(allBullets);
scrollToTarget(allLinks);

// Funxtion handle active classes

function handleActive(ev) {
  //Remove all class active from children
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add active on target
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});

// Clear all loclastorage

document.querySelector(".reset-option").onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  window.location.reload();
};

// Show Links on Small Screen

let toggleMenu = document.querySelector(".header-area .toggle-menu");
let links = document.querySelector(".links");
// console.log(toggleMenu);

toggleMenu.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");

  links.classList.toggle("open");
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== links) {
    if (links.classList.contains("open")) {
      toggleMenu.classList.toggle("menu-active");
      links.classList.toggle("open");
    }
  }
});

links.onclick = function (e) {
  e.stopPropagation();
};
// addited
