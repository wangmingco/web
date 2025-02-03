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
  watch: {
    stockData(val) {
      console.log('watch', val)
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      
      const resp = await fetch('/stock')
      console.log(resp)
      const data = await resp.json()
      console.log(data)
      this.stockData = data
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
