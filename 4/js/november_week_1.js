// Nav functions
const navNov = () => {
    const oct = document.getElementById("october");
    const nov = document.getElementById("november");
    const dec = document.getElementById("december");
    if (nov) nov.style.display = "block";
    if (oct) oct.style.display = "none";
    if (dec) dec.style.display = "none";
};

const navDec = () => {
    const oct = document.getElementById("october");
    const nov = document.getElementById("november");
    const dec = document.getElementById("december");
    if (nov) nov.style.display = "none";
    if (oct) oct.style.display = "none";
    if (dec) dec.style.display = "block";
};

const navOct = () => {
    const oct = document.getElementById("october");
    const nov = document.getElementById("november");
    const dec = document.getElementById("december");
    if (nov) nov.style.display = "none";
    if (oct) oct.style.display = "block";
    if (dec) dec.style.display = "none";
};

const navNov2 = () => {
    const oct = document.getElementById("october2");
    const nov = document.getElementById("november2");
    const dec = document.getElementById("december2");
    if (nov) nov.style.display = "block";
    if (oct) oct.style.display = "none";
    if (dec) dec.style.display = "none";
};

const navDec2 = () => {
    const oct = document.getElementById("october2");
    const nov = document.getElementById("november2");
    const dec = document.getElementById("december2");
    if (nov) nov.style.display = "none";
    if (oct) oct.style.display = "none";
    if (dec) dec.style.display = "block";
};

const navOct2 = () => {
    const oct = document.getElementById("october2");
    const nov = document.getElementById("november2");
    const dec = document.getElementById("december2");
    if (nov) nov.style.display = "none";
    if (oct) oct.style.display = "block";
    if (dec) dec.style.display = "none";
};

// Modal management
const modals = {
    modalOctGame: document.getElementById("modalOctGame"),
    modalOctQuiz1: document.getElementById("modalOctQuiz1"),
    modalOctQuiz2: document.getElementById("modalOctQuiz2"),
    modalOctQuiz3: document.getElementById("modalOctQuiz3"),
    modalOctQuiz4: document.getElementById("modalOctQuiz4"),
    modalNovGame: document.getElementById("modalNovGame"),
    modalNovQuiz1: document.getElementById("modalNovQuiz1"),
    modalNovQuiz2: document.getElementById("modalNovQuiz2"),
    modalNovQuiz3: document.getElementById("modalNovQuiz3"),
    modalNovQuiz4: document.getElementById("modalNovQuiz4"),
};

const sanitizeParam = (param) => encodeURIComponent(param.replace(/[<>\"'&]/g, '')); // Basic sanitization

const openModal = (modalKey, iframeId) => {
    const modal = modals[modalKey];
    if (!modal) return;
    const iframe = document.getElementById(iframeId);
    if (!iframe || !iframe.hasAttribute('data-br-temp-src')) {
        modal.showModal();
        return;
    }
    try {
        let srcValue = iframe.getAttribute('data-br-temp-src');
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('query');
        if (queryParam) {
            const separator = srcValue.includes('?') ? '&' : '?';
            srcValue += `${separator}query=${sanitizeParam(queryParam)}`;
        }
        iframe.src = srcValue;
        iframe.removeAttribute('data-br-temp-src');
        modal.showModal();
    } catch (error) {
        console.error('Error opening modal:', error);
    }
};

const closeModal = (modalKey) => {
    const modal = modals[modalKey];
    if (modal) modal.close();
};

// Specific modal open functions
const openModalOctGame = () => openModal('modalOctGame', 'oct-game-iframe');
const openModalOctQuiz1 = () => openModal('modalOctQuiz1', 'oct-quiz-1-iframe');
const openModalOctQuiz2 = () => openModal('modalOctQuiz2', 'oct-quiz-2-iframe');
const openModalOctQuiz3 = () => openModal('modalOctQuiz3', 'oct-quiz-3-iframe');
const openModalOctQuiz4 = () => openModal('modalOctQuiz4', 'oct-quiz-4-iframe');
const openModalNovGame = () => openModal('modalNovGame', 'nov-game-iframe');
const openModalNovQuiz1 = () => openModal('modalNovQuiz1', 'nov-quiz-1-iframe');
const openModalNovQuiz2 = () => openModal('modalNovQuiz2', 'nov-quiz-2-iframe');
const openModalNovQuiz3 = () => openModal('modalNovQuiz3', 'nov-quiz-3-iframe');
const openModalNovQuiz4 = () => openModal('modalNovQuiz4', 'nov-quiz-4-iframe');

// Specific modal close functions
const closeModalOctGame = () => closeModal('modalOctGame');
const closeModalOctQuiz1 = () => closeModal('modalOctQuiz1');
const closeModalOctQuiz2 = () => closeModal('modalOctQuiz2');
const closeModalOctQuiz3 = () => closeModal('modalOctQuiz3');
const closeModalOctQuiz4 = () => closeModal('modalOctQuiz4');
const closeModalNovGame = () => closeModal('modalNovGame');
const closeModalNovQuiz1 = () => closeModal('modalNovQuiz1');
const closeModalNovQuiz2 = () => closeModal('modalNovQuiz2');
const closeModalNovQuiz3 = () => closeModal('modalNovQuiz3');
const closeModalNovQuiz4 = () => closeModal('modalNovQuiz4');

// Keyboard navigation for modals
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        Object.values(modals).forEach(modal => modal && modal.close());
    }
});

