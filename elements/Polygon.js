import React, {Component} from 'react';
import {View, ART, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');
const {Surface, Shape} = ART;
import {color} from '../theme/theme';
const defaultOption = {
	lineNumber: 5,
	startAngle: 0,
	radius: 80,
	opacity: 1,
	fill: color[0],
	strokeWidth: 2,
	stroke: color[1]
};
export default class Polygon extends Component{
	constructor(props) {
		super(props);
		this.option = Object.assign(defaultOption, props.option || {});
		this.path = ART.Path();
		this.startAngle = this.option.startAngle || 0;//坐标系起始角度，也就是第一个指示器轴的角度,默认x轴正向
		this.splitDegree = 360 / this.option.lineNumber;
		this.width = props.width || width;
		this.height = props.height || (this.option.radius + this.option.strokeWidth) * 2;
		this.centerCoordinate = {//中心点坐标
			x: this.width / 2,
			y: this.height / 2
		};
		this._getShape();
	}
	_getDegreen = index => {//获取相对中心点x轴正向的角度,逆时针为正,顺时针为负
		let {startAngle} = this.option;
		return (startAngle + index * this.splitDegree);
	}
	_getShape = () => {
		let {lineNumber, radius} = this.option;
		for(let i = 0; i < lineNumber; i++) {//轴线的循环
			let c = this._calcuteCoordinate({
				radius: radius,
				degree: this._getDegreen(i) //相对圆心为原点的x坐标的角度,顺时针为正,逆时针为负
			});
			if(0 == i) {
				this.path.moveTo(c.x, c.y);
			} else {
				this.path.lineTo(c.x, c.y);
			}
		}
		this.path.close();
	}
	//计算点的坐标
	_calcuteCoordinate = opt => {
		let {radius, degree} = opt;
		let x_flag = 1,
			y_flag = 1;
		if(degree < 0) {//负值换算成小于360的正值
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
			x: this.centerCoordinate.x + x * x_flag,
			y: this.centerCoordinate.y + y * y_flag,
			textPosition: textPosition
		};
	}
	render() {
		const {fill, strokeWidth, stroke, opacity} = this.option;
		return (<View
			style={{
				width: this.width,
				height: this.height
			}}
		>
			<Surface
				width={this.width}
				height={this.height}
				style={{
					flex: 1
				}}
			>
				<Shape
					opacity={opacity}
					d={this.path}
					stroke={stroke}
					fill={fill}
					strokeWidth={strokeWidth} />
			</Surface>
		</View>);
	}
}