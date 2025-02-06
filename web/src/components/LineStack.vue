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
      this.initChart(val);
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

      const title = this.title + " " + val.dateArray[val.dateArray.length - 1]
      var option = {
        title: {
          text: title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['m3', 'm6', 'y1', 'y2', 'y3', 'y5', 'y7', 'y10', 'y30']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: val.dateArray
        },
        yAxis: {
          type: 'value',
          // 自定义 y 轴的最小值和最大值
          min: 0, // 设置最小值
          max: 5, // 设置最大值
          splitLine: {
            lineStyle: {
              type: 'solid' // solid: 实线, dotted: 点线, dashed: 虚线
            }
          }
        },
        series: val.dataArray
      };

      // 计算最大值和最小值
      // 提取所有银行的数据
      const allData = data.dataArray.m3
        .concat(data.dataArray.m5)
        .concat(data.dataArray.y1)
        .concat(data.dataArray.y2)
        .concat(data.dataArray.y3)
        .concat(data.dataArray.y5)
        ;

      // 提取所有数据点
      const allDataPoints = allData.map(item => item.data[0]);

      // 找到最大值和最小值
      const maxY = Math.max(...allDataPoints);
      const minY = Math.min(...allDataPoints);

      // 设置 y 轴范围
      option.yAxis.min = this.decreaseAndFloor(minY);
      option.yAxis.max = maxY;

      if (option && typeof option === 'object') {
        this.myChart.setOption(option);
      }

    },
    decreaseAndFloor(value) {
      // 数值减1后向下取整
      let result = Math.floor(value - 1);

      // 如果结果小于0，则返回0
      return result < 0 ? 0 : result;
    }

  }
};
</script>