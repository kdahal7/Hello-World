// Text options with emojis for more fun
let textIndex = 0;
const textOptions = [
    "Hello, World! 👋",
    "Welcome to my app! 🎉",
    "JavaScript is awesome! ⭐",
    "Click me again! 🖱️",
    "Having fun yet? 😄",
    "This is interactive! 🎮",
    "Colors everywhere! 🌈",
    "I love dancing! 💃",
    "Keep clicking! 🔥",
    "Back to the beginning... 🔄"
];

// Color themes for different interactions
const colorThemes = [
    ['#ff6b6b', '#4ecdc4'],
    ['#a8e6cf', '#dcedc8'],
    ['#ffd93d', '#6bcf7f'],
    ['#ff8a65', '#81c784'],
    ['#ba68c8', '#64b5f6'],
    ['#ffb74d', '#4db6ac']
];

let currentTheme = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('changeTextBtn');
    const textDisplay = document.getElementById('textDisplay');
    
    // Add event listener to button
    button.addEventListener('click', changeText);
    
    // Add smooth transition effect to text
    textDisplay.style.transition = 'all 0.3s ease-in-out';
    
    // Start particle system
    startParticleSystem();
    
    // Add random color changes to the character
    setInterval(changeCharacterColors, 5000);
});

function changeText() {
    textIndex = (textIndex + 1) % textOptions.length;
    const textDisplay = document.getElementById('textDisplay');
    const animatedMan = document.getElementById('animatedMan');
    
    // Update text with fade effect
    textDisplay.style.opacity = '0';
    setTimeout(() => {
        textDisplay.textContent = textOptions[textIndex];
        textDisplay.style.opacity = '1';
    }, 150);
    
    // Make the animated man jump and get excited
    animatedMan.classList.add('jump', 'excited');
    
    // Create particle burst effect
    createParticleBurst();
    
    // Change button colors
    changeButtonColors();
    
    // Remove animation classes after completion
    setTimeout(() => {
        animatedMan.classList.remove('jump', 'excited');
    }, 800);
    
    // Add screen shake effect
    addScreenShake();
    
    // Play sound effect (optional - browser may block)
    playClickSound();
}

function createParticleBurst() {
    const particlesContainer = document.getElementById('particles');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#a8e6cf', '#ba68c8', '#ffb74d'];
    
    // Create multiple particles
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 0.3 + 's';
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

function changeButtonColors() {
    const button = document.getElementById('changeTextBtn');
    currentTheme = (currentTheme + 1) % colorThemes.length;
    const [color1, color2] = colorThemes[currentTheme];
    
    button.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
    
    // Reset to original after 2 seconds
    setTimeout(() => {
        button.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
    }, 2000);
}

function changeCharacterColors() {
    const man = document.getElementById('animatedMan');
    const randomColors = colorThemes[Math.floor(Math.random() * colorThemes.length)];
    
    // Change shirt color randomly
    const shirt = man.querySelector('.shirt');
    if (shirt) {
        shirt.style.background = `linear-gradient(45deg, ${randomColors[0]}, ${randomColors[1]})`;
    }
    
    // Change eye colors randomly
    const leftEye = man.querySelector('.left-eye');
    const rightEye = man.querySelector('.right-eye');
    if (leftEye && rightEye) {
        leftEye.style.background = `radial-gradient(circle, ${randomColors[0]}, ${randomColors[1]})`;
        rightEye.style.background = `radial-gradient(circle, ${randomColors[1]}, ${randomColors[0]})`;
    }
}

function addScreenShake() {
    const container = document.querySelector('.container');
    container.style.animation = 'shake 0.5s ease-in-out';
    
    setTimeout(() => {
        container.style.animation = '';
    }, 500);
}

function startParticleSystem() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every interval
            createFloatingParticle();
        }
    }, 1000);
}

function createFloatingParticle() {
    const particlesContainer = document.getElementById('particles');
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#a8e6cf'];
    
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.animation = 'particleFloat 3s linear forwards';
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

function playClickSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Audio might be blocked by browser, ignore silently
    }
}

// Add CSS for shake animation
const shakeCSS = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}
`;

// Inject shake CSS
const style = document.createElement('style');
style.textContent = shakeCSS;
document.head.appendChild(style);

// Add keyboard support
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        changeText();
    }
});

// Add mouse hover effects
document.getElementById('changeTextBtn').addEventListener('mouseenter', function() {
    const man = document.getElementById('animatedMan');
    man.style.transform = 'scale(1.05)';
    man.style.transition = 'transform 0.3s ease';
});

document.getElementById('changeTextBtn').addEventListener('mouseleave', function() {
    const man = document.getElementById('animatedMan');
    man.style.transform = 'scale(1)';
});

// Add touch support for mobile
document.getElementById('changeTextBtn').addEventListener('touchstart', function(e) {
    e.preventDefault();
    this.style.transform = 'scale(0.95)';
});

document.getElementById('changeTextBtn').addEventListener('touchend', function(e) {
    e.preventDefault();
    this.style.transform = 'scale(1)';
    changeText();
});