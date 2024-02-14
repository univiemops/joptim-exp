import styles from "./Tiles.module.css";
import { sumOfArray } from "../../../utils/helperFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";


interface PropsEmptyTileSimple {
  mini?: boolean;
}

export const EmptyTile: React.FC<PropsEmptyTileSimple> = (props) => {
  const { mini } = props;
  return <div className={mini ? styles.empty_tile_mini : styles.empty_tile}></div>;
};

export const EmptyTileY: React.FC<PropsEmptyTileSimple> = (props) => {
  const { mini } = props;
  return <div className={mini ? styles.empty_tile_y_mini : styles.empty_tile_y}></div>;
};



export const EmptyTileXLeft: React.FC<PropsEmptyTileSimple> = (props) => {
  const { mini } = props;
  return (
    <div className={mini ? styles.empty_tile_x_mini : styles.empty_tile_x}>
      <div className={mini ? styles.empty_tile_label_left_mini : styles.empty_tile_label_left}>
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
  mini?: boolean;
}

export const EmptyTileXRight: React.FC<PropsEmptyTileXRight> = (props) => {
  const { assignments, tasks, workers, mini } = props;
  const filled = sumOfArray(assignments.map((subArray) => tasks[subArray[0]]));
  const capacity = sumOfArray(workers);
  return (
    <div className={mini ? styles.empty_tile_x_mini : styles.empty_tile_x}>
      <div className={mini ? styles.empty_tile_label_right_mini : styles.empty_tile_label_right}>
        <div className={mini ? styles.empty_tile_label_right_inner_mini : styles.empty_tile_label_right_inner}>
          <FontAwesomeIcon
            icon={faArrowRightLong}
            opacity={filled === 0 ? 0.2 : 1}
            size="lg"
          />
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
        <div className={mini ? styles.empty_tile_label_right_inner_mini : styles.empty_tile_label_right_inner}>
          <FontAwesomeIcon icon={faArrowRightLong} size="lg" opacity={0} />
          <span style={{ fontWeight: "bold", opacity: 0 }}>{capacity}</span>
        </div>
      </div>
    </div>
  );
};
