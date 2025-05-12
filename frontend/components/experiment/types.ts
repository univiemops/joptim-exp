export interface QuestionnaireProps {
  onSubmit: (responses: Record<string, string>) => void;
  finished: boolean;
}

export interface InstructionsProps {
  onSubmit: () => void;
}

export interface UserDataProps {
  id: string;
  xid: string;
  consent: boolean;
  survey: boolean;
  trials_1: boolean;
  trials_2: boolean;
  strategies_1: boolean;
  strategies_2: boolean;
  demographics: boolean;
  debrief: boolean;
  [key: string]: boolean | string; // Define allowed value types
}
