<template>
  <div>
    <!-- 上部分 -->
    <el-card>
      <h3>Welcome 医健综合诊所后台管理系统</h3>
      <el-row :gutter="20" class="mgb20">
        <el-col :span="6">
          <el-card :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-1">
              <div class="grid-cont-right">
                <div class="grid-num">1234</div>
                <div>订单</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-2">
              <div class="grid-cont-right">
                <div class="grid-num">321</div>
                <div>药品</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-3">
              <div class="grid-cont-right">
                <div class="grid-num">5000</div>
                <div>收入(元)</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{padding: '0px'}">
            <div class="grid-content grid-con-4">
              <div class="grid-cont-right">
                <div class="grid-num">5000</div>
                <div>净利润(元)</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <!-- 统计部分 -->

    <el-card class="box-card">
      <!--  2为 ECharts 准备一个定义了宽高的 DOM -->
      <div ref="main" style="width: 1500px; height: 400px"></div>
    </el-card>

  </div>
</template>

<script>
// 1 引入
import * as echarts from "echarts"

export default {
  props: {},
  data() {
    return {}
  },
  methods: {},
  // 注 初始化操作dom 一定要写mounted 钩子函数中
  mounted() {
    // 3
    var myChart = echarts.init(this.$refs.main)

    var option = {
      title: {
        text: " 药品销量统计",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: [
          "感冒药",
          "莲花胶囊",
          "复方氨我",
          "健胃消食片",
          "江中消食片",
          "葡萄糖",
          "黑杂粮饼干",
          "葡萄糖口服液",
          "口服液",
          "葡萄糖胶囊",
        ],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [55, 20, 36, 70, 90, 80, 50, 40, 99, 45],
        },
      ],
    }

    myChart.setOption(option)
  },
  components: {},
}
</script>

<style scoped lang="less">
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: rgb(206, 29, 29);
}
//  字体大小
.grid-num {
  font-size: 40px;
  font-weight: 600;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

// 第一个盒子 颜色
.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

// 第二个盒子 颜色
.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

// 第三个盒子 颜色
.grid-con-3 .grid-num {
  color: green;
}
.box1 {
  background-color: #fff;
}
// .box-card {
//   margin-bottom: 30px;
// }
.el-card {
  margin-top: 15px;
}
</style>
