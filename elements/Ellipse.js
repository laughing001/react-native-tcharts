import React, {Component} from 'react';
import {View, ART, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const {Surface, Shape, Path} = ART;
import {color1, color2, color3, color4, color5} from '../Color';

const defaultOption = {
    rx: 80,
    ry: 40,
    fill: color1,
    strokeWidth: 2,
    stroke: color2
};
export default class Ellipse extends Component{
    constructor(props){
        super(props);
        this.option = Object.assign(defaultOption, props.option || {});
        this.width = props.width || width;
        this.height = props.height || 100;
        this.path = this.getPath();
    }
    componentWillMount(){}
    getPath = () => {
        const width = this.width,
            height = this.height;
        const {rx, ry} = this.option;
        const cx = width / 2,
            cy = height / 2;
        let startX = cx - rx,
            startY = cy;
        let path = new Path().moveTo(startX, startY)
                   .arcTo(startX + rx * 2, startY, rx, ry)
                   .arcTo(startX, startY, rx, ry)
                   .close();
        return path;
    }

    render(){
        const width = this.width,
            height = this.height,
            path = this.path;
        const {fill, stroke, strokeWidth} = this.option;
        const style = this.props.style || {};
        return(<View
                style={[style, {
                    width: width,
                    height: height
                }]}
            >
                <Surface
                    width={width}
                    height={height}
                >
                    <Shape
                        d={path}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                    >
                    </Shape>
                </Surface>
            </View>)
        }
    }
            
