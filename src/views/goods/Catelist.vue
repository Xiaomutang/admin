<template>
  <el-card class="box-card">
    <my-breadcrumb level1="商品管理" level2="商品列表"></my-breadcrumb>
    <el-row class="row-add">
      <el-col :span="24">
        <el-button @click="$router.push({name: 'goodsadd'})" type="success" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      stripe
      border
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="创建时间"
        width="180">
        <template slot-scope="scope">
          {{ scope.row.add_time | format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import ElTreeGrid from 'element-tree-grid';
export default {
  data() {
    return {
      list: [],
      pagenum: 1,
      pagesize: 5,
      total: 0,
      loading: true
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const { data: resData } = await this.$http.get(`goods?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      this.loading = false;
      console.log(resData);
      const { meta: { status, msg } } = resData;
      if (status === 200) {
        this.list = resData.data.goods;
        this.total = resData.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    }
  },
  components: {
    ElTreeGrid: ElTreeGrid
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
