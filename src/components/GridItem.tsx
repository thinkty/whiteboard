import * as React from 'react';
import { GridItemURL } from './GridItemURL';

// Length of the edge of grid item
export const gridItemLen: number = 80;

export const defaultItems: GridItemT[] = [
  {
    id: 1635071086635,
    x: 3,
    y: 3,
    text: '1',
    url: 'https://www.youtube.com',
    icon: 'https://simpleicons.org/icons/youtube.svg',
  },
  {
    id: 1635071086630,
    x: 3,
    y: 1,
    text: '2',
  },
];

export type GridItemT = {
  id: number; // Too lazy to use uuid, just gonna use time in milliseconds
  x: number;
  y: number;
  width?: number;  // default 1
  height?: number; // default 1
  text?: string;
  url?: string;
  icon?: string;
};

type Props = {
  showGrid: boolean;
  removeItem: (x: number, y: number) => void;
} & GridItemT & typeof defaultProps;

const defaultProps = {
  width: 1,
  height: 1,
  text: '???',
};

export const GridItem = (props: Props): JSX.Element => {
  const { x, y, width, height, text, url, icon, showGrid, removeItem } = props;
  const [open, openModal] = React.useState<boolean>(false);
  const [hoveringCancel, setCancelHover] = React.useState<boolean>(false);
  const [hoveringConfirm, setConfirmHover] = React.useState<boolean>(false);

  return (
    <>
      <div
        style={{
          gridColumn: `${x} / span ${width}`,
          gridRow: `${y} / span ${height}`,
          padding: showGrid ? 0 : 5,
          backgroundColor: showGrid ? 'var(--primary)' : 'transparent',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {
          // If showing grid, allow right click to remove the item
          showGrid ?
          <div
            onContextMenu={(e) => {
              e.preventDefault();
              openModal(true);
            }}
            style={{
              width: '100%',
              height: '100%',
              color: 'var(--background)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            { text !== '' ? text : '???' }
          </div>
          :
          <>
            {
              // URL shortcuts
              url && url !== '' && icon && icon !== ''
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
                { text !== '' ? text : '???' }
              </div>
            }
          </>
        }
      </div>
      <div
        style={{
          display: open ? 'block' : 'none',
          position: 'fixed',
          zIndex: 1,
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}
      >
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            overflow: 'auto',
            backgroundColor: `var(--background)`,
            padding: 20,
            border: 'thin solid transparent',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Modal Action */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <div
              onClick={() => { openModal(false); }}
              onMouseEnter={() => { setCancelHover(true); }}
              onMouseLeave={() => { setCancelHover(false); }}
              style={{
                width: 100,
                padding: 10,
                border: 'thin solid var(--primary)',
                backgroundColor: hoveringCancel ? 'var(--primary)' : 'transparent',
                color: hoveringCancel ? 'var(--background)' : 'var(--primary)',
                cursor: 'pointer',
                borderRadius: 10,
                textAlign: 'center',
              }}
            >
              Cancel
            </div>
            <div
              onClick={() => {
                removeItem(x, y);
                openModal(false);
              }}
              onMouseEnter={() => { setConfirmHover(true); }}
              onMouseLeave={() => { setConfirmHover(false); }}
              style={{
                width: 100,
                padding: 10,
                border: 'thin solid var(--primary)',
                backgroundColor: hoveringConfirm ? 'var(--primary)' : 'transparent',
                color: hoveringConfirm ? 'var(--background)' : 'var(--primary)',
                cursor: 'pointer',
                borderRadius: 10,
                textAlign: 'center',
              }}
            >
              Remove
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

GridItem.defaultProps = defaultProps;
