import React from 'react';
import { Button, InputGroup } from '@blueprintjs/core';

export interface SearchInputProps {
  isShow: boolean;
  width?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({ isShow, width = 260 }) => {
  if (!isShow) {
    return null;
  }

  const searchButton = <Button icon={'search'} minimal={true}></Button>;

  return (
    <div style={{ width }}>
      <InputGroup
        type={'search'}
        placeholder={'検索（行動、詳細）'}
        rightElement={searchButton}
      />
    </div>
  );
};

export default SearchInput;
