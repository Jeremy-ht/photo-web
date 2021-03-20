<template>
  <div class="home-container">

    <div class="container-item-hr">
      <svg @click="goHome()" t="1614784884047" class="icon" viewBox="0 0 1354 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="3317" width="200" height="200">
        <path
          d="M1271.741935 163.509677H1028.954839C951.329032 163.509677 919.948387 1.651613 839.019355 1.651613H487.225806c-54.503226 0-80.929032 161.858065-161.858064 161.858064H80.929032C36.335484 163.509677 0 199.845161 0 244.43871v698.632258C0 987.664516 36.335484 1024 80.929032 1024h1189.161291c44.593548 0 80.929032-36.335484 80.929032-80.929032V244.43871c1.651613-44.593548-34.683871-80.929032-79.27742-80.929033zM677.16129 888.567742c-180.025806 0-325.367742-143.690323-325.367742-322.064516S497.135484 244.43871 677.16129 244.43871s325.367742 143.690323 325.367742 322.064516c-1.651613 178.374194-146.993548 322.064516-325.367742 322.064516z m391.432258-564.851613c-23.122581 0-41.290323-18.167742-41.290322-39.63871 0-23.122581 18.167742-39.63871 41.290322-39.638709s41.290323 18.167742 41.290323 39.638709c0 21.470968-18.167742 39.63871-41.290323 39.63871zM270.864516 82.580645c0-14.864516-11.56129-26.425806-26.425806-26.425806H163.509677c-14.864516 0-26.425806 11.56129-26.425806 26.425806v26.425807h135.432258c-1.651613 0-1.651613-11.56129-1.651613-26.425807zM677.16129 323.716129c-133.780645 0-242.787097 109.006452-242.787096 242.787097S541.729032 809.290323 677.16129 809.290323s242.787097-109.006452 242.787097-242.787097S810.941935 323.716129 677.16129 323.716129z"
          fill="#5a98de" opacity=".939" p-id="3318"></path>
      </svg>
    </div>

    <div style="display: flex;background-color: #ededed;">
      <div class="shopping-1">

        <div class="title">
          <h3 style="margin-left: 20px;font-weight: 400;">订单中心</h3>

          <div class="cart-table-title">
            <div class="name">商品信息</div>
            <div class="price1">单价</div>
            <div class="num">拍摄时间</div>
            <!--            <div class="subtotal">小计</div>-->
            <div class="operation">操作</div>
          </div>

          <div class="shopping-items">

            <div v-if="showList" class="shopping-item" v-for="item in cartList" :index="item.id">

              <div style="width: 640px;display: flex">

                <img @click="goDetailInfo(item.photoid)" :src="item.icon">

                <div class="name" @click="goDetailInfo(item.photoid)">
                  {{item.name}} {{ '(' + item.categoryname + '}'}}
                </div>
              </div>


              <div class="price">
                ￥ {{item.price}}
              </div>

              <div class="count">
                <i class="el-icon-time"/>{{' ' +item.phototime.substring(0,10)}}
              </div>


              <div class="delete">

                <el-link v-if="item.state == '' ||item.state == 0 || item.state == null ||item.state == undefined "
                         @click="commentG(item.photoid, item.type, item.orderid)" type="danger" style="margin-right: 12px">评论
                </el-link>
                <el-link v-if="item.state == 1" type="primary" style="margin-right: 12px">已评论</el-link>


                <el-link v-if="item.type == 1" @click="goPay(item.orderid)" type="danger">去支付</el-link>

                <el-link v-else type="primary">已支付</el-link>
              </div>
            </div>

          </div>

          <div v-if="!showList" style="color: #555555;text-align: center;
          margin-top: 100px;margin-bottom: 100px">
            订单为空
          </div>


        </div>

      </div>
    </div>


    <el-dialog title="评论" :visible.sync="showComment" width="40%" @close="closeAddAdminForm()">
      <span>
        <!--表单-->
        <el-form>
          <el-form-item>
            <el-input
              type="textarea"
              rows="4"
              maxlength="500"
              placeholder="请输入评论内容"
              v-model="comment"/>
          </el-form-item>
        </el-form>
      </span>

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addComment" size="mini">确 定</el-button>
        <el-button @click="showComment = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    delCart, getCartList, addComment, updOrder, getSceneryList, addOrder, disableComment
  } from '../../api/common'
  import '../../assets/iconfont/iconfont'

  export default {
    name: 'shopping',
    data() {

      return {
        activeIndex: '0',
        search: '',
        showLogin: false,
        showComment: false,

        UserInfo: {
          uname: '',
          image: '',
          phone: '',
          creatime: '',
          email: '',
          id: 0,
          loginway: 0,
          sex: '1'
        },

        // 分类
        cateList: [],

        // 切换页面数据
        otherList: [],
        showIndex: 1,

        // flower
        loginDialog: false,
        regDialog: false,
        comment: '',

        // 购物车
        checked: false,
        num: 1,
        countPay: 0,
        cartList: [],
        showList: true,
        totalPrice: 0,
        ids: [],

        // 订单
        showOrder: false,
        // 地址
        addressList: [],
        addressid: '',
        shoppingNum: 0,
        orderid: 0,
        commentId: 0

      }
    },
    created() {
      this.init()

    },
    methods: {
      // 初始化
      async init() {

        // 是否登录
        if (!this.loginIs()) {
          this.$message({message: '请先登录', type: 'error', duration: 1700})
          this.$router.push({path: `/pass/login`})
          return false
        }

        await getCartList(this.UserInfo.id).then(res => {
          if (res.success) {
            this.cartList = res.data.data
            console.log(this.cartList)
            if (res.data.data.length == 0) {
              this.showList = false
            }
          }
        })

      },

      // 是否登录
      loginIs() {
        // 是否登录
        let user = JSON.parse(window.localStorage.getItem('UserInfoPhone'))
        if (user == undefined || user == null || user == '') {
          return false
        } else {
          this.UserInfo = user
          return true
        }
      },

      async handleSelect(key, keyPath) {
        console.log(key)
        this.otherList = []
        let params = {
          pagenum: 1,
          pagesize: 100
        }
        await getSceneryList(params, key, 1, 0).then(res => {
          if (res.success) {
            this.otherList = res.data.data
          } else {
            this.$message({
              message: '数据获取失败,请刷新!',
              type: 'error', duration: 2000
            })
          }
        })

        if (key != 0) {
          window.localStorage.setItem('activeIndex', key)
          this.showIndex = 2
        } else {
          this.showIndex = 1
        }

      },

      commentG(id, type, orderid) {
        if (type === 1) {
          this.$message({message: '订单未支付', type: 'error', duration: 1700})
          return
        }
        this.comment = ''
        this.commentId = id
        this.orderid = orderid
        this.showComment = true

      },
      // 重置添加用户表单
      closeAddAdminForm() {

      },
      addComment() {
        let addCommentInfo = {
          userid: this.UserInfo.id,
          infoid: this.commentId,
          commentary: this.comment,
          orderid: this.orderid

        }
        addComment(addCommentInfo).then(res => {
          if (res.success) {
            this.$message({message: '评论成功', type: 'success', duration: 1700})
            this.showComment = false
            this.init()
          } else {
            this.$message({message: '评论失败', type: 'error', duration: 1700})
          }
        })


      },

      // 去首页
      goHome() {
        this.$router.push({path: `/home`})
      },

      // 去支付
      goPay(id) {
        // this.$router.push({path: `/home`})
        this.$confirm(`确定支付吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          // this.$message({message: '支付成功', type: 'success', duration: 1700})

          updOrder(id).then(res => {
            if (res.success) {
              this.init()
              this.$message({message: '支付成功', type: 'success', duration: 1700})
            } else {
              this.$message({message: '失败，请刷新', type: 'error', duration: 1700})
            }
          })
        })

      },


      // 去详情页
      goDetailInfo(id) {
        const {href} = this.$router.resolve({path: `/show/${id}`})
        window.open(href, '_blank')

      },

      submitOrder() {
        if (this.addressid == 0 || this.addressid == '') {
          this.$message({message: '请选择地址', type: 'error', duration: 1700})
          return false
        }

        let num = ''
        this.ids.forEach(item => {
          num += ',' + item
        })
        num = num.substring(1)
        let order = {
          'userid': this.UserInfo.id,
          'flowerid': this.addressid,
          'price': this.totalPrice,
          'name': num
        }

        addOrder(order).then(res => {
          if (res.success) {
            this.$message({message: '购买成功', type: 'success', duration: 2000})
            this.init()
            this.showOrder = false
          } else {
            this.$message({message: '购买失败，刷新再试', type: 'error', duration: 2000})

          }
        })

      },
      addressShow(id) {
        this.addressid = id

      },
      // 刪除商品
      delCart(id) {

        this.$confirm('是否确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCart(id).then(res => {

            if (res.success) {
              this.init()
            } else {
              this.$message({message: '删除失败，刷新再试', type: 'error', duration: 2000})

            }
          })
        })

      },
      checkboxBox(price, amount, id) {
        let temp = 0
        this.ids.forEach((item, index, array) => {
          if (id == item) {
            this.totalPrice -= price * amount
            this.ids.splice(index, 1)
            temp = 1
          }
        })
        if (temp == 1) {
          return false
        }

        this.ids.push(id)
        this.totalPrice += price * amount
      },


    }
  }
</script>

<style scoped>
  .home-container {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
    background-color: rgb(237, 237, 237);
  }


  /* ======= */
  /* 购物车  */
  /* ======= */
  .shopping {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    color: black
  }

  .shopping-items {
    width: 1200px;
    height: 100%;
    margin: 10px auto 100px auto;
    display: flex;
    flex-direction: column;
  }

  .shopping-item {
    width: 100%;
    height: 80px;
    border-top: solid 1px #d7d7d7;
    display: flex;
    margin-top: 20px;
    padding-top: 14px;
  }

  .shopping-item img {
    width: 60px;
    height: 70px;
    margin: auto 20px;
    cursor: pointer;
  }

  .shopping-item .name {
    margin: auto 20px;
    width: 300px;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline;
  }

  .shopping-item .name:hover {
    cursor: pointer;
    color: #5a98de;
  }

  .shopping-item .price {
    margin: auto 0;
    width: 120px;
    /*color: #ff6700;*/
    text-align: center;
    font-size: 16px;
    color: red;
  }

  .shopping-item .count {
    margin: auto 0;
    width: 166px;
    text-align: center;
    font-size: 14px;
  }

  .shopping-item .price-count {
    margin: auto 0;
    width: 130px;
    color: #ca141d;;
    font-size: 16px;
    text-align: center;
  }

  .shopping-item .delete {
    margin: auto 0 auto 70px;
    color: red;
    width: 118px;
    font-size: 20px;
    cursor: pointer;

  }

  /deep/ .el-checkbox__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #DCDFE6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
  }

  /deep/ .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #ff6700;
    border-color: #ff6700;
  }

  /deep/ .el-checkbox__inner:hover {
    border-color: #ff6700;
  }

  /deep/ .el-checkbox__inner::after {
    height: 9px;
    left: 6px;
  }

  /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
    border-color: #ff6700;
  }

  .pay {
    display: flex;
    justify-content: flex-end;
    width: 1000px;
    height: 100%;
    margin: 30px auto;
  }

  .total-price {
    padding-left: 13px;
    color: #d81e06;
    /*height: 50px;*/
    line-height: 50px;
  }

  .total-price em {
    font-style: normal;
    font-size: 30px;
  }

  .addressss {
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    text-align: center;
  }

  .my-address-item {
    width: 200px;
    height: 150px;
    border: solid 1px #cecece;
    margin-left: 10px;
    margin-top: 10px;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .my-address-item .uname {
    font-size: 16px;
    color: #333;
    font-style: normal;
    margin: 10px 20px;
  }

  .my-address-item .phone {
    margin: 10px 20px;
    /*line-height: 22px;*/
    color: #757575;
  }

  .my-address-item .addresss {
    margin: 6px 20px;
    color: #757575;
  }


  .shopping-1 {
    width: 1200px;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin: auto;
  }

  .shopping-1 .title {
    border: 1px solid #dcdcdc;
    margin: 30px auto;
    width: 100%;
    /*height: 60px;*/
    font-size: 18px;
    color: #3c3c3c;
    border-radius: 8px;
    background-color: #f4f4f4;
    border-bottom: 1px solid #d4d4d4;
    box-shadow: 0 1px 7px rgba(0, 0, 0, .06);
  }

  .cart-table-title {
    line-height: 38px;
    height: 38px;
    padding: 0 0 0 20px;
    font-size: 12px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-top: 1px solid #dbdbdb;
    border-bottom-color: rgba(0, 0, 0, .08);
    display: flex;
  }

  .cart-table-title .name {
    width: 600px;
  }

  .cart-table-title .operation {
    width: 230px;
    text-align: center;
  }

  .cart-table-title .subtotal {
    width: 130px;
    text-align: center;
  }

  .cart-table-title .num {
    width: 130px;
    text-align: center;
  }

  .cart-table-title .price1 {
    width: 150px;
    text-align: center;
  }

  .aaaaa {
    width: 130px;
    height: 50px;
    color: white;
    background-color: #6c8cd4;
  }

  /deep/ .el-button:focus, .el-button:hover {
    color: white;
    border-color: #6c8cd4;
    background-color: #6c8cd4;
  }


  .container-item-hr {
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
    width: 100%;
    height: 60px;
    background-color: black;
    display: flex;
  }

  .container-item-hr .icon {
    width: 40px;
    height: 30px;
    cursor: pointer;
    margin: auto 30px;
    color: black;
    line-height: 60px;
  }

  /deep/ .el-checkbox__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #aeb4c4;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 18px;
    height: 18px;
  }

  /*       */
  /* 计算  */
  /deep/ .el-input-number__decrease {
    left: 1px;
    border-radius: 4px 0 0 4px;
    border-right: 1px solid white;
  }

  /deep/ .el-input-number__decrease, .el-input-number__increase {
    position: absolute;
    z-index: 1;
    top: 1px;
    width: 40px;
    height: auto;
    text-align: center;
    background: white;
    color: #606266;
    cursor: pointer;
  }

  /deep/ input__inner:not(.is-disabled) {
    border-color: #5c81e3;
  }

  /deep/ .el-input-number__decrease:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled), .el-input-number__increase:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled) {
    border-color: #5c81e3;
  }

  /deep/ .el-input-number__increase {
    right: 1px;
    border-radius: 0 4px 4px 0;
    border-left: 1px solid white;
  }


  /deep/ .el-input-number__increase {
    position: absolute;
    z-index: 1;
    top: 1px;
    width: 40px;
    height: auto;
    text-align: center;
    background: white;
    color: #606266;
    cursor: pointer;
    font-size: 13px;
  }

  /deep/ .el-input__inner {
    border: 1px solid #5a98de;
  }

  .btn2ww2333 {
    background-color: #5a98de;
    text-align: right;
  }

  /deep/ .el-button--success:focus, .el-button--success:hover {
    background: #5a98de;
    border-color: #5a98de;
    color: #FFF;
  }

  /deep/ .el-button--success {
    color: #FFF;
    background-color: #5a98de;
    border-color: #5a98de;
  }
</style>
