import React, {useState} from 'react';
import {FormGroup,InputGroup} from '@blueprintjs/core';

const InputEmail = () => {
  const [email, setEmail] = useState('');

  return(
    <FormGroup
      label='メールアドレス'
      labelFor='email-input'
      labelInfo='(必須)'
    >
      <InputGroup
        id="email-input"
        placeholder="メールアドレスを入力"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </FormGroup>
  );
}
export default InputEmail;
