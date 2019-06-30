import React, { Component, PureComponent } from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Funnel from '../elements/Funnel';
export default class FunnelDemo extends Component{
    constructor(props){
        super(props)
    }
    render(){
        let option10 = {
            title: '漏斗图',
            legend: {},
            color: ['#fff000', '#eeaacc', '#ccaaef'],
            series: [{
                name: '漏斗图',
                type: 'funnel',
                left: '0%', // 绘图距离左边的距离
                min: 0,
                max: 100, //设置漏斗的最小和最大值
                minSize: '10%', //漏斗的最小和最大尺寸
                maxSize: '100%',
                height: 100,
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
                    value: 100,
                    name: '三季度'
                }]
            }]
        }
        let option11 = {
            title: '漏斗图',
            legend: {},
            color: ['#fff000', '#eeaacc', '#ccaaef', '#ccc'],
            series: [{
                name: '漏斗图',
                type: 'funnel',
                left: '0%', // 绘图距离左边的距离
                min: 0,
                max: 100, //设置漏斗的最小和最大值
                minSize: '10%', //漏斗的最小和最大尺寸
                maxSize: '100%',
                height: 100,
                gap: 0, //漏斗间隔
                funnelAlign: 'center', //对齐方式
                sort: 'ascending',//漏斗顺序
                label: {
                    show: true, //
                    fontSize: 12,
                    color: '#fff'//用来显示标注字体样式的
                },
                data: [{value: 20, name: '一季度'},{value: 40, name: '二季度'}, {value: 60, name: '三季度'}, {value: 100, name: '四季度'}]
            }]
        }
        return(
            <View style={{flex:1}}>
                <ScrollView
                    style={{
                        flex: 1,
                        backgroundColor: 'rgb(245, 252, 255)'
                    }}
                    contentContainerStyle={{
                        marginVertical: 30,
                        flex: 1,
                        justifyContent: 'space-evenly',
                        alignItems: 'center'
                    }}
                >
                    <Funnel width={120} height={120} option={option10}/>
                    <Funnel width={120} height={120} option={option11}/>
                </ScrollView>
            </View>
        )
    }
}