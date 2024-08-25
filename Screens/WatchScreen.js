import react from 'react';
import {View,Text,StyleSheet} from 'react-native';

const WatchScreen = () => {
    return (
        <View style = {styles.containor}>
            <Text style = {styles.containortext}>Watch Screen</Text>
        </View>
    )
};

const styles = StyleSheet.create ({
    containor:{
        flex:1,
        alignitem:'center',
        justifycontent:'center',
        backgroundcolor:'#ffff',
    },
    containortext:{
        fontsize:25,

    },
});
export default WatchScreen;
