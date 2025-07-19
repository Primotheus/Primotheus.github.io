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
		updateCarousel(index);
	});
});

document.addEventListener("keydown", (e) => {
	if (e.key === "ArrowLeft") {
		updateCarousel(currentProject - 1);
	} else if (e.key === "ArrowRight") {
		updateCarousel(currentProject + 1);
	}
});

updateCarousel(0);
