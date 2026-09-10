/**
 * Harsh Jaiswar - Portfolio Interactive Logic
 * Clean, production-grade Vanilla JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. Toast Notification System
  // ------------------------------------------------------------------------
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  let toastTimer = null;

  function showToast(message, duration = 3000) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  }

  // ------------------------------------------------------------------------
  // 2. Clipboard Copy Helpers
  // ------------------------------------------------------------------------
  async function copyTextToClipboard(
    text,
    successMessage = "Copied to clipboard!",
  ) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-https or older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }
      showToast(successMessage);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      showToast("Copy failed. Please manually select and copy.");
    }
  }

  // Email row copy
  const emailRow = document.getElementById("contact-email-row");
  if (emailRow) {
    emailRow.addEventListener("click", (e) => {
      const email =
        emailRow.getAttribute("data-copy-val") || "harshjaiswar1928@gmail.com";
      copyTextToClipboard(email, "Email copied: " + email);
    });
  }

  // Terminal code copy button
  const copyCodeBtn = document.getElementById("copy-code-btn");
  const codeSnippet = document.getElementById("code-snippet");
  if (copyCodeBtn && codeSnippet) {
    copyCodeBtn.addEventListener("click", () => {
      copyTextToClipboard(codeSnippet.innerText, "Developer snippet copied!");
    });
  }

  // ------------------------------------------------------------------------
  // 3. Top Navigation Bar Scroll Effect
  // ------------------------------------------------------------------------
  const topNav = document.getElementById("top-nav");
  window.addEventListener(
    "scroll",
    () => {
      if (!topNav) return;
      if (window.scrollY > 20) {
        topNav.classList.add("scrolled");
      } else {
        topNav.classList.remove("scrolled");
      }
    },
    { passive: true },
  );

  // ------------------------------------------------------------------------
  // 4. Navigation & Scrollspy (Mobile Dock & Desktop Nav Links)
  // ------------------------------------------------------------------------
  const dockItems = document.querySelectorAll(".dock-item");
  const desktopNavLinks = document.querySelectorAll(".desktop-nav-link");
  const observedSections = [
    "about",
    "skills",
    "experience",
    "projects",
    "education",
    "contact",
  ]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  }

  // Smooth scroll handler for desktop nav links
  desktopNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href")?.replace("#", "");
      if (targetId) {
        e.preventDefault();
        scrollToSection(targetId);
        desktopNavLinks.forEach((l) => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // Smooth scroll handler for dock items
  dockItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const targetId = item.getAttribute("href")?.replace("#", "");
      if (targetId) {
        e.preventDefault();
        scrollToSection(targetId);
        dockItems.forEach((d) => d.classList.remove("active"));
        item.classList.add("active");
      }
    });
  });

  // IntersectionObserver for active section highlight
  if ("IntersectionObserver" in window && observedSections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -55% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("id");
          dockItems.forEach((item) => {
            if (item.getAttribute("data-section") === sectionId) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });
          desktopNavLinks.forEach((link) => {
            if (link.getAttribute("data-section") === sectionId) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
        }
      });
    }, observerOptions);

    observedSections.forEach((section) => sectionObserver.observe(section));
  }

  // ------------------------------------------------------------------------
  // 5. Back to Top Button
  // ------------------------------------------------------------------------
  const backToTopBtn = document.getElementById("btn-back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ------------------------------------------------------------------------
  // 6. Project Modal / Lightbox Details Data
  // ------------------------------------------------------------------------
  const projectsData = {
    1: {
      title: "Sales Performance Dashboard",
      category: "Power BI • Excel • Data Analytics",
      image: "assets/images/project-sales-dashboard.jpg",
      description:
        "Interactive sales monitoring dashboard tracking monthly KPIs, regional distribution patterns, and customer conversion rates for strategic evaluation.",
      highlights: [
        "Consolidated multi-region transaction logs into clean, unified data pipelines.",
        "Engineered DAX formulas for Year-over-Year (YoY) revenue and margin trends.",
        "Interactive cross-filtering by product line, sales reps, and customer tiers.",
      ],
      techStack: ["Power BI", "Microsoft Excel", "DAX", "Data Modeling", "ETL"],
      codeUrl: "https://github.com/harshjaiswar1928",
      demoUrl: "#contact",
    },
    2: {
      title: "MySQL Data Analysis Suite",
      category: "SQL • MySQL • Database Design",
      image: "assets/images/project-mysql-suite.jpg",
      description:
        "Normalized database schema design and comprehensive relational query collection optimized for sales transactions, user telemetry, and BI data extraction.",
      highlights: [
        "Implemented 3NF normalization reducing storage redundancy by 35%.",
        "Crafted optimized multi-table JOINs, subqueries, and window analytical functions.",
        "Built automated stored procedures and triggers for audit logging and integrity.",
      ],
      techStack: [
        "MySQL",
        "Relational Database Design",
        "SQL Indexing",
        "Stored Procedures",
      ],
      codeUrl: "https://github.com/harshjaiswar1928",
      demoUrl: "#contact",
    },
    3: {
      title: "Gym Management System",
      category: "C++ • OOP Architecture • Console App",
      image: "assets/images/project-gym-system.jpg",
      description:
        "Robust command-line application built with C++ implementing object-oriented concepts to manage member records, subscription plans, and fee transactions.",
      highlights: [
        "Designed modular classes leveraging encapsulation, inheritance, and polymorphism.",
        "Implemented persistent binary file I/O streams for fast transaction records.",
        "Includes input sanitization, automated expiry alerts, and search by membership ID.",
      ],
      techStack: [
        "C++",
        "Object-Oriented Programming (OOP)",
        "File Handling",
        "Data Structures",
      ],
      codeUrl: "https://github.com/harshjaiswar1928",
      demoUrl: "#contact",
    },
    4: {
      title: "FreshMart – Online Grocery Interface",
      category: "HTML • CSS • JavaScript • Responsive UI",
      image: "assets/images/project-freshmart.jpg",
      description:
        "Sleek, responsive e-commerce web interface featuring intuitive product catalog browsing, shopping cart state management, and an express checkout simulation.",
      highlights: [
        "Mobile-first responsive architecture tested across varying viewport breakpoints.",
        "Dynamic cart state with live badge counter and pricing calculation in Vanilla JS.",
        "Accessible semantic elements, smooth micro-interactions, and instant search filter.",
      ],
      techStack: [
        "HTML5",
        "Vanilla CSS3",
        "JavaScript",
        "Responsive Design",
        "UI/UX",
      ],
      codeUrl: "https://github.com/harshjaiswar1928",
      demoUrl: "#contact",
    },
  };

  const modalOverlay = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const modalBody = document.getElementById("modal-body");

  function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project || !modalOverlay || !modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 16px;">
        <img src="${project.image}" alt="${project.title}" style="width: 100%; aspect-ratio: 16/9; object-fit: cover; border-radius: 12px; margin-bottom: 14px; border: 1px solid var(--border-subtle);">
        <span style="font-size: 0.72rem; font-weight: 700; color: var(--cyan-accent); letter-spacing: 0.04em;">${project.category}</span>
        <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary); margin: 6px 0 10px 0;">${project.title}</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 14px;">${project.description}</p>
        
        <h4 style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Key Implementation Highlights:</h4>
        <ul style="list-style: none; padding: 0; margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px;">
          ${project.highlights
            .map(
              (h) => `
            <li style="display: flex; align-items: flex-start; gap: 8px; font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
              <i class="fa-solid fa-circle-check" style="color: var(--emerald-green); font-size: 0.85rem; margin-top: 3px;"></i>
              <span>${h}</span>
            </li>
          `,
            )
            .join("")}
        </ul>

        <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 20px;">
          ${project.techStack.map((t) => `<span class="tech-pill">${t}</span>`).join("")}
        </div>

        <div style="display: flex; gap: 12px; border-top: 1px solid var(--border-subtle); padding-top: 16px;">
          <a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1;">
            <i class="fa-brands fa-github"></i> GitHub Code
          </a>
          <a href="${project.demoUrl}" class="btn btn-secondary" style="flex: 1;" onclick="document.getElementById('modal-close').click();">
            <i class="fa-solid fa-envelope"></i> Inquire
          </a>
        </div>
      </div>
    `;

    modalOverlay.classList.add("active");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // prevent background scrolling
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("active");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      modalOverlay &&
      modalOverlay.classList.contains("active")
    ) {
      closeModal();
    }
  });

  // Attach modal trigger to project cards
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    const projectId = card.getAttribute("data-project-id");
    const mediaWrap = card.querySelector(".project-media-wrap");
    const title = card.querySelector(".project-title");

    if (mediaWrap) {
      mediaWrap.style.cursor = "pointer";
      mediaWrap.addEventListener("click", () => openProjectModal(projectId));
    }
    if (title) {
      title.style.cursor = "pointer";
      title.addEventListener("click", () => openProjectModal(projectId));
    }
  });

  // ------------------------------------------------------------------------
  // 7. Theme / Action Button (Quick Connect / Status)
  // ------------------------------------------------------------------------
  const btnThemeToggle = document.getElementById("btn-theme-toggle");
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener("click", () => {
      showToast(
        "Harsh Jaiswar: Open to Web Dev & Analytics Opportunities!",
        4000,
      );
    });
  }

  console.log("Harsh Jaiswar Portfolio initialized successfully.");
});
