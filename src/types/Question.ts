export type Option = {
  id: string;
  text: string;
  correct_answer: boolean;
}

export type Question = {
  id: string;
  text: string;
  module_id: string;
  options: Option[];
}
