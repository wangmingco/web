<template>
  <div>
    <div ref="chart" style="width: 100%; height: 600px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'HeatmapCartesian',
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  watch: {
    data(val) {
      console.log('HeatmapCartesian watch', val)
      this.initChart(val);
    }
  },
  methods: {
    initChart(val) {
      const myChart = echarts.init(this.$refs.chart);

      var option;

      // prettier-ignore
      const hours = val.dateArray;
      // prettier-ignore
      const days = [
        'm3', 'm6', 'y1','y2', 'y3', 'y5', 'y7', 'y10', 'y30'
      ];
      // prettier-ignore
      // const data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]
      //   .map(function (item) {
      //     return [item[1], item[0], item[2] || '-'];
      //   });
      const title = this.title + " " + val.dateArray[val.dateArray.length - 1]
      const data = val.dataArray;
      option = {
        tooltip: {
          position: 'top'
        },
        title: {
          text: title
        },
        grid: {
          height: '50%',
          top: '10%'
        },
        xAxis: {
          type: 'category',
          data: hours,
          splitArea: {
            show: true
          }
        },
        yAxis: {
          type: 'category',
          data: days,
          splitArea: {
            show: true
          }
        },
        visualMap: {
          min: 1,
          max: 3,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%'
        },
        series: [
          {
            name: '利率',
            type: 'heatmap',
            data: data,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };

      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }

      window.addEventListener('resize', myChart.resize);
    },



    generateOHLC(count) {
      let data = [];
      let xValue = +new Date(2011, 0, 1);
      let minute = 60 * 1000;
      let baseValue = Math.random() * 12000;
      let boxVals = new Array(4);
      let dayRange = 12;
      for (let i = 0; i < count; i++) {
        baseValue = baseValue + Math.random() * 20 - 10;
        for (let j = 0; j < 4; j++) {
          boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
        }
        boxVals.sort();
        let openIdx = Math.round(Math.random() * 3);
        let closeIdx = Math.round(Math.random() * 2);
        if (closeIdx === openIdx) {
          closeIdx++;
        }
        let volumn = boxVals[3] * (1000 + Math.random() * 500);
        // ['open', 'close', 'lowest', 'highest', 'volumn']
        // [1, 4, 3, 2]
        data[i] = [
          echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', (xValue += minute)),
          +boxVals[openIdx].toFixed(2),
          +boxVals[3].toFixed(2),
          +boxVals[0].toFixed(2),
          +boxVals[closeIdx].toFixed(2),
          +volumn.toFixed(0),
          getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4) // sign
        ];
      }
      return data;
      function getSign(data, dataIndex, openVal, closeVal, closeDimIdx) {
        var sign;
        if (openVal > closeVal) {
          sign = -1;
        } else if (openVal < closeVal) {
          sign = 1;
        } else {
          sign =
            dataIndex > 0
              ? // If close === open, compare with close of last record
              data[dataIndex - 1][closeDimIdx] <= closeVal
                ? 1
                : -1
              : // No record of previous, set to be positive
              1;
        }
        return sign;
      }
    }

  }
};
</script>