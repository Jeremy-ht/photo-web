<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageNum"
    :page-sizes="[10, 15, 20]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pageTotal">
  </el-pagination>
<!--  <el-pagination-->
<!--    background-->
<!--    @size-change="handleSizeChange"-->
<!--    @current-change="handleCurrentChange"-->
<!--    :current-page="pageNum"-->
<!--    :page-sizes="[5, 8, 15, 20]"-->
<!--    :page-size="pageSize"-->
<!--    layout="total, sizes, prev, pager, next, jumper"-->
<!--    :total="pageTotal">-->
<!--  </el-pagination>-->
</template>

<script>
  export default {
    name: 'PageBar',
    props: {
      pageTotal: {
        type: Number,
        require: true
      },
      pageNum: {
        type: Number,
        require: true
      },
      pageSize: {
        type: Number,
        require: true
      }
    },
    methods: {
      handleSizeChange(newSize) {
        this.$emit('handleSizeChange', newSize)
      },
      handleCurrentChange(newNum) {
          this.$emit('handleCurrentChange', newNum)
      }
    }
  }
</script>

<style scoped>
  .el-pagination {
    float: right;
    margin-right: 10px;
    margin-top: 15px;
  }

  /deep/ .el-pagination__total {
    margin-right: 10px;
    font-weight: 500;
    color: black;
  }
  /deep/ .el-pagination__jump {
    margin-left: 24px;
    font-weight: 500;
    color: black;
  }
</style>
