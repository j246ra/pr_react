import React from 'react';
import { Button, InputGroup } from '@blueprintjs/core';

export interface SearchInputProps {
  isLogin: boolean;
  width: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ isLogin, width = 260 }) => {
  const searchButton = (
    <Button disabled={!isLogin} icon={'search'} minimal={true}></Button>
  );
  return (
    <div style={{ width }}>
      <InputGroup
        disabled={!isLogin}
        type={'search'}
        placeholder={'検索（行動、詳細）'}
        rightElement={searchButton}
      />
    </div>
  );
};

export default SearchInput;
