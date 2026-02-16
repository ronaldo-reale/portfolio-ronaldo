// Questions
const quizQuestions = [
    {
        question: "Quel est mon type de formation actuelle ?",
        options: ["Licence Informatique", "BTS SIO SISR", "Master Réseaux", "Formation autodidacte"],
        correct: 1
    },
    {
        question: "Quel est mon domaine de spécialisation en BTS ?",
        options: ["Solutions de Développement Web", "Solutions d'Infrastructure, Systèmes et Réseaux", "Solutions d'Infogérance", "Solutions de Cybersécurité"],
        correct: 1
    },
    {
        question: "Quel est mon niveau d'anglais officiel ?",
        options: ["A1 (débutant)", "A2 (élémentaire)", "B1 (intermédiaire)", "B2 (TOEIC 10/2023)"],
        correct: 3
    },
    {
        question: "Quel domaine IT m'intéresse le plus selon mes centres d'intérêt ?",
        options: ["Développement web", "Jeux vidéo", "Hardware et Infrastructure", "Cybersécurité"],
        correct: 2
    },
    {
        question: "Combien d'expériences professionnelles ai-je ?",
        options: ["1 expérience", "2 expériences", "3 expériences", "4 expériences"],
        correct: 2
    }
];

// Affiche le quiz
function showQuiz() {
    const modal = document.getElementById('quiz-modal');
    const questionsContainer = document.getElementById('quiz-questions');
    questionsContainer.innerHTML = '';
    quizQuestions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML =
            `<h4>Question ${index + 1} : ${q.question}</h4>` +
            q.options.map((option, i) => `
                <label class="quiz-option">
                    <input type="radio" name="question${index}" value="${i}">
                    ${option}
                </label>
            `).join('');
        questionsContainer.appendChild(questionDiv);
    });
    modal.style.display = 'block';
}

// Ferme le quiz
function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
    // Triple clic sur titre
    let clicks = 0;
    document.getElementById('main-title').onclick = function () {
        clicks++;
        if (clicks === 3) { showQuiz(); clicks = 0; }
        setTimeout(() => { clicks = 0; }, 500);
    };

    // Konami code
    let konamiCode = [], konamiPattern = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
    ];
    document.addEventListener('keydown', (e) => {
        let key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        konamiCode.push(key);
        if (konamiCode.length > 10) konamiCode.shift();
        if (konamiCode.join(',') === konamiPattern.join(',')) {
            showQuiz(); konamiCode = [];
        }
    });

    // Fermeture modal
    document.querySelector('.close-modal').onclick = closeQuiz;
    window.onclick = function (e) {
        if (e.target == document.getElementById('quiz-modal')) closeQuiz();
    };

    // Quiz validation
    document.getElementById('submit-quiz').onclick = function () {
        let score = 0;
        quizQuestions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === q.correct) score++;
        });
        const resultDiv = document.getElementById('quiz-result');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `<h3>${score} / ${quizQuestions.length}</h3>
        <p>${score === quizQuestions.length ? 'Bravo ! Pentakill !' : score >= 3 ? 'Bien joué !' : 'Essaye encore !'}</p>
        <p style="color: var(--neon-cyan); margin-top: 1rem;">Score : ${((score / quizQuestions.length)*100).toFixed(0)}%</p>`;
    };
});


// Zoom image (projets)
function openImgModal(src, alt) {
    const modal = document.getElementById('img-modal');
    const img = document.getElementById('img-modal-content');
    if (!modal || !img) return;
    img.src = src;
    img.alt = alt || 'Aperçu';
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.classList.add('no-scroll');
}

function closeImgModal() {
    const modal = document.getElementById('img-modal');
    const img = document.getElementById('img-modal-content');
    if (!modal || !img) return;
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('open');
    img.src = '';
    document.body.classList.remove('no-scroll');
}

document.addEventListener('DOMContentLoaded', function () {
    // Bind zoomable images
    document.querySelectorAll('.zoomable').forEach((el) => {
        el.addEventListener('click', () => {
            const src = el.getAttribute('data-full') || el.getAttribute('src');
            openImgModal(src, el.getAttribute('alt'));
        });
    });

    // Close button
    const closeBtn = document.querySelector('.img-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeImgModal);

    // Click outside image closes
    const modal = document.getElementById('img-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeImgModal();
        });
    }

    // ESC closes
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeImgModal();
    });
});
