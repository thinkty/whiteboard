import * as React from 'react';
import { gridItemLen } from './GridItem';

// Screen dimension (window.innerWidth, window.innerHeight) in pixels
type ScreenDimensionT = {
  width: number;
  height: number;
};

type Props = {
  showGrid: boolean;
} & typeof defaultProps;

const defaultProps = {
  showGrid: false,
};

export const Grid = (props: Props): JSX.Element => {
  const { showGrid, } = props;
  const [dimension, setDimension] = React.useState<ScreenDimensionT>({ width: window.innerWidth, height: window.innerHeight });

  // Making the grid responsive
  React.useEffect((): VoidFunction => {
    const handleResize = (): void => { setDimension({ width: window.innerWidth, height: window.innerHeight }); }
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => { window.removeEventListener('resize', handleResize); }
  });

  // Calculate the max number of rows and columns based on the gridItemLen
  const numRows: number = Math.floor(dimension.height / gridItemLen);
  const numCols: number = Math.floor(dimension.width / gridItemLen);

  // Example
  let samples: JSX.Element[] = [];
  for (let i = 0; i < numRows * numCols; i++) {
    samples.push(
      <div
        key={i}
        style={{
          border: showGrid ? 'thin solid black' : 'none',
          textAlign: 'center',
        }}
      >
        { i }
      </div>
    );
  }

  return (
    <div
      style={{
        width: numCols * gridItemLen,
        height: numRows * gridItemLen,
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, ${gridItemLen}px)`,
        gridTemplateRows: `repeat(${numRows}, ${gridItemLen}px)`,
        gridAutoFlow: 'dense',
        border: showGrid ? 'thin solid black' : 'none',
      }}
    >
      { samples }
    </div>
  );
}

Grid.defaultProps = defaultProps;
