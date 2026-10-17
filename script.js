// Sound Synth Engine
let audioEnabled = true;
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;

// Standard Pop Sound for Buttons
function playPopSound(freq = 600) {
    if (!audioEnabled) return;
    try {
        if (!audioCtx) audioCtx = new AudioCtx();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    } catch (e) {
        console.log("Audio waiting for user interaction");
    }
}

// REALISTIC PIANO SYNTH FOR EDUCATION BOXES
function playPianoNote(freq = 261.63) { 
    if (!audioEnabled) return;
    try {
        if (!audioCtx) audioCtx = new AudioCtx();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
        console.log("Audio waiting for gesture");
    }
}

// Piano Keys Frequencies (C4, E4, G4 chord pitch)
const pianoNotes = [261.63, 329.63, 392.00];

// Attach Piano Sound Events to Education Boxes
const eduBoxes = document.querySelectorAll('.timeline-content');
eduBoxes.forEach((box, index) => {
    box.style.cursor = 'pointer';
    
    box.addEventListener('click', () => {
        const noteFreq = pianoNotes[index % pianoNotes.length];
        playPianoNote(noteFreq);

        box.style.transform = 'scale(0.98)';
        setTimeout(() => {
            box.style.transform = '';
        }, 120);
    });

    box.addEventListener('mouseenter', () => {
        const noteFreq = pianoNotes[index % pianoNotes.length];
        playPianoNote(noteFreq);
    });
});

// Sound Toggle Switch
const soundBtn = document.getElementById('sound-toggle-btn');
if (soundBtn) {
    soundBtn.addEventListener('click', () => {
        audioEnabled = !audioEnabled;
        soundBtn.innerHTML = audioEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
        soundBtn.style.color = audioEnabled ? '#38bdf8' : '#94a3b8';
    });
}

// Sound Click Listeners
document.querySelectorAll('.sound-click').forEach(element => {
    element.addEventListener('click', () => playPopSound(650));
});

// Theme Switcher
const themeBtn = document.getElementById('theme-toggle-btn');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
}

// 3D Tilt Card Effect
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -7;
        const rotateY = ((x - centerX) / centerX) * 7;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
});

// Interactive Shell Terminal
const termInput = document.getElementById('terminal-input');
const termBody = document.getElementById('terminal-body');

const commands = {
    help: "Available commands: <span class='highlight-cmd'>help, skills, projects, contact, clear, theme, sudo</span>",
    skills: " Frontend: React, JS, HTML, CSS | Backend: Node, Express, MongoDB, SQLite | Logic: Python",
    projects: "📂 Projects: Myntra Clone, Maa Baglamukhi, MOBMAX, Weather App, Python Log Pipeline",
    contact: "📧 Email: tanishthathera@gmail.com | 📞 Phone: +91-9636870216",
    clear: "CLEAR_TERMINAL",
    sudo: "Nice try!  You already have admin privileges here."
};

// Realistic Keyboard Mechanical Click Sound Generator
function playKeyClickSound() {
    if (!audioEnabled) return;
    try {
        if (!audioCtx) audioCtx = new AudioCtx();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(1200 + Math.random() * 300, audioCtx.currentTime); 
        osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.03);

        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.03);
    } catch (e) {
        console.log("Audio waiting for user gesture");
    }
}

if (termInput) {
    termInput.addEventListener('input', () => {
        playKeyClickSound();
    });

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = termInput.value.trim().toLowerCase();
            termInput.value = '';
            
            if (!val) return;

            playPopSound(800);

            if (val === 'clear') {
                termBody.innerHTML = '';
                return;
            }

            const output = commands[val] || `Command not found: '${val}'. Type <span class='highlight-cmd'>'help'</span> for list.`;
            
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.innerHTML = `<span style="color:#22c55e;">tanish@dev:~$</span> ${val}<br><span style="color:#94a3b8;">> ${output}</span>`;
            termBody.appendChild(line);
            termBody.scrollTop = termBody.scrollHeight;
        }
    });
}

