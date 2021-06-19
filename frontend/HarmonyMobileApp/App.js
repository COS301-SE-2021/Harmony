import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  Text, View,  
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity
 } from 'react-native';

 import ViewAllPairings from "./viewAllPairings";
import styles from './styles'
export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  return (
 
      <ViewAllPairings/>
    //</SafeAreaView>

  );
}

