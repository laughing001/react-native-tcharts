import React, {Component} from 'react'
import {
    View,
    ART
} from 'react-native';
const {Surface, Shape, Path} = ART;
const {width, height} = Dimensions.get('window');
import {color} from '../theme/theme';
const defaultOption = {
        strokeWidth: 1,
        stroke: color[1],
        fill: color[0],
        width: 100,
        height: 100
};

export default class Rect extends Component{
    constructor(props){
        super(props);
        const option = Object.assign(defaultOption, props.option || {});
        this.state = {
            c_width: props.width || 100,
            c_height: props.height || 100,
            option: option
        }
    }
    componentWillMount(){
       
    }
    getRectPath = ()=>{
        const {option, c_width, c_height} = this.state;
        const {width, height, fill, strokeWidth, stroke} = option;
        let centerX = c_width / 2,
            centerY = c_height / 2;
        let startX = centerX - (width / 2),
            startY = centerY - (height / 2);
        let path = new Path().moveTo(startX, startY)
                   .lineTo(startX + (width || 100), startY)
                   .lineTo(startX + (width || 100), startY + (height ||100))
                   .lineTo(startX, startY + (height ||100))
                   .close()
        return path;
    }

    render(){
        const {c_width, c_height, option} = this.state;
        return(
            <View  style={{width: c_width, height: c_height}}>
                <Surface width={c_width} height={c_height}>
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
            
