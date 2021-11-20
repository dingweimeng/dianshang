<template>
  <!-- 一个根 -->
  <div class="login-container">
    <!-- 中间大盒子 -->
    <div class="login-box">
      <!-- vue 图标 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_for"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reseLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 登录表单数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      // 表单验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    // 登录按钮
    login() {
      // 组件方法 重置validate()
      this.$refs.loginFormRef.validate(async (valid) => {
        // 如果错误 就停止
        if (!valid) false
        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log(res) //返回状态码200 表示成功 1要有提示2 要存值 存 sessionStorage中 因为后台管理系统关闭页面就要清理token 3跳转页面
        if (res.meta.status == 200) {
          // 组件方法
          this.$message.success('登陆成功! ')
          // 存 sessionStorage中 关闭页面会清除掉token
          window.sessionStorage.setItem('token', res.data.token)
          // 通过编程时导航 跳转
          this.$router.push('/home')
        } else {
          return this.$message.error('登陆失败！')
        }
      })
    },
    // 重置按钮
    reseLoginForm() {
      // 组件方法 重置resetFields()
      this.$refs.loginFormRef.resetFields()
    },
  },
  components: {},
}
</script>

<style scoped lang="less">
.login-container {
  // background-color: #2b4b6b;
  height: 100%;
  background: url(../assets/login_bg.jpg) no-repeat;
}

.login-box {
  position: relative;
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 3px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
  .btns {
    display: flex;
    justify-content: flex-end;
  }
  .login_for {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0px 20px;
    box-sizing: border-box;
  }
}
</style>
