// ==========================================================================
// DHRUV MEHARWAL — PORTFOLIO JAVASCRIPT
// Lightweight, clean, zero-bloat functionality
// ==========================================================================

// 1. Prevent unwanted auto-scrolling on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});

// 2. Theme Toggle (Dark / Light)
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

// Default to dark theme or user's stored preference
const savedTheme = localStorage.getItem('dhruv_theme') || 'dark';
htmlEl.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('dhruv_theme', newTheme);
        updateThemeIcon(newTheme);
        showToast(`Switched to ${newTheme} theme`);
    });
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;
    if (theme === 'light') {
        icon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
    } else {
        icon.innerHTML = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
    }
}

// 3. Work Category Filter
function filterWork(category, buttonEl) {
    // Update active filter chip state
    const chips = document.querySelectorAll('.filter-chip');
    chips.forEach(c => c.classList.remove('active'));
    if (buttonEl) buttonEl.classList.add('active');

    // Filter cards
    const cards = document.querySelectorAll('.sample-card');
    cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
            card.style.display = 'block';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.transition = 'opacity 0.25s ease';
                card.style.opacity = '1';
            }, 10);
        } else {
            card.style.display = 'none';
        }
    });
}

// 4. Quick Copy Helper
function copyText(text, message) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => showToast(message || "Copied to clipboard!"))
            .catch(() => fallbackCopy(text, message));
    } else {
        fallbackCopy(text, message);
    }
}

function fallbackCopy(text, message) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand("copy");
        showToast(message || "Copied to clipboard!");
    } catch (e) {
        showToast("Press Ctrl+C to copy");
    }
    document.body.removeChild(tempInput);
}

// 5. Toast Notification System
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2800);
}

// 6. Project Inquiry Form Handler
function handleInquirySubmit(event) {
    event.preventDefault();

    const name = document.getElementById('inqName').value.trim();
    const type = document.getElementById('inqType').value;
    const message = document.getElementById('inqMessage').value.trim();

    const subject = encodeURIComponent(`Project Inquiry from ${name} (${type})`);
    const body = encodeURIComponent(
        `Hi Dhruv,

I'm reaching out regarding a ${type} project.

Client / Channel: ${name}
Project Type    : ${type}

Project Details:
${message || '(No extra notes provided)'}

Looking forward to your reply!
Best regards,
${name}`
    );

    showToast("Opening email client...");
    setTimeout(() => {
        window.location.href = `mailto:dhruvmeh567@gmail.com?subject=${subject}&body=${body}`;
    }, 400);
}

// 7. Mobile Navigation Drawer Controls
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, #mobileCtaBtn');

function openMobileMenu() {
    if (!mobileMenuDrawer || !mobileMenuOverlay || !mobileMenuBtn) return;
    mobileMenuDrawer.classList.add('open');
    mobileMenuOverlay.classList.add('open');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenuDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    if (!mobileMenuDrawer || !mobileMenuOverlay || !mobileMenuBtn) return;
    mobileMenuDrawer.classList.remove('open');
    mobileMenuOverlay.classList.remove('open');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = mobileMenuDrawer.classList.contains('open');
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (mobileMenuDrawer && mobileMenuDrawer.classList.contains('open')) {
            closeMobileMenu();
        }
        if (mobileDetailModal && mobileDetailModal.classList.contains('open')) {
            closeSampleModal();
        }
    }
});

// 8. Mobile Sample Detail Modal Bottom-Sheet Controls
const mobileDetailModal = document.getElementById('mobileDetailModal');
const mobileDetailOverlay = document.getElementById('mobileDetailOverlay');
const modalBadge = document.getElementById('modalBadge');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

function openSampleModal(sampleId) {
    if (!mobileDetailModal || !mobileDetailOverlay) return;

    const detailsContainer = document.getElementById(`${sampleId}-details`);
    if (!detailsContainer) return;

    const sampleArticle = detailsContainer.closest('.sample-card');
    const badgeText = sampleArticle?.querySelector('.sample-badge')?.innerText || 'Writing Sample';
    const titleText = sampleArticle?.querySelector('h3')?.innerText || 'Script Details';

    if (modalBadge) modalBadge.innerText = badgeText;
    if (modalTitle) modalTitle.innerText = titleText;

    // Clone the full script and breakdown into modal body
    if (modalBody) {
        modalBody.innerHTML = detailsContainer.innerHTML;
    }

    mobileDetailModal.classList.add('open');
    mobileDetailOverlay.classList.add('open');
    mobileDetailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeSampleModal() {
    if (!mobileDetailModal || !mobileDetailOverlay) return;
    mobileDetailModal.classList.remove('open');
    mobileDetailOverlay.classList.remove('open');
    mobileDetailModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}
