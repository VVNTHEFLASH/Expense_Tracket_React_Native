import React, { Component } from 'react'
import { getFormatedDate } from 'react-native-modern-datepicker';
import { dropdown } from '../../assets';

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
}