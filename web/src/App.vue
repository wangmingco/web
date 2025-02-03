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
      const stockData = this.getItem('stockData')
      if (stockData === null || stockData === undefined) {
        fetch('/stock').then(response => {
          return response.json();
        }).then(data => {
          this.stockData = data; // 解析 JSON 数据
          this.setItem('stockData', data)
        }).catch(error => {
          console.error('There was a problem with the fetch /stock operation:', error);
        });
      } else {
        this.stockData = stockData
      }


      const goldData = this.getItem('goldData')
      if (goldData === null || goldData === undefined) {
        fetch('/gold').then(response => {
          return response.json();
        }).then(data => {
          this.goldData = data; // 解析 JSON 数据
          this.setItem('goldData', data)
        }).catch(error => {
          console.error('There was a problem with the fetch /gold operation:', error);
        });
      } else {
        this.goldData = goldData
      }


      const bitcoinData = this.getItem('bitcoinData')
      if (bitcoinData === null || bitcoinData === undefined) {
        fetch('/bitcoin').then(response => {
          return response.json();
        }).then(data => {
          this.bitcoinData = data; // 解析 JSON 数据
          this.setItem('bitcoinData', data)
        }).catch(error => {
          console.error('There was a problem with the fetch /bitcoin operation:', error);
        });
      } else {
        this.bitcoinData = bitcoinData
      }


      const forexData = this.getItem('forexData')
      if (forexData === null || forexData === undefined) {
        fetch('/forex').then(response => {
          return response.json();
        }).then(data => {
          this.forexData = data; // 解析 JSON 数据
          this.setItem('forexData', data)
        }).catch(error => {
          console.error('There was a problem with the fetch /forex operation:', error);
        });
      } else {
        this.forexData = forexData
      }


      const bondData = this.getItem('bondData')
      if (bondData === null || bondData === undefined) {
        fetch('/bond').then(response => {
          return response.json();
        }).then(data => {
          this.bondData = data; // 解析 JSON 数据
          this.setItem('bondData', data)
        }).catch(error => {
          console.error('There was a problem with the fetch /bond operation:', error);
        });
      } else {
        this.bondData = bondData
      }

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
      
      console.log('存储数据', key, item)
      localStorage.setItem(key, JSON.stringify(item));
    },
    getItem(key) {
      const itemStr = localStorage.getItem(key);
      if (!itemStr) {
        console.log('没有找到数据', key)
        return null; // 没有找到数据
      }

      const item = JSON.parse(itemStr);
      const now = new Date().getTime(); // 当前时间戳

      if (now > item.expiry) {
        console.log('数据已过期，清除数据', key)
        localStorage.removeItem(key); // 如果数据已过期，清除数据
        return null; // 返回 null 或其他默认值
      }
      
      console.log('数据未过期，返回值', key, item.value)
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
