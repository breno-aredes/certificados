const certificatesData = [
  {
    id: 1,
    title: "Certificado de GitHub Copilot",
    date: "Junho de 2025",
    description:
      "Aprendizagem prática sobre integração do GitHub Copilot, técnicas de refatoração, produtividade com IA e desenvolvimento de projetos, além de mentorias ao vivo e networking com profissionais da área.",
    image: "public/certificates/Breno-Matias-Aredes-Rocha-PWVYRCKI.png",
  },
  {
    id: 2,
    title: "Certificado de interfaces estáticas",
    date: "Novembro de 2022",
    description:
      "Certificado abrangendo front-end com interfaces estáticas utilizando HTML, CSS e JavaScript, além de fundamentos da computação, incluindo algoritmos e lógica de programação.",
    image: "public/certificates/Breno-Matias-Aredes-Rocha-01.png",
  },
];

const certificatesGrid = document.getElementById("certificatesGrid");
const modal = document.getElementById("certificateModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDate = document.getElementById("modalDate");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.querySelector(".close");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");

document.addEventListener("DOMContentLoaded", function () {
  loadCertificates();
  initializeNavigation();
  initializeModal();
  initializeSmoothScrolling();
});

function loadCertificates() {
  if (certificatesData.length === 0) {
    showEmptyState();
    return;
  }

  certificatesGrid.innerHTML = "";

  certificatesData.forEach((certificate, index) => {
    const certificateCard = createCertificateCard(certificate, index);
    certificatesGrid.appendChild(certificateCard);
  });
}

function createCertificateCard(certificate, index) {
  const card = document.createElement("div");
  card.className = "certificate-card";
  card.style.animationDelay = `${index * 0.1}s`;

  card.innerHTML = `
        <img src="${certificate.image}" alt="${certificate.title}" class="certificate-image" onerror="handleImageError(this)">
        <div class="certificate-content">
            <h3 class="certificate-title">${certificate.title}</h3>
            <p class="certificate-date">
                <i class="fas fa-calendar"></i> ${certificate.date}
            </p>
            <p class="certificate-description">${certificate.description}</p>
        </div>
    `;

  card.addEventListener("click", () => openModal(certificate));

  return card;
}

function handleImageError(img) {
  img.src =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjhGQUZDIi8+CjxwYXRoIGQ9Ik0xMjAgODBIMTgwVjEyMEgxMjBWODBaIiBmaWxsPSIjRTJFOEYwIi8+CjxwYXRoIGQ9Ik0xMzAgMTAwSDEwMFYxMTBIMTMwVjEwMFoiIGZpbGw9IiNFMkU4RjAiLz4KPHBhdGggZD0iTTE3MCA5MEgxNDBWMTAwSDE3MFY5MFoiIGZpbGw9IiNFMkU4RjAiLz4KPHRleHQgeD0iMTUwIiB5PSIxNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NDc0OEIiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjUwMCI+Q2VydGlmaWNhdGU8L3RleHQ+Cjx0ZXh0IHg9IjE1MCIgeT0iMTcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhCIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPkltYWdlbSBuw6NvIGVuY29udHJhZGE8L3RleHQ+Cjwvc3ZnPgo=";
  img.alt = "Certificado - Imagem não encontrada";
}

function showEmptyState() {
  certificatesGrid.innerHTML = `
        <div class="certificate-placeholder">
            <div class="placeholder-icon">
                <i class="fas fa-certificate"></i>
            </div>
            <h3>Nenhum certificado encontrado</h3>
            <p>Adicione seus certificados editando o arquivo script.js e colocando as imagens na pasta public/certificates/</p>
            <div style="margin-top: 2rem; padding: 1rem; background: #f1f5f9; border-radius: 8px; text-align: left; max-width: 600px; margin-left: auto; margin-right: auto;">
                <h4 style="margin-bottom: 1rem; color: #1e293b;">Como adicionar certificados:</h4>
                <ol style="color: #64748b; line-height: 1.6;">
                    <li>Coloque suas imagens de certificados na pasta <code>public/certificates/</code></li>
                    <li>Edite o arquivo <code>script.js</code></li>
                    <li>Adicione seus certificados ao array <code>certificatesData</code></li>
                    <li>Recarregue a página para ver os certificados</li>
                </ol>
            </div>
        </div>
    `;
}

function initializeNavigation() {
  mobileMenuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.classList.remove("active");
    });
  });

  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "none";
    }
  });
}

function initializeModal() {
  closeModal.addEventListener("click", closeModalHandler);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModalHandler();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModalHandler();
    }
  });
}

function openModal(certificate) {
  modalImage.src = certificate.image;
  modalImage.alt = certificate.title;
  modalTitle.textContent = certificate.title;
  modalDate.textContent = certificate.date;
  modalDescription.textContent = certificate.description;

  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  requestAnimationFrame(() => {
    modal.style.opacity = "1";
  });
}

function closeModalHandler() {
  modal.style.opacity = "0";

  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }, 300);
}

function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

function addCertificate(title, date, description, imagePath) {
  const newCertificate = {
    id: certificatesData.length + 1,
    title: title,
    date: date,
    description: description,
    image: imagePath,
  };

  certificatesData.push(newCertificate);
  loadCertificates();

  console.log("Certificate added:", newCertificate);
}

function clearCertificates() {
  certificatesData.length = 0;
  loadCertificates();
  console.log("All certificates cleared");
}

console.log("=== Breno Matias Aredes Rocha - Certificate Portfolio ===");
console.log(
  "To add certificates, edit the certificatesData array in script.js"
);
console.log(
  'Or use: addCertificate("Title", "Date", "Description", "public/certificates/image.jpg")'
);
console.log("To clear all: clearCertificates()");

function initializeLazyLoading() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

document.addEventListener("DOMContentLoaded", initializeLazyLoading);
