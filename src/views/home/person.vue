<template>
  <div class="home-container">

    <div class="container-item-hr">
      <svg @click="goHome()" t="1614784884047" class="icon" viewBox="0 0 1354 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="3317" width="200" height="200">
        <path
          d="M1271.741935 163.509677H1028.954839C951.329032 163.509677 919.948387 1.651613 839.019355 1.651613H487.225806c-54.503226 0-80.929032 161.858065-161.858064 161.858064H80.929032C36.335484 163.509677 0 199.845161 0 244.43871v698.632258C0 987.664516 36.335484 1024 80.929032 1024h1189.161291c44.593548 0 80.929032-36.335484 80.929032-80.929032V244.43871c1.651613-44.593548-34.683871-80.929032-79.27742-80.929033zM677.16129 888.567742c-180.025806 0-325.367742-143.690323-325.367742-322.064516S497.135484 244.43871 677.16129 244.43871s325.367742 143.690323 325.367742 322.064516c-1.651613 178.374194-146.993548 322.064516-325.367742 322.064516z m391.432258-564.851613c-23.122581 0-41.290323-18.167742-41.290322-39.63871 0-23.122581 18.167742-39.63871 41.290322-39.638709s41.290323 18.167742 41.290323 39.638709c0 21.470968-18.167742 39.63871-41.290323 39.63871zM270.864516 82.580645c0-14.864516-11.56129-26.425806-26.425806-26.425806H163.509677c-14.864516 0-26.425806 11.56129-26.425806 26.425806v26.425807h135.432258c-1.651613 0-1.651613-11.56129-1.651613-26.425807zM677.16129 323.716129c-133.780645 0-242.787097 109.006452-242.787096 242.787097S541.729032 809.290323 677.16129 809.290323s242.787097-109.006452 242.787097-242.787097S810.941935 323.716129 677.16129 323.716129z"
          fill="#FF8040" opacity=".939" p-id="3318"></path>
      </svg>
    </div>


    <div style="display: flex;background-color: #ededed;">
      <div class="person-show">

        <div class="person-show-left">
          <div class="name">
            <!--          <img class="avatar" :src="UserInfo.image" alt="">-->
            <img class="avatar" src="http://service.szhtkj.com.cn/SzhtShop/uploads/default/avatar/userimg.png" alt="">
            <div class="username">{{UserInfo.uname}}</div>
          </div>

          <div class="base" style="border-bottom: solid 1px #dbdbdb;" @click="showIsOR(1)">我的账号</div>
          <!--          <div class="base" @click="showIsOR(2)">我的订单</div>-->
<!--          <div class="base" style="border-bottom: solid 1px #dbdbdb;" @click="showIsOR(3)">收货地址</div>-->
        </div>


        <div class="person-show-right">
          <div class="person-show-right-div">
            <span>{{' ' + titleName}}</span>
          </div>


          <div class="person-show-right-div-item" v-if="showIs == '1'">

            <div>
              <el-button @click="goUpd" class="btn22" type="primary">修改密码</el-button>
              <el-button @click="goShopping" class="btn22" type="primary">我的订单</el-button>
              <el-button @click="layoutGo" class="btn22" type="primary">退出登录</el-button>
            </div>

          </div>


<!--          <div class="person-show-right-div-item" v-if="showIs == '3'">-->

<!--            <el-button @click="addressDialog = true" class="btn2ww2" type="primary">添加地址</el-button>-->

<!--            <div class="aaaaaaaa">-->
<!--              <div class="addr" v-for="item in addressList" :index="item.id">-->
<!--                <div class="uname">收件人：{{item.name}}</div>-->
<!--                <div class="phone">手机号：{{item.phone}}</div>-->
<!--                <div class="addresss">地 址：{{item.address}}</div>-->
<!--              </div>-->
<!--            </div>-->

<!--          </div>-->


<!--          <div class="person-show-right-div-item" v-if="showIs == '2'">-->

