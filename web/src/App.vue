<template>
  <div id="app">
    <div class="titleContainer">
      <div class="conditionContainer">
        <el-radio v-model="year" label="1">一年</el-radio>
        <el-radio v-model="year" label="5">五年</el-radio>
        <el-radio v-model="year" label="10">十年</el-radio>
      </div>
      <div>
        <el-button type="info" plain @click="clearItems" size="mini"
          style="opacity: 0; border: 1px solid transparent;background-color: transparent;cursor: pointer;">清除缓存</el-button>
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
import * as echarts from 'echarts';
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
      mockData: [],
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
  created() {
    this.mockData = this.generateOHLC(3560)
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
        fetch('/requestData/'+ type + '/' + this.year).then(response => {
          if (!response.ok) {
            this.setData(type, this.mockData)
            return null
          }
          return response.json();
        }).then(data => {
          if (data === null) {
            return
          }
          this.setData(type, data);
          this.setItem(type + '-' + this.year, data)
        }).catch(error => {
          console.error('There was a problem with the fetch  operation:', type, this.year, error);
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
    },

    generateOHLC(count) {
      let data = [];
      let xValue = +new Date(2011, 0, 1);
      let minute = 60 * 1000;
      let baseValue = Math.random() * 12000;
      let boxVals = new Array(4);
      let dayRange = 12;
      for (let i = 0; i < count; i++) {
        baseValue = baseValue + Math.random() * 20 - 10;
        for (let j = 0; j < 4; j++) {
          boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
        }
        boxVals.sort();
        let openIdx = Math.round(Math.random() * 3);
        let closeIdx = Math.round(Math.random() * 2);
        if (closeIdx === openIdx) {
          closeIdx++;
        }
        let volumn = boxVals[3] * (1000 + Math.random() * 500);
        // ['open', 'close', 'lowest', 'highest', 'volumn']
        // [1, 4, 3, 2]
        data[i] = [
          echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', (xValue += minute)),
          +boxVals[openIdx].toFixed(2),
          +boxVals[3].toFixed(2),
          +boxVals[0].toFixed(2),
          +boxVals[closeIdx].toFixed(2),
          +volumn.toFixed(0),
          getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4) // sign
        ];
      }
      return data;
      function getSign(data, dataIndex, openVal, closeVal, closeDimIdx) {
        var sign;
        if (openVal > closeVal) {
          sign = -1;
        } else if (openVal < closeVal) {
          sign = 1;
        } else {
          sign =
            dataIndex > 0
              ? // If close === open, compare with close of last record
              data[dataIndex - 1][closeDimIdx] <= closeVal
                ? 1
                : -1
              : // No record of previous, set to be positive
              1;
        }
        return sign;
      }
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
