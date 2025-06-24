export const lineOpt = {
    grid: {
        left: 24,
        right: 20,
        bottom: 24,
        containLabel: true
    },
    yAxis: {
        type: 'value',
        offset: 12,
        axisTick: { show: false },
        splitLine: {
            lineStyle: {
                type: 'dashed',
                color: '#DDE0EE'
            }
        },
        axisLabel: { color: '#B3B8D0' }
    },
    xAxis: {
        type: 'category',
        offset: 12,
        boundaryGap: ['10%', '10%'],
        axisLabel: { color: '#B3B8D0' },
        axisTick: { show: false },
        axisLine: { show: false }
    },
    tooltip: {
        trigger: 'axis',
        formatter: (parmas: any) =>
            !isNaN(parmas?.[0]?.data?.[1]) ? parmas?.[0]?.data?.[1] : 'N/A',
        textStyle: { color: '#fff' },
        backgroundColor: '#005DFF',
        borderWidth: 0,
        padding: [8, 16],
        extraCssText: 'z-index:2'
    },
    series: [
        {
            name: 'Set1',
            type: 'line',
            label: {
                color: 'red'
            },
            itemStyle: { color: '#005DFF' },
            animationDuration: 2800,
            animationEasing: 'quadraticOut',
            showSymbol: false,
            symbolSize: 14,
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: 'rgba(65, 127, 243, 0.22)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(65, 93, 243, 0)'
                        }
                    ],
                    global: false
                }
            },
            data: []
        }
    ]
}