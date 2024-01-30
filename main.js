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

const creerQuestion = (bonne, titre, listeReponses) => {
    let nouvelleQuestion = new Question(bonne, titre, listeReponses);
    arrQuestions.push(nouvelleQuestion);
}

const finProgramme = () => {
    console.log(`Vous avez fini le quizz avec une note de ${score}/${arrQuestions.length}`);
    process.exit();
}
const controlInput = (number, prompt) => {
    for (let i = 0; i < number; i++) {
        if (Number(prompt) <= number) {
            return true;
        }
    }
    console.log("Entrée incorrecte.");
    return false;
}

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

const scoreQuestion = (prompt, index) => {
    if (Number(prompt) === arrQuestions[index -1].bonneReponse){
        score++;
    }
}
const continuer = () => {
    prompt(`Appuyez sur entrée pour continuer....`);
}

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

const affichageFinal = (variable, bonneReponse, index) =>{
    afficherQuestion(index);
    scoreQuestion(controlerQuestion(variable, 4), index);
    continuer();
}

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