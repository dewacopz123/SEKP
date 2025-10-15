document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebar-toggle');
    const mainWrapper = document.getElementById('main-wrapper');

    // Tambahkan class 'collapsed' secara default saat halaman dimuat
    // sidebar.classList.add('collapsed');

    toggleButton.addEventListener('click', () => {
        // Toggle class 'collapsed' pada sidebar
        sidebar.classList.toggle('collapsed');
        
        // Opsional: Toggle icon di tombol toggle
        const icon = toggleButton.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-arrow-right'); // Contoh ikon menyusut
        } else {
            icon.classList.remove('fa-arrow-right');
            icon.classList.add('fa-bars'); // Contoh ikon penuh
        }
    });
});