/*
* 测试art  rect ， sallyywang

* @Params

* width: Number | 画布的宽度
* height: Number | 画布的高度
* option: Object | 绘图参数
* option = {
    x: Number ; //绘图起始X坐标
    y: Number ;//绘图起始Y坐标
    width: Number; //绘图宽度
    height: Number; //绘图高度
    fill: String; //填充颜色,
    strokeWidth: Number; //绘图线条的宽度
    stroke: String; //绘图颜色
}
*/

import React, {Component} from 'react'
import {
    View,
    ART
} from 'react-native';
const {Surface, Shape, Path} = ART;
export default class Rect extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            width: this.props.width || 100,
            height: this.props.height || 100,
            option: this.props.option || {}
        }
    }
    componentWillMount(){
       
    }
    getRectPath = ()=>{
        const {option} = this.state;
        const { x, y, width, height, fill, strokeWidth, stroke} = option
        let startX = x || 0;
        let startY = y || 0;
        let path = new Path().moveTo(startX, startY)
                   .lineTo(startX + (width || 100), startY)
                   .lineTo(startX + (width || 100), startY + (height ||100))
                   .lineTo(startX, startY + (height ||100))
                   .close()
        return path;
    }

    render(){
        const { width, height, option} = this.state;
        const center = [width / 2, height / 2];
        return(
            <View  style={{width: width, height: height}}>
                <Surface width={width} height={height}>
                    <Shape d={this.getRectPath()} 
                        fill={option.fill || '#fff'} 
                        stroke={option.stroke || '#000'}
                        strokeWidth={option.strokeWidth || 1}
                        >
                    </Shape>
                </Surface>
            </View>
            )
        }
    }
            
