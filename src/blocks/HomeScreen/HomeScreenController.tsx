import AsyncStorage from '@react-native-async-storage/async-storage'
import { Component } from 'react'

export interface Props {
    navigation: any
}

interface S {
    isOpen: boolean,
    switchButton: "Today" | "Month",
    data: any;
    todayDate: string,
    todayDateString: any,
    filterdData: any,
    todayBalance: number
}
interface SS {
    
}

export default class HomeScreenController extends Component<Props, S, SS> {
    constructor(props: Props){
        super(props)

        this.state = {
            isOpen: true,
            switchButton: "Today",
            data: [],
            todayDate: '',
            todayDateString: "",
            filterdData: [],
            todayBalance: 0
        }
    }

    closePanel = () => {
        console.log("Close");
        return this.setState({ isOpen: false })
    }
    
    openPanel = () => {
        console.log("Open");
        return this.setState({ isOpen: !this.state.isOpen })
    }

    getData = async () => {
        const data = await AsyncStorage.getItem('expenses');
        if(data) {
            const parsedData = JSON.parse(data)
            console.log(parsedData)
            this.setState({ data: parsedData })
        }
    }

    getTodayData = async () => {
        const newDate = new Date()
        const newDate2 = new Date().toLocaleDateString().split('/')
        const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = `${newDate.getMonth() + 1}`.padStart(2, "0")
        const day = `${newDate.getDate()}`.padStart(2, "0")
        const year = `${newDate.getFullYear()}`
        console.log(newDate.getDate(), "ISO", newDate2);
        const month2 = parseInt(newDate2[0]);
        const day2 = newDate2[1];
        const year2 = newDate2[2];
        const today = `${day2} ${monthArray[month2-1]} ${year2}`
        this.setState({
          todayDate: today,
          todayDateString: [year, month, day].join("/")
        })
        // return `${day} ${monthArray[month-1]} ${year}`
      }

    //   paddingDate(input: string) {
    //     function pad(s: any) {
    //         return parseInt(s) < 10 ? "0"+ s : s;
    //     }
    //     let d = new Date(input)
    //     return [pad(d.getDate()), pad(d.getMonth() + 1), pad(d.getFullYear())]
    //   }
}
