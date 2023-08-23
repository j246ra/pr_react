import React, { useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import { SEARCH_INPUT } from '@lib/consts';
import { IconNames } from '@blueprintjs/icons';
import { SEARCH_INPUT_TEST_ID as TEST_ID } from '@lib/consts/testId';

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
    <Button
      data-testid={TEST_ID.BUTTON}
      icon={IconNames.SEARCH}
      minimal={true}
      onClick={handleSearch}
    ></Button>
  );

  return (
    <div style={{ width }} data-testid={TEST_ID.BASE}>
      <InputGroup
        type={'search'}
        placeholder={SEARCH_INPUT.PLACEHOLDER}
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
