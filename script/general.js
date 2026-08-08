/* Image modal */
document.querySelectorAll('.expandable').forEach((img) => {
  img.addEventListener('click', () => {
    const modal = document.createElement('div');

    modal.className = 'modal';

    modal.innerHTML = `
      <span class="close" aria-label="Close">&times;</span>
      <img src="${img.src}" alt="${img.alt || 'Expanded image'}">
    `;

    document.body.appendChild(modal);

    const closeModal = () => modal.remove();

    modal.querySelector('.close').addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  });
});

/* Video modal */
document.querySelectorAll('.video-box').forEach((box) => {
  box.addEventListener('click', () => {
    const videoSrc = box.getAttribute('data-video');

    if (!videoSrc) return;

    const modal = document.createElement('div');

    modal.className = 'modal';

    modal.innerHTML = `
      <span class="close" aria-label="Close">&times;</span>

      <video controls autoplay playsinline>
        <source src="${videoSrc}" type="video/mp4">
        Your browser does not support video playback.
      </video>
    `;

    document.body.appendChild(modal);

    const video = modal.querySelector('video');

    const closeModal = () => {
      video.pause();
      modal.remove();
    };

    modal.querySelector('.close').addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  });
});

/* WhatsApp modal */
function openWhatsAppModal() {
  const modal = document.getElementById('whatsappModal');

  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeWhatsAppModal() {
  const modal = document.getElementById('whatsappModal');

  if (modal) {
    modal.style.display = 'none';
  }
}

function openChat(number) {
  const message =
    'Hello, I would like to know more about Holy Trinity International Mission.';

  const cleanNumber = String(number).replace(/\D/g, '');

  const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, '_blank', 'noopener,noreferrer');
}

