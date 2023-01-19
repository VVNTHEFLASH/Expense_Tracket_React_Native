import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react'
import { Alert } from 'react-native';
import { getFormatedDate } from 'react-native-modern-datepicker';
import { dropdown } from '../../assets';
import uuid from 'react-native-uuid';

export interface Props {

}

interface S {
    isPanelOpen: boolean;
    amount: string;
    selectedData: string;
    notes: string;
    isDatePickerOpen: boolean;
    dropdownValue: string;
    dropdownImage: any;
    dropdownLabel: string
}
interface SS {
    
}
export default class FormsController extends Component<Props, S, SS> {
    constructor(props: Props) {
        super(props)

        this.state = {
            isPanelOpen: true,
            amount: '',
            selectedData: '',
            notes: '',
            isDatePickerOpen: false,
            dropdownValue: '',
            dropdownImage: dropdown,
            dropdownLabel: ""
        }
    }

    closePanelHandler = () => {
        this.setState({ isPanelOpen: false })
    }

    openPanelHandler = () => {
        this.setState({ isPanelOpen: true })
    }

    onChangeAmountHandler = async (text: string) => {
        const amount = text.replace(/[^0-9]/g, "") 
        this.setState({ amount })
    }

    setDateHandler = (date: any) => {
       console.log(date);
       this.setState({ selectedData: date })
       this.closeDatePicker()
    }

    onChangeNotesHandler = async (text: string) => {
        this.setState({ notes: text })
    }

    closeDatePicker = () => {
        this.setState({ isDatePickerOpen: false })
    }

    openDatePicker = () => {
        this.setState({ isDatePickerOpen: true })
    }

    formatDate(date: string) {
        console.log(date);
        if(date == "") {
            return ""
        }
        let split = date.split("/")
        const day = split[2];
        const month =  parseInt(split[1]) - 1;
        const year = split[0];
        const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return `${day} ${monthArray[month]} ${year}`
    }

    createTransaction = async () => {
        if(parseInt(this.state.amount) <= 0 || this.state.amount == "") {
            return Alert.alert("Transaction denied!", "Please enter any amount");
        }
        else if(this.state.dropdownValue == "") {
            return Alert.alert("Select transaction", "Select any options from dropdown")
        }
        else if(this.state.selectedData == "") {
            return Alert.alert("Date not selected", "Pick any date")
        }
        const data = {
            type: parseInt(this.state.dropdownValue) <= 6 ? "Expense" : "Income",
            amount: this.state.amount,
            date: this.state.selectedData,
            notes: this.state.notes,
            imageURL: this.state.dropdownValue,
            "sub-type": this.state.dropdownLabel,
            id: uuid.v4()
        }

        const getData = await AsyncStorage.getItem("expenses");
        if(getData) {
            const parsedData = JSON.parse(getData);
            const newArray = [...parsedData, data];
            // console.log(newArray, "IF")
            await AsyncStorage.setItem("expenses", JSON.stringify(newArray))
        }
        else {
            const newArray = [];
            newArray.push(data);
            // console.log(newArray, "Else IF")
            await AsyncStorage.setItem('expenses', JSON.stringify(newArray))
        }

        Alert.alert("Kudos!", "Transaction created sucessfully")
        // console.log(data, "Transaction Data!")
        this.setState({
            dropdownValue: '',
            dropdownLabel: '',
            dropdownImage: dropdown,
            amount: '',
            selectedData: '',
            notes: '',
            isPanelOpen: false
        })
    }
}