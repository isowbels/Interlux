
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.menu-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

