import React, { Component, PureComponent } from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Pie from '../elements/Pie';
export default class PieDemo extends Component{
    constructor(props){
        super(props)
    }
    render(){
       let option = {
            title: {},
            legend: {},
            color: ['#abcdef', '#ff00ff'], //饼图颜色
            series:[{
                name: '',
                type: 'pie',
                radius: [40,80], //饼图半径暂支持数字
                data: [10,20], //饼图占用数据
            }]
        }
        let option1 = {
            title: {},
            legend: {},
            color: ['#8A2BE2', '#D2691E', '#6495ED', '#008B8B'],
            series:[{
                name: '',
                type: 'pie',
                radius: [0,80], //饼图半径暂支持数字
                data: [{value: 30, name: 'test1'}, {value: 20, name:'test2'},{value: 20, name:'test3'}], //饼图占用数据
            }]
        }
        let option2 = {
            title: {},
            legend: {},
            color: ['#8A2BE2', '#D2691E', '#6495ED', '#008B8B'], //饼图颜色
            series:[{
                name: '',
                type: 'pie',
                radius: [60,80], //饼图半径暂支持数字
                data: [10,20, 40, 50], //饼图占用数据
            },{
                name: '',
                type: 'pie',
                radius: [20,40], //饼图半径暂支持数字
                data: [10,20], //饼图占用数据
            }]
        }
        return(
            <View style={{
                flex:1,
                backgroundColor: 'rgb(245, 252, 255)'
            }}>
                <ScrollView contentContainerStyle={{
                    marginVertical: 30,
                    flex: 1,
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    <Pie
                        option={option}
                        height={160}
                        width={200}
                    />
                    <Pie
                        option={option1}
                        height={160}
                        width={200}
                    />
                    <Pie
                        option={option2}
                        height={160}
                        width={200}
                    />
                </ScrollView>
            </View>
        )
    }
}