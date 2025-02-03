<template>
  <div id="app">
    <div class="titleContainer">
      <div class="conditionContainer">
        <el-radio v-model="radio" label="1">一年</el-radio>
        <el-radio v-model="radio" label="5">五年</el-radio>
        <el-radio v-model="radio" label="10">十年</el-radio>
      </div>
      <div>
        <el-button type="info" plain @click="clearItems" size="mini">清除缓存</el-button>
      </div>
    </div>

    <div>

      <!-- 上证指数 -->
      <CandlestickLarge title="上证指数" :data="stockData" />

      <!-- 黄金指数 -->
      <CandlestickLarge title="黄金趋势" :data="goldData" />

      <!-- 外汇指数 -->
      <CandlestickLarge title="外汇趋势" :data="forexData" />

      <!-- 比特币指数 -->
      <CandlestickLarge title="比特币趋势" :data="bitcoinData" />
      
      <!-- 国债利率 -->
      <!-- <HeatmapCartesian title="国债利率" :data="bondData"/> -->
      <LineStack title="国债利率" :data="bondData" />
      
    </div>


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
      radio: 5,
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
      this.stockData = this.getItem('stockData')
      if (this.stockData === null || this.stockData === undefined) {
        fetch('/stock').then(response => {
          this.stockData = response.json(); // 解析 JSON 数据
          this.setItem('stockData', this.stockData)
        }).catch(error => {
          console.error('There was a problem with the fetch /stock operation:', error);
        });
      }


      this.goldData = this.getItem('goldData')
      if (this.goldData === null || this.goldData === undefined) {
        fetch('/gold').then(response => {
          this.goldData = response.json(); // 解析 JSON 数据
          this.setItem('goldData', this.goldData)
        }).catch(error => {
          console.error('There was a problem with the fetch /gold operation:', error);
        });
      }


      this.bitcoinData = this.getItem('bitcoinData')
      if (this.bitcoinData === null || this.bitcoinData === undefined) {
        fetch('/bitcoin').then(response => {
          this.bitcoinData = response.json(); // 解析 JSON 数据
          this.setItem('bitcoinData', this.bitcoinData)
        }).catch(error => {
          console.error('There was a problem with the fetch /bitcoin operation:', error);
        });
      }


      this.forexData = this.getItem('forexData')
      if (this.forexData === null || this.forexData === undefined) {
        fetch('/forex').then(response => {
          this.forexData = response.json(); // 解析 JSON 数据
          this.setItem('forexData', this.forexData)
        }).catch(error => {
          console.error('There was a problem with the fetch /forex operation:', error);
        });
      }


      this.bondData = this.getItem('bondData')
      if (this.bondData === null || this.bondData === undefined) {
        fetch('/bond').then(response => {
          this.bondData = response.json(); // 解析 JSON 数据
          this.setItem('bondData', this.bondData)
        }).catch(error => {
          console.error('There was a problem with the fetch /bond operation:', error);
        });
      }


    },
    async fetchData(path) {
      const resp = await fetch(path)
      return await resp.json()
    },
    clearItems() {
      localStorage.removeItem('stockData');
      localStorage.removeItem('goldData');
      localStorage.removeItem('bitcoinData');
      localStorage.removeItem('forexData');
      localStorage.removeItem('bondData');
    },
    setItem(key, value) {
      const now = new Date().getTime(); // 当前时间戳
      const item = {
        value: value,
        expiry: now + 12 * 60 * 60 * 1000 // 过期时间 = 当前时间 + 过期时间（毫秒）
      };
      localStorage.setItem(key, JSON.stringify(item));
    },
    getItem(key) {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) {
        return null; // 没有找到数据
      }

      const item = JSON.parse(itemStr);
      const now = new Date().getTime(); // 当前时间戳

      if (now > item.expiry) {
        localStorage.removeItem(key); // 如果数据已过期，清除数据
        return null; // 返回 null 或其他默认值
      }

      return item.value; // 数据未过期，返回值
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

.titleContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.conditionContainer {
  display: flex;
  flex-direction: row;
}

</style>
