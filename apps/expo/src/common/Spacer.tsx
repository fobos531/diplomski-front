import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  width?: number;
  height?: number;
}

const Spacer: React.FunctionComponent<SpacerProps> = ({ width, height }) => {
  return <View style={{ width, height }} />;
};

export default Spacer;
