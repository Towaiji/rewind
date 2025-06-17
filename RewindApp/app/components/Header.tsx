import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => makeStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="search" size={20} color={colors.secondaryText} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconButton, { position: 'relative' }]}>
          <Feather name="bell" size={20} color={colors.secondaryText} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const makeStyles = (c: ReturnType<typeof useTheme>["colors"]) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: c.card,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: c.text,
    },
    subtitle: {
      fontSize: 13,
      color: c.secondaryText,
    },
    actions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      padding: 8,
      borderRadius: 999,
      marginLeft: 12,
    },
    notificationDot: {
      position: 'absolute',
      top: 2,
      right: 2,
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: c.accent,
    },
  });
