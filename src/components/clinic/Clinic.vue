<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>诊所管理</el-breadcrumb-item>
      <el-breadcrumb-item>诊所列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row>
        <el-form :inline="true" :model="formInline">
          <el-form-item label="机构编号">
            <el-input v-model="formInline.bianhao" placeholder="请输入机构编号"></el-input>
          </el-form-item>
          <el-form-item label="机构名称">
            <el-input v-model="formInline.jigou" placeholder="请输入机构名称"></el-input>
          </el-form-item>
          <el-form-item label="诊所名称">
            <el-input v-model="formInline.name" placeholder="请输入诊所名称"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>

    <!-- 卡片试图区域 -->
    <el-card>
      <!-- 搜索与添加按钮 -->
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入查找内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true">添加按钮</el-button>
        </el-col>
      </el-row>
      <!-- 数据表格区域 -->
      <el-table :data="cliniclist" border stripe>
        <el-table-column type="index" label="序号" width="80" header-align="center" align="center"></el-table-column>
        <el-table-column label="机构名称" prop="jigou" width="200" header-align="center" align="center"></el-table-column>
        <el-table-column label="诊所名称" prop="address" width="200" header-align="center" align="center"></el-table-column>
        <!-- <el-table-column label="是否启用" prop="type"></el-table-column> -->
        <el-table-column label="是否启用" prop="type" width="100" header-align="center" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建人" prop="name" width="100" header-align="center" align="center"></el-table-column>
        <el-table-column label="手机号" prop="mobile" header-align="center" align="center"></el-table-column>
        <el-table-column label="邮箱" prop="email" header-align="center" align="center"></el-table-column>

        <el-table-column label="创建日期" prop="date" header-align="center" align="center"></el-table-column>

        <el-table-column label="操作" width="300" header-align="center" align="center">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">修改</el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)">删除</el-button>

            <!-- 重置密码按钮 -->
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)">重置密码</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>

    <!-- 添加按钮 弹出框 -->
    <el-dialog title="添加药品详细信息" :visible.sync="dialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormrules" ref="addFormRef" label-width="90px">
        <el-form-item label="所属机构" prop="jigou">
          <el-input v-model="addForm.jigou"></el-input>
        </el-form-item>
        <el-form-item label="诊所名称" prop="mingcheng">
          <el-input v-model="addForm.mingcheng"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改按钮 弹出框 -->
    <el-dialog title="编辑诊所信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <el-form ref="ruleForm" label-width="70px">
        <el-form-item label="机构名称">
          <el-input></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="ruleForm" label-width="70px">
        <el-form-item label="诊所名称">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="ruleForm" label-width="70px">
        <el-form-item label="创建人">
          <el-input></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="ruleForm" label-width="70px">
        <el-form-item label="手机号">
          <el-input></el-input>
        </el-form-item>
      </el-form>

      <el-form ref="ruleForm" label-width="70px">
        <el-form-item label="邮箱">
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
    // 验证邮箱的规则
    var checkEmail = (rule, value, cd) => {
      //邮箱正则
      const regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regEmail.test(value)) {
        //合法的邮箱
        return cd()
      }
      cd(new Error("请输入合法的邮箱"))
    }

    // 验证手机号的验证规则
    var checkMobile = (rule, value, cd) => {
      // 验证手机号的正则
      const regMobile =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
      if (regMobile.test(value)) {
        return cd()
      } else {
        cd(new Error("请输入合法的手机号"))
      }
    }

    return {
      formInline: {
        bianhao: "",
        jigou: "",
        name: "",
      },
      // 获取用户列表的参数对象
      queryInfo: {
        // 查询参数
        query: "",
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 5,
      },
      total: 10,
      // 验证邮箱的规则

      // 假数据 先用 最后换接口
      cliniclist: [
        {
          jigou: "塞斯口腔",
          address: "花园里",
          type: true,
          name: "张三",
          date: "2021-05-06",
          mobile: 13906088745,
          email: "11917482@qq.com",
          id: 1,
        },
        {
          jigou: "塞斯我我",
          address: "达瓦",
          type: true,
          name: "历史",
          date: "2021-05-06",
          mobile: 15903077218,
          email: "11917482@qq.com",
          id: 2,
        },
        {
          jigou: "我的的",
          address: "个俄国",
          type: true,
          name: "王五",
          date: "2021-05-06",
          mobile: 18939289804,
          email: "11917482@qq.com",
          id: 3,
        },
        {
          jigou: "的风格",
          address: "个人",
          type: true,
          name: "找楼",
          date: "2021-05-06",
          mobile: 18538565273,
          email: "11917482@qq.com",
          id: 4,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 17698222006,
          email: "11917482@qq.com",
          id: 5,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 15903086576,
          email: "11917482@qq.com",
          id: 6,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 15978744563,
          email: "11917482@qq.com",
          id: 7,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 13783762659,
          email: "11917482@qq.com",
          id: 8,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 13465597456,
          email: "11917482@qq.com",
          id: 9,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 15989844523,
          email: "11917482@qq.com",
          id: 10,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 15989844523,
          email: "11917482@qq.com",
          id: 11,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 15989844523,
          email: "11917482@qq.com",
          id: 12,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 15989844523,
          email: "11917482@qq.com",
          id: 13,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 15989844523,
          email: "11917482@qq.com",
          id: 14,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 17698222006,
          email: "11917482@qq.com",
          id: 15,
        },
        {
          jigou: "如果我",
          address: "分分",
          type: true,
          name: "六月",
          date: "2021-05-06",
          mobile: 17698222006,
          email: "11917482@qq.com",
          id: 16,
        },
        {
          jigou: "塞斯口腔",
          address: "花园里",
          type: true,
          name: "张三",
          date: "2021-05-06",
          mobile: 17698222006,
          email: "11917482@qq.com",
          id: 17,
        },
        {
          jigou: "塞斯口腔",
          address: "花园里",
          type: true,
          name: "张三",
          date: "2021-05-06",
          mobile: 17698222006,
          email: "11917482@qq.com",
          id: 18,
        },
      ],
      // 添加按钮 弹出框 默认隐藏
      dialogVisible: false,
      // 添加的数据
      addForm: {
        jigou: "",
        mingcheng: "",
        mobile: "",
        email: "",
        create: "",
        create_date: "",
      },
      // 添加的数据 验证正则
      addFormrules: {
        jigou: [{ required: true, message: "请输入所属机构", trigger: "blur" }],
        mingcheng: [{ required: true, message: "请诊所名称", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        // email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        // 手机正则
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
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
  created() {
    // 进去就获取数据
    this.getUserList()
  },
  mounted() {},
  methods: {
    // onSubmit 查询按钮
    onSubmit() {
      console.log("查询")
    },

    //
    getUserList() {
      console.log(11)
    },
    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize)
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
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
    // 监听Switech 开关状态的改变                //  等数据接口来了  换
    // async userStateChanged(userinfo) {
    //   console.log(userinfo)
    //   const { data: res } = await this.$http.put(
    //     `users/${userinfo.id}/state/${userinfo.mg_state}`
    //   )
    //   if (res.meta.status !== 200) {
    //     // 更新数据库失败 不能让页面切换状态
    //     userinfo.mg_state = !userinfo.mg_state
    //     return this.$message.error("更新用户状态失败")
    //   }
    //   this.$message.success("更新用户状态成功，ok")
    // },

    // 展示编辑信息的对话框
    showEditDialog(id) {
      console.log(id)
      this.editDialogVisible = true
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

    // 监听修改对话框关闭事件  数据清空
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
  },
}
</script>

<style scoped lang="less">
</style>
