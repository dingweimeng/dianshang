<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>统计分析</el-breadcrumb-item>
      <el-breadcrumb-item>入库统计</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-form :inline="true" :model="formInline">
          <el-form-item label="机构编号:">
            <el-input v-model="formInline.bianhao" placeholder="请输入机构编号"></el-input>
          </el-form-item>
          <el-form-item label="药品名称:">
            <el-input v-model="formInline.name" placeholder="请输入药品名称"></el-input>
          </el-form-item>
          <el-form-item label="出库单号:">
            <el-input v-model="formInline.danhao" placeholder="请输入出库单号"></el-input>
          </el-form-item>
          <el-form-item label="处方类型:">
            <el-select v-model="formInline.region" placeholder="请选择出库类型">
              <el-option label="全选" value="quanxuan"></el-option>
              <el-option label="西/成药" value="123"></el-option>
              <el-option label="中药" value="shanghai"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <el-form>
          <el-form-item label="入库日期:">
            <el-date-picker v-model="value1" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00']">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>

    <!-- 数据区域 -->
    <el-card>
      <el-table :data="tableData" stripe style="width: 100%" border="">
        <el-table-column label="序号" type="index" width="80" align="center">
        </el-table-column>

        <el-table-column prop="bianhao" label="药品编号" width="200" align="center">
        </el-table-column>
        <el-table-column prop="drug_name" label="药品名称" width="300" align="center">
        </el-table-column>
        <el-table-column prop="category" label="药品类别" width="200" align="center">
        </el-table-column>
        <el-table-column prop="guige" label="规格" width="200" align="center">
        </el-table-column>
        <el-table-column prop="manufacturer" label="生产厂家" width="300" align="center">
        </el-table-column>

        <el-table-column prop="quantity" label="数量" width="200" align="center">
        </el-table-column>

        <el-table-column prop="money" label="金额(元)" align="center"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      formInline: {
        bianhao: "",
        name: "",
        region: "",
        danhao: "",
      },
      //时间
      value1: "",
      // 假数据
      tableData: [
        {
          quantity: "600盒",
          category: "西/成药",
          money: "456854",
          danhao: "SP20211217000",
          bianhao: "1000001",
          drug_name: "复方氯化钠注射液",
          guige: "6g*11袋/盒",
          manufacturer: "上海医药(集团)有限公司",

          supplier: "上海医药",
        },
        {
          quantity: "600盒",
          category: "西/成药",
          money: "456854",
          danhao: "SP20211217001",
          bianhao: "1000002",
          drug_name: "葡萄糖化钠注射液",
          guige: "6g*11袋/盒",
          manufacturer: "山东罗欣药业股份有限公司",

          supplier: "山东罗欣",
        },
        {
          quantity: "600盒",
          category: "西/成药",
          money: "456854",
          danhao: "SP20211217002",
          bianhao: "1000003",
          drug_name: "0.9%氯化钠注射液",
          guige: "6g*11袋/盒",
          manufacturer: "昆明制药集团",

          supplier: "昆明制药",
        },
        {
          quantity: "600盒",
          category: "西/成药",
          money: "456854",
          danhao: "SP20211217003",
          bianhao: "1000004",
          drug_name: "克林霉素化钠注射液",
          guige: "6g*11袋/盒",
          manufacturer: "武汉五景药业",

          supplier: "武汉五景",
        },
        {
          quantity: "600盒",
          category: "西/成药",
          money: "456854",
          danhao: "SP20211217000",
          bianhao: "1000001",
          drug_name: "复方氯化钠注射液",
          guige: "6g*11袋/盒",
          manufacturer: "上海医药(集团)有限公司",

          supplier: "上海医药",
        },
        {
          quantity: "600盒",
          category: "西/成药",
          money: "456854",
          danhao: "SP20211217001",
          bianhao: "1000002",
          drug_name: "葡萄糖化钠注射液",
          guige: "6g*11袋/盒",
          manufacturer: "山东罗欣药业股份有限公司",

          supplier: "山东罗欣",
        },
        {
          quantity: "600盒",
          category: "西/成药",
          money: "456854",
          danhao: "SP20211217002",
          bianhao: "1000003",
          drug_name: "0.9%氯化钠注射液",
          guige: "6g*11袋/盒",
          manufacturer: "昆明制药集团",

          supplier: "昆明制药",
        },

        {
          quantity: "600盒",
          category: "西/成药",
          money: "456854",
          danhao: "SP20211217002",
          bianhao: "1000003",
          drug_name: "0.9%氯化钠注射液",
          guige: "6g*11袋/盒",
          manufacturer: "昆明制药集团",

          supplier: "昆明制药",
        },
        {
          quantity: "600盒",
          category: "西/成药",
          money: "456854",
          danhao: "SP20211217003",
          bianhao: "1000004",
          drug_name: "克林霉素化钠注射液",
          guige: "6g*11袋/盒",
          manufacturer: "武汉五景药业",

          supplier: "武汉五景",
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      console.log("查询")
    },
  },
}
</script>

<style scoped lang="less"></style>
