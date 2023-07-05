import React from 'react';

export interface LifelogListHeaderProps {
  enabled?: boolean;
}
export const LifelogListHeader: React.FC<LifelogListHeaderProps> = ({
  enabled = true,
}) => {
  return (
    <thead style={enabled ? {} : { display: 'none' }}>
      <tr>
        <th>開始時間</th>
        <th>行動内容</th>
        <th>詳細</th>
        <th style={{ textAlign: 'center' }}>操作</th>
      </tr>
    </thead>
  );
};

export default LifelogListHeader;
