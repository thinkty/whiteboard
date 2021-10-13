import * as React from 'react';

type Props = {
  x: number;
  y: number;
  showGrid: boolean;
} & typeof defaultProps;

const defaultProps = {};

export const GridPlaceholder = ({ x, y, showGrid }: Props): JSX.Element => {
  const [hovering, setHover] = React.useState<boolean>(false);

  return (
    <div
      onMouseEnter={() => { setHover(true); }}
      onMouseLeave={() => { setHover(false); }}
      // TODO: don't listen when not showing grid
      onContextMenu={(e) => { e.preventDefault(); console.log('Right clicked!'); }}
      onClick={() => { console.log('Left clicked!'); }}
      style={{
        gridColumn: `${x} / span 1`,
        gridRow: `${y} / span 1`,
        border: showGrid ? 'thin dashed var(--primary)' : 'unset',
        backgroundColor: hovering ? 'var(--primary)' : 'inherit',
      }}
    />
  );
}

GridPlaceholder.defaultProps = defaultProps;
