<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <div class="img">
        <img src="../assets/yj_logo.png" alt="" />
        <span class="span">医健诊所后台管理系统</span>
      </div>
      <!-- <el-button type="info" @click="logout">退出</el-button> -->
      <el-dropdown>
        <div class="avatar-wrap">
          <img class="avatar" src="../../public/touxiang.jpg" alt="" />
          <span>郑州彭于晏</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="set_push">设置</el-dropdown-item>
          <!-- 组件点击click 不管用将原生事件绑定到组件 需要加修饰符 .native  -->
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 页面组题区域 -->
    <el-container>
      <!-- 左侧边栏 -->
      <!-- 如果折叠起来就是64px  否则200px -->
      <el-aside :width="iscollapse ? '64px' : '200px'">
        <!-- 隐藏按钮 -->
        <div class="zhedie-btn" @click="zhedie_btn">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu background-color="#012033" text-color="#fff" active-text-color="green" :collapse="iscollapse" :collapse-transition="false" router :default-active="activePath">
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
          <!-- 自己添加多级菜单 字典维护模块 -->
          <el-menu background-color="#012033" text-color="#fff" active-text-color="green" :collapse="iscollapse" :collapse-transition="false" router :default-active="activePath">
            <el-submenu index="maintenance">
              <template slot="title">
                <i class="el-icon-s-open"></i>
                <span>字典维护</span>
              </template>
              <el-menu-item index="classify">
                <i class="el-icon-menu"></i>
                <span slot="title">药品分类</span>
              </el-menu-item>
              <el-menu-item index="usage">
                <i class="el-icon-menu"></i>
                <span slot="title">药品用法</span>
              </el-menu-item>
              <el-menu-item index="dosage">
                <i class="el-icon-menu"></i>
                <span slot="title">药品剂型</span>
              </el-menu-item>
              <el-menu-item index="packing">
                <i class="el-icon-menu"></i>
                <span slot="title">包装单位</span>
              </el-menu-item>
              <el-menu-item index="storage">
                <i class="el-icon-menu"></i>
                <span slot="title">入库类型</span>
              </el-menu-item>
              <el-menu-item index="delivery">
                <i class="el-icon-menu"></i>
                <span slot="title">出库类型</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <!-- 自己添加的多级菜单 统计分析模块 -->
          <el-menu background-color="#012033" text-color="#fff" active-text-color="green" :collapse="iscollapse" :collapse-transition="false" router :default-active="activePath">
            <el-submenu index='statistic'>
              <template slot="title">
                <i class="el-icon-s-data"></i>
                <span>统计分析</span>
              </template>
              <el-menu-item index="ruku">
                <i class="el-icon-menu"></i>
                <span slot="title">入库统计</span>
              </el-menu-item>
              <el-menu-item index="chuku">
                <i class="el-icon-menu"></i>
                <span slot="title">出库统计</span>
              </el-menu-item>
              <el-menu-item index="purchase">
                <i class="el-icon-menu"></i>
                <span slot="title">进销存统计</span>
              </el-menu-item>
              <el-menu-item index="ranking">
                <i class="el-icon-menu"></i>
                <span slot="title">药品销售排行</span>
              </el-menu-item>
              <el-menu-item index="detail">
                <i class="el-icon-menu"></i>
                <span slot="title">药品销售明细</span>
              </el-menu-item>

            </el-submenu>

          </el-menu>
          <!-- 自己添加的一级 -->
          <el-menu-item index="drug">
            <i class="iconfont icon-yaowan"></i>
            <span slot="title">药品管理</span>
          </el-menu-item>
          <el-menu-item index="clinic">
            <i class="iconfont icon-xiaozhensuo"></i>
            <span slot="title">诊所管理</span>
          </el-menu-item>
          <el-menu-item index="jigou">
            <i class="iconfont icon-yiliaojigou"></i>
            <span slot="title">机构管理</span>
          </el-menu-item>
          <el-menu-item index="setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
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
      // 删除比较特殊 怕误点 所以提示
      this.$confirm("此操作将退出该登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.sessionStorage.clear("token")
          this.$router.push("/login")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登录",
          })
        })
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

    // 头像设置 跳转
    set_push() {
      this.$router.push("/setting")
      // this.$router.push("/home")
      console.log(1111)
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
  background-color: #012033;
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
    padding: 5px;

    img {
      width: 40px;
      height: 40px;
    }
  }
}
// 侧边栏
.el-aside {
  background-color: #012033;
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
  // 鼠标放上 小手
  cursor: pointer;
  // 竖线变宽点
  letter-spacing: 0.2em;
}

.avatar-wrap {
  display: flex;
  align-items: center;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 10px;
  }
}
// 字体图标库样式
.iconfont {
  margin-right: 10px;
  padding-left: 3px;
}
.span {
  margin-left: 10px;
}
</style>
