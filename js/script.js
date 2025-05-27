document.addEventListener('DOMContentLoaded', function() {

    // Initialize AOS (Animate On Scroll) Library
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true,    // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
    });

    // 1. Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-bs-theme', savedTheme);
        updateDarkModeToggleIcon(savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // If no preference saved, check system preference
        body.setAttribute('data-bs-theme', 'dark');
        updateDarkModeToggleIcon('dark');
    } else {
        body.setAttribute('data-bs-theme', 'light');
        updateDarkModeToggleIcon('light');
    }

    darkModeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-bs-theme') === 'dark') {
            body.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('theme', 'light');
            updateDarkModeToggleIcon('light');
        } else {
            body.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateDarkModeToggleIcon('dark');
        }
    });

    function updateDarkModeToggleIcon(theme) {
        const icon = darkModeToggle.querySelector('i');
        const textNode = darkModeToggle.childNodes[2]; // Target the text node after the icon
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            textNode.nodeValue = ' Light Mode'; // Update text
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            textNode.nodeValue = ' Dark Mode'; // Update text
        }
    }


    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close Bootstrap navbar toggler on click for small screens
            const navbarCollapse = document.getElementById('navbarResponsive');
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse); // Get Bootstrap Collapse instance
            if (navbarCollapse.classList.contains('show')) {
                bsCollapse.hide();
            }
        });
    });

    // 3. Navbar Shrink Effect
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) { // Adjust this value as needed
                mainNav.classList.add('navbar-shrink');
            } else {
                mainNav.classList.remove('navbar-shrink');
            }
        });
    }
});




// project filter start here 


document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Shrink the navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('mainNav');
        if (window.scrollY > 100) { // Adjust scroll threshold as needed
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
    });

    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        once: true, // Animation only once
        duration: 1000 // Animation duration
    });



    // Project Filtering Logic
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-card-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            this.classList.add('active');

            const filterCategory = this.dataset.filter; // Get the data-filter value (e.g., 'web-development', 'all')

            projectItems.forEach(item => {
                const itemCategories = item.dataset.category.split(' '); // Get all categories for this project

                if (filterCategory === 'all') {
                    item.classList.remove('hidden'); // Show all projects
                } else {
                    // Check if the project's categories include the selected filter category
                    if (itemCategories.includes(filterCategory)) {
                        item.classList.remove('hidden'); // Show matching projects
                    } else {
                        item.classList.add('hidden'); // Hide non-matching projects
                    }
                }
            });

            // Re-initialize AOS to animate newly visible elements
            AOS.refresh();
        });
    });

    // Optional: Trigger 'all' filter on initial load to ensure all projects are shown
    // Find the 'All' button and click it programmatically
    const allButton = document.querySelector('.project-filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.click();
    }
});