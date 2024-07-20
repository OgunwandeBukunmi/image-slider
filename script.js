const carousel = document.querySelector(".carousel");
const firstimg = document.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");
let isDragStart = false,
  prevPageX,
  prevScrollLeft;

let firstImgWidth = firstimg.clientWidth + 14;
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

function showIcons() {
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showIcons(), 60);
  });
});
function dragging(e) {
  if (!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  let postitionDiff = e.pageX - prevPageX;
  carousel.scrollLeft = prevScrollLeft - postitionDiff;
  showIcons();
}

function dragStart(e) {
  e.preventDefault();
  isDragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = carousel.scrollLeft;
}
function dragEnd() {
  isDragStart = false;
  carousel.classList.remove("dragging");
}
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragEnd);
carousel.addEventListener("mouseleave", dragEnd);
