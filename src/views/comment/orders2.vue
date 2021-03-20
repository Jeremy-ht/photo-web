<template>
  <div class="app-container">
    <el-card class="box-card" shadow="hover">

      <!--表格-->
      <el-table :data="orderList" stripe style="width: 100%; margin-top: 10px" border size="small">
        <el-table-column label="#" type="index" align="center"/>
        <el-table-column label="订单号" prop="orderid" align="center"/>
        <el-table-column label="下单人" prop="uname" align="center"/>

        <el-table-column label="联系方式" prop="phone" align="center"/>
        <el-table-column label="门店选择" prop="categoryname" align="center"/>
        、

        <el-table-column label="拍摄时间" width="120px" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span style="margin-left: 10px">{{ scope.row.phototime.substring(0,10) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="价格" prop="price" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px;color: #ca141d;">{{ '￥ '+scope.row.price + '.00'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" width="170px" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span style="margin-left: 10px">{{ scope.row.creatime }}</span>
          </template>
        </el-table-column>


        <el-table-column label="支付状态" prop="type" align="center">
          <template slot-scope="scope">
            <span><el-tag type="danger">未支付</el-tag></span>
          </template>
        </el-table-column>


      </el-table>


      <!--分页-->
      <page-bar :pageTotal="pageTotal" :pageNum="pagenum" :pageSize="pagesize"
                @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"/>

    </el-card>

  </div>
</template>

<script>
  import {getOrderList, getCommentList, disableComment, addComment} from '../../api/common'
  import PageBar from '@/components/PageBar'

  export default {
    name: 'orders2',
    data() {
      return {
        // 分页查询
        pagenum: 1,
        pagesize: 10,
        pageTotal: 0,

        orderList: [],
        categoryList: []

      }
    },
    components: {
      PageBar

    },
    created() {
      this.getCommonList()

    },
    methods: {
      // 初始化
      getCommonList() {

        let params = {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
        getOrderList(params).then(res => {
          if (res.success) {
            // this.pageTotal = res.data.pageTotal
            // this.orderList = res.data.data

            this.orderList = res.data.data.filter(
              item => item.type === 1
            )

            this.pageTotal = this.orderList.length

          }
        })

      },

      // 分页
      handleSizeChange(pagesize) {
        this.pagesize = pagesize
        this.getCommonList()
      },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum
        this.getCommonList()
      },

    }
  }
</script>

<style scoped>

</style>
