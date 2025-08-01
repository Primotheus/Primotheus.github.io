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
		title: "Honkai: Star Rail Soundboard",
		description: "A fully customizable web-based soundboard designed to play audio files, mainly voicelines from the game Honkai: Star Rail.",
		imageUrl: "asset/hsrsoundboard.png",
		projectUrl: "https://example.com/ecommerce-platform",
		githubUrl: "https://github.com/example/ecommerce-platform"
	},
	{
		title: "Chrome Extension",
		description: "Placeholder",
		imageUrl: "asset/chromeextension.png",
		projectUrl: "https://example.com/task-manager",
		githubUrl: "https://github.com/example/task-manager"
	},
	{
		title: "Personality Quiz",
		description: "A very simple JS response test, masked as a personality quiz for the game Honkai: Star Rail.",
		imageUrl: "asset/personalityquiz.png",
		projectUrl: "https://example.com/weather-dashboard",
		githubUrl: "https://github.com/example/weather-dashboard"
	},
	{
		title: "Personal Portfolio Website",
		description: "Personal Portfolio made by myself as a product for Algorithmics frontend web design course, used to showcase the techniques and skils I have learnt throughout the course and display my projects.",
		imageUrl: "asset/portfolio.png",
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


// Function to apply theme-specific styling to modals
function applyModalTheme(projectIndex) {
	const modalContent = modal.querySelector('.modal-content');
	const modalHeader = modal.querySelector('.modal-header');
	const modalBody = modal.querySelector('.modal-body');
	
	// Reset previous theme classes
	modalContent.className = 'modal-content';
	modalHeader.className = 'modal-header';
	modalBody.className = 'modal-body';
	
	switch(projectIndex) {
		case 0:
			modalContent.classList.add('modal-theme-space');
			modalHeader.classList.add('modal-header-space');
			modalBody.classList.add('modal-body-space');
			break;
		case 1:
			modalContent.classList.add('modal-theme-nature');
			modalHeader.classList.add('modal-header-nature');
			modalBody.classList.add('modal-body-nature');
			break;
		case 2:
			modalContent.classList.add('modal-theme-dark');
			modalHeader.classList.add('modal-header-dark');
			modalBody.classList.add('modal-body-dark');
			break;
		case 3:
			modalContent.classList.add('modal-theme-icy');
			modalHeader.classList.add('modal-header-icy');
			modalBody.classList.add('modal-body-icy');
			break;
		default:
			break;
	}
}


// Function to open modal with smooth animation
function openModal(title, description, imageUrl, projectUrl, githubUrl, projectIndex) {
	modalTitle.textContent = title;
	modalDescription.textContent = description;
	modalImage.src = imageUrl;
	modalProjectLink.href = projectUrl;
	modalGitHubLink.href = githubUrl;
	
	applyModalTheme(projectIndex);
	
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

// UPDATED PROJECT CLICK HANDLER TO PASS PROJECT INDEX
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
			// Pass the project index to openModal - THIS WAS THE KEY FIX
			openModal(data.title, data.description, data.imageUrl, data.projectUrl, data.githubUrl, index);
		} else {
			updateCarousel(index);
		}
	});
});

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
