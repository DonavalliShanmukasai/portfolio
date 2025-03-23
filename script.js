document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenuBtn = document.getElementById("close-menu-btn");
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    const navLinks = document.querySelectorAll('header nav a');
    const sections = document.querySelectorAll('section');
    const sidebarHeader = document.querySelector('.sidebar-header');
    const contentArea = document.querySelector('.content-area');

    if (!hamburgerBtn || !mobileMenu || !closeMenuBtn || !sidebarHeader || !contentArea) {
        console.error("One or more required elements not found:", {
            hamburgerBtn, mobileMenu, closeMenuBtn, sidebarHeader, contentArea
        });
        return;
    }

    function toggleMobileMenu() {
        mobileMenu.classList.toggle("hidden");
        sidebarHeader.classList.toggle("open");
        contentArea.classList.toggle("open");
    }

    hamburgerBtn.addEventListener("click", toggleMobileMenu);
    closeMenuBtn.addEventListener("click", toggleMobileMenu);

    mobileMenuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            toggleMobileMenu();
        });
    });

    document.addEventListener('click', (event) => {
        if (!mobileMenu.classList.contains('hidden') && !mobileMenu.contains(event.target) && event.target !== hamburgerBtn) {
            toggleMobileMenu();
        }
    });

    function updateActiveNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const offsetAdjustment = window.innerWidth < 768 ? 50 : 100;
            if (window.scrollY >= sectionTop - offsetAdjustment && window.scrollY < sectionTop + sectionHeight - offsetAdjustment) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});