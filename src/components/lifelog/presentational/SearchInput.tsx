import React, { useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';

export interface SearchInputProps {
  isShow: boolean;
  width?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ isShow, width = 260 }) => {
  if (!isShow) return null;
  const [word, setWord] = useState('');

  const searchButton = <Button icon={'search'} minimal={true}></Button>;

  return (
    <div style={{ width }}>
      <InputGroup
        type={'search'}
        placeholder={'検索（行動、詳細）'}
        rightElement={searchButton}
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
