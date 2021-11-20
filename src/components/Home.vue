<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  methods: {
    // 退出按钮 1清除token  sesslin 可以用clear 或者removeietm  local 慎用clear  2跳转 登录页面
    logout() {
      window.sessionStorage.clear('token')
      this.$router.push('/login')
    },
  },
  components: {},
}
</script>

<style scoped lang="less"></style>
