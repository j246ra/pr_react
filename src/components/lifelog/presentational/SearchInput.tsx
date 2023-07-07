import React, { useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';

export interface SearchInputProps {
  isShow: boolean;
  width?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ isShow, width = 260 }) => {
  if (!isShow) return null;

  const [word, setWord] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleSearch = () => {
    console.log(`Search for: ${word}`); // ここで検索APIリクエスト処理を行う
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isComposing) {
      handleSearch();
    }
  };

  const searchButton = (
    <Button icon={'search'} minimal={true} onClick={handleSearch}></Button>
  );

  return (
    <div style={{ width }}>
      <InputGroup
        type={'search'}
        placeholder={'検索（行動、詳細）'}
        rightElement={searchButton}
        value={word}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
    </div>
  );
};

export default SearchInput;
