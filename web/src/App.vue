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
      // this.bondData = fetch('https://api.vc89.online/bond')
      this.stockData = fetch('/stock')
      console.log('fetch ', this.stock)
      // this.goldkData = fetch('https://api.vc89.online/gold')
      // this.forexData = fetch('https://api.vc89.online/forex')
      // this.bitcoinData = fetch('https://api.vc89.online/bitcoin')
    },
    // generateOHLC(count) {
    //   let data = [];
    //   let xValue = +new Date(2011, 0, 1);
    //   let minute = 60 * 1000;
    //   let baseValue = Math.random() * 12000;
    //   let boxVals = new Array(4);
    //   let dayRange = 12;
    //   for (let i = 0; i < count; i++) {
    //     baseValue = baseValue + Math.random() * 20 - 10;
    //     for (let j = 0; j < 4; j++) {
    //       boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
    //     }
    //     boxVals.sort();
    //     let openIdx = Math.round(Math.random() * 3);
    //     let closeIdx = Math.round(Math.random() * 2);
    //     if (closeIdx === openIdx) {
    //       closeIdx++;
    //     }
    //     let volumn = boxVals[3] * (1000 + Math.random() * 500);
    //     // ['open', 'close', 'lowest', 'highest', 'volumn']
    //     // [1, 4, 3, 2]
    //     data[i] = [
    //       echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', (xValue += minute)),
    //       +boxVals[openIdx].toFixed(2),
    //       +boxVals[3].toFixed(2),
    //       +boxVals[0].toFixed(2),
    //       +boxVals[closeIdx].toFixed(2),
    //       +volumn.toFixed(0),
    //       this.getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4) // sign
    //     ];
    //   }
    //   console.log(data)
    //   return data;
    // },
    // getSign(data, dataIndex, openVal, closeVal, closeDimIdx) {
    //   var sign;
    //   if (openVal > closeVal) {
    //     sign = -1;
    //   } else if (openVal < closeVal) {
    //     sign = 1;
    //   } else {
    //     sign =
    //       dataIndex > 0
    //         ? // If close === open, compare with close of last record
    //         data[dataIndex - 1][closeDimIdx] <= closeVal
    //           ? 1
    //           : -1
    //         : // No record of previous, set to be positive
    //         1;
    //   }
    //   return sign;
    // }
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
