var chartDom_rc8 = document.getElementById('rawdata_8');
var myChart_rc8 = echarts.init(chartDom_rc8);
var option_rc8;

$.get('https://lilybabe.github.io/dashboard_prototype/data/raw_count_list.json', function (count_list) {
    $.get('https://lilybabe.github.io/dashboard_prototype/data/raw_pd_list.json', function (pd_list) {
        $.get('https://lilybabe.github.io/dashboard_prototype/data/distribution_column_list.json', function (column_list) {

            option_rc8 = {
                title: {
                    text: column_list[7],
                    left: 'center',
                    textStyle: { color: '#ffffff', fontSize: 15 }
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
                        for (var i = 1; i <= count_list[7].length; i++) {
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
                    data: count_list[7],
                    type: 'bar'
                },
                {
                    type: 'line',
                    data: pd_list[7],
                    yAxisIndex: 1
                }]
            };
            myChart_rc8.setOption(option_rc8);
        });
    });
});

option_rc8 && myChart_rc8.setOption(option_rc8);