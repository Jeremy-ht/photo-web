<template>
  <div class="home-container">

    <div class="home-container-item">


      <div class="item-one">
        <div id="main1" style="width: 600px;height: 480px;">

        </div>
      </div>


      <div class="item-two">
        <div id="main" style="width:600px;height: 480px;">

        </div>
      </div>


    </div>

  </div>
</template>

<script>
  import * as echart from 'echarts'
  import {getEchartsCate, getEchartsCategory, getEchartsOrder} from '../../api/common'

  export default {
    name: 'dashboard',
    data() {
      return {
        charts: '',
        opinionData: [],
        opinionData2: []
      }
    },
    mounted() {
      this.initEcharts()
    },

    methods: {
      async initEcharts() {
        await getEchartsOrder().then(res => {
          if (res.success) {
            this.opinionData = []
            this.opinionData = res.data.data
          }
        })

        let myChart = echart.init(document.getElementById('main'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '2021年度月总销售订单',
            left: 'center',
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

        await getEchartsCate().then(res => {
          if (res.success) {
            this.opinionData = res.data.data
            console.log(this.opinionData)
          }
        })

        let myChart1 = echart.init(document.getElementById('main1'))
        // 绘制图表
        myChart1.setOption({
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
              right: 20,
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
  .home-container {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
  }

  .home-container-item {
    width: 100%;
    height: 600px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .item-one {
    background-color: #f3f3f3;
    border-radius: 6px;
    margin-top: 30px;
    padding: 20px 0;
  }

  .item-two {
    background-color: #f3f3f3;
    border-radius: 6px;
    margin-top: 30px;
    margin-left: 40px;
    padding: 20px 0;

  }

  .item-one:hover {
    -moz-box-shadow:2px 2px 10px #06c;
    -webkit-box-shadow:2px 2px 10px #06c;
    box-shadow:2px 2px 10px #06c;
  }

  .item-two:hover {
    -moz-box-shadow:2px 2px 10px #06c;
    -webkit-box-shadow:2px 2px 10px #06c;
    box-shadow:2px 2px 10px #06c;
  }

</style>
