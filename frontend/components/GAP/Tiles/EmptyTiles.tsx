import styles from "./Tiles.module.css";

export const EmptyTile = () => {
  return <div className={styles.empty_tile}></div>;
};

export const EmptyTileY = () => {
  return <div className={styles.empty_tile_y}></div>;
};

export const EmptyTileX = () => {
  return <div className={styles.empty_tile_x}></div>;
};
