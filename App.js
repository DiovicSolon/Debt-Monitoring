import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ScrollView, SafeAreaView } from 'react-native';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import HomeScreen from './HomeScreen'; // Import the new HomeScreen component
import app from './firebaseConfig';
import DebtStatistics from './DebtStatistics';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7lyLzpbEw6g8VUxYRztroQh8zaUOmcIg",
  authDomain: "debtproj-19e38.firebaseapp.com",
  projectId: "debtproj-19e38",
  storageBucket: "debtproj-19e38.firebasestorage.app",
  messagingSenderId: "345572964715",  
  appId: "1:345572964715:web:61be6d323970e581a6742e",
  measurementId: "G-90DJD0N4N4"
};


// Initialize Firebase

const auth = getAuth(app);
const db = getFirestore(app);

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  const handleSignup = async () => {
    // Validation checks
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName: fullName,
        email: email,
        createdAt: new Date()
      });

      Alert.alert('Success', 'User registered successfully!');
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setIsLogin(true);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'User logged in successfully!');
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Success', 'User logged out successfully!');
      setIsLoggedIn(false);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const renderAuthForm = () => {
    return (
      <View style={styles.formContainer}>
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#888"
            value={fullName}
            onChangeText={setFullName}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {!isLogin && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        )}
        
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={isLogin ? handleLogin : handleSignup}
        >
          <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.secondaryButtonText}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titleTop}>Jocelyn</Text>
          <Text style={styles.titleBottom}>Debt Tracker</Text>
        </View>
        
        {/* Conditionally render HomeScreen or Auth Form */}
        {!isLoggedIn ? (
          renderAuthForm()
        ) : (
          <HomeScreen onLogout={handleLogout} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  titleTop: {
    fontSize: 28,
    fontWeight: '300',
    color: '#888',
    letterSpacing: 2,
  },
  titleBottom: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#bb86fc',
    letterSpacing: 1,
    textShadowColor: 'rgba(187,134,252,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  formContainer: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    backgroundColor: '#2c2c2c',
    color: '#ffffff',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#bb86fc',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    alignItems: 'center',
    padding: 10,
  },
  secondaryButtonText: {
    color: '#bb86fc',
    fontSize: 16,
  },
});