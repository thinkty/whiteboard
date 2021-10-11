import * as React from 'react';
import { GridItemURL } from './GridItemURL';

// Length of the edge of grid item
export const gridItemLen: number = 80;

export const defaultItems: GridItemT[] = [
  {
    x: 3,
    y: 3,
    text: '1',
    url: 'https://www.youtube.com',
    icon: 'https://simpleicons.org/icons/youtube.svg',
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
  icon?: string;
};

type Props = {} & GridItemT & typeof defaultProps;

const defaultProps = {
  width: 1,
  height: 1,
  text: '???',
};

export const GridItem = (props: Props): JSX.Element => {
  const { x, y, width, height, text, url, icon } = props;

  return (
    <div
      style={{
        gridColumn: `${x} / span ${width}`,
        gridRow: `${y} / span ${height}`,
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {
        // URL shortcuts
        url && icon
        ?
        <GridItemURL
          url={url}
          text={text}
          icon={icon}
        />
        :
        <div
          style={{
            width: '100%',
            height: '100%',
            border: '2px solid var(--primary)',
            borderRadius: 10,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          { text }
        </div>
      }
    </div>
  );
}

GridItem.defaultProps = defaultProps;
