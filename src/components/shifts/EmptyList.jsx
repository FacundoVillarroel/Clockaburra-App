import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/colors';

const EmptyList = ({ title, iconName, subtitle }) => {
  return (
    <View style={styles.container}>
      <Ionicons name={iconName} size={50} color={Colors.primary} />
      <Text style={styles.title}>
        {title || 'There is nothing to see here!'}
      </Text>
      <Text style={styles.subtitle}>{subtitle || ''}</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: Colors.primary,
  },
  subtitle: {
    color: '#6B7280',
    marginTop: 8,
  },
});
