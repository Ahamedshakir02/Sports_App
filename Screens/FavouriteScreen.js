import react from 'react';
import { Text,View,StyleSheet, } from 'react-native-web';

const FavouriteScreen = () => {
    return(
        <View style={style.containor}>
            <Text style={styles.conatainortext}>Favourite Screen</Text>
        </View>
    )
};

const styles = StyleSheet.create ({
    containor: {
        flex:1,
        justifycontent:'center',
        alignitem:'center',
        backgroundcolor:'#ffff',
    },
    conatainortext: {
        fontsize:25,
    }
});
export default FavouriteScreen;