<template>
  <div class="login_containe">
    <div class="login_box">
      <!-- 头像
      <div class="img">
        <img src="@/assets/logo.png" alt="" />
      </div> -->
      <!-- 表单 -->
      <div class="text">
        <h3> 诊所综合后台管理系统</h3>

      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入用户名/手机号"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password" placeholder="请输入密码/短信验证"></el-input>
        </el-form-item>
        <!-- 我已阅读并同意用户协议和隐私条款 -->
        <el-form-item prop="agree">
          <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import request from '@/utils/request.js'

export default {
  props: {},
  data() {
    return {
      // 登录表单数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
        agree: false, //是否同意协议
      },

      // checked: false,    // 我已阅读并同意用户协议和隐私条款 默认 不勾选
      // 登录按钮 转圈圈
      // loginLoading: false,
      // 表单验证
      loginFormRules: {
        //
        username: [
          {
            required: true,
            message: "请输入正确请输入用户名/手机号",
            trigger: "blur",
          },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入正确密码/短信验证",
            trigger: "blur",
          },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error("请同意用户协议"))
              }
            },
            trigger: "change",
          },
        ],
      },
    }
  },
  methods: {
    login() {
      // 登录按钮 转圈圈
      // this.loginLoading = true
      // console.log(this)
      //   el-form 绑定  ref="loginFormRef"
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return

        const { data: res } = await this.$http.post("login", this.loginForm)
        console.log(res)
        if (res.meta.status !== 200) {
          // 登录按钮 转圈圈
          // this.loginLoading = false
          return this.$message.error("登录失败")
        }

        // 登录成功 要有提示  暂停按钮转圈圈  存token  跳转页面
        // 登录按钮 转圈圈
        // this.loginLoading = false

        this.$message.success("登录成功")
        window.sessionStorage.setItem("token", res.data.token)
        this.$router.push("/home")
      })
    },
    // 重置方法  打印this this.refs     el-form 框架的方法   resetFields()

    resetLoginForm() {
      console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
  },
  computed: {},
}
</script>

<style scoped lang="less">
.login_containe {
  background-color: #2b4b6b;
  height: 100%;
  background: url(../assets/login_bg.jpg);
  background-size: cover;
}
.login_box {
  width: 400px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
// .img {
//   width: 100px;
//   height: 100px;
//   border: 1px solid rgb(241, 236, 236);
//   border-radius: 50%;
//   padding: 10px;
//   position: absolute;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: #fff;

//   img {
//     width: 100%;
//     height: 100%;
//     border-radius: 50%;
//     background-color: #ccc;
//   }
// }
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0px 20px;
  box-sizing: border-box;
}
.text {
  text-align: center;
}
</style>

