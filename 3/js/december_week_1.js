// December-specific JS: modal open/close helpers and collapse handling

// Attempt to reuse global openModal/closeModal if present, otherwise provide local fallback
const openModalDecGame = () => {
    if (typeof openModal === 'function' && typeof modals !== 'undefined' && modals['modalDecGame']) return openModal('modalDecGame', 'dec-game-iframe');
    openModalDec('modalDecGame', 'dec-game-iframe');
};
const openModalDecQuiz1 = () => {
    if (typeof openModal === 'function' && typeof modals !== 'undefined' && modals['modalDecQuiz1']) return openModal('modalDecQuiz1', 'dec-quiz-1-iframe');
    openModalDec('modalDecQuiz1', 'dec-quiz-1-iframe');
};
const openModalDecQuiz2 = () => {
    if (typeof openModal === 'function' && typeof modals !== 'undefined' && modals['modalDecQuiz2']) return openModal('modalDecQuiz2', 'dec-quiz-2-iframe');
    openModalDec('modalDecQuiz2', 'dec-quiz-2-iframe');
};
const openModalDecQuiz3 = () => {
    if (typeof openModal === 'function' && typeof modals !== 'undefined' && modals['modalDecQuiz3']) return openModal('modalDecQuiz3', 'dec-quiz-3-iframe');
    openModalDec('modalDecQuiz3', 'dec-quiz-3-iframe');
};
const openModalDecQuiz4 = () => {
    if (typeof openModal === 'function' && typeof modals !== 'undefined' && modals['modalDecQuiz4']) return openModal('modalDecQuiz4', 'dec-quiz-4-iframe');
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
                srcValue += `${separator}query=${encodeURIComponent(queryParam.replace(/[<>\"'&]/g, ''))}`;
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

        // Lightweight retailer fetch for December circles only (so december_week_1.js manages December state)
        window.addEventListener('load', () => {
            const apiEndpoint = 'https://pmi.in-motion.video/campaign/breeze/get-retailer';
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('query');
            if (!query) return; // rely on same query param as the main script

            fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ objectName: 'france_iam', query })
            })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (!data?.structured_data) return;
                const updateCircle = (id, played) => {
                    const circle = document.getElementById(id);
                    if (circle) {
                        circle.classList.toggle('bg-green', played);
                        circle.classList.toggle('bg-red', !played);
                        if (circle.parentElement) circle.parentElement.style.animationPlayState = played ? 'paused' : 'running';
                    }
                };
                updateCircle('dec-game-circle', data.structured_data.dec_game === true);
                updateCircle('dec-quiz-1-circle', data.structured_data.dec_quiz_1 === true);
                updateCircle('dec-quiz-2-circle', data.structured_data.dec_quiz_2 === true);
                updateCircle('dec-quiz-3-circle', data.structured_data.dec_quiz_3 === true);
                updateCircle('dec-quiz-4-circle', data.structured_data.dec_quiz_4 === true);
            })
            .catch(() => {
                // If fetch fails, mark December circles as red
                ['dec-game-circle','dec-quiz-1-circle','dec-quiz-2-circle','dec-quiz-3-circle','dec-quiz-4-circle'].forEach(id => {
                    const c = document.getElementById(id); if (c) c.classList.add('bg-red');
                });
            });
        });
