const projects = document.querySelectorAll('.project');
const dots = document.querySelectorAll('.dot');
const leftButton = document.getElementById('prevBtn');
const rightButton = document.getElementById('nextBtn');

let currentProject = 0;
let isAnimating = false;

function updateCarousel(newIndex) {
	if (isAnimating) return;
	isAnimating = true;

	currentProject = (newIndex + projects.length) % projects.length;

	projects.forEach((project, index) => {
		project.classList.remove('center', 'left', 'right', 'hidden');
		const position = (index - currentProject + projects.length) % projects.length;

		if (position === 0) {
			project.classList.add('center');
		} else if (position === 1) {
			project.classList.add('right');
		} else if (position === projects.length - 1) {
			project.classList.add('left');
		} else {
			project.classList.add('hidden');
		}
	});


	dots.forEach((dot, index) => {
		if (index === currentProject) {
			dot.classList.add('active');
		} else {
			dot.classList.remove('active');
		}
	});

	setTimeout(() => {
		isAnimating = false;
	}, 500);
}

leftButton.addEventListener('click', () => {
	updateCarousel(currentProject - 1);
});

rightButton.addEventListener('click', () => {
	updateCarousel(currentProject + 1);
});

dots.forEach((dot, index) => {
	dot.addEventListener('click', () => {
		updateCarousel(index);
	});
});

// Sample project data for better modal content
const projectData = [
	{
		title: "E-Commerce Platform",
		description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, and admin dashboard for inventory management. The platform supports responsive design and includes advanced search and filtering capabilities.",
		imageUrl: "https://plus.unsplash.com/premium_photo-1748218891210-3610f2e11a12?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		projectUrl: "https://example.com/ecommerce-platform",
		githubUrl: "https://github.com/example/ecommerce-platform"
	},
	{
		title: "Task Management App",
		description: "A collaborative task management application with real-time updates using Socket.io. Built with Vue.js frontend and Express.js backend. Features include drag-and-drop task organization, team collaboration, file attachments, progress tracking, and mobile-responsive design.",
		imageUrl: "https://plus.unsplash.com/premium_photo-1661290256778-3b821d52c514?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvamVjdHxlbnwwfHwwfHx8MA%3D%3D",
		projectUrl: "https://example.com/task-manager",
		githubUrl: "https://github.com/example/task-manager"
	},
	{
		title: "Weather Dashboard",
		description: "A beautiful weather dashboard that displays current weather conditions and forecasts using OpenWeatherMap API. Built with vanilla JavaScript and CSS Grid. Features include location-based weather, 7-day forecast, weather alerts, and customizable themes based on weather conditions.",
		imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvamVjdHxlbnwwfHwwfHx8MA%3D%3D",
		projectUrl: "https://example.com/weather-dashboard",
		githubUrl: "https://github.com/example/weather-dashboard"
	},
	{
		title: "Portfolio Website",
		description: "A modern, responsive portfolio website showcasing my projects and skills. Built with HTML5, CSS3, and JavaScript. Features include smooth animations, interactive project carousel, contact form with validation, and SEO optimization. The design focuses on clean aesthetics and excellent user experience.",
		imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvamVjdHxlbnwwfHwwfHx8MA%3D%3D",
		projectUrl: "https://example.com/portfolio",
		githubUrl: "https://github.com/example/portfolio"
	}
];

projects.forEach((project, index) => {
	project.addEventListener('click', () => {
		if (project.classList.contains('center')) {
			// Use sample project data
			const data = projectData[index] || {
				title: project.querySelector('h3')?.textContent || 'No Title',
				description: project.querySelector('p')?.textContent || 'No Description',
				imageUrl: project.querySelector('img')?.src || '',
				projectUrl: `https://example.com/project${index + 1}`,
				githubUrl: `https://github.com/example/project${index + 1}`
			};
			openModal(data.title, data.description, data.imageUrl, data.projectUrl, data.githubUrl);
		} else {
			updateCarousel(index);
		}
	});
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		updateCarousel(currentProject - 1);
	} else if (e.key === "ArrowRight") {
		updateCarousel(currentProject + 1);
	} else if (e.key === 'Escape' && modal.style.display === 'flex') {
		closeModal();
	}
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const swipeThreshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > swipeThreshold) {
		if (diff > 0) {
			updateCarousel(currentIndex + 1);
		} else {
			updateCarousel(currentIndex - 1);
		}
	}
}

// Create modal elements
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
	<div class="modal-content">
		<div class="modal-header">
			<button class="close-button" aria-label="Close modal">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
			<h3 class="modal-title"></h3>
		</div>
		<div class="modal-body">
			<div class="modal-image-container">
				<img class="modal-image" src="" alt="Project Image">
			</div>
			<p class="modal-description"></p>
			<div class="modal-links">
				<a class="modal-project-link" href="#" target="_blank" rel="noopener noreferrer">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
						<polyline points="15,3 21,3 21,9"></polyline>
						<line x1="10" y1="14" x2="21" y2="3"></line>
					</svg>
					View Project
				</a>
				<a class="modal-github-link" href="#" target="_blank" rel="noopener noreferrer">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
					</svg>
					View on GitHub
				</a>
			</div>
		</div>
	</div>
`;
document.body.appendChild(modal);

const closeButton = modal.querySelector('.close-button');
const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.modal-description');
const modalImage = modal.querySelector('.modal-image');
const modalProjectLink = modal.querySelector('.modal-project-link');
const modalGitHubLink = modal.querySelector('.modal-github-link');

// Function to open modal with smooth animation
function openModal(title, description, imageUrl, projectUrl, githubUrl) {
	modalTitle.textContent = title;
	modalDescription.textContent = description;
	modalImage.src = imageUrl;
	modalProjectLink.href = projectUrl;
	modalGitHubLink.href = githubUrl;
	
	// Show modal with animation
	modal.style.display = 'flex';
	// Trigger reflow to ensure display: flex is applied
	modal.offsetHeight;
	modal.classList.add('show');
	
	// Prevent body scroll when modal is open
	document.body.style.overflow = 'hidden';
}

// Function to close modal with smooth animation
function closeModal() {
	modal.classList.remove('show');
	
	// Wait for animation to complete before hiding
	setTimeout(() => {
		modal.style.display = 'none';
		// Restore body scroll
		document.body.style.overflow = '';
	}, 300);
}

// Close modal on clicking the close button or outside the modal
closeButton.addEventListener('click', closeModal);

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		closeModal();
	}
});



updateCarousel(0);

// Scroll animations and sticky navigation
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('h1, h2, .main-frame, .carousel-container, .contact-frame');

// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// Function to handle scroll animations
function handleScrollAnimations() {
    sections.forEach(section => {
        if (isInViewport(section)) {
            section.classList.add('animate');
        }
    });
}

// Function to handle sticky navigation
function handleStickyNav() {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = nav.offsetHeight + 40; // Account for sticky nav height
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll event listeners
window.addEventListener('scroll', () => {
    handleScrollAnimations();
    handleStickyNav();
});

// Trigger initial animations
window.addEventListener('load', () => {
    handleScrollAnimations();
    handleStickyNav();
});