<!--          </div>-->


        </div>

      </div>
    </div>


    <!-- ========================= -->
    <!-- 地址 start -->
    <!-- ========================= -->
    <el-dialog title="添加收货地址" center :visible.sync="addressDialog" width="26%">
      <span>
        <!--表单-->
        <div style="display: flex">
           <el-form :model="addressInfo" :rules="loginFormRules3" style="margin: 4px auto;">
            <!--用户名-->
            <el-form-item prop="name">
              <el-input placeholder="收件人" v-model="addressInfo.name" style="width: 300px"/>
            </el-form-item>

             <!--密码-->
            <el-form-item prop="phone">
              <el-input placeholder="手机号"
                        v-model="addressInfo.phone" style="width: 300px"/>
            </el-form-item>

             <!--手机号-->
            <el-form-item prop="address">
              <el-input placeholder="地址" v-model="addressInfo.address" style="width: 300px"/>
            </el-form-item>


            <el-form-item style="display: flex;justify-content: center">
              <el-button @click="goAddAddress" class="btn2ww2333" type="success" size="small">确定</el-button>
              <!--              <el-button style="margin-left: 60px" @click="addressDialog = false" size="small">取 消</el-button>-->
            </el-form-item>
          </el-form>
        </div>
      </span>
    </el-dialog>


    <!--修改密码 -->
    <el-dialog title="修改密码" :visible.sync="updDialogVisible" width="20%">
      <span>
        <!--表单-->
        <el-form label-width="90px">
          <el-form-item label="原密码:">
           <el-input placeholder="原密码" v-model="pwd.password" show-password/>
          </el-form-item>


          <el-form-item label="新密码:">
           <el-input placeholder="新密码" v-model="pwd.newPassword" show-password/>
          </el-form-item>
        </el-form>
      </span>

      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitPwd(UserInfo.id)" size="mini">修改</el-button>
        <el-button @click="updDialogVisible = false" size="mini">取 消</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import {
    getAddressList, addAddress, getUserList, getSceneryIndex,
    getSceneryList, getrotationList, updUserInfo, getSearchContent, updPasswordById
  } from '../../api/common'
  import '../../assets/iconfont/iconfont'

  export default {
    name: 'person',
    data() {

      // 验证手机号的规则
      let checkMobile = (rule, value, cb) => {
        // 验证手机号的正则表达式
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (regMobile.test(value)) {
          return cb()
        }
        cb(new Error('请输入合法的手机号'))
      }

      return {
        activeIndex: '0',
        search: '',
        showLogin: false,

        UserInfo: {
          uname: '',
          image: '',
          phone: '',
          creatime: '',
          email: '',
          id: 0,
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

        // 地址表单验证
        loginFormRules3: {
          name:
            [
              {required: true, message: '请输入收件人', trigger: 'blur'},
              {min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur'}
            ],
          address:
            [
              {required: true, message: '请输入地址', trigger: 'blur'},
              {min: 5, max: 100, message: '请输入地址请填写正确地址', trigger: 'blur'}
            ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: checkMobile, trigger: 'blur'}
          ]
        },

        // 购物车
        checked: false,
        num: 1,
        countPay: 0,

        showIs: '1',

        // 修改密码
        pwd: {
          password: '',
          newPassword: ''
        },

        // 地址
        addressList: [],
        addressInfo: {
          name: '',
          phone: '',
          address: ''
        },
        addressDialog: false,
        updDialogVisible: false,
        shoppingNum: 0,

        titleName: '我的账号',

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
          this.$router.push('/phone/login')
          return false
        }


        getAddressList(this.UserInfo.id).then(res => {
          if (res.success) {
            this.addressList = res.data.data
            console.log(this.addressList)
          } else {
            this.$message({message: res.message, type: 'error', duration: 1700})
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

      // 去首页
      goHome() {
        this.$router.push({path: `/phone/home`})
      },

      // 购物车
      goShopping() {
        // 后台请求购物车数据
        const {href} = this.$router.resolve({path: '/phone/shopping'})
        window.open(href, '_blank')
      },

      // 修改密码
      goUpd() {
        this.pwd = {
          password: '',
          newPassword: ''
        }

        this.updDialogVisible = true
      },

      // 退出登录
      layoutGo() {
        window.localStorage.removeItem('UserInfoPhone')
        this.$router.push({path: '/phone/home'})

      },

      submitPwd(id) {
        if (this.pwd.newPassword == '') {
          this.$message({message: '不能为空', type: 'error', duration: 1700})
          return false
        }

        updPasswordById(id, this.pwd).then(res => {
          if (res.success) {
            this.$message({message: '成功修改密码', type: 'success', duration: 1700})
            this.pwd = {
              password: '',
              newPassword: ''
            }

          } else {
            this.$message({message: res.message, type: 'error', duration: 1700})
          }
        })

      },

      showIsOR(id) {
        if (id == 1) {
          this.titleName = '我的账号'
          this.showIs = '1'
        } else if (id == 2) {
          this.titleName = '我的订单'
          this.showIs = '2'
        } else if (id == 3) {
          this.titleName = '我的地址'
          this.showIs = '3'
        }

      },


      // 地址
      addAddress() {
        this.addressInfo = {
          'name': '',
          'phone': '',
          'address': ''
        }
        this.addressDialog = true
      },

      goAddAddress() {

        if (this.UserInfo.id == 0) {
          this.$message({message: '请重新登录', type: 'error', duration: 1700})
          return
        }

        if (this.addressInfo.name == ''
          || this.addressInfo.phone == ''
          || this.addressInfo.address == '') {
          this.$message({message: '地址填写不完整', type: 'error', duration: 1700})
          return
        }

        let address = {
          'userid': this.UserInfo.id,
          'name': this.addressInfo.name,
          'phone': this.addressInfo.phone,
          'address': this.addressInfo.address
        }
        addAddress(address).then(res => {
          if (res.success) {
            // this.$message({ message: '成功添加', type: 'success', duration: 1700 })
            this.init()
          } else {
            this.$message({message: '添加失败', type: 'error', duration: 1700})
          }
        })

        this.addressInfo = {
          'name': '',
          'phone': '',
          'address': ''
        }
        this.addressDialog = false
      }

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
    background-color: #f3f3f3;
  }

  .top-bar {
    width: 100%;
    height: 34px;
    font-size: 12px;
    color: #71797F;
    background-color: #F3F5F7;
    display: flex;
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

  /* ======= */
  /* 个人中心 */
  /* ======= */
  .person-show {
    width: 1200px;
    height: 100%;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;

  }

  .person-show-left {
    width: 210px;
    height: 600px;
    border: solid 1px #dbdbdb;
    background-color: white;
    border-radius: 8px;
  }

  .person-show-left .name {
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }

  .base {
    border-top: solid 1px #dbdbdb;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #5079d9;
    width: 100%;
    cursor: pointer;
  }

  .base:hover {
    color: white;
    background-color: #5079d9;
  }

  .person-show-right {
    width: 950px;
    border: solid 1px #dbdbdb;
    background-color: white;
    border-radius: 8px;
  }

  .person-show-right-div {
    height: 60px;
    background: linear-gradient(#fbfbfb, #ececec);
    border-bottom: solid 1px #dbdbdb;
    font-size: 18px;
    font-weight: 400;
    color: #626262;
    line-height: 60px;
  }

  .person-show-right-div span {
    margin-left: 20px;
  }

  .person-show-bar {
    width: 130px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .person-show-bar .base {
    font-size: 20px;
    color: #636363;
    font-weight: 600;
    margin-top: 14px;
  }

  .person-show-bar .base:hover {
    cursor: pointer;
    color: #5a98de;
  }


  .person-show-item {
    width: calc(100% - 130px);
    height: 100%;
    /*display: flex;*/
    /*flex-direction: column;*/
    padding: 10px;
  }

  .my-person {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .upd-pwd {
    width: 400px;
    margin: 120px 40px;
  }

  .pwd-info {
    margin-top: 20px;
    /*width: 70%;*/
  }

  .pwd-info3 {
    margin-top: 50px;
    float: right;
    width: 30%;
  }

  .my-order {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .my-address {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    color: black;

  }

  .my-address-item {
    width: 260px;
    height: 170px;
    border: solid 1px #cecece;
    margin-left: 30px;
    margin-top: 20px;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .my-address-item .uname {
    font-size: 20px;
    color: #333;
    font-style: normal;
    margin: 20px 0 20px 20px;
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

  .username {
    font-size: 20px;
    font-weight: 400;
    color: #616161;
    margin: 10px auto;
  }

  .avatar {
    width: 168px;
    height: 168px;
    border-radius: 50%;
    margin: 0 auto;
  }

  .my-person .name {
    width: 300px;
    display: flex;
    margin-top: 120px;
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

  .person-show-right-div-item {
    padding: 20px;
  }

  .btn22 {
    margin-left: 40px;
    margin-top: 40px;
    background-color: #5a98de;
    width: 180px;
    height: 70px;
  }

  .btn2ww2 {
    margin-left: 20px;
    margin-top: 2px;
    background-color: #5a98de;
    width: 140px;
    height: 50px;
    margin-bottom: 10px;
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

  .addr .uname {
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
    margin-top: 10px;
  }

  .addr .phone {
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
    margin-top: 10px;
  }

  .addr .addresss {
    font-size: 18px;
    font-weight: 500;
    margin-left: 10px;
    margin-top: 10px;
  }


  .addr {
    margin-left: 20px;
    margin-top: 20px;
    width: 385px;
    height: 140px;
    border: solid 1px #5a98de;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
  }

  .aaaaaaaa {
    display: flex;
    flex-wrap: wrap;
  }

</style>
