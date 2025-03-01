// Main carousel
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const prevBtn = document.querySelector('.control-prev');
const nextBtn = document.querySelector('.control-next');
const indicatorContainer = document.querySelector('.indicator-container');
let index = 1;
let autoSlideInterval;

// Clone first and last slide for smooth infinite scroll
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

const allSlides = document.querySelectorAll('.carousel-slide');
track.style.transform = `translateX(-${index * 100}%)`;

// Create indicators dynamically
slides.forEach((_, i) => {
    const indicator = document.createElement('span');
    indicator.classList.add('indicator');
    if (i === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => {
        moveToSlide(i + 1);
        resetAutoSlide();
    });
    indicatorContainer.appendChild(indicator);
});

// Function to update active indicator
const updateIndicators = () => {
    const actualIndex = index === 0 ? slides.length - 1 : index === slides.length ? 0 : index - 1;
    document.querySelectorAll('.indicator').forEach((indicator, i) => {
        indicator.classList.toggle('active', i === actualIndex);
    });
};

// Function to move slides
const moveToSlide = (i) => {
    index = i;
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${index * 100}%)`;
    updateIndicators();
};

// Reset position when transitioning to clones
track.addEventListener("transitionend", () => {
    if (index === allSlides.length - 1) {
        track.style.transition = "none";
        index = 1;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
    if (index === 0) {
        track.style.transition = "none";
        index = slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    }
});

// Function to go to the next slide (smooth infinite loop)
const nextSlide = () => {
    if (index < allSlides.length - 1) {
        index++;
        moveToSlide(index);
    }
};

// Function to start auto-slide
const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
};

// Function to reset auto-slide when user interacts
const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    startAutoSlide();
};

// Event Listeners for Buttons
prevBtn.addEventListener('click', () => {
    if (index > 0) {
        index--;
        moveToSlide(index);
    }
    resetAutoSlide();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

// Start Auto Slide on Page Load
startAutoSlide();


//

document.addEventListener("DOMContentLoaded", function () {
    const showcaseContent = document.querySelector(".showcase-content");

    function revealOnScroll() {
        const sectionPos = showcaseContent.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos) {
            showcaseContent.classList.add("visible");
        }
    }

    window.addEventListener("scroll", revealOnScroll);
});


//CHAT BOX
document.addEventListener("DOMContentLoaded", function () {
    const chatButton = document.getElementById("chatButton");
    const chatContainer = document.getElementById("chatContainer");
    const closeChat = document.getElementById("closeChat");
    const chatBox = document.getElementById("chatBox");
    const messageInput = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");

    // Open chat box with animation
    chatButton.addEventListener("click", function () {
        chatContainer.classList.add("show");
        chatButton.style.display = "none";
    });

    // Close chat box smoothly
    closeChat.addEventListener("click", function () {
        chatContainer.classList.remove("show");
        setTimeout(() => {
            chatButton.style.display = "flex";
        }, 300);
    });

    // Send message and return to floating
    sendBtn.addEventListener("click", function () {
        sendMessage();
    });

    // Handle Enter key to send message
    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === "") return;

        // Create message bubble
        const messageBubble = document.createElement("div");
        messageBubble.classList.add("chat-message", "user-message");
        messageBubble.textContent = messageText;

        // Append to chat box
        chatBox.appendChild(messageBubble);
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear input
        messageInput.value = "";

        // Return to floating button after 3 seconds
        setTimeout(() => {
            chatContainer.classList.remove("show");
            setTimeout(() => {
                chatButton.style.display = "flex";
            }, 300);
        }, 3000);
    }
});

