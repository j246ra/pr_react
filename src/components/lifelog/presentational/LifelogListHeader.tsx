import React from 'react';

export interface LifelogListHeaderProps {
  enabled?: false;
}
export const LifelogListHeader: React.FC<LifelogListHeaderProps> = ({
  enabled = true,
}) => {
  return (
    <thead style={enabled ? {} : { display: 'none' }}>
      <tr>
        <th align={'left'}>開始時間</th>
        <th align={'left'}>行動内容</th>
        <th align={'left'}>詳細</th>
        <th align={'center'}>操作</th>
      </tr>
    </thead>
  );
};

export default LifelogListHeader;
