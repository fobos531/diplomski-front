import React, { useState } from 'react';

interface SearchBarProps {}

const SearchBar: React.FunctionComponent<SearchBarProps> = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <input
      className="border-solid border-2 border-purple-700"
      value={searchValue}
      onChange={(event) => setSearchValue(event.target.value)}
      placeholder="Search for movies, TV shows, people"
    />
  );
};

export default SearchBar;
