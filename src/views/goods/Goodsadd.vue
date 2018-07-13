<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品添加"></my-breadcrumb>
    <el-row class="row-add">
    </el-row>
    <el-steps :active="stepActive" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-tabs tab-position="left" style="height: 200px;">
    <el-tab-pane label="用户管理">
      <el-form ref="form" :model="form" label-width="80px" label-position="top">
        <el-form-item label="商品名称">
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="form.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-input v-model="form.goods_number"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="商品图片"></el-tab-pane>
    <el-tab-pane label="商品详情"></el-tab-pane>
  </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      stepActive: 0,
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        goods_introduce: ''
      }
    };
  }
};
</script>

<style>
  .box-card {
    height: 100%;
    overflow: auto;
  }

  .row-add {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
