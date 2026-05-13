// ============================================
// AUDIO DEMO PLAYER
// ============================================

// Map demo button identifiers to MP3 file names
const audioFiles = {
  'aires-navidad': 'demo_aires_navidad.mp3',
  'aurora': 'demo_aurora.mp3',
  'baile-inolvidable': 'demo_baile_inolvidable.mp3',
  'brujeria': 'demo_brujeria.mp3',
  'disney-medley': 'demo_disney_medley.mp3',
  'el-topon': 'demo_el_topon.mp3',
  'emborrachame': 'demo_emborrachame.mp3',
  'entertainment-act': 'demo_entertainment_act.mp3',
  'eres': 'demo_eres.mp3',
  'huapango': 'demo_huapango.mp3',
  'kimetsu': 'demo_kimetsu.mp3',
  'lavoe-blades': 'demo_lavoe_blades.mp3',
  'mi-panama': 'demo_mi_panama.mp3',
  'ojitos-lindos': 'demo_ojitos_lindos.mp3',
  'outer-wilds': 'demo_outer_wilds.mp3',
  'plastic-love': 'demo_plastic_love.mp3',
  'princess-diaries': 'demo_princess_diaries.mp3',
  'snowman': 'demo_snowman.mp3',
  'willie-colon': 'demo_willie_colon.mp3'
};

let currentAudio = null;
let currentButton = null;

document.addEventListener('DOMContentLoaded', function() {
  // Find all demo buttons
  const demoButtons = document.querySelectorAll('.demo-btn');
  
  demoButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the track identifier from data attribute or button text
      const trackId = this.getAttribute('data-track') || 
                     this.closest('.arr-card').getAttribute('data-track') ||
                     this.textContent.toLowerCase().trim();
      
      // Check if we need to stop current audio
      if (currentAudio && currentButton !== this) {
        stopAudio();
      }
      
      // Toggle play/pause
      if (currentButton === this && currentAudio) {
        toggleAudio();
      } else {
        playAudio(this, trackId);
      }
    });
  });
  
  // Stop audio when it ends
  document.addEventListener('ended', function(e) {
    if (e.target === currentAudio) {
      stopAudio();
    }
  }, true);
});

function playAudio(button, trackId) {
  const audioFile = audioFiles[trackId];
  
  if (!audioFile) {
    console.warn('Audio file not found for track:', trackId);
    return;
  }
  
  // Create audio element if needed
  if (!currentAudio) {
    currentAudio = new Audio();
  }
  
  // Set source and play
  currentAudio.src = audioFile;
  currentAudio.play().catch(err => {
    console.error('Error playing audio:', err);
  });
  
  // Update UI
  currentButton = button;
  button.classList.add('playing');
  
  // Show demo bar
  const demoBar = button.nextElementSibling;
  if (demoBar && demoBar.classList.contains('demo-bar')) {
    demoBar.classList.add('active');
    const audio = demoBar.querySelector('audio');
    if (audio) {
      audio.src = audioFile;
      audio.play();
    }
  }
}

function toggleAudio() {
  if (currentAudio.paused) {
    currentAudio.play();
    currentButton.classList.add('playing');
  } else {
    currentAudio.pause();
    currentButton.classList.remove('playing');
  }
}

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  
  if (currentButton) {
    currentButton.classList.remove('playing');
    const demoBar = currentButton.nextElementSibling;
    if (demoBar && demoBar.classList.contains('demo-bar')) {
      demoBar.classList.remove('active');
      const audio = demoBar.querySelector('audio');
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }
  
  currentAudio = null;
  currentButton = null;
}

// ============================================
// FADE-IN ON SCROLL
// ============================================

function observeElements() {
  const elements = document.querySelectorAll('.fi');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });
  
  elements.forEach(el => observer.observe(el));
}

// ============================================
// NAV SCROLL EFFECT
// ============================================

function handleNavScroll() {
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

function setupMobileMenu() {
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  
  if (burger) {
    burger.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
    
    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

// ============================================
// INITIALIZE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  observeElements();
  handleNavScroll();
  setupMobileMenu();
});
