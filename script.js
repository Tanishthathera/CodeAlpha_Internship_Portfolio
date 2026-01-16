// Simple Scroll Animation
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.style.background = '#0f172a';
        nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
    } else {
        nav.style.background = 'transparent';
        nav.style.boxShadow = 'none';
    }
});

console.log("Portfolio ready for submission!");