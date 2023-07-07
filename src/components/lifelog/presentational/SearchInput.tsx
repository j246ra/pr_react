import React, { useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';

export interface SearchInputProps {
  isShow: boolean;
  width?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ isShow, width = 260 }) => {
  if (!isShow) return null;

  const { searchLogs } = useLifelog();
  const [word, setWord] = useState('');
  const [isComposing, setIsComposing] = useState(false);

  const handleSearch = () => {
    searchLogs(word).catch((e) => {
      notify.error(e.message);
    });
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