// Confetti Button Trigger
const confettiBtn = document.querySelector('.confetti-btn');
if (confettiBtn && typeof confetti === 'function') {
    confettiBtn.addEventListener('click', () => {
        confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#38bdf8', '#a855f7', '#f472b6']
        });
    });
}

// Filter Categories
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const isMatch = filterValue === 'all' || cardCategory === filterValue;

            if (isMatch) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Spotlight Tracker Effect on Skill Cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Sound Effect on Skill Pill Hover
const skillPills = document.querySelectorAll('.skill-tags span');
skillPills.forEach((pill, index) => {
    pill.addEventListener('mouseenter', () => {
        if (typeof playPopSound === 'function') {
            playPopSound(700 + (index % 5) * 60); 
        }
    });
});

// Josh Comeau Hero Sparkle Generator Effect
const magicTitle = document.querySelector('.magic-title');
if (magicTitle) {
    magicTitle.addEventListener('mousemove', (e) => {
        if (Math.random() > 0.6) {
            const sparkle = document.createElement('span');
            sparkle.className = 'title-sparkle';
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'fixed';
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;
            sparkle.style.pointerEvents = 'none';
            sparkle.style.fontSize = `${Math.random() * 12 + 10}px`;
            sparkle.style.zIndex = '9999';
            sparkle.style.transition = 'all 0.8s ease-out';
            
            document.body.appendChild(sparkle);

            setTimeout(() => {
                sparkle.style.transform = `translate(${(Math.random() - 0.5) * 60}px, -40px) scale(0)`;
                sparkle.style.opacity = '0';
            }, 20);

            setTimeout(() => {
                sparkle.remove();
            }, 800);
        }
    });
}

// One-Click Copy Email Feature with Floating Tooltip, Sound & Sparkle Confetti Blast
const copyBtn = document.querySelector('.copy-btn');

if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const textToCopy = copyBtn.getAttribute('data-copy');
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            const tooltip = copyBtn.querySelector('.copy-tooltip');
            
            // 1. Show Floating "Copied! ✨" Badge
            if (tooltip) {
                tooltip.classList.add('show');
                setTimeout(() => {
                    tooltip.classList.remove('show');
                }, 2000);
            }

            // 2. Play Audio Pop Sound
            if (typeof playPopSound === 'function') {
                playPopSound(900);
            }

            // 3. Trigger Sparkle Confetti Blast on Copy Success
            if (typeof confetti === 'function') {
                const rect = copyBtn.getBoundingClientRect();
                const x = (rect.left + rect.width / 2) / window.innerWidth;
                const y = (rect.top + rect.height / 2) / window.innerHeight;

                confetti({
                    particleCount: 50,
                    spread: 60,
                    origin: { x: x, y: y },
                    colors: ['#38bdf8', '#a855f7', '#f472b6', '#22c55e'],
                    ticks: 200,
                    gravity: 1.2,
                    scalar: 0.85
                });
            }
        });
    });
}

// --- 100% Accurate Scroll Spy & Sliding Pill Engine ---
const navContainer = document.querySelector('.nav-container');
const slidingPill = document.querySelector('.nav-sliding-pill');
const navItems = document.querySelectorAll('.nav-item');

function movePillTo(element) {
    if (!element || !slidingPill || !navContainer) return;
    const navRect = navContainer.getBoundingClientRect();
    const itemRect = element.getBoundingClientRect();

    slidingPill.style.left = `${itemRect.left - navRect.left}px`;
    slidingPill.style.width = `${itemRect.width}px`;
    slidingPill.style.opacity = '1';
}

// Initial Active State
const initialActive = document.querySelector('.nav-item.active-nav') || navItems[0];
if (initialActive) movePillTo(initialActive);

// Click & Hover Handler
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active-nav'));
        item.classList.add('active-nav');
        movePillTo(item);
    });

    item.addEventListener('mouseenter', () => movePillTo(item));
});

