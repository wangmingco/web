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
          data: val.dateArray
        },
        yAxis: {
          type: 'value'
        },
        series: val.dataArray
      };

      if (option && typeof option === 'object') {
        this.myChart.setOption(option);
      }

    }

  }
};
</script>