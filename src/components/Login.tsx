import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Field, PrimaryButton, Screen, common } from './ui';
import { colors } from '../theme';

type Props = { onForgot: () => void; onRegister: () => void };

export default function Login({ onForgot, onRegister }: Props) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Screen>
      <Text style={common.title}>Привет, с возвращением!</Text>
      <Text style={common.subtitle}>Войдите в свой аккаунт.</Text>

      <Field
        icon="call"
        value={phone}
        onChangeText={setPhone}
        placeholder="Номер телефона"
        keyboardType="phone-pad"
      />
      <Field
        icon="lock-closed"
        password
        value={password}
        onChangeText={setPassword}
        placeholder="Пароль"
      />

      <Pressable style={s.forgot} onPress={onForgot}>
        <Text style={s.link}>Забыл пароль?</Text>
      </Pressable>

      <PrimaryButton title="Войти" onPress={() => console.log('Войти басылды')} />

      <View style={s.register}>
        <Text style={s.registerText}>У вас нет аккаунта?</Text>
        <Pressable onPress={onRegister}>
          <Text style={[s.link, { fontWeight: '600' }]}>Зарегистрироваться</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  forgot: { alignItems: 'flex-end', marginTop: 12 },
  link: { color: colors.primary, fontSize: 16 },
  register: { alignItems: 'center', marginTop: 22 },
  registerText: { color: '#9CA3AF', fontSize: 16 },
});