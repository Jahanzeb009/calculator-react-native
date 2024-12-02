import React, { useContext, useEffect, useState } from 'react'
import { Linking, StatusBar, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native'
import { Dialog, IconButton, TouchableRipple } from 'react-native-paper'
import { useNavigation, useTheme } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ColorPicker, { Preview, Panel3, BrightnessSlider } from 'reanimated-color-picker';
import { AuthContext } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context'

export default Setting = () => {

  const { setColorChange, SetCornerRadius } = useContext(AuthContext)

  const { colors, dark } = useTheme()
  const { navigate } = useNavigation()

  const [visible, setVisible] = useState(false)
  const [showCornerRadius, setShowCornerRadius] = useState(false)
  const [corner, setCorner] = useState(10)
  const styles = StyleSheet.create({
    title: {
      marginVertical: 30,
      paddingHorizontal: 15,
      color: colors.mainText,
      fontFamily: 'sourceCodePro',
      fontSize: 30,
    },
    cardViewColorSelector: {
      padding: 10,
      marginTop: 10,
      borderRadius: 25,
      paddingVertical: 30,
      flexDirection: 'row',
      alignItems: "center",
      paddingHorizontal: 15,
      backgroundColor: colors.card,
      justifyContent: 'space-between',
    },
    cardViewText: {
      color: colors.mainText,
      fontSize: 16,
      fontFamily: 'sourceCodePro',
    },
    cardViewSmallColorBox: {
      width: 25,
      height: 25,
      borderRadius: 300,
      backgroundColor: colors.primary,
    },
    deviceInfoText: {
      textAlign: 'center',
      color: colors.mainText,
      fontFamily: 'sourceCodePro'
    },
    dialogColorSelect: {
      borderRadius: 1000,
      width: 48,
      height: 48,
      elevation: 5,
      shadowColor: 'black',
    }
  })

  useEffect(() => {

    (async () => {
      await AsyncStorage.getItem('cornerRadius').then((val) => {
        if (val) {
          setCorner(parseInt(val))
        }
      })
    })()
  }, [showCornerRadius])

  let ColorSwatch = color => <TouchableOpacity onPress={async () => {
    setVisible(false)
    setColorChange(Math.random() + 1)
    await AsyncStorage.setItem('userColor', color)
  }}
    style={[styles.dialogColorSelect, { backgroundColor: color }]}
  />


  return (
    <SafeAreaView edges={['top']} style={{ flex: 1 }}>
      <StatusBar animated translucent barStyle={dark ? 'light-content' : 'dark-content'} backgroundColor="transparent" />

      <View style={{ flex: 3, marginTop: StatusBar.currentHeight, marginHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <IconButton icon={'arrow-left'} iconColor={colors.mainText} size={32} style={{ backgroundColor: colors.card, borderRadius: 15 }} onPress={() => { navigate('Home'), Vibration.vibrate(50) }} />
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* cardView Start */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setVisible(true)}
          style={styles.cardViewColorSelector}>
          <Text style={styles.cardViewText}>Theme Color</Text>
          <View style={styles.cardViewSmallColorBox} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setShowCornerRadius(true)}
          style={styles.cardViewColorSelector}>
          <Text style={styles.cardViewText}>Button Corner Radius</Text>
        </TouchableOpacity>

        {/* cardView End */}

      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        {/* deviceInfo area start */}

        <View>
          <Text style={styles.deviceInfoText}>Calculator{"\n"}v 1.3</Text>
        </View>

        {/* deviceInfo area end */}

        {/* Developer Intro/ links start */}

        <View style={{ flexDirection: 'row' }}>
          <IconButton icon={'facebook'} iconColor={'#4267B2'} size={32} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("https://www.facebook.com/mjahan.zeb.33") }} />
          <IconButton icon={'email'} iconColor={"#c71610"} size={32} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("mailto:jahanzebsupp@gmail.com") }} />
          <IconButton icon={'send'} iconColor={'#00acee'} size={32} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("https://t.me/jahanzeb009") }} />
          <IconButton icon={'github'} iconColor={'#808080'} size={32} mode="contained-tonal" style={{ backgroundColor: colors.card }} onPress={() => { Linking.openURL("https://github.com/Jahanzeb009/calculator-react-native.git") }} />
        </View>

        {/* Developer Intro/ links end */}

      </View>

      {/* Dialog Start */}

      {/* Radius Dialog */}

      <Dialog theme={{ colors: { backdrop: colors.background + 'e9' }, roundness: 30 }} visible={showCornerRadius} onDismiss={() => setShowCornerRadius(false)} style={{ backgroundColor: colors.card, paddingVertical: 10, borderRadius: 30 }}>
        <Dialog.Title style={{ color: colors.mainText }}>Select Button Radius</Dialog.Title>
        <Dialog.Content>

          <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>

            <TouchableRipple borderless rippleColor={colors.background} onPress={async () => { setShowCornerRadius(false), await AsyncStorage.setItem('cornerRadius', "40"), SetCornerRadius(40) }} style={{ backgroundColor: corner === 40 ? colors.primary : colors.border + 99, borderRadius: 40, padding: 10, justifyContent: 'center', alignItems: 'center' }} >
              <Text style={{ color: colors.mainText }}>Circle</Text>
            </TouchableRipple>

            <TouchableRipple borderless rippleColor={colors.background} onPress={async () => { setShowCornerRadius(false), await AsyncStorage.setItem('cornerRadius', "10"), SetCornerRadius(10) }} style={{ backgroundColor: corner === 10 ? colors.primary : colors.border + 99, borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }} >
              <Text style={{ color: colors.mainText }}>Rounded Rectangle</Text>
            </TouchableRipple>

            <TouchableRipple borderless rippleColor={colors.background} onPress={async () => { setShowCornerRadius(false), await AsyncStorage.setItem('cornerRadius', "1"), SetCornerRadius(1) }} style={{ backgroundColor: corner === 1 ? colors.primary : colors.border + 99, borderRadius: 1, padding: 10, justifyContent: 'center', alignItems: 'center' }} >
              <Text style={{ color: colors.mainText }}>Rectangle</Text>
            </TouchableRipple>

          </View>

        </Dialog.Content>
      </Dialog>

      {/* color dialog */}

      <Dialog theme={{ colors: { backdrop: colors.background + 'e9' }, roundness: 30 }} visible={visible} onDismiss={() => setVisible(false)} style={{ backgroundColor: colors.card, paddingVertical: 10, borderRadius: 30 }}>
        <Dialog.Title style={{ color: colors.mainText }}>Select Primary Color</Dialog.Title>
        <Dialog.Content>

          <View style={{ flexDirection: 'row', borderWidth: 1, padding: 10, borderColor: colors.border, borderRadius: 10, marginVertical: 10 }}>

            <ColorPicker style={{ flex:1 }} value={colors.primary}
              onComplete={async (e) => {
                setColorChange(Math.random() + 1), await AsyncStorage.setItem('userColor', e.hex.toString())
                setVisible(false)
              }}>
              <Preview />
              <View style={{ marginVertical: 5 }} />
              <Panel3 />
              <View style={{ marginVertical: 5 }} />
              <BrightnessSlider thumbShape='circle' />
            </ColorPicker>

          </View>

          {/* userColor Selection panel Start */}

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

            {ColorSwatch("#4336f4")}
            {ColorSwatch("#f44336")}
            {ColorSwatch("#795548")}
            {ColorSwatch("#009688")}

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>

            {ColorSwatch("#cddc39")}
            {ColorSwatch("#ff9800")}
            {ColorSwatch("#8a4af3")}
            {ColorSwatch("#00bcd4")}

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>

            {ColorSwatch("#919151")}
            {ColorSwatch("#FF81D0")}
            {ColorSwatch("#FFEC5C")}
            {ColorSwatch("#44803F")}

          </View>

          {/* userColor Selection panel End */}

        </Dialog.Content>
      </Dialog>

      {/* Dialog End */}

    </SafeAreaView>
  )
}