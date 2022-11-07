import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'

export default OnBordingScreen = ({ navigation }) => {

    let dot = ({ selected }) => {
        return <View style={{ width: 15, height: 10, backgroundColor: selected ? '#ffffff' : '#00000070', marginHorizontal: 5, borderRadius: 400 }} />
    }

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
                        image: <Image source={require('../../assets/onBoarding/logo.png')} style={{ resizeMode: "stretch" }} />,
                        title: 'React Native',
                        subtitle: 'This Calculator app is fully based on\nReact Native CLI',
                    }, {
                        backgroundColor: '#7f79d1',
                        image: <Image source={require('../../assets/onBoarding/Custom3.png')} />,
                        title: 'Source Code',
                        subtitle: 'Complete source code is available in my Git repo',
                    }]
                }
            />
        </View>
    )
}