<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人设置</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <el-row>
        <el-col :span="14">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号:">
              123
            </el-form-item>
            <el-form-item label="名称:">
              郑州彭于晏
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-avatar shape="square" :size="150" fit="cover" :src="'http://localhost:8080/img/touxiang.bb496018.jpg'"></el-avatar>
          <p>
            <el-button type="primary" @click="$refs.file.click()">点击修改头像</el-button>
          </p>
          <input type="file" hidden ref="file" @change="onFileChange">
        </el-col>
      </el-row>

    </el-card>
    <!-- 修改头像弹出层 -->
    <el-dialog title="修改头像" :visible.sync="dialogVisible" width="30%" append-to-body>
      <img :src="'http://localhost:8080/img/touxiang.bb496018.jpg'" alt="" width="150">
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
      // 控制上传照片裁切预览  显示与隐藏
      dialogVisible: false,

      // 预览图片

      previewImage: "",
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 保存信息按钮
    onSubmit() {
      console.log("submit!")
    },

    // 当选择头像发生改变出发 事件
    onFileChange() {
      // console.log("图片发生变化了")
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData

      // 展示弹出层 预览用户照片
      this.dialogVisible = true

      // 避免选择同一路径不会触发
      this.$refs.file.value = ""
    },
  },
}
</script>

<style scoped lang="less"></style>
