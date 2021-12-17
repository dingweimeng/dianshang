<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>机构管理</el-breadcrumb-item>
      <el-breadcrumb-item>机构列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-form :inline="true" :model="formInline">
          <el-form-item label="机构名称">
            <el-input v-model="formInline.jigou" placeholder="请输入机构"></el-input>
          </el-form-item>
          <el-form-item label="管理员姓名">
            <el-input v-model="formInline.name" placeholder="请输入管理员姓名"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>

    <!-- 卡片数据区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入查询内容" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true">添加机构</el-button>
        </el-col>
      </el-row>
      <!-- 数据区域 -->
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="Drugnumber" label="机构编号" width="200">
        </el-table-column>
        <el-table-column prop="Drugname" label="机构名称" width="250">
        </el-table-column>

        <el-table-column label="是否启用" prop="mgstate" width="200">
          <template slot-scope="scope">
            <!-- {{scope.row.mgstate}} -->
            <el-switch v-model="scope.row.mgstate" @change="switchChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="创建人" width="250">
        </el-table-column>
        <el-table-column prop="date" label="创建日期" width="250">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分页区域留位置开始 -->
    <!-- 分页区域留位置结束 -->

    <!-- 添加按钮 弹出框 -->
    <el-dialog title="添加机构详细信息" :visible.sync="dialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormrules" ref="addFormRef" label-width="90px">
        <el-form-item label="机构编号" prop="bianhao">
          <el-input v-model="addForm.bianhao"></el-input>
        </el-form-item>
        <el-form-item label="机构名称" prop="mingcheng">
          <el-input v-model="addForm.mingcheng"></el-input>
        </el-form-item>

        <el-form-item label="创建人" prop="create">
          <el-input v-model="addForm.create"></el-input>
        </el-form-item>
        <el-form-item label="创建日期" prop="create_date">
          <el-input v-model="addForm.create_date"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部按钮区域  -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改按钮 弹出框 -->
    <el-dialog title="编辑机构信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 机构编号 -->
      <el-form ref="ruleForm" label-width="70px">
        <el-form-item label="机构编号">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <!-- 机构名称 -->
      <el-form ref="ruleForm" label-width="70px">
        <el-form-item label="机构名称">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: [],
  data() {
    return {
      formInline: {
        jigou: "",
        name: "",
      },
      // 添加按钮 弹出框 默认隐藏
      dialogVisible: false,
      // 假数据
      tableData: [
        {
          Drugnumber: 10001,
          Drugname: "复方按加盟黄敏胶囊",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-02",
          name: "达瓦",
          address: "上海市普陀区金沙江路 1518 弄",
          mgstate: false,
          id: 1,
        },
        {
          Drugnumber: 10002,
          Drugname: "复方敌敌畏",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-04",
          name: "我我我",
          address: "上海市普陀区金沙江路 1517 弄",
          mgstate: true,
          id: 2,
        },
        {
          Drugnumber: 10003,
          Drugname: "欧盟药品",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-01",
          name: "饿人人",
          address: "上海市普陀区金沙江路 1519 弄",
          mgstate: true,
          id: 3,
        },
        {
          Drugnumber: 10004,
          Drugname: "感冒药",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-03",
          name: "有有有",
          address: "上海市普陀区金沙江路 1516 弄",
          mgstate: true,
          id: 4,
        },
        {
          Drugnumber: 10001,
          Drugname: "复方按加盟黄敏胶囊",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-02",
          name: "有有有有uu",
          address: "上海市普陀区金沙江路 1518 弄",
          mgstate: true,
          id: 5,
        },
        {
          Drugnumber: 10002,
          Drugname: "复方敌敌畏",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-04",
          name: "他他他",
          address: "上海市普陀区金沙江路 1517 弄",
          mgstate: true,
          id: 6,
        },
        {
          Drugnumber: 10003,
          Drugname: "欧盟药品",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-01",
          name: "饿人人",
          address: "上海市普陀区金沙江路 1519 弄",
          mgstate: false,
          id: 7,
        },
        {
          Drugnumber: 10004,
          Drugname: "感冒药",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-03",
          name: "达娃大",
          address: "上海市普陀区金沙江路 1516 弄",
          mgstate: false,
          id: 8,
        },
        {
          Drugnumber: 10001,
          Drugname: "复方按加盟黄敏胶囊",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-02",
          name: "达瓦",
          address: "上海市普陀区金沙江路 1518 弄",
          mgstate: false,
          id: 9,
        },
        {
          Drugnumber: 10002,
          Drugname: "复方敌敌畏",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-04",
          name: "我我我",
          address: "上海市普陀区金沙江路 1517 弄",
          mgstate: true,
          id: 10,
        },
        {
          Drugnumber: 10003,
          Drugname: "欧盟药品",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-01",
          name: "饿人人",
          address: "上海市普陀区金沙江路 1519 弄",
          mgstate: true,
          id: 11,
        },
        {
          Drugnumber: 10004,
          Drugname: "感冒药",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-03",
          name: "有有有",
          address: "上海市普陀区金沙江路 1516 弄",
          mgstate: true,
          id: 12,
        },
        {
          Drugnumber: 10001,
          Drugname: "复方按加盟黄敏胶囊",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-02",
          name: "有有有有uu",
          address: "上海市普陀区金沙江路 1518 弄",
          mgstate: false,
          id: 13,
        },
        {
          Drugnumber: 10002,
          Drugname: "复方敌敌畏",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-04",
          name: "他他他",
          address: "上海市普陀区金沙江路 1517 弄",
          mgstate: true,
          id: 14,
        },
        {
          Drugnumber: 10003,
          Drugname: "欧盟药品",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-01",
          name: "饿人人",
          address: "上海市普陀区金沙江路 1519 弄",
          mgstate: false,
          id: 15,
        },
        {
          Drugnumber: 10004,
          Drugname: "感冒药",
          guige: "6g*11袋",
          address: "上海公司",
          date: "2016-05-03",
          name: "达娃大",
          address: "上海市普陀区金沙江路 1516 弄",
          mgstate: false,
          id: 16,
        },
      ],
      // 添加的数据
      addForm: {
        bianhao: "",
        mingcheng: "",
        create: "",
        create_date: "",
      },
      // 添加的数据 验证正则
      addFormrules: {
        bianhao: [
          { required: true, message: "请输入药品编号", trigger: "blur" },
        ],
        mingcheng: [
          { required: true, message: "请输入药品名称", trigger: "blur" },
        ],

        // 创建人
        create: [{ required: true, message: "请输入创建人", trigger: "blur" }],
        // 创建日期
        create_date: [
          { required: true, message: "请输入创建日期", trigger: "blur" },
        ],
      },

      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 查询
    onSubmit() {
      console.log("submit!")
    },
    getUserList() {
      console.log("添加")
    },
    // 重置添加框 信息
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 没有消息不让通过
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        // console.log(valid)
        // 判断 当 valid 不是空的话 发起请求
        if (!valid) {
          this.dialogVisible = true
          return this.$message.error("请填入完整信息")
        }
        // 成功的话 发起请求
        this.$message.success("添加成功 (先假数据 等接口)")
        this.dialogVisible = false
      })
    },

    // 展示编辑信息的对话框
    showEditDialog(id) {
      console.log(id)
      this.editDialogVisible = true
    },

    // 监听修改对话框关闭事件  数据清空
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 删除按钮  根据用户id 删除对于的机构信息
    removeUserById(id) {
      // console.log(id)
      // 删除比较特殊 怕误点 所以提示
      this.$confirm("此操作将永久删除该机构, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
    },
  },
}
</script>

<style scoped lang="less">
</style>
