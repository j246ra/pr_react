import React, { useState } from 'react';
import { Button, FormGroup, InputGroup, Callout, Card } from '@blueprintjs/core';
import session from "./lib/api/session";
import toast from 'react-hot-toast';

const PasswordForget = () => {
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const api = session();

  const handlePasswordForget = (e) => {
    e.preventDefault();
    api.passwordForget(email)
      .then(() => {
        toast.success("パスワードリセットメールを送信しました。");
        setSuccess(true); //todo 成功画面は別途作成する
      })
      .catch(() => {
        toast.error('送信に失敗しました。', {style: {color: 'red'}});
      });
  };

  return (
    <div className='session-container'>
      { success ? <h3>送信に成功しました。メールをご確認ください。</h3> :
        <Card elevation='2' className='session-card'>
          <Callout className="session-callout" icon="info-sign" intent="primary">
            パスワードリセットメールの送信先を入力してください。
          </Callout>
          <form onSubmit={handlePasswordForget}>
            <FormGroup
              label="メールアドレス"
              labelFor="email-input"
              labelInfo="(必須)"
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
            <Button
              type="submit"
              intent="primary"
              icon="envelope"
              text="送信"
            />
          </form>
        </Card>
      }
    </div>
  );
};

export default PasswordForget;
