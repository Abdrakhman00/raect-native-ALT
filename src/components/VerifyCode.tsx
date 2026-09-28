import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { PrimaryButton, Screen, common } from './ui';
import { colors } from '../theme';

type Props = { phone: string; onBack: () => void; onNext: () => void };

const CODE_LENGTH = 4;

export default function VerifyCode({ phone, onBack, onNext }: Props) {
  const [code, setCode] = useState('');
  const [seconds, setSeconds] = useState(30);
  const inputRef = useRef<TextInput>(null);

  // Қайта жіберу таймері
  useEffect(() => {
    if (seconds === 0) return;
    const t = setTimeout(() => setSeconds((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const resend = () => {
    if (seconds > 0) return;
    setSeconds(30);
    console.log('Код қайта жіберілді');
  };

  return (
    <Screen onBack={onBack} center>
      <Text style={[common.title, common.centerText]}>Подтвердить номер</Text>
      <Text style={[common.subtitle, common.centerText]}>
        Мы только что отправили код на{'\n'}
        <Text style={s.phone}>{phone}</Text>
      </Text>

      {/* Көрінбейтін нақты input, жәшіктер тек көрсетуге арналған */}
      <Pressable style={s.row} onPress={() => inputRef.current?.focus()}>
        {Array.from({ length: CODE_LENGTH }).map((_, i) => (
          <View key={i} style={[s.box, code.length === i && s.boxActive]}>
            <Text style={s.digit}>{code[i] ?? ''}</Text>
          </View>
        ))}
      </Pressable>
      <TextInput
        ref={inputRef}
        style={s.hidden}
        value={code}
        onChangeText={(t) => setCode(t.replace(/\D/g, '').slice(0, CODE_LENGTH))}
        keyboardType="number-pad"
        maxLength={CODE_LENGTH}
        autoFocus
      />

      <PrimaryButton
        title="Продолжить"
        disabled={code.length < CODE_LENGTH}
        onPress={onNext}
      />

      <Pressable onPress={resend} style={s.resend}>
        <Text style={s.resendText}>
          Отправить код ещё раз{seconds > 0 ? ` (0:${String(seconds).padStart(2, '0')})` : ''}
        </Text>
      </Pressable>
    </Screen>
  );
}

const s = StyleSheet.create({
  phone: { color: colors.text, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'center', gap: 14 },
  box: {
    width: 62,
    height: 62,
    borderRadius: 16,
    backgroundColor: colors.inputBg,
    borderWidth: 1.5,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxActive: { borderColor: colors.primary },
  digit: { fontSize: 26, fontWeight: '700', color: colors.text },
  hidden: { position: 'absolute', opacity: 0, width: 1, height: 1 },
  resend: { alignItems: 'center', marginTop: 20 },
  resendText: { color: colors.muted, fontSize: 16 },
});