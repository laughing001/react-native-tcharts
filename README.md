# react-native-tcharts
## 简介
react-native-tcharts是基于react native ART的图表组件库，完全跨平台，无依赖
## 安装

`$ npm install react-native-tcharts --save`

## 组件列表

- [Rect]()

- [Polygon]()

- [Circle]()

- [Ellipse]()

- [Radar]()

- [Pie]()

- [Line]()

- [Bar]()

- [Scatter]()

- [Funnel]()

## 图例
![](https://raw.githubusercontent.com/laughing001/react-native-tcharts/master/screen_shot/total.jpg)

## 通用属性
 *style*(object):同react native 组件style，会直接透传到组件容器元素上.
* *width* (number): 组件宽度,不传默认手机屏幕宽度.
* *height* (number): 组件高度,不传默认200
* *option* (object): 组件配置项,详情请点击各组件查看文档或直接查看example目录下对应的示例.

##组件参数

####Rect

- 参数


	| Props |   Type  | Required | Decription |

	| ----- | --------|--------- | ---------  |

	| style |  Object |    No    |Surface样式(暂支持backgroundColor)|

	| width |  Number,String |    No    |Surface宽度|

	| height|  Number,String |    No    |Surface高度|

- demo
###Polygon
###Circle
###Ellipse
###Radar
###Pie
###Line
###Bar
###Scatter
###Funnel

## Example

*run demo*

```
cd example
npm install
npm start
```

## License

react-native-tcharts is released under the MIT license.
