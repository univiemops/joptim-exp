export interface QuestionnaireProps {
  onSubmit: (responses: Record<string, string>) => void;
  finished: boolean;
}

export interface InstructionsProps {
  onSubmit: () => void;
}
