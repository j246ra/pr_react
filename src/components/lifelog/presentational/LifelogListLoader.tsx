import React from 'react';
import styles from '@lifelog/container/LifelogList.module.scss';
import { Intent, Spinner, SpinnerSize } from '@blueprintjs/core';
import { LIFELOG_LIST_TEST_ID as TEST_ID } from '@lib/consts/testId';

export default function LifelogListLoader() {
  return (
    <tr data-testid={TEST_ID.SPINNER}>
      <td className={styles.spinnerTd} colSpan={4}>
        <Spinner intent={Intent.PRIMARY} size={SpinnerSize.SMALL} />
      </td>
    </tr>
  );
}
