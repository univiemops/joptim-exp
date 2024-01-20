export interface Questionnaire {
  title: string;
  description: string;
  items: QuestionnaireItem[];
}

export interface QuestionnaireItem {
  id: string;
  type: "dichotomous" | "likert" | "freeText" | "info" | "line";
  title: string;
  text: string;
  options?: LikertScaleOptions | string[]; // For dichotomous or Likert-scaled items
}

export interface LikertScaleOptions {
  length: number;
  leftLabel: string;
  rightLabel: string;
}
