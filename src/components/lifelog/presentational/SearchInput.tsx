import React, { useEffect, useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { useLifelog } from '@providers/LifelogProvider';
import { LIFELOG_LIST, SEARCH_INPUT } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';
import { SEARCH_INPUT_TEST_ID as TEST_ID } from '@lib/consts/testId';
import styles from './SearchInput.module.scss';
import { EmptyComponent } from '@src/components/EmptyComponent';

export type SearchInputProps = {
  isShown: boolean;
  width?: number;
};

export default function SearchInput({
  isShown,
  width = 260,
}: SearchInputProps) {
  const { searchLogs, searchWord } = useLifelog();
  const [word, setWord] = useState(searchWord);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => setWord(searchWord), [searchWord]);

  const handleSearch = () => {
    searchLogs(word, LIFELOG_LIST.MESSAGE.ERROR).then(() =>
      window.scrollTo({ top: 0, behavior: 'instant' })
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isComposing) {
      handleSearch();
    }
  };

  const containerStyle = {
    '--container-width': `${width}px`,
  } as React.CSSProperties;

  const searchButton = (
    <Button
      data-testid={TEST_ID.BUTTON}
      icon={IconNames.SEARCH}
      minimal={true}
      onClick={handleSearch}
    ></Button>
  );

  if (!isShown) return <EmptyComponent />;

  return (
    <div
      className={styles.container}
      style={containerStyle}
      data-testid={TEST_ID.BASE}
    >
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
}
