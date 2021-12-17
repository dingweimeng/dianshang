<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-form :inline="true" :model="formInline">
          <el-form-item label="机构号">
            <el-input v-model="formInline.jigou" placeholder="请输入机构号"></el-input>
          </el-form-item>
          <el-form-item label="手机号  ">
            <el-input v-model="formInline.Mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="登录账号  ">
            <el-input v-model="formInline.login_id" placeholder="请输入登录账号"></el-input>
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
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加按钮</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column type="index" label="#" header-align="center" align="center"></el-table-column>
        <el-table-column label="机构名称" prop="username" header-align="center" align="center"></el-table-column>
        <el-table-column label="登录账号" prop="username" header-align="center" align="center"></el-table-column>
        <el-table-column label="创建人" prop="username" header-align="center" align="center"></el-table-column>
        <el-table-column label="邮箱" prop="email" header-align="center" align="center"></el-table-column>
        <el-table-column label="电话" prop="mobile" header-align="center" align="center"></el-table-column>
        <el-table-column label="角色" prop="role_name" header-align="center" align="center"></el-table-column>
        <el-table-column label="创建日期" prop="create_date" header-align="center" align="center"></el-table-column>

        <el-table-column label="是否启用" prop="mg_state" header-align="center" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px" header-align="center" align="center">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="shouEditDialog(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="权限分配" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <!-- 所属机构 -->
        <el-form-item label="所属机构" prop="jigouname">
          <!-- <el-input v-model="addForm.username"></el-input> -->
          <el-select v-model="addForm.username" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- 所属角色 -->
        <el-form-item label="所属角色" prop="role">
          <!-- <el-input v-model="addForm.username"></el-input> -->
          <el-select v-model="addForm.username" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- 登录账号 -->
        <el-form-item label="登录账号" prop="login_number">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @click="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <!-- 用户名 -->
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <!-- 规格 -->
        <el-form-item label="规格" prop="guige">
          <el-input v-model="editForm.guige"></el-input>
        </el-form-item>
        <!-- 生产厂家 -->
        <el-form-item label="生产厂家" prop="manufacturer">
          <el-input v-model="editForm.manufacturer"></el-input>
        </el-form-item>
        <!-- 创建人 -->
        <el-form-item label="创建人" prop="create">
          <el-input v-model="editForm.create"></el-input>
        </el-form-item>
        <!-- 创建人 -->
        <el-form-item label="创建日期" prop="create_date">
          <el-input v-model="editForm.create_date"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <!-- 手机 -->
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色的对话框 -->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%" @close="setRoleDialogClosed">
      <div>
        <p>当前的用户:{{ userInfo.username }}</p>
        <p>当前的角色:{{ userInfo.role_name }}</p>
        <!-- 下拉Select选择器 -->
        <p>
          分配新角色:
          <el-select v-model="selectedRoleId" placeholder="请选择">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.roleName" :value="item.id">
            </el-option>
          </el-select>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {},
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
        jigou: "",
        Mobile: "",
        login_id: "",
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
      userlist: [],
      total: 0,
      // 添加用户对话框 的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        jigouname: "",
        role: "",
        login_number: "",
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 添加表单的验证规则
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3~10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码的长度在6~16个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,

      // 查询到的用户信息对象
      editForm: {},
      // 修改表单的验证规则
      editFormRules: {
        guige: [{ required: true, message: "请输入药品规格", trigger: "blur" }],
        manufacturer: [
          { required: true, message: "请输入生产厂家", trigger: "blur" },
        ],
        create: [{ required: true, message: "请输入创建人", trigger: "blur" }],
        create_date: [
          { required: true, message: "请输入日期", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入用户手机", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
      // 控制分配角色对话框的显示与隐藏
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 所有角色的数据列表
      rolesList: [],
      // 已选中的角色的id值
      selectedRoleId: "",
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
    }
  },
  created() {
    // 进去就获取数据
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败")
      }
      // 拿到数据 赋值
      this.userlist = res.data.users
      this.total = res.data.total
      // console.log(res)
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
    // 监听Switech 开关状态的改变
    async userStateChanged(userinfo) {
      console.log(userinfo)
      const { data: res } = await this.$http.put(
        `users/${userinfo.id}/state/${userinfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        // 更新数据库失败 不能让页面切换状态
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error("更新用户状态失败")
      }
      this.$message.success("更新用户状态成功，ok")
    },
    // 监听添加对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击确认按钮 添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return
        // 可以发起添加用户的网络请求
        const { data: res } = await this.$http.post("users", this.addForm)
        if (res.meta.status !== 201) {
          this.$message.error("添加用户失败")
        }
        this.$message.success("添加用户信息成功")
        // 隐藏添加用户的对话框
        this.addDialogVisible = false
        // 重新获取用户的列表
        this.getUserList()
      })
    },

    // 展示编辑用户的对话框
    async shouEditDialog(id) {
      // console.log(id)
      const { data: res } = await this.$http.get("users/" + id)
      if (res.meta.status !== 200) {
        return this.$message.error("查询用户信息失败")
      }

      this.editForm = res.data
      // 用户对话框的显示与隐藏
      this.editDialogVisible = true
    },

    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 修改用户信息 确定按钮
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return
        // 发起修改用户信息的数据请求
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile,
          }
        )
        if (res.meta.status !== 200) {
          return this.$message.error("更新用户信息失败")
        }
        // 成功的话 关闭对话框
        this.editDialogVisible = false
        // 数据刷新
        this.getUserList()
        // 提示修改成功
        this.$message.success("修改信息成功")
      })
    },

    // 根据id 删除对应的用户信息
    async removeUserById(id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err)

      // 如果确定删除 则返回字符串 confirm  注意 是字符串
      // 如果取消删除 则返回字符串 cancel    注意 是字符串
      // console.log(confirmResult)

      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除")
      }
      // console.log("确定删除了")
      const { data: res } = await this.$http.delete("users/" + id)
      if (res.meta.status !== 200) {
        return this.$message.error("删除用户失败了")
      }
      this.$message.success("删除用户成功。")
      // 然后重新刷新数据
      this.getUserList()
    },

    // 展示分配角色的对话框
    async setRole(userInfo) {
      this.userInfo = userInfo

      // 在展示对话框之前，获取所有角色的列表
      const { data: res } = await this.$http.get("roles")
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败")
      }
      this.rolesList = res.data
      this.setRoleDialogVisible = true
    },
    // 点击确定按钮  分配角色
    async saveRoleInfo() {
      if (!this.selectedRoleId) {
        return this.$message.error("请选择要分配的角色")
      }

      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectedRoleId,
        }
      )

      if (res.meta.status !== 200) {
        return this.$message.error("更新角色失败")
      }

      this.$message.success("更新角色成功")
      // 更新页面
      this.getUserList()
      // 隐藏对话框
      this.setRoleDialogVisible = false
    },

    // 监听分配角色对话框的关闭事件
    setRoleDialogClosed() {
      this.selectedRoleId = ""
      this.userInfo = {}
    },
    onSubmit() {
      console.log("submit!")
    },
  },
  components: {},
}
</script>

<style scoped lang="less">
// 卡片距离
.box-card {
  margin-bottom: 30px;
}
</style>
