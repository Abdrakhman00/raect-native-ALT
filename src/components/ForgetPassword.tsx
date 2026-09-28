import React, { useState } from 'react';
import { Text } from 'react-native';
import { Field, PrimaryButton, Screen, common } from './ui';

type Props = { onBack: () => void; onNext: (phone: string) => void };

export default function ForgetPassword({ onBack, onNext }: Props) {
  const [phone, setPhone] = useState('');
  const isValid = phone.replace(/\D/g, '').length >= 11;

  return (
    <Screen onBack={onBack} center>
      <Text style={[common.title, common.centerText]}>Восстановление пароля</Text>
      <Text style={[common.subtitle, common.centerText]}>
        Введите свой номер телефона, чтобы восстановить пароль.
      </Text>

      <Field
        icon="call"
        value={phone}
        onChangeText={setPhone}
        placeholder="+7 (700) 555 77 55"
        keyboardType="phone-pad"
      />
      <PrimaryButton
        title="Продолжить"
        disabled={!isValid}
        onPress={() => onNext(phone)}
      />
    </Screen>
  );
}