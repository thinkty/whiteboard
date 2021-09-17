import React from 'react';
import { ColorResult, TwitterPicker } from 'react-color';

type Props = {
  label: string;
  currentColor: ColorResult;
  setValue: (value: ColorResult) => void;
} & typeof defaultProps;

const defaultProps = {
};

export const ColorPicker = (props: Props): JSX.Element => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      }}
    >
      <div>
        { props.label }
      </div>
      <TwitterPicker
        triangle="hide"
        color={props.currentColor.hex}
        onChange={(c: ColorResult, e: React.FormEvent<HTMLInputElement>): void => {
          e.preventDefault();
          props.setValue(c);
        }}
      />
    </div>
  );
}

ColorPicker.defaultProps = defaultProps;
