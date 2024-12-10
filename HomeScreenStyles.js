import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    color: '#bb86fc',
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  summaryTitle: {
    color: '#bb86fc',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalDebtLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
  totalDebtAmount: {
    color: '#bb86fc',
    fontSize: 20,
    fontWeight: 'bold',
  },
  debtsContainer: {
    backgroundColor: '#2c2c2c',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  debtsTitle: {
    color: '#bb86fc',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noDebtsText: {
    color: '#888',
    fontSize: 16,
  },
  debtItem: {
    backgroundColor: '#2c2c2c',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  debtItemContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  debtName: {
    color: '#ffffff',
    fontSize: 16,
  },
  debtAmount: {
    color: '#bb86fc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addDebtButton: {
    backgroundColor: '#bb86fc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addDebtButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#2c2c2c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#bb86fc',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#bb86fc',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#2c2c2c',
    color: '#ffffff',
    width: '100%',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalCancelButton: {
    backgroundColor: '#2c2c2c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  modalCancelButtonText: {
    color: '#bb86fc',
    textAlign: 'center',
    fontSize: 16,
  },
  modalAddButton: {
    backgroundColor: '#bb86fc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
  },
  modalAddButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },

  payButton: {
    backgroundColor: '#4CAF50', // Green color
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginLeft: 10,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  payButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  
  // Additional modal and debt item styles to complement the pay button
  debtItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  debtName: {
    flex: 1,
    fontWeight: '500',
    fontSize: 16,
  },
  debtAmount: {
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  
  // Payment Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  debtInfoText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
sidebar: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '70%',
  height: '100%',
  backgroundColor: '#1e1e1e',
  zIndex: 10,
  padding: 20,
},
closeSidebarButton: {
  alignSelf: 'flex-end',
  marginBottom: 20,
},
closeSidebarButtonText: {
  fontSize: 24,
  color: '#ffffff',
},
sidebarButton: {
  backgroundColor: '#bb86fc',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 20,
},
sidebarButtonText: {
  color: '#000',
  fontSize: 16,
  fontWeight: 'bold',
},
sidebarAddDebtButton: {
  backgroundColor: '#2c2c2c',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 20,
},
sidebarAddDebtButtonText: {
  color: '#ffffff',
  fontSize: 16,
},
sidebarLogoutButton: {
  backgroundColor: '#ff6b6b',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: 'center',
},
sidebarLogoutButtonText: {
  color: '#ffffff',
  fontSize: 16,
},

hamburgerButton: {
  position: 'absolute',
  top: 20,
  left: 20,
  zIndex: 20,
},
hamburgerButtonText: {
  fontSize: 24,
  color: '#ffffff',
},

  paginationButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
  marginBottom: 20,
  paddingHorizontal: 20,
},
paginationButton: {
  backgroundColor: '#007bff',
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 20,
  elevation: 3, // Adds a subtle shadow effect
},
paginationText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#fff',
  textAlign: 'center',
},
disabledButton: {
  backgroundColor: '#cccccc', // Disabled button color
},
disabledText: {
  color: '#666666', // Disabled text color
},
paginationButtonHover: {
  shadowColor: '#000', // Dark shadow on hover
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5, // Increase elevation on hover
},

});

export default styles;
