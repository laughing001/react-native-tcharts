import React, {Component} from 'react';
import {View, ART, Dimensions} from 'react-native';
const {Surface, Shape, Path} = ART;
const {width, height} = Dimensions.get('window');
import {color1, color2, color3, color4, color5} from '../Color';
const defaultOption = {
    r: 80,
    fill: color1,
    strokeWidth: 2,
    stroke: color2
};


export default class Circle extends Component{
    constructor(props){
        super(props);
        this.option = Object.assign(defaultOption, props.option || {});
        this.width = props.width || width;
        this.height = props.height || 100;
        this.style = props.style || {};
        this.path = this.getPath();
    }
    componentWillMount(){
       
    }
    getPath = () => {
        const width = this.width,
            height = this.height;
        const {r} = this.option;
        const cx = width / 2,
            cy = height / 2;
        let startX = cx - r,
            startY = cy;
        let path = new Path().moveTo(startX, startY)
                .arcTo(startX + r * 2, startY, r)
                .arcTo(startX, startY, r)
                .close();
        return path;
    }

    render(){
        const width = this.width,
            height = this.height,
            path = this.path,
            style = this.style;
        const {fill, stroke, strokeWidth} = this.option;
        return(
            <View
                style={[style, {
                    width: width,
                    height: height
                }]}
            >
                <Surface
                    width={width}
                    height={height}
                >
                    <Shape d={path} 
                        fill={fill} 
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                    />
                </Surface>
            </View>
            )
        }
    }
            
