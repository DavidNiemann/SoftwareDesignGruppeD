import prompts, { Answers, PromptType } from 'prompts';
import Console from './singletons/Console';
export class ChoiceQuestion /*extends Question*/ {
    private questionText: string ="";
    private answers: Array<number> = [];
    private correctAnswer: number = 0;
    private type: prompts.PromptType = 'toggle'
    constructor(
    ) {
        //super();
    }

    public async setAnswers(): Promise<void> {
        let correct: Answers<string> = await Console.askForAnAnswers("Gib die korrekte Antwort ein:", this.type);
        this.correctAnswer = correct.value;
        this.answers.push(correct.value);

        let nextAnswer: boolean= true;
        while(nextAnswer == true){
            let falseAnswer: Answers<string>= await Console.askForAnAnswers("Gib eine falsche Antwort ein:", this.type);
            this.answers.push(falseAnswer.value);
            if(this.answers.length>=4){
                nextAnswer = false;
                break;
            }
            let antoherAnswer: Answers<string>= await Console.askForAnAnswers("Willst du noch eine Frage eingeben?:", 'confirm');
            nextAnswer=antoherAnswer.value;
        }
    }

    public async setQuestion(): Promise<void> {
        let questionText: Answers<string> = await Console.askForAnAnswers("Gib eine Frage ein:", 'text');
    }

    public clone(): ChoiceQuestion {
        let clonedQuestion: ChoiceQuestion = new ChoiceQuestion(
            
        );
        return clonedQuestion;
    }
}