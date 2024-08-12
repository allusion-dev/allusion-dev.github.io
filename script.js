// Function to scroll to a specific section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Event listeners for navigation buttons
document.getElementById('homeBtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    scrollToSection('homeSection');
});

document.getElementById('aboutBtn').addEventListener('click', function(event) {
    event.preventDefault();
    scrollToSection('aboutSection');
});

document.getElementById('projectsBtn').addEventListener('click', function(event) {
    event.preventDefault();
    scrollToSection('projectsSection');
});

document.getElementById('contactBtn').addEventListener('click', function(event) {
    event.preventDefault();
    scrollToSection('contactSection');
});
