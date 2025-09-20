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

    // Hobbies Section Interactive Features
    initializeHobbiesSection();
});

// Hobbies Section Functions
function initializeHobbiesSection() {
    // Animate numbers when hobbies section comes into view
    const hobbySection = document.getElementById('hobbies');
    if (hobbySection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(hobbySection);
    }

    // Hobby card click handlers
    const hobbyButtons = document.querySelectorAll('.hobby-btn');
    hobbyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const hobbyCard = this.closest('.hobby-card');
            const hobbyType = hobbyCard.dataset.hobby;
            showHobbyModal(hobbyType);
        });
    });

    // Hobby card hover effects
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        stat.classList.add('counting');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

function showHobbyModal(hobbyType) {
    const modal = new bootstrap.Modal(document.getElementById('hobbyModal'));
    const modalTitle = document.getElementById('hobbyModalTitle');
    const modalBody = document.getElementById('hobbyModalBody');
    
    const hobbyData = {
        coding: {
            title: 'Coding & Development',
            content: `
                <div class="text-center mb-4">
                    <i class="fas fa-code fa-5x text-primary mb-3"></i>
                </div>
                <h5>My Programming Journey</h5>
                <p>Coding is more than just a profession for me—it's a creative outlet and a way to solve real-world problems. I started my journey with basic programming concepts and have evolved to work with multiple languages and frameworks.</p>
                
                <h6 class="mt-4">Favorite Programming Languages:</h6>
                <ul class="list-unstyled">
                    <li><i class="fab fa-java text-warning"></i> Java - For robust applications</li>
                    <li><i class="fab fa-python text-success"></i> Python - For data analysis and AI</li>
                    <li><i class="fab fa-js text-warning"></i> JavaScript - For web development</li>
                    <li><i class="fas fa-hashtag text-info"></i> C# - For desktop applications</li>
                </ul>
                
                <h6 class="mt-4">Competitive Programming:</h6>
                <p>I actively participate in competitive programming to sharpen my problem-solving skills and algorithmic thinking:</p>
                <div class="row text-center mb-3">
                    <div class="col-md-4 mb-2">
                        <a href="https://leetcode.com/u/AmbadasGanapa/" target="_blank" class="btn btn-outline-warning btn-sm w-100">
                            <i class="fas fa-code"></i> LeetCode
                        </a>
                    </div>
                    <div class="col-md-4 mb-2">
                        <a href="https://www.geeksforgeeks.org/user/ambadasganapa31/" target="_blank" class="btn btn-outline-success btn-sm w-100">
                            <i class="fas fa-brain"></i> GeeksforGeeks
                        </a>
                    </div>
                    <div class="col-md-4 mb-2">
                        <a href="https://www.hackerrank.com/profile/ambadasganapa31" target="_blank" class="btn btn-outline-info btn-sm w-100">
                            <i class="fas fa-laptop-code"></i> HackerRank
                        </a>
                    </div>
                      <div class="col-md-4 mb-2">
                        <a href="https://github.com/AmbadasGanapa/" target="_blank" class="btn btn-outline-info btn-sm w-100">
                            <i class="fas fa-github"></i> Github
                        </a>
                    </div>
                </div>
                
                <h6 class="mt-4">Current Focus:</h6>
                <p>I'm currently exploring AI and machine learning, building data-driven applications, and contributing to open-source projects. My goal is to create software that makes a positive impact on people's lives.</p>
                
            `
        },
        cricket: {
            title: 'Playing Cricket',
            content: `
                <div class="text-center mb-4">
                    <i class="fas fa-baseball-ball fa-5x text-primary mb-3"></i>
                </div>
                <h5>My Love for Cricket</h5>
                <p>Cricket has been a significant part of my life for over few years. It's taught me valuable lessons about teamwork, strategy, patience, and handling pressure—skills that translate well into my professional life.</p>
                
                <h6 class="mt-4">Playing Style:</h6>
                <ul class="list-unstyled">
                    <li><i class="fas fa-baseball-ball text-primary"></i> Position: All-rounder</li>
                    <li><i class="fas fa-running text-success"></i> Batting: Right-handed</li>
                    <li><i class="fas fa-hand-paper text-warning"></i> Bowling: Medium pace</li>
                    <li><i class="fas fa-shield-alt text-info"></i> Fielding: Versatile positions</li>
                </ul>
                
               
                <h6 class="mt-4">Favorite Cricket Moments:</h6>
                <p>I like to watch the India matches againt with other teams. I also like IPL seasons. I enjoy analyzing match strategies and player performances, which has enhanced my analytical thinking skills.</p>
            `
        },
        travelling: {
            title: 'Travelling & Exploring',
            content: `
                <div class="text-center mb-4">
                    <i class="fas fa-plane fa-5x text-primary mb-3"></i>
                </div>
                <h5>Exploring the World</h5>
                <p>Travel has always fascinated me. Each journey brings new perspectives, cultural insights, and unforgettable experiences. I believe that traveling broadens the mind and inspires creativity in both personal and professional endeavors.</p>
                
                <h6 class="mt-4">Travel Philosophy:</h6>
                <ul class="list-unstyled">
                    <li><i class="fas fa-camera text-primary"></i> Capture memories, not just photos</li>
                    <li><i class="fas fa-users text-success"></i> Connect with local people and cultures</li>
                    <li><i class="fas fa-mountain text-warning"></i> Seek adventure and new experiences</li>
                    <li><i class="fas fa-book text-info"></i> Learn something new from every place</li>
                </ul>
                
                <h6 class="mt-4">Memorable Destinations:</h6>
                <p>From the small villages to the majestic mountains,temples, each place has left a lasting impression. I enjoy both planned trips and spontaneous adventures.</p>
                
                <h6 class="mt-4">Dream Destinations:</h6>
                <p>Traveling abroad is at the top of my bucket list, particularly drawn to destinations like Japan, with its fascinating mix of tradition and cutting-edge technology, and Iceland, renowned for its breathtaking natural landscapes. </p>
                
                <h6 class="mt-4">Travel & Technology:</h6>
                <p>I love using technology to enhance my travel experiences—from planning routes with apps to capturing moments with photography, and even working remotely from beautiful locations.</p>
            `
        }
    };
    
    const data = hobbyData[hobbyType];
    if (data) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        modal.show();
    }
}