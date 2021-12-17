<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>药品管理</el-breadcrumb-item>
      <el-breadcrumb-item>药品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-form :inline="true" :model="formInline">
          <el-form-item label="药品编号">
            <el-input v-model="formInline.user" placeholder="请输入药品编号"></el-input>
          </el-form-item>
          <el-form-item label="药品名称">
            <el-input v-model="formInline.name" placeholder="请输入药品名称"></el-input>
          </el-form-item>
          <el-form-item label="药品状态">
            <el-select v-model="formInline.region" placeholder="请选择药品状态">
              <el-option label="请选择药品状态" value="123"></el-option>
              <el-option label="已启用" value="shanghai"></el-option>
              <el-option label="未启用" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <!-- <el-button type="info" @click="onSubmit">重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>

    <!-- 卡片试图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" clearable v-model="queryInfo.query" @clear="getUserList">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加药品</el-button>
        </el-col>
      </el-row>

      <!-- 数据区域 -->
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="序号" width="50" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="Drugnumber" label="药品编号" width="150" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="Drugname" label="药品名称" width="200" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="guige" label="规格" width="150" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="address" label="生产厂家" width="280" header-align="center" align="center">
        </el-table-column>

        <el-table-column label="是否启用" prop="mgstate" width="150" header-align="center" align="center">
          <template slot-scope="scope">
            <!-- {{scope.row.mgstate}} -->
            <el-switch v-model="scope.row.mgstate" @change="switchChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="创建人" width="150" header-align="center" align="center">
        </el-table-column>
        <el-table-column prop="date" label="创建日期" width="200" header-align="center" align="center">
        </el-table-column>

        <el-table-column label="操作" header-align="center" align="center">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 30, 50]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="this.total">
      </el-pagination>
    </el-card>

    <!-- 添加按钮 弹出框 -->
    <el-dialog title="添加药品详细信息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormrules" ref="addFormRef" label-width="90px">
        <el-form-item label="药品编号" prop="bianhao">
          <el-input v-model="addForm.bianhao"></el-input>
        </el-form-item>
        <el-form-item label="药品名称" prop="mingcheng">
          <el-input v-model="addForm.mingcheng"></el-input>
        </el-form-item>
        <el-form-item label="药品规格" prop="guige">
          <el-input v-model="addForm.guige"></el-input>
        </el-form-item>
        <el-form-item label="药品厂家" prop="changjia">
          <el-input v-model="addForm.changjia"></el-input>
        </el-form-item>
        <el-form-item label="创建人" prop="create">
          <el-input v-model="addForm.create"></el-input>
        </el-form-item>
        <el-form-item label="创建日期" prop="create_date">
          <el-input v-model="addForm.create_date"></el-input>
        </el-form-item>
      </el-form>

      <!-- 底部按钮区域  -->
      <span slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
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
      drugLict: [], //总数居列表  先不用
      total: 20,
      // 分页
      formInline: {
        user: "",
        name: "",
        region: "",
      },
      // 页面
      queryInfo: {
        query: "",
        // 当前页数
        pagenum: 1,
        // 每页多少
        pagesize: 5,
      },
      // 添加按钮 弹出框 默认隐藏
      addDialogVisible: false,
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
        },
      ],

      // 添加的数据
      addForm: {
        bianhao: "",
        mingcheng: "",
        guige: "",
        changjia: "",
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
        guige: [{ required: true, message: "请输入药品规格", trigger: "blur" }],
        changjia: [
          { required: true, message: "请输入药品厂家", trigger: "blur" },
        ],
        // 创建人
        create: [{ required: true, message: "请输入创建人", trigger: "blur" }],
        // 创建日期
        create_date: [
          { required: true, message: "请输入创建日期", trigger: "blur" },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200)
        return this.$message.error("获取列表数据失败")
      this.drugLict = res.data.users
      this.total = res.data.total
    },
    onSubmit() {
      console.log("submit!")
    },

    // 分页器功能 ==============
    //
    handleSizeChange(newSize) {
      console.log(newSize)
      this.queryInfo.pagenum = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      console.log(newPage)
      this.queryInfo.pagesize = newPage
      this.getUserList()
    },

    // switch 部分
    switchChange(userInfo) {
      console.log(userInfo)
    },

    // 重置添加框 信息
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 添加按钮里 确认按钮 没有消息不让通过
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
  },
}
</script>

<style scoped lang="less">
</style>
