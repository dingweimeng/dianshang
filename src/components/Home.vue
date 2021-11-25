<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div class="img">
        <img src="../assets/logo.png" alt="" />
        <span>万全商城后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面组题区域 -->
    <el-container>
      <!-- 左侧边栏 -->
      <!-- 如果折叠起来就是64px  否则200px -->
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <!-- 隐藏按钮 -->
        <div class="zhedie-btn" @click="zhedie_btn">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="green" :collapse="iscollapse" :collapse-transition="false" router :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path + ''" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <!-- 二级菜单模板 -->

              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主题内容部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      // 一级导航图标 对应id 去渲染
      iconObj: {
        125: "el-icon-s-custom",
        103: "el-icon-s-home",
        101: "el-icon-shopping-bag-1",
        102: "el-icon-tickets",
        145: "el-icon-s-data",
      },
      // 是否折叠
      iscollapse: false,
      // 被激活的链接地址
      activePath: "",
    }
  },
  created() {
    // 得到菜单数据
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem("activePath")
  },
  methods: {
    // 退出按钮 1清除token  sesslin 可以用clear 或者removeietm  local 慎用clear  2跳转 登录页面
    logout() {
      window.sessionStorage.clear("token")
      this.$router.push("/login")
    },
    // 获取所有的菜单
    async getMenuList() {
      const { data: res } = await this.$http.get("menus")
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      // console.log(res)
    },
    // 点击按钮切换折叠
    zhedie_btn() {
      this.iscollapse = !this.iscollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem("avtivePath", activePath)
      this.activePath = activePath
    },
  },
  components: {},
}
</script>

<style scoped lang="less">
.el-container {
  height: 100%;
}
// 头部
.el-header {
  background-color: #373d41;
  display: flex;
  // 两端对齐
  justify-content: space-between;
  // 侧轴中心对齐
  align-items: center;
  color: white;
  font-size: 20px;
  .img {
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
    }
  }
}
// 侧边栏
.el-aside {
  background-color: #333744;
  // 侧边栏有1边框
  .el-menu {
    border: none;
  }
}
// 中间主题
.el-main {
  background-color: #eaedf1;
}
.zhedie-btn {
  background-color: #4a5064;
  color: #fff;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
}
</style>
