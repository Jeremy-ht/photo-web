<template>
  <div class="app-container">
    <el-card class="box-card" shadow="hover">

      <!--表格-->
      <el-table :data="myDetailList" stripe style="width: 100%; margin-top: 10px" border size="small">

        <el-table-column label="#" type="index" align="center"/>
        <el-table-column label="套餐名称" prop="name" align="center"/>


        <el-table-column label="封面" prop="icon" align="center">
          <template slot-scope="scope">
            <img style="width: 70px;height: 80px" :src="scope.row.icon" alt="">
          </template>
        </el-table-column>


        <el-table-column label="套餐价格" prop="price" align="center" width="120px">
          <template slot-scope="scope">
            <span style="margin-left: 10px;color: #ca141d;">{{ '￥ '+scope.row.price + '.00'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="拍摄时长" prop="time" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.time + ' h'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="上架时间" align="center" width="170px">>
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.creatime}}</span>
          </template>
        </el-table-column>


        <el-table-column label="操作" align="center" width="100px">
          <template slot-scope="scope">
            <div style="color: red;cursor: pointer" @click="delDetailBtn(scope.row.id)">
              删除
            </div>
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
  import PageBar from '@/components/PageBar'
  import {getSceneryList, pullScenery2, delScenery, disableComment} from '../../api/common'

  export default {

    data() {
      return {
        activeName: 'first',
        adminInfo: {},

        // 分页查询
        pagenum: 1,
        pagesize: 8,
        pageTotal: 0,

        myDetailList: [],

      }
    },
    components: {
      PageBar

    },
    created() {
      this.getInit()

    },
    methods: {
      // 初始化
      async getInit() {

        let admin = JSON.parse(window.localStorage.getItem('AdminInfoPhoto'))
        if (admin == undefined || admin == null || admin == '') {
          this.$router.push('/login')
          this.$message({message: '请登录', type: 'error', duration: 1700})
          return
        } else {
          this.adminInfo = admin
        }

        let params = {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
        await getSceneryList(params).then(res => {
          this.myDetailList = []
          if (res.success && res.data.data.length != 0) {
            this.pageTotal = res.data.pageTotal
            this.myDetailList = res.data.data
          } else {
            this.$message({
              message: '获取列表失败，请刷新再试!',
              type: 'error', duration: 1700
            })
          }
        })

      },

      handleSizeChange(pagesize) {
        this.pagesize = pagesize
        this.getInit()
      },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum
        this.getInit()
      },

      updDetail(id) {
      },

      delDetailBtn(id) {
        this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delScenery(id).then(res => {

            if (res.success) {
              this.$message({message: '成功', type: 'success', duration: 1700})
              this.getInit()
            } else {
              this.$message({message: '删除失败', type: 'error', duration: 1700})

            }
          })
        })

      },

      changeState(id, state) {
        console.log(state)
        if (state == 1) {
          state = 3
        } else {
          state = 1
        }
        pullScenery2(id, state).then(res => {
          if (res.success) {
            this.getInit()
          } else {
            this.$message({message: '删除失败', type: 'error', duration: 1700})

          }
        })
      }

    }
  }
</script>

<style scoped>


</style>
