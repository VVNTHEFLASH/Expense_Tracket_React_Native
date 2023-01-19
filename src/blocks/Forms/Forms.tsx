import { Text, StyleSheet, Modal, Button, View, TouchableOpacity, Dimensions, 
  ScrollView, TouchableWithoutFeedback, Keyboard, Image, Alert,
} from 'react-native'
import React from 'react'
import { SwipeablePanel } from 'rn-swipeable-panel'
import FormsController, { Props } from './FormsController'
import { TextInput } from 'react-native-paper'
import { apple, electricity, expense, foodDrink, fuel, gift, income, loan, salary, shopping } from '../../assets'
import { faCalendar, faStickyNote, faFileLines } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Dropdown } from 'react-native-element-dropdown'
import DatePicker from 'react-native-modern-datepicker';

export default class Forms extends FormsController {

  constructor(props:Props){
    super(props)
  }

  data = [
    { label: 'Food & Drink', value: '1', image: foodDrink },
    { label: 'Fuel', value: '2', image: fuel },
    { label: 'Shopping', value: '3', image: shopping },
    { label: 'Other Expense', value: '4', image: expense },
    { label: 'Credits & Loan', value: '5', image: loan },
    { label: 'Electricity', value: '6', image: electricity },
    { label: 'Salary', value: '7', image: salary },
    { label: 'Other Income', value: '8', image: income },
  ];

  render() {
    const { isPanelOpen, amount, selectedData, notes,
      isDatePickerOpen, dropdownValue, dropdownImage,
      dropdownLabel
    } = this.state;
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={this.openPanelHandler}>
            <Text style={styles.text}>Add Transaction</Text>
          </TouchableOpacity>
        </View>
        {/* @ts-ignore */}
        <SwipeablePanel
          showCloseButton={true}
          closeIconStyle={styles.closeIconStyle}
          closeRootStyle={styles.closeRootStyle}
          noBar
          fullWidth
          openLarge
          noBackgroundOpacity 
          isActive={isPanelOpen}
          style={styles.swipablePanelStyle} 
          onClose={this.closePanelHandler}
        >
          <ScrollView keyboardShouldPersistTaps={'always'} automaticallyAdjustKeyboardInsets={true} contentContainerStyle={{ flex: 1 }}>  
            <View>
              <Text style={styles.addTransactionText}>Add Transaction</Text>
            </View>
            <View style={styles.amountContainer}>
              <View>
                <Text style={[styles.text, styles.USD]}>USD</Text>
              </View>
              <TouchableWithoutFeedback style={styles.amountInputContainer}>
                <TextInput
                  maxLength={10}
                  keyboardType='number-pad'
                  placeholderTextColor={"#01182D"}
                  value={amount}
                  onChangeText={this.onChangeAmountHandler}
                  style={styles.amountInput}
                  underlineColorAndroid='transparent' 
                  accessibilityLabelledBy={undefined} 
                  accessibilityLanguage={undefined}                  
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.flexRow}
            >
              <View style={{
                borderRadius: 100,
                height: 60,
                width: 60,
                backgroundColor: "#f6f6f6",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}>
                <Image source={dropdownImage} style={{ width: 40, height: 40 }} />
              </View>
              <View>
              <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={this.data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'Select Expense'}
                value={dropdownValue}
                onChange={({value, image, label}) => {
                  this.setState({ 
                    dropdownValue: value, 
                    dropdownImage: image,
                    dropdownLabel: label
                  })
                }}
              />
              </View>
              <View></View>
            </View>
            <View style={[styles.flexRow, {}]}>
              <View style={{
                  borderRadius: 100,
                  height: 60,
                  width: 60,
                  backgroundColor: "#01182D",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}>
                <FontAwesomeIcon size={25} color='white' icon={faCalendar} />
                </View>
                <View>
                  <TouchableWithoutFeedback style={styles.dateField} onPress={this.openDatePicker}>
                    <Text style={styles.dateInput}>{this.formatDate(selectedData)}</Text>
                  </TouchableWithoutFeedback>
                  <Modal 
                    visible={isDatePickerOpen}
                    onRequestClose={this.closeDatePicker}
                    transparent={true}
                    animationType={'slide'}
                  >
                    <DatePicker 
                      onSelectedChange={this.setDateHandler} 
                      mode={'calendar'}
                      style={{
                        background: '#01182D'
                      }}
                    />
                  </Modal>
                </View>
            </View>
            <View style={styles.flexRow}>
              <View style={{
                  borderRadius: 100,
                  height: 60,
                  width: 60,
                  backgroundColor: "#01182D",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden'
                }}>
                  <FontAwesomeIcon size={25} color='white' icon={faFileLines} />
                </View>
                <View>
                  <TextInput 
                  accessibilityLabelledBy={undefined} 
                  accessibilityLanguage={undefined} 
                  style={styles.notesInput}
                  maxLength={100}
                  multiline={true}
                  onChangeText={this.onChangeNotesHandler} />
                </View>
            </View>
            <View style={{
              display: 'flex',
              justifyContent:'center',
              alignItems: 'center',
              marginTop: 35,
            }}>
              <TouchableOpacity onPress={this.createTransaction} style={{
                  backgroundColor: "#01182D",
              }}>
                <Text style={[styles.text, { padding: 12 }]}>Create Transaction</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SwipeablePanel>
      </>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#01182D',
    padding: 14,
    paddingVertical: 18,
    width: 200,
    elevation: 2
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  closeIconStyle: {
    backgroundColor: '#01182D'
  },
  closeRootStyle: {
    backgroundColor: 'transparent',
    position: 'relative',
    top: 25,
    left: 10
  },
  swipablePanelStyle: {
    height: Dimensions.get('window').height - 300,
  },
  addTransactionText: {
    textAlign: 'center',
    fontWeight: '700',
    color: "#01182D"
  },
  amountInput: {
    fontSize: 32,
    backgroundColor: 'transparent',
    width: 200,
    borderBottomWidth: 0,
    marginLeft: 10,
    borderWidth: 0,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 10,
    marginLeft: 20
  },
  USD: {
    padding: 12,
    paddingHorizontal: 20,
    backgroundColor: '#21ce99',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    letterSpacing: 2
  },
  amountContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
    marginTop: 30
  },
  amountInputContainer: {
    
  },
  dateField: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    borderStyle: 'solid'
  },
  dateInput: {
    color: '#01182D',
    fontSize: 26,
    fontWeight: '900',
    backgroundColor: 'transparent',
    width: 250,
    borderBottomWidth: 2,
    borderBottomColor: 'gainsboro',
    marginLeft: 10,
    marginTop: 18
  },
  notesInput: {
    color: '#01182D',
    fontSize: 26,
    fontWeight: '900',
    backgroundColor: 'transparent',
    width: 250,
    borderBottomWidth: 1,
    borderBottomColor: 'gainsboro',
    marginLeft: 10, 
  },
  // dropdown styles
  dropdown: {
    height: 50,
    width: 250,
    borderBottomColor: 'gainsboro',
    borderBottomWidth: 2,
    borderRadius: 0,
    marginLeft: 10
  },
  icon: {
    marginRight: 5,
    transform: [{rotate: '90deg'}],
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 26,
  },
  selectedTextStyle: {
    fontSize: 26,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})