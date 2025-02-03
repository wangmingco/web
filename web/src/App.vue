<template>
  <div id="app">
    <!-- 国债利率 -->
    <!-- <HeatmapCartesian/> -->
    
    <!-- 上证指数 -->
    <CandlestickLarge title="上证指数" :data="stockData"/>

    <!-- 黄金指数 -->
    <!-- <CandlestickLarge/> -->

    <!-- 外汇指数 -->
    <!-- <CandlestickLarge/> -->
    
    <!-- 比特币指数 -->
    <!-- <CandlestickLarge/> -->

  </div>
</template>

<script>
import CandlestickLarge from './components/CandlestickLarge.vue'
// import HeatmapCartesian from './components/HeatmapCartesian.vue'

export default {
  name: 'App',
  components: {
    CandlestickLarge,
    // HeatmapCartesian
  },
  data() {
    return {
      bondData: [],
      stockData: [],
      goldkData: [],
      forexData: [],
      bitcoinData: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      fetch('/stock').then(response => {
        console.log('stock resp ', response)
        return response.json();
      }).then(data => {
        console.log('stock data ', data)
        this.stockData = data;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
