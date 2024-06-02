// necessary DOM elements &&  Set constants and initial values

const modal = document.getElementById("myModal");
const contactUsBtn = document.getElementById("contactUsBtn");
const email = document.querySelector(".email");
const firstName = document.querySelector(".Firstname");
const lastName = document.querySelector(".Lastname");
const iagree = document.querySelector(".iagree");
const form = document.getElementById("form");
const slider = document.querySelector(".slider");
const images = slider.querySelectorAll("img");
const dots = document.querySelectorAll(".dot");
const activeCard = document.querySelectorAll(".projectcard");
let projectImg = document.getElementById("projectImg");

const imagess = images.length - 6;

const activeDotSrc = "./assets/active-dot.png";
const inactiveDotSrc = "./assets/unactive dot.png";

let currentIndex = 0;
const imageWidth = 370;
const isPortrait = window.innerHeight > window.innerWidth;
console.log(isPortrait, window.innerHeight, window.innerWidth);

// Get image sources for different slides
const img1 = document.getElementById("img1").src;
const img2 = document.getElementById("img2").src;
const img3 = document.getElementById("img3").src;
// to remove automatic sliding
let autoSlideInterval = null;

let popUP = false

// Show modal on button click
contactUsBtn.addEventListener("click", () => {
  modal.style.display = "block";
  setTimeout(() => {
    popUP = true
    console.log(popUP)
  }, );

});
console.log(modal.style.display === "block")


// if clicked outsite of the pop-up then it will be disappeared

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData();
  formData.append("email", email.value);
  formData.append("firstName", firstName.value);
  formData.append("lastName", lastName.value);
  formData.append("iagree", iagree.value);

  fetch("https://getform.io/f/raeqdgqa", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      form.reset();
      modal.style.display = "none";
    })
    .catch((error) => console.error("Error:", error));
});

console.log(img2, img1, img3);

// Update dot indicators
const updateDots = () => {
  dots.forEach((el, index) => {
    el.src = currentIndex === index ? activeDotSrc : inactiveDotSrc;

    el.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      currentIndex = index;
      if (isPortrait) {
        images.forEach((img) => {
          if (currentIndex === 1) {
            img.src = img2;
          } else if (currentIndex === 2) {
            img.src = img3;
          } else {
            img.src = img1;
          }
        });
      } else {
        slider.style.transition = "transform 0.5s ease-in-out";
        slider.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
      }
      updateDots();
    });
  });
};

// Initialize dot indicators
updateDots();

// Set up automatic sliding if not in portrait mode
if (!isPortrait) {
  autoSlideInterval = setInterval(nextImg, 3000);
}

// Function to handle next image in slider
function nextImg() {
  if (currentIndex === imagess - 1) {
    currentIndex = 0;
    console.log(currentIndex, imagess - 1);
    slider.style.transform = `translateX(0)`;
    updateDots();
  } else {
    currentIndex++;
    slider.style.transition = "transform 0.5s ease-in-out";
    slider.style.transform = `translateX(-${imageWidth * currentIndex}px)`;
    console.log(currentIndex, imagess - 1);
    updateDots();
  }
}

//initially setting the 2nd div to active
activeCard[1].style.backgroundColor = "#FF3147";

// Handle project card click events
activeCard.forEach((el, index) => {
  el.addEventListener("click", () => {
    console.log("done", [index], activeCard[index]);

    if (index === 0) {
      projectImg.src =
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=770&h=567&fit=crop";
      activeCard[0].style.backgroundColor = "#FF3147";
      activeCard[1].style.backgroundColor = "#F6F6F6";
      activeCard[2].style.backgroundColor = "#F6F6F6";
    } else if (index === 1) {
      projectImg.src =
        " projectImg.src =
        "./assets/lastbigimg.png";";
      activeCard[1].style.backgroundColor = "#FF3147";
      activeCard[0].style.backgroundColor = "#F6F6F6";
      activeCard[2].style.backgroundColor = "#F6F6F6";
    } else {
      activeCard[2].style.backgroundColor = "#FF3147";
      activeCard[0].style.backgroundColor = "#F6F6F6";
      activeCard[1].style.backgroundColor = "#F6F6F6";
      projectImg.src =
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=770&h=567&fit=crop";
    }
  });
});

// Adjust image width in portrait mode
if (isPortrait) {
  console.log(isPortrait);
  projectImg.style.width = "380px";
}

// Log the project image width
console.log(projectImg.style.width);
window.onclick = function (event) {
    if (popUP) {
        modal.style.display = "none";
        popUP = false
      }
}
  console.log(modal.style.display === "block")

  
