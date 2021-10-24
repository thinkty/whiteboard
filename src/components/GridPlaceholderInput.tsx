import * as React from 'react';

type Props = {
  label: string;
  value: string;
  updateValue: (newValue: string) => void;
} & typeof defaultProps;

const defaultProps = {};

export const GridPlaceholderInput = ({label, value, updateValue}: Props): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <div>
        { label } :
      </div>
      <input
        value={value}
        onChange={(e) => { updateValue(e.target.value); }}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
          border: 'none',
          outline: 'none',
          borderBottom: 'thin solid var(--primary)',
          color: 'var(--primary)',
          fontFamily: 'verdana, sans-serif',
          fontSize: 14,
          padding: 5,
          margin: 5
        }}
      />
    </div>
  );
}

GridPlaceholderInput.defaultProps = defaultProps;
