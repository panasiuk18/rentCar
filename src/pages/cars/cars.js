import "../../utils/addHeader.js";
import "../../utils/auth.js";
import "../../styles/cars.css";
import "../../styles/footer.css";
import "../../styles/home.css";

document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const videoButton = document.querySelector(".video-btn");

  if (!video || !videoButton) {
    console.error("Video or Video Button not found!");
    return;
  }

  let isPlay = false;

  const handleVideo = ({ target }) => {
    const info = target.parentElement;

    isPlay = !isPlay;
    info.classList.toggle("hidden", isPlay);
    target.innerText = isPlay ? "Pause" : "Play";
    isPlay ? video.play() : video.pause();
  };

  videoButton.addEventListener("click", handleVideo);
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const arrowBtns = document.querySelectorAll(".wrapper i");
  const wrapper = document.querySelector(".wrapper");

  const firstCard = carousel.querySelector(".card");
  const firstCardWidth = firstCard.offsetWidth;

  let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;

    const newScrollLeft = startScrollLeft - (e.pageX - startX);

    if (
      newScrollLeft <= 0 ||
      newScrollLeft >= carousel.scrollWidth - carousel.offsetWidth
    ) {
      isDragging = false;
      return;
    }
    carousel.scrollLeft = newScrollLeft;
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const autoPlay = () => {
    if (window.innerWidth < 800) return;
    const totalCardWidth = carousel.scrollWidth;
    const maxScrollLeft = totalCardWidth - carousel.offsetWidth;
    if (carousel.scrollLeft >= maxScrollLeft) return;
    timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
  };

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft +=
        btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
  });
});