if (navContainer) {
    navContainer.addEventListener('mouseleave', () => {
        const currentActive = document.querySelector('.nav-item.active-nav');
        if (currentActive) movePillTo(currentActive);
    });
}

// Bulletproof Scroll Spy Logic
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 200; // Offset buffer for smooth triggering

    const sections = [
        { id: 'home', el: document.querySelector('#home, header#home, main#home') },
        { id: 'skills', el: document.querySelector('#skills') },
        { id: 'projects', el: document.querySelector('#projects, #work') },
        { id: 'terminal', el: document.querySelector('#terminal') },
        { id: 'education', el: document.querySelector('#education') },
        { id: 'contact', el: document.querySelector('#contact, footer') }
    ];

    let activeId = 'home';

    sections.forEach(sec => {
        if (sec.el) {
            const top = sec.el.offsetTop;
            const height = sec.el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                activeId = sec.id;
            }
        }
    });

    // Special handling if scrolled to bottom (Contact/Footer)
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        activeId = 'contact';
    }

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === `#${activeId}` || (activeId === 'contact' && href === '#contact') || (activeId === 'projects' && href === '#projects')) {
            navItems.forEach(nav => nav.classList.remove('active-nav'));
            item.classList.add('active-nav');
            movePillTo(item);
        }
    });
});

// --- HYPER-INTERACTIVE CONSTELLATION & RIPPLE BACKGROUND ENGINE ---
const bgCanvas = document.getElementById('bg-constellation-canvas');

