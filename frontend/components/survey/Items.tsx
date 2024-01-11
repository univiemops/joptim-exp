import styles from "./survey.module.css";
import React from "react";
type Props = {
  title: string;
  children?: React.ReactNode;
};

export const BasicItem = ({ title, children }: Props) => {
  return (
    <div className={styles.survey_item}>
      <b>{title}:</b> {children}
    </div>
  );
};
