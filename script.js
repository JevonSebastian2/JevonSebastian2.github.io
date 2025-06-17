// Inisialisasi Smooth Scrolling dengan Lenis
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Hubungkan GSAP ScrollTrigger dengan Lenis
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);


// 1. ANIMASI HERO (SCALE & FADE)
gsap.to(".hero-container", {
    scrollTrigger: {
        trigger: ".main-content",
        start: "top bottom",
        end: "top top",
        scrub: 1,
    },
    scale: 0.85,
    opacity: 0,
    ease: "power1.inOut"
});

// 2. ANIMASI TEKS (REVEAL DARI BAWAH)
const animatedHeadings = document.querySelectorAll(".line-wrapper h2");
animatedHeadings.forEach(heading => {
    gsap.to(heading, {
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: heading.parentElement,
            start: "top 85%", // Mulai animasi saat 85% dari atas elemen terlihat
        }
    });
});

// 3. ANIMASI HORIZONTAL SCROLL
const track = document.querySelector(".project-track");
const wrapper = document.getElementById("horizontal-scroll-wrapper");

if (track && wrapper) {
    let trackWidth = track.scrollWidth;
    let amountToScroll = trackWidth - window.innerWidth;

    gsap.to(track, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: "+=" + amountToScroll,
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,
        }
    });
}

// 4. KURSOR KUSTOM & TOMBOL MAGNETIK
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const magneticButtons = document.querySelectorAll('.magnetic-btn');

window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    cursorDot.style.left = clientX + 'px';
    cursorDot.style.top = clientY + 'px';
    
    gsap.to(cursorOutline, {
        duration: 0.3,
        left: clientX,
        top: clientY,
        ease: "power2.out"
    });
});

magneticButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        document.querySelector('.cursor').classList.add('grow');
    });
    button.addEventListener('mouseleave', () => {
        document.querySelector('.cursor').classList.remove('grow');
    });

    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 1,
            ease: "elastic.out(1, 0.4)"
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.4)"
        });
    });
});