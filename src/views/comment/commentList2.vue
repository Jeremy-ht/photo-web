<template>
  <div class="app-container">
    <el-card class="box-card" shadow="hover">

      <!--表格-->
      <el-table :data="commonList" stripe style="width: 100%; margin-top: 10px" border size="small">
        <el-table-column label="#" type="index" align="center"/>
        <el-table-column label="套餐名称" prop="title" align="center"/>
        <el-table-column label="评论内容" prop="commentary" align="center"/>
        <el-table-column label="评论者" prop="uname" align="center"/>
        <el-table-column label="评论时间" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"/>
            <span style="margin-left: 10px">{{ scope.row.creatime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="240px">
          <template slot-scope="scope">
            <!--显示-->
            <el-button type="success" icon="el-icon-delete" size="mini"
                       @click="disableCommonBtn(scope.row.id, 1)">审核通过
            </el-button>

            <el-button type="danger" icon="el-icon-delete" size="mini"
                       @click="disableCommonBtn(scope.row.id, 2)">审核拒绝
            </el-button>

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
  import {getCommentList, disableComment, addComment} from '../../api/common'
  import PageBar from '@/components/PageBar'

  export default {
    name: 'commentList2',
    data() {
      return {
        // 分页查询
        pagenum: 1,
        pagesize: 8,
        pageTotal: 0,

        commonList: [],
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
        getCommentList(this.pagenum, this.pagesize, -1).then(res => {
          if (res.success) {
            this.pageTotal = res.data.pageTotal
            this.commonList = res.data.data
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

      // 显示
      ableCommonBtn(id) {
        this.$confirm('是否确定显示评论内容?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          disableComment(id, 1).then(res => {
            if (res.success) {
              this.getCommonList()
              this.$message({message: '评论已显示', type: 'success', duration: 1700})
            } else {
              this.$message({message: res.message, type: 'error', duration: 1700})
            }
          })
        })

      },

      // 隐藏
      disableCommonBtn(id, state) {
        let text = ''
        if (state === 1) {
          text = '通过'
        } else {
          text = '拒绝通过'
        }
        this.$confirm(`是否确定${text}这条评论内容?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          disableComment(id, state).then(res => {
            if (res.success) {
              this.getCommonList()
              this.$message({message: '成功', type: 'success', duration: 1700})
            } else {
              this.$message({message: '失败，请刷新', type: 'error', duration: 1700})
            }
          })
        })

      }

    }
  }
</script>

<style scoped>

</style>
