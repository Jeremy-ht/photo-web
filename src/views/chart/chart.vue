<template>
  <div class="container">
    <div id="main" style="width:800px;height: 540px;">

    </div>
  </div>
</template>

<script>
  import * as echart from 'echarts'
  import {getEchartsCategory, getEchartsOrder} from '../../api/common'

  export default {
    name: 'chart',
    data() {
      return {
        charts: '',
        opinionData: []
      }
    },
    mounted() {
      this.initEcharts()
    },

    methods: {
      async initEcharts() {
        await getEchartsOrder().then(res => {
          if (res.success) {
            this.opinionData = res.data.data
            console.log(this.opinionData)
          }
        })

        let myChart = echart.init(document.getElementById('main'))
        // 绘制图表
        myChart.setOption(
          {
            title: {
              text: '2021年度月总销售订单',
              left: 'left',
              textStyle: {
                color: '#FF8040'
              }
            },
            xAxis: {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月',
                '8月', '9月', '10月', '11月', '12月']
            },
            yAxis: {
              type: 'value',
              boundaryGap: [0, 1]
            },
            series: [{
              data: this.opinionData,
              type: 'bar'
            }]

          })

      }
    }
  }
</script>

<style scoped>
  .container {
    display: flex;
  }

  #main {
    margin: 20px auto;
  }
</style>
