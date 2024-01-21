export interface QuestionnaireProps {
  onSubmit: (responses: Record<string, string>) => void;
  finished: boolean;
}
