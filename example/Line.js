import React, { Component} from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import {color} from '../theme/theme';
import Line from '../elements/Line';
const option = {
    xAxis: {
        name: 'test',
        nameStyle: {
            color: color[3],
            fontSize: 12
        },
        lineStyle: {
            color: color[10]
        },
        textStyle: {
            color: color[10],
            fontSize: 12
        },
        gridLine: {
            lineStyle: {
                color: color[10]
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: color[10]
            }
        },
        min: 0,
        max: 100,
        interval: 20,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    yAxis: {
        name: '',
        nameStyle: {
            color: color[3],
            fontSize: 12
        },
        lineStyle: {
            color: color[10]
        },
        textStyle: {
            color: color[10],
            fontSize: 12
        },
        gridLine: {
            lineStyle: {
                color: color[10]
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: color[3]
            }
        },
        interval: 200,
        min: 6900,
        max: 7900,
        data: []
    },
    series: [{
        data: [7099, 6973, 6953, 6914, 7155, 7300, 6988, 7100, 7200, 7899],
        pointer: {
            itemStyle: {
                color: color[4],
                fill: '#fff'
            },
            radius: 3
        },
        tip: {
            itemStyle: {
                backgroundColor: color[4],
                color: color[6],
                fontSize: 12
            }
        },
        lineStyle: {
            color: color[4],
            fill: color[7]
        }
    }]
}
export default class LineDemo extends Component{
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
                    <Line
                        option={option}
                    />
                </ScrollView>
            </View>
        )
    }
}