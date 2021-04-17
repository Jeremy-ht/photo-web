<template>
  <div class="app-container">
    <el-card class="box-card" shadow="hover">


      <el-input placeholder="请输入内容" v-model="input2" style="width: 300px;float: right;margin-bottom: 20px">
        <template slot="append">
          <el-button @click="search" slot="append" icon="el-icon-search" type="warning">搜索</el-button>
        </template>
      </el-input>


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
            <span v-if="scope.row.type === 1"><el-tag type="danger">未支付</el-tag></span>
            <span v-else-if="scope.row.type === 2"><el-tag type="info">已支付</el-tag></span>

            <span v-else-if="scope.row.state === 0"><el-tag type="warning">未评论</el-tag></span>
            <span v-else-if="scope.row.state === 1"><el-tag type="info">已评论</el-tag></span>
          </template>
        </el-table-column>


        <el-table-column label="订单评论状态" prop="type" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 0"><el-tag type="warning">未评论</el-tag></span>
            <span v-else-if="scope.row.state === 1"><el-tag type="info">已评论</el-tag></span>
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
    name: 'orders',
    data() {
      return {
        // 分页查询
        pagenum: 1,
        pagesize: 10,
        pageTotal: 0,

        orderList: [],
        categoryList: [],
        input2: '',

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
          pagesize: this.pagesize,
          text: this.input2
        }
        getOrderList(params).then(res => {
          if (res.success) {
            this.pageTotal = res.data.pageTotal
            this.orderList = res.data.data

          }
        })

      },

      search() {
        if (this.input2 == '') {
          this.$message({message: '请输入需要搜索的门店', type: 'error', duration: 2000})
          return
        }

        this.getCommonList()
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

  /deep/ .el-input-group__append button.el-button, .el-input-group__append div.el-select .el-input__inner, .el-input-group__append div.el-select:hover .el-input__inner, .el-input-group__prepend button.el-button, .el-input-group__prepend div.el-select .el-input__inner, .el-input-group__prepend div.el-select:hover .el-input__inner {
    border-color: transparent;
    background-color: rgb(255, 128, 64);
    color: white;
    border-top: 0;
    border-bottom: 0;
  }
</style>
