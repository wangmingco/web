<template>
  <div>
    <div ref="chart" style="width: 100%; height: 600px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'CandlestickLarge',
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  watch: {
    data(val) {
      if (val == null) {
        this.initChart([{}]);
      } else {
        this.initChart(val);
      }
    }
  },
  data() {
    return {
      myChart: {}
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chart);
    window.addEventListener('resize', this.myChart.resize);
  },
  methods: {
    initChart(val) {
      if(!Array.isArray(val) || val.length === 0) {
        console.log('CandlestickLarge data error', typeof val, val)
        return
      }
      const upColor = '#ec0000';
      const upBorderColor = '#8A0000';
      const downColor = '#00da3c';
      const downBorderColor = '#008F28';
      const title = this.title + " " + val[val.length - 1][0]
      var option = {
        dataset: {
          source: val
        },
        title: {
          text: title
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line'
          }
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: false
            }
          }
        },
        grid: [
          {
            left: '10%',
            right: '10%',
            bottom: 200
          },
          {
            left: '10%',
            right: '10%',
            height: 80,
            bottom: 80
          }
        ],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            // inverse: true,
            axisLine: { onZero: false },
            splitLine: { show: false },
            min: 'dataMin',
            max: 'dataMax'
          },
          {
            type: 'category',
            gridIndex: 1,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            min: 'dataMin',
            max: 'dataMax'
          }
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: true
            }
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: 'inside',
            xAxisIndex: [0, 1],
            start: 10,
            end: 100
          },
          {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            bottom: 10,
            start: 10,
            end: 100
          }
        ],
        visualMap: {
          show: false,
          seriesIndex: 1,
          dimension: 6,
          pieces: [
            {
              value: 1,
              color: upColor
            },
            {
              value: -1,
              color: downColor
            }
          ]
        },
        series: [
          {
            type: 'candlestick',
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor
            },
            encode: {
              x: 0,
              y: [1, 4, 3, 2]
            }
          },
          {
            name: 'Volumn',
            type: 'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: '#7fbe9e'
            },
            large: true,
            encode: {
              x: 0,
              y: 5
            }
          }
        ]
      };

      if (option && typeof option === 'object') {
        this.myChart.setOption(option);
      }
    }


  }
};
</script>