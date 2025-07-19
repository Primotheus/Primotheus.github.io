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

projects.forEach((project, index) => {
	project.addEventListener('click', () => {
		if (project.classList.contains('center')) {
			// Retrieve project details
			const title = project.querySelector('h3')?.textContent || 'No Title';
			const description = project.querySelector('p')?.textContent || 'No Description';
			const imageUrl = project.querySelector('img')?.src || '';
			const projectUrl = `https://example.com/project${index + 1}`;
			const githubUrl = `https://github.com/example/project${index + 1}`;
			openModal(title, description, imageUrl, projectUrl, githubUrl);
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
		<span class="close-button">&times;</span>
		<img class="modal-image" src="" alt="Project Image">
		<h3 class="modal-title"></h3>
		<p class="modal-description"></p>
		<a class="modal-project-link" href="#" target="_blank">View Project</a>
		<a class="modal-github-link" href="#" target="_blank">View on GitHub</a>
	</div>
`;
document.body.appendChild(modal);

const closeButton = modal.querySelector('.close-button');
const modalTitle = modal.querySelector('.modal-title');
const modalDescription = modal.querySelector('.modal-description');
const modalImage = modal.querySelector('.modal-image');
const modalProjectLink = modal.querySelector('.modal-project-link');
const modalGitHubLink = modal.querySelector('.modal-github-link');

// Function to open modal
function openModal(title, description, imageUrl, projectUrl, githubUrl) {
	modalTitle.textContent = title;
	modalDescription.textContent = description;
	modalImage.src = imageUrl;
	modalProjectLink.href = projectUrl;
	modalGitHubLink.href = githubUrl;
	modal.style.display = 'flex'; // Use flex to center the modal
}

// Function to close modal
function closeModal() {
	modal.style.display = 'none';
}

// Close modal on clicking the close button or outside the modal
closeButton.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
	if (e.target === modal) {
		closeModal();
	}
});

updateCarousel(0);
