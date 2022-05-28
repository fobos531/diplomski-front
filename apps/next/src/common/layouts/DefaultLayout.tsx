import React from 'react';

import TopBar from '@common/components/TopBar';

const DefaultLayout: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <TopBar />
      {children}
    </>
  );
};

export default DefaultLayout;
