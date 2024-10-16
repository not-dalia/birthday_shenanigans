// Constants
const CONFETTI_COLORS = ['#f2d74e', '#95c3de', '#25f348', '#ff9a91', '#ff60cf'];
const BIRTHDAY_MESSAGES = [
    "<span>It's your birthday.</span><span>I'm ecstatic.</span>",
    "<span>Birthday acknowledged.</span><span>Celebrate efficiently.</span>",
    "<span>You've aged.</span><span>Well done.</span>",
    "<span>Today you're older.</span><span>Fascinating.</span>",
    "<span>One year older.</span><span>Good work.</span>",
    "<span>It's your birthday.</span><span>I'm expressing joy.</span>",
    "<span>Your age has incremented.</span><span>Noted.</span>",
    "<span>Today marks your birth.</span><span>Proceed as normal.</span>",
    "<span>Congratulations, David.</span><span>You've survived another year.</span>",
    "<span>Your birth anniversary</span><span>has been duly recognized.</span>",
    "<span>Happy Birthday.</span><span>That's an order.</span>"
];
const HOLT_IMAGES = ['holt1', 'holt2', 'holt3', 'holt4', 'holt5', 'holt6'];

// State variables
let wasFullscreenAttempted = false;
let wasManuallyPaused = false;
let videoPlayTimeout;

// DOM Elements
const cardElement = document.querySelector('.card');
const birthdayContent = document.getElementById('birthdayContent');
const initialContent = document.getElementById('initialContent');
const birthdayMessage = document.getElementById('birthdayMessage');
const holtImage = document.getElementById('holtImage');
const birthdayAudio = document.getElementById('birthdayAudio');
const birthdayVideo = document.getElementById('birthdayVideo');
const confettiContainer = document.getElementById('confettiContainer');

// Functions
function toggleCard() {
    const isFaceDown = cardElement.classList.contains('is-flipped');
    if (isFaceDown) {
        clearTimeout(videoPlayTimeout);
        loadBirthdayContent();
        birthdayVideo.pause();
    } else {
        birthdayAudio.pause();
        if (!wasFullscreenAttempted) {
            videoPlayTimeout = setTimeout(() => {
                wasFullscreenAttempted = true;
                birthdayVideo.requestFullscreen();
                birthdayVideo.play();
            }, 700);
        } else if (!wasManuallyPaused) {
            birthdayVideo.play();
        }
    }
    cardElement.classList.toggle('is-flipped');
}

function startExperience() {
    loadBirthdayContent();
    initialContent.classList.add('hide');
    setTimeout(() => {
        initialContent.style.display = 'none';
        birthdayContent.style.display = 'block';
        setTimeout(() => {
            birthdayContent.style.transform = 'translateY(0)';
            birthdayContent.style.opacity = 1;
        }, 300);
        birthdayAudio.play();
        createConfetti();
        resizeText();
    }, 300);
}

function createConfetti() {
    for (let i = 0; i < 25; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        confetti.style.backgroundColor = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        confettiContainer.appendChild(confetti);
    }
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function loadBirthdayContent() {
    birthdayMessage.innerHTML = getRandomItem(BIRTHDAY_MESSAGES);
    holtImage.src = `/holt/${getRandomItem(HOLT_IMAGES)}.png`;
    resizeText();
}

function resizeText() {
    const containerWidth = birthdayMessage.clientWidth;
    const textWrappers = birthdayMessage.querySelectorAll('span');
    textWrappers.forEach(textWrapper => {
        let fontSize = 70;
        textWrapper.style.fontSize = `${fontSize}px`;
        while (textWrapper.offsetWidth > containerWidth * 0.9 && fontSize > 10) {
            fontSize -= 1;
            textWrapper.style.fontSize = `${fontSize}px`;
        }
    });
}

// Event Listeners
window.addEventListener('load', resizeText);
window.addEventListener('resize', resizeText);

birthdayVideo.addEventListener('click', (e) => {
    e.stopPropagation();
    if (wasManuallyPaused) {
        birthdayVideo.play();
        wasManuallyPaused = false;
    } else {
        birthdayVideo.pause();
        wasManuallyPaused = true;
    }
});

birthdayVideo.addEventListener('ended', () => {
    wasManuallyPaused = true;
});

// Initialize
document.querySelector('button').addEventListener('click', startExperience);
cardElement.addEventListener('click', toggleCard);
