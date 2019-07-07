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
import {color} from '../theme/e_default';
const defaultOption = {
    xAxis: {
        name: 'test',
        nameStyle: {
            color: color[0],
            fontSize: 12
        },
        lineStyle: {
            color: color[1]
        },
        textStyle: {
            color: color[2],
            fontSize: 12
        },
        gridLine: {
            lineStyle: {
                color: color[3]
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: color[4]
            }
        },
        min: 0,
        max: 100,
        interval: 20,
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    yAxis: {
        name: '',
        nameStyle: {
            color: color[0],
            fontSize: 12
        },
        lineStyle: {
            color: color[1]
        },
        textStyle: {
            color: color[2],
            fontSize: 12
        },
        gridLine: {
            lineStyle: {
                color: color[3]
            }
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: color[4]
            }
        },
        interval: 200,
        min: 6900,
        max: 7900,
        data: []
    },
    series: [{
        data: [7099, 6973, 6953, 6914, 7155, 7300, 6988, 7100, 7200, 7899],
        pointer: {
            itemStyle: {
                color: color[6],
                fill: '#fff'
            },
            radius: 3
        },
        tip: {
            itemStyle: {
                backgroundColor: color[7],
                color: color[10],
                fontSize: 12
            }
        },
        lineStyle: {
            color: color[8],
            fill: color[9]
        }
    }]
}
export default class Line extends Component {
    constructor(props) {
        super(props)
        this.option = Object.assign(defaultOption, props.option || {});
        const series_item = this.option.series[0];
        const xAxis = this.option.xAxis,
            yAxis = this.option.yAxis;
        this.bottom = 30;
        this.left = 50;
        this.right = 20;
        this.top = 30;

        this.width = props.width || width;
        this.height = props.height || 250;
        this.pointer_radius = series_item.pointer && series_item.pointer.radius || 3;
        this.xAxisLine = new Path()
            .moveTo(this.left, this.height - this.bottom)
            .lineTo(this.width - this.right, this.height - this.bottom)

        this.pointX = []
        this.lineH = []
        this.chartOffsetX = (width - this.width) / 2

        // this.data = {
        //     interval: 200,
        //     maxY: 7900,
        //     minY: 6900,
        //     yAxis: [7099, 6973, 6953, 6914, 7155, 7300, 6988, 7100, 7200, 7899],
        //     xAxis: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        // }
        this.data = this.props.data

        const yAxis_text_list = []

        let min_y = yAxis.min,
            max_y = yAxis.max,
            interval_y = yAxis.interval;
        let current_y = min_y;
        while (current_y <= max_y) {
            yAxis_text_list.push(current_y)
            current_y = current_y + interval_y;
        }
        yAxis.data = yAxis_text_list;

        this.circles = []
        this.tipsPoint = []
        this.anchorPoints = []

        const lineHCount =  Math.ceil((max_y - min_y) / interval_y);

        this.itemWidth = (this.width - this.left - this.right) / xAxis.data.length;
        this.itemHeight = (this.height - this.top - this.bottom) / lineHCount;
        for (let index = 0; index < xAxis.data.length; index++) {
            const x = this.left + (index + 1) * this.itemWidth
            const y = this.height - this.bottom
            this.pointX.push(new Path().moveTo(x, y).lineTo(x, y + 5))
        }

        for (let index = 0; index < lineHCount; index++) {
            const x = this.left
            const y = this.top + index * this.itemHeight
            this.lineH.push(new Path().moveTo(x, y).lineTo(this.width - this.right, y))
        }

        const firstData = series_item.data[0]
        const startX = this.left + this.itemWidth / 2
        this.trendline = new Path().moveTo(startX, this.caculateY(firstData))
        this.rectLine = new Path().moveTo(startX, this.caculateY(firstData))
        this.tipsPoint.push({ x: startX, y: this.caculateY(firstData) })
    
        this.anchorPoints.push(new Path().moveTo(startX, this.caculateY(firstData) - this.pointer_radius).arc(0, this.pointer_radius * 2, 1).arc(0, -this.pointer_radius * 2, 1).close())

        if (series_item.data.length > 1) {
            // 超过两条数据，填充封闭区域
            let x, y
            for (let index = 1; index < series_item.data.length; index++) {
                const element = series_item.data[index]
                x = startX + index * this.itemWidth
                y = this.caculateY(element)
                this.trendline.lineTo(x, y)
                this.rectLine.lineTo(x, y)
                this.anchorPoints.push(new Path().moveTo(x, y - this.pointer_radius).arc(0, this.pointer_radius * 2, 1).arc(0, -this.pointer_radius * 2, 1).close())
                this.tipsPoint.push({ x: x, y: y })
            }
            this.rectLine.lineTo(x, this.height - this.bottom - 1).lineTo(startX, this.height - this.bottom - 1).close()
        }

    }

