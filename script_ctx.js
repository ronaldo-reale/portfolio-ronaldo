// Questions
const quizQuestions = [
    {
        question: "Quel est mon type de formation actuelle ?",
        options: ["Licence Informatique", "BTS SISR", "Master Réseaux", "Formation autodidacte"],
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


// Marquee centré (défilement infini du sous-titre)
function initCenteredMarquee() {
    const el = document.getElementById("subtitle-marquee");
    if (!el) return;

    const inner = el.querySelector(".marquee__inner");
    if (!inner) return;

    const compute = () => {
        // Mesures
        const containerWidth = el.clientWidth;
        // scrollWidth donne la largeur réelle du texte (non-wrappé)
        const textWidth = inner.scrollWidth;

        // Position "début centré" : le début de la phrase est au centre
        const startX = Math.round(containerWidth / 2);
        // Position "fin centrée" : la fin de la phrase est au centre
        const endX = Math.round(containerWidth / 2 - textWidth);

        // Durée proportionnelle à la distance (min 10s pour rester lisible)
        const distance = Math.max(1, Math.abs(endX - startX));
        const durationSec = Math.max(10, Math.round(distance / 40)); // 40px/s ≈ vitesse douce

        el.style.setProperty("--start-x", `${startX}px`);
        el.style.setProperty("--end-x", `${endX}px`);
        el.style.setProperty("--marquee-duration", `${durationSec}s`);
    };

    // Lance après chargement des polices pour éviter le "saut" au chargement
    const start = () => {
        compute();
        window.addEventListener("resize", compute);
    };

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(start).catch(start);
    } else {
        window.addEventListener("load", start, { once: true });
    }
}

document.addEventListener("DOMContentLoaded", initCenteredMarquee);

