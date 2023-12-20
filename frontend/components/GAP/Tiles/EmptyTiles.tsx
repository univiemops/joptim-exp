import styles from "./Tiles.module.css";

export const EmptyTile = () => {
  return <div className={styles.empty_tile}></div>;
};

export const EmptyTileY = () => {
  return <div className={styles.empty_tile_y}></div>;
};

export const EmptyTileX = () => {
  return (
    <div className={styles.empty_tile_x}>
      <div className={styles.empty_tile_label}>
        <span style={{ opacity: 0.65 }}>Assigned</span>
        <br />
        <span style={{ fontWeight: "bold" }}>Total</span>
      </div>
    </div>
  );
};
