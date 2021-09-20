import * as React from 'react';

// Length of the edge of grid item
export const gridItemLen: number = 80;

type Props = {} & typeof defaultProps;

const defaultProps = {};

export const GridItem = ({}: Props): JSX.Element => {
  return (
    <div>
    </div>
  );
}

GridItem.defaultProps = defaultProps;
