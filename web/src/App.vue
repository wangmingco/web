<template>
  <div id="app">
    <div class="titleContainer">
      <div class="conditionContainer">
        <el-radio v-model="year" label="1">一年</el-radio>
        <el-radio v-model="year" label="5">五年</el-radio>
        <el-radio v-model="year" label="10">十年</el-radio>
      </div>
      <div>
        <el-button type="info" plain @click="clearItems" size="mini" style="opacity: 0; border: 1px solid transparent;background-color: transparent;cursor: pointer;">清除缓存</el-button>
      </div>
    </div>

    <div>

      <div style="margin-bottom: 10px;">
        <!-- 上证指数 -->
        <CandlestickLarge title="上证指数" :data="stockData" />
      </div>

      <div style="margin-bottom: 10px;">
        <!-- 黄金指数 -->
        <CandlestickLarge title="黄金趋势" :data="goldData" />
      </div>

      <div style="margin-bottom: 10px;">
        <!-- 外汇指数 -->
        <CandlestickLarge title="外汇趋势" :data="forexData" />
      </div>

      <div style="margin-bottom: 10px;">
        <!-- 比特币指数 -->
        <CandlestickLarge title="比特币趋势" :data="bitcoinData" />
      </div>

      <div style="margin-bottom: 10px;">
        <!-- 国债利率 -->
        <!-- <HeatmapCartesian title="国债利率" :data="bondData"/> -->
        <LineStack title="国债利率" :data="bondData" />
      </div>

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
      year: '5',
      bondData: [],
      stockData: [],
      goldData: [],
      forexData: [],
      bitcoinData: []
    }
  },
  watch: {
    year(val) {
      console.log(val)
      this.initData()
    },
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      this.requestData('stock')
      this.requestData('gold')
      this.requestData('bitcoin')
      this.requestData('forex')
      this.requestData('bond')
    },

    requestData(type) {
      const req = {
        type: type,
        year: this.year
      }
      const item = this.getItem(type + '-' + this.year)
      if (item === null || item === undefined) {
        fetch('/requestData/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req)
        }).then(response => {
          return response.json();
        }).then(data => {
          this.setData(type, data); 
          this.setItem(type + '-' + this.year, data)
        }).catch(error => {
          console.error('There was a problem with the fetch  operation:', type, this.year, error);
          this.setData(type, null)
        });
      } else {
        this.setData(type, item)
      }
    },
    setData(type, data) {
      switch (type) {
        case 'bitcoin': {
          this.bitcoinData = data
          break
        }
        case 'forex': {
          this.forexData = data
          break
        }
        case 'gold': {
          this.goldData = data
          break
        }
        case 'stock': {
          this.stockData = data
          break
        }
        case 'bond': {
          this.bondData = data
          break
        }
      }
    },
    clearItems() {
      localStorage.clear()
      console.log('localStorage clear')
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
