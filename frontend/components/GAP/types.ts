import React from 'react';

export interface GAPProps {
  loading: boolean;
  tasks: number[];
  assignments: [number, number][];
  workers: number[];
  handleTileClick?: (
    e: React.MouseEvent<HTMLDivElement>,
    coordinates: [number, number]
  ) => void;
  freeze: boolean;
  icons: boolean;
}