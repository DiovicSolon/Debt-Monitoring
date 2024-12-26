import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
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
   
    datasets: [
      {
        data: debts.map((debt) => parseFloat(debt.amount || 0)),
        color: () => `rgba(75, 192, 192, 1)`,
      },
    ],
  };

  const handleBackPress = () => {
    if (onClose && typeof onClose === 'function') {
      onClose(); // Notify the parent to close the DebtStatistics component
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Debt Statistics</Text>

      {/* Scrollable Graph */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={Math.max(400, Dimensions.get('window').width)}
          height={250}
          yAxisSuffix="₱"
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </ScrollView>

      {/* Statistics */}
      <View style={styles.statsContainer}>
        <Text style={styles.stat}>Total Debt Amount: <Text style={styles.highlight}>₱{calculateTotalDebt()}</Text></Text>
        <Text style={styles.stat}>Paid Debts: <Text style={styles.highlight}>{calculatePaidDebts()}</Text></Text>
        <Text style={styles.stat}>Pending Debts: <Text style={styles.highlight}>{calculatePendingDebts()}</Text></Text>
       
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
      </View>

    
  );
};

const chartConfig = {
  backgroundColor: '#1e1e1e',
  backgroundGradientFrom: '#232323',
  backgroundGradientTo: '#3a3a3a',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 8,
  },
  propsForDots: {
    r: '5',
    strokeWidth: '2',
    stroke: '#1e1e1e',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4bc0c0',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartContainer: {
    marginVertical: 10,
    borderRadius: 8,
    backgroundColor: '#2a2a2a',
    padding: 10,
  },
  chart: {
    borderRadius: 8,
  },
  statsContainer: {
    marginTop: 20,
    backgroundColor: '#2a2a2a',
    padding: 15,
    borderRadius: 8,
  },
  stat: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 10,
  },
  highlight: {
    color: '#4bc0c0',
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#4bc0c0',
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
