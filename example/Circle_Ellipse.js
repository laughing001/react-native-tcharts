import React, { Component} from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Circle from '../elements/Circle';
import Ellipse from '../elements/Ellipse';
import {color} from '../theme/e_default';
let option = {
    r: 80,
    fill: color[3],
    strokeWidth: 0,
    stroke: '#66CCFF'
}
let option1 = {
    rx: 80,
    ry: 40,
    fill: color[4],
    strokeWidth: 0,
    stroke: '#66CCFF'
}
let option2 = {
    rx: 40,
    ry: 80,
    fill: color[5],
    strokeWidth: 0,
    stroke: '#66CCFF'
}
export default class CircleEllipseDemo extends Component{
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
                    <Ellipse
                        option={option2}
                        width={300}
                        height={165}
                    />
                    <Ellipse
                        option={option1}
                        width={300}
                    />
                    <Circle
                        option={option}
                        width={300}
                        height={170}
                    />
                </ScrollView>
            </View>
        )
    }
}