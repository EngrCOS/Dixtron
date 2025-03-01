

// carousel

const carousel = document.querySelector(".carousel-container");
const indicatorsContainer = document.querySelector(".indicators");
const images = document.querySelectorAll(".carousel img");
let isDragging = false, startX, scrollLeft;

// Adjust image size
images.forEach(img => {
    img.style.height = "200px"; // Making images very big
});

carousel.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = "grabbing";
});

carousel.addEventListener("mouseleave", () => {
    isDragging = false;
    carousel.style.cursor = "grab";
});

carousel.addEventListener("mouseup", () => {
    isDragging = false;
    carousel.style.cursor = "grab";
});

carousel.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scrolling speed
    carousel.scrollLeft = scrollLeft - walk;
    updateIndicators();
});

// Update indicators dynamically based on scroll position
function updateIndicators() {
    indicatorsContainer.innerHTML = "";
    const totalScrollWidth = carousel.scrollWidth - carousel.clientWidth;
    const scrollPercentage = carousel.scrollLeft / totalScrollWidth;
    const totalImages = images.length;
    const activeIndex = Math.round(scrollPercentage * (totalImages - 1));

    for (let i = 0; i < totalImages; i++) {
        const indicator = document.createElement("span");
        indicator.classList.add("indicator");
        if (i === activeIndex) indicator.classList.add("active");
        indicatorsContainer.appendChild(indicator);
    }
}

carousel.addEventListener("scroll", updateIndicators);
updateIndicators();






