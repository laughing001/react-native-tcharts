import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import Polygon from '../elements/Polygon';
const option = {
    radius: 60,
    startAngle: 90,
    lineNumber: 5,
    opacity: 1,
    fill: 'rgb(245, 252, 255)',
    strokeWidth: 2,
    stroke: '#FF0000'
};
const option1 = {
    radius: 70,
    startAngle: 0,
    lineNumber: 6,
    opacity: 1,
    fill: '#99CCFF',
    strokeWidth: 2,
    stroke: '#FF0000'
};
const option2 = {
    radius: 80,
    startAngle: 90,
    lineNumber: 7,
    opacity: 1,
    fill: '#FF99CC',
    strokeWidth: 2,
    stroke: '#FFCC00'
};
export default class PolygonDemo extends Component {
  	render() {
    	return (<ScrollView
    		style={{
    			flex: 1
    		}}
    		contentContainerStyle={{
                marginVertical: 30,
                flex: 1,
                justifyContent: 'space-evenly',
                alignItems: 'center'
    		}}>
    			<Polygon option={option1} height={144} />
    			<Polygon option={option2} height={164} />
    		</ScrollView>);
  	}
}