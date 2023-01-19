import { Text, StyleSheet, View, Dimensions, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import HomeScreenController, { Props } from './HomeScreenController'
import { SwipeablePanel } from 'rn-swipeable-panel'
import { electricity, expense, foodDrink, fuel, income, loan, salary, shopping } from '../../assets';


export default class HomeScreen extends HomeScreenController {
  unsubscribe: any;

    constructor(props: Props) {
        super(props)
    }

    async componentDidMount() {
      this.unsubscribe = this.props.navigation.addListener('focus', async () => {
        // The screen is focused
        // Call any action
        await this.getData()
        await this.getTodayData()
        this.filterDataByToday()
      });
      await this.getData()
      await this.getTodayData()
      this.filterDataByToday()
    }

    async componentWillUnmount() {
      this.unsubscribe()
    }

    filterImage(value: string) {
      if(value == "1") {
        return foodDrink;
      }
      else if(value == "2") {
        return fuel
      }
      else if(value == "3") {
        return shopping
      }
      else if(value == "4") {
        return expense
      }
      else if(value == "5") {
        return loan
      }
      else if(value == "6") {
        return electricity
      }
      else if(value == "7") {
        return salary
      }
      else if(value == "8") {
        return income
      }
    }

    filterExpense(type: string) {
      if(type === "Income") {
        return true
      }
      else return false
    }

    renderItem(item: any, index: number): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null {
      return (
        <View key={index} style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            margin: 20
          }}>
            <View style={{
              height: 45,
              width: 45,
              borderRadius: 100,
              overflow: 'hidden'
            }}>
              <Image style={{
                height: '100%',
                width: '100%'
              }} source={this.filterImage(item.imageURL)} />
            </View>
            <View style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 25
            }}>
              <Text 
                style={{
                color: '#01182D',
                fontWeight: 'bold',
                fontSize: 18
              }}>{item["sub-type"]}</Text>
            </View>
          </View>
          <View style={{
            margin: 20
          }}>
            <Text style={[{
              fontWeight: 'bold',
            }, {color: !this.filterExpense(item.type) ? 'tomato' : "#21ce99"}]}>{item.amount}</Text>
          </View>
        </View>
      )
    }

    filterDataByToday = () => {
      const { data, todayDateString } = this.state
      // console.log(data);
      const filterByDate = data.slice(0).filter((item: any) => item.date === todayDateString)
      console.log(filterByDate, "FFF");
      this.setState({
        filterdData: filterByDate
      })
    }


  render() {
    const activeButton = this.state.switchButton === "Today";

    const { data } = this.state;

    const filterDataByIncome = data.slice(0).filter((item: any) => item.type == "Income")
    const filterDataByExpense = data.slice(0).filter((item: any) => item.type == "Expense")

    const totalIncome = filterDataByIncome.reduce(
      (accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.amount),
      0
    );
    const totalExpense = filterDataByExpense.reduce(
      (accumulator: any, currentValue: any) => accumulator + parseInt(currentValue.amount),
      0
    );    
    const total = totalIncome - totalExpense;

    const todayIncome = this.state.filterdData.slice(0).filter((item:any) => item.type == "Income").
      reduce((acc:any , curVal:any) => acc + parseInt(curVal.amount), 0)

    const todayExpense = this.state.filterdData.slice(0).filter((item:any) => item.type == "Expense").
    reduce((acc:any , curVal:any) => acc + parseInt(curVal.amount), 0)

    const todayTotal = todayIncome - todayExpense;

    return (
      <>
      <View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <View style={{
            margin: 20,
            marginTop: 40
          }}>
            {/* icon */}
            <TouchableOpacity onPress={this.openPanel}>
              <>
              <View style={{ height: 2, width: 25, backgroundColor: '#000'}}/>
              <View style={{ height: 2, width: 15, backgroundColor: '#000', marginTop: 8}}/>
              </>
            </TouchableOpacity>
          </View>
          <View style={{
            margin: 20,
            marginTop: 30
          }}>
            <View style={{ height: 50, width: 50, backgroundColor: 'gainsboro', borderRadius: 100}} />
          </View>
        </View>
        <View style={{
          margin: 20
        }}>
          <Text style={{
            color: '#fff',
            fontSize: 18
          }}>My budget</Text>
          <Text style={{ 
            color: '#fff',
            fontWeight: '900',
            fontSize: 36,
            marginTop: 10
           }}>${total.toLocaleString('en-US')}</Text>
        </View>
      </View>
      {/* @ts-ignore */}
      <SwipeablePanel
        isActive={this.state.isOpen}
        onClose={this.closePanel}
        closeOnTouchOutside={true}
        fullWidth
        noBar
        noBackgroundOpacity
        openLarge
        onlyLarge
        style={{
          height: Dimensions.get('window').height - 350
        }}>
          <>
            <View>
              <View style={[{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                overflow: 'hidden'
              }, styles.switchButtonContainer]}>
                <TouchableOpacity style={[styles.switchButton, activeButton ? styles.activeSwitch : null]}
                onPress={() => {
                  this.setState({ switchButton: 'Today' })
                  this.filterDataByToday()
                }}>
                  <Text style={[styles.text, activeButton ? styles.activeText : null]}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.switchButton, !activeButton ? styles.activeSwitch2 : null]}
                onPress={() => {
                  this.setState({ switchButton: 'Month', filterdData: this.state.data })
                  }}>
                  <Text style={[styles.text, !activeButton ? styles.activeText : null]}>Month</Text>
                </TouchableOpacity>
              </View>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}>
                <View style={{
                  margin: 25
                }}>
                  <Text style={{
                    fontSize: 22,color: '#01182D',fontWeight: '900'
                  }}>
                    {/* 18 May 2020 */}
                    {this.state.todayDate}
                    </Text>
                </View>
                <View style={{
                  margin: 25
                }}>
                  <Text style={{
                    color: todayTotal < 0 ? "tomato" : '#21ce99',
                    fontWeight: '900',
                    fontSize: 22
                  }}>{todayTotal}</Text>
                </View>
              </View>
              {this.state.filterdData.length < 0 && (
                <View>
                  <Text>No Expenses found</Text>
                </View>
              )}
              {this.state.filterdData && this.state.filterdData.map((item: any, index: number) => this.renderItem(item, index))}
              {/* <FlatList data={this.state.data} renderItem={({item}) => this.renderItem(item)} keyExtractor={(item,index) => index.toString()} /> */}
            </View>
          </>
      </SwipeablePanel>
      </>
    )
  }

}

const styles = StyleSheet.create({
  switchButton: {
    padding: 12,
    paddingHorizontal: 70,
  },
  switchButtonContainer: {
    marginTop: 30,
    backgroundColor: 'gainsboro',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    marginHorizontal: 30
  },
  text: {
    color: "#01182D",
    fontWeight: 'bold'
  },
  activeSwitch: {
    backgroundColor: "#01182D",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50
  },
  activeSwitch2: {
    backgroundColor: "#01182D",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50
  },
  activeText: {
    color: '#ffffff'
  }
})