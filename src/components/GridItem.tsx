import * as React from 'react';

// Length of the edge of grid item
export const gridItemLen: number = 80;
export enum ItemType {
  Url,
}
export const defaultItems: GridItemT[] = [
  {
    x: 3,
    y: 3,
    text: 'example',
  },
];

export type GridItemT = {
  x: number;
  y: number;
  width?: number;  // default 1
  height?: number; // default 1
  text?: string;
  url?: string;
};

type Props = {
  showGrid: boolean;
} & GridItemT & typeof defaultProps;

const defaultProps = {
  width: 1,
  height: 1,
  text: '???',
};

export const GridItem = (props: Props): JSX.Element => {
  const { showGrid, x, y, width, height, text } = props;
  const [hover, setHover] = React.useState<boolean>(false);

  return (
    <div
      style={{
        border: showGrid ? 'thin dotted black' : 'none',
        // Translating the points so the center is (0,0)
        gridColumn: `${x} / span ${width}`,
        gridRow: `${y} / span ${height}`,
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
