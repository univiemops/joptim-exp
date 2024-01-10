import styles from "./Tiles.module.css";
import { sumOfArray } from "../../../utils/helperFunctions";

export const EmptyTile = () => {
  return <div className={styles.empty_tile}></div>;
};

export const EmptyTileY = () => {
  return <div className={styles.empty_tile_y}></div>;
};

export const EmptyTileXLeft = () => {
  return (
    <div className={styles.empty_tile_x}>
      <div className={styles.empty_tile_label_left}>
        <span style={{ fontWeight: "bold" }}>Full</span>
        <br />
        <span style={{ fontWeight: "bold", opacity: 0.55 }}>Total</span>
      </div>
    </div>
  );
};

interface PropsEmptyTileXRight {
  assignments: Array<[number, number]>;
  tasks: Array<number>;
  workers: Array<number>;
}

export const EmptyTileXRight: React.FC<PropsEmptyTileXRight> = (props) => {
  const { assignments, tasks, workers } = props;
  const filled = sumOfArray(assignments.map((subArray) => tasks[subArray[0]]));
  const capacity = sumOfArray(workers);
  return (
    <div className={styles.empty_tile_x}>
      <div className={styles.empty_tile_label_right}>
        <div
          style={{
            minWidth: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <span
            style={
              filled === 0
                ? { fontWeight: "bold", opacity: 0.2 }
                : {
                    fontWeight: "bold",
                  }
            }
          >
            =
          </span>
          <span
            style={
              filled === 0
                ? { fontWeight: "bold", opacity: 0.2 }
                : {
                    fontWeight: "bold",
                  }
            }
          >
            {filled}
          </span>
        </div>
        <div
          style={{
            minWidth: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <span style={{ fontWeight: "bold", opacity: 0.55 }}>=</span>
          <span style={{ fontWeight: "bold", opacity: 0.55 }}>{capacity}</span>
        </div>
      </div>
    </div>
  );
};
