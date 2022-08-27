import { ToastAndroid } from "react-native";

// simple copy paste this below code toast('enter youre message and use toast')
// put this code above you're return statment

function toast (msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
}

export default toast