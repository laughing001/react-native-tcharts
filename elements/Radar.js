import React, {Component} from 'react';
import {View, ART, Dimensions, ScrollView, Text} from 'react-native';
const {width, height} = Dimensions.get('window');
const {Surface, Shape} = ART;
let indicatorCArr = [];
const defaultSeriesLineStyle = {
	color: '#30d9d0',
	opacity: 1
};
const defaultSeriesAreaStyle = {
	color: '#30d9d0',
	opacity: 1
};
const defaultOption = {
	splitNumber: 5,
	shape: 'polygon',
	startAngle: 0,
	indicator: [{
		text: '轴线1',
		max: 100,
		color: 'green'
	}, {
		text: '轴线2',
		max: 100,
		color: 'green'
	}, {
		text: '轴线3',
		max: 100,
		color: 'green'
	}, {
		text: '轴线4',
		max: 100,
		color: 'green'
	}],
	axisLine: {
		show: true,
		lineStyle: {
			color: 'red'
		}
	},
	rich: {
		default: {
			color: '#000',
			fontSize: 12
		}
	},
	series: [{
		data: [20, 50, 80, 100],
		itemStyle: {},
		lineStyle: defaultSeriesLineStyle,
		areaStyle: defaultSeriesAreaStyle
	}]
};
export default class Radar extends Component{
	constructor(props) {
		super(props);
		indicatorCArr = [];
		this.option = Object.assign(defaultOption, props.option || {});
		this.splitNumber = this.option.splitNumber || 5;//雷达图有几个圆圈
		this.indicator = this.option.indicator || [];//逆时针排列
		this.shape = this.option.shape || 'polygon';
		this.startAngle = this.option.startAngle || 0;//坐标系起始角度，也就是第一个指示器轴的角度,默认x轴正向
		this.splitDegree = 360 / this.option.indicator.length;
		this.radarWidth = props && props.width || width;
		this.radarHeight = props && props.height || 200;
		this.radarCenter = {//雷达图圆心坐标
			x: this.radarWidth / 2,
			y: this.radarHeight / 2
		};
		this.radarR = Math.floor((this.option.radius / this.option.splitNumber) || ((this.radarHeight - 2) / this.option.splitNumber / 2));
		this._getShape();
		this._getPath();
		this.state = {
			radarIndicatorArr: indicatorCArr
		};
	}
	componentDidMount() {
		
	}
	_getDegreen = index => {//获取相对雷达中心点x轴正向的角度,逆时针为正,顺时针为负
		let {startAngle} = this.option;
		return (startAngle + index * this.splitDegree);
	}
	_getShape = () => {
		let {splitNumber, indicator, startAngle, shape, axisLine, splitLine} = this.option;
		this.radarShapeArr = [];
		this.radarAxisPathArr = [];
		this.radarTextArr = [];
		for(let i = 1; i <= splitNumber; i++) {//圆圈个数的循环
			let r = this.radarR * i;
			let pointCoordinate = [];
			let path = ART.Path();
			let start = {};
			for(let j = 0, len = indicator.length; j < len; j++) {//轴线的循环
				let c = this._calcuteCoordinate({
					radius: r,
					degree: this._getDegreen(j) //相对圆心为原点的x坐标的角度,顺时针为正,逆时针为负
				});
				if(i === splitNumber) {//画雷达图轴线
					if(axisLine && axisLine.show) {
						let p = ART.Path();
						p.moveTo(this.radarCenter.x, this.radarCenter.y);
						p.lineTo(c.x, c.y);
						this.radarAxisPathArr.push(p);
					}
					c.text = indicator[j] && indicator[j].text || '';
					indicatorCArr.push(c);
				}
				if(splitLine && splitLine.show) {
					if(0 === j) {
						start = c;
						path.moveTo(c.x, c.y);
					} else if('circle' == shape) {
						//arcTo(x, y, r1, r2, outer, counterClockwise, rotation)
						//r1长轴半径 r2短轴半径
						//clockwise:顺时针;counterClockwise:逆时针
						//counterClockwise:默认false
						//outer:大圆还是小圆
						path.arcTo(c.x, c.y, r, r, false, true);
					} else {
						path.lineTo(c.x, c.y);
					}
				}
			}
			if(splitLine && splitLine.show) {
				if('circle' === shape) {
					path.arcTo(start.x, start.y, r, r, false, true);
				} else {
					path.close();
				}
				this.radarShapeArr.push(path);
			}
		}
	}
	_getPath = () => {
		this.radarPathArr = [];
		const {startAngle, splitNumber} = this.option;
		this.option && this.option.series && this.option.series.map((item, index) => {
			let p = ART.Path();
			item && item.data && item.data.map((v, index) => {
				let c = this._calcuteCoordinate({
					radius: v / this.indicator[index].max * (this.radarR * splitNumber),
					degree: this._getDegreen(index)
				});
				if(0 == index) {
					p.moveTo(c.x, c.y);
				} else {
					p.lineTo(c.x, c.y);
				}
			});
			p.close();
			this.radarPathArr.push({
				path: p,
				lineStyle: item.lineStyle || defaultSeriesLineStyle,
				areaStyle: item.areaStyle || defaultSeriesAreaStyle
			});
		});
	}
	//计算点的坐标
	_calcuteCoordinate = opt => {
		let {radius, degree} = opt;
		let x_flag = 1,
			y_flag = 1;
		if(degree < 0) {//负值换算成正值,且是小于360的
			degree = Math.ceil(Math.abs(degree) / 360) * 360 + degree;
		} else if(degree >= 360) {//度数必须换算成小于360的
			degree = degree % 360;
		}
		let textPosition;//每个轴线的文案的位置
		if(0 === degree) {//x轴正向
			textPosition = 'right';
		} else if(degree < 90) {//第一象限
			y_flag = -1;
			textPosition = 'right_top';
		} else if(90 === degree) {//y轴负向
			y_flag = -1;
			textPosition = 'top';
		} else if(degree < 180) {//第二象限
			x_flag = -1;
			y_flag = -1;
			degree = 180 - degree;
			textPosition = 'left_top';
		} else if(180 === degree) {//x轴负向
			x_flag = -1;
			textPosition = 'left';
		} else if(degree < 270) {//第三象限
			x_flag = -1;
			degree -= 180;
			textPosition = 'left_bottom';
		} else if(270 === degree) {//y轴正向
			textPosition = 'bottom';
		} else if(degree < 360) {//第四象限
			degree = 360 - degree;
			textPosition = 'right_bottom';
		}
		let x = Math.abs(Math.round(radius * Math.cos(degree * Math.PI / 180))),
			y = Math.abs(Math.round(radius * Math.sin(degree * Math.PI / 180)));
		return {
			x: this.radarCenter.x + x * x_flag,
			y: this.radarCenter.y + y * y_flag,
			textPosition: textPosition
		};
	}
	_onTextLayout = (e, c) => {
		if(c && c.hasLayout) {
			return;
		}
		let layout = (e && e.nativeEvent && e.nativeEvent.layout) || {};
		c.hasLayout = true;
		c.opacity = 1;
		let textPosition = c && c.textPosition,
			w = layout.width || 30,
			h = layout.height || 10;
		if('top' == textPosition) {
			c.x = c.x - w / 2;
			c.y = c.y - h;
		} else if('right_top' == textPosition) {
			c.y = c.y - h;
		} else if('right' == textPosition) {
			c.y = c.y - h / 2;
		} else if('right_bottom' == textPosition) {

		} else if('bottom' == textPosition) {
			c.x = c.x - w / 2;
		} else if('left_bottom' == textPosition) {
			c.x = c.x - w;
		} else if('left' == textPosition) {
			c.x = c.x - w;
			c.y = c.y - h / 2;
		} else if('left_top' == textPosition) {
			c.x = c.x - w;
			c.y = c.y - h;
		}
		this.setState({
			radarIndicatorArr: [].concat(this.state.radarIndicatorArr)
		});
	}
	_formatText = text => {
		let {rich} = this.option || {};
		text = text || '';
		text = text.replace('{', '').replace('}', '');
		let textArr = text.split(':');
		if(1 == textArr.length) {
			return {
				style: rich['default'] || null,
				text: textArr[0]
			};
		} else {
			return {
				style: rich[textArr[0]] || rich['default'] || null,
				text: textArr[1]
			};
		}
	}
	render() {
		const {axisLine, splitLine, splitArea, rich, shape} = this.option;
		return (<View style={{
			width: this.radarWidth,
			height: this.radarHeight}}>
			<Surface
				width={'100%'}
				height={'100%'}
				style={{
					flex: 1
				}}>
				{
					this.radarShapeArr.map((path, index) => {
						return <Shape
							opacity={splitLine.lineStyle.opacity || 1}
							d={path}
							stroke={splitLine.lineStyle.color}
							strokeWidth={1}
							key={index}/>
					})
				}
				{
					this.radarAxisPathArr.map((path, index) => {
						return <Shape
							opacity={axisLine.lineStyle.opacity || 1}
							d={path}
							stroke={axisLine.lineStyle.color}
							strokeWidth={1}
							key={index}/>
					})
				}
				{
					this.radarPathArr.map((item, index) => {
						return <Shape
							opacity={item.areaStyle.opacity || 1}
							fill={item.areaStyle.color}
							d={item.path}
							stroke={item.lineStyle.color}
							strokeWidth={1}
							key={index}/>
					})
				}
			</Surface>
			{
				this.state.radarIndicatorArr.map((c, index) => {
					if(c && c.text) {
						let textArr = c.text.split('\n');//可能是多行,以\n换行
						return (<View
							key={index}
							onLayout={e => {//text尺寸需要动态获取
								this._onTextLayout(e, c)
							}}
							style={{
								opacity: c.opacity || 0,
								position: 'absolute',
								justifyContent: 'center',
								alignItems: 'center',
								left: c.x,
								top: c.y}}>
								{
									textArr.map((lineText, i) => {
										let lineTextArr = lineText.split('}{');//一行可能有多个text,每个text用{}{}包裹
										return (<View key={i} style={{
											flexDirection: 'row',
											justifyContent: 'center',
											alignItems: 'center'}}>
											{
												lineTextArr.map((t, j) => {
													let r = this._formatText(t);
													return <Text key={j} style={r.style}>{r.text}</Text>
												})
											}
										</View>)
									})
								}
						</View>);
					} else {
						return null;
					}
				})
			}
		</View>);
	}
}