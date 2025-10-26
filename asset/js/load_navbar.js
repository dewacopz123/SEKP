// load_navbar.js
// Usage: include this script in your page and add a placeholder element:
// <div id="navbar-placeholder" data-src="../Navbar/navbar.html"></div>
// The script will fetch the file and insert its #sidebar and .top-navbar into the document,
// stripping <html>/<head>/<body> wrappers and removing any <script> tags inside the fetched file.

(function(){
    async function loadNavbar(placeholder) {
        const src = placeholder.dataset.src;
        if (!src) return;
        try {
            const res = await fetch(src, {cache: 'no-store'});
            if (!res.ok) throw new Error('Failed to load: ' + res.status);
            const text = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // Remove any script tags from fetched document to avoid duplicate execution
            doc.querySelectorAll('script').forEach(s => s.remove());

            // Extract sidebar and top-navbar if present, otherwise insert body children
            const sidebar = doc.querySelector('#sidebar');
            const topnav = doc.querySelector('.top-navbar');

            if (sidebar) {
                placeholder.insertAdjacentElement('beforebegin', sidebar);
            }
            if (topnav) {
                // If there's a main-wrapper, insert topnav inside it before its current first child header
                // Default: insert topnav before the main-wrapper element so markup order stays similar
                placeholder.insertAdjacentElement('beforebegin', topnav);
            }

            // If neither found, insert all body children
            if (!sidebar && !topnav) {
                const bodyChildren = Array.from(doc.body.children);
                bodyChildren.forEach(child => placeholder.parentNode.insertBefore(child, placeholder));
            }

            // Remove the placeholder
            placeholder.remove();
        } catch (err) {
            console.error('load_navbar error:', err);
        }
    }

    // Auto-run for any placeholders found
    document.addEventListener('DOMContentLoaded', function(){
        const placeholders = document.querySelectorAll('#navbar-placeholder');
        placeholders.forEach(ph => loadNavbar(ph));
    });
})();
