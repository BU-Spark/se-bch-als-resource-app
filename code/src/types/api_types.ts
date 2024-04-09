export interface IChoice {
  id: string;
  ref: string;
  label: string;
  link?: string;
}

export interface ILogic{
  type: string;
  ref: string;
  actions: Array<Object>;
  
}

export interface IQuestion {
  id: string;
  title: string;
  ref: string;
  type: string;
  choices?: IChoice[];
  description?: string    //updated with optional description field
}

export interface ISolution {
  id: string;
  title: string;
}

export interface IBodyContent {
  currentQuestion: IQuestion;
  prevChoice: IChoice;
  choiceList: IChoice[];
  currentCategory: string;
}

export interface IQuestionList{
  questions: IQuestion[];
  logic: ILogic[];
}