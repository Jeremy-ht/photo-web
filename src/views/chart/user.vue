<template>
  <div class="container">
    <div id="main" style="width: 1000px;height: 500px;">

    </div>
  </div>
</template>

<script>
  import * as echart from 'echarts'
  import {getEchartsUser, getEchartsCate} from '../../api/common'

  export default {
    name: 'chart',
    data() {
      return {
        opinionData: []
      }
    },
    mounted() {
      this.initEcharts()
    },

    methods: {
      async initEcharts() {
        await getEchartsCate().then(res => {
          if (res.success) {
            this.opinionData = res.data.data
            console.log(this.opinionData)
          }
        })

        let myChart = echart.init(document.getElementById('main'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '2021年度各门店销售额',
            left: 'center',
            textStyle: {
              color: '#FF8040'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              name: '销售额',
              type: 'pie',
              radius: '50%',
              data: this.opinionData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
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
