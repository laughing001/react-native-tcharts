import React, {Component} from 'react';
import {ScrollView, View, TouchableOpacity} from 'react-native';
import Radar from '../elements/Radar';
let option = {
	name: '',
	legend: {},
	r: 80,
	splitNumber: 4,
	shape: 'circle', //传polygon为多边形,不传默认是polygon
	startAngle: 120,
	rich: {//用来标志轴文案的样式
        a: {
            color: '#2dcbc3',
            fontSize: 12,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily: "PingFangSC-Medium",
            fontWeight: 'bold'
        },
        b: {
            color: '#f55353',
            fontSize: 12,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily: "PingFangSC-Medium",
            fontWeight: 'bold'
        },
        c: {
            color: "#999999",
            fontSize: 12,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily: "PingFangSC-Medium",
            fontWeight: 'bold'
        }
    },
	indicator: [{
		max: 100,
		min: 0,
		text: '{a:25}\n{c:助攻}'
	}, {
		max: 100,
		min: 0,
		text: '{a:53.7k}\n{c:金钱}'
	}, {
		max: 100,
		min: 0,
		text: '{a:30}\n{c:视野}'
	}, {
		max: 100,
		min: 0,
		text: '{a:6}\n{c:推塔}'
	}, {
		max: 100,
		min: 0,
		text: '{a:0}\n{c:大龙}'
	}, {
		max: 100,
		min: 0,
		text: '{a:0}\n{c:小龙}'
	}],
	axisLine: {//轴线 指示器线
		show: true,
		lineStyle: {
			color: 'rgb(208, 208, 208)',
			opacity: 0.5
		}
	},
	splitLine: {
		show: true,
		lineStyle: {
			color: 'rgb(213, 213, 213)',
			opacity: 1
		}
	},
	splitArea: {
		areaStyle: {}
	},
	series: [{
		data: [98, 78, 90, 70, 86, 60],
		itemStyle: {},
		lineStyle: {
			color: 'rgba(210, 246, 55)'
		},
		areaStyle: {
			color: 'rgba(210, 246, 55)',
			opacity: 0.5
		}
	}]
};
let option2 = {
	name: '',
	legend: {},
	r: 80,
	splitNumber: 4,
	shape: 'polygon', //传polygon为多边形,不传默认是polygon
	startAngle: 90,
	rich: {//用来标志轴文案的样式
        a: {
            color: '#2dcbc3',
            fontSize: 12,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily: "PingFangSC-Medium",
            fontWeight: 'bold'
        },
        b: {
            color: '#f55353',
            fontSize: 12,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily: "PingFangSC-Medium",
            fontWeight: 'bold'
        },
        c: {
            color: "#999999",
            fontSize: 12,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily: "PingFangSC-Medium",
            fontWeight: 'bold'
        }
    },
	indicator: [{
		max: 100,
		min: 0,
		text: '{a:25/}{b:27}\n{c:助攻}'
	}, {
		max: 100,
		min: 0,
		text: '{a:53.7k/}{b:49.5k}\n{c:金钱}'
	}, {
		max: 100,
		min: 0,
		text: '{a:30/}{b:70}\n{c:视野}'
	}, {
		max: 100,
		min: 0,
		text: '{a:6/}{b:0}\n{c:推塔}'
	}, {
		max: 100,
		min: 0,
		text: '{a:0/}{b:0}\n{c:大龙}'
	}, {
		max: 100,
		min: 0,
		text: '{a:0/}{b:0}\n{c:小龙}'
	}],
	axisLine: {//轴线 指示器线
		show: true,
		lineStyle: {
			color: 'rgb(208, 208, 208)',
			opacity: 0.5
		}
	},
	splitLine: {
		show: true,
		lineStyle: {
			color: 'rgb(213, 213, 213)',
			opacity: 1
		}
	},
	splitArea: {
		areaStyle: {}
	},
	series: [{
		data: [98, 78, 90, 70, 86, 60],
		itemStyle: {},
		lineStyle: {
			color: 'rgba(210, 246, 55)'
		},
		areaStyle: {
			color: 'rgba(210, 246, 55)',
			opacity: 0.5
		}
	},{
		data: [86, 30, 98, 78, 90, 70],
		itemStyle: {},
		lineStyle: {
			color: 'rgba(210, 246, 255)'
		},
		areaStyle: {
			color: 'rgba(210, 246, 255)',
			opacity: 0.5
		}
	}]
};
// let option1 = JSON.stringify(option);
// option1 = JSON.parse(option1);
// option1.shape = 'polygon';
export default class RadarDemo extends Component{
	constructor(props) {
		super(props);
		//option.series[0]['data'] = [].concat([20, 30, 50, 10, 88, 95]);
		let option1 = JSON.stringify(option);
		option1 = JSON.parse(option1);
		option1.shape = 'polygon';
		this.state = {
			option: option,
			option1: option1
		};
	}
	onPress = () => {
		// option.series[0]['data'] = [].concat([20, 30, 50, 10, 88, 95]);
		// let option1 = JSON.stringify(option);
		// option1 = JSON.parse(option1);
		option.shape = 'polygon';
		this.setState({
			option: option
		});
	}
  	render() {
  		let {option, option1} = this.state;
		return (<View style={{
            flex: 1,
            backgroundColor: 'rgb(245, 252, 255)'
		}}>
			<ScrollView
                contentContainerStyle={{
                    marginVertical: 30,
                    flex: 1,
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}
				style={{
					width: '100%',
					height: '100%'
				}}>
					<View style={{
						width: '100%',
						height: '100%',
						justifyContent: 'space-evenly'
					}}>
						<View style={{
							height: 200,
							width: '100%'
						}}>
							<Radar option={option} height={200} key={Date.now()} />
						</View>
						<View style={{
							height: 200,
							width: '100%'
						}}>
							<Radar option={option2} height={200} key={Date.now()} />
						</View>
					</View>
				</ScrollView>
		</View>)
  	}
}