export type MessageType = 'questionnaire' | 'question' | 'answer' | 'message' | 'clickableMessage' | 'profile';
export type MessageDisplayType = 'inChat' | 'fullPage';
export type Category = 'Personal Details' | 'Personal_Details' | 'Basics' | 'Identity' | 'Background' | 'Looks' | 'Lifestyle' | 'Family' | 'Communication' | 'None';
export type AnswerProfileType = 'none' | 'personal' | 'bio' | 'preference' | 'questionnaire' | 'state';
export type AnswerInputType = 'text' | 'number' | 'singleTextChoice' | 'singleButtonChoice' | 'multiTextChoice' | 'datePicker' | 'range' | 'scale' | 'continuum' | 'dichotomous' | 'dragAndDrop' | 'allocation' | 'selector' | 'location' | 'imagePicker';

export type QuestionType = 'BIO' | 'PREF' | 'Predictors';

export interface description {
    answerProfileType: AnswerProfileType;
    answerInputType: AnswerInputType;
}

export interface dynamicAnswer {
    id: string;
    messageType: MessageType;
    messageDisplayType: MessageDisplayType;
    isEnabled: boolean;
    category: Category;
    description: description;
    isSkip: boolean;
    isPublic: boolean;
    choices: string[];
    selectedChoice:	string[];
};

interface question {
    id: string;
    messageType: MessageType;
    messageDisplayType: MessageDisplayType;
    isEnabled: boolean;
    category: Category;
    text: string;
    questionDisplayType?: string;
	dynamicAnswer: dynamicAnswer;
    canEdit?:	boolean;
    canPublic?: boolean;
    canSkip?: boolean;
    // nestedQuestions	:	null
    // conditionalChildAnswers	:	null
}
