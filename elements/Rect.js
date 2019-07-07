import React, {Component} from 'react'
import {
    View,
    ART
} from 'react-native';
const {Surface, Shape, Path} = ART;
import {color} from '../theme/e_default';
const defaultOption = {
        x: 2,
        y: 2,
        strokeWidth: 1,
        stroke: color[1],
        fill: color[0],
        width: 100,
        height: 100
};

export default class Rect extends Component{
    constructor(props){
        super(props);
        const option = Object.assign(defaultOption, props.option || {})
        this.state = {
            width: this.props.width || 100,
            height: this.props.height || 100,
            option: option
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
            
