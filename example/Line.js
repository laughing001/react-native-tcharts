import React, { Component} from "react";
import { View, StyleSheet, ScrollView, Animated, Text, TouchableOpacity} from "react-native";
import Line from '../elements/Line';
const data = {"interval":300,"maxY":127600,"minY":126400,"yAxis":[126542,126488,126912,127079,127150,127220,127220],"xAxis":["6.24","6.25","6.26","6.27","6.28","6.29","6.30"]};
export default class LineDemo extends Component{
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
                    <Line
                        leftOffset={60}
                        rightOffset={60}
                        height={160}
                        xAxisSplitHidden={true}
                        data={data}
                        xAxisDescText={'日期'}
                    />
                </ScrollView>
            </View>
        )
    }
}