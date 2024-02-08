import React, { useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import { useLifelog } from '@providers/LifelogProvider';
import notify from '@lib/toast';
import { SEARCH_INPUT } from '@lib/consts/component';
import { IconNames } from '@blueprintjs/icons';
import { SEARCH_INPUT_TEST_ID as TEST_ID } from '@lib/consts/testId';
import styles from './SearchInput.module.scss';
import { EmptyComponent } from '@src/components/EmptyComponent';

export type SearchInputProps = {
  isShow: boolean;
  width?: number;
};

export default function SearchInput({ isShow, width = 260 }: SearchInputProps) {
  if (!isShow) return <EmptyComponent />;

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
