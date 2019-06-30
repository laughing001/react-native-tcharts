/*
 * @Author: jasonmiao 
 * @Date: 2019-04-09 16:45:09 
 * @Last Modified by: jasonmiao
 * @Last Modified time: 2019-04-24 15:32:25
 */
import React, { Component } from "react"
import {
    View,
    TouchableOpacity,
    ART,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'

const { Surface, Shape, Path, RadialGradient } = ART;
const {width} = Dimensions.get('window');

export default class Line extends Component {
    constructor(props) {
        super(props)

        this.bottomOffset = this.props.bottomOffset || 30
        this.leftOffset = this.props.leftOffset || 50
        this.rightOffset = this.props.rightOffset || 50
        this.topOffset = this.props.topOffset || 30
        this.surfaceWidth = this.props.width || width
        this.surfaceHeight = this.props.height || 250
        this.pointRadio = this.props.pointRadio || 3
        this.xAxisTextColor = this.props.xAxisTextColor || '#999'
        this.xAxisTextFont = this.props.xAxisTextFont || 10
        this.yAxisTextColor = this.props.yAxisTextColor || '#999'
        this.yAxisTextFont = this.props.yAxisTextFont || 10
        this.horizontalLineColor = this.props.horizontalLineColor || '#f2f4f4'
        this.trendLineColor = this.props.trendLineColor || '#2aaba4'
        this.anchorPointsColor = this.props.anchorPointsColor || '#2aaba4'
        this.tipsBackgroundColor = this.props.tipsBackgroundColor || '#2aaba4'
        this.tipsTextColor = this.props.tipsTextColor || '#ffffff'
        this.rectFillColor = this.props.rectFillColor || '#daf0ef60'
        this.xAxisSplitHidden = this.props.xAxisSplitHidden || false
        this.xAxisDescText = this.props.xAxisDescText || ''
        this.xAxisDescTextFont = this.props.xAxisDescTextFont || 10
        this.xAxisDescTextColor = this.props.xAxisDescTextColor || '#999'
        // console.log('----------', this.surfaceHeight)
        this.xAxisLine = new Path().moveTo(this.leftOffset, this.surfaceHeight - this.bottomOffset)
            .lineTo(this.surfaceWidth - this.rightOffset, this.surfaceHeight - this.bottomOffset)

        this.pointX = []
        this.lineH = []
        this.chartOffsetX = (width - this.surfaceWidth) / 2

        // this.data = {
        //     interval: 200,
        //     maxY: 7900,
        //     minY: 6900,
        //     yAxis: [7099, 6973, 6953, 6914, 7155, 7300, 6988, 7100, 7200, 7899],
        //     xAxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        // }
        this.data = this.props.data

        this.yAxis = []

        let dataY = this.data.minY
        while (dataY <= this.data.maxY) {
            this.yAxis.push(dataY)
            dataY = dataY + this.data.interval
        }


        this.circles = []
        this.tipsPoint = []
        this.anchorPoints = []

        const lineHCount =  Math.ceil((this.data.maxY - this.data.minY) / this.data.interval)

        this.itemWidth = (this.surfaceWidth - this.leftOffset - this.rightOffset) / this.data.xAxis.length
        this.itemHeight = (this.surfaceHeight - this.topOffset - this.bottomOffset) / lineHCount



        for (let index = 0; index < this.data.xAxis.length; index++) {
            const x = this.leftOffset + (index + 1) * this.itemWidth
            const y = this.surfaceHeight - this.bottomOffset
            this.pointX.push(new Path().moveTo(x, y).lineTo(x, y + 5))
        }

        for (let index = 0; index < lineHCount; index++) {
            const x = this.leftOffset
            const y = this.topOffset + index * this.itemHeight
            this.lineH.push(new Path().moveTo(x, y).lineTo(this.surfaceWidth - this.rightOffset, y))
        }

        const firstData = this.data.yAxis[0]
        const startX = this.leftOffset + this.itemWidth / 2
        this.trendline = new Path().moveTo(startX, this.caculateY(firstData))
        this.rectLine = new Path().moveTo(startX, this.caculateY(firstData))
        this.tipsPoint.push({ x: startX, y: this.caculateY(firstData) })
    
        this.anchorPoints.push(new Path().moveTo(startX, this.caculateY(firstData) - this.pointRadio).arc(0, this.pointRadio * 2, 1).arc(0, -this.pointRadio * 2, 1).close())

        if (this.data.yAxis.length > 1) {
            // 超过两条数据，填充封闭区域
            let x, y
            for (let index = 1; index < this.data.yAxis.length; index++) {
                const element = this.data.yAxis[index]
                x = startX + index * this.itemWidth
                y = this.caculateY(element)
                this.trendline.lineTo(x, y)
                this.rectLine.lineTo(x, y)
                this.anchorPoints.push(new Path().moveTo(x, y - this.pointRadio).arc(0, this.pointRadio * 2, 1).arc(0, -this.pointRadio * 2, 1).close())

                this.tipsPoint.push({ x: x, y: y })
            }

            this.rectLine.lineTo(x, this.surfaceHeight - this.bottomOffset - 1).lineTo(startX, this.surfaceHeight - this.bottomOffset - 1).close()
        }

    }

    state = {
        showTips: false,
        left: 0,
        top: 0,
    }

    onPress(event) {
        const index = Math.floor(event.nativeEvent.locationX / this.itemWidth)
        const point = this.tipsPoint[index]
        this.setState({
            showTips: true,
            tipsLeft: point.x - 20,
            tipsBottom: point.y,
            tipsValue: this.data.yAxis[index]
        })
    }


    caculateY(data) {
        return this.surfaceHeight - this.bottomOffset - ((data - this.data.minY) / (this.data.maxY - this.data.minY) * (this.surfaceHeight - this.topOffset - this.bottomOffset))
    }

    render() {
        const { showTips, tipsLeft, tipsBottom, tipsValue } = this.state
        return (<View
            style={[{
                // justifyContent: 'center',
                //     alignItems: 'center',
                width: '100%',
                // backgroundColor:'yellow'
            }, this.props.style]}>

            <Surface width={this.surfaceWidth} height={this.surfaceHeight}>
                <Shape d={this.xAxisLine} stroke={this.xAxisTextColor} strokeWidth={1} />
                {
                    this.xAxisSplitHidden ? null : this.pointX.map((item, index) => {
                        return <Shape key={index} d={item} stroke={this.xAxisTextColor} strokeWidth={1} />
                    })
                }
                {
                    this.lineH.map((item, index) => {
                        return <Shape key={index} d={item} stroke={this.horizontalLineColor} strokeWidth={1} />
                    })
                }

                <Shape d={this.rectLine} stroke="#000" fill={this.rectFillColor} strokeWidth={0} />
                {/* 封闭渐变区域，水平方向，效果不好 <Shape d={this.rectLine} stroke="red" fill={new RadialGradient({'0': '#000000','1': '#ffffff'},"150","150","300","300")}  strokeWidth={0} /> */}
                <Shape d={this.trendline} stroke={this.trendLineColor} strokeWidth={2} />
                {
                    this.anchorPoints.map((item, index) => {
                        return <Shape key={index} d={item} stroke={this.anchorPointsColor} fill="#ffffff" strokeWidth={2} />
                    })
                }
            </Surface>

            {
                this.data.xAxis.map((item, index) => {
                    return (<View key={index} style={{
                        justifyContent: 'center',
                        alignItems: 'center', position: 'absolute', top: this.surfaceHeight - this.bottomOffset, left: this.chartOffsetX + this.leftOffset + index * this.itemWidth, width: this.itemWidth, height: 20,
                    }}>
                        <Text style={{ color: this.xAxisTextColor, fontSize: this.xAxisTextFont }}>{item}</Text></View>)
                })
            }

            {
                this.xAxisDescText.length > 0 ? (<View style={{
                    flexDirection: "row",
                    alignItems: 'center', position: 'absolute', top: this.surfaceHeight - this.bottomOffset - 10, left: 5 + this.chartOffsetX + this.surfaceWidth - this.rightOffset, width: this.rightOffset, height: 20,
                }}>
                    <Text style={{ color: this.xAxisDescTextColor, fontSize: this.xAxisDescTextFont }}>{this.xAxisDescText}</Text></View>) : null
            }

            {
                this.yAxis.map((item, index) => {
                    return (<View key={index} style={{
                        flexDirection: "row", justifyContent: 'flex-end',
                        alignItems: 'center', position: 'absolute', top: this.surfaceHeight - this.bottomOffset - 10 - this.itemHeight * index, left: this.chartOffsetX + 5, width: this.leftOffset - 10, height: 20,
                    }}>
                        <Text style={{ color: this.yAxisTextColor, fontSize: this.yAxisTextFont }}>{item}</Text></View>)
                })
            }

            <TouchableOpacity onPress={(evt) => this.onPress(evt)}
                activeOpacity={1}
                style={{
                    position: 'absolute',
                    left: this.chartOffsetX + this.leftOffset,
                    top: this.topOffset,
                    width: this.surfaceWidth - this.leftOffset - this.rightOffset,
                    height: this.surfaceHeight - this.topOffset - this.bottomOffset,
                    // backgroundColor:'#00000060'
                }}></TouchableOpacity>
            {
                showTips ? (<View style={[styles.button, { left: this.chartOffsetX + tipsLeft, bottom: this.surfaceHeight - tipsBottom }]}>
                    <View style={{
                        width: 40, height: 20, backgroundColor: this.tipsBackgroundColor, justifyContent: 'center',
                        alignItems: 'center', borderRadius: 2
                    }}><Text style={{ color: this.tipsTextColor, fontSize: 12 }}>{tipsValue}</Text></View>
                    <View style={[styles.arrow, {borderTopColor:this.tipsBackgroundColor}]}></View></View>) : null
            }


        </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        height: 30,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrow: {
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: 6,
        // borderTopColor: 'black',//下箭头颜色
        borderLeftColor: '#00000000',//右箭头颜色
        borderBottomColor: '#00000000',//上箭头颜色
        borderRightColor: '#00000000'//左箭头颜色
    }
});
