// ============================================
// AFRICA QUIZ 🌍
// Prototype V1
// ============================================

const questions = [

    {
        category: "Géographie",
        level: 1,

        question:
            "Quelle est la capitale de la Côte d’Ivoire ?",

        answers: [
            "Abidjan",
            "Accra",
            "Dakar",
            "Lomé"
        ],

        correct: 0,

        explanation:
            "Abidjan est la capitale économique et la plus grande ville de Côte d’Ivoire. La capitale politique est Yamoussoukro."
    },

    {
        category: "Animaux",
        level: 1,

        question:
            "Quel est le plus grand animal terrestre vivant actuellement ?",

        answers: [
            "Lion",
            "Éléphant d’Afrique",
            "Rhinocéros",
            "Hippopotame"
        ],

        correct: 1,

        explanation:
            "L’éléphant d’Afrique est le plus grand animal terrestre actuel."
    },

    {
        category: "Musique",
        level: 2,

        question:
            "Quel instrument à cordes est fortement associé à la tradition mandingue ?",

        answers: [
            "Kora",
            "Oud",
            "Sitar",
            "Balalaïka"
        ],

        correct: 0,

        explanation:
            "La kora est une harpe-luth emblématique des traditions mandingues d’Afrique de l’Ouest."
    },

    {
        category: "Géographie",
        level: 2,

        question:
            "Quel est le plus grand désert chaud du monde ?",

        answers: [
            "Kalahari",
            "Sahara",
            "Namib",
            "Danakil"
        ],

        correct: 1,

        explanation:
            "Le Sahara couvre une immense partie de l’Afrique du Nord."
    },

    {
        category: "Histoire",
        level: 3,

        question:
            "Quel souverain de l’Empire du Mali est célèbre pour son pèlerinage à La Mecque ?",

        answers: [
            "Soundiata Keïta",
            "Mansa Moussa",
            "Askia Mohammed",
            "Shaka Zulu"
        ],

        correct: 1,

        explanation:
            "Mansa Moussa, empereur du Mali, est célèbre pour son pèlerinage à La Mecque en 1324."
    },

    {
        category: "Instruments",
        level: 3,

        question:
            "Quel instrument est un xylophone traditionnel d’Afrique de l’Ouest ?",

        answers: [
            "Balafon",
            "Mbira",
            "Oud",
            "Kamancheh"
        ],

        correct: 0,

        explanation:
            "Le balafon est un instrument à lames de bois traditionnel d’Afrique de l’Ouest."
    },

    {
        category: "Géographie",
        level: 4,

        question:
            "Quel lac est une source majeure du Nil Blanc ?",

        answers: [
            "Lac Tana",
            "Lac Victoria",
            "Lac Tchad",
            "Lac Malawi"
        ],

        correct: 1,

        explanation:
            "Le lac Victoria est une source majeure du Nil Blanc."
    },

    {
        category: "Histoire",
        level: 4,

        question:
            "Quelle ville fut un grand centre intellectuel et commercial de l’Empire songhaï ?",

        answers: [
            "Tombouctou",
            "Lusaka",
            "Mombasa",
            "Maseru"
        ],

        correct: 0,

        explanation:
            "Tombouctou fut un important centre de commerce, d’enseignement et de conservation de manuscrits."
    },

    {
        category: "Langues",
        level: 5,

        question:
            "Le swahili appartient principalement à quelle grande famille linguistique ?",

        answers: [
            "Niger-Congo",
            "Afro-asiatique",
            "Nilo-saharienne",
            "Khoïsan"
        ],

        correct: 0,

        explanation:
            "Le swahili est une langue bantoue. Les langues bantoues sont généralement classées dans la famille Niger-Congo."
    },

    {
        category: "Royaumes",
        level: 5,

        question:
            "Quel ancien empire d’Afrique de l’Ouest était célèbre pour son commerce de l’or et du sel ?",

        answers: [
            "Ghana",
            "Kongo",
            "Mutapa",
            "Dahomey"
        ],

        correct: 0,

        explanation:
            "L’Empire du Ghana, aussi appelé Wagadou, prospéra notamment grâce au commerce transsaharien."
    }

];


// ============================================
// VARIABLES
// ============================================

let gameQuestions = [];

let currentQuestion = 0;

let score = 0;

let timeLeft = 60;

let timer;

let gameMode = "";

let answered = false;


// ============================================
// ELEMENTS HTML
// ============================================

const homeScreen =
    document.getElementById("home");

const modesScreen =
    document.getElementById("modes");

const quizScreen =
    document.getElementById("quiz");

const resultScreen =
    document.getElementById("result");

const questionElement =
    document.getElementById("question");

const answersElement =
    document.getElementById("answers");

const feedbackElement =
    document.getElementById("feedback");

const nextButton =
    document.getElementById("nextButton");

const timerElement =
    document.getElementById("timer");

const scoreElement =
    document.getElementById("score");

const levelElement =
    document.getElementById("level");

const categoryElement =
    document.getElementById("category");

const questionNumberElement =
    document.getElementById("questionNumber");

const progressElement =
    document.getElementById("progress");


// ============================================
// NAVIGATION
// ============================================

function showScreen(screen) {

    document
        .querySelectorAll(".screen")
        .forEach(element => {

            element.classList.remove("active");

        });

    document
        .getElementById(screen)
        .classList.add("active");
}


// ============================================
// BOUTON JOUER
// ============================================

document
    .getElementById("playButton")
    .addEventListener("click", () => {

        showScreen("modes");

    });


// ============================================
// MÉLANGE
// ============================================

function shuffle(array) {

    return [...array].sort(
        () => Math.random() - 0.5
    );

}


// ============================================
// COMMENCER UNE PARTIE
// ============================================

