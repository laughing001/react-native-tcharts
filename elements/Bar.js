import React, {Component} from 'react';
import {View, Text, ART, Dimensions} from 'react-native';
const {Surface, Shape, Path} = ART;
const {width, height} = Dimensions.get('window');
const defaultOption = {
	name: '',
	legend: {},
    xAxis: {
        name: '',
        lineStyle: {//轴线相关配置
            color: 'black'
        },
        axisTick: {//刻度相关配置
            show: true,
            lineStyle: {
                color: 'black'
            }
        },
        textStyle: {
            color: 'black'
        },
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        name: '',
        lineStyle: {
            color: 'black'
        },
        axisTick: {
            show: true,
            lineStyle: {
                color: 'black'
            }
        },
        textStyle: {
            color: 'black'
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
            color: 'blue',
            opacity: 0.5
        }
    }]
}
export default class Bar extends Component{
	constructor(props) {
		super(props);
		this.option = Object.assign(defaultOption, props.option || {});
		const xAxis = this.option.xAxis,
			yAxis = this.option.yAxis;
		this.width = props.width || width;
		this.height = props.height || 200;
		this.min = this.option.yAxis.min || 0;
		this.max = this.option.yAxis.max || 100;
		this.interval = this.option.yAxis.interval || 20;
		this.series = this.option.series || [],
			seriesLen = this.series.length;
		//surface上下左右各留50dp
		this.coordinateOrigin = {
			x: 50,
			y: this.height - 50
		};
		this.xAxisData = this.option.xAxis.data || [];//x轴数据
		let len = this.xAxisData.length;
		let distance = (this.width - 100) / len;
		if(xAxis.axisTick && xAxis.axisTick.show) {//是否显示刻度
			this.xAxisTickList = [];//x轴刻度列表
			for(let i = 0; i <= len; i++) {
				let p = ART.Path();
				let x = this.coordinateOrigin.x + distance * i,
					y = this.coordinateOrigin.y;
				p.moveTo(x, y);
				p.lineTo(x, y + 5);
				this.xAxisTickList.push(p);
			}
		}
		//一个柱状图的宽度的一半,也是一个刻度里多个柱状图中间空白的宽度
		const spaceWidth = distance / (seriesLen + 1 + seriesLen * 2);
		this.barList = [];
		//柱状图
		for(let i = 0; i < seriesLen; i++) {
			this.barList[i] = [];
			for(let j = 0, len = this.series[i]['data'].length; j < len; j++) {
				let data = this.series[i]['data'][j] || 0;
				let barP = ART.Path();
				const x = 50 + j * distance + (i * 2 + i + 1) * spaceWidth,
					y = this.coordinateOrigin.y;
				barP.moveTo(x, y);
				let y1 = y - (data - this.min) / (this.max - this.min) * (this.height - 100);
				barP.lineTo(x, y1);
				barP.lineTo(x + spaceWidth * 2, y1);
				barP.lineTo(x + spaceWidth * 2, y);
				this.barList[i].push(barP);
			}
		}
		this.yAxisTickList = [];//y轴刻度列表
		this.yAxisGridLineList = [];//y轴网格线列表
		len = (this.max - this.min) / this.interval;
		distance = (this.height - 100) / len;
		//垂直居中,文字就能与刻度对齐了
		this.yTextViewH = distance * (len + 1);
		this.yAxisData = [];//y轴数据
		for(let i = 0; i <= len; i++) {
			this.yAxisData.push(this.min + i * this.interval);
			let x = this.coordinateOrigin.x,
				y = this.coordinateOrigin.y - i * distance;
			if(yAxis && yAxis.axisTick && yAxis.axisTick.show) {//y轴刻度线
				let p = ART.Path();
				p.moveTo(x, y);
				p.lineTo(x - 5, y);
				this.yAxisTickList.push(p);
			}
			if(i > 0 && yAxis && yAxis.gridLine && yAxis.gridLine.show) {//y轴网格横线
				let p1 = ART.Path();
				p1.moveTo(x + 1, y);
				p1.lineTo(x + width - 100, y);
				this.yAxisGridLineList.push(p1);
			}
		}
		this.xAxisLine = ART.Path();
		this.xAxisLine.moveTo(this.coordinateOrigin.x, this.coordinateOrigin.y).lineTo(this.width - 50, this.coordinateOrigin.y);
		this.yAxisLine = ART.Path();
		this.yAxisLine.moveTo(this.coordinateOrigin.x, this.coordinateOrigin.y).lineTo(this.coordinateOrigin.x, 50);
	}
	render() {
		const {
			series,
			width,
			height,
			xAxisLine,
			yAxisLine,
			xAxisTickList,
			yAxisTickList,
			yAxisGridLineList,
			barList,
			xAxisData,
			yAxisData,
			yTextViewH
		} = this;
		const {xAxis, yAxis} = this.option;
		return (<View style={{
			width: width,
			height: height
		}}>
			<Surface
				width={'100%'}
				height={'100%'}
				style={{
					flex: 1
				}}>
				<Shape
					opacity={1}
					stroke={xAxis.lineStyle.color || 'black'}
					strokeWidth={1}
					d={xAxisLine}
				/>
				<Shape
					opacity={1}
					stroke={yAxis.lineStyle.color || 'black'}
					strokeWidth={1}
					d={yAxisLine}
				/>
				{
					xAxisTickList && xAxisTickList.map((d, index) => {
						return <Shape
							key={index}
							d={d}
							stroke={xAxis.axisTick.lineStyle.color || 'black'}
							strokeWidth={1}
						/>
					})
				}
				{
					yAxisTickList && yAxisTickList.map((d, index) => {
						return <Shape
							key={index}
							d={d}
							stroke={yAxis.axisTick.lineStyle.color || 'black'}
							strokeWidth={1}
						/>
					})
				}
				{
					yAxisGridLineList && yAxisGridLineList.map((d, index) => {
						return <Shape
							key={index}
							d={d}
							stroke={yAxis.gridLine.lineStyle.color || 'black'}
							strokeWidth={1}
						/>
					})
				}
				{
					barList.map((list, i) => {
						return list.map((d, index) => {
							return <Shape
								key={`${i}_${index}`}
								d={d}
								fill={series[i]['itemStyle']['color']}
								strokeWidth={1}
							/>
						})
					})
				}
			</Surface>
			<View
				style={{
					//backgroundColor: 'yellow',
					flex: 1,
					marginHorizontal: 50,
					position: 'absolute',
					bottom: 5,
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'center',
					width: width - 100,
					height: 40
				}}>
				{
					xAxisData.map((v, k) => {
						return (<View
							key={k}
							style={{
								flex: 1,
								height: '100%',
								justifyContent: 'flex-start',
								alignItems: 'center'
							}}>
							<Text style={xAxis.textStyle}>{v}</Text>
						</View>)
					})
				}
			</View>
			<View style={{
				height: yTextViewH,
				width: 40,
				position: 'absolute',
				flexDirection: 'column-reverse',
				alignItems: 'flex-end',
				justifyContent: 'flex-start',
				top: (height - yTextViewH) / 2
			}}>
				{
					yAxisData.map((v, k) => {
						return (<View
							key={k}
							style={{
								flex: 1,
								height: '100%',
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<Text style={yAxis.textStyle}>{v}</Text>
						</View>)
					})
				}
			</View>
		</View>)
	}
}