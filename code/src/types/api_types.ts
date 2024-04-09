export interface IChoice {
  id: string;
  ref: string;
  label: string;
}

export interface IQuestion {
  id: string;
  title: string;
  ref: string;
  type: string;
  description?: string    //updated with optional description field
}

export interface ISolution {
  id: string;
  title: string;
}

export interface IBodyContent {
  question: IQuestion,
  prevChoice: IChoice,
  choiceList: IChoice[]
}
