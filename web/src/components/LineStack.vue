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
  methods: {
    initChart(val) {
      const myChart = echarts.init(this.$refs.chart);

      var option = {
        title: {
          text: this.title
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [ 'm3', 'm6', 'y1','y2', 'y3', 'y5', 'y7', 'y10', 'y30']
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: val.dataArray
      };

      if (option && typeof option === 'object') {
        myChart.setOption(option);
      }

      window.addEventListener('resize', myChart.resize);
    }

  }
};
</script>