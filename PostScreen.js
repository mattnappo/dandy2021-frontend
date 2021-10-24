import React, { useState } from 'react';
import { SafeAreaView, TextInput, Text, View } from 'react-native';
import { styles } from './styles';

export function PostScreen() {
  const [title, onChangeTitle] = useState(null);
  const [description, onChangeDescription] = useState(null);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="Job Title"
        />
      </SafeAreaView>
      
      {/* MapView */}

      <SafeAreaView>
        <TextInput
          style={styles.bigInput}
          onChangeText={onChangeDescription}
          value={description}
          placeholder="Description"
        />
      </SafeAreaView>
    </View>
  );
}
