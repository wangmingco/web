<template>
  <div id="app">
    <!-- 国债利率 -->
    <!-- <HeatmapCartesian/> -->
    
    <!-- 上证指数 -->
    <CandlestickLarge title="上证指数" :data="stockData"/>

    <!-- 黄金指数 -->
    <CandlestickLarge title="黄金趋势" :data="goldData"/>

    <!-- 外汇指数 -->
    <CandlestickLarge title="外汇趋势" :data="forexData"/>
    
    <!-- 比特币指数 -->
    <CandlestickLarge title="比特币趋势" :data="bitcoinData"/>

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
      goldData: [],
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
      
      this.stockData = await this.fetchData('/stock')
      this.goldData = await this.fetchData('/gold')
      this.bitcoinData = await this.fetchData('/bitcoin')
      this.forexData = await this.fetchData('/forex')
    },
    async fetchData(path) {
      const resp = await fetch(path)
      return await resp.json()
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
