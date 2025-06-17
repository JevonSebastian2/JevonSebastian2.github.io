gsap.registerPlugin(ScrollTrigger);

// 1. EFEK REVEAL HERO SECTION
gsap.to(".hero-container", {
    scrollTrigger: {
        trigger: ".main-content",
        start: "top bottom", // Saat bagian atas .main-content bertemu bagian bawah layar
        end: "top top",
        scrub: 1,
    },
    y: "-100vh", // Mendorong hero ke atas sejauh tinggi layar
    ease: "none"
});

// 2. EFEK HORIZONTAL SCROLL
const track = document.querySelector(".project-track");
const wrapper = document.getElementById("horizontal-scroll-wrapper");

// Pastikan elemen ada sebelum menjalankan animasi
if (track && wrapper) {
    gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + window.innerWidth * 0.08), // Scroll sampai akhir track
        ease: "none",
        scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            scrub: true,
            pin: true, // "Pin" wrapper selama animasi horizontal
            invalidateOnRefresh: true
        }
    });
}

// 3. EFEK KURSOR KUSTOM & TOMBOL MAGNETIK
const cursor = document.getElementById('custom-cursor');
const magneticButtons = document.querySelectorAll('.magnetic-btn');

if (cursor) {
    window.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

magneticButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (cursor) cursor.classList.add('grow');
    });
    button.addEventListener('mouseleave', () => {
        if (cursor) cursor.classList.remove('grow');
    });

    // Efek magnetik
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * 0.4,
            y: y * 0.4,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)"
        });
    });
});