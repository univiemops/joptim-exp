import styles from "./questionnaire.module.css";
import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import {
  Questionnaire,
  QuestionnaireItem,
  LikertScaleOptions,
} from "./questionnaireTypes";

export const QuestionnaireRenderer: React.FC<{
  questionnaire: Questionnaire;
  responses: { [itemId: string]: string };
  handleTextResponse: (itemId: string, value: string) => void;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({
  questionnaire,
  responses,
  handleTextResponse,
  handleRadioButtonResponse,
}) => (
  <div style={{ fontSize: "large" }}>
    <h1>{questionnaire.title}</h1>
    <p>{questionnaire.description}</p>
    {questionnaire.items.map((item) => (
      <QuestionnaireItemRenderer
        key={item.id}
        item={item}
        handleTextResponse={handleTextResponse}
        handleRadioButtonResponse={handleRadioButtonResponse}
        response={responses[item.id]}
      />
    ))}
  </div>
);

const QuestionnaireItemRenderer: React.FC<{
  item: QuestionnaireItem;
  response: string;
  handleTextResponse: (itemId: string, value: string) => void;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({ item, response, handleTextResponse, handleRadioButtonResponse }) => {
  switch (item.type) {
    case "dichotomous":
      return (
        <DichotomousItem
          item={item}
          response={response}
          handleRadioButtonResponse={handleRadioButtonResponse}
        />
      );

    case "noyestext":
      return (
        <NoYesTextItem
          item={item}
          response={response}
          handleRadioButtonResponse={handleRadioButtonResponse}
        />
      );
    case "likert":
      return (
        <LikertItem
          item={item}
          response={response}
          handleRadioButtonResponse={handleRadioButtonResponse}
        />
      );
    case "freeText":
      return (
        <FreeTextItem
          item={item}
          response={response}
          handleTextResponse={handleTextResponse}
        />
      );
    case "info":
      return <InfoItem item={item} />;
    case "line":
      return <LineItem />;
    default:
      return null;
  }
};

const DichotomousItem: React.FC<{
  item: QuestionnaireItem;
  response: string;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({ item, response, handleRadioButtonResponse }) => (
  <div className={styles.survey_item}>
    <p className={styles.survey_item_text}>
      <b>{item.title}:</b> {item.text}
    </p>
    <div className={styles.survey_item_response_area}>
      <FormControl>
        <RadioGroup
          name={`radio-group-${item.id}`}
          onChange={(e) => handleRadioButtonResponse(item.id, e.target.value)}
        >
          {item.options &&
            Array.isArray(item.options) &&
            item.options.map((el: string, i: number) => (
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

const NoYesTextItem: React.FC<{
  item: QuestionnaireItem;
  response: string;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({ item, response, handleRadioButtonResponse }) => {
  const [textResponse, setTextResponse] = React.useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextResponse(e.target.value);
    handleRadioButtonResponse(item.id, e.target.value);
  };
  return (
    <div className={styles.survey_item}>
      <p className={styles.survey_item_text}>
        <b>{item.title}:</b> {item.text}
      </p>
      <div className={styles.survey_item_response_area}>
        <FormControl>
          <RadioGroup
            name={`radio-group-${item.id}`}
            value={
              response === "0" ? "0" : response === undefined ? undefined : "1"
            }
            onChange={(e) =>
              handleRadioButtonResponse(
                item.id,
                e.target.value === "0" ? "0" : textResponse,
              )
            }
          >
            {item.options &&
              Array.isArray(item.options) &&
              item.options.map((el: string, i: number) => (
                <FormControlLabel
                  key={i}
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
        {response !== "0" && (
          <TextField
            id={`text-field-${item.id}`}
            label=""
            value={textResponse}
            onChange={handleTextChange}
            variant="outlined"
            margin="dense"
            size="small"
          />
        )}
      </div>
    </div>
  );
};

const LikertItem: React.FC<{
  item: QuestionnaireItem;
  response: string;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({ item, response, handleRadioButtonResponse }) => (
  <div className={styles.survey_item}>
    <p className={styles.survey_item_text}>
      <b>{item.title}:</b> {item.text}
    </p>

    {isLikertScaleOptions(item.options) && (
      <div className={styles.survey_item_response_area}>
        <span className={styles.survey_item_left_end}>
          {item.options && item.options.leftLabel}
        </span>
        <ToggleButtonGroup
          value={response}
          onChange={(e, value) =>
            value && handleRadioButtonResponse(item.id, value.toString())
          }
          exclusive
          size="small"
          fullWidth={true}
          className={styles.survey_item_buttons}
        >
          {item.options && item.options.length > 0 ? (
            Array.from({ length: item.options.length }).map((el, i) => (
              <ToggleButton
                key={i}
                value={i + 1}
                style={
                  response === (i + 1).toString()
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
            ))
          ) : (
            <div>no options</div>
          )}
        </ToggleButtonGroup>

        <span className={styles.survey_item_right_end}>
          {item.options && item.options.rightLabel}
        </span>
      </div>
    )}
  </div>
);

// guard function to check that type is likert
function isLikertScaleOptions(options: any): options is LikertScaleOptions {
  return (
    typeof options === "object" &&
    options !== null &&
    "leftLabel" in options &&
    "rightLabel" in options &&
    "length" in options
  );
}

const FreeTextItem: React.FC<{
  item: QuestionnaireItem;
  response: string;
  handleTextResponse: (itemId: string, optionId: string) => void;
}> = ({ item, response, handleTextResponse }) => (
  <div className={styles.survey_item}>
    <p className={styles.survey_item_text}>
      <b>{item.title}:</b> {item.text}
    </p>
    <TextField
      id={`debrief-input-field-${item.id}`}
      label="Feedback"
      multiline
      rows={5}
      variant="filled"
      value={response}
      onChange={(e) => handleTextResponse(item.id, e.target.value)}
      InputProps={{ style: { fontSize: "x-large" } }}
      style={{ width: "100%" }}
    />
  </div>
);

const InfoItem: React.FC<{ item: QuestionnaireItem }> = ({ item }) => (
  <div className={styles.survey_item}>
    <div className={styles.survey_item_text}>
      <p>
        <b>{item.title}</b>
      </p>
      <p>{item.text}</p>
    </div>
  </div>
);

const LineItem = () => (
  <div className={styles.survey_item}>
    <hr
      style={{ width: "100%", backgroundColor: "#efefef", color: "#efefef" }}
    />
  </div>
);
