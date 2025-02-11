// Atualizar ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function() {
    // Lazy loading para thumbnails
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));

    // Configuração do Lightbox
    const images = document.querySelectorAll(".expandable");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close-btn");

    images.forEach(img => {
        img.addEventListener("click", function () {
            lightbox.style.display = "flex";
            lightboxImg.src = this.src;
        });
    });

    closeBtn?.addEventListener("click", function () {
        lightbox.style.display = "none";
    });

    lightbox?.addEventListener("click", function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });

    // Configuração do Carrossel
    const containers = document.querySelectorAll('.thumbnails-container');
    
    containers.forEach(container => {
        const grid = container.querySelector('.thumbnails-grid');
        const prevBtn = container.querySelector('.nav-button.prev');
        const nextBtn = container.querySelector('.nav-button.next');
        
        // Definir distância do scroll baseado no tamanho da thumbnail
        const scrollDistance = 900; // Ajuste conforme o tamanho das suas thumbnails
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                grid.scrollBy({
                    left: -scrollDistance,
                    behavior: 'smooth'
                });
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                grid.scrollBy({
                    left: scrollDistance,
                    behavior: 'smooth'
                });
            });
        }
        
        // Atualizar visibilidade dos botões
        const updateButtonVisibility = () => {
            if (prevBtn) {
                prevBtn.style.display = grid.scrollLeft <= 0 ? 'none' : 'flex';
            }
            if (nextBtn) {
                nextBtn.style.display = 
                    Math.ceil(grid.scrollLeft) >= grid.scrollWidth - grid.clientWidth 
                    ? 'none' 
                    : 'flex';
            }
        };

        // Verificar visibilidade inicial dos botões
        updateButtonVisibility();
        
        // Atualizar botões quando rolar
        grid.addEventListener('scroll', updateButtonVisibility);
    });
});

// Formulário de contato
document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
            this.reset();
        } else {
            throw new Error('Erro ao enviar mensagem');
        }
    } catch (error) {
        alert('Erro ao enviar mensagem. Tente novamente mais tarde.');
        console.error('Erro:', error);
    }
});

// Animação suave ao scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});