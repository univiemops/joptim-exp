export interface Questionnaire {
  title: string;
  description: string;
  items: QuestionnaireItem[];
}

export interface QuestionnaireItem {
  id: string;
  type:
  | "dichotomous"
  | "noyestext"
  | "check"
  | "likert"
  | "likertLabels"
  | "freeText"
  | "freeTextOpt"
  | "info"
  | "line";
  title: string;
  text: string;
  options?: LikertScaleOptions | LikertScaleLabelOptions | string[]; // For dichotomous or Likert-scaled items
}

export interface LikertScaleOptions {
  length: number;
  leftLabel: string;
  rightLabel: string;
}

export interface LikertScaleLabelOptions {
  labels: Labels;
}

interface Labels {
  [key: number]: string
};
