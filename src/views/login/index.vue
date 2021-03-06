<template>
  <div class="login-container">

    <div class="login-div">

      <svg t="1614784884047" class="icon111" viewBox="0 0 1354 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
           p-id="3317" width="200" height="200">
        <path
          d="M1271.741935 163.509677H1028.954839C951.329032 163.509677 919.948387 1.651613 839.019355 1.651613H487.225806c-54.503226 0-80.929032 161.858065-161.858064 161.858064H80.929032C36.335484 163.509677 0 199.845161 0 244.43871v698.632258C0 987.664516 36.335484 1024 80.929032 1024h1189.161291c44.593548 0 80.929032-36.335484 80.929032-80.929032V244.43871c1.651613-44.593548-34.683871-80.929032-79.27742-80.929033zM677.16129 888.567742c-180.025806 0-325.367742-143.690323-325.367742-322.064516S497.135484 244.43871 677.16129 244.43871s325.367742 143.690323 325.367742 322.064516c-1.651613 178.374194-146.993548 322.064516-325.367742 322.064516z m391.432258-564.851613c-23.122581 0-41.290323-18.167742-41.290322-39.63871 0-23.122581 18.167742-39.63871 41.290322-39.638709s41.290323 18.167742 41.290323 39.638709c0 21.470968-18.167742 39.63871-41.290323 39.63871zM270.864516 82.580645c0-14.864516-11.56129-26.425806-26.425806-26.425806H163.509677c-14.864516 0-26.425806 11.56129-26.425806 26.425806v26.425807h135.432258c-1.651613 0-1.651613-11.56129-1.651613-26.425807zM677.16129 323.716129c-133.780645 0-242.787097 109.006452-242.787096 242.787097S541.729032 809.290323 677.16129 809.290323s242.787097-109.006452 242.787097-242.787097S810.941935 323.716129 677.16129 323.716129z"
          fill="#5a98de" opacity=".939" p-id="3318"></path>
      </svg>

      <div style="margin: 10px auto;color: #989898">
        <h3>BLUE 拍照平台管理后台登录</h3>
      </div>

      <!-- 登录表单 -->
      <div class="login-form">

        <el-form ref="loginFormRef" label-width="0" class="login_form"
                 :model="loginForm" :rules="loginFormRules">
          <!--用户名-->
          <el-form-item prop="uname">
            <el-input class="form-input" placeholder="用户名"
                      v-model="loginForm.username" :autofocus="true"/>
          </el-form-item>

          <!--密码-->
          <el-form-item prop="password">
            <el-input class="form-input" type="password"
                      placeholder="密码" v-model="loginForm.password"/>
          </el-form-item>

          <!-- 登录按钮 -->
          <el-form-item>
            <div class="form-btn" @click="login">
              <div class="login-span">登 &nbsp;&nbsp;&nbsp;录</div>
            </div>
          </el-form-item>

        </el-form>
      </div>

    </div>

  </div>

</template>

<script>
  import { adminLogin } from '../../api/common'

  export default {
    name: 'index',
    data() {
      return {
        //表单数据绑定
        loginForm: {
          username: '',
          password: ''
        },
        //表单验证
        loginFormRules: {
          username:
            [
              { required: true, message: '请输入用户名', trigger: 'blur' },
              { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
            ],
          password:
            [
              { required: true, message: '请输入密码', trigger: 'blur' },
              { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
            ]
        }

      }
    },
    methods: {
      login() {
        if (this.loginForm.username.trim() == '') {
          this.$message({ message: '用户名不能为空', type: 'error', duration: 1700 })
          return
        }

        if (this.loginForm.password.trim() == '') {
          this.$message({ message: '密码不能为空', type: 'error', duration: 1700 })
          return
        }

        adminLogin(this.loginForm).then(res => {
          if (res.success) {
            // console.log(res)
            window.localStorage.setItem('AdminInfoPhoto', JSON.stringify(res.data[0]))
            this.$router.push({ path: '/' })
          } else {
            this.$message({ message: res.message, type: 'error', duration: 1700 })

          }

        })

      },

      //重置
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      },
      // 去首页
      goHome() {
        this.$router.push({ path: `/phone/home` })
      },

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
    height: 420px;
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
    background-color: #d81e06;
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
    color: #5a98de;
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
  /deep/  .el-link.el-link--default:hover {
    color: #e47a0f;
  }

</style>
