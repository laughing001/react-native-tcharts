## 效果预览
![Radar](http://file.tapd.oa.com//tfl/pictures/201904/tapd_10019121_1555678813_64.png)
## Option参数
```js
const option = {
	name: '',
	legend: {},
	radius: 80,//最外层圆或环线半径
	splitNumber: 4,//环线数量,不传默认5
	shape: 'circle', //传polygon为多边形,不传默认是polygon
	startAngle: 120,//第一个轴线度数,不填默认0度,即x轴正向
	rich: {//用来标志轴文案的样式
        a: {
            color: '#2dcbc3',
            fontSize: 12,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily: "PingFangSC-Medium",
            fontWeight: 'bold'
        },
        b: {
            color: '#f55353',
            fontSize: 12,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily: "PingFangSC-Medium",
            fontWeight: 'bold'
        },
        c: {
            color: "#999999",
            fontSize: 12,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontFamily: "PingFangSC-Medium",
            fontWeight: 'bold'
        }
    },
	indicator: [{
		max: 100,
		min: 0,
		text: '{a:25/}{b:27}\n{c:助攻}'
	}, {
		max: 100,
		min: 0,
		text: '{a:53.7k/}{b:49.5k}\n{c:金钱}'
	}, {
		max: 100,
		min: 0,
		text: '{a:30/}{b:70}\n{c:视野}'
	}, {
		max: 100,
		min: 0,
		text: '{a:6/}{b:0}\n{c:推塔}'
	}, {
		max: 100,
		min: 0,
		text: '{a:0/}{b:0}\n{c:大龙}'
	}, {
		max: 100,
		min: 0,
		text: '{a:0/}{b:0}\n{c:小龙}'
	}],
	axisLine: {//轴线 指示器线
		show: true,
		lineStyle: {
			color: '#FF00FF',
			opacity: 0.5
		}
	},
	splitLine: {//圆形或环线样式
		show: true,
		lineStyle: {
			color: '#FF00FF',
			opacity: 0.5
		}
	},
	splitArea: {
		areaStyle: {}
	},
	series: [{
		data: [10, 60, 90, 40, 30, 60],
		itemStyle: {},
		lineStyle: {
			color: '#f55353'
		},
		areaStyle: {
			color: '#f55353',
			opacity: 0.5
		}
	}, {
		data: [20, 50, 80, 100, 30, 20],
		itemStyle: {},
		lineStyle: {
			color: '#30d9d0'
		},
		areaStyle: {
			color: '#30d9d0',
			opacity: 0.5
		}
	}]
};
```