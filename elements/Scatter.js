import React, { Component } from "react"
import {
    View,
    TouchableOpacity,
    ART,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'

const { Surface,   Group,  Shape, Path, RadialGradient } = ART;
const {width} = Dimensions.get('window');


const option = {
    xAxis: {},
    yAxis: {},
    series: [{
        symbolSize: 20,
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
    }]
};

export default class Scatter extends Component {
    constructor(props) {
        super(props)


        this.bottomOffset = this.props.bottomOffset || 5
        this.leftOffset = this.props.leftOffset || 5
        this.rightOffset = this.props.rightOffset || 5
        this.topOffset = this.props.topOffset || 5
        this.surfaceWidth = this.props.width || 200
        this.surfaceHeight = this.props.height || 200
        this.xAxisTextColor = this.props.xAxisTextColor || '#999'
        this.xAxisTextFont = this.props.xAxisTextFont || 10
        this.yAxisTextColor = this.props.yAxisTextColor || '#999'
        this.yAxisTextFont = this.props.yAxisTextFont || 10
        this.horizontalLineColor = this.props.horizontalLineColor || '#f2f4f4'
        this.verticalLineColor = this.props.verticalLineColor || '#f2f4f4'
        this.circleRadio = this.props.circleRadio || 4
        this.circleFill = this.props.circleFill || '#2aaba4'

        this.xAxisPoints = [0,3,6,9,12,15]
        this.yAxisPoints = [0,2,4,6,8,10,12]
        this.xInternal = 3
        this.yInternal = 2

        this.xAxisItemWidth = Math.round((this.surfaceWidth - this.rightOffset - this.leftOffset) / (this.xAxisPoints.length - 1))
        this.yAxisItemHeight = Math.round((this.surfaceHeight - this.topOffset - this.bottomOffset) / (this.yAxisPoints.length - 1))

        this.pointX = []
        this.lineVertical = []
        for (let index = 0; index < this.xAxisPoints.length; index++) {
            const x = this.leftOffset + index * this.xAxisItemWidth
            const y = this.surfaceHeight - this.bottomOffset
            this.pointX.push(new Path().moveTo(x, y + 1).lineTo(x, y + 4))
            if (index == 0) {
                continue
            }
            this.lineVertical.push(new Path().moveTo(x, y - 1).lineTo(x, this.topOffset))
        }

        this.pointY = []
        this.lineHorizontal = []
        for (let index = 0; index < this.yAxisPoints.length; index++) {
            const x = this.leftOffset 
            const y = this.surfaceHeight - this.bottomOffset - index * this.yAxisItemHeight
            this.pointY.push(new Path().moveTo(x-1, y).lineTo(x - 4, y))
            if (index == 0) {
                continue
            }
            this.lineHorizontal.push(new Path().moveTo(x + 1, y).lineTo(this.surfaceWidth - this.rightOffset, y))
        }


        this.xAxisLine = new Path().moveTo(this.leftOffset, this.surfaceHeight - this.bottomOffset)
            .lineTo(this.surfaceWidth - this.rightOffset, this.surfaceHeight - this.bottomOffset + 1)
        
        this.yAxisLine = new Path().moveTo(this.leftOffset, this.surfaceHeight - this.bottomOffset)
            .lineTo(this.leftOffset, this.topOffset - 2)

        this.circles = []
        
        const maxX = Math.max.apply(null, this.xAxisPoints) || 0
        const maxY = Math.max.apply(null, this.yAxisPoints) || 0

        // 计算散点圆形位置
        for (let index = 0; index < option.series[0].data.length; index++) {
            const element =  option.series[0].data[index];
            const x = element[0] / maxX * (this.surfaceWidth - this.leftOffset - this.rightOffset) + this.leftOffset
            const y = this.surfaceHeight - this.bottomOffset - element[1] / maxY * (this.surfaceHeight - this.bottomOffset - this.topOffset)
            this.circles.push(new Path().moveTo(x, y - this.circleRadio).arc(0, this.circleRadio * 2, 1).arc(0, -this.circleRadio * 2, 1).close())
        }
        
       
    }

    render() {
        return (<View
            style={[{             
                justifyContent: 'center',    
                    alignItems: 'center',
                marginTop:100,
                // width:300,
                // height:300,
                // backgroundColor:'yellow'
            }, this.props.style]}>
                <View style={{height:this.surfaceHeight + 20,width:this.surfaceWidth + 20}}>
                    <View style={{flexDirection: "row", justifyContent:'flex-start'}}>
                        <View style={{width:20,flexDirection:'column'}}>
                            {//y轴坐标刻度
                                this.yAxisPoints.reverse().map((item, index)=>{     
                                    return (
                                        <View key={index} style={{justifyContent: 'center', 
                                        alignItems:'center', 
                                        marginTop: (index == 0 ? (-this.yAxisItemHeight / 2 + 3) : 0),
                                        width:20,height:this.yAxisItemHeight}}>
                                            <Text style={{fontSize:this.yAxisTextFont,color:this.yAxisTextColor}}>{item}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        <Surface width={this.surfaceWidth} height={this.surfaceHeight}>
                            <Shape d={this.xAxisLine} stroke={this.xAxisTextColor} strokeWidth={1} />
                            <Shape d={this.yAxisLine} stroke={this.yAxisTextColor} strokeWidth={1} />
                            {
                                // x轴坐标刻度
                                this.pointX.map((item, index) => {
                                    return <Shape key={index} d={item} stroke={this.xAxisTextColor} strokeWidth={1} />
                                })
                            }
                            {
                                // 垂直分割线
                                this.lineVertical.map((item, index) => {
                                    return <Shape key={index} d={item} stroke={this.verticalLineColor} strokeWidth={1} />
                                })
                            }
                            {
                                // y轴坐标刻度
                                this.pointY.map((item, index) => {
                                    return <Shape key={index} d={item} stroke={this.yAxisTextColor} strokeWidth={1} />
                                })
                            }
                            {
                                // 水平分割线
                                this.lineHorizontal.map((item, index) => {
                                    return <Shape key={index} d={item} stroke={this.horizontalLineColor} strokeWidth={1} />
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
                    <View style={{marginTop:-10 , flex:1, flexDirection:'row'}}>
                        {// x轴坐标刻度
                            this.xAxisPoints.map((item, index)=>{     
                                return (
                                    <View key={index} style={{justifyContent: 'flex-start', 
                                    alignItems:'center', 
                                    marginLeft: (index == 0 ? (20-this.xAxisItemWidth / 2 + 5) : 0),
                                    width:this.xAxisItemWidth,height:20}}>
                                        <Text style={{fontSize:this.xAxisTextFont,color:this.xAxisTextColor}}>{item}</Text>
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