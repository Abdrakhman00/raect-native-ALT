import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton, Screen, common } from './ui';
import { colors } from '../theme';

const CITIES = [
  'Алматы',
  'Астана',
  'Шымкент',
  'Қарағанды',
  'Ақтөбе',
  'Атырау',
  'Павлодар',
  'Семей',
  'Тараз',
  'Өскемен',
];

type Props = { onBack: () => void; onDone: (city: string) => void };

export default function SelectCity({ onBack, onDone }: Props) {
  const [city, setCity] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Screen onBack={onBack}>
      <Text style={common.title}>Выберите город</Text>
      <Text style={common.subtitle}>
        Заведения которые будут показываться вам, будут зависеть от вашего города.
      </Text>

      <Pressable style={s.select} onPress={() => setOpen(true)}>
        <Text style={[s.selectText, city && s.selectTextOn]}>
          {city ?? 'Выбрать город'}
        </Text>
        <Ionicons name="chevron-down" size={20} color={colors.muted} />
      </Pressable>

      {/* Батырманы экранның төменіне итеру */}
      <View style={{ flex: 1 }} />
      <View style={s.bottom}>
        <PrimaryButton
          title="Продолжить"
          disabled={!city}
          onPress={() => city && onDone(city)}
        />
      </View>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={s.overlay} onPress={() => setOpen(false)}>
          <View style={s.sheet}>
            <ScrollView>
              {CITIES.map((c) => (
                <Pressable
                  key={c}
                  style={s.item}
                  onPress={() => {
                    setCity(c);
                    setOpen(false);
                  }}
                >
                  <Text style={[s.itemText, c === city && s.itemTextOn]}>{c}</Text>
                  {c === city && (
                    <Ionicons name="checkmark" size={22} color={colors.primary} />
                  )}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </Screen>
  );
}

const s = StyleSheet.create({
  select: {
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.inputBg,
    borderRadius: 18,
    paddingHorizontal: 18,
  },
  selectText: { fontSize: 18, color: colors.muted },
  selectTextOn: { color: colors.text },
  bottom: { paddingBottom: 20 },

  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    maxHeight: '60%',
  },
  item: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: { fontSize: 18, color: colors.text },
  itemTextOn: { color: colors.primary, fontWeight: '600' },
});