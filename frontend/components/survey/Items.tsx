import styles from "./survey.module.css";
import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

type Props = {
  title: string;
  children?: React.ReactNode;
  leftEnd: string;
  rightEnd: string;
};

export const BasicItem = ({ title, children, leftEnd, rightEnd }: Props) => {
  const nAnswers: number = 5;

  const [choice, setChoice] = React.useState<number | null>();

  const handleChoice = (
    event: React.MouseEvent<HTMLElement>,
    newChoice: number | null,
  ) => {
    setChoice(newChoice);
  };

  return (
    <div className={styles.survey_item}>
      <p className={styles.survey_item_text}>
        <b>{title}:</b> {children}
      </p>
      <div className={styles.survey_item_response_area}>
        <span className={styles.survey_item_left_end}>{leftEnd}</span>
        <ToggleButtonGroup
          value={choice}
          onChange={handleChoice}
          exclusive
          size="small"
          fullWidth={true}
          className={styles.survey_item_buttons}
        >
          {Array.from({ length: nAnswers }).map((el, i) => (
            <ToggleButton
              value={i + 1}
              style={{
                fontSize: "large",
                textTransform: "none",
              }}
            >
              {i + 1}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <span className={styles.survey_item_right_end}>{rightEnd}</span>
      </div>
    </div>
  );
};

type RadioProps = {
  title: string;
  answers: Array<string>;
  children?: React.ReactNode;
};

export const RadioItem = ({ title, answers, children }: RadioProps) => {
  const nAnswers: number = answers.length;

  const [choice, setChoice] = React.useState<number | null>();
  const [value, setValue] = React.useState<number>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleChoice = (
    event: React.MouseEvent<HTMLElement>,
    newChoice: number | null,
  ) => {
    setChoice(newChoice);
  };

  return (
    <div className={styles.survey_item}>
      <p className={styles.survey_item_text}>
        <b>{title}:</b> {children}
      </p>
      <div className={styles.survey_item_response_area}>
        <FormControl>
          <RadioGroup
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {answers.map((el, i) => (
              <FormControlLabel
                value={i}
                control={<Radio />}
                label={el}
                style={{
                  fontSize: "large",
                  textTransform: "none",
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};
