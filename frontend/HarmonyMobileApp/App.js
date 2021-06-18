import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  Text, View,  
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity
 } from 'react-native';

 import ViewIndividualItems from "./viewIndividualItems";
import styles from './styles'
export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  
  return (
  /*  <View style={styles.container}>
      <StatusBar style="auto" />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email:"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>   

      <View style={styles.inputView}>
      <TextInput
        style={styles.TextInput}
        placeholder="Password:"
        placeholderTextColor="#003f5c"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      </View>

      <TouchableOpacity>
      <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginBtn}>
      <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>*/

    <SafeAreaView>
      <ViewIndividualItems/>
    </SafeAreaView>

  );
}

