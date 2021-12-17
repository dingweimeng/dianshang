<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
      <div ref="main" style="width: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
// 1 导入echarts
// import echarts from "echarts"
import * as echarts from "echarts"

// 基于准备好的dom，初始化echarts实例
export default {
  props: {},
  data() {
    return {}
  },
  methods: {},
  // vue 生命周期 mounted 组件第一次被渲染到浏览器中 已经渲染完毕了
  mounted() {
    var myChart = echarts.init(this.$refs.main)
    // var myChart = echarts.init(document.getElementById("main"))
    var option = {
      title: {
        text: " 药品销量统计",
      },
      tooltip: {},
      xAxis: {
        data: [
          "感冒药",
          "莲花胶囊",
          "复方氨我",
          "健胃消食片",
          "江中消食片",
          "葡萄糖",
        ],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    }

    myChart.setOption(option)
  },
  computed: {},
}
</script>

<style scoped lang="less"></style>
