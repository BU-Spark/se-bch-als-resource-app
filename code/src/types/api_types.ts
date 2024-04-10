export interface IChoice {
  id: string;
  ref: string;
  label: string;
  link?: string;
}

export interface ILogicActionDetail {
  to: {
      type: string;
      value: string;
  };
}

export interface ILogicConditionVar {
  type: string;
  value: string;
}

export interface ILogicCondition {
  op: string;
  vars: ILogicConditionVar[];
}

export interface ILogicAction {
  action: string;
  details: ILogicActionDetail;
  condition: ILogicCondition;
}

export interface ILogic {
  type: string;
  ref: string;
  actions: ILogicAction[];
}


export interface IQuestion {
  id: string;
  title: string;
  ref: string;
  type: string;
  choices?: IChoice[];
  solutions?: ISolution[];
  description?: string    //updated with optional description field
}

export interface ISolution {
  id: string;
  title: string;
  url: string;
}

export interface IBodyContent {
  currentQuestion: IQuestion;
  prevChoice: IChoice;
  choiceList: IChoice[];
  currentCategory?: string;
}

export interface IQuestionList{
  questions: IQuestion[];
  logic: ILogic[];
}