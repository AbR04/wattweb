function setSunlightHours() {
    const countryHours = document.getElementById("country").value;
    if (countryHours) {
      document.getElementById("sunlight").value = countryHours;
    }
  }
  
  function calculateSavings() {
    const sunlightHours = parseFloat(document.getElementById("sunlight").value);
    const roofArea = parseFloat(document.getElementById("roof").value);
    const result = document.getElementById("result");
    const energyBar = document.getElementById("energy-bar");
  
    if (isNaN(sunlightHours) || isNaN(roofArea) || sunlightHours <= 0 || roofArea <= 0) {
      result.textContent = "⚠️ Please enter valid positive numbers.";
      energyBar.style.width = "0%";
      return;
    }
  
    const panelEfficiency = 0.15; // kW per m²
    const estimatedEnergy = (roofArea * panelEfficiency * sunlightHours * 365).toFixed(2);
  
    // Animate energy bar (simulate % max of 10,000 kWh)
    const energyPercent = Math.min((estimatedEnergy / 10000) * 100, 100);
    energyBar.style.width = `${energyPercent}%`;
  
    // Animate result counter
    animateCounter(0, estimatedEnergy, 1000, (val) => {
      result.textContent = `Estimated annual energy: ${val} kWh ⚡️`;
    });

    const treeText = document.getElementById("treeCount");
    const treesSaved = Math.floor(estimatedEnergy / 400); // ~400 kWh saves a tree/year

    animateCounter(0, treesSaved, 800, (val) => {
        treeText.textContent = `You've saved approximately ${val} trees 🌳`;
    });

  }
  
  // Animate number counter
  function animateCounter(start, end, duration, callback) {
    const range = end - start;
    let current = start;
    const increment = range / (duration / 30);
  
    function update() {
      current += increment;
      if (current >= end) {
        current = end;
        callback(Number(end).toLocaleString());
      } else {
        callback(Number(current).toFixed(0));
        requestAnimationFrame(update);
      }
    }
  
    update();
  }  
  
  
  function submitForm(event) {
    event.preventDefault();
    alert("Thanks for joining the cause! We'll be in touch 🌍");
  }

  const facts = [
    "Solar panels can work even on cloudy days!",
    "Wind power is one of the fastest-growing energy sources in the world.",
    "Hydropower is the oldest renewable energy source, used since ancient times.",
    "A single wind turbine can power over 1,500 homes per year!",
    "Geothermal energy uses Earth's internal heat to produce electricity sustainably.",
    "Recycling one aluminum can saves enough energy to power a TV for 3 hours!"
  ];
  
  function generateFact() {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById("funFact").textContent = randomFact;
  }
  
  const heroMessages = [
    "Powering Tomorrow with Clean Energy",
    "Be the Change. Go Green.",
    "The Future is Renewable.",
    "Bright Ideas for a Greener Planet"
  ];
  
  let currentMessage = 0;
  let currentChar = 0;
  
  function typeText() {
    const text = heroMessages[currentMessage];
    document.getElementById("typingText").textContent = text.slice(0, currentChar++);
    
    if (currentChar <= text.length) {
      setTimeout(typeText, 80);
    } else {
      setTimeout(() => {
        currentChar = 0;
        currentMessage = (currentMessage + 1) % heroMessages.length;
        typeText();
      }, 2000);
    }
  }
  
  window.onload = typeText;
  
  const tips = [
    "Turn off lights when you leave a room.",
    "Use reusable shopping bags 🛍️",
    "Bike or walk short distances 🚲",
    "Take shorter showers 🚿",
    "Unplug chargers when not in use 🔌",
    "Compost food scraps 🌱",
    "Plant a tree 🌳",
    "Use a refillable water bottle 💧"
  ];
  
  function spinTip() {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    const tipResult = document.getElementById("tipResult");
    tipResult.style.opacity = 0;
    setTimeout(() => {
      tipResult.textContent = randomTip;
      tipResult.style.opacity = 1;
    }, 300);
  }

  function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById("themeIcon");
    
    body.classList.toggle("dark-mode");
  
    // Animate icon change
    icon.classList.add("animate");
  
    // Swap icon
    if (body.classList.contains("dark-mode")) {
      icon.textContent = "🌙";
    } else {
      icon.textContent = "🌞";
    }
  
    // Remove animation class after it plays
    setTimeout(() => icon.classList.remove("animate"), 500);
  
    // Optional: Store theme in localStorage
    localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");

        // Add flash effect class
    body.classList.add("theme-transition");
    setTimeout(() => {
    body.classList.remove("theme-transition");
    }, 600);

  }
  
  // On page load, restore saved theme
  window.onload = () => {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      document.getElementById("themeIcon").textContent = "🌙";
    }
    setupGame();     // memory game
    typeText();      // typing animation
  };
  
  
  const icons = ['☀️','💧','💨','🌱','🌍','⚡'];
let memoryIcons = [...icons, ...icons]; // two of each
let flippedCards = [];
let matched = 0;

function setupGame() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";
  matched = 0;
  memoryIcons = shuffleArray(memoryIcons);
  memoryIcons.forEach((icon, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.dataset.index = index;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length === 2) return;
  this.textContent = this.dataset.icon;
  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    const [card1, card2] = flippedCards;
    if (card1.dataset.icon === card2.dataset.icon) {
      matched += 2;
      flippedCards = [];
      if (matched === memoryIcons.length) {
        document.getElementById("gameStatus").textContent = "You matched them all! 🌟";
        playSound('win');
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
        flippedCards = [];
      }, 800);
    }
  }
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

window.onload = () => {
  setupGame();
  typeText(); // Re-init typing animation
};

// Play subtle click sound
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => playSound('click'));
  });
  
  function playSound(type) {
    const sound = document.getElementById(type === 'click' ? 'clickSound' : 'winSound');
    sound.currentTime = 0;
    sound.play();
  }
  