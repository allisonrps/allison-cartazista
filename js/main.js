/* ==========================================================================
   CARTAZISTA LANDING PAGE - JAVASCRIPT
   Allison Cartazista - Franca/SP e Região
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '5516991153733';

  // 1. SIMULADOR DE PEDIDO / ORÇAMENTO VIA WHATSAPP
  const simForm = document.getElementById('orderSimulatorForm');
  if (simForm) {
    simForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientName = document.getElementById('simName').value.trim() || 'Comerciante';
      const city = document.getElementById('simCity').value.trim() || 'Franca/SP';
      const businessType = document.getElementById('simBusiness').value;
      const material = document.getElementById('simMaterial').value;
      const details = document.getElementById('simDetails').value.trim() || 'Orçamento geral de cartazes / vitrines';

      // Monta a mensagem personalizada para o WhatsApp do Allison
      let msg = `Olá Allison! Vim pelo seu site e gostaria de um orçamento:\n\n`;
      msg += `👤 *Nome / Comércio:* ${clientName}\n`;
      msg += `📍 *Cidade:* ${city}\n`;
      msg += `🏪 *Segmento:* ${businessType}\n`;
      msg += `🎨 *Tipo de Serviço:* ${material}\n`;
      msg += `📝 *Detalhes:* ${details}\n\n`;
      msg += `Pode me passar os valores e prazos, por favor?`;

      const encodedMsg = encodeURIComponent(msg);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;

      window.open(whatsappUrl, '_blank');
    });
  }

  // 2. FILTROS DA GALERIA DE TRABALHOS
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 3. LIGHTBOX MODAL PARA AS FOTOS
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModalBtn = document.getElementById('closeModalBtn');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('h4').innerText;
      const desc = card.getAttribute('data-description') || 'Trabalho artesanal feito sob medida pelo Allison Cartazista.';

      modalImg.src = img.src;
      modalImg.alt = title;
      modalTitle.innerText = title;
      modalDesc.innerText = desc;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 4. MENU MOBILE TOGGLE
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNavDrawer');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => {
      const isVisible = mobileNav.style.display === 'flex';
      mobileNav.style.display = isVisible ? 'none' : 'flex';
    });
  }

  // 5. ACCORDION FAQ (SEO LOCAL GOOGLE)
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const question = card.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = card.classList.contains('open');
        faqCards.forEach(c => c.classList.remove('open'));
        if (!isOpen) {
          card.classList.add('open');
        }
      });
    }
  });

  // 6. CONTADOR DE VISITAS DISCRETO NO RODAPÉ
  const visitCountEl = document.getElementById('visitCount');
  if (visitCountEl) {
    const BASE_VISITS = 1480;
    let stored = localStorage.getItem('allison_cartazista_visits');
    let visits = stored ? parseInt(stored, 10) : 0;
    visits += 1;
    localStorage.setItem('allison_cartazista_visits', visits.toString());
    const total = BASE_VISITS + visits;
    visitCountEl.innerText = total.toLocaleString('pt-BR');
  }
});
