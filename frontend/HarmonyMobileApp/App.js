import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  Text, View,  
  TextInput,
  Button,
  TouchableOpacity
 } from 'react-native';

import styles from './styles'
import AddToFavourites from './addToFavourites';
export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  return (
   <AddToFavourites/>
  );
}

