var chartDom = document.getElementById('gini_gauge_3');
var myChart = echarts.init(chartDom);
var option;

option = {
    title: {
        text: 'Existing Customers',
        left: 'center',
        bottom: '0%',
        textStyle: {color: '#ffffff'}
    },
    series: [{
        type: 'gauge',
        startAngle: 90,
        endAngle: 450,
        progress: {
            show: true,
            width: 25
        },
        radius: '70%',
        axisLine: {
            show: true,
            lineStyle: {
                width: 25,
                color: [[1,'#36344E']]
            }
        },
        axisTick: {
            show: false
        },
        splitLine: {
            length: 15,
            show: false
        },
        axisLabel: {
            distance: 25,
            show: false,
        },
        pointer: {
            show: false
        },
        detail: {
            valueAnimation: true,
            fontSize: 35,
            offsetCenter: [0, '0%'],
            formatter: '{value} %',
            color: '#ffffff'
        },
        data: [{
            value: 42
        }]
    }]
};

option && myChart.setOption(option);
