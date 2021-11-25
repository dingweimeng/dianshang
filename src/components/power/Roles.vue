<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->

    <el-card>
      <!-- 添加角色按钮区域 -->
      <el-row>
        <el-col>
          <el-button type="primary"> 添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表部分 -->
      <el-table :data="rolelist" border stripe>
        <!-- 展开列    用 type='expand'-->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row :class="['bdbottom',i1===0?'bdtop' :'']" v-for="(item1,i1) in scope.row.children" :key="item1.id" closable>
              <!-- 渲染一级权限 一共24列  -->
              <el-col :span="5">
                <el-tag closable @close="removeRightByid(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <!-- 箭头 -->
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级和级权限 -->
              <el-col :span="19">
                <!-- 通过for 循环嵌套渲染二级路由 -->
                <el-row :class="[i2===0? '' :'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
                  <!-- 二级权限 -->
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightByid(scope.row,item2.id)">{{item2.authName}}</el-tag>
                    <!-- 箭头 -->
                    <i class="el-icon-caret-right"></i>
                  </el-col>

                  <!-- 三级权限 -->
                  <el-col :span="18">
                    <el-tag type="warning" v-for="item3 in item2.children" :key="item3.id" closable @close="removeRightByid(scope.row,item3.id)">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>

                </el-row>
              </el-col>

            </el-row>
            <!-- 查看样式
            <pre>
              {{scope.row}}
            </pre> -->
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit">搜索</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
            <el-button size="mini" type="warning" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close='setRightDialogClosed'>
      <!--   树形控件  -->
      <el-tree :data="rightslist" :props="treeProps" show-checkbox node-key='id' default-expand-all :default-checked-keys='defKeys' ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 定义 所有角色列表数据
      rolelist: [],
      // 控制分配权限对话框的显示也隐藏
      setRightDialogVisible: false,
      // 所有权限的数据
      rightslist: [],
      // 树形控件的属性绑定对象
      treeProps: {
        label: "authName",
        children: "children",
      },
      // 默认选中的节点id 值 数组
      defKeys: [],
      // 当前即将分配权限的角色id
      roleId: "",
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 获取所有角色的列表
    async getRoleList() {
      const { data: res } = await this.$http.get("roles")
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败！")
      }
      this.rolelist = res.data
    },
    // 根据id 删除对应的权限
    async removeRightByid(role, rightId) {
      // 弹框提示用户是否要删除
      const confirmResult = await this.$confirm(
        "此操作将永久删除该权限, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err)

      if (confirmResult !== "confirm") {
        return this.$message.info("取消了删除.")
      }
      // console.log("删除了")
      // 调取接口 开始删除
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      )
      if (res.meta.status !== 200) {
        return this.$message.error("删除权限失败！！")
      }
      // 删除成功  提示
      this.$message.success("删除权限成功.")
      role.children = res.data
    },
    // 展示分配权限的对话框
    async showSetRightDialog(role) {
      // 传id
      this.roleId = role.id
      // 获取所有权限的数据
      const { data: res } = await this.$http.get("rights/tree")

      if (res.meta.status !== 200) {
        return this.$message.error("获取权限数据失败！")
      }

      // 成功的话 把请求的数据 保存到 data 中
      this.rightslist = res.data
      // console.log(this.rightslist)

      // 递归获取三级节点的id
      this.getLeafKeys(role, this.defKeys)

      this.setRightDialogVisible = true
    },
    // 通过递归的形式 获取角色下所有三级权限的id 保存到defKeys数组中
    getLeafKeys(node, arr) {
      // 如果当前node节点不包括children属性 就是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }

      node.children.forEach((item) => this.getLeafKeys(item, arr))
    },
    // 监听分配权限对话框的关闭事件
    setRightDialogClosed() {
      this.defKeys = []
    },

    // 点击确定 为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys(),
      ]
      // console.log(keys)
      const idStr = keys.join(",")
      // 发请求
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      if (res.meta.status !== 200) {
        return this.$message.error("分配权限失败！")
      }
      this.$message.success("分配权限成功")
      // 重新刷新页面
      this.getRoleList()
      // 对话框隐藏
      this.setRightDialogVisible = false
    },
  },
  components: {},
}
</script>

<style scoped lang="less">
.el-tag {
  margin: 7px;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}

.bdtop {
  border-top: 1px solid #eee;
}

.vcenter {
  display: flex;
  align-items: center;
}
</style>
