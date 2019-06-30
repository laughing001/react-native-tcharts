/*

* @Params

* width: Number | 画布的宽度
* height: Number | 画布的高度
* option: Object | 绘图参数
* option = {
    title: {},
    legend: {},
    color: [], //漏斗各段颜色
    series:[{
        name: '漏斗图',
        type: 'funnel',
        left: '10%', // 绘图距离左边的距离
        top: 20,// 绘图距离顶部的距离
        bottom: 20,
        height: 30,// 图形高度
        min: 0,
        max: 100, //设置漏斗的最小和最大值
        minSize: '10%', //漏斗的最小和最大尺寸
        maxSize: '30%',
        gap: 0, //漏斗间隔
        funnelAlign: 'center | left | right', //对齐方式, 暂时只支持center
        sort: 'ascending | descending' ;//漏斗顺序
        label: {
            show: true, //
            fontSize: 12,
            color: '#fff'//用来显示标注字体样式的
        },
        data: [{value: 20, name: '一季度'}]

    }]
}
*/

import React, {Component} from 'react'
import {
    View,
    ScrollView,
    ART
} from 'react-native'


const {Surface, Shape, Path, Group} = ART;



export default class Funnel extends Component{
    constructor(props){
        super(props);
        this.defaultColor = ['#f55353','#2aaba4'];
        //处理漏斗图中data排序
        let option = Object.assign({}, props.option || {});
        let {color, series} = option;
        option.series = this.preHandleSeries(series, props.width);
        this.state = {
            width: this.props.width || 100,
            height: this.props.height || 100,
            color: color || this.defaultColor,
            option: this.props.option || {},
            multiPath: []
        }
    }
    preHandleSeries = (series, width)=>{
        let newSeries = [];
        if(series instanceof Array){ 
            try{
                newSeries = series.map((item, index)=>{
                
                    let {left, min, max, minSize, maxSize, sort, data, top, bottom, height} = item;
                
                    if(data instanceof Array){
                        //data排序
                        data.sort((a, b)=>{
                            // if(sort == 'ascending'){
                            //     return a.value - b.value;
                            // } else if(sort == 'descending'){
                                return b.value - a.value;
                            // }
                        })
                    }
                    if(sort == 'ascending'){
                        //升序
                        max = max || data[data.length -1].value;
                        min = (min || min == 0) ? min : data[0].value;
                    } else if(sort == 'descending'){
                       //降序
                        max = max || data[0].value;
                        min = (min || min == 0) ? min : data[data.length -1].value; 
                    }
                    item.minSize = (minSize.replace('%', '') / 100 * width) || 0;
                    item.maxSize = (maxSize.replace('%', '') / 100 * width) || 0;
                    item.left = (left.replace('%', '') / 100 * width) || 0;
                    item.top = top || 0;
                    item.bottom = bottom || 0;
                    item.height = height || 0;
                    item.intervalSize = (max - min) / ((item.maxSize - item.minSize) || 1) ;
                    return item;
                }) 
            } catch(error){
                console.log(error);
            }
        }
        return newSeries;
    }
    componentDidMount(){
       this.getFunnelPath();
    }
    getFunnelPath = ()=>{
        let {width, height, option, color} = this.state;
        let {series} = option;
        let containerHeight = height; //设备宽度
        let multiPath = series.map((item, index)=>{
            //绘图
            let {data, gap, left, top, intervalSize, 
                height, bottom, min, minSize, sort, max, maxSize} = item
            let itemHeight = (height - (data.length - 1) * gap) / data.length; //计算每个item的高度
            if(height == 0){
                itemHeight = (containerHeight - top - bottom - (data.length - 1) * gap) / data.length;
            }
            let itemPath = [];
            
            let pathStart = [left, top];
            if(sort == 'ascending'){
                //升序从下网上画
                pathStart = [left, containerHeight - bottom];
                itemHeight = -itemHeight;
                gap = -gap;
                
            }
            itemPath = data.map((obj, key)=>{
                let {value} = obj;
                let secondPoint = [], thirdPoint = [], fourthPoint = [];
                
                secondPoint = [pathStart[0] + value * intervalSize + minSize, pathStart[1]];
                if((key + 1) >= data.length){
                    //最后一个
                    thirdPoint =  [(pathStart[0] + secondPoint[0]) / 2 + minSize / 2, pathStart[1] + itemHeight];
                    fourthPoint = [thirdPoint[0] - minSize, thirdPoint[1]];
                }else{
                    //其他
                    thirdPoint =  [secondPoint[0] - ((value - data[key+1].value ) * intervalSize) / 2 , pathStart[1] + itemHeight];
                    fourthPoint = [thirdPoint[0] - (data[key +1].value * intervalSize + minSize), thirdPoint[1]]
                }
                let path = new Path().moveTo(pathStart[0], pathStart[1])
                                 .lineTo(secondPoint[0], pathStart[1])
                                 .lineTo(thirdPoint[0], thirdPoint[1])
                                 .lineTo(fourthPoint[0], fourthPoint[1])
                                 .close()
              
                pathStart = [fourthPoint[0], fourthPoint[1] + gap];
                return path;
            })
            
            return { path: itemPath }
        })

        this.setState({
            multiPath
        })
    }

    render(){
        const { width, height, option, multiPath, color} = this.state;
        return(<View  style={{width: width, height: height}}>
            <Surface width={width} height={height}
                style={{}}
            >
                {
                    this.state.multiPath.map((item, key)=>{
                        return ((item && item.path) || []).map((val, index)=>{
                            return (<Shape
                                d={val}  
                                fill={color[index] || this.defaultColor[index % 2]}
                                key={'funnel-shape'+index}
                                strokeWidth={4} key={'full-img-' + index}
                            />)
                        })
                    })
                }
            </Surface>
        </View>)
    }
}
            
