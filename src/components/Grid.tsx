import * as React from 'react';
import { GridItem, gridItemLen, GridItemT, } from './GridItem';
import { GridPlaceholder } from './GridPlaceholder';

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

  // Storing the occupied coordinates before filling in the placeholders to avoid overlaps
  const occupiedCoordinates: {x: number, y: number}[] = [];
  currentItems.forEach((item: GridItemT) => {
    occupiedCoordinates.push({
      x: item.x,
      y: item.y,
    });
  });

  // Create grid placeholders excluding the already occupied coordinates
  // TODO: this is just horrible
  const placeholders: JSX.Element[] = [];
  for (let x = 1; x <= numCols; x++) {
    for (let y = 1; y <= numRows; y++) {
      if (!occupiedCoordinates.includes({ x, y })) {
        placeholders.push(
          <GridPlaceholder
            key={occupiedCoordinates.length + numCols * y + x}
            x={x}
            y={y}
            showGrid={showGrid}
          />
        );
      }
    }
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
        border: showGrid ? 'thin dotted black' : 'none',
      }}
    >
      {
        // Add placeholder grid tiles to handle adding new blocks
        ...placeholders
      }
      {
        // Filter out the ones out of bounds and render GridItem react
        // components based on the prop: currentItems
        currentItems
        .filter((item: GridItemT) => ( item.x <= numCols && item.y <= numRows ))
        .map((item: GridItemT, i: number) => (
          <GridItem
            key={i}
            {...item}
          />
        ))
      }
    </div>
  );
}

Grid.defaultProps = defaultProps;
