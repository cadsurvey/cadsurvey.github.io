// Simple interaction script
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    // Add background to navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(21, 26, 36, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(21, 26, 36, 0.7)';
            navbar.style.boxShadow = 'none';
        }
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    });

    // Hero slider & synced text
    const heroContent = document.querySelector('.hero-content');
    const slides = document.querySelectorAll('.slide-img');
    const slideData = [
        {
            title: 'Asisten Survei Kadastral Terbaik',
            desc: 'Meningkatkan presisi dan efisiensi Surveyor Kadastral di seluruh Indonesia dengan teknologi modern.'
        },
        {
            title: 'Perhitungan Cepat & Akurat',
            desc: 'Menghadirkan kalkulasi presisi tinggi untuk pengukuran tanah dan koordinat dalam hitungan detik.'
        }
    ];
    let currentSlide = 0;
    const changeSlide = () => {
        slides.forEach((s, i) => s.classList.toggle('active', i === currentSlide));
        const {title, desc} = slideData[currentSlide];
        heroContent.querySelector('h1').textContent = title;
        heroContent.querySelector('p').textContent = desc;
    };
    changeSlide();
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        changeSlide();
    }, 4000);

    // Scroll reveal for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {threshold: 0.2});
    document.querySelectorAll('section').forEach(sec => observer.observe(sec));

    // Smooth scroll for anchor links (exclude modal triggers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Skip modal trigger links
            if (this.id === 'open-privacy' || this.id === 'open-terms') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Modal logic
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.getElementById('open-privacy').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('privacy-modal');
    });

    document.getElementById('open-terms').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('terms-modal');
    });

    document.getElementById('close-privacy').addEventListener('click', () => closeModal('privacy-modal'));
    document.getElementById('close-terms').addEventListener('click', () => closeModal('terms-modal'));

    // Close on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay.id);
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id));
        }
    });


    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');
    
    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let switchToTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', switchToTheme);
        localStorage.setItem('theme', switchToTheme);
        updateThemeIcon(switchToTheme);
    });

    function updateThemeIcon(theme) {
        if(theme === 'light') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
});
