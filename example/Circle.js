import React, { Component} from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Circle from '../elements/Circle';
let option1 = {
    r: 80,
    fill: 'rgb(245, 252, 255)',
    strokeWidth: 2,
    stroke: '#FF0033'
}
let option2 = {
    r: 80,
    fill: '#FFFF00',
    strokeWidth: 2,
    stroke: '#66CCFF'
}
export default class CircleDemo extends Component{
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
                        marginVertical: 30,
                        flex: 1,
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}
                >
                    <Circle
                        option={option1}
                        width={300}
                        height={170}
                    />
                    <Circle
                        option={option2}
                        width={300}
                        height={170}
                    />
                </ScrollView>
            </View>
        )
    }
}