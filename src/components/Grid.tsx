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
  updateItems: (newItem: GridItemT) => void;
  removeItem: (x: number, y: number) => void;
  showGrid?: boolean;
} & typeof defaultProps;

const defaultProps = {
  showGrid: false,
};

export const Grid = (props: Props): JSX.Element => {
  const { currentItems, showGrid, updateItems, removeItem } = props;
  const [dimension, setDimension] = React.useState<ScreenDimensionT>({ width: window.innerWidth, height: window.innerHeight });
  const [items, setItems] = React.useState<JSX.Element[]>();

  // Making the grid responsive
  React.useEffect((): VoidFunction => {
    const handleResize = (): void => { setDimension({ width: window.innerWidth, height: window.innerHeight }); }
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => { window.removeEventListener('resize', handleResize); }
  }, []);

  // Calculate the max number of rows and columns based on the gridItemLen
  // Make the numbers odd to ease the calculation of the coordinates
  const numRows: number = Math.floor(dimension.height / gridItemLen) % 2 !== 0 ? Math.floor(dimension.height / gridItemLen) : Math.floor(dimension.height / gridItemLen) - 1;
  const numCols: number = Math.floor(dimension.width / gridItemLen) % 2 !== 0 ? Math.floor(dimension.width / gridItemLen) : Math.floor(dimension.width / gridItemLen) - 1;

  // Rendering the grid items/placeholders
  React.useEffect(() => {
    const tempItems: JSX.Element[] = [];

    // Storing the occupied coordinates before filling in the placeholders to avoid overlaps
    const occupiedCoordinates: {x: number, y: number}[] = [];
    currentItems.forEach((item: GridItemT) => {
      if (item.x <= numCols && item.y <= numRows) {
        occupiedCoordinates.push({
          x: item.x,
          y: item.y,
        });

        // Place actual grid items into the list
        tempItems.push(
          <GridItem
            key={item.id}
            showGrid={showGrid}
            removeItem={removeItem}
            {...item}
          />
        );
      }
    });

    // Create grid placeholders excluding the already occupied coordinates
    // TODO: this is just horrible.. but it works :D
    for (let x = 1; x <= numCols; x++) {
      for (let y = 1; y <= numRows; y++) {
        if (!occupiedCoordinates.some((coord) => coord.x === x && coord.y === y)) {
          tempItems.push(
            <GridPlaceholder
              key={numCols * y + x}
              x={x}
              y={y}
              showGrid={showGrid}
              updateItems={(newItem) => { updateItems(newItem); }}
            />
          );
        }
      }
    }

    setItems(tempItems);
  }, [currentItems, numCols, numRows, showGrid]);


  return (
    <div
      style={{
        width: numCols * gridItemLen,
        height: numRows * gridItemLen,
        display: 'grid',
        gridTemplateColumns: `repeat(${numCols}, ${gridItemLen}px)`,
        gridTemplateRows: `repeat(${numRows}, ${gridItemLen}px)`,
        gridAutoFlow: 'dense',
        border: showGrid ? 'thin dotted var(--primary)' : 'none',
      }}
    >
      {
        items
      }
    </div>
  );
}

Grid.defaultProps = defaultProps;
