import styles from "./questionnaire.module.css";
import React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import DOMPurify from "dompurify";

import {
  Questionnaire,
  QuestionnaireItem,
  LikertScaleOptions,
  LikertScaleLabelOptions,
} from "./questionnaireTypes";

export const QuestionnaireRenderer: React.FC<{
  questionnaire: Questionnaire;
  responses: { [itemId: string]: string };
  highlightMissing: boolean;
  handleTextResponse: (itemId: string, value: string) => void;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({
  questionnaire,
  responses,
  highlightMissing,
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
          highlightMissing={highlightMissing}
        />
      ))}
    </div>
  );

const QuestionnaireItemRenderer: React.FC<{
  item: QuestionnaireItem;
  response: string;
  highlightMissing: boolean;
  handleTextResponse: (itemId: string, value: string) => void;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({
  item,
  response,
  highlightMissing,
  handleTextResponse,
  handleRadioButtonResponse,
}) => {
    switch (item.type) {
      case "dichotomous":
        return (
          <DichotomousItem
            item={item}
            highlightMissing={highlightMissing}
            handleRadioButtonResponse={handleRadioButtonResponse}
          />
        );
      case "radio":
        return (
          <RadioItem
            item={item}
            highlightMissing={highlightMissing}
            handleRadioButtonResponse={handleRadioButtonResponse}
          />
        );
      case "check":
        return (
          <SingleCheckboxItem
            item={item}
            highlightMissing={highlightMissing}
            handleRadioButtonResponse={handleRadioButtonResponse}
          />
        );
      case "noyestext":
        return (
          <NoYesTextItem
            item={item}
            response={response}
            highlightMissing={highlightMissing}
            handleRadioButtonResponse={handleRadioButtonResponse}
          />
        );
      case "likert":
        return (
          <LikertItem
            item={item}
            response={response}
            highlightMissing={highlightMissing}
            handleRadioButtonResponse={handleRadioButtonResponse}
          />
        );
      case "likertLabels":
        return (
          <LikertLabelsItem
            item={item}
            response={response}
            highlightMissing={highlightMissing}
            handleRadioButtonResponse={handleRadioButtonResponse}
          />
        );
      case "freeTextOpt":
        return (
          <FreeTextItem
            item={item}
            response={response}
            optional={true}
            highlightMissing={highlightMissing}
            handleTextResponse={handleTextResponse}
          />
        );
      case "freeText":
        return (
          <FreeTextItem
            item={item}
            response={response}
            optional={false}
            highlightMissing={highlightMissing}
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


const RadioItem: React.FC<{
  item: QuestionnaireItem;
  highlightMissing: boolean;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({ item, highlightMissing, handleRadioButtonResponse }) => {
  const [response, setResponse] = React.useState<string | null>(null);

  const sanitizedHTML = DOMPurify.sanitize(item.text);
  return (
    <div
      className={
        response || !highlightMissing
          ? styles.survey_item
          : styles.survey_item_missing
      }
    >
      <p className={styles.survey_item_text}>
        <b>{item.title !== "" && item.title.concat(": ")}</b>

        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      </p>
      <div className={styles.survey_item_response_area}>
        <FormControl>
          <RadioGroup
            name={`radio-group-${item.id}`}
            onChange={(e) => {
              setResponse(e.target.value);
              handleRadioButtonResponse(item.id, e.target.value);
            }}
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
};

const DichotomousItem: React.FC<{
  item: QuestionnaireItem;
  highlightMissing: boolean;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({ item, highlightMissing, handleRadioButtonResponse }) => {
  const [response, setResponse] = React.useState<string | null>(null);

  const sanitizedHTML = DOMPurify.sanitize(item.text);
  return (
    <div
      className={
        response || !highlightMissing
          ? styles.survey_item
          : styles.survey_item_missing
      }
    >
      <p className={styles.survey_item_text}>
        <b>{item.title !== "" && item.title.concat(": ")}</b>

        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      </p>
      <div className={styles.survey_item_response_area}>
        <FormControl>
          <RadioGroup
            name={`radio-group-${item.id}`}
            onChange={(e) => {
              setResponse(e.target.value);
              handleRadioButtonResponse(item.id, e.target.value);
            }}
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
};

const NoYesTextItem: React.FC<{
  item: QuestionnaireItem;
  response: string;
  highlightMissing: boolean;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({ item, response, highlightMissing, handleRadioButtonResponse }) => {
  const [textResponse, setTextResponse] = React.useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextResponse(e.target.value);
    handleRadioButtonResponse(item.id, e.target.value);
  };

  const sanitizedHTML = DOMPurify.sanitize(item.text);
  return (
    <div
      className={
        response || !highlightMissing
          ? styles.survey_item
          : styles.survey_item_missing
      }
    >
      <p className={styles.survey_item_text}>
        <b>{item.title !== "" && item.title.concat(": ")}</b>

        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      </p>
      <div className={styles.survey_item_response_area_noyes}>
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
        {response !== "0" && response !== undefined && (
          <TextField
            id={`text-field-${item.id}`}
            label=""
            value={textResponse}
            onChange={handleTextChange}
            variant="outlined"
            margin="dense"
            style={{ width: "100%" }}
          />
        )}
      </div>
    </div>
  );
};

const SingleCheckboxItem: React.FC<{
  item: QuestionnaireItem;
  highlightMissing: boolean;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({ item, highlightMissing, handleRadioButtonResponse }) => {
  const [response, setResponse] = React.useState<string | null>(null);

  const sanitizedHTML = DOMPurify.sanitize(item.text);
  return (
    <div
      className={
        response || !highlightMissing
          ? styles.survey_item
          : styles.survey_item_missing
      }
    >
      <p className={styles.survey_item_text}>
        <b>{item.title}</b>
      </p>
      <div
        className={styles.survey_item_response_area}
        style={{ fontSize: "large" }}
      >
        <FormControlLabel
          label=<div
            style={{
              textTransform: "none",
              fontSize: "large",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
          </div>
          labelPlacement="end"
          control={
            <Checkbox
              name={`single-checkbox-${item.id}`}
              onChange={(e) => {
                setResponse(e.target.checked.toString());
                handleRadioButtonResponse(item.id, e.target.checked.toString());
              }}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
            />
          }
        />
      </div>
    </div>
  );
};

const LikertItem: React.FC<{
  item: QuestionnaireItem;
  response: string;
  highlightMissing: boolean;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({ item, response, highlightMissing, handleRadioButtonResponse }) => {
  const sanitizedHTML = DOMPurify.sanitize(item.text);

  return (
    <div
      className={
        response || !highlightMissing
          ? styles.survey_item
          : styles.survey_item_missing
      }
    >
      <p className={styles.survey_item_text}>
        <b>{item.title !== "" && item.title.concat(": ")}</b>
        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      </p>

      {isLikertScaleOptions(item.options) ? (
        <div className={styles.survey_item_response_area}>
          <span className={styles.survey_item_left_end}>
            {item.options && item.options.leftLabel}
          </span>
          <ToggleButtonGroup
            value={response}
            onChange={(_, value) =>
              value && handleRadioButtonResponse(item.id, value.toString())
            }
            exclusive
            size="small"
            fullWidth={true}
            className={styles.survey_item_buttons}
          >
            {item.options && item.options.length > 0 ? (
              Array.from({ length: item.options.length }).map((_, i) => (
                <ToggleButton
                  key={i}
                  value={i + 1}
                  style={
                    response === (i + 1).toString()
                      ? {
                        backgroundColor: "lightsteelblue",
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
      ) : null}
    </div>
  );
};

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

const LikertLabelsItem: React.FC<{
  item: QuestionnaireItem;
  response: string;
  highlightMissing: boolean;
  handleRadioButtonResponse: (itemId: string, optionId: string) => void;
}> = ({ item, response, highlightMissing, handleRadioButtonResponse }) => {
  const sanitizedHTML = DOMPurify.sanitize(item.text);
  return (
    <div
      className={
        response || !highlightMissing
          ? styles.survey_item
          : styles.survey_item_missing
      }
    >
      <p className={styles.survey_item_text}>
        <b>{item.title !== "" && item.title.concat(": ")}</b>
        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
      </p>

      {isLikertLabelScaleOptions(item.options) ? (
        <div className={styles.survey_item_response_area}>
          <ToggleButtonGroup
            value={response}
            onChange={(_, value) =>
              value && handleRadioButtonResponse(item.id, value.toString())
            }
            exclusive
            size="small"
            fullWidth={true}
            className={styles.survey_item_buttons_label}
          >
            {item.options ? (
              Object.keys(item.options.labels).map((key, _) => (
                <ToggleButton
                  key={key}
                  className={styles.survey_item_buttons_label_wrap}
                  value={key}
                  style={
                    response === key.toString()
                      ? {
                        backgroundColor: "lightsteelblue",
                        fontSize: "medium",
                        padding: "0px",
                        textTransform: "none",

                      }
                      : {
                        fontSize: "medium",
                        padding: "0px",
                        textTransform: "none",
                      }
                  }
                >
                  {item.options && "labels" in item.options
                    ? item.options.labels[Number(key)]
                    : null}
                </ToggleButton>
              ))
            ) : (
              <div>no options</div>
            )}
          </ToggleButtonGroup>
        </div>
      ) : null}
    </div>
  );
};

// guard function to check that type is likertLabel
function isLikertLabelScaleOptions(
  options: any,
): options is LikertScaleLabelOptions {
  return typeof options === "object" && options !== null && "labels" in options;
}

const FreeTextItem: React.FC<{
  item: QuestionnaireItem;
  response: string;
  highlightMissing: boolean;
  optional: boolean;
  handleTextResponse: (itemId: string, optionId: string) => void;
}> = ({ item, response, highlightMissing, optional, handleTextResponse }) => {
  const sanitizedHTML = DOMPurify.sanitize(item.text);
  return (
    <div
      className={
        response || !highlightMissing || optional
          ? styles.survey_item
          : styles.survey_item_missing
      }
    >
      <p className={styles.survey_item_text}>
        <b>{item.title !== "" && item.title.concat(": ")}</b>

        <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
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
};

const InfoItem: React.FC<{ item: QuestionnaireItem }> = ({ item }) => {
  const sanitizedHTML = DOMPurify.sanitize(item.text);
  return (
    <div className={styles.survey_item}>
      <div className={styles.survey_item_text}>
        <p>
          <b>{item.title}</b>
        </p>
        <p>
          <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        </p>
      </div>
    </div>
  );
};

const LineItem = () => (
  <div className={styles.survey_item}>
    <hr
      style={{ width: "100%", backgroundColor: "#efefef", color: "#efefef" }}
    />
  </div>
);