if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let particles = [];
    let shockwaves = [];
    const maxParticles = 90;
    const connectDistance = 140;

    const mouse = {
        x: null,
        y: null,
        radius: 180
    };

    function resizeCanvas() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
        initParticles();
    }

    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        const mesh1 = document.querySelector('.mesh-1');
        const mesh2 = document.querySelector('.mesh-2');
        if (mesh1 && mesh2) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.03;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.03;
            mesh1.style.transform = `translate(${moveX}px, ${moveY}px)`;
            mesh2.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        }
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('click', (e) => {
        shockwaves.push({
            x: e.clientX,
            y: e.clientY,
            radius: 5,
            maxRadius: 180,
            alpha: 1
        });
    });

    class ConstellationParticle {
        constructor() {
            this.x = Math.random() * bgCanvas.width;
            this.y = Math.random() * bgCanvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.baseRadius = Math.random() * 2 + 1;
            this.radius = this.baseRadius;
            this.color = Math.random() > 0.5 ? '#38bdf8' : '#a855f7';
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > bgCanvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > bgCanvas.height) this.vy *= -1;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    this.radius = this.baseRadius + (1 - dist / mouse.radius) * 3;
                    this.x += dx * 0.015;
                    this.y += dy * 0.015;
                } else {
                    this.radius = this.baseRadius;
                }
            }
        }
    }

    function initParticles() {
        bgCanvas.width = window.innerWidth;
        bgCanvas.height = window.innerHeight;
        particles = [];
        for (let i = 0; i < maxParticles; i++) {
            particles.push(new ConstellationParticle());
        }
    }

    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectDistance) {
                    const opacity = 1 - dist / connectDistance;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.25})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        connectParticles();

        shockwaves.forEach((sw, index) => {
            ctx.beginPath();
            ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(56, 189, 248, ${sw.alpha})`;
            ctx.lineWidth = 2;
            ctx.stroke();

            sw.radius += 6;
            sw.alpha -= 0.025;
            if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
                shockwaves.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}



// --- Web Audio API Sci-Fi Thruster Sound ---
let globalAudioCtx = null;

function initAudioContext() {
    if (!globalAudioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        globalAudioCtx = new AudioContextClass();
    }
    if (globalAudioCtx.state === 'suspended') {
        globalAudioCtx.resume();
    }
}

function playSciFiThrusterSound() {
    try {
        initAudioContext();
        if (!globalAudioCtx) return;

        const osc = globalAudioCtx.createOscillator();
        const gain = globalAudioCtx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, globalAudioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, globalAudioCtx.currentTime + 1.2);

        gain.gain.setValueAtTime(0.2, globalAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, globalAudioCtx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(globalAudioCtx.destination);
        osc.start();
        osc.stop(globalAudioCtx.currentTime + 1.2);
    } catch (e) {
        console.log("Audio waiting for user gesture");
    }
}

// Portal Close "Swipp" Sound Effect
function playPortalCloseSound() {
    try {
        initAudioContext();
        if (!globalAudioCtx) return;

        const osc = globalAudioCtx.createOscillator();
        const gain = globalAudioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, globalAudioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, globalAudioCtx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.18, globalAudioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, globalAudioCtx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(globalAudioCtx.destination);
        osc.start();
        osc.stop(globalAudioCtx.currentTime + 0.35);
    } catch (e) {
        console.log("Audio waiting for user gesture");
    }
}

// Unlock audio context on any first user interaction on the page
document.addEventListener('click', () => {
    initAudioContext();
}, { once: true });

// --- Portal, Glitch Logo & 3D Spaceship Animation Sequence + Mobile Sidebar Toggle ---
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Hamburger Menu & Right-Side Sidebar Toggle ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navContainer = document.querySelector('.nav-container');
    const navItems = document.querySelectorAll('.nav-item');

    if (hamburgerBtn && navContainer) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navContainer.classList.toggle('mobile-open');
        });

        // Close mobile sidebar when any navigation link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navContainer.classList.remove('mobile-open');
            });
        });
    }

    // --- 2. Tech Pods & Spaceship Animation ---
    const pods = document.querySelectorAll('.tech-pod-wrapper');

    // Step 1: Page Load (0s to 4s) -> Logos start with Cyber Glitch Effect
    pods.forEach(pod => {
        const logo = pod.querySelector('.tech-logo-node');
        logo.classList.add('glitch-active');
    });

    // Step 2: At 4 Seconds -> Play Audio, Open Portal, Hide Logo, Launch Ship
    setTimeout(() => {
        playSciFiThrusterSound(); // Audio trigger on initial portal opening

        pods.forEach(pod => {
            const logo = pod.querySelector('.tech-logo-node');
            const portal = pod.querySelector('.portal-core');
            const ship = pod.querySelector('.custom-spaceship');

            // Logo disappears into portal
            logo.style.opacity = '0';
            logo.classList.remove('glitch-active');
            portal.classList.add('active');

            // Launch spaceship out of portal
            setTimeout(() => {
                ship.classList.add('launching', 'flying');
            }, 300);

            // Warp vanish & restore glitch logo state
            setTimeout(() => {
                playPortalCloseSound(); // Portal close swipp sound
                portal.classList.remove('active');
                ship.classList.remove('launching', 'flying');
                ship.classList.add('docking');
                logo.style.opacity = '1';
                logo.classList.add('glitch-active');
            }, 1800);
        });
    }, 4000);

    // Step 3: User Click Event -> Audio, Open Portal, Hide Logo, Fly Spaceship
    pods.forEach(pod => {
        pod.addEventListener('click', () => {
            playSciFiThrusterSound();
            const logo = pod.querySelector('.tech-logo-node');
            const portal = pod.querySelector('.portal-core');
            const ship = pod.querySelector('.custom-spaceship');

            logo.style.opacity = '0';
            logo.classList.remove('glitch-active');
            portal.classList.add('active');

            setTimeout(() => {
                ship.classList.remove('docking');
                ship.classList.add('launching', 'flying');
            }, 300);

            // Fly for 5.5s, then return back to portal
            setTimeout(() => {
                ship.classList.remove('launching');
                ship.classList.add('docking');
            }, 5500);

            // Close portal & restore glitch logo state
            setTimeout(() => {
                playPortalCloseSound(); // Portal close swipp sound
                portal.classList.remove('active');
                logo.style.opacity = '1';
                logo.classList.add('glitch-active');
            }, 6200);
        });
    });
});