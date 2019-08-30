import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    ART
} from 'react-native';

const {Surface, Shape, Path, Transform} = ART;
import {color} from '../theme/theme';
const defaultOption =  {
    title: {},
    legend: {},
    color: [color[0], color[1], color[2], color[3], color[4]], //饼图颜色
    series:[{
        name: '',
        type: 'pie',
        radius: [40,80], //饼图半径暂支持数字
        data: [10,20], //饼图占用数据
    }]
}
export default class Pie extends Component{
    constructor(props){
        super(props);
        this.defaultColor = color;
        let option = Object.assign(defaultOption, props.option || {});
        let {color, series} = option;
        
        //对series做处理，支持多个元素，以及data为对象
        let multiPieData = [];
        if(series instanceof Array){
            multiPieData = series.map((val, key)=>{
                let data = val.data || [];
                let radius = (val.radius && 2 == val.radius.length) ? val.radius : [0, val.radius[0] || this.props.height / 2];
                let sum = 0;
                let showLabel = false; //是否展示侧边文字
                let dataNum = [];
                let textStyle = val.textStyle || {
                    fontSize: 12,
                    width: 30,
                    color: '#000',}
                data.forEach((item, index)=>{
                    if(typeof(item) == 'object'){
                        //支持对象
                        sum += (item.value || 0)
                        showLabel = true;
                        dataNum[index] = item.value;
                    } else {
                        sum += (item || 0);
                        dataNum[index] = item;
                    }
                })
                return {
                    data, radius, sum, showLabel, dataNum, textStyle,
                }
            })
        }
        this.state = {
            width: this.props.width || 100,
            height: this.props.height || 100,
            colorArr: color || [],
            pathArr: [],
            textAxis: [],
            multiPieData: multiPieData
        }
    }
    componentWillMount(){
        //this.getPieDataSum(); 
        this.getPiePath();
    }
    getPieDataSum = ()=>{
        
    }
    getPiePath = ()=>{
        let {width, height, colorArr, multiPieData} = this.state;
        let pieData = this.state.pieData;
        this.pathArr = [];
        let colorNew = colorArr.length > 0 ? colorArr : this.defaultColor; 
        multiPieData.forEach((item, index)=>{
            let { data, radius, sum, showLabel, dataNum } = item;
            let rotateSum = 0; //记录各个模块累加和
            let rotate = 0;
            let startY1 = Math.abs(height / 2 - radius[1]); //外圆
            let startY2 = Math.abs(height / 2 - radius[0]); //内圆
            this.pathArr[index] = dataNum.map((val, key)=>{
                rotateSum += rotate;
                if(sum === 0){
                    rotate = 2 * (1 / (dataNum.length || 1) )* Math.PI;
                } else {
                    rotate = 2 * (val / sum) * Math.PI;
                }
                /*
                { rotate: 旋转动作， rotateDeg: 旋转角度，color: fill的颜色， deg: 扇形角度, path: 扇形绘制路径}
                */
                if(rotate > Math.PI){
                    //大于半圆要绘制两次     
                    return {
                        rotate: new Transform().rotate(rotateSum * 180 / Math.PI, width / 2 , height / 2 ), 
                        color: colorNew[key % colorNew.length],
                        rotateDeg: rotateSum,
                        deg: rotate,
                        path:  new Path().moveTo(width / 2, startY1)
                                    .arcTo(width / 2 - radius[1]* Math.sin(rotate - Math.PI),
                                    height / 2 + radius[1] * Math.cos(rotate - Math.PI), radius[1], radius[1], true, false)
                                    .lineTo(width / 2 - radius[0] * Math.sin(rotate - Math.PI),
                                    height / 2 + radius[0] * Math.cos(rotate - Math.PI))
                                    .arcTo(width / 2 , startY2, radius[0], radius[0], true, true)
                                    .close()
                    }
                } else {
                    //小于pi绘制1次
                    return {
                        rotate: new Transform().rotate(rotateSum * 180 / Math.PI, width / 2 , height / 2),
                        color: colorNew[key % colorNew.length],
                        rotateDeg: rotateSum,
                        deg: rotate,
                        path: new Path().moveTo(width / 2, startY1)
                                    .arcTo(
                                        width / 2 + radius[1] * Math.sin(rotate), 
                                        height / 2 - radius[1] *  Math.cos(rotate), radius[1])
                                    .lineTo(
                                        width / 2 + radius[0]* Math.sin(rotate), 
                                        height / 2 - radius[0] *  Math.cos(rotate))
                                    .arcTo(width / 2, startY2, radius[0], radius[0], false, true)
                                    .close()
                    }
                }
            })
        })
        this.setState({
            pathArr: this.pathArr
        })
    }
    
    getTextAxis = (radius, ele, style)=>{
        const {width, height} = this.state;
        //radius为外圆半径，ele为要标记的扇形
        let radiusNew = radius + 10; //距离圆距离为10
        let rotate = (ele.rotateDeg + ele.deg / 2); //扇形中心位置要旋转的角度
        let x = width / 2 + radiusNew * Math.sin(rotate);
        let y = height / 2 - radiusNew * Math.cos(rotate);
        let textWidth = style.width || 30;
        if(rotate > Math.PI){
            x = x - textWidth;
        }
        return {left: x, top: y}
    }
    render(){
        const {width, height, colorArr, pathArr, multiPieData} = this.state;
        
        return(
            <View  style={{width: width, height: height}}>
                <Surface width={width} height={height}>
                    {
                        this.state.pathArr.map((item, key)=>{
                            return item.map((val, index)=>{
                                return (
                                    <Shape 
                                        d={val.path}  
                                        fill={val.color}
                                        key={'pie-shape'+index}
                                        transform={val.rotate}
                                        strokeWidth={0} key={'pie-img-' + index}/>)
                            })
                        })
                    }
                </Surface>
                {
                    //文字展示先清空
                    // this.state.pathArr.map((item, key)=>{
                    //     return multiPieData[key].showLabel ? (
                    //         <View style={{position: 'absolute', width: width, height: height, top: 0}} key={'pie-view'+key}>
                    //             {
                    //                 //展示label
                    //                 item.map((ele, index)=>{
                    //                     let axis = this.getTextAxis(multiPieData[key].radius[1], ele, multiPieData[key].textStyle);//计算坐标
                                        
                    //                     if(ele.deg == 0){
                    //                         //为0不展示
                    //                         return null
                    //                     } else {
                    //                         return (
                    //                             <Text style={[styles.font12, {color: ele.color,...axis, 
                    //                                 ...multiPieData[key].textStyle}]} 
                    //                                 numberOfLines={1}
                    //                                 onLayout={this.textIsLayout}
                    //                                 key={'pie-text'+ index}>
                    //                                 {   multiPieData[key].data && (
                    //                                         multiPieData[key].data[index].name || 
                    //                                         multiPieData[key].data[index].value || 
                    //                                         multiPieData[key].data[index].value
                    //                                     ) 
                    //                                 }
                    //                             </Text>
                    //                         )
                    //                     }
                                        
                    //                 })
                    //             }
                    //         </View>
                    //     ) : null
                    // })
                }
            </View>
            )
        }
    }

    const styles = StyleSheet.create({
        font12: {
            fontSize: 12,
            color: '#000',
            position: 'absolute',
            width: 30,
        }
    })
            
