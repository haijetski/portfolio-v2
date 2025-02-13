// Atualizar ano no footer
function updateYear() {
    document.getElementById('year').textContent = new Date().getFullYear();
}

// Lazy loading para thumbnails
function setupLazyLoading() {
    const observer = new IntersectionObserver(entries => {
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
}

// Configuração do Lightbox
function setupLightbox() {
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

    closeBtn?.addEventListener("click", () => lightbox.style.display = "none");
    lightbox?.addEventListener("click", e => { if (e.target === lightbox) lightbox.style.display = "none"; });
}

// Configuração do Carrossel
function setupCarousels() {
    document.querySelectorAll('.thumbnails-container').forEach(container => {
        const grid = container.querySelector('.thumbnails-grid');
        const prevBtn = container.querySelector('.nav-button.prev');
        const nextBtn = container.querySelector('.nav-button.next');
        
        const getScrollDistance = () => window.innerWidth <= 768 ? 300 : 720;
        
        prevBtn?.addEventListener('click', () => grid.scrollBy({ left: -getScrollDistance(), behavior: 'smooth' }));
        nextBtn?.addEventListener('click', () => grid.scrollBy({ left: getScrollDistance(), behavior: 'smooth' }));
        
        const updateButtonVisibility = () => {
            prevBtn.style.display = grid.scrollLeft <= 0 ? 'none' : 'flex';
            nextBtn.style.display = Math.ceil(grid.scrollLeft) >= grid.scrollWidth - grid.clientWidth ? 'none' : 'flex';
        };
        
        updateButtonVisibility();
        grid.addEventListener('scroll', updateButtonVisibility);
        window.addEventListener('resize', updateButtonVisibility);
    });
}

// Formulário de contato
function setupContactForm() {
    document.getElementById('contactForm')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
}

// Animação suave ao scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

// Inicialização dos scripts
// Inicializar o modal "Sobre"
function initModal() {
    const modal = document.getElementById("aboutModal");
    const btn = document.getElementById("openModal");
    const closeBtn = document.querySelector(".close");

    if (!modal || !btn || !closeBtn) return;

    btn.addEventListener("click", () => modal.style.display = "flex");
    closeBtn.addEventListener("click", () => modal.style.display = "none");

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initLazyLoading === "function") initLazyLoading();
    if (typeof initLightbox === "function") initLightbox();
    if (typeof initCarousel === "function") initCarousel();
    if (typeof initSmoothScroll === "function") initSmoothScroll();
    if (typeof initContactForm === "function") initContactForm();
    if (typeof initModal === "function") initModal();

    if (typeof updateYear === "function") updateYear();
    if (typeof setupLazyLoading === "function") setupLazyLoading();
    if (typeof setupLightbox === "function") setupLightbox();
    if (typeof setupCarousels === "function") setupCarousels();
    if (typeof setupContactForm === "function") setupContactForm();
    if (typeof setupSmoothScroll === "function") setupSmoothScroll();
});



// MENU DE NAVEGAÇÃO BARRA no topo

// Menu Mobile
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navLinks = document.querySelector(".nav-links")

mobileMenuBtn?.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

// Fechar menu ao clicar em um link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
  })
})

// Botão Voltar ao Topo
const backToTopButton = document.getElementById("back-to-top")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("visible")
  } else {
    backToTopButton.classList.remove("visible")
  }
})

backToTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Animação de entrada das seções
const observerOptions = {
  threshold: 0.1,
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section)
})

// Barra de Progresso
const progressBar = document.createElement("div")
progressBar.className = "progress-bar"
document.body.appendChild(progressBar)

window.addEventListener("scroll", () => {
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = (window.scrollY / windowHeight) * 100
  progressBar.style.transform = `scaleX(${progress / 100})`
})

// Atualizar navegação ativa baseado na seção visível
const sections = document.querySelectorAll("section")
const navItems = document.querySelectorAll(".nav-links a")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute("id")
    }
  })

  navItems.forEach((item) => {
    item.classList.remove("active")
    if (item.getAttribute("href").slice(1) === current) {
      item.classList.add("active")
    }
  })
})

// Script para lidar com a mudança de idioma -->

  function changeLanguage(event) {
    const selectedLanguage = event.target.value;
    
    // Exemplo de ação: alterar o conteúdo com base no idioma selecionado
    if (selectedLanguage === 'pt') {
      console.log('Idioma alterado para Português');
    } else if (selectedLanguage === 'en') {
      console.log('Language changed to English');
    } else if (selectedLanguage === 'es') {
      console.log('Idioma cambiado a Español');
    }
  }

  