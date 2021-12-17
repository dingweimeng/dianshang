<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片试图区域 -->
    <el-card>
      <el-table :data="rightsList" border srtipe>
        <el-table-column label='#' type="index" header-align="center" align="center"></el-table-column>
        <el-table-column label="权限名称" prop="authName" header-align="center" align="center"></el-table-column>
        <el-table-column label="路径" prop="path" header-align="center" align="center"></el-table-column>
        <el-table-column label="权限等级" prop="level" header-align="center" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level==='0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level==='1'">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>

          </template>
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 权限列表
      rightsList: [],
    }
  },
  created() {
    // 获取所有权限
    this.getRightsList()
  },
  methods: {
    async getRightsList() {
      const { data: res } = await this.$http.get("rights/list")
      if (res.meta.status !== 200) {
        return this.$message.error("获取权限列表失败")
      }
      this.rightsList = res.data
      console.log(this.rightsList)
    },
  },
  components: {},
}
</script>

<style scoped lang="less">
</style>
