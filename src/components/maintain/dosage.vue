<template>
  <div>

    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>字典维护</el-breadcrumb-item>
      <el-breadcrumb-item>药品用法</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片试图区域 -->
    <el-card>
      <el-form :inline="true" :model="form">
        <el-form-item label="处方类别">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="全部" value="all"></el-option>
            <el-option label="西/成药" value="xy"></el-option>
            <el-option label="中药" value="zy"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="分类名称">
          <el-input placeholder='请输入分类名称'></el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="showEditDialog">新增</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 下卡片 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 数据部分 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column prop="date" label="处方分类" width="250" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="date" label="用法名称" width="250" header-align="center" align="center">
        </el-table-column>

        <el-table-column prop="date" label="创建日期" width="250" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="name" label="创建人" width="250" header-align="center" align="center">
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="shouEditDialog">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

    <!-- 新增按钮 弹出框 -->
    <el-dialog title="新增药品分类" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
      <!-- 新增 -->
      <el-form :inline="true" :model="form_xinzheng">
        <el-form-item label="处方类别">
          <el-select v-model="form_xinzheng.region" placeholder="请选择活动区域">
            <el-option label="全部" value="all"></el-option>
            <el-option label="西/成药" value="xy"></el-option>
            <el-option label="中药" value="zy"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 分类名称 -->
      <el-form ref="ruleForm" label-width="70px">
        <el-form-item label="分类名称">
          <el-input placeholder='请输入分类名称'></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑药品分类 -->
    <el-dialog title="新增药品分类" :visible.sync="bj_editDialogVisible" width="30%" @close="bj_editDialogClosed">
      <!-- 新增 -->
      <el-form :inline="true" :model="form_xinzheng">
        <el-form-item label="处方类别">
          <el-select v-model="form_xinzheng.region" placeholder="请选择活动区域">
            <el-option label="全部" value="all"></el-option>
            <el-option label="西/成药" value="xy"></el-option>
            <el-option label="中药" value="zy"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 分类名称 -->
      <el-form ref="ruleForm" label-width="70px">
        <el-form-item label="分类名称">
          <el-input placeholder='请输入分类名称'></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="bj_editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="bj_editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      queryInfo: {
        query: "",
      },
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      // 新增的
      form_xinzheng: {
        region: "",
      },
      // 新增按钮对话框的显示与隐藏
      editDialogVisible: false,
      // 编辑按钮对话框的显示与隐藏
      bj_editDialogVisible: false,

      // 表格数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 查询按钮

    // 展示编辑信息的对话框
    showEditDialog() {
      // console.log(id)
      this.editDialogVisible = true
    },
    // 监听展示编辑信息的对话框关闭事件  数据清空
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 监听编辑信息的对话框关闭事件  数据清空
    bj_editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 点击编辑按钮  显示出来
    shouEditDialog() {
      this.bj_editDialogVisible = true
    },
    // 点击删除按钮 删除数据

    // 根据id 删除对应的用户信息
    removeUserById() {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err)

      // 如果确定删除 则返回字符串 confirm  注意 是字符串
      // 如果取消删除 则返回字符串 cancel    注意 是字符串
      // console.log(confirmResult)

      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除")
      }

      // const { data: res } = await this.$http.delete("users/" + id)
      // if (res.meta.status !== 200) {
      //   return this.$message.error("删除用户失败了")
      // }
      // this.$message.success("删除用户成功。")
      // 然后重新刷新数据
      // this.getUserList()
    },
  },
}
</script>

<style scoped lang="less">
</style>

