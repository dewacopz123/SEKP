document.addEventListener("DOMContentLoaded", function () {
    const btnAddJobdesk = document.getElementById("btnAddJobdesk");
    const btnEditJobdesk = document.getElementById("btnEditJobdesk");
    const btnAddJobdeskKaryawan = document.getElementById("btnAddJobdeskKaryawan");
    const popupContainer = document.getElementById("popupContainer");

    // Helper: remove modal by id if exists
    function removeModal(id) {
        const m = document.getElementById(id);
        if (m) m.remove();
    }

    // Helper: create modal element from html and id, return it
    function createModal(html, id) {
        removeModal(id);
        const modal = document.createElement("div");
        modal.id = id;
        modal.className = "modal"; // keep styling hooks
        modal.innerHTML = html;
        popupContainer.appendChild(modal);

        // Attach close handlers inside this modal only
        const closeBtns = modal.querySelectorAll("[data-close]");
        closeBtns.forEach(btn => btn.addEventListener("click", () => modal.remove()));

        return modal;
    }

    if (btnAddJobdesk) {
        btnAddJobdesk.addEventListener("click", async () => {
            try {
                const response = await fetch("../../Views/Jobdesk/formAddEdit.html");
                const html = await response.text();
                const modal = createModal(html, "modal-add");

                // Ensure the select inside the add modal is enabled (if present)
                const selectInside = modal.querySelector("#selectNamaKaryawan");
                if (selectInside) selectInside.disabled = false;
            } catch (err) {
                console.error("Gagal memuat form add:", err);
            }
        });
    }

    if (btnEditJobdesk) {
        btnEditJobdesk.addEventListener("click", async () => {
            try {
                const response = await fetch("../../Views/Jobdesk/formAddEdit.html");
                const html = await response.text();
                const modal = createModal(html, "modal-edit");

                // Disable the select inside the edit modal (if present)
                const idJobdeskElement = modal.querySelector("#idJobdesk");
                if (idJobdeskElement) {
                    idJobdeskElement.disabled = true;
                }

                // Optionally populate form fields for edit here...
            } catch (err) {
                console.error("Gagal memuat form edit:", err);
            }
        });
    }
    
    if (btnAddJobdeskKaryawan) {
        btnAddJobdeskKaryawan.addEventListener("click", async () => {
            try {
                const response = await fetch("../../Views/Jobdesk/addJobdeskKaryawan.html");
                const html = await response.text();
                const modal = createModal(html, "modal-edit");

                // Disable the select inside the edit modal (if present)
                const idJobdeskElement = modal.querySelector("#idJobdesk");
                if (idJobdeskElement) {
                    idJobdeskElement.hidden = true;
                    const labels = modal.querySelectorAll("label[for='idJobdesk']");
                    labels.forEach(label => label.hidden = true);
                }

                // Optionally populate form fields for edit here...
            } catch (err) {
                console.error("Gagal memuat form edit:", err);
            }
        });
    }
    
});
