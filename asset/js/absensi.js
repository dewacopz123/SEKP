document.addEventListener("DOMContentLoaded", function () {
    const popupContainer = document.getElementById("popupContainer");
    const btnMasuk = document.getElementById('btnMasuk');
    const btnSelesai = document.getElementById('btnSelesai');

    function removeModal(id) {
        const m = document.getElementById(id);
        if (m) m.remove();
    }
    function createModal(html, id) {
        removeModal(id);
        const modal = document.createElement("div");
        modal.id = id;
        modal.className = "modal";
        modal.innerHTML = html;
        popupContainer.appendChild(modal);

        const closeBtns = modal.querySelectorAll("[data-close]");
        closeBtns.forEach(btn => btn.addEventListener("click", () => modal.remove()));

        return modal;
    }

    const getAbsensiModalHTML = (title, actionId) => `
        <div class="modal-content">
            <span class="close-btn" data-close>&times;</span>
            <h2>Konfirmasi Absensi ${title}</h2>
            <p>Apakah Anda yakin ingin mencatat absensi ${title} sekarang?</p>
            <div class="modal-actions">
                <button type="button" class="btn btn-secondary" data-close>Batal</button>
                <button type="button" class="btn btn-primary" id="${actionId}">Konfirmasi</button>
            </div>
        </div>
    `;

    // 1. Modal Masuk Kerja
    if (btnMasuk) {
        btnMasuk.addEventListener('click', () => {
            const modal = createModal(getAbsensiModalHTML("Masuk Kerja", "confirmMasuk"), "modal-absensi-masuk");
            
            // Attach specific confirmation handler
            const confirmMasuk = modal.querySelector('#confirmMasuk');
            if (confirmMasuk) {
                confirmMasuk.addEventListener('click', () => {
                    alert('Absensi masuk berhasil dicatat!');
                    modal.remove(); 
                });
            }
        });
    }

    // 2. Modal Selesai Kerja
    if (btnSelesai) {
        btnSelesai.addEventListener('click', () => {
            const modal = createModal(getAbsensiModalHTML("Selesai Kerja", "confirmSelesai"), "modal-absensi-selesai");

            // Attach specific confirmation handler
            const confirmSelesai = modal.querySelector('#confirmSelesai');
            if (confirmSelesai) {
                confirmSelesai.addEventListener('click', () => {
                    alert('Absensi selesai kerja berhasil dicatat!');
                    modal.remove(); 
                });
            }
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal') && e.target.id.startsWith('modal-')) {
            e.target.remove();
        }
    });
});