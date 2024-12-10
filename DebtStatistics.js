import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const DebtStatistics = ({ debts, onClose }) => {
  const calculateTotalDebt = () => {
    return debts
      .filter((debt) => debt.status !== 'paid')
      .reduce((total, debt) => total + parseFloat(debt.amount || 0), 0)
      .toFixed(2);
  };

  const calculatePaidDebts = () => debts.filter((debt) => debt.status === 'paid').length;

  const calculatePendingDebts = () => debts.filter((debt) => debt.status === 'pending').length;

  // Graph data
  const chartData = {
    labels: debts.map((debt, index) => `Debt ${index + 1}`), // X-axis labels
    datasets: [
      {
        data: debts.map((debt) => parseFloat(debt.amount || 0)), // Y-axis values
        color: () => `#bb86fc`, // Line color
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debt Statistics</Text>

      {/* Graph */}
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40} // Screen width minus padding
        height={220}
        yAxisSuffix="₱"
        chartConfig={{
          backgroundColor: '#1e1e1e',
          backgroundGradientFrom: '#1e1e1e',
          backgroundGradientTo: '#1e1e1e',
          decimalPlaces: 2, // Rounded to 2 decimal places
          color: (opacity = 1) => `rgba(187, 134, 252, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 8,
          },
        }}
        bezier
        style={styles.chart}
      />

      {/* Statistics */}
      <Text style={styles.stat}>Total Debt Amount: ₱{calculateTotalDebt()}</Text>
      <Text style={styles.stat}>Paid Debts: {calculatePaidDebts()}</Text>
      <Text style={styles.stat}>Pending Debts: {calculatePendingDebts()}</Text>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#bb86fc',
    marginBottom: 20,
  },
  stat: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: '#bb86fc',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DebtStatistics;
