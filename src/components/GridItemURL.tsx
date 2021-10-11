import * as React from 'react';

type Props = {
  text: string;
  url: string;
  icon: string;
} & typeof defaultProps;

const defaultProps = {};

export const GridItemURL = ({ text, url, icon }: Props): JSX.Element => {
  return (
    <a
      draggable={false} // The html element 'a' is draggable by default
      href={url}
      target="_blank"
      style={{
        width: '100%',
        height: '100%',
        border: '2px solid var(--primary)',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textDecoration: 'none', // Override default
        color: 'var(--primary)', // Override default
      }}
    >
      <img
        src={icon}
        width="50%"
      />
      { text }
    </a>
  );
}

GridItemURL.defaultProps = defaultProps;