function startGame(mode) {

    gameMode = mode;

    gameQuestions =
        shuffle(questions)
        .slice(0, 10);

    currentQuestion = 0;

    score = 0;

    scoreElement.textContent =
        "Score : 0";

    showScreen("quiz");

    displayQuestion();

}


// ============================================
// AFFICHER UNE QUESTION
// ============================================

function displayQuestion() {

    clearInterval(timer);

    answered = false;

    timeLeft =
        gameMode === "Défi Afrique"
            ? 10
            : 60;

    timerElement.textContent =
        `⏱️ ${timeLeft}`;

    const question =
        gameQuestions[currentQuestion];


    // Numéro

    questionNumberElement.textContent =
        `Question ${currentQuestion + 1}/${gameQuestions.length}`;


    // Catégorie

    categoryElement.textContent =
        `${gameMode} • ${question.category}`;


    // Niveau

    const levels = {

        1: "🟢 Niveau 1 — Facile",

        2: "🔵 Niveau 2 — Moyen",

        3: "🟠 Niveau 3 — Difficile",

        4: "🔴 Niveau 4 — Expert",

        5: "🟣 Niveau 5 — Maître"

    };

    levelElement.textContent =
        levels[question.level];


    // Question

    questionElement.textContent =
        question.question;


    // Progression

    progressElement.style.width =
        `${currentQuestion / gameQuestions.length * 100}%`;


    // Réponses

    answersElement.innerHTML = "";


    const answers =
        question.answers.map(
            (answer, index) => ({

                text: answer,

                correct:
                    index === question.correct

            })
        );


    const shuffledAnswers =
        shuffle(answers);


    shuffledAnswers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer";


            button.textContent =
                `${String.fromCharCode(65 + index)}. ${answer.text}`;


            button.addEventListener(
                "click",
                () =>
                    selectAnswer(
                        button,
                        answer.correct,
                        question
                    )
            );


            answersElement.appendChild(
                button
            );

        }
    );


    feedbackElement.classList.add(
        "hidden"
    );

    nextButton.classList.add(
        "hidden"
    );


    startTimer();

}


// ============================================
// CHRONOMÈTRE
// ============================================

function startTimer() {

    timer = setInterval(() => {

        timeLeft--;

        timerElement.textContent =
            `⏱️ ${timeLeft}`;


        if (timeLeft <= 0) {

            clearInterval(timer);

            if (!answered) {

                selectAnswer(
                    null,
                    false,
                    gameQuestions[currentQuestion],
                    true
                );

            }

        }

    }, 1000);

}


// ============================================
// RÉPONSE
// ============================================

function selectAnswer(
    button,
    isCorrect,
    question,
    timeout = false
) {

    if (answered)
        return;


    answered = true;

    clearInterval(timer);


    document
        .querySelectorAll(".answer")
        .forEach(button => {

            button.disabled = true;

        });


    if (isCorrect) {

        score++;

        scoreElement.textContent =
            `Score : ${score}`;

        if (button)
            button.classList.add(
                "correct"
            );

        playSound(true);

    } else {

        if (button)
            button.classList.add(
                "wrong"
            );

        playSound(false);

    }


    const correctAnswer =
        question.answers[
            question.correct
        ];


    feedbackElement.innerHTML = `

        <strong>
            ${
                isCorrect
                    ? "🟢 Bonne réponse !"
                    : "🔴 Mauvaise réponse !"
            }

            ${
                timeout
                    ? " Temps écoulé."
                    : ""
            }
        </strong>

        <div>
            La bonne réponse était :
            <strong>
                ${correctAnswer}
            </strong>
        </div>

        <div class="explanation">
            📖 ${question.explanation}
        </div>

    `;


    feedbackElement.classList.remove(
        "hidden"
    );


    nextButton.classList.remove(
        "hidden"
    );


    progressElement.style.width =
        `${(currentQuestion + 1) / gameQuestions.length * 100}%`;

}


// ============================================
// QUESTION SUIVANTE
// ============================================

nextButton.addEventListener(
    "click",
    () => {

        currentQuestion++;

        if (
            currentQuestion >=
            gameQuestions.length
        ) {

            finishGame();

        } else {

            displayQuestion();

        }

    }
);


// ============================================
// FIN DE PARTIE
// ============================================

function finishGame() {

    clearInterval(timer);

    document.getElementById(
        "finalScore"
    ).textContent =
        `${score}/${gameQuestions.length}`;


    let message;


    if (
        score === gameQuestions.length
    ) {

        message =
            "🏆 Incroyable ! Tu es un véritable expert de l’Afrique !";

    } else if (
        score >= 7
    ) {

        message =
            "🔥 Excellent résultat !";

    } else if (
        score >= 5
    ) {

        message =
            "👏 Très bien ! Continue à apprendre.";

    } else {

        message =
            "🌱 Bonne tentative ! Rejoue pour progresser.";

    }


    document.getElementById(
        "finalMessage"
    ).textContent =
        message;


    showScreen("result");

}


// ============================================
// SONS
// ============================================

function playSound(correct) {

    try {

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        const audio =
            new AudioContext();

        const oscillator =
            audio.createOscillator();

        const gain =
            audio.createGain();


        oscillator.type =
            "sine";


        oscillator.frequency.value =
            correct
                ? 740
                : 180;


        gain.gain.setValueAtTime(
            0.001,
            audio.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.15,
            audio.currentTime + 0.01
        );


        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 0.25
        );


        oscillator.connect(gain);

        gain.connect(audio.destination);


        oscillator.start();

        oscillator.stop(
            audio.currentTime + 0.26
        );

    } catch (error) {

        console.log(
            "Audio non disponible"
        );

    }

}
