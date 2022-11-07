import { IconButton, TextInput, TouchableRipple } from 'react-native-paper'
import React, { useEffect, useRef, useState } from 'react'
// import { LinearGradient } from 'react-native-linear-gradient'
import { useNavigation, useTheme } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { useFonts } from 'expo-font'
import { Animated, FlatList, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, Vibration, View } from 'react-native'
// import * as SplashScreen from 'expo-splash-screen';
import { evaluate } from 'mathjs'
import LinearGradient from 'react-native-linear-gradient'

export default Calculator = () => {

    const ref = useRef()

    const { colors, dark } = useTheme()
    const { navigate } = useNavigation()

    const [storage, setStorage] = useState([])
    const [lastNumber, setLastNumber] = useState('0');
    const [userInput, setUserInput] = useState('');
    const [historyVisible, setHistoryVisible] = useState(false)

    const [positionStart, setPositionStart] = useState(0)

    const [cursorPosition, setCursorPosition] = useState()

    useEffect(() => {
        if (ref.current) {
            ref.current.focus()
        }
    }, [ref.current])

    function toast(msg) {
        ToastAndroid.show(msg, ToastAndroid.SHORT)
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    function replaceAll(str, find, replace) {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    // Main Data 
    const mainData = [
        { Value: 'C' },
        { Value: "%" },
        { Value: "÷" },
        {
            DisplayName: <IconButton icon={'backspace'} size={30} color={colors.mainText} />,
            Value: 'DEL'
        },
        { Value: 7 }, { Value: 8 }, { Value: 9 }, { Value: "×" }, { Value: 4 }, { Value: 5 }, { Value: 6 },
        { Value: "−" }, { Value: 1 }, { Value: 2 }, { Value: 3 }, { Value: "+" }, { Value: "00" },
        { Value: 0 }, { Value: "." }, { Value: "=" }
    ]

    const offset = useRef(new Animated.Value(0)).current;

    const radius = offset.interpolate({
        inputRange: [50, 100],
        outputRange: [10, 50],
        extrapolate: 'clamp'
    })

    const buttons = (index) => {

        let fontSize = mainData[index].Value === "%" ? 35 : mainData[index].Value === "C" ? 35 : mainData[index].Value === "÷" || "×" || '−' || '+' || '=' ? 50 : 40

        let bgColor = mainData[index].Value === "÷" || mainData[index].Value === "×" || mainData[index].Value === '−' ||
            mainData[index].Value === '+' || mainData[index].Value === '=' || mainData[index].Value === 'C' ||
            mainData[index].Value === "DEL" || mainData[index].Value === "%" ? colors.primary + 40 : colors.card + 99

        return (
            <TouchableRipple 
            rippleColor={colors.primary + 99} borderless style={[style.ButtonView, { borderRadius: 10, }]} onPress={() => { handleInput(mainData[index].Value), Vibration.vibrate(50) }}>
                <View
                    style={[
                        style.ButtonViewTouchable,
                        {
                            margin: -5,
                            borderColor: mainData[index].borderColor || colors.border + 40,
                            backgroundColor: bgColor,
                            justifyContent: 'center', alignItems: 'center'
                        }]}
                >
                    <Text style={{
                        fontFamily: 'arvo',
                        fontSize: fontSize,
                        color: colors.mainText,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        marginBottom: mainData[index].Value == '÷' ? 5 : null
                    }} >{mainData[index].DisplayName || mainData[index].Value}</Text>
                </View>
            </TouchableRipple >
        )
    }

    // button press krny pr kia function run ho ye os ko handle krny ka liay
    let lastValue = userInput[userInput.length - 1]
    let length = userInput.length

    const handleInput = (item) => {
        try {


            let left = userInput.substring(0, cursorPosition)
            let right = userInput.substring(cursorPosition)

            // setPositionStart(cursorPosition + 1)
            // setCursorPosition(cursorPosition + 1)

            // Tip
            // yaha py && is lia lagaya ha 
            // jab me first time button(operator) press krta hu to to lastValue meri true ho jati ha phir
            //  meny set kiya hoa ha ky agr meri lastValue true ho to new input allow na kro to is ka lia mujy first statement ko some time false krna ha is lia meny && use kia 
            // jab meny && use kia to lastValue bhi true ga lakin jab wo && () ki right side ko check kry ga or me koi digit press kro ga to wo pori condition false ho jay gi 
            // to hamari 2nd statment run ho jay gi
            if ((lastValue === "+" || lastValue === "−" || lastValue === "×" || lastValue === "÷" || length == 0) && (item === "+" || item === "−" || item === "×" || item === "÷" || item === "." || item === "00")) {
                setUserInput(userInput)
            } else if (lastValue == "." && item == ".") {
                setUserInput(userInput)
            } else {
                setUserInput(userInput + item);
                // setUserInput(left + item + right)

            }

            // limit user input to 15
            let rep = replaceAll(userInput, "÷", "")
            rep = replaceAll(rep, "−", "")
            rep = replaceAll(rep, "×", "")
            rep = replaceAll(rep, "÷", "")
            if (rep.length === 20) {
                setUserInput(userInput)
                toast('max number limit reached')
            }


            if (lastValue === "+") {
                if (item === "÷" || item === "×" || item === "−") {
                    setUserInput(userInput.substring(0, userInput.length - 1) + item)
                }
            } else if (lastValue === "−") {
                if (item === "÷" || item === "×" || item === "+") {
                    setUserInput(userInput.substring(0, userInput.length - 1) + item)
                }
            } else if (lastValue === "×") {
                if (item === "÷" || item === "+" || item === "−") {
                    setUserInput(userInput.substring(0, userInput.length - 1) + item)
                }
            } else if (lastValue === "÷") {
                if (item === "×" || item === "+" || item === "−") {
                    setUserInput(userInput.substring(0, userInput.length - 1) + item)
                }
            }

            if (item === '=') return equalButton(), saveHistory()
            if (item === 'C') return setLastNumber('0'), setUserInput('')
            if (item === "=") { if (userInput.length === 0) { setUserInput(userInput) } }
            // if (item === 'DEL') return setUserInput(userInput.replace(userInput.charAt(cursorPosition - 1), ''))
            if (item === 'DEL') return setUserInput(userInput.toString().substring(0, (userInput.length - 1)))

        } catch (error) {
            toast('Invaild Format/Input')
            console.log(error.message)
        }
    }

    // Jab equalButton press ho ga tab ye run ho ga
    const equalButton = () => {
        try {
            let lastArr = userInput[userInput.length - 1]
            if (lastArr === '÷' || lastArr === '×' || lastArr === '−' || lastArr === '+' || lastArr === '.') {
                setUserInput(userInput);
            }
            else {
                let rep = replaceAll(userInput, "×", "*")
                rep = replaceAll(rep, "÷", '/')
                rep = replaceAll(rep, "−", '-')
                let result = JSON.stringify(evaluate(rep))
                if (result.toString().includes('.')) {
                    result = (evaluate(rep)).toFixed(3)
                }
                setLastNumber(result);
                setUserInput(result)
            }
        } catch (err) {
            console.log("equal buttom press : ", err.message);
        }
    }

    // Ye live calculation ka lia useEffect lagaya hoa ha jasy hi userInput me kuch change ho ga ye calculate kr dy ga
    useEffect(() => {
        const calculate = () => {
            let lastArr = userInput[userInput.length - 1]
            try {
                if (lastArr === '÷' || lastArr === '×' || lastArr === '−' || lastArr === '+' || lastArr === '.') {
                    setUserInput(userInput);
                } else {
                    let rep = replaceAll(userInput, "×", "*")
                    rep = replaceAll(rep, "÷", '/')
                    rep = replaceAll(rep, "−", '-')
                    let result = (evaluate(rep))
                    if (result.toString().includes('.')) {
                        result = (evaluate(rep)).toFixed(3)
                    }
                    setLastNumber(result)
                }
            } catch (err) {
                console.log(err);
                console.log("Live calculation : ", err.message);
            }
        }
        calculate()
    }, [userInput])

    // Ye AsyncStorage me History/data ko save krta ha jab equalButton press hota 
    let saveHistory = async () => {
        let result = evaluate(userInput)
        if (result.toString().includes('.')) {
            result = (evaluate(userInput)).toFixed(2)
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
            fontSize: 120,
            textAlign: 'right',
            color: colors.primary,
            fontFamily: 'arvo'
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
            fontFamily: 'arvo',
        },
        ButtonMainView: {
            flex: 1.8
        },
        ButtonView: {
            aspectRatio: 1,
            margin: 5,
            // borderRadius: 500,
            backgroundColor: colors.background,
        },
        ButtonViewTouchable: {
            flex: 1,
            // borderRadius: 500,
            alignItems: 'center',
            justifyContent: 'center',
        },
        GradientTouchableOpacityHistory: {
            flex: 1.8,
            paddingTop: 5,
            width: '100%',
            borderRadius: 20,
            justifyContent: 'center',
            backgroundColor: colors.background,
        },
        historyNotFountText: {
            padding: 15,
            borderRadius: 20,
            textAlign: 'center',
            alignSelf: 'center',
            color: colors.mainText,
            fontFamily: 'arvo',
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
            fontFamily: 'arvo',
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
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            shadowColor: '#000',
            paddingVertical: 10,
            paddingHorizontal: '8%',
            borderRadius: 20,
        }
    })



    // let [fontsLoaded] = useFonts({
    //     Arvo: require('../../assets/fonts/Arvo-Regular.ttf')
    // });

    // if (!fontsLoaded) {
    //     async () => {
    //         return (
    //             await SplashScreen.hideAsync()
    //         )
    //     }
    // } else {



    return (
        <View style={{ flex: 3 }}>
            <StatusBar animated translucent barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />
            <View style={{ flex: 1.2, justifyContent: "center", }}>

                {/* LinearGradient Start */}

                <LinearGradient style={[style.LinearGradientView]} colors={[dark ? colors.primary + 40 : colors.primary + 40, dark ? colors.card + '00' : colors.primary + "00"]} >
                    <View style={{ paddingTop: StatusBar.currentHeight, flex: 2 }}>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            {/* <ScrollView horizontal > */}
                            <Text

                                numberOfLines={2}
                                adjustsFontSizeToFit
                                // lineBreakMode='head'
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
                            <IconButton icon={"dots-horizontal-circle"} size={32} style={{ left: 5, backgroundColor: "#99999920", }} color={dark ? "#999999" : '#404040'} mode="contained" onPress={async () => { setHistoryVisible(!historyVisible), Vibration.vibrate(50) }} />
                            <IconButton icon={"cog"} size={32} style={{ left: 5, backgroundColor: "#99999920" }} color={dark ? "#999999" : '#404040'} mode="contained" onPress={() => { navigate('Setting'), Vibration.vibrate(50) }} />
                        </View>

                        {/* History Setting Show/Hide Button End */}

                    </View>
                </LinearGradient>

                {/* LinearGradient End */}

            </View>

            {!historyVisible ?

                // {/* Main Calculator Pad start */}

                <View style={[style.ButtonMainView]}>

                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignContent: 'center' }}>
                        {buttons(0)}{buttons(1)}{buttons(2)}{buttons(3)}
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignContent: 'center' }}>
                        {buttons(4)}{buttons(5)}{buttons(6)}{buttons(7)}
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignContent: 'center' }}>
                        {buttons(8)}{buttons(9)}{buttons(10)}{buttons(11)}
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignContent: 'center' }}>
                        {buttons(12)}{buttons(13)}{buttons(14)}{buttons(15)}
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', alignContent: 'center' }}>
                        {buttons(16)}{buttons(17)}{buttons(18)}{buttons(19)}
                    </View>

                </View>

                // {/* Main Calculator Pad End */}

                // {/* History Panel Start */}

                :
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
                                renderItem={({ item, }) => {
                                    let dataSetTouserInput = async (item) => {
                                        let res = await AsyncStorage.getItem(item.data[0])
                                        setUserInput(res)
                                    }
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.6}
                                            style={style.TouchableOpacityHistory} onPress={() => dataSetTouserInput(item)} >
                                            <Text style={[style.smallBoxIndex, { top: item.index === 0 ? -7 : -12 }]}>
                                                {item.index}
                                            </Text>
                                            <Text style={style.AnswerShowText}>
                                                {item.data[1]}
                                            </Text>
                                            <View style={style.HistoryFlatListAnswerView} />
                                            <Text style={style.HistoryFlatListAnswerText}>
                                                {item.data[0]}=  <Text style={{ fontFamily: 'arvo', fontSize: 15 }}>Answer</Text>
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }}
                                key={(item) => { item.index }}
                                keyExtractor={(item) => { return item.index }}
                            />}

                        {storage.length !== 0 ?
                            <TouchableOpacity
                                style={style.RemoveHistoryButton}
                                onPress={async () => {
                                    try {
                                        let check = async () => {
                                            let b = await AsyncStorage.getAllKeys()
                                            return await AsyncStorage.multiRemove(b.splice(0, b.length - 2))
                                        }
                                        check()
                                        setStorage([])
                                    } catch (e) {
                                        console.log(e.message);
                                    }
                                }} >
                                <Text style={{ fontFamily: 'arvo', color: colors.mainText }}>Remove history</Text>

                            </TouchableOpacity> : null}
                    </View>
                </LinearGradient>}

            {/* History Panel End */}

        </View >
    )
    // }
}