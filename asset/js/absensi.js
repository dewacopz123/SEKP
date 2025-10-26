document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebar-toggle');
    const mainWrapper = document.getElementById('main-wrapper');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        
        const icon = toggleButton.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-arrow-right');
        } else {
            icon.classList.remove('fa-arrow-right');
            icon.classList.add('fa-bars');
        }
    });
});