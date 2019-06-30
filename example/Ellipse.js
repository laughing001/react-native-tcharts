import React, { Component} from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Ellipse from '../elements/Ellipse';
let option1 = {
    rx: 80,
    ry: 40,
    fill: '#FFFF66',
    strokeWidth: 2,
    stroke: '#FF0000'
}
let option2 = {
    rx: 40,
    ry: 80,
    fill: '#CC99FF',
    strokeWidth: 2,
    stroke: '#660000'
}
export default class EllipseDemo extends Component{
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
                        option={option1}
                        width={300}
                    />
                    <Ellipse
                        option={option2}
                        width={300}
                        height={165}
                    />
                </ScrollView>
            </View>
        )
    }
}