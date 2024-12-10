import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  Modal, 
  TextInput, 
  Alert 
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs,
  doc,
  updateDoc 
} from 'firebase/firestore';
import styles from './HomeScreenStyles'; // Import styles
import app from './firebaseConfig';
import DebtStatistics from './DebtStatistics'; // Import DebtStatistics component

const HomeScreen = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [debts, setDebts] = useState([]);
  const [isAddDebtModalVisible, setIsAddDebtModalVisible] = useState(false);
  const [isPayDebtModalVisible, setIsPayDebtModalVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Sidebar visibility
  const [showStatistics, setShowStatistics] = useState(false); // Show statistics screen
  const [selectedDebt, setSelectedDebt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [debtName, setDebtName] = useState('');
  const [debtAmount, setDebtAmount] = useState('');
  const [debtDescription, setDebtDescription] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentRecipient, setPaymentRecipient] = useState(''); // Payment recipient

  const auth = getAuth();
  const db = getFirestore();
  const itemsPerPage = 7;

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const debtsRef = collection(db, 'debts');
          const querySnapshot = await getDocs(debtsRef);

          const userDebts = querySnapshot.docs
            .filter((doc) => doc.data().email === user.email)
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by latest

          setDebts(userDebts);
        }
      } catch (error) {
        console.error("Error fetching debts:", error);
        Alert.alert('Error', 'Failed to fetch debts');
      }
    };

    fetchDebts();
  }, []);

  const handleAddDebt = async () => {
    if (!debtName || !debtAmount) {
      Alert.alert('Error', 'Please enter debt name and amount');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        const debtsRef = collection(db, 'debts');

        const newDebtRef = await addDoc(debtsRef, {
          amount: parseFloat(debtAmount),
          createdAt: new Date().toISOString(),
          description: debtDescription || '',
          email: user.email,
          name: debtName,
          userId: user.uid,
          status: 'pending', // New status field
          originalAmount: parseFloat(debtAmount), // Store original amount
        });

        setDebts(prevDebts => [
          {
            id: newDebtRef.id,
            amount: parseFloat(debtAmount),
            createdAt: new Date().toISOString(),
            description: debtDescription || '',
            email: user.email,
            name: debtName,
            userId: user.uid,
            status: 'pending',
            originalAmount: parseFloat(debtAmount),
          },
          ...prevDebts,
        ]);

        setDebtName('');
        setDebtAmount('');
        setDebtDescription('');
        setIsAddDebtModalVisible(false);

        Alert.alert('Success', 'Debt added successfully!');
      }
    } catch (error) {
      console.error("Error adding debt:", error);
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
          recipient: paymentRecipient // Add recipient to debt
        });
      } else {
        await updateDoc(debtDocRef, {
          amount: remainingAmount,
          recipient: paymentRecipient // Update recipient even for partial payments
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
    <View style={styles.sidebar}>
      <TouchableOpacity 
        style={styles.closeSidebarButton}
        onPress={() => setIsSidebarVisible(false)}
      >
        <Text style={styles.closeSidebarButtonText}>×</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.sidebarButton}
        onPress={() => {
          setShowStatistics(true); // Show statistics screen
          setIsSidebarVisible(false); // Close sidebar
        }}
      >
        <Text style={styles.sidebarButtonText}>View Debt Statistics</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.sidebarAddDebtButton}
        onPress={() => {
          setIsAddDebtModalVisible(true);
          setIsSidebarVisible(false);
        }}
      >
        <Text style={styles.sidebarAddDebtButtonText}>+ Add New Debt</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.sidebarLogoutButton}
        onPress={onLogout}
      >
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
          <TextInput
            style={styles.input}
            placeholder="Debt Name"
            placeholderTextColor="#888"
            value={debtName}
            onChangeText={setDebtName}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor="#888"
            value={debtAmount}
            onChangeText={setDebtAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Description (Optional)"
            placeholderTextColor="#888"
            value={debtDescription}
            onChangeText={setDebtDescription}
            multiline
          />
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
        <DebtStatistics debts={debts} />
      ) : (
        <>
          <TouchableOpacity 
            style={styles.hamburgerButton}
            onPress={() => setIsSidebarVisible(true)}
          >
            <Text style={styles.hamburgerButtonText}>☰</Text>
          </TouchableOpacity>

          {isSidebarVisible && renderSidebar()}

          <FlatList
            data={paginatedDebts}
            keyExtractor={(item) => item.id}
            renderItem={({ item: debt }) => (
              <View
                style={[
                  styles.debtItem,
                  debt.status === 'pending' && { backgroundColor: 'rgba(255, 0, 0, 0.1)' },
                ]}
              >
                <View style={styles.debtItemContent}>
                  <Text style={styles.debtName}>{debt.name}</Text>
                  <Text style={styles.debtAmount}>₱{parseFloat(debt.amount).toFixed(2)}</Text>
                  {debt.status === 'pending' && (
                    <Text style={{ color: 'red', marginLeft: 10 }}>Pending</Text>
                  )}
                  {debt.status === 'paid' && (
                    <Text style={styles.paidRecipientText}>Paid to: {debt.recipient}</Text>
                  )}
                  {debt.status === 'pending' && (
                    <TouchableOpacity
                      style={styles.payButton}
                      onPress={() => {
                        setSelectedDebt(debt);
                        setIsPayDebtModalVisible(true);
                      }}
                    >
                      <Text style={styles.payButtonText}>Pay</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
            ListHeaderComponent={() => (
              <View style={styles.titleContainer}>
                <Text style={styles.welcomeText}>
                  Welcome, {userData?.fullName || 'User'}!
                </Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View style={styles.paginationButtons}>
                <TouchableOpacity 
                  onPress={handlePreviousPage} 
                  disabled={currentPage === 1} 
                  style={[styles.paginationButton, { borderColor: '#fff', borderWidth: 1 }]}
                >
                  <Text style={[styles.paginationText, { color: '#fff' }]}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={handleNextPage} 
                  disabled={currentPage * itemsPerPage >= debts.length} 
                  style={[styles.paginationButton, { borderColor: '#fff', borderWidth: 1 }]}
                >
                  <Text style={[styles.paginationText, { color: '#fff' }]}>Next</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {renderAddDebtModal()}
          {renderPayDebtModal()}
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
