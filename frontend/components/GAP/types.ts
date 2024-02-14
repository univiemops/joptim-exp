import React from 'react';

export interface GAPProps {
  tasks: number[];
  assignments: [number, number][];
  workers: number[];
  handleTileClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    coordinates: [number, number]
  ) => void;
  freeze: boolean;
  icons: boolean;
  mini?: boolean;
}
