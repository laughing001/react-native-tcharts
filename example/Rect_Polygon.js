import React, { Component} from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Rect from '../elements/Rect';
import Polygon from '../elements/Polygon';
const option = {
    x: 2,
    y: 2,
    strokeWidth: 2,
    stroke: '#FF9900',
    fill: '#CCFF99',
    width: 160,
    height: 100
};
const option1 = {
    radius: 70,
    startAngle: 0,
    lineNumber: 6,
    opacity: 1,
    fill: '#66FFCC',
    strokeWidth: 2,
    stroke: '#FF0099'
};
const option2 = {
    radius: 80,
    startAngle: 90,
    lineNumber: 7,
    opacity: 1,
    fill: 'CCFF99',
    strokeWidth: 2,
    stroke: '#FFCC00'
};
export default class RectPolygonDemo extends Component{
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
                        width={164}
                    />
                    <Polygon option={option1} height={144} />
    			    <Polygon option={option2} height={164} />
                </ScrollView>
            </View>
        )
    }
}