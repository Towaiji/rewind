import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Memory } from '../types';

interface Props {
  memory: Memory;
}

export default function MemoryCard({ memory }: Props) {
  return (
    <View style={styles.card}>
      {memory.prompt && (
        <View style={styles.promptBox}>
          <Text style={styles.promptText}>&quot;{memory.prompt}&quot;</Text>
        </View>
      )}
      <Text style={styles.content}>{memory.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  promptBox: {
    backgroundColor: '#f3f3f3',
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  promptText: {
    fontStyle: 'italic',
    color: '#555',
  },
  content: {
    color: '#333',
  },
});
