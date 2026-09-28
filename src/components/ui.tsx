import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

/* Барлық экранға ортақ қаптама: артқа түймесі + мазмұн */
export function Screen({
  onBack,
  center,
  children,
}: {
  onBack?: () => void;
  center?: boolean;
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView style={s.safe}>
      <StatusBar style="dark" />
      <View style={s.container}>
        <Pressable style={s.back} onPress={onBack} hitSlop={10}>
          <Ionicons name="arrow-back" size={26} color={colors.text} />
        </Pressable>
        <View style={[s.body, center && s.center]}>{children}</View>
      </View>
    </SafeAreaView>
  );
}

/* Иконкасы бар өріс. password=true болса көз түймесі шығады */
type FieldProps = TextInputProps & {
  icon: keyof typeof Ionicons.glyphMap;
  password?: boolean;
};

export function Field({ icon, password, ...rest }: FieldProps) {
  const [hidden, setHidden] = useState(!!password);
  return (
    <View style={s.field}>
      <Ionicons
        name={icon}
        size={20}
        color={rest.value ? colors.text : colors.muted}
        style={s.fieldIcon}
      />
      <TextInput
        style={s.input}
        placeholderTextColor={colors.muted}
        {...rest}
        secureTextEntry={hidden}
      />
      {password && (
        <Pressable onPress={() => setHidden((h) => !h)} hitSlop={10}>
          <Ionicons
            name={hidden ? 'eye-off' : 'eye'}
            size={20}
            color={colors.muted}
          />
        </Pressable>
      )}
    </View>
  );
}

export function PrimaryButton({
  title,
  onPress,
  disabled,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      style={[s.button, disabled && s.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={s.buttonText}>{title}</Text>
    </Pressable>
  );
}

export function Checkbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <Pressable
      onPress={() => onChange(!checked)}
      hitSlop={8}
      style={[s.checkbox, checked && s.checkboxOn]}
    >
      {checked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
    </Pressable>
  );
}

export const common = StyleSheet.create({
  title: { color: colors.text, fontSize: 28, fontWeight: '700' },
  subtitle: { color: colors.muted, fontSize: 16, marginTop: 8, marginBottom: 24 },
  centerText: { textAlign: 'center' },
});

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 28, paddingTop: 10 },
  back: { width: 44, height: 44, justifyContent: 'center' },
  body: { flex: 1, marginTop: 16 },
  center: { justifyContent: 'center', paddingBottom: 100 },

  field: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBg,
    borderRadius: 18,
    paddingHorizontal: 18,
    marginTop: 10,
  },
  fieldIcon: { marginRight: 14 },
  input: { flex: 1, height: '100%', color: colors.text, fontSize: 18 },

  button: {
    height: 60,
    backgroundColor: colors.primary,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  buttonDisabled: { backgroundColor: colors.disabled },
  buttonText: { color: '#FFFFFF', fontSize: 19, fontWeight: '700' },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.muted,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
});