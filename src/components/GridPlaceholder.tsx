import * as React from 'react';

type Props = {
  x: number;
  y: number;
  showGrid: boolean;
} & typeof defaultProps;

const defaultProps = {};

export const GridPlaceholder = ({ x, y, showGrid }: Props): JSX.Element => {
  const [hovering, setHover] = React.useState<boolean>(false);
  const [open, openModal] = React.useState<boolean>(false);
  const [hoveringExit, setExitHover] = React.useState<boolean>(false);
  const [hoveringCancel, setCancelHover] = React.useState<boolean>(false);
  const [hoveringConfirm, setConfirmHover] = React.useState<boolean>(false);


  return (
    <>
      <div
        onMouseEnter={() => { setHover(true); }}
        onMouseLeave={() => { setHover(false); }}
        onContextMenu={(e) => {
          // Only open editing modal when grid is shown
          if (showGrid) {
            e.preventDefault();
            openModal(true);
          }
        }}
        style={{
          gridColumn: `${x} / span 1`,
          gridRow: `${y} / span 1`,
          border: showGrid ? 'thin dashed var(--primary)' : 'unset',
          backgroundColor: hovering && showGrid ? 'var(--primary)' : 'inherit',
          opacity: hovering && showGrid ? 0.5 : 1,
        }}
      />
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
            width: 500,
            height: 500,
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
          {/* Modal Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Editing modal header */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div />
              <div
                style={{
                  opacity: hoveringExit ? 0.5 : 1,
                  cursor: hoveringExit ? 'pointer' : 'default',
                }}
                onMouseEnter={() => { setExitHover(true); }}
                onMouseLeave={() => { setExitHover(false); }}
                onClick={() => { openModal(false); }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="24" width="24">
                  <path xmlns="http://www.w3.org/2000/svg" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill={`var(--primary)`}></path>
                </svg>
              </div>
            </div>
            {/* Editing modal data section */}
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              X : { x }, Y : -{ y }
            </div>
          </div>
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
              Confirm
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

GridPlaceholder.defaultProps = defaultProps;