    state = {
        showTips: false,
        left: 0,
        top: 0,
    }

    onPress(event) {
        const index = Math.floor(event.nativeEvent.locationX / this.itemWidth)
        const point = this.tipsPoint[index];
        const data = this.option.series[0]['data'];
        this.setState({
            showTips: true,
            tipsLeft: point.x - 20,
            tipsBottom: point.y,
            tipsValue: data[index]
        })
    }


    caculateY(data) {
        const {min, max} = this.option.yAxis;
        return this.height - this.bottom - ((data - min) / (max - min) * (this.height - this.top - this.bottom))
    }

    render() {
        const {showTips, tipsLeft, tipsBottom, tipsValue} = this.state;
        const {xAxis, yAxis, series} = this.option;
        const series_item = series[0];
        const pointer = series_item.pointer,
            tip = series_item.tip;
        return (<View
            style={[{
                width: '100%'
            }, this.props.style]}>

            <Surface width={this.width} height={this.height}>
                <Shape d={this.xAxisLine} stroke={xAxis.lineStyle.color} strokeWidth={1} />
                {
                    xAxis.axisTick.show ? this.pointX.map((item, index) => {
                        return <Shape
                            key={index}
                            d={item}
                            stroke={xAxis.axisTick.lineStyle.color}
                            strokeWidth={1}
                        />
                    }) : null
                }
                {
                    this.lineH.map((item, index) => {
                        return <Shape
                            key={index}
                            d={item}
                            stroke={xAxis.gridLine.lineStyle.color}
                            strokeWidth={1}
                        />
                    })
                }
                <Shape d={this.rectLine} stroke="red" fill={series_item.lineStyle.fill} strokeWidth={0} />
                {/* 封闭渐变区域，水平方向，效果不好 <Shape d={this.rectLine} stroke="red" fill={new RadialGradient({'0': '#000000','1': '#ffffff'},"150","150","300","300")}  strokeWidth={0} /> */}
                <Shape d={this.trendline} stroke={series_item.lineStyle.color} strokeWidth={2} />
                {
                    this.anchorPoints.map((item, index) => {
                        return <Shape
                            key={index}
                            d={item}
                            stroke={pointer.itemStyle.color}
                            fill={pointer.itemStyle.fill}
                            strokeWidth={2}
                        />
                    })
                }
            </Surface>
            {
                xAxis.data.map((item, index) => {
                    return (<View
                        key={index}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            top: this.height - this.bottom,
                            left: this.chartOffsetX + this.left + index * this.itemWidth,
                            width: this.itemWidth,
                            height: 20
                    }}>
                        <Text style={{
                            color: xAxis.textStyle.color,
                            fontSize: xAxis.textStyle.fontSize
                        }}>{item}</Text>
                        </View>)
                })
            }

            {
                xAxis.name > 0 ? (<View style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    position: 'absolute',
                    top: this.height - this.bottom - 10,
                    left: 5 + this.chartOffsetX + this.width - this.right,
                    width: this.right,
                    height: 20
                }}>
                    <Text style={{
                        color: xAxis.nameStyle.color,
                        fontSize: xAxis.nameStyle.fontSize
                    }}>{xAxis.name || ''}</Text></View>) : null
            }

            {
                yAxis.data.map((item, index) => {
                    return (<View key={index} style={{
                        flexDirection: "row",
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        position: 'absolute',
                        top: this.height - this.bottom - 10 - this.itemHeight * index,
                        left: this.chartOffsetX + 5,
                        width: this.left - 10, height: 20
                    }}>
                        <Text style={{
                            color: yAxis.textStyle.color,
                            fontSize: yAxis.textStyle.fontSize
                        }}>{item}</Text>
                    </View>)
                })
            }

            <TouchableOpacity
                onPress={(evt) => this.onPress(evt)}
                activeOpacity={1}
                style={{
                    position: 'absolute',
                    left: this.chartOffsetX + this.left,
                    top: this.top,
                    width: this.width - this.left - this.right,
                    height: this.height - this.top - this.bottom
                }}>
            </TouchableOpacity>
            {
                showTips ? (<View style={[styles.button, {
                    left: this.chartOffsetX + tipsLeft,
                    bottom: this.height - tipsBottom
                    }]}
                >
                    <View style={{
                        width: 45,
                        height: 20,
                        backgroundColor: tip.itemStyle.backgroundColor,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 2
                    }}>
                        <Text style={{
                            color: tip.itemStyle.color,
                            fontSize: tip.itemStyle.fontSize
                        }}>{tipsValue}</Text>
                    </View>
                    <View style={[styles.arrow, {
                        borderTopColor: tip.itemStyle.backgroundColor}]}></View>
                </View>) : null
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
