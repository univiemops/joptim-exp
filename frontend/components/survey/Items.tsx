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
  item: number;
  title: string;
  children?: React.ReactNode;
  leftEnd: string;
  rightEnd: string;
  choice: number | null;
  onChange: (item: number) => void;
};

export const BasicItem = ({
  item,
  title,
  children,
  leftEnd,
  rightEnd,
  choice,
  onChange,
}: Props) => {
  const nAnswers: number = 5;
  return (
    <div className={styles.survey_item}>
      <p className={styles.survey_item_text}>
        <b>{title}:</b> {children}
      </p>
      <div className={styles.survey_item_response_area}>
        <span className={styles.survey_item_left_end}>{leftEnd}</span>
        <ToggleButtonGroup
          value={choice}
          onChange={(e) => onChange(e, item)}
          exclusive
          size="small"
          fullWidth={true}
          className={styles.survey_item_buttons}
        >
          {Array.from({ length: nAnswers }).map((el, i) => (
            <ToggleButton
              key={i}
              value={i + 1}
              style={
                choice == i + 1
                  ? {
                      backgroundColor: "lightgray",
                      fontSize: "large",
                      textTransform: "none",
                    }
                  : {
                      fontSize: "large",
                      textTransform: "none",
                    }
              }
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
  value: number | undefined;
  onChange: () => void;
};

export const RadioItem = ({
  title,
  answers,
  children,
  value,
  onChange,
}: RadioProps) => {
  return (
    <div className={styles.survey_item}>
      <p className={styles.survey_item_text}>
        <b>{title}:</b> {children}
      </p>
      <div className={styles.survey_item_response_area}>
        <FormControl>
          <RadioGroup name="controlled-radio-buttons-group" onChange={onChange}>
            {answers.map((el, i) => (
              <FormControlLabel
                key={i}
                value={i.toString()}
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
