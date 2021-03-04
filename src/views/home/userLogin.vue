<template>
  <div class="login-container">

    <div class="login-div" v-if="showLoginOr">

      <svg class="icon111" t="1614784762142"  viewBox="0 0 1354 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="2936" width="200" height="200">
        <path
          d="M1271.741935 163.509677H1028.954839C951.329032 163.509677 919.948387 1.651613 839.019355 1.651613H487.225806c-54.503226 0-80.929032 161.858065-161.858064 161.858064H80.929032C36.335484 163.509677 0 199.845161 0 244.43871v698.632258C0 987.664516 36.335484 1024 80.929032 1024h1189.161291c44.593548 0 80.929032-36.335484 80.929032-80.929032V244.43871c1.651613-44.593548-34.683871-80.929032-79.27742-80.929033zM677.16129 888.567742c-180.025806 0-325.367742-143.690323-325.367742-322.064516S497.135484 244.43871 677.16129 244.43871s325.367742 143.690323 325.367742 322.064516c-1.651613 178.374194-146.993548 322.064516-325.367742 322.064516z m391.432258-564.851613c-23.122581 0-41.290323-18.167742-41.290322-39.63871 0-23.122581 18.167742-39.63871 41.290322-39.638709s41.290323 18.167742 41.290323 39.638709c0 21.470968-18.167742 39.63871-41.290323 39.63871zM270.864516 82.580645c0-14.864516-11.56129-26.425806-26.425806-26.425806H163.509677c-14.864516 0-26.425806 11.56129-26.425806 26.425806v26.425807h135.432258c-1.651613 0-1.651613-11.56129-1.651613-26.425807zM677.16129 323.716129c-133.780645 0-242.787097 109.006452-242.787096 242.787097S541.729032 809.290323 677.16129 809.290323s242.787097-109.006452 242.787097-242.787097S810.941935 323.716129 677.16129 323.716129z"
          fill="#5a98de" opacity=".939" p-id="2937"></path>
      </svg>

      <div style="margin: 10px auto;color: #989898">
        <h3>BLUE拍照平台登录</h3>
      </div>

      <!-- 登录表单 -->
      <div class="login-form">

        <el-form ref="loginFormRef" label-width="0" class="login_form"
                 :model="loginForm2" :rules="loginFormRules">
          <!--用户名-->
          <el-form-item prop="uname">
            <el-input class="form-input" placeholder="用户名"
                      v-model="loginForm2.uname" :autofocus="true"/>
          </el-form-item>

          <!--密码-->
          <el-form-item prop="password">
            <el-input class="form-input" type="password"
                      placeholder="密码" v-model="loginForm2.pwd"/>
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item>
            <div class="form-btn" @click="login">
              <div class="login-span">登 &nbsp;&nbsp;&nbsp;录</div>
            </div>
          </el-form-item>

          <div class="register-go">
            <el-link class="register-go-a"
                     @click="showLoginOr = !showLoginOr">
              注册
            </el-link>
          </div>
        </el-form>
      </div>

    </div>

    <!-- ========================= -->
    <!-- 注册 -->
    <!-- ========================= -->
    <div class="login-div22" v-if="!showLoginOr">
      <svg t="1614784884047" class="icon" viewBox="0 0 1354 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="3317" width="200" height="200">
        <path
          d="M1271.741935 163.509677H1028.954839C951.329032 163.509677 919.948387 1.651613 839.019355 1.651613H487.225806c-54.503226 0-80.929032 161.858065-161.858064 161.858064H80.929032C36.335484 163.509677 0 199.845161 0 244.43871v698.632258C0 987.664516 36.335484 1024 80.929032 1024h1189.161291c44.593548 0 80.929032-36.335484 80.929032-80.929032V244.43871c1.651613-44.593548-34.683871-80.929032-79.27742-80.929033zM677.16129 888.567742c-180.025806 0-325.367742-143.690323-325.367742-322.064516S497.135484 244.43871 677.16129 244.43871s325.367742 143.690323 325.367742 322.064516c-1.651613 178.374194-146.993548 322.064516-325.367742 322.064516z m391.432258-564.851613c-23.122581 0-41.290323-18.167742-41.290322-39.63871 0-23.122581 18.167742-39.63871 41.290322-39.638709s41.290323 18.167742 41.290323 39.638709c0 21.470968-18.167742 39.63871-41.290323 39.63871zM270.864516 82.580645c0-14.864516-11.56129-26.425806-26.425806-26.425806H163.509677c-14.864516 0-26.425806 11.56129-26.425806 26.425806v26.425807h135.432258c-1.651613 0-1.651613-11.56129-1.651613-26.425807zM677.16129 323.716129c-133.780645 0-242.787097 109.006452-242.787096 242.787097S541.729032 809.290323 677.16129 809.290323s242.787097-109.006452 242.787097-242.787097S810.941935 323.716129 677.16129 323.716129z"
          fill="#FF8040" opacity=".939" p-id="3318"></path>
      </svg>

      <div style="margin: 10px auto;color: #989898">
        <h3>BLUE拍照平台注册</h3>
      </div>

      <!-- 登录表单 -->
      <div class="register-form">
        <el-form ref="loginFormRef" label-position="right"
                 :model="registerForm" :rules="loginFormRules2">
          <!--用户名-->
          <el-form-item prop="uname">
            <el-input placeholder="用户名" v-model="registerForm.uname"
                      :autofocus="true"/>
          </el-form-item>

          <!--密码-->
          <el-form-item prop="pwd">
            <el-input type="password" placeholder="密码"
                      v-model="registerForm.pwd"/>
          </el-form-item>

          <!--手机号-->
          <el-form-item prop="phone">
            <el-input placeholder="手机号" v-model="registerForm.phone"/>
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item>
            <div class="form-btn22" @click="registerGo">
              <div class="login-span">注 &nbsp;&nbsp;&nbsp;册</div>
            </div>
          </el-form-item>

          <div class="register-go">
            <el-link class="register-go-a"
                     @click="showLoginOr = !showLoginOr">
              登录
            </el-link>
          </div>
        </el-form>

      </div>
    </div>

  </div>
