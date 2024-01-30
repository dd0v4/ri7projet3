const prompt = require("prompt-sync")({ sigint: true });
let arrQuestions = [];

let score = 0;

class Question {
    constructor(bonneReponse, titre, reponses) {
        this.bonneReponse = bonneReponse;
        this.titre = titre;
        this.reponses = reponses;
    }
}

// On crée une classe question avec un constructeur pour rendre simple la création de questions

const creerQuestion = (bonne, titre, listeReponses) => {
    let nouvelleQuestion = new Question(bonne, titre, listeReponses);
    arrQuestions.push(nouvelleQuestion);
}
// On utilise notre classe pour créer des objets du type de la classe Question et on les range dans un array

const finProgramme = () => {
    console.log(`Vous avez fini le quizz avec une note de ${score}/${arrQuestions.length}`);
    process.exit();
}

// On crée une fonction pour mettre fin au programme avec l'affichage du score de l'utilisateur 

const controlInput = (number, prompt) => {
    for (let i = 0; i < number; i++) {
        if (Number(prompt) <= number) {
            return true;
        }
    }
    console.log("Entrée incorrecte.");
    return false;
}
// On contrôle l'input de l'utilisateur pour vérifier si son entrée est correcte 

const isSure = (choix) => {
    console.log(`Vous avez sélectionné le choix ${choix}, est-ce correct ?\n`);
    console.log("[1] Oui\n[2] Non\n");
    let sureprompt;
    do {
        sureprompt = prompt("> ");
    }while(!controlInput(2, sureprompt));
    if (Number(sureprompt) === 2){
        return false;
    }else{
        return true;
    }
}
// On demande à notre utilisateur si il est sûr de sa réponse

const afficherQuestion = (index) => {
    console.log(arrQuestions[index - 1].titre);
    console.log("\n");
    let string = "";
    let i = 1;
    arrQuestions[index - 1].reponses.forEach(element => {
        string += `[${i}] ` + element + " ";
        i++;
        string += "\n";
    });
    console.log(string);
}
// On crée une fonction pour afficher les questions avec en paramètre l'index dans l'array des questions 

const scoreQuestion = (prompt, index) => {
    if (Number(prompt) === arrQuestions[index -1].bonneReponse){
        score++;
    }
}
// On crée une fonction pour vérifier si l'utilisateur a choisi la bonne réponse
const continuer = () => {
    prompt(`Appuyez sur entrée pour continuer....`);
}
//Fonction pour que l'user appuie sur entrée quand il est prêt à voir la prochaine question

const controlerQuestion = (question, nombreReponses) => {
    do {
        question = prompt("> ");
    }while(!controlInput(nombreReponses, question));
    if (!isSure(question)){
        do {
            afficherQuestion(1);
            question = prompt("> ");
        }while(!controlInput(2, question));
    }
    return question;
}

//Fonction pour utiliser nos deux fonctions ensemble pour contrôler l'input utilisateur et lui demander si il est sûr 

const affichageFinal = (variable, bonneReponse, index) =>{
    afficherQuestion(index);
    scoreQuestion(controlerQuestion(variable, 4), index);
    continuer();
}
// Fonction pour contrôler l'input et vérifier si la réponse est bonne

/*  
----------------------------------------------------------------------------------------------------------------------------
DÉBUT DU PROGRAMME AVEC L'UTILISATION DE NOS FONCTIONS DÉCLARÉES
----------------------------------------------------------------------------------------------------------------------------
*/
let question1;
creerQuestion(1, "Combien font 2 + 2 ?", ["4", "44", "3", "2"]);
affichageFinal(question1, 1, 1);

let question2;
creerQuestion(3, "Quelle est la capitale de la France ? ", ["Marseille", "Berlin", "Paris", "Lyon"]);
affichageFinal(question2, 3, 2);

let question3;
creerQuestion(2, "Combien font 4 + 4 ?", ["9", "8", "12", "2"]);
affichageFinal(question3, 2, 3);


let question4;
creerQuestion(4, "Qui est le formateur de la promo Omicron ? ", ["Pascal", "Enzo", "Brendan", "Thomas"]);
affichageFinal(question4, 4, 4);


let question5;
creerQuestion(2, "Que veut dire JS ? ", ["Johnson", "JavaScript", "JeSais", "JeSaisPas"]);
affichageFinal(question5, 2, 5);
finProgramme();