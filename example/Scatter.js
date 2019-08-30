import React, { Component} from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Scatter from '../elements/Scatter';
import {color} from '../theme/theme';
const option = {
    xAxis: {
        lineStyle: {
            color: color[10]
        },
        textStyle: {
            color: color[10],
            font: 10
        },
        gridLine: {
            isShow: true,
            lineStyle: {
                color: color[10]
            }
        },
        min: 0,
        max: 100,
        interval: 20,
        data: [0,3,6,9,12,15]
    },
    yAxis: {
        lineStyle: {
            color: color[10]
        },
        textStyle: {
            color: color[10],
            font: 10
        },
        gridLine: {
            isShow: true,
            lineStyle: {
                color: color[10]
            }
        },
        min: 0,
        max: 100,
        interval: 20,
        data: [0,2,4,6,8,10,12]
    },
    series: [{
        data: [
            [10.0, 8.04],
            [8.0, 6.95],
            [13.0, 7.58],
            [9.0, 8.81],
            [11.0, 8.33],
            [14.0, 9.96],
            [6.0, 7.24],
            [4.0, 4.26],
            [12.0, 10.84],
            [7.0, 4.82],
            [5.0, 5.68]
        ],
        radius: 4,
        itemStyle: {
            color: color[0],
            opacity: 1
        }
    }]
};
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
                    <Scatter
                        option={option}
                    />
                </ScrollView>
            </View>
        )
    }
}