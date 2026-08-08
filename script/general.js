// Image modal
document.querySelectorAll('.expandable').forEach((img) => {
  img.addEventListener('click', () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
      <span class="close">&times;</span>
      <img src="${img.src}">
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close').onclick = () => modal.remove();
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
  });
});

// Video modal
document.querySelectorAll('.video-box').forEach((box) => {
  box.addEventListener('click', () => {
    const videoSrc = box.getAttribute('data-video');

    const modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
      <span class="close">&times;</span>
      <video controls autoplay>
        <source src="${videoSrc}" type="video/mp4">
      </video>
    `;

    document.body.appendChild(modal);

    modal.querySelector('.close').onclick = () => modal.remove();
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
  });
});

// Whatsapp modal
function openWhatsAppModal() {
  document.getElementById('whatsappModal').style.display = 'flex';
}

function closeWhatsAppModal() {
  document.getElementById('whatsappModal').style.display = 'none';
}

function openChat(number) {
  const message =
    'Hello, I would like to know more about Holy Trinity International Mission.';
  const url =
    'https://wa.me/' + number + '?text=' + encodeURIComponent(message);
  window.open(url, '_blank');
}

// Call modal
function openCallModal() {
  document.getElementById('callModal').style.display = 'flex';
}

function closeCallModal() {
  document.getElementById('callModal').style.display = 'none';
}

function makeCall(number) {
  window.location.href = 'tel:' + number;
}

// Donate modal
function openDonateModal() {
  document.getElementById('donateModal').style.display = 'flex';
}

function closeDonateModal() {
  document.getElementById('donateModal').style.display = 'none';
}

// Smart email (mobile / desktop)
function openSmartEmail() {
  const to = 'hollytrinityministries@gmail.com';
  const cc = 'hollytrinityministries@gmail.com';
  const subject = 'Inquiry from Website';
  const body =
    'Hello, I would like to know more about Holy Trinity International Mission.';

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const gmailWeb = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&cc=${cc}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const gmailApp = `googlegmail://co?to=${to}&cc=${cc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (isMobile) {
    window.location.href = gmailApp;

    setTimeout(() => {
      window.location.href = `mailto:${to}?cc=${cc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 800);
  } else {
    const win = window.open(gmailWeb, '_blank');

    if (!win) {
      window.location.href = `mailto:${to}?cc=${cc}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }
}

// Close modals on click outside
window.onclick = function (e) {
  const wa = document.getElementById('whatsappModal');
  const donate = document.getElementById('donateModal');
  const call = document.getElementById('callModal');

  if (e.target === wa) wa.style.display = 'none';
  if (e.target === donate) donate.style.display = 'none';
  if (e.target === call) call.style.display = 'none';
};

// Team carousel
const teamSlider = document.querySelector('.team-slider');
const teamMembers = document.querySelectorAll('.team-member');
const prevButton = document.querySelector('.team-prev');
const nextButton = document.querySelector('.team-next');
const dotsContainer = document.querySelector('.team-dots');

let currentTeamIndex = 0;

// Create dots
teamMembers.forEach((member, index) => {
  const dot = document.createElement('span');

  dot.classList.add('team-dot');

  if (index === 0) {
    dot.classList.add('active');
  }

  dot.addEventListener('click', () => {
    currentTeamIndex = index;
    scrollToTeamMember(index);
  });

  dotsContainer.appendChild(dot);
});

const teamDots = document.querySelectorAll('.team-dot');

// Scroll to a specific team member
function scrollToTeamMember(index) {
  const memberWidth = teamSlider.clientWidth;

  teamSlider.scrollTo({
    left: memberWidth * index,
    behavior: 'smooth',
  });

  updateTeamDots(index);
}

// Update active dot
function updateTeamDots(index) {
  teamDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// Next button
nextButton.addEventListener('click', () => {
  currentTeamIndex++;

  if (currentTeamIndex >= teamMembers.length) {
    currentTeamIndex = 0;
  }

  scrollToTeamMember(currentTeamIndex);
});

// Previous button
prevButton.addEventListener('click', () => {
  currentTeamIndex--;

  if (currentTeamIndex < 0) {
    currentTeamIndex = teamMembers.length - 1;
  }

  scrollToTeamMember(currentTeamIndex);
});

// Detect scrolling/swiping
teamSlider.addEventListener('scroll', () => {
  const index = Math.round(teamSlider.scrollLeft / teamSlider.clientWidth);

  if (index !== currentTeamIndex) {
    currentTeamIndex = index;
    updateTeamDots(currentTeamIndex);
  }
});
