import React, { Component } from "react"
import {
    View,
    ART,
    Text,
    Dimensions
} from 'react-native'

const { Surface, Shape, Path} = ART;
const {width, height} = Dimensions.get('window');
import {color} from '../theme/theme';
const defaultOption = {
    xAxis: {
        lineStyle: {
            color: color[0]
        },
        textStyle: {
            color: color[0],
            font: 10
        },
        gridLine: {
            isShow: true,
            lineStyle: {
                color: color[1]
            }
        },
        min: 0,
        max: 100,
        interval: 20,
        data: [0,3,6,9,12,15]
    },
    yAxis: {
        lineStyle: {
            color: color[2]
        },
        textStyle: {
            color: color[2],
            font: 10
        },
        gridLine: {
            isShow: true,
            lineStyle: {
                color: color[3]
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
            color: color[4],
            opacity: 1
        }
    }]
};
export default class Scatter extends Component {
    constructor(props) {
        super(props)
        this.option = Object.assign(defaultOption, props.option || {});
        this.width = props.width || 300;
        this.height = props.height || 200;
        this.style = props.style || {};
        this.bottom = 5;
        this.left = 5;
        this.right = 5;
        this.top = 5;
        const series_item = this.option.series[0] || {};
        this.circleRadio = series_item.radius || 4
        this.circleFill = series_item.itemStyle.color || '#2aaba4'
        const {xAxis, yAxis} = this.option;
        this.xAxisPoints = xAxis.data || [];
        this.yAxisPoints = yAxis.data || [];

        this.xAxisItemWidth = Math.round((this.width - this.right - this.left) / (this.xAxisPoints.length - 1))
        this.yAxisItemHeight = Math.round((this.height - this.top - this.bottom) / (this.yAxisPoints.length - 1))

        this.pointX = []
        this.lineVertical = []
        for (let index = 0; index < this.xAxisPoints.length; index++) {
            const x = this.left + index * this.xAxisItemWidth
            const y = this.height - this.bottom
            this.pointX.push(new Path().moveTo(x, y + 1).lineTo(x, y + 4))
            if (index == 0) {
                continue
            }
            this.lineVertical.push(new Path().moveTo(x, y - 1).lineTo(x, this.top))
        }

        this.pointY = []
        this.lineHorizontal = []
        for (let index = 0; index < this.yAxisPoints.length; index++) {
            const x = this.left 
            const y = this.height - this.bottom - index * this.yAxisItemHeight
            this.pointY.push(new Path().moveTo(x-1, y).lineTo(x - 4, y))
            if (index == 0) {
                continue
            }
            this.lineHorizontal.push(new Path().moveTo(x + 1, y).lineTo(this.width - this.right, y))
        }


        this.xAxisLine = new Path()
            .moveTo(this.left, this.height - this.bottom)
            .lineTo(this.width - this.right, this.height - this.bottom + 1)
        
        this.yAxisLine = new Path()
            .moveTo(this.left, this.height - this.bottom)
            .lineTo(this.left, this.top - 2)

        this.circles = []
        
        const maxX = Math.max.apply(null, this.xAxisPoints) || 0
        const maxY = Math.max.apply(null, this.yAxisPoints) || 0
        // 计算散点圆形位置
        const series_data = series_item.data || [];
        for (let index = 0; index < series_data.length; index++) {
            const element =  series_data[index];
            const x = element[0] / maxX * (this.width - this.left - this.right) + this.left
            const y = this.height - this.bottom - element[1] / maxY * (this.height - this.bottom - this.top)
            this.circles.push(new Path()
                .moveTo(x, y - this.circleRadio)
                .arc(0, this.circleRadio * 2, 1)
                .arc(0, -this.circleRadio * 2, 1)
                .close()
            )
        }
    }
    render() {
        const option = this.option;
        const {xAxis, yAxis} = option;
        return (<View
            style={[{
                justifyContent: 'center',    
                alignItems: 'center',
                width: this.width,
                height: this.height
            }, this.props.style]}>
                <View style={{
                    height: this.height + 20,
                    width: this.width + 20
                }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent:'flex-start'
                    }}>
                        <View style={{
                            width:20,
                            flexDirection:'column'
                        }}>
                            {//y轴坐标刻度
                                this.yAxisPoints.reverse().map((item, index)=>{     
                                    return (<View
                                        key={index}
                                        style={{
                                            justifyContent: 'center', 
                                            alignItems:'center', 
                                            marginTop: (index == 0 ? (-this.yAxisItemHeight / 2 + 3) : 0),
                                            width:20,
                                            height: this.yAxisItemHeight
                                        }}>
                                        <Text style={{
                                            fontSize: yAxis.textStyle.fontSize,
                                            color: yAxis.textStyle.color
                                        }}>{item}</Text>
                                    </View>)
                                })
                            }
                        </View>
                        <Surface width={this.width} height={this.height}>
                            <Shape d={this.xAxisLine} stroke={xAxis.lineStyle.color} strokeWidth={1} />
                            <Shape d={this.yAxisLine} stroke={yAxis.lineStyle.color} strokeWidth={1} />
                            {
                                // x轴坐标刻度
                                this.pointX.map((item, index) => {
                                    return <Shape key={index} d={item} stroke={xAxis.lineStyle.color} strokeWidth={1} />
                                })
                            }
                            {
                                // 垂直分割线
                                this.lineVertical.map((item, index) => {
                                    return <Shape key={index} d={item} stroke={xAxis.gridLine.lineStyle.color} strokeWidth={1} />
                                })
                            }
                            {
                                // y轴坐标刻度
                                this.pointY.map((item, index) => {
                                    return <Shape key={index} d={item} stroke={yAxis.lineStyle.color} strokeWidth={1} />
                                })
                            }
                            {
                                // 水平分割线
                                this.lineHorizontal.map((item, index) => {
                                    return <Shape key={index} d={item} stroke={yAxis.gridLine.lineStyle.color} strokeWidth={1} />
                                })
                            }

                            {
                                // 散点圆形
                                this.circles.map((item, index) => {
                                    return <Shape key={index} d={item}  fill={this.circleFill} strokeWidth={0} />
                                })
                            }
                        </Surface>
                    </View>
                    <View style={{
                        marginTop:-10 ,
                        flex:1,
                        flexDirection:'row'
                    }}>
                        {// x轴坐标刻度
                            this.xAxisPoints.map((item, index)=>{     
                                return (
                                    <View
                                        key={index}
                                        style={{
                                            justifyContent: 'flex-start', 
                                            alignItems:'center', 
                                            marginLeft: (index == 0 ? (20-this.xAxisItemWidth / 2 + 5) : 0),
                                            width: this.xAxisItemWidth,
                                            height:20
                                        }}>
                                        <Text style={{
                                            fontSize: xAxis.textStyle.fontSize,
                                            color: xAxis.textStyle.color
                                        }}>{item}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
            </View>
        )
    }
}