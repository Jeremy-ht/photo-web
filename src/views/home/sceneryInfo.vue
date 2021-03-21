<template>
  <div class="container">

    <div class="container-item-hr">
      <svg @click="goHome()" t="1614784884047" class="icon" viewBox="0 0 1354 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="3317" width="200" height="200">
        <path
          d="M1271.741935 163.509677H1028.954839C951.329032 163.509677 919.948387 1.651613 839.019355 1.651613H487.225806c-54.503226 0-80.929032 161.858065-161.858064 161.858064H80.929032C36.335484 163.509677 0 199.845161 0 244.43871v698.632258C0 987.664516 36.335484 1024 80.929032 1024h1189.161291c44.593548 0 80.929032-36.335484 80.929032-80.929032V244.43871c1.651613-44.593548-34.683871-80.929032-79.27742-80.929033zM677.16129 888.567742c-180.025806 0-325.367742-143.690323-325.367742-322.064516S497.135484 244.43871 677.16129 244.43871s325.367742 143.690323 325.367742 322.064516c-1.651613 178.374194-146.993548 322.064516-325.367742 322.064516z m391.432258-564.851613c-23.122581 0-41.290323-18.167742-41.290322-39.63871 0-23.122581 18.167742-39.63871 41.290322-39.638709s41.290323 18.167742 41.290323 39.638709c0 21.470968-18.167742 39.63871-41.290323 39.63871zM270.864516 82.580645c0-14.864516-11.56129-26.425806-26.425806-26.425806H163.509677c-14.864516 0-26.425806 11.56129-26.425806 26.425806v26.425807h135.432258c-1.651613 0-1.651613-11.56129-1.651613-26.425807zM677.16129 323.716129c-133.780645 0-242.787097 109.006452-242.787096 242.787097S541.729032 809.290323 677.16129 809.290323s242.787097-109.006452 242.787097-242.787097S810.941935 323.716129 677.16129 323.716129z"
          fill="#5a98de" opacity=".939" p-id="3318"></path>
      </svg>
    </div>

    <div class="info">

      <div class="info-show">

        <div class="info-show-img">
          <img class="imgs" :src="detailInfo.icon" alt="">
        </div>

        <div class="info-show-info">

          <p class="info-title">{{detailInfo.name}}</p>
          <div class="info-title-title">
            <div><span class="info-price-number1">￥<span
              class="info-price-number">{{detailInfo.price + '.00'}}</span></span>
            </div>
          </div>
          <div style="font-size: 14px;color: #555555;margin-top: 30px">
            拍摄所需时长: <span>{{detailInfo.time + ' 小时'}}</span>
          </div>

          <div class="info-btns">
            <div style="float: right">
              <!--              <div class="buySub hvr-shutter-out-horizontal" @click="addCart(detailInfo.id)">加购物车</div>-->
              <div class="buySub hvr-shutter-out-horizontal" @click="go(detailInfo.id)">立即预约</div>
            </div>

          </div>


        </div>

      </div>

    </div>

    <div style="width: 100%;height: 100%;background-color: #ededed;padding-top: 30px">
      <div class="person-show">

        <div class="person-show-right">
          <div class="person-show-right-div">
            <span>详情</span>
          </div>

          <div v-html="detailInfo.content" style="background: white" class="content">

          </div>
        </div>

      </div>
    </div>


    <div style="width: 100%;height: 100%;background-color: #ededed;padding-top: 30px">
      <div class="person-show">

        <!-- ========================= -->
        <!-- 评论 -->
        <!-- ========================= -->
        <div class="container-item-three">
          <div class="comment">
            <div class="comment-title">
              <div style="font-size: 24px;color: #FF7124">
                评论列表 <span style="font-size: 18px;color: #575757">{{'(' + countList + ' 条)'}} </span>
              </div>
            </div>

            <div class="comment-content">
              <div class="comment-content-item" v-for="item in commentList">
                <div class="comment-content-item-left">
                  <img class="login-img"
                       :src="item.image"/>
                </div>

                <div class="comment-content-item-right">
                  <div class="comment-content-name">
                    {{item.uname}}
                  </div>

                  <div class="comment-content-content">
                    {{item.commentary}}
                  </div>

                  <div class="comment-content-time">
                    {{item.creatime}}
                  </div>
                </div>
              </div>
              <div class="comment-content-bottom" v-show="countList == 0">
                <span>我是有底线的</span>
              </div>
            </div>


          </div>
        </div>

      </div>
    </div>

    <div style="width: 100%;height: 70px;background-color: #ededed;">
    </div>

    <!-- ========================= -->
    <!-- 订单 start -->
    <!-- ========================= -->
    <el-dialog title="提交订单" center :visible.sync="showOrder" width="40%">


      <div class="addressss">
        <el-select v-model="addressid" placeholder="选择地址" clearable style="width: 300px;">
          <el-option v-for="item in addressList"
                     :label="item.categoryname + ' ( ' + item.creator + ' ) '"
                     :value="item.id"
                     :key="item.id"/>
        </el-select>
      </div>

      <div style="margin-top: 20px;">
        <el-date-picker style="width: 300px;"
          v-model="phototime"
          type="date"
          placeholder="选择拍摄日期" >
        </el-date-picker>
      </div>

      <div style="margin-top: 20px;">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请写下您的留言"
          v-model="note" tyle="width: 500px;margin-top: 20px;">
        </el-input>
      </div>

      <div style="text-align:right;margin-top: 40px">
        金额: <span style="font-size: 26px;color: #5a98de;">{{detailInfo.price + '.00'}}</span> 元
      </div>

      <!--表单-->
      <div style="display: flex">
        <el-form style="margin: 40px auto 20px auto;">
          <el-form-item style="display: flex;justify-content: center">
            <el-button class="btn2ww2333" type="success" @click="submitOrder" size="small">预约</el-button>
            <el-button style="margin-left: 80px" @click="showOrder = false" size="small">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  import {
    getInfoList6,
    addOrder2,
    getSceneryInfo,
    addCart,
    addComment,
    getCommentList,
    userLogin,
    addUser,
    getAddressList, addOrder
  }
    from '../../api/common'
  import '../../assets/iconfont/iconfont'

  export default {
    name: 'sceneryInfo',
    data() {

      return {
        dilog: false,
        user: {},
        detailId: 0,
        categoryid: 0,
        detailInfo: {},

        addComment: '',

        commentList: [],
        countList: 0,
        totalPrice: 0,
        //
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
        showLogin: false,
        // flower
        loginDialog: false,
        regDialog: false,

        //
        num: 1,
        shoppingNum: 0,
        oList: [],  // 排行榜
        // 订单
        showOrder: false,
        // 地址
        addressList: [],
        addressid: '',
        note: '',
        phototime: '',
        ids: [],


      }
    },
    created() {
      this.init()

    },
    methods: {
      // 初始化
      async init() {

        this.detailId = this.$route.params.id

        // 获取详情
        await getSceneryInfo(this.detailId).then(res => {
          if (res.success) {
            this.detailInfo = res.data[0]
          } else {
            this.$message({message: '详情获取失败，请刷新再试！', type: 'error', duration: 2000})
          }

        })


        // 评论
        await getCommentList(1, 100, this.detailId).then(res => {
          console.log(res.data.data)
          if (res.success) {
            this.commentList = res.data.data
            this.countList = res.data.data.length
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

      go() {
        // 是否登录
        if (!this.loginIs()) {
          const {href} = this.$router.resolve({path: '/pass/login'})
          window.open(href, '_blank')
        } else {


          let params = {
            pagenum: 1,
            pagesize: 100
          }

          getAddressList(params).then(res => {
            if (res.success) {
              this.addressList = res.data.data
            } else {
              this.$message({message: '获取门店信息失败，请刷新', type: 'error', duration: 1700})
            }

          })
          this.showOrder = true
        }


      },

      submitOrder() {
        if (this.addressid == 0 || this.addressid == '') {
          this.$message({message: '请选择门店', type: 'error', duration: 1700})
          return false
        }

        if (this.phototime == '') {
          this.$message({message: '请选择拍摄日期', type: 'error', duration: 1700})
          return false
        }

        // userid, photoid, addressid, price, note, phototime
        let order = {
          'userid': this.UserInfo.id,
          'photoid': this.detailId,
          'addressid': this.addressid,
          'price': this.detailInfo.price,
          'note': this.note,
          'phototime': this.phototime,
        }

        addOrder2(order).then(res => {
          if (res.success) {
            this.$message({message: '恭喜你,预约成功', type: 'success', duration: 2000})
            this.init()
            this.showOrder = false
          } else {
            this.$message({message: '预约失败,请刷新再试', type: 'error', duration: 2000})

          }
        })

      },


      // 购物车
      goShopping() {
        // 是否登录
        if (!this.loginIs()) {
          this.$message({message: '请先登录', type: 'error', duration: 1700})
          return false
        }

        const {href} = this.$router.resolve({path: '/shopping'})
        window.open(href, '_blank')
      },


      // 重置添加用户表单
      closeAddAdminForm() {
        this.$refs.loginFormRules2.resetFields()
        this.$refs.loginFormRules.resetFields()

      },

      goHome() {
        this.$router.push({path: `/home`})
      },

      addCart(id) {
        // 是否登录
        if (!this.loginIs()) {
          this.$message({message: '请先登录', type: 'error', duration: 1700})
          this.$router.push('/flower/home')
          return false
        }

        let cart = {
          'userid': this.UserInfo.id,
          'flowerid': id,
          'amount': this.num
        }
        addCart(cart).then(res => {
          if (res.success) {
            this.$message({message: '加入购物车成功', type: 'success', duration: 2000})
            this.num = 1
          } else {
            this.$message({
              message: '添加购物车失败，请刷新再试！',
              type: 'error',
              duration: 2000
            })
          }

        })

      },

      addCommentBtn() {
        if (this.addComment == '') {
          this.$message({message: '请输入评论内容', type: 'error', duration: 1700})
          return
        }

        let addCommentInfo = {
          commentary: this.addComment,
          userid: this.user.id,
          detailid: this.detailId,
          categoryid: this.categoryid
        }

        addComment(addCommentInfo).then(res => {
          if (res.success) {
            this.init()
            this.dilog = false
            this.addComment = ''
            this.$message({message: '评论成功,等待审核通过后显示', type: 'success', duration: 1700})
          } else {
            this.$message({message: '评论失败', type: 'error', duration: 1700})
          }
        })

      },

      // 计数器
      handleChange(value) {
        console.log(value)
      },
      // 去详情页
      goDetailInfo(id) {
        const {href} = this.$router.resolve({path: `/show/${id}`})
        window.open(href, '_blank')

      },

    }
  }
</script>

<style scoped>

  .container {
    margin: 0;
    padding: 0;
  }

  .container .info {
    width: 100%;
    height: 100%;
    /*color: #71797F;*/
    padding-top: 20px;
    background-color: #ededed;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #dcdcdc;
  }

  .info .info-show {
    margin: 0 auto;
    width: 1200px;
    height: 480px;
    background-color: #fff;
    padding: 20px 60px 20px 20px;
    display: flex;
    border-top: 1px solid #ededed;
    border-radius: 10px;

  }

  .info-show-img {
    width: 460px;
    height: 460px;
  }

  .imgs {
    width: 370px;
    height: 400px;
  }

  .info-show-info {
    width: calc(100% - 460px);
    height: 500px;
    /*border: solid 1px #eaecee;*/
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }

  .info-title {
    font-size: 20px;
    line-height: 1.25;
    color: #000;
    margin-bottom: 13px;
  }

  .info-title-title {
    font-size: 14px;
    line-height: 1.5;
    color: #bdbdbd;
    display: flex;
    padding-bottom: 10px;
    border-bottom: solid 1px #cbcbcb;

  }

  .info-price {
    padding: 20px 20px 20px 0;
    background-color: rgb(240, 240, 240);
    margin-top: 20px;
    /*margin-left: 6px;*/
    display: flex;
    justify-content: space-between;
  }

  .info-price .info-price-top {
    height: 30px;
    margin-left: 3px;
  }

  .info-price-number1 {
    color: #d44d44;
    font-weight: 700;
    font-size: 16px;
  }


  .info-price-number {
    color: #d44d44;
    font-weight: 700;
    font-size: 22px;
  }

  .info-btns {
    margin-top: 180px;
    font-size: 14px;
    height: 42px;
  }


  .shuliang {
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: solid 1px #cbcbcb;
  }

  .align-center {
    padding-right: 20px;
    font-size: 14px;
    color: #8d8d8d;
    line-height: 36px;
  }

  .ms {
    display: flex;

  }

  .ys {
    margin-top: 30px;
    font-size: 14px;
    color: #8d8d8d;
  }

  .ys div {
    margin-bottom: 9px;
  }

  .xiangqing {
    margin: 0 auto;
    width: 1200px;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    display: flex;
    /*flex-direction: column;*/

  }

  /* ======= */
  /* bar  */
  /* ======= */
  .top-bar {
    width: 100%;
    height: 34px;
    font-size: 12px;
    color: #71797F;
    background-color: #fbfdff;
    display: flex;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-bottom: 1px solid #ebeef5;
  }

  .top-bar-item {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .top-bar-item-left {
    width: 500px;
    height: 100%;
    margin: auto 0 auto 1px;
    line-height: 34px;
    display: flex;
  }

  .top-bar-item-right {
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
  }

  .person {
    margin: auto 0 auto 20px;
  }

  .login {
    margin: auto 0 auto 20px;
  }

  .register {
    margin: auto 0 auto 20px;
  }

  .cart {
    margin: auto 5px auto 30px;
  }

  .co:hover {
    cursor: pointer;
    color: #5a98de;
  }


  .flower-lag {
    margin-top: 40px;
    /*padding-left: 10px;*/
    font-size: 14px;
    color: #666;
  }

  .number {
    margin-left: 10px;
  }

  .hvr-shutter-out-horizontal {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    box-shadow: 0 0 1px transparent;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    background: #5c81e3;
    color: #fff;
  }

  .hvr-shutter-out-horizontal1 {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    box-shadow: 0 0 1px transparent;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    background: white;
    color: #5c81e3;
  }


  .hvr-shutter-out-horizontal {
    width: 145px;
    height: 50px;
    border: 1px solid #5c81e3;
    display: inline-block;
    line-height: 50px;
    text-align: center;
    color: white;
    /*margin-left: 10px;*/
    border-radius: 4px;
    cursor: pointer;
  }

  .hvr-shutter-out-horizontal1 {
    width: 145px;
    height: 50px;
    border: 1px solid #5c81e3;
    border-radius: 4px;
    display: inline-block;
    line-height: 50px;
    text-align: center;
    color: #5c81e3;
    margin-left: 40px;
    cursor: pointer;
  }

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


  .container-item-hr2 {
    box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
    width: 100%;
    height: 40px;
    background-color: #ededed;
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

  .person-show-right {
    width: 1200px;
    border: solid 1px #dbdbdb;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 60px;
  }

  .person-show-right-div {
    height: 60px;
    background: linear-gradient(#fbfbfb, #ececec);
    border-bottom: solid 1px #dbdbdb;
    font-size: 18px;
    font-weight: 400;
    color: #626262;
    line-height: 60px;
    padding: 0 20px;
    border-radius: 10px;
  }

  .person-show {
    width: 1200px;
    height: 100%;
    margin: auto;
    display: flex;
    justify-content: space-between;

  }

  .person-show-left {
    width: 210px;
    height: 100%;
    border: solid 1px #dbdbdb;
    background-color: white;
    border-radius: 10px;
    /*padding: 10px;*/
  }

  .person-show-left h3 {
    width: 100%;
    height: 40px;
    font-size: 18px;
    background: linear-gradient(#fbfbfb, #ececec);
    font-weight: 400;
    color: #626262;
    text-align: center;
    border-bottom: solid 1px #dbdbdb;
  }

  .paihangbang {
    width: 100%;
    height: 100%;
    padding: 10px;

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

  .content {
    /*width: 978px;*/
    /*height: 100%;*/
    padding: 40px;
    text-align: center;
  }

  /deep/ .content img {
    max-width: 100%;
    max-height: 100%;
  }

  title-1-i {
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    /*justify-content: space-between;*/
  }

  .title-1 {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 200;
    color: #333;
    /*padding-left: 10px;*/
  }


  .title-item {
    height: 210px;
    padding: 4px;
    width: 100%;
    margin-top: 10px;
    /*margin-right: 6px;*/
    background-color: white;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    border-bottom: solid 1px #d0c9c9;
  }

  .title-item:hover {
    /*box-shadow: 8px 8px 5px #e1e1e1;*/
  }


  .phone-img {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }

  .phone-title {
    color: #333;
    font-size: 14px;
    margin-top: 12px;
    text-align: center;
  }

  .phone-price {
    margin-top: 10px;
    font-weight: normal;
    color: #ca141d;
    text-align: center;
    font-size: 20px;
  }

  .header-item-person-shop-number {
    background-color: #5c81e3;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: white;
    font-size: 10px;
    line-height: 20px;
    text-align: center;
    margin: auto 8px;
  }

  .addressss {
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*text-align: center;*/
  }

  container-item-three {
    width: 100%;
    height: 100%;
    /*margin-top: 20px;*/
    /*border: 1px solid #e9e9e9;*/
    /*display: flex;*/
  }

  .comment1 {
    margin: 0 14%;
    padding-bottom: 50px;
  }

  /*.comment-content-img {*/
  /*  display: flex;*/
  /*  width: 200px;*/
  /*  height: 40px;*/
  /*}*/

  /*.comment-content-img-span{*/
  /*line-height: 40px;*/
  /*  margin: auto;*/
  /*  !*margin-left: 4px;*!*/
  /*  font-size: 12px;*/
  /*}*/

  .comment-title {
    display: flex;
    justify-content: space-between;
  }

  /*.comment-content {*/
  /*  margin-top: 20px;*/
  /*  border-bottom: solid .1px #bd2c00;*/
  /*}*/


  .comment {
    padding: 10px;
  }

  .comment-number {
    width: 20%;
    height: 50px;
    /*border: 1px red solid;*/
    font-size: 20px;
    color: #55a532;
  }

  .comment-content {
    width: 100%;
    height: 100%;
    border-top: solid 1px #FF7124;
    margin-top: 20px;
  }

  .comment-content-item {
    width: 100%;
    height: 100%;
    display: flex;
    padding-bottom: 40px;
    padding-top: 20px;
    /*border-bottom: solid 1px #c5bfbf;*/
  }

  .comment-content-item-left {
    width: 100px;
    height: 100%;
    /*border: solid 1px #FF7124;*/
    display: flex;
  }

  .comment-content-item-right {
    width: calc(100% - 100px);
    height: 100%;
    /*border: solid 1px #FF7124;*/
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }

  .comment-content-bottom {
    font: 14px PingFangSC-Regular;
    text-align: center;
    line-height: 42px;
    color: #626675;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 1200px;
  }

  .comment-content-name {
    /*margin-bottom: 10px;*/
    /*font-family: PingFangSC-Semibold;*/
    font-size: 16px;
    color: #222;
    font-weight: 600;
  }

  .comment-content-content {
    padding-top: 10px;
    font: 14px/22px PingFangSC-Regular;
    text-align: justify;
    color: #222;
  }

  .comment-content-time {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #9195a3;
    padding-top: 20px;
  }

  .login-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: auto;
    text-align: center;
  }

  .container-item-two {
    margin: 10px;
    padding-bottom: 60px;
  }

  /deep/ .el-tabs__item.is-active {
    color: #ff9d00;
  }

  /deep/ .el-tabs__item.is-active {
    color: #ff9d00;
  }

  /deep/ .el-tabs__item:hover {
    color: #ff9d00;
    cursor: pointer;
  }

</style>
