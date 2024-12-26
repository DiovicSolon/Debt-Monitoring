import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const addDebtStyles = StyleSheet.create({
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

export default addDebtStyles;