var chartDom_tc4 = document.getElementById('trsfdata_4');
var myChart_tc4 = echarts.init(chartDom_tc4);
var option_tc4;

$.get('https://lilybabe.github.io/dashboard_prototype/data/transformed_count_list.json', function (count_list) {
    $.get('https://lilybabe.github.io/dashboard_prototype/data/transformed_pd_list.json', function (pd_list) {
        $.get('https://lilybabe.github.io/dashboard_prototype/data/transformed_column_list.json', function (column_list) {

            option_tc4 = {
                title: {
                    text: column_list[3],
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
                    data: function () {
                        var list = [];
                        for (var i = 1; i <= count_list[3].length; i++) {
                            list.push(i);
                        } return list
                    }()
                },
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        color: '#ffffff'
                    }

                },
                {
                    type: 'value',
                    axisLabel: { color: '#ffffff' }
                }],
                series: [{
                    data: count_list[3],
                    type: 'bar'
                },
                {
                    type: 'line',
                    data: pd_list[3],
                    yAxisIndex: 1
                }]
            };
            myChart_tc4.setOption(option_tc4);
        });
    });
});

option_tc4 && myChart_tc4.setOption(option_tc4);