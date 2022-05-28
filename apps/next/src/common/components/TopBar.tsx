import SearchBar from '@features/search/components/SearchBar';
import React, { useState } from 'react';

interface TopBarProps {}

const TopBar: React.FunctionComponent<TopBarProps> = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
};

export default TopBar;
