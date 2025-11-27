// December-specific JS: modal open/close helpers and collapse handling

// Attempt to reuse global openModal/closeModal if present, otherwise provide local fallback
const openModalDecGame = () => {
    if (typeof openModal === 'function') return openModal('modalDecGame', 'dec-game-iframe');
    openModalDec('modalDecGame', 'dec-game-iframe');
};
const openModalDecQuiz1 = () => {
    if (typeof openModal === 'function') return openModal('modalDecQuiz1', 'dec-quiz-1-iframe');
    openModalDec('modalDecQuiz1', 'dec-quiz-1-iframe');
};
const openModalDecQuiz2 = () => {
    if (typeof openModal === 'function') return openModal('modalDecQuiz2', 'dec-quiz-2-iframe');
    openModalDec('modalDecQuiz2', 'dec-quiz-2-iframe');
};
const openModalDecQuiz3 = () => {
    if (typeof openModal === 'function') return openModal('modalDecQuiz3', 'dec-quiz-3-iframe');
    openModalDec('modalDecQuiz3', 'dec-quiz-3-iframe');
};
const openModalDecQuiz4 = () => {
    if (typeof openModal === 'function') return openModal('modalDecQuiz4', 'dec-quiz-4-iframe');
    openModalDec('modalDecQuiz4', 'dec-quiz-4-iframe');
};

const closeModalDecGame = () => {
    if (typeof closeModal === 'function') return closeModal('modalDecGame');
    const m = document.getElementById('modalDecGame'); if (m) m.close();
};
const closeModalDecQuiz1 = () => { if (typeof closeModal === 'function') return closeModal('modalDecQuiz1'); const m = document.getElementById('modalDecQuiz1'); if (m) m.close(); };
const closeModalDecQuiz2 = () => { if (typeof closeModal === 'function') return closeModal('modalDecQuiz2'); const m = document.getElementById('modalDecQuiz2'); if (m) m.close(); };
const closeModalDecQuiz3 = () => { if (typeof closeModal === 'function') return closeModal('modalDecQuiz3'); const m = document.getElementById('modalDecQuiz3'); if (m) m.close(); };
const closeModalDecQuiz4 = () => { if (typeof closeModal === 'function') return closeModal('modalDecQuiz4'); const m = document.getElementById('modalDecQuiz4'); if (m) m.close(); };

function openModalDec(modalId, iframeId) {
    const modal = document.getElementById(modalId);
    const iframe = document.getElementById(iframeId);
    if (!modal) return;
    if (iframe && iframe.hasAttribute('data-br-temp-src')) {
        try {
            let srcValue = iframe.getAttribute('data-br-temp-src');
            const urlParams = new URLSearchParams(window.location.search);
            const queryParam = urlParams.get('query');
            if (queryParam) {
                const separator = srcValue.includes('?') ? '&' : '?';
                srcValue += `${separator}query=${encodeURIComponent(queryParam.replace(/[<>"'&]/g, ''))}`;
            }
            iframe.src = srcValue;
            iframe.removeAttribute('data-br-temp-src');
        } catch (e) { console.error('openModalDec error', e); }
    }
    if (typeof modal.showModal === 'function') modal.showModal();
}

// Collapse/expand functionality for December activities (starts collapsed)
document.addEventListener('DOMContentLoaded', () => {
    const collapseArrow = document.getElementById('december_collapse');
    const decContainer = document.getElementById('decDiv');

    if (collapseArrow && decContainer) {
        // Start expanded/open by default
        collapseArrow.style.transition = 'none';
        // Ensure arrow is not rotated/collapsed
        collapseArrow.classList.remove('rotated', 'collapsed');
        decContainer.style.display = 'block';

        setTimeout(() => { collapseArrow.style.transition = ''; }, 50);
        collapseArrow.addEventListener('click', () => {
            const isCollapsed = collapseArrow.classList.contains('collapsed');
            collapseArrow.classList.add('transitioning');
            if (isCollapsed) {
                decContainer.style.display = 'block';
                collapseArrow.classList.remove('rotated', 'collapsed');
            } else {
                decContainer.style.display = 'none';
                collapseArrow.classList.add('rotated', 'collapsed');
            }
            setTimeout(() => { collapseArrow.classList.remove('transitioning'); }, 300);
        });
    }

    // Keyboard and outside-click handling for December modals if not already handled
    if (!window._dec_modal_listeners_installed) {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                ['modalDecGame','modalDecQuiz1','modalDecQuiz2','modalDecQuiz3','modalDecQuiz4'].forEach(id => {
                    const m = document.getElementById(id); if (m) m.close();
                });
            }
        });

        window.addEventListener('click', (event) => {
            ['modalDecGame','modalDecQuiz1','modalDecQuiz2','modalDecQuiz3','modalDecQuiz4'].forEach(id => {
                const m = document.getElementById(id); if (m && event.target === m) m.close();
            });
        });

        window._dec_modal_listeners_installed = true;
    }
});
