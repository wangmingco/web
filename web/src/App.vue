<template>
  <div id="app">
    <!-- 国债利率 -->
    <!-- <HeatmapCartesian title="国债利率" :data="bondData"/> -->
    <LineStack title="国债利率" :data="bondData"/>
    
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
import LineStack from './components/LineStack.vue'
import CandlestickLarge from './components/CandlestickLarge.vue'
// import HeatmapCartesian from './components/HeatmapCartesian.vue'

export default {
  name: 'App',
  components: {
    LineStack,
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
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      fetch('/stock').then(response => {
        return response.json(); // 解析 JSON 数据
      }).then(data => {
        this.stockData = data; // 假设你有一个 data 属性来存储数据
      }).catch(error => {
        console.error('There was a problem with the fetch /stock operation:', error);
      });

      fetch('/gold').then(response => {
        return response.json(); // 解析 JSON 数据
      }).then(data => {
        this.goldData = data; // 假设你有一个 data 属性来存储数据
      }).catch(error => {
        console.error('There was a problem with the fetch /gold operation:', error);
      });

      fetch('/bitcoin').then(response => {
        return response.json(); // 解析 JSON 数据
      }).then(data => {
        this.bitcoinData = data; // 假设你有一个 data 属性来存储数据
      }).catch(error => {
        console.error('There was a problem with the fetch /bitcoin operation:', error);
      });

      fetch('/forex').then(response => {
        return response.json(); // 解析 JSON 数据
      }).then(data => {
        this.forexData = data; // 假设你有一个 data 属性来存储数据
      }).catch(error => {
        console.error('There was a problem with the fetch /forex operation:', error);
      });

      fetch('/bond').then(response => {
        return response.json(); // 解析 JSON 数据
      }).then(data => {
        this.bondData = data; // 假设你有一个 data 属性来存储数据
      }).catch(error => {
        console.error('There was a problem with the fetch /bond operation:', error);
      });

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
