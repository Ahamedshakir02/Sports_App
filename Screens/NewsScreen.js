import react from 'react';
import { View,Text,StyleSheet } from "react-native";

const NewsScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.containertext}>News Screen</Text>
        </View>
    );
};
 
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containertext: {
        fontSize: 30,

    },
});
export default NewsScreen;