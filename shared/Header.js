import React from 'react';
import {StyleSheet, Image, SafeAreaView} from 'react-native';

const Header = () => {
    return(
            <SafeAreaView style = {styles.header}> 
                <Image 
                    source = {require('../assets/Logo.png')}  style={{width: 50, height: 50, }}/>
            </SafeAreaView>
        );

       
}

 
const styles = StyleSheet.create({
    header: {
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center', 
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        
    }
})
export default Header;