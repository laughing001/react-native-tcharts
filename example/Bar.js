import React, {Component} from 'react';
import {ScrollView, View} from 'react-native';
import Bar from '../elements/Bar';
export default class BarDemo extends Component {
  	render() {
	    const option = {
			name: '',
			legend: {},
            xAxis: {
                name: '',
                lineStyle: {//轴线相关配置
                    color: '#C0C0C0'
                },
                axisTick: {//刻度相关配置
                    show: true,
                    lineStyle: {
                        color: '#C0C0C0'
                    }
                },
                textStyle: {
                    color: '#999966'
                },
                min: 0,
                max: 100,
                interval: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                name: '',
                lineStyle: {
                    color: '#C0C0C0'
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#C0C0C0'
                    }
                },
                textStyle: {
                    color: '#999966'
                },
                gridLine: {
                    show: true,
                    lineStyle: {
                        color: '#C0C0C0'
                    }
                },
                min: 0,
                max: 100,
                interval: 20
            },
            series: [{
                data: [30, 75, 88, 60, 90, 50, 20],
                itemStyle: {
                    color: '#FF0099',
                    opacity: 0.5
                }
            }]
		};
        const option1 = {
            name: '',
            legend: {},
            xAxis: {
                name: '',
                lineStyle: {//轴线相关配置
                    color: '#C0C0C0'
                },
                axisTick: {//刻度相关配置
                    show: true,
                    lineStyle: {
                        color: '#C0C0C0'
                    }
                },
                textStyle: {
                    color: '#CC3366'
                },
                min: 0,
                max: 100,
                interval: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                name: '',
                lineStyle: {
                    color: '#C0C0C0'
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#C0C0C0'
                    }
                },
                textStyle: {
                    color: '#CC3366'
                },
                gridLine: {
                    show: true,
                    lineStyle: {
                        color: '#C0C0C0'
                    }
                },
                min: 0,
                max: 100,
                interval: 20
            },
            series: [{
                data: [30, 75, 88, 60, 90, 50, 20],
                itemStyle: {
                    color: '#99FF33',
                    opacity: 0.5
                }
            }, {
                data: [20, 50, 80, 80, 70, 10, 30],
                itemStyle: {
                    color: '#990033',
                    opacity: 0.5
                }
            }]
        };
        const option2 = {
            name: '',
            legend: {},
            xAxis: {
                name: '',
                lineStyle: {//轴线相关配置
                    color: '#C0C0C0'
                },
                axisTick: {//刻度相关配置
                    show: true,
                    lineStyle: {
                        color: '#C0C0C0'
                    }
                },
                textStyle: {
                    color: '#C0C0C0'
                },
                min: 0,
                max: 100,
                interval: 20,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                name: '',
                lineStyle: {
                    color: '#C0C0C0'
                },
                axisTick: {
                    show: true,
                    lineStyle: {
                        color: '#C0C0C0'
                    }
                },
                textStyle: {
                    color: '#C0C0C0'
                },
                gridLine: {
                    show: true,
                    lineStyle: {
                        color: '#C0C0C0'
                    }
                },
                min: 0,
                max: 100,
                interval: 20
            },
            series: [{
                data: [30, 75, 88, 60, 90, 50, 20],
                itemStyle: {
                    color: '#FF0099',
                    opacity: 0.5
                }
            }, {
                data: [20, 50, 80, 80, 70, 10, 30],
                itemStyle: {
                    color: '#99FF33',
                    opacity: 0.5
                }
            }, {
                data: [30, 75, 88, 60, 90, 50, 20],
                itemStyle: {
                    color: '#990033',
                    opacity: 0.5
                } 
            }]
        };
    	return (<ScrollView
    		style={{
                flex: 1,
                backgroundColor: 'rgba(153, 255, 204, 0.2)'
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