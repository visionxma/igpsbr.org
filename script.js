document.addEventListener('DOMContentLoaded', () => {
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

    // --- Hero Carousel ---
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.style.opacity = '0.5';
        });

        slides[index].classList.add('active');
        dots[index].classList.add('active');
        dots[index].style.opacity = '1';
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Auto-advance carousel
    let carouselInterval = setInterval(nextSlide, 5000);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(carouselInterval);
            currentSlide = index;
            showSlide(currentSlide);
            carouselInterval = setInterval(nextSlide, 5000);
        });
    });

    // --- General Site Search ---
    const siteSearchInput = document.getElementById('site-search');
    const searchOverlay = document.getElementById('search-overlay');
    const searchResultsList = document.getElementById('search-results-list');
    const closeSearchBtn = document.getElementById('close-search');

    const searchData = [
        { title: 'Quem Somos', link: '#quem-somos', content: 'objetivos missao visao valores instituicao' },
        { title: 'Nossos Serviços', link: '#servicos', content: 'consultoria assessoria capacitacao diagnostico' },
        { title: 'Nossa Atuação', link: '#projetos', content: 'projetos parceria defensoria semas mpt mds' },
        { title: 'Projeto EASI', link: '#projeto-easi', content: 'acolhimento recuperacao drogas icatu' },
        { title: 'Transparência', link: 'transparencia.html', content: 'documentos editais relatorios contas' },
        { title: 'Contato', link: '#contato', content: 'email whatsapp instagram endereco' }
    ];

    // Check for search parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery && searchOverlay) {
        renderSearchResults(searchQuery.toLowerCase());
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    siteSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = siteSearchInput.value.toLowerCase().trim();
            if (query.length < 2) return;

            renderSearchResults(query);
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    closeSearchBtn.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    function renderSearchResults(query) {
        const results = searchData.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query)
        );

        searchResultsList.innerHTML = '';

        if (results.length === 0) {
            searchResultsList.innerHTML = '<p style="padding: 2rem; color: #666;">Nenhum resultado encontrado para "' + query + '".</p>';
            return;
        }

        results.forEach(result => {
            const card = document.createElement('div');
            card.style.cssText = 'padding: 1.5rem; border-bottom: 1px solid #eee; transition: 0.3s; cursor: pointer;';
            card.innerHTML = `
                <h3 style="color: var(--color-blue); margin-bottom: 0.5rem;">${result.title}</h3>
                <p style="color: #666; font-size: 0.9rem;">Ver detalhes sobre ${result.title.toLowerCase()}...</p>
            `;

            card.onmouseover = () => card.style.backgroundColor = '#f9f9f9';
            card.onmouseout = () => card.style.backgroundColor = 'transparent';

            card.onclick = () => {
                window.location.href = result.link;
                searchOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            };

            searchResultsList.appendChild(card);
        });
    }

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
