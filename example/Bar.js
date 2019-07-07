import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import Bar from './elements/Bar';
import {color} from '../theme/e_default';
export default class BarDemo extends Component {
  	render() {
	    const option = {
			name: '',
			legend: {},
            xAxis: {
                name: '',
                lineStyle: {//轴线相关配置
                    color: color[10]
                },
                axisTick: {//刻度相关配置
                    show: true,
                    lineStyle: {
                        color: color[10]
                    }
                },
                textStyle: {
                    color: color[10]
                },
                min: 0,
                max: 100,
                interval: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                name: '',
                lineStyle: {
                    color: color[10]
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: color[10]
                    }
                },
                textStyle: {
                    color: color[10]
                },
                gridLine: {
                    show: true,
                    lineStyle: {
                        color: color[10]
                    }
                },
                min: 0,
                max: 100,
                interval: 20
            },
            series: [{
                data: [30, 75, 88, 60, 90, 50, 20],
                itemStyle: {
                    color: color[5],
                    opacity: 1
                }
            }]
		};
        const option1 = {
            name: '',
            legend: {},
            xAxis: {
                name: '',
                lineStyle: {//轴线相关配置
                    color: color[10]
                },
                axisTick: {//刻度相关配置
                    show: true,
                    lineStyle: {
                        color: color[10]
                    }
                },
                textStyle: {
                    color: color[10]
                },
                min: 0,
                max: 100,
                interval: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                name: '',
                lineStyle: {
                    color: color[10]
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: color[10]
                    }
                },
                textStyle: {
                    color: color[10]
                },
                gridLine: {
                    show: true,
                    lineStyle: {
                        color: color[10]
                    }
                },
                min: 0,
                max: 100,
                interval: 20
            },
            series: [{
                data: [30, 75, 88, 60, 90, 50, 20],
                itemStyle: {
                    color: color[6],
                    opacity: 1
                }
            }, {
                data: [20, 50, 80, 80, 70, 10, 30],
                itemStyle: {
                    color: color[7],
                    opacity: 1
                }
            }]
        };
        const option2 = {
            name: '',
            legend: {},
            xAxis: {
                name: '',
                lineStyle: {//轴线相关配置
                    color: color[10]
                },
                axisTick: {//刻度相关配置
                    show: true,
                    lineStyle: {
                        color: color[10]
                    }
                },
                textStyle: {
                    color: color[10]
                },
                min: 0,
                max: 100,
                interval: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                name: '',
                lineStyle: {
                    color: color[10]
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: color[10]
                    }
                },
                textStyle: {
                    color: color[10]
                },
                gridLine: {
                    show: true,
                    lineStyle: {
                        color: color[10]
                    }
                },
                min: 0,
                max: 100,
                interval: 20
            },
            series: [{
                data: [30, 75, 88, 60, 90, 50, 20],
                itemStyle: {
                    color: color[8]
                }
            }, {
                data: [20, 50, 80, 80, 70, 10, 30],
                itemStyle: {
                    color: color[9]
                }
            }, {
                data: [30, 75, 88, 60, 90, 50, 20],
                itemStyle: {
                    color: color[10]
                } 
            }]
        };
    	return (<ScrollView
    		style={{
                flex: 1,
                backgroundColor: 'rgb(245, 252, 255)'
    		}}
    		contentContainerStyle={{
                marginVertical: 30,
                flex: 1,
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}>
    			<Bar option={option} />
                <Bar option={option1} height={200} />
                <Bar option={option2} height={200} />
    		</ScrollView>);
  	}
}