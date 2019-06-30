import React, { Component} from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Scatter from '../elements/Scatter';
export default class ScatterDemo extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={{
                flex:1,
                backgroundColor: 'rgb(245, 252, 255)'
            }}>
                <ScrollView
                    contentContainerStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Scatter />
                </ScrollView>
            </View>
        )
    }
}