import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView, 
  Modal, 
  TextInput, 
  Alert,
  Image, 
  ScrollView
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  query,
  where
} from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons'; // Or any other icon library
import * as ImagePicker from 'expo-image-picker';
import styles from './HomeScreenStyles'; 
import app from './firebaseConfig';
import DebtStatistics from './DebtStatistics';
import DateTimePicker from '@react-native-community/datetimepicker'; // Date Picker library


const DEFAULT_PROFILE_PICTURE = 'https://via.placeholder.com/150/808080/FFFFFF?text=Profile';

const HomeScreen = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [profilePicture, setProfilePicture] = useState(DEFAULT_PROFILE_PICTURE);
  const [debts, setDebts] = useState([]);
  const [isAddDebtModalVisible, setIsAddDebtModalVisible] = useState(false);
  const [isPayDebtModalVisible, setIsPayDebtModalVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null); // Selected date
const [isDatePickerVisible, setIsDatePickerVisible] = useState(false); // Date picker visibility


  const [debtName, setDebtName] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [debtDescription, setDebtDescription] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentRecipient, setPaymentRecipient] = useState('');

  const auth = getAuth();
  const db = getFirestore();
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUserData(userData);

            if (userData.profilePicture) {
              setProfilePicture(userData.profilePicture);
            }
          } else {
            await setDoc(userDocRef, {
              fullName: user.displayName || 'User',
              email: user.email,
              uid: user.uid
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        Alert.alert('Permissions Error', 'Unable to fetch user data. Please check your authentication and permissions.');
      }
    };

    const fetchDebts = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const debtsRef = collection(db, 'debts');
          const q = query(debtsRef, where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
    
          const userDebts = querySnapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .sort((a, b) => {
              // Sort by status: pending first, then paid
              if (a.status === 'pending' && b.status !== 'pending') return -1;
              if (a.status !== 'pending' && b.status === 'pending') return 1;
              // Sort by creation date for debts with the same status
              return new Date(b.createdAt) - new Date(a.createdAt);
            });
    
          setDebts(userDebts);
        }
      } catch (error) {
        console.error("Error fetching debts:", error);
        Alert.alert('Permissions Error', 'Unable to fetch debts. Please check your authentication and permissions.');
      }
    };
    

    fetchUserData();
    fetchDebts();
  }, []);

  const pickProfilePicture = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const user = auth.currentUser;
        const imageUri = result.assets[0].uri;

        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, { 
          ...userData, 
          profilePicture: imageUri 
        }, { merge: true });

        setProfilePicture(imageUri);
        Alert.alert('Success', 'Profile picture updated successfully!');
      }
    } catch (error) {
      console.error("Error picking profile picture:", error);
      Alert.alert('Error', 'Failed to update profile picture');
    }
  };

  const handleAddDebt = async () => {
    if (!debtName || !debtAmount || !selectedDate) {
      Alert.alert('Error', 'Please enter all required fields including the date');
      return;
    }
  
    try {
      const user = auth.currentUser;
      if (user) {
        const debtsRef = collection(db, 'debts');
  
        const newDebtRef = await addDoc(debtsRef, {
          amount: parseFloat(debtAmount),
          createdAt: selectedDate.toISOString(), // Use the selected date
          description: debtDescription || '',
          email: user.email,
          name: debtName,
          userId: user.uid,
          status: 'pending',
          originalAmount: parseFloat(debtAmount),
        });
  
        setDebts(prevDebts => [
          {
            id: newDebtRef.id,
            amount: parseFloat(debtAmount),
            createdAt: selectedDate.toISOString(), // Use the selected date
            description: debtDescription || '',
            email: user.email,
            name: debtName,
            userId: user.uid,
            status: 'pending',
            originalAmount: parseFloat(debtAmount),
          },
          ...prevDebts,
        ]);
  
        // Reset modal state
        setDebtName('');
        setDebtAmount('');
        setDebtDescription('');
        setSelectedDate(null); // Clear selected date
        setIsAddDebtModalVisible(false);
  
        Alert.alert('Success', 'Debt added successfully!');
      }
    } catch (error) {
      console.error('Error adding debt:', error);
      Alert.alert('Error', 'Failed to add debt');
    }
  };
  

  const handlePayDebt = async () => {
    if (!selectedDebt || !paymentAmount || !paymentRecipient) {
      Alert.alert('Error', 'Please enter payment amount and recipient');
      return;
    }

    const paymentAmountFloat = parseFloat(paymentAmount);

    if (paymentAmountFloat > selectedDebt.amount) {
      Alert.alert('Error', 'Payment amount cannot exceed remaining debt');
      return;
    }

    try {
      const debtDocRef = doc(db, 'debts', selectedDebt.id);
      const remainingAmount = selectedDebt.amount - paymentAmountFloat;

      if (remainingAmount <= 0) {
        await updateDoc(debtDocRef, {
          amount: 0,
          status: 'paid',
          recipient: paymentRecipient
        });
      } else {
        await updateDoc(debtDocRef, {
          amount: remainingAmount,
          recipient: paymentRecipient
        });
      }

      const updatedDebts = debts.map(debt => {
        if (debt.id === selectedDebt.id) {
          return {
            ...debt,
            amount: remainingAmount,
            status: remainingAmount <= 0 ? 'paid' : 'pending',
            recipient: paymentRecipient
          };
        }
        return debt;
      });

      setDebts(updatedDebts);

      setPaymentAmount('');
      setPaymentRecipient('');
      setIsPayDebtModalVisible(false);
      setSelectedDebt(null);

      Alert.alert('Success', 'Payment processed successfully!');
    } catch (error) {
      console.error("Error processing payment:", error);
      Alert.alert('Error', 'Failed to process payment');
    }
  };

  const renderSidebar = () => (
    <View style={[styles.sidebar, isSidebarVisible ? styles.sidebarVisible : styles.sidebarHidden]}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeSidebarButton}
        onPress={() => setIsSidebarVisible(false)}
      >
        <Text style={styles.closeSidebarButtonText}>×</Text>
      </TouchableOpacity>
  
      {/* View Debt Statistics */}
      <TouchableOpacity
        style={styles.sidebarButton}
        onPress={() => {
          setShowStatistics(true);
          setIsSidebarVisible(false);
        }}
      >
        <FontAwesome name="bar-chart" style={styles.sidebarIcon} />
        <Text style={styles.sidebarButtonText}>View Debt Statistics</Text>
      </TouchableOpacity>
  
      {/* Add New Debt */}
      <TouchableOpacity
        style={styles.sidebarAddDebtButton}
        onPress={() => {
          setIsAddDebtModalVisible(true);
          setIsSidebarVisible(false);
        }}
      >
        <FontAwesome name="plus-circle" style={styles.sidebarIcon} />
        <Text style={styles.sidebarAddDebtButtonText}> Add New Debt</Text>
      </TouchableOpacity>
  
      {/* Logout */}
      <TouchableOpacity
        style={styles.sidebarLogoutButton}
        onPress={onLogout}
      >
        <FontAwesome name="sign-out" style={styles.sidebarIcon} />
        <Text style={styles.sidebarLogoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
  const renderAddDebtModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isAddDebtModalVisible}
      onRequestClose={() => setIsAddDebtModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Debt</Text>
          
          {/* Debt Name Input */}
          <TextInput
            style={styles.input}
            placeholder="Debt Name"
            placeholderTextColor="#888"
            value={debtName}
            onChangeText={setDebtName}
          />
          
          {/* Debt Amount Input */}
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor="#888"
            value={debtAmount}
            onChangeText={setDebtAmount}
            keyboardType="numeric"
          />
  
          {/* Debt Description Input */}
          <TextInput
            style={styles.input}
            placeholder="Description (Optional)"
            placeholderTextColor="#888"
            value={debtDescription}
            onChangeText={setDebtDescription}
            multiline
          />
  
          {/* Date Selector */}
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setIsDatePickerVisible(true)} // Show the date picker
          >
            <Text style={styles.datePickerButtonText}>
              {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
            </Text>
          </TouchableOpacity>
  
          {/* Date Picker Modal */}
          {isDatePickerVisible && (
            <DateTimePicker
              value={selectedDate || new Date()} // Default to current date
              mode="date"
              display="default"
              onChange={(event, date) => {
                setIsDatePickerVisible(false); // Hide the date picker
                if (date) setSelectedDate(date); // Update the selected date
              }}
            />
          )}
  
          {/* Buttons */}
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setIsAddDebtModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalAddButton}
              onPress={handleAddDebt}
            >
              <Text style={styles.modalAddButtonText}>Add Debt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  const renderPayDebtModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isPayDebtModalVisible}
      onRequestClose={() => setIsPayDebtModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pay Debt</Text>
          <TextInput
            style={styles.input}
            placeholder="Payment Amount"
            placeholderTextColor="#888"
            value={paymentAmount}
            onChangeText={setPaymentAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Recipient"
            placeholderTextColor="#888"
            value={paymentRecipient}
            onChangeText={setPaymentRecipient}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setIsPayDebtModalVisible(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalAddButton}
              onPress={handlePayDebt}
            >
              <Text style={styles.modalAddButtonText}>Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
  const totalPages = Math.ceil(debts.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage * itemsPerPage < debts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedDebts = debts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <SafeAreaView style={styles.container}>
   {showStatistics ? (
  <DebtStatistics 
    debts={debts} 
    onClose={() => setShowStatistics(false)} // Close DebtStatistics and return to HomeScreen
  />
      ) : (
        <>
          <View style={styles.headerContainer}>
            {/* Left Side: Hamburger Menu */}
            <TouchableOpacity
              style={styles.hamburgerButton}
              onPress={() => setIsSidebarVisible(!isSidebarVisible)}
            >
              <Text style={styles.hamburgerButtonText}>☰</Text>
            </TouchableOpacity>
  
            {/* Center: Total Debt */}
            <Text style={styles.headerTitle}>
              Total Utang: {debts.reduce((total, debt) => total + debt.amount, 0)}
            </Text>
  
            {/* Right Side: Profile Picture */}
            <TouchableOpacity
              style={styles.profilePictureContainer}
              onPress={pickProfilePicture}
            >
              <Image 
                source={{ uri: profilePicture }}
                style={styles.profilePicture}
              />
              <Text style={styles.editProfileText}>Edit</Text>
            </TouchableOpacity>
          </View>




          {isSidebarVisible && renderSidebar()}

       

          <ScrollView>
  {paginatedDebts.map((debt) => (
    <View
      key={debt.id}
      style={[
        styles.debtItem,
        debt.status === 'pending' && { backgroundColor: 'rgba(255, 0, 0, 0.1)' },
      ]}
    >
      <View style={styles.debtItemContent}>
        {/* Debt Name */}
        <Text style={styles.debtName}>{debt.name}</Text>

        {/* Debt Amount */}
        <Text style={styles.debtAmount}>₱{parseFloat(debt.amount).toFixed(2)}</Text>

        {/* Status with Icons */}
        {debt.status === 'pending' && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <FontAwesome name="exclamation-circle" size={16} color="red" />
            <Text style={{ color: 'red', marginLeft: 5 }}>Pending</Text>
          </View>
        )}
        {debt.status === 'paid' && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
            <FontAwesome name="check-circle" size={16} color="green" />
            <Text style={styles.paidRecipientText}>Paid to: {debt.recipient}</Text>
          </View>
        )}

        {/* Pay Button */}
        {debt.status === 'pending' && (
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => {
              setSelectedDebt(debt);
              setIsPayDebtModalVisible(true);
            }}
          >
            <FontAwesome name="money" size={16} color="white" />
            <Text style={styles.payButtonText}> Pay</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  ))}

  {/* Page Indicator */}
  <View style={styles.pageIndicator}>
    <Text style={styles.pageText}>
      Page {currentPage} of {totalPages}
    </Text>
  </View>

  {/* Pagination Buttons */}
  <View style={styles.paginationButtons}>
    <TouchableOpacity
      onPress={handlePreviousPage}
      disabled={currentPage === 1}
      style={[
        styles.paginationButton,
        { borderColor: '#fff', borderWidth: 1 },
        currentPage === 1 && styles.disabledButton,
      ]}
    >
      <FontAwesome name="arrow-left" size={16} color={currentPage === 1 ? '#666' : '#fff'} />
      <Text style={[styles.paginationText, { color: '#fff' }]}> Previous</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={handleNextPage}
      disabled={currentPage * itemsPerPage >= debts.length}
      style={[
        styles.paginationButton,
        { borderColor: '#fff', borderWidth: 1 },
        currentPage * itemsPerPage >= debts.length && styles.disabledButton,
      ]}
    >
      <FontAwesome name="arrow-right" size={16} color={currentPage * itemsPerPage >= debts.length ? '#666' : '#fff'} />
      <Text style={[styles.paginationText, { color: '#fff' }]}> Next</Text>
    </TouchableOpacity>
  </View>
</ScrollView>


          {renderAddDebtModal()}
          {renderPayDebtModal()}
        </>
      )}
    </SafeAreaView>
  );
};
export default HomeScreen;