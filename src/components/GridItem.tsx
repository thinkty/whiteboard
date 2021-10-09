import * as React from 'react';

// Length of the edge of grid item
export const gridItemLen: number = 80;

export const defaultItems: GridItemT[] = [
  {
    x: 3,
    y: 3,
    text: '1',
  },
  {
    x: 3,
    y: 1,
    text: '2',
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

enum DragStatus {
  None,
  Enter,
  Over,
  Leave,
};

export const GridItem = (props: Props): JSX.Element => {
  const { showGrid, x, y, width, height, text } = props;
  const [dragging, setDrag] = React.useState<boolean>(false);
  const [dragStatus, setDragStatus] = React.useState<DragStatus>(DragStatus.None);

  return (
    <div
      draggable={showGrid}
      onDrop={() => { console.log('yeet'); }}
      onDragStart={() => { setDrag(true); }}
      onDragEnd={() => { setDrag(false); }}
      onDragEnter={() => { setDragStatus(DragStatus.Enter); }}
      onDragOver={() => { setDragStatus(DragStatus.Over); }}
      onDragLeave={() => { setDragStatus(DragStatus.Leave); }}
      style={{
        border: showGrid ? 'thin dotted black' : 'none',
        cursor: showGrid ? 'move' : 'default',
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
          cursor: showGrid ? 'move' : 'pointer',
          backgroundColor: dragStatus === DragStatus.Over ? '#FFF300' : '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: dragging ? 0.5 : 1.0,
        }}
      >
        { text }
      </div>
    </div>
  );
}

GridItem.defaultProps = defaultProps;
