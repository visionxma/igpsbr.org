document.addEventListener('DOMContentLoaded', () => {
    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const mainLogo = document.getElementById('main-logo');
    const heroLogo = document.getElementById('hero-logo');

    function updateLogos(isDark) {
        const logoSrc = isDark ? 'img/igpsbranco.png' : 'img/logo-igps.png';
        if (mainLogo) mainLogo.src = logoSrc;
        if (heroLogo) heroLogo.src = logoSrc;
    }

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        updateLogos(true);
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateLogos(isDark);
    });

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Mobile Menu
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        // Toggle active class on spans for animation
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.remove('active'));
        });
    });

    // --- Improved Hero Carousel ---
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let carouselInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function startCarousel() {
        if (carouselInterval) clearInterval(carouselInterval);
        carouselInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 6000);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startCarousel();
        });
    });

    if (slides.length > 0) startCarousel();

    // --- Live Site Search Dropdown ---
    const siteSearchInput = document.getElementById('site-search');
    const liveResults = document.getElementById('search-live-results');

    const searchData = [
        { title: 'Quem Somos', link: '#quem-somos', content: 'instituto objetivo missao visao valores historia' },
        { title: 'Nossos Serviços', link: '#servicos', content: 'consultoria assessoria capacitação treinamento diagnostico' },
        { title: 'Nossa Atuação', link: '#projetos', content: 'projetos Maranhão prefeitura defensoria projetos sociais' },
        { title: 'Projeto Social EASI', link: '#projeto-easi', content: 'acolhimento recuperação drogas dependência icatu' },
        { title: 'Transparência', link: 'transparencia.html', content: 'documentos editais relatórios contas transparencia' },
        { title: 'Contato', link: '#contato', content: 'email whatsapp instagram localização' }
    ];

    siteSearchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 2) {
            liveResults.classList.remove('active');
            return;
        }

        const filtered = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        );

        renderLiveResults(filtered);
    });

    function renderLiveResults(results) {
        liveResults.innerHTML = '';

        if (results.length === 0) {
            liveResults.innerHTML = '<div class="live-search-item"><p>Nenhum resultado encontrado.</p></div>';
        } else {
            results.forEach(result => {
                const item = document.createElement('div');
                item.className = 'live-search-item';
                item.innerHTML = `
                    <h4>${result.title}</h4>
                    <p>Clique para ver mais...</p>
                `;
                item.onclick = () => {
                    window.location.href = result.link;
                    liveResults.classList.remove('active');
                    siteSearchInput.value = '';
                };
                liveResults.appendChild(item);
            });
        }
        liveResults.classList.add('active');
    }

    // Close results when clicking outside
    document.addEventListener('click', (e) => {
        if (!siteSearchInput.contains(e.target) && !liveResults.contains(e.target)) {
            liveResults.classList.remove('active');
        }
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });
});
