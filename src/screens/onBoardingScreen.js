import { View, Text, Image, TouchableOpacity, StatusBar, Animated, Easing } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import logo from '../../assets/onBoarding/logo.png'
import Custom3 from '../../assets/onBoarding/Custom3.png'

const OnBordingScreen = ({ navigation }) => {

    let dot = ({ selected }) => {
        return <View style={{ width: 15, height: 10, backgroundColor: selected ? '#ffffff' : '#00000070', marginHorizontal: 5, borderRadius: 400 }} />
    }

    // Animation Start
    let spinValue = new Animated.Value(0);

    // First set up animation 
    Animated.loop(
        Animated.timing(
            spinValue,
            {
                toValue: 1,
                duration: 60000,
                easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            })
    ).start()

    // Next, interpolate beginning and end values (in this case 0 and 1)

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    // Animation End

    return (
        <View style={{ flex: 1 }}>
            <StatusBar animated translucent={true} backgroundColor="transparent" barStyle={'default'} />
            <Onboarding
                showSkip={false}
                showNext={false}
                bottomBarHighlight={false}
                DotComponent={dot}
                onDone={() => navigation.replace('Homee')}
                DoneButtonComponent={({ ...props }) => (
                    <TouchableOpacity activeOpacity={0.5} {...props}>
                        <Text style={{ fontSize: 17 }}>  Done    </Text>
                    </TouchableOpacity>
                )}
                pages={
                    [{
                        backgroundColor: "#004b5e",
                        image: <Animated.Image source={logo} style={{ resizeMode: "stretch", transform: [{ rotate: spin }] }} />,
                        title: 'React Native',
                        subtitle: 'This Calculator app is fully based on\nReact Native CLI',
                    }, {
                        backgroundColor: '#4336f4',
                        image: <Image source={Custom3} />,
                        title: 'Source Code',
                        subtitle: 'Complete source code is available in my Git repo',
                    }]
                }
            />
        </View>
    )
}

export default OnBordingScreen;