// Close on outside click
window.addEventListener('click', (event) => {
    Object.values(modals).forEach(modal => {
        if (event.target === modal) modal.close();
    });
});

// Message listener for iframe close
window.addEventListener('message', (event) => {
    if (event.data === 'close' || (typeof event.data === 'object' && event.data.type === 'close')) {
        window.location.reload();
    }
});

// Collapse/expand functionality for October activities
document.addEventListener('DOMContentLoaded', () => {
    const collapseArrow = document.getElementById('october_collapse');
    const octoberContainer = document.getElementById('octDiv');

    if (collapseArrow && octoberContainer) {
        // Start with container collapsed by default - disable transitions temporarily
        collapseArrow.style.transition = 'none';
        collapseArrow.classList.add('rotated', 'collapsed');
        
        // Re-enable transitions after a short delay
        setTimeout(() => {
            collapseArrow.style.transition = '';
        }, 50);
        
        collapseArrow.addEventListener('click', () => {
            const isCollapsed = collapseArrow.classList.contains('collapsed');
            
            // Hide arrow during transition
            collapseArrow.classList.add('transitioning');
            
            if (isCollapsed) {
                octoberContainer.style.display = 'block';
                collapseArrow.classList.remove('rotated', 'collapsed');
            } else {
                octoberContainer.style.display = 'none';
                collapseArrow.classList.add('rotated', 'collapsed');
            }
            
            // Show arrow after transition completes
            setTimeout(() => {
                collapseArrow.classList.remove('transitioning');
            }, 300); // Match the CSS transition duration
        });
    }

    // Collapse/expand functionality for November activities (starts expanded)
    const novemberCollapseArrow = document.getElementById('november_collapse');
    const novemberContainer = document.getElementById('novDiv');

    if (novemberCollapseArrow && novemberContainer) {
        // November starts collapsed by default - match October's initial state
        novemberCollapseArrow.style.transition = 'none';
        novemberCollapseArrow.classList.add('rotated', 'collapsed');
        novemberContainer.style.display = 'none';

        // Re-enable transitions after a short delay
        setTimeout(() => {
            novemberCollapseArrow.style.transition = '';
        }, 50);

        novemberCollapseArrow.addEventListener('click', () => {
            const isCollapsed = novemberCollapseArrow.classList.contains('collapsed');

            // Hide arrow during transition
            novemberCollapseArrow.classList.add('transitioning');

            if (isCollapsed) {
                novemberContainer.style.display = 'block';
                novemberCollapseArrow.classList.remove('rotated', 'collapsed');
            } else {
                novemberContainer.style.display = 'none';
                novemberCollapseArrow.classList.add('rotated', 'collapsed');
            }

            // Show arrow after transition completes
            setTimeout(() => {
                novemberCollapseArrow.classList.remove('transitioning');
            }, 300); // Match the CSS transition duration
        });
    }
});

