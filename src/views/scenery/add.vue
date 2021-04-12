<template>
  <div class="app-container">


    <el-form :model="addDetail" ref="ruleForm" label-width="140px" class="detail-form">


      <el-form-item label="套餐标题" prop="name">
        <el-input v-model="addDetail.name" show-word-limit class="textarea base-width-50"/>
      </el-form-item>


      <el-form-item label="套餐价格" prop="price">
        <el-input v-model="addDetail.price" show-word-limit class="base-width-30"/>
        元
      </el-form-item>

      <el-form-item label="拍摄时长">
        <el-input v-model="addDetail.time" show-word-limit class="base-width-30"/>
        小时
      </el-form-item>

      <el-form-item label="服装">
        <el-input v-model="addDetail.fz" show-word-limit class="base-width-30"/>
        套
      </el-form-item>

      <el-form-item label="拍摄张数">
        <el-input v-model="addDetail.ps" show-word-limit class="base-width-30"/>
        张
      </el-form-item>


      <el-form-item label="精修张数">
        <el-input v-model="addDetail.jx" show-word-limit class="base-width-30"/>
        张
      </el-form-item>

      <el-form-item label="底片">
        <el-input v-model="addDetail.dp" show-word-limit class="base-width-30"/>

      </el-form-item>

      <el-form-item label="相册">
        <el-input v-model="addDetail.xc" show-word-limit class="base-width-30"/>
        个
      </el-form-item>

      <el-form-item label="相框">
        <el-input v-model="addDetail.xk" show-word-limit class="base-width-30"/>
        个
      </el-form-item>

      <el-form-item label="拍摄风格">
        <el-input v-model="addDetail.fg" show-word-limit class="base-width-30"/>
      </el-form-item>

      <el-form-item label="拍摄场景">
        <el-input v-model="addDetail.cj" show-word-limit class="base-width-30"/>
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="addDetail.js" type="textarea" show-word-limit class="base-width-50"/>
      </el-form-item>

      <el-form-item label="封面图">
        <el-upload class="avatar-uploader"
                   action="http://8.136.218.79:8080/upload/updataFile"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess">
          <img v-if="addDetail.icon !== ''" :src="addDetail.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>


      <el-form-item label="详情" prop="content">
        <editor api-key="u6hiizd3o4r3p4mhnvag8b7fc9hhs8yivqdddzqbd60tyoh5" :init="tinymceConfig"
                v-model="addDetail.content" style="z-index: 0"/>
      </el-form-item>


      <el-form-item style="text-align: left;margin-top: 80px">
        <el-button type="success" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import {getCategoryList, uploadFile, addScenery} from '../../api/common'
  import OSS from 'ali-oss';
  import '../../assets/iconfont/iconfont'
  import Editor from '@tinymce/tinymce-vue'

  let addDetailInfo = {
    name: '',
    content: '',
    icon: '',
    price: '',
    time: '',
    fz: '', ps: '', jx: '', dp: '', xc: '', xk: '', fg: '', cj: '', js: ''
  }

  export default {
    name: 'add',
    data() {
      return {
        addDetail: addDetailInfo,
        cateList: [],    // 分类列表

        adminInfo: {},

        // 表单验证
        rules: {
          name: [
            {required: true, message: '请填写套餐名称', trigger: 'blur'},
            {min: 1, max: 50, message: '长度在 1 到 150 个字符', trigger: 'blur'}
          ],
          price: [
            {required: true, message: '请填写价格', trigger: 'blur'},
            {min: 1, max: 30000, message: '长度在 1 到 3000 个字符', trigger: 'blur'}
          ],
        },

        // tinymce初始化配置
        tinymceConfig: {
          height: 600,
          width: 800,
          menubar: true,
          branding: false,
          language: 'zh_CN',
          language_url: '/tinymce/langs/zh_CN.js',
          images_upload_handler: function (blobInfo, success, failure) {
            let formData = new FormData()
            formData.append('file', blobInfo.blob(), blobInfo.filename())
            uploadFile(formData).then(res => {
              if (res.success) {
                success(res.data.location)
              } else {
                failure('图片编辑失败')
              }
            }).catch(res => {
              this.$message({message: '图片编辑失败', type: 'error', duration: 1700})
            })

          },
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'code wordcount'
          ],
          toolbar:
            ' image  | \
            alignleft aligncenter alignright alignjustify'

        }
      }
    },
    components: {
      Editor
    },
    created() {
      this.init()

    },
    methods: {
      async init() {
        this.loginIs()

      },

      // 是否登录 Admin
      loginIs() {

        let admin = JSON.parse(window.localStorage.getItem('AdminInfoPhoto'))
        if (admin == undefined || admin == null || admin == '') {
          this.$router.push('/login')
          this.$message({message: '请您登录再操作', type: 'error', duration: 1700})
          return false
        } else {
          this.adminInfo = admin
          return true
        }

      },

      // 计数器
      handleChange(value) {

      },

      // 校验
      checkForm() {
        if (this.addDetail.name == '') {
          this.$message({message: '标题不能为空', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.content == '') {
          this.$message({message: '详情不能为空', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.price == '') {
          this.$message({message: '价格不能为空', type: 'error', duration: 1700})
          return false
        }


        if (this.addDetail.time == '') {
          this.$message({message: '拍摄时长不能为空', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.fz == '') {
          this.$message({message: '服装不能为空', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.ps == '') {
          this.$message({message: '拍摄张数不能为空', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.jx == '') {
          this.$message({message: '精修张数不能为空', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.dp == '') {
          this.$message({message: '底片不能为空', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.xc == '') {
          this.$message({message: '相册不能为空', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.xk == '') {
          this.$message({message: '相框不能为空', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.fg == '') {
          this.$message({message: '拍摄风格不能为空', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.cj == '') {
          this.$message({message: '拍摄场景不能为空', type: 'error', duration: 1700})
          return false
        }

        if (this.addDetail.js == '') {
          this.$message({message: '描述不能为空', type: 'error', duration: 1700})
          return false
        }


        if (this.addDetail.icon == '') {
          this.$message({message: '添加封面图', type: 'error', duration: 1700})
          return false
        }
        return true
      },

      // 添加
      submitForm() {
        if (!this.checkForm()) {
          return
        }

        addScenery(this.addDetail).then(res => {
          if (res.success) {
            this.$message({message: '添加成功', type: 'success', duration: 1700})
            this.resetForm()
          } else {
            this.$message({message: '添加失败', type: 'error', duration: 1700})
          }
        })
      },

      // 重置表单
      resetForm() {
        this.$refs.ruleForm.resetFields()
        this.addDetail = {
          name: '',
          content: '',
          icon: '',
          price: '',
          time: '',
        }
      },

      // oss 上传文件
      uploadHttp({file}) {
        let client = {}


        const {imgName} = 'ALIOSS_IMG_';
        const fileName = `${imgName}/${Date.parse(new Date())}`;  //定义唯一的文件名
        OSS(client).put(fileName, file, {
          'ContentType': 'image/jpeg'
        }).then(({res, url, name}) => {
          if (res && res.status == 200) {
            console.log(`阿里云OSS上传图片成功回调`, res, url, name);
          }
        }).catch((err) => {
          console.log(`阿里云OSS上传图片失败回调`, err);
        });
      },

      beforeAvatarUpload() {

      },

      handleRemove() {

      },


      // 封面上传成功
      handleAvatarSuccess(res, file) {
        if (res.success) {
          this.addDetail.icon = res.data.location
        } else {
          this.$message({message: '封面上传失败，请重新上传', type: 'error', duration: 1700})
        }

      }

    }
  }
</script>

<style scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .detail-form {
    margin: 10px 10%;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 260px;
    height: 290px;
    line-height: 290px;
    text-align: center;
    border: 1.4px #d9d9d9 dashed;
  }


  .avatar {
    width: 260px;
    height: 290px;
    margin: 4px auto;
    display: block;
    border-radius: 2.5%;
  }

  /* ======= */
  /* 上传图片 */
  /* ======= */
  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #5a98de;
  }

  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    /*width: 220px;*/
    width: 260px;
    height: 290px;
    color: #5a98de;
    text-align: center;
    border: 2px #5a98de dashed;
  }

  /deep/ .el-switch.is-checked .el-switch__core {
    border-color: #5a98de;
    background-color: #5a98de;
  }

  /deep/ .el-radio__input.is-checked + .el-radio__label {
    color: #5a98de;
  }

  /deep/ .el-radio__input.is-checked .el-radio__inner {
    border-color: #5a98de;
    background: #5a98de;
  }

  .base-width-50 {
    width: 50%
  }

  .base-width-30 {
    width: 30%
  }

  /deep/ .el-button--success {
    color: #FFF;
    background-color: #5a98de;
    border-color: #5a98de;
  }

  /deep/ .el-button--success:focus, .el-button--success:hover {
    background: #5a98de;
    border-color: #5a98de;
    color: #FFF;
  }
</style>
