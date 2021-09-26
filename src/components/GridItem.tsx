import * as React from 'react';

// Length of the edge of grid item
export const gridItemLen: number = 80;

export type GridItemT = {
  x: number;
  y: number;
  width?: number;
  height?: number;
  text?: string;
};

type Props = {
  showGrid: boolean;
  numRows: number;
  numCols: number;
} & GridItemT & typeof defaultProps;

const defaultProps = {
  width: 1,
  height: 1,
  text: '???',
};

export const GridItem = (props: Props): JSX.Element => {
  const { showGrid, x, y, numRows, numCols, width, height, text } = props;
  const [hover, setHover] = React.useState<boolean>(false);

  return (
    <div
      style={{
        // Check the item is in the grid
        display: x > numCols - 1 || y > numRows - 1 ? 'none' : 'block',
        border: showGrid ? 'thin dotted black' : 'none',
        // Translating the points so the center is (0,0)
        gridColumn: `${x + (numCols + 1) / 2} / span ${width}`,
        gridRow: `${(numRows + 1) / 2 - y} / span ${height}`,
        padding: 5,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 10,
          cursor: 'pointer',
          backgroundColor: hover ? '#FFF300' : '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onMouseEnter={() => { setHover(true); }}
        onMouseLeave={() => { setHover(false); }}
      >
        { text }
      </div>
    </div>
  );
}

GridItem.defaultProps = defaultProps;
