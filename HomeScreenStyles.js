import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  // General Container
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  // Title and Welcome Text
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    color: '#bb86fc',
    fontSize: 24,
    fontWeight: 'bold',
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
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#bb86fc',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  sidebarButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sidebarAddDebtButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2c',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  sidebarAddDebtButtonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  sidebarLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6b6b',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  sidebarLogoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
  sidebarIcon: {
    color: '#ffffff',
    fontSize: 20,
  },

  // Header
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e1e1e',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  hamburgerButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerButtonText: {
    fontSize: 22,
    color: '#ffffff',
  },
  headerTitle: {
    fontSize: 18,
    color: '#bb86fc',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Profile Picture
  profilePictureContainer: {
    alignItems: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#bb86fc',
  },
  editProfileText: {
    fontSize: 10,
    color: '#bb86fc',
    marginTop: 2,
  },

  // Summary Container
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
  totalDebtLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
  totalDebtAmount: {
    color: '#bb86fc',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Debt List
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

  // Add Debt Button
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

  // Modal Styles
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

  // Pay Button
  payButton: {
    backgroundColor: '#4CAF50',
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

  // Pagination
  pageIndicator: {
    alignItems: 'center',
    marginVertical: 10,
  },
  pageText: {
    fontSize: 16,
    color: '#fff',
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  paginationButton: {
    backgroundColor: '#bb86fc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#ffffff',
    borderWidth: 1,
  },
  paginationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  disabledButton: {
    backgroundColor: '#444444',
    borderColor: '#666666',
  },
  disabledText: {
    color: '#888888',
  },
  payButton: {
  flexDirection: 'row',
  backgroundColor: '#4CAF50', // Green color
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 5,
  marginLeft: 10,
  alignItems: 'center', // Align icon and text
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},
datePickerButton: {
  backgroundColor: '#2c2c2c',
  paddingVertical: 12,
  paddingHorizontal: 15,
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 15,
},
datePickerButtonText: {
  color: '#ffffff',
  fontSize: 16,
},

payButtonText: {
  color: 'white',
  fontWeight: '600',
  fontSize: 14,
  textAlign: 'center',
},
disabledButton: {
  backgroundColor: '#444444', // Gray background for disabled state
  borderColor: '#666666',
},
 // Modal Overlay
 modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.6)',
  justifyContent: 'center',
  alignItems: 'center',
},

// Modal Container
modalContainer: {
  width: width * 0.9,
  backgroundColor: '#2c2c2c',
  borderRadius: 15,
  padding: 25,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 10,
},
customAmountContainer: {
    marginBottom: 10,
    backgroundColor: '#f2f2f2', // Slightly darker background
    borderRadius: 5,
},
customAmountInput: {
    height: 40,
    borderColor: '#343a40',   // Darker gray border
    borderWidth: 2,          // Bolder border
    paddingHorizontal: 15,
    borderRadius: 5,
    fontSize: 16,
},
// Modal Title
modalTitle: {
  color: '#bb86fc',
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 20,
  letterSpacing: 1,
},

// Category Container
categoryContainer: {
  marginBottom: 20,
},
categoryTitle: {
  color: '#ffffff',
  fontSize: 18,
  marginBottom: 10,
  fontWeight: '600',
},
categoryButton: {
  backgroundColor: '#3c3c3c',
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 8,
  marginRight: 10,
  borderWidth: 2,
  borderColor: 'transparent',
},
selectedCategoryButton: {
  backgroundColor: '#bb86fc',
  borderColor: '#ffffff',
},
categoryButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '500',
},

// Subtype Container
subtypeContainer: {
  marginBottom: 20,
},
subtypeButton: {
  backgroundColor: '#3c3c3c',
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 8,
  marginRight: 10,
  borderWidth: 2,
  borderColor: 'transparent',
},
selectedSubtypeButton: {
  backgroundColor: '#bb86fc',
  borderColor: '#ffffff',
},
subtypeButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '500',
},

// Add to Cart Button
addToCartButton: {
  backgroundColor: '#4CAF50',
  paddingVertical: 12,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: 'center',
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 3,
},
addToCartButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 'bold',
},

// Cart Container
cartContainer: {
  maxHeight: 200,
  marginBottom: 20,
},
cartItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#3c3c3c',
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 8,
  marginBottom: 10,
},
cartItemName: {
  color: '#ffffff',
  fontSize: 16,
  flex: 2,
},
cartItemPrice: {
  color: '#4CAF50',
  fontSize: 16,
  fontWeight: 'bold',
  flex: 1,
  textAlign: 'right',
},

// Quantity Container
quantityContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#1e1e1e',
  borderRadius: 8,
  paddingHorizontal: 10,
  paddingVertical: 5,
  marginHorizontal: 10,
},
quantityButton: {
  paddingHorizontal: 10,
},
quantityButtonText: {
  color: '#bb86fc',
  fontSize: 20,
  fontWeight: 'bold',
},
quantityText: {
  color: '#ffffff',
  fontSize: 16,
  marginHorizontal: 10,
},

// Remove Item Button
removeItemButton: {
  backgroundColor: '#ff6b6b',
  borderRadius: 15,
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
},
removeItemButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 'bold',
},

// Total Amount Container
totalAmountContainer: {
  backgroundColor: '#1e1e1e',
  paddingVertical: 15,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginBottom: 20,
},
totalAmountText: {
  color: '#4CAF50',
  fontSize: 20,
  fontWeight: 'bold',
  textAlign: 'center',
},

// Date Picker Button
datePickerButton: {
  backgroundColor: '#3c3c3c',
  paddingVertical: 15,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginBottom: 20,
  alignItems: 'center',
},
datePickerButtonText: {
  color: '#bb86fc',
  fontSize: 16,
},

// Modal Button Container
modalButtonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
modalCancelButton: {
  backgroundColor: '#3c3c3c',
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


});

export default styles;