</template>

<script>
  import {userLogin, addUser, getUsers} from '../../api/common'

  export default {
    name: 'userLogin',
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
        //表单数据绑定
        loginForm2: {
          uname: '',
          pwd: ''
        },
        //表单验证
        loginFormRules: {
          uname:
            [
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 1, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
            ],
          pwd:
            [
              {required: true, message: '请输入密码', trigger: 'blur'},
              {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
            ]
        },

        showLoginOr: true,
        //表单验证
        loginFormRules2: {
          uname:
            [
              {required: true, message: '请输入用户名', trigger: 'blur'},
              {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
            ],
          pwd:
            [
              {required: true, message: '请输入密码', trigger: 'blur'},
              {min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur'}
            ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {validator: checkMobile, trigger: 'blur'}
          ]
        },
        // 注册表单
        registerForm: {
          uname: '',
          pwd: '',
          phone: ''
        }

      }
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        if (this.$route.params.id == 2) {
          this.showLoginOr = false
        }

      },

      async login() {
        if (this.loginForm2.uname.trim() == '') {
          this.$message({message: '用户名不能为空', type: 'error', duration: 1700})
          return
        }

        if (this.loginForm2.pwd.trim() == '') {
          this.$message({message: '密码不能为空', type: 'error', duration: 1700})
          return
        }


        await userLogin(this.loginForm2).then(res => {
          if (res.success) {
            window.localStorage.setItem('UserInfoPhone', JSON.stringify(res.data[0]))
            this.$router.push({path: '/phone/home'})
          } else {
            this.$message({message: '请刷新重新登录', type: 'error', duration: 1700})

          }

        })

      },

      async registerGo() {
        if (this.registerForm.uname.trim() == '') {
          this.$message({message: '用户名不能为空', type: 'error', duration: 1700})
          return
        }

        if (this.registerForm.pwd.trim() == '') {
          this.$message({message: '密码不能为空', type: 'error', duration: 1700})
          return
        }

        if (this.registerForm.phone.trim() == '') {
          this.$message({message: '手机号不能为空', type: 'error', duration: 1700})
          return
        }

        await addUser(this.registerForm).then(res => {
          if (res.success) {
            this.$message({message: '注册成功', type: 'success', duration: 2000})
            this.showLoginOr = true
          } else {
            this.$message({message: '注册失败', type: 'error', duration: 2000})

          }
        })

      },

      //重置
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      },

      //重置
      resetLoginForm2() {
        this.$refs.loginFormRef.resetFields()
      }

    }
  }
</script>

<style scoped>

  .login-container {
    background-image: url("../../assets/login2.jpg");
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
  }

  .login-div {
    width: 400px;
    height: 400px;
    background-color: white;
    margin: 40px auto;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
  }

  .login-div22 {
    width: 400px;
    height: 440px;
    background-color: white;
    margin: 40px auto;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
  }

  .left-image {
    width: 300px;
    height: 100%;

  }

  .login-form {
    margin: 0 auto;
  }

  .icon111 {
    width: 50px;
    height: 40px;
    margin: 20px auto 0 auto;
    cursor: pointer;
  }

  .form-input {
    width: 330px;
    /*margin-top: 2px;*/
    /*background-color: #ffb01e;*/
    /*cursor: pointer;*/
    display: flex;
    border-radius: 3px;
  }

  .form-btn {
    margin-top: 20px;
    width: 330px;
    background-color: #d81e06;
    cursor: pointer;
    display: flex;
    border-radius: 5px;
    line-height: 40px;
    height: 40px;
    text-align: center;
  }

  .form-btn22 {
    /*margin-top: 10px;*/
    width: 330px;
    background-color: #5a98de;
    cursor: pointer;
    display: flex;
    border-radius: 5px;
    line-height: 40px;
    height: 40px;
    text-align: center;
  }

  .form-btn2 {
    /*margin-top: 30px;*/
    width: 330px;
    background-color: #ffb01e;
    cursor: pointer;
    display: flex;
    border-radius: 3px;
    line-height: 40px;
    height: 40px;
    text-align: center;
  }


  .login-span {
    color: white;
    margin: auto;
    font-size: 18px;
    font-weight: 500;
  }

  .register-go {
    /*margin-top: 10px;*/

  }

  .register-go-a {
    float: right;
    /*margin-left: 32px;*/
    font-size: 14px;
    font-weight: 600;
    color: #d81e06;
  }


  .register-form {
    margin: 0 auto;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #ffb01e;
  }

  .el-radio__input.is-checked .el-radio__inner {
    border-color: #ffb01e;
    background: #ffb01e;
  }

  .right-div {
    background: linear-gradient(#fff, #f5f5f5);
    box-shadow: 0 1px 4px rgba(0, 0, 0, .08);
  }

  /deep/ .el-link.el-link--default:hover {
    color: #e47a0f;
  }

  /deep/ .el-link.el-link--default:hover {
    color: #e47a0f;
  }
</style>
