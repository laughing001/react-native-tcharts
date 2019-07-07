import React, { Component, PureComponent } from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Funnel from './elements/Funnel';
import {color} from '../theme/e_default';
export default class FunnelDemo extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let option10 = {
            title: '漏斗图',
            legend: {},
            color: [color[0], color[1], color[2], color[3]],
            series: [{
                name: '漏斗图',
                type: 'funnel',
                min: 0,
                max: 100, //设置漏斗的最小和最大值
                minSize: '0%', //漏斗的最小和最大尺寸
                maxSize: '80%',
                height: 200,
                gap: 3, //漏斗间隔
                funnelAlign: 'center', //对齐方式
                sort: 'descending',//漏斗顺序
                label: {
                    show: true, //
                    fontSize: 12,
                    color: '#fff'//用来显示标注字体样式的
                },
                data: [{
                    value: 20,
                    name: '一季度'
                }, {
                    value: 40,
                    name: '一季度'
                }, {
                    value: 60,
                    name: '二季度'
                }, {
                    value: 80,
                    name: '三季度'
                }]
            }]
        }
        let option11 = {
            title: '漏斗图',
            legend: {},
            color: [color[4], color[5], color[6], color[7]],
            series: [{
                name: '漏斗图',
                type: 'funnel',
                min: 0,
                max: 100, //设置漏斗的最小和最大值
                minSize: '10%', //漏斗的最小和最大尺寸
                maxSize: '80%',
                height: 200,
                gap: 3,
                funnelAlign: 'center', //对齐方式
                sort: 'ascending',//漏斗顺序
                label: {
                    show: true, //
                    fontSize: 12,
                    color: '#fff'//用来显示标注字体样式的
                },
                data: [{
                    value: 20,
                    name: '一季度'
                },{
                    value: 40,
                    name: '二季度'
                }, {
                    value: 60,
                    name: '三季度'
                }, {
                    value: 80,
                    name: '四季度'
                }]
            }]
        }
        return(
            <View style={{flex:1}}>
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(153, 255, 204, 0.2)'
                    }}
                    contentContainerStyle={{
                        marginVertical: 30,
                        flex: 1,
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}
                >
                    <Funnel height={300} option={option10}/>
                    <Funnel height={300} option={option11}/> 
                   
                </ScrollView>
            </View>
        )
    }
}