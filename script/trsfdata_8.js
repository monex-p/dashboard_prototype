var chartDom_tc8 = document.getElementById('trsfdata_8');
var myChart_tc8 = echarts.init(chartDom_tc8);
var option_tc8;

$.get('https://monex-p.github.io/dashboard_prototype/data/transformed_count_list.json', function (count_list) {
    $.get('https://monex-p.github.io/dashboard_prototype/data/transformed_pd_list.json', function (pd_list) {
        $.get('https://monex-p.github.io/dashboard_prototype/data/transformed_column_list.json', function (column_list) {

            option_tc8 = {
                title: {
                    text: column_list[7],
                    left: 'center',
                    textStyle: { color: '#ffffff', fontSize: 15  }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer:{
                        type: 'shadow'
                    },
                    formatter: function (params){
                        return params[0].name + '<br/>' + "Pop: " + params[0].value + '<br/>' 
                        + "PD: " + params[1].value;
                    }
                },
                grid: {
                    left: '3%',
                    right: '3%',
                    top: '15%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        color: '#ffffff'
                    },
                    data: function () {
                        var list = [];
                        for (var i = 1; i <= count_list[7].length; i++) {
                            list.push("Group " + i);
                        } return list
                    }()
                },
                yAxis: [{
                    type: 'value',
                    splitLine: {
                        lineStyle: {
                            color: '#36344E'
                        },
                        show: true
                    },
                    axisLabel: {
                        color: '#ffffff'
                    }

                },
                {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLabel: { color: '#ffffff' }
                }],
                series: [{
                    data: count_list[7],
                    type: 'bar'
                },
                {
                    type: 'line',
                    data: pd_list[7],
                    yAxisIndex: 1
                }]
            };
            myChart_tc8.setOption(option_tc8);
        });
    });
});

option_tc8 && myChart_tc8.setOption(option_tc8);
