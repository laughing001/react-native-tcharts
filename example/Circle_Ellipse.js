import React, { Component} from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Circle from '../elements/Circle';
import Ellipse from '../elements/Ellipse';
let option = {
    r: 80,
    fill: '#FF99CC',
    strokeWidth: 2,
    stroke: '#66CCFF'
}
let option1 = {
    rx: 80,
    ry: 40,
    fill: '#FFFF66',
    strokeWidth: 2,
    stroke: '#66CCFF'
}
let option2 = {
    rx: 40,
    ry: 80,
    fill: '#CC99FF',
    strokeWidth: 2,
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
                backgroundColor: 'rgba(255, 255, 204, 0.5)'
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