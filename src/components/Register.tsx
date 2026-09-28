import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Checkbox, Field, PrimaryButton, Screen, common } from './ui';
import { colors } from '../theme';

type Props = { onBack: () => void; onSubmit: () => void; onLogin: () => void };

export default function Register({ onBack, onSubmit, onLogin }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  const isValid =
    name.trim().length > 1 &&
    phone.replace(/\D/g, '').length >= 11 &&
    password.length >= 8 &&
    agree;

  return (
    <Screen onBack={onBack}>
      <Text style={common.title}>Регистрация</Text>
      <Text style={common.subtitle}>
        Создайте учетную запись,{'\n'}чтобы продолжить!
      </Text>

      <Field
        icon="person"
        value={name}
        onChangeText={setName}
        placeholder="Ваше имя"
      />
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

      <View style={s.terms}>
        <Checkbox checked={agree} onChange={setAgree} />
        <Text style={s.termsText}>
          Создавая учетную запись, вы соглашаетесь с нашими{' '}
          <Text style={s.link} onPress={() => console.log('Условия басылды')}>
            Условиями
          </Text>{' '}
          использования.
        </Text>
      </View>

      <PrimaryButton
        title="Зарегистрироваться"
        disabled={!isValid}
        onPress={onSubmit}
      />

      <View style={s.login}>
        <Text style={s.loginText}>Уже есть аккаунт? </Text>
        <Pressable onPress={onLogin}>
          <Text style={[s.link, { fontWeight: '600' }]}>Войти</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  terms: { flexDirection: 'row', marginTop: 18, paddingRight: 8 },
  termsText: { flex: 1, color: colors.text, fontSize: 14, lineHeight: 20 },
  link: { color: colors.primary, fontSize: 14 },
  login: { flexDirection: 'row', justifyContent: 'center', marginTop: 22 },
  loginText: { color: '#9CA3AF', fontSize: 15 },
});