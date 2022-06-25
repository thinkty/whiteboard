import * as React from 'react';
import { Container } from './Container';

export const App = (): JSX.Element => {

  const style = {
    '--primary': '#ffffff',
    '--background': '#444444',
    '--add-modal-radius': '10px',
    '--add-modal-button': '#333333',
    '--add-modal-textfield-background': '#333333',
    '--add-button-icon': '#ffffff',
    '--item-width': '200px',
    '--item-radius': '10px',
    '--item-header-icon-fill': '#ffffff',
    '--item-thumbnail-background': '#000000',
    '--item-thumbnail-height': '100px',
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        fontFamily: 'verdana, sans-serif',
        color: style['--primary'],
        backgroundColor: style['--background'],
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      <Container />
    </div>
  );
}
