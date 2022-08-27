import toast from '../components/toast'
import { IconButton, } from 'react-native-paper'
import React, { useEffect, useRef, useState } from 'react'
import CustomButton from '../components/customButton'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar as ExpoStatusBar } from 'expo-status-bar'
import { useNavigation, useTheme } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { SourceCodePro_500Medium as sourceCodePro, useFonts } from '@expo-google-fonts/source-code-pro'
import { Animated, Easing, FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen';

const Calculator = () => {

    const { colors, dark } = useTheme()
    const { navigate } = useNavigation()

    const [storage, setStorage] = useState([])
    const [lastNumber, setLastNumber] = useState('0');
    const [userInput, setUserInput] = useState('');
    const [historyVisible, setHistoryVisible] = useState(false)


    // Animation start
    let spinValue = new Animated.Value(0);

    // First set up animation 
    Animated.timing(
        spinValue,
        {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear, // Easing is an additional import from react-native
            useNativeDriver: true  // To make use of native driver for performance
        }
    ).start()
    // Next, interpolate beginning and end values (in this case 0 and 1)
    let spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    // Animation End

    // Main Data 
    const mainData = [
        {
            DisplayName: <IconButton icon={'close'} iconColor={'red'} size={30} />,
            Value: 'C',
            backgroundColor: colors.primary + '30',
            borderColor: colors.primary + 60,
        },
        {
            DisplayName: '%',
            Value: "%",
            backgroundColor: colors.primary + 30,
            borderColor: colors.primary + 60,
        },
        {
            DisplayName: '\xF7',
            Value: "/",
            backgroundColor: colors.primary + 30,
            borderColor: colors.primary + 60,
        },
        {
            DisplayName: <IconButton icon={'backspace-outline'} iconColor={colors.mainText} />,
            Value: 'DEL',
            backgroundColor: colors.primary + 30,
            borderColor: colors.primary + 60,
        },
        {
            DisplayName: '7',
            Value: 7,
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '8',
            Value: 8,
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '9',
            Value: 9,
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '\xD7',
            Value: "*",
            backgroundColor: colors.primary + 30,
            borderColor: colors.primary + 60,
        },
        {
            DisplayName: '4',
            Value: 4,
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '5',
            Value: 5,
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '6',
            Value: 6,
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '\u2013',
            Value: "-",
            backgroundColor: colors.primary + 30,
            borderColor: colors.primary + 60,
        },
        {
            DisplayName: '1',
            Value: 1,
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '2',
            Value: 2,
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '3',
            Value: 3,
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '+',
            Value: "+",
            backgroundColor: colors.primary + 30,
            borderColor: colors.primary + 60,
        },
        {
            DisplayName: "00",
            Value: "00",
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '0',
            Value: 0,
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '\xB7',
            Value: ".",
            backgroundColor: colors.primary + '05',
            borderColor: colors.primary + 30,
        },
        {
            DisplayName: '=',
            Value: "=",
            backgroundColor: colors.primary + 30,
            borderColor: colors.primary + 60,
        },
    ]

    const buttons = (index) => {
        return (
            <View style={style.ButtonView}>
                <TouchableOpacity activeOpacity={0.7} style={[
                    style.ButtonViewTouchable, {
                        borderColor: mainData[index].borderColor || colors.border + 40,
                        backgroundColor: mainData[index].backgroundColor || colors.card + 99
                    }]}
                    onPress={() => { handleInput(mainData[index].Value), Vibration.vibrate([0, 5, 5, 5]) }}>
                    <Text style={{
                        fontFamily: 'sourceCodePro',
                        fontSize: mainData[index].DisplayName === "%" ? 28 : 40,
                        color: mainData[index].Value == "=" ? colors.primary : colors.mainText,
                    }} >{mainData[index].DisplayName}</Text>
                </TouchableOpacity>
            </View >
        )
    }

    // button press krny pr kia function run ho ye os ko handle krny ka liay
    let lastValue = userInput[userInput.length - 1]
    let length = userInput.length

    const handleInput = (item) => {

        try {
            // Tip
            // yaha py && is lia lagaya ha 
            // jab me first time button(operator) press krta hu to to lastValue meri true ho jati ha phir
            //  meny set kiya hoa ha ky agr meri lastValue true ho to new input allow na kro to is ka lia mujy first statement ko some time false krna ha is lia meny && use kia 
            // jab meny && use kia to lastValue bhi true ga lakin jab wo && () ki right side ko check kry ga or me koi digit press kro ga to wo pori condition false ho jay gi 
            // to hamari 2nd statment run ho jay gi
            if ((lastValue === "+" || lastValue === "-" || lastValue === "*" || lastValue === "/" || lastValue === "." || lastValue === "%" || length == 0)
                && (item === "+" || item === "-" || item === "*" || item === "/" || item === "." || item === "%" || item === 0 || item === "00")) {
                setUserInput(userInput)
                toast('Invaild Format/Input')
            } else {
                setUserInput(userInput + item);
            }

            if (item === "=") {
                if (userInput.length === 0) {
                    setUserInput(userInput)
                }
            }

            if (item === 'DEL') return setUserInput(userInput.toString().substring(0, (userInput.length - 1)))
            if (item === 'C') return setLastNumber('0'), setUserInput('')
            if (item === '=') return equalButton(), saveHistory()

        } catch (error) {
            toast('Invaild Format/Input')
            console.log(error.message)
        }
    }

    // Jab equalButton press ho ga tab ye run ho ga
    const equalButton = () => {
        let lastArr = userInput[userInput.length - 1]
        if (lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
            setUserInput(userInput);
        } else if (lastArr === "%") {
            setLastNumber(userInput.toString().substring(0, userInput.length - 1) / 100)
            setUserInput(userInput.toString().substring(0, userInput.length - 1) / 100)
        }
        else {
            let result = eval(userInput)
            if (result.toString().includes('.')) {
                result = (eval(userInput)).toFixed(2)
            }
            setLastNumber(result);
            setUserInput(result)
            // return;
        }
    }

    // Ye live calculation ka lia useEffect lagaya hoa ha jasy hi userInput me kuch change ho ga ye calculate kr dy ga
    useEffect(() => {
        const calculate = () => {
            if (userInput) {
                let lastArr = userInput[userInput.length - 1]
                if (lastArr === '/' || lastArr === '*' || lastArr === '-' || lastArr === '+' || lastArr === '.') {
                    setUserInput(userInput);
                } else if (lastArr === "%") {
                    setLastNumber(userInput.toString().substring(0, userInput.length - 1) / 100)
                }
                else {
                    let result = eval(userInput)
                    if (result.toString().includes('.')) {
                        result = (eval(userInput)).toFixed(2)
                    }
                    setLastNumber(result)
                }
            }
        }
        calculate()
    }, [userInput])

    // Ye AsyncStorage me History/data ko save krta ha jab equalButton press hota 
    let saveHistory = async () => {
        let result = eval(userInput)
        if (result.toString().includes('.')) {
            result = (eval(userInput)).toFixed(2)
        }
        await AsyncStorage.setItem(`${result}`, `${userInput}`)
    }

    // Ye jasy hi userInput me kuch change hoga vesy hi AsyncStorage se all key + values fetch kary ga or os ko storage me set kr dy ga
    useEffect(() => {
        let multiGet = async () => {
            setStorage((await AsyncStorage.multiGet(await AsyncStorage.getAllKeys())).splice(0, (await AsyncStorage.multiGet(await AsyncStorage.getAllKeys())).length - 2))
        }
        multiGet()
    }, [userInput])

    const style = StyleSheet.create({
        LinearGradientView: {
            flex: 1,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
        },
        UserInputText: {
            margin: 15,
            fontSize: 35,
            textAlign: 'right',
            color: colors.primary,
            fontFamily: 'sourceCodePro'
        },
        ResultView: {
            flex: 0.8,
            height: '100%',
            borderRadius: 20,
            marginHorizontal: 10,
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderWidth: dark ? 1 : 2,
            borderColor: colors.border + 30,
            backgroundColor: dark ? colors.card + 50 : colors.border + 20,
        },
        ResultText: {
            fontSize: 40,
            paddingRight: 10,
            alignSelf: 'flex-end',
            color: colors.mainText,
            fontFamily: 'sourceCodePro',
        },
        ButtonMainView: {
            flex: 1.5,
            height: '67%',
            justifyContent: 'space-evenly'
        },
        ButtonView: {
            flex: 1,
            margin: 5,
            borderRadius: 500,
            backgroundColor: colors.background,
        },
        ButtonViewTouchable: {
            flex: 1,
            borderWidth: 1,
            borderRadius: 500,
            alignItems: 'center',
            justifyContent: 'center',
        },
        GradientTouchableOpacityHistory: {
            bottom: 0,
            paddingTop: 5,
            width: '100%',
            height: '60%',
            borderRadius: 20,
            position: 'absolute',
            justifyContent: 'center',
            backgroundColor: colors.background,
        },
        historyNotFountText: {
            padding: 15,
            borderRadius: 20,
            textAlign: 'center',
            alignSelf: 'center',
            color: colors.mainText,
            fontFamily: 'sourceCodePro',
            backgroundColor: colors.card, shadowColor: 'black', elevation: 5
        },
        TouchableOpacityHistory: {
            padding: 20,
            borderWidth: 1,
            borderRadius: 20,
            marginVertical: 5,
            marginHorizontal: 10,
            borderColor: colors.border + 30,
            backgroundColor: colors.card + 70,
        },
        smallBoxIndex: {
            borderWidth: 1,
            right: 20,
            borderRadius: 10,
            paddingVertical: 2,
            textAlign: 'center',
            position: 'absolute',
            paddingHorizontal: 10,
            color: colors.mainText,
            borderColor: colors.border,
            transform: [{ scale: 0.9 }],
            backgroundColor: colors.card,
        },
        AnswerShowText: {
            fontSize: 18,
            color: colors.mainText,
            fontFamily: 'sourceCodePro',
        },
        HistoryFlatListAnswerView: {
            marginVertical: 10,
            borderBottomWidth: 1,
            borderColor: colors.border + 30,
        },
        HistoryFlatListAnswerText: {
            fontSize: 20,
            textAlign: 'right',
            color: colors.mainText + 99,
        },
        RemoveHistoryButton: {
            bottom: 10,
            position: 'absolute',
            justifyContent: 'center',
            backgroundColor: colors.card + 'e8',
            borderColor: colors.border,
            borderWidth: 1
        }
    })

    let [fontsLoaded] = useFonts({
        sourceCodePro
    });

    if (!fontsLoaded) {
        async () => {
            return (
                await SplashScreen.hideAsync()
            )
        }
    } else {
        return (
            <View style={{ flex: 3 }}>
                <ExpoStatusBar animated backgroundColor='transparent' style='auto' />
                <View style={{ flex: 1, height: '33.33%', justifyContent: "flex-end" }}>

                    {/* LinearGradient Start */}

                    <LinearGradient style={[style.LinearGradientView]} colors={[dark ? colors.primary + 20 : colors.primary + 30, dark ? colors.card + '00' : colors.primary + "00"]} >
                        <View style={{ paddingTop: StatusBar.currentHeight, flex: 2 }}>
                            <View style={{ flex: 2 }}>
                                <Text
                                    numberOfLines={4}
                                    adjustsFontSizeToFit
                                    style={[style.UserInputText]}>
                                    {userInput}
                                </Text>
                            </View>
                            <View style={[style.ResultView]}>
                                <Text
                                    numberOfLines={1}
                                    adjustsFontSizeToFit
                                    style={style.ResultText}
                                >
                                    {lastNumber}
                                </Text>
                            </View>

                            {/* History Setting Show/Hide Button Start */}

                            <View style={{ flexDirection: 'row', }}>
                                <IconButton icon={"backup-restore"} style={{ left: 5, backgroundColor: "#99999920", }} iconColor={"#999999"} mode="contained" onPress={async () => { setHistoryVisible(!historyVisible), Vibration.vibrate([1, 5]) }} />
                                <IconButton icon={"cog"} style={{ left: 5, backgroundColor: "#99999920", transform: [{ rotate: spin }] }} iconColor={"#999999"} mode="contained" onPress={() => { navigate('Setting'), Vibration.vibrate([1, 5]) }} />
                            </View>

                            {/* History Setting Show/Hide Button End */}

                        </View>
                    </LinearGradient>

                    {/* LinearGradient End */}

                </View>

                {/* Main Calculator Pad start */}

                <View style={style.ButtonMainView}>

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {buttons(0)}
                        {buttons(1)}
                        {buttons(2)}
                        {buttons(3)}
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {buttons(4)}
                        {buttons(5)}
                        {buttons(6)}
                        {buttons(7)}
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {buttons(8)}
                        {buttons(9)}
                        {buttons(10)}
                        {buttons(11)}
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {buttons(12)}
                        {buttons(13)}
                        {buttons(14)}
                        {buttons(15)}
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        {buttons(16)}
                        {buttons(17)}
                        {buttons(18)}
                        {buttons(19)}
                    </View>

                </View>

                {/* Main Calculator Pad End */}

                {/* History Panel Start */}

                {historyVisible ?
                    <LinearGradient style={style.GradientTouchableOpacityHistory}
                        colors={[dark ? colors.primary + 20 : colors.primary + 30,
                        dark ? colors.card + 60 : colors.primary + "01"]} >

                        <View style={{ height: '100%', width: '100%' }}>

                            {storage.length == 0 ?
                                <View style={{ height: '100%', width: '100%', padding: 20, justifyContent: 'center' }}>
                                    <Text style={style.historyNotFountText}>No History Found</Text>
                                </View> : <FlatList
                                    data={storage.map((value, i) => ({ index: i, data: value }))}
                                    style={{ height: '100%', }}
                                    renderItem={({ item }) => {
                                        let dataSetTouserInput = async (item) => {
                                            let res = await AsyncStorage.getItem(item.data[0])
                                            setUserInput(res)
                                        }
                                        return (
                                            <TouchableOpacity
                                                activeOpacity={0.8}
                                                style={style.TouchableOpacityHistory} onPress={() => dataSetTouserInput(item)} >
                                                <Text style={[style.smallBoxIndex, { top: item.index === 0 ? -7 : -12 }]}>
                                                    {item.index}
                                                </Text>
                                                <Text style={style.AnswerShowText}>
                                                    {item.data[1]}
                                                </Text>
                                                <View style={style.HistoryFlatListAnswerView} />
                                                <Text style={style.HistoryFlatListAnswerText}>
                                                    {item.data[0]}=  <Text style={{ fontFamily: 'sourceCodePro', fontSize: 15 }}>Answer</Text>
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                    key={(item) => { item.index }}
                                    keyExtractor={(item) => { return item.index }}
                                />}

                            {storage.length !== 0 ?
                                <CustomButton
                                    bgStyle={style.RemoveHistoryButton}
                                    textStyle={{ fontFamily: 'sourceCodePro', color: colors.mainText }}
                                    title='Remove history'
                                    onPress={async () => {
                                        try {
                                            let check = async () => {
                                                let b = await AsyncStorage.getAllKeys()
                                                return await AsyncStorage.multiRemove(b.splice(0, b.length - 1))
                                            }
                                            check()
                                            setStorage([])
                                        } catch (e) {
                                            console.log(e.message);
                                        }
                                    }} /> : null}
                        </View>
                    </LinearGradient> : null}

                {/* History Panel End */}

            </View >
        )
    }
}

export default Calculator;