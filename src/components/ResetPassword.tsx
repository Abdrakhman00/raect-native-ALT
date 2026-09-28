import React, { useState } from 'react';
import { Text } from 'react-native';
import { Field, PrimaryButton, Screen, common } from './ui';

type Props = { onBack: () => void; onDone: () => void };

export default function ResetPassword({ onBack, onDone }: Props) {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');

  const isStrong =
    password.length >= 8 && /[a-zа-я]/.test(password) && /[A-ZА-Я]/.test(password);
  const isValid = isStrong && password === repeat;

  return (
    <Screen onBack={onBack} center>
      <Text style={[common.title, common.centerText]}>Сбросить пароль</Text>
      <Text style={[common.subtitle, common.centerText]}>
        Не менее 8 символов, с прописными и строчными буквами
      </Text>

      <Field
        icon="lock-closed"
        password
        value={password}
        onChangeText={setPassword}
        placeholder="Пароль"
      />
      <Field
        icon="lock-closed"
        password
        value={repeat}
        onChangeText={setRepeat}
        placeholder="Повторите пароль"
      />
      <PrimaryButton title="Продолжить" disabled={!isValid} onPress={onDone} />
    </Screen>
  );
}