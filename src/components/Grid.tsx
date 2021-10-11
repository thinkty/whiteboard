import * as React from 'react';
import { GridItem, gridItemLen, GridItemT, } from './GridItem';

// Screen dimension (window.innerWidth, window.innerHeight) in pixels
type ScreenDimensionT = {
  width: number;
  height: number;
};

type Props = {
  currentItems: GridItemT[];
  updateItems: (newItems: GridItemT[]) => void;
  showGrid?: boolean;
} & typeof defaultProps;

const defaultProps = {
  showGrid: false,
};

export const Grid = (props: Props): JSX.Element => {
  const { currentItems, showGrid, } = props;
  const [dimension, setDimension] = React.useState<ScreenDimensionT>({ width: window.innerWidth, height: window.innerHeight });

  // Making the grid responsive
  React.useEffect((): VoidFunction => {
    const handleResize = (): void => { setDimension({ width: window.innerWidth, height: window.innerHeight }); }
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => { window.removeEventListener('resize', handleResize); }
  });

  // Calculate the max number of rows and columns based on the gridItemLen
  // Make the numbers odd to ease the calculation of the coordinates
  const numRows: number = Math.floor(dimension.height / gridItemLen) % 2 !== 0 ? Math.floor(dimension.height / gridItemLen) : Math.floor(dimension.height / gridItemLen) - 1;
  const numCols: number = Math.floor(dimension.width / gridItemLen) % 2 !== 0 ? Math.floor(dimension.width / gridItemLen) : Math.floor(dimension.width / gridItemLen) - 1;

  return (
    <div
      style={{
        width: numCols * gridItemLen,
        height: numRows * gridItemLen,
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, ${gridItemLen}px)`,
        gridTemplateRows: `repeat(${numRows}, ${gridItemLen}px)`,
        gridAutoFlow: 'dense',
        border: showGrid ? 'thin dotted black' : 'none',
      }}
    >
      {
        // Filter out the ones out of bounds and render GridItem react
        // components based on the prop: currentItems
        currentItems
        .filter((item: GridItemT) => ( item.x <= numCols && item.y <= numRows ))
        .map((item: GridItemT, i: number) => (
          <GridItem
            {...item}
            key={i}
          />
        ))
      }
    </div>
  );
}

Grid.defaultProps = defaultProps;