/* Call modal */
function openCallModal() {
  const modal = document.getElementById('callModal');

  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeCallModal() {
  const modal = document.getElementById('callModal');

  if (modal) {
    modal.style.display = 'none';
  }
}

function makeCall(number) {
  const cleanNumber = String(number).replace(/[^\d+]/g, '');

  window.location.href = `tel:${cleanNumber}`;
}

/* Donate modal */
function openDonateModal() {
  const modal = document.getElementById('donateModal');

  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeDonateModal() {
  const modal = document.getElementById('donateModal');

  if (modal) {
    modal.style.display = 'none';
  }
}

/* Smart email */
function openSmartEmail() {
  const to = 'hollytrinityministries@gmail.com';

  const subject = 'Inquiry from Website';

  const body =
    'Hello, I would like to know more about Holy Trinity International Mission.';

  const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const gmailAppUrl = `googlegmail://co?to=${encodeURIComponent(to)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = gmailAppUrl;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1000);

    return;
  }

  const emailWindow = window.open(gmailWebUrl, '_blank', 'noopener,noreferrer');

  if (!emailWindow) {
    window.location.href = mailtoUrl;
  }
}

/* Close modals */
window.addEventListener('click', (e) => {
  const modals = [
    document.getElementById('whatsappModal'),
    document.getElementById('donateModal'),
    document.getElementById('callModal'),
  ];

  modals.forEach((modal) => {
    if (modal && e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

/* Gallery carousel */
const gallerySlider = document.querySelector('.gallery-slider');

const galleryItems = document.querySelectorAll('.gallery-item');

const galleryPrev = document.querySelector('.gallery-prev');

const galleryNext = document.querySelector('.gallery-next');

const galleryDotsContainer = document.querySelector('.gallery-dots');

let currentGalleryIndex = 0;

if (gallerySlider && galleryItems.length && galleryDotsContainer) {
  galleryItems.forEach((item, index) => {
    const dot = document.createElement('span');

    dot.className = 'gallery-dot';

    dot.setAttribute('role', 'button');

    dot.setAttribute('tabindex', '0');

    dot.setAttribute('aria-label', `Go to gallery item ${index + 1}`);

    if (index === 0) {
      dot.classList.add('active');
    }

    const activateDot = () => {
      currentGalleryIndex = index;

      scrollToGalleryItem(index);
    };

    dot.addEventListener('click', activateDot);

    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();

        activateDot();
      }
    });

    galleryDotsContainer.appendChild(dot);
  });

  const galleryDots = galleryDotsContainer.querySelectorAll('.gallery-dot');

  /* Scroll gallery */
  function scrollToGalleryItem(index) {
    gallerySlider.scrollTo({
      left: gallerySlider.clientWidth * index,
      behavior: 'smooth',
    });

    updateGalleryDots(index);
  }

  /* Update gallery dots */
  function updateGalleryDots(index) {
    galleryDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  /* Next gallery */
  if (galleryNext) {
    galleryNext.addEventListener('click', () => {
      currentGalleryIndex++;

      if (currentGalleryIndex >= galleryItems.length) {
        currentGalleryIndex = 0;
      }

      scrollToGalleryItem(currentGalleryIndex);
    });
  }

  /* Previous gallery */
  if (galleryPrev) {
    galleryPrev.addEventListener('click', () => {
      currentGalleryIndex--;

      if (currentGalleryIndex < 0) {
        currentGalleryIndex = galleryItems.length - 1;
      }

      scrollToGalleryItem(currentGalleryIndex);
    });
  }

  /* Gallery scroll */
  gallerySlider.addEventListener('scroll', () => {
    const index = Math.round(
      gallerySlider.scrollLeft / gallerySlider.clientWidth,
    );

    if (
      index >= 0 &&
      index < galleryItems.length &&
      index !== currentGalleryIndex
    ) {
      currentGalleryIndex = index;

      updateGalleryDots(currentGalleryIndex);
    }
  });
}

/* Team carousel */
const teamSlider = document.querySelector('.team-slider');

const teamMembers = document.querySelectorAll('.team-member');

const prevButton = document.querySelector('.team-prev');

const nextButton = document.querySelector('.team-next');

const dotsContainer = document.querySelector('.team-dots');

let currentTeamIndex = 0;

if (teamSlider && teamMembers.length && dotsContainer) {
  teamMembers.forEach((member, index) => {
    const dot = document.createElement('span');

    dot.className = 'team-dot';

    dot.setAttribute('role', 'button');

    dot.setAttribute('tabindex', '0');

    dot.setAttribute('aria-label', `Go to team member ${index + 1}`);

    if (index === 0) {
      dot.classList.add('active');
    }

    const activateDot = () => {
      currentTeamIndex = index;

      scrollToTeamMember(index);
    };

    dot.addEventListener('click', activateDot);

    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();

        activateDot();
      }
    });

    dotsContainer.appendChild(dot);
  });

  const teamDots = dotsContainer.querySelectorAll('.team-dot');

  /* Scroll team */
  function scrollToTeamMember(index) {
    teamSlider.scrollTo({
      left: teamSlider.clientWidth * index,
      behavior: 'smooth',
    });

    updateTeamDots(index);
  }

  /* Update team dots */
  function updateTeamDots(index) {
    teamDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  /* Next team */
  if (nextButton) {
    nextButton.addEventListener('click', () => {
      currentTeamIndex++;

      if (currentTeamIndex >= teamMembers.length) {
        currentTeamIndex = 0;
      }

      scrollToTeamMember(currentTeamIndex);
    });
  }

  /* Previous team */
  if (prevButton) {
    prevButton.addEventListener('click', () => {
      currentTeamIndex--;

      if (currentTeamIndex < 0) {
        currentTeamIndex = teamMembers.length - 1;
      }

      scrollToTeamMember(currentTeamIndex);
    });
  }

  /* Team scroll */
  teamSlider.addEventListener('scroll', () => {
    const index = Math.round(teamSlider.scrollLeft / teamSlider.clientWidth);

    if (
      index >= 0 &&
      index < teamMembers.length &&
      index !== currentTeamIndex
    ) {
      currentTeamIndex = index;

      updateTeamDots(currentTeamIndex);
    }
  });
}

/* Escape key */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;

  document.querySelectorAll('.modal').forEach((modal) => modal.remove());

  [
    document.getElementById('whatsappModal'),
    document.getElementById('callModal'),
    document.getElementById('donateModal'),
  ].forEach((modal) => {
    if (modal) {
      modal.style.display = 'none';
    }
  });
});