// Retailer data fetch
window.addEventListener('load', () => {
    const getRetailer = (objectName, apiEndpoint = 'https://pmi.in-motion.video/campaign/breeze/get-retailer', queryValue = 'query') => {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get(queryValue);
        if (query) console.log(`Breeze - gR - ${queryValue} found`);
        if (query && objectName) {
            console.log('Breeze - gR - fetching retailer');
            fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ objectName, query })
            })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                return response.json();
            })
            .then(data => {
                if (data?.structured_data) {
                    console.log("Breeze - gR - Structured data", data.structured_data);
                    Object.entries(data.structured_data).forEach(([key, value]) => {
                        const element = document.getElementById(key);
                        if (element) element.innerHTML = value;
                    });
                    // Update circles
                    const updateCircle = (id, played) => {
                        const circle = document.getElementById(id);
                        if (circle) {
                            circle.classList.toggle('bg-green', played);
                            circle.classList.toggle('bg-red', !played);
                            circle.parentElement.style.animationPlayState = played ? 'paused' : 'running';
                        }
                    };
                    updateCircle('oct-game-circle', data.structured_data.oct_game === true);
                    updateCircle('oct-quiz-1-circle', data.structured_data.oct_quiz_1 === true);
                    updateCircle('oct-quiz-2-circle', data.structured_data.oct_quiz_2 === true);
                    updateCircle('oct-quiz-3-circle', data.structured_data.oct_quiz_3 === true);
                    updateCircle('oct-quiz-4-circle', data.structured_data.oct_quiz_4 === true);
                    updateCircle('nov-game-circle', data.structured_data.nov_game === true);
                    updateCircle('nov-quiz-1-circle', data.structured_data.nov_quiz_1 === true);
                    updateCircle('nov-quiz-2-circle', data.structured_data.nov_quiz_2 === true);
                    updateCircle('nov-quiz-3-circle', data.structured_data.nov_quiz_3 === true);
                    updateCircle('nov-quiz-4-circle', data.structured_data.nov_quiz_4 === true);
                    // December circles (ensure december state is also updated if present)
                    updateCircle('dec-game-circle', data.structured_data.dec_game === true);
                    updateCircle('dec-quiz-1-circle', data.structured_data.dec_quiz_1 === true);
                    updateCircle('dec-quiz-2-circle', data.structured_data.dec_quiz_2 === true);
                    updateCircle('dec-quiz-3-circle', data.structured_data.dec_quiz_3 === true);
                    updateCircle('dec-quiz-4-circle', data.structured_data.dec_quiz_4 === true);
                } else {
                    console.log('Breeze - gR - No structured_data found');
                }
            })
                .catch(error => {
                console.error('Breeze - gR - Fetch error:', error);
                // Fallback to red circles (include December)
                ['oct-game-circle', 'oct-quiz-1-circle', 'oct-quiz-2-circle', 'oct-quiz-3-circle', 'oct-quiz-4-circle', 'nov-game-circle', 'nov-quiz-1-circle', 'nov-quiz-2-circle', 'nov-quiz-3-circle', 'nov-quiz-4-circle', 'dec-game-circle', 'dec-quiz-1-circle', 'dec-quiz-2-circle', 'dec-quiz-3-circle', 'dec-quiz-4-circle'].forEach(id => {
                    const circle = document.getElementById(id);
                    if (circle) circle.classList.add('bg-red');
                });
            });
            } else {
            console.log('Breeze - gR - No querystring. Setting defaults');
            ['oct-game-circle', 'oct-quiz-1-circle', 'oct-quiz-2-circle', 'oct-quiz-3-circle', 'oct-quiz-4-circle', 'nov-game-circle', 'nov-quiz-1-circle', 'nov-quiz-2-circle', 'nov-quiz-3-circle', 'nov-quiz-4-circle', 'dec-game-circle', 'dec-quiz-1-circle', 'dec-quiz-2-circle', 'dec-quiz-3-circle', 'dec-quiz-4-circle'].forEach(id => {
                const circle = document.getElementById(id);
                if (circle) circle.classList.add('bg-red');
            });
        }
    };
    getRetailer('france_iam');
});