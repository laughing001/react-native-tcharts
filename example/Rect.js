import React, { Component} from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Rect from '../elements/Rect';
const option = {
    x: 2,
    y: 2,
    strokeWidth: 2,
    stroke: '#CCFF99',
    fill: '#FF9900',
    width: 100,
    height: 100
};
const option3 = {
    x: 2,
    y: 2,
    strokeWidth: 2,
    stroke: '#FF9900',
    fill: '#CCFF99',
    width: 200,
    height: 100
};
export default class RectDemo extends Component{
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
                    <Rect
                        option={option}
                        height={104}
                        width={104}
                    />
                    <Rect
                        option={option3}
                        height={110}
                        width={210}
                    />
                </ScrollView>
            </View>
        )
    }
}