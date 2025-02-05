<template>
  <div id="app">
    <div class="titleContainer">
      <div class="conditionContainer">
        <el-radio v-model="year" label="1">一年</el-radio>
        <el-radio v-model="year" label="5">五年</el-radio>
        <el-radio v-model="year" label="10">十年</el-radio>
      </div>
      <div>
        <el-button type="info" plain @click="clearItems" size="mini">清除缓存</el-button>
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
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      const stockData = this.getItem('stockData-'+ this.year)
      if (stockData === null || stockData === undefined) {
        fetch('/requestData/stock/' + this.year).then(response => {
          return response.json();
        }).then(data => {
          this.stockData = data; // 解析 JSON 数据
          this.setItem('stockData-'+ this.year, data)
        }).catch(error => {
          console.error('There was a problem with the fetch /stock operation:', this.year, error);
          this.stockData = null
        });
      } else {
        this.stockData = stockData
      }


      const goldData = this.getItem('goldData-'+ this.year)
      if (goldData === null || goldData === undefined) {
        fetch('/requestData/gold/' + this.year).then(response => {
          return response.json();
        }).then(data => {
          this.goldData = data; // 解析 JSON 数据
          this.setItem('goldData-'+ this.year, data)
        }).catch(error => {
          console.error('There was a problem with the fetch /gold operation:', this.year, error);
          this.goldData = null
        });
      } else {
        this.goldData = goldData
      }


      const bitcoinData = this.getItem('bitcoinData-'+ this.year)
      if (bitcoinData === null || bitcoinData === undefined) {
        fetch('/requestData/bitcoin/' + this.year).then(response => {
          return response.json();
        }).then(data => {
          this.bitcoinData = data; // 解析 JSON 数据
          this.setItem('bitcoinData-'+ this.year, data)
        }).catch(error => {
          console.error('There was a problem with the fetch /bitcoin operation:', this.year, error);
          this.bitcoinData = null
        });
      } else {
        this.bitcoinData = bitcoinData
      }


      const forexData = this.getItem('forexData-'+ this.year)
      if (forexData === null || forexData === undefined) {
        fetch('/requestData/forex/' + this.year).then(response => {
          return response.json();
        }).then(data => {
          this.forexData = data; // 解析 JSON 数据
          this.setItem('forexData-'+ this.year, data)
        }).catch(error => {
          console.error('There was a problem with the fetch /forex operation:', this.year, error);
          this.forexData = null
        });
      } else {
        this.forexData = forexData
      }


      const bondData = this.getItem('bondData-'+ this.year)
      if (bondData === null || bondData === undefined) {
        fetch('/requestData/bond/' + this.year).then(response => {
          return response.json();
        }).then(data => {
          this.bondData = data; // 解析 JSON 数据
          this.setItem('bondData-'+ this.year, data)
        }).catch(error => {
          console.error('There was a problem with the fetch /bond operation:', this.year, error);
          this.bondData = null
        });
      } else {
        this.bondData = bondData
      }

    },

    clearItems() {
      localStorage.removeItem('stockData-1');
      localStorage.removeItem('goldData-1');
      localStorage.removeItem('bitcoinData-1');
      localStorage.removeItem('forexData-1');
      localStorage.removeItem('bondData-1');
      
      localStorage.removeItem('stockData-5');
      localStorage.removeItem('goldData-5');
      localStorage.removeItem('bitcoinData-5');
      localStorage.removeItem('forexData-5');
      localStorage.removeItem('bondData-5');

      
      localStorage.removeItem('stockData-10');
      localStorage.removeItem('goldData-10');
      localStorage.removeItem('bitcoinData-10');
      localStorage.removeItem('forexData-10');
      localStorage.removeItem('bondData-10');
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
