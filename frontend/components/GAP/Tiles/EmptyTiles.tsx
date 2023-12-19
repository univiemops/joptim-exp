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

export const EmptyTileMini = () => {
  return <div className={styles.empty_tile_mini}></div>;
};
export const EmptyTileYMini = () => {
  return <div className={styles.empty_tile_y_mini}></div>;
};
export const EmptyTileXMini = () => {
  return <div className={styles.empty_tile_x_mini}></div>;
};
