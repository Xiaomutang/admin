<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="订单管理" level2="订单列表"></my-breadcrumb>
    <el-button class="btn" @click="handleMapMove">点击移动地图</el-button>
    <!-- 地图容器，要有宽高 -->
    <div id="bmap_container"></div>
    <el-row>
      <el-col :span="8">
        <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      class="tb"
      border
      stripe
      :data="list"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="100">
      </el-table-column>
      <el-table-column
        label="是否付款"
        width="100">
        <template slot-scope="scope">
           <span v-if="scope.row.order_pay === '0'">未付款</span>
           <span v-else-if="scope.row.order_pay === '1'">已付款</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货"
        width="100">
      </el-table-column>
      <el-table-column
        label="下单时间"
        width="180">
        <template slot-scope="scope">
           {{ scope.row.create_time | format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button>编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
import { regionData } from 'element-china-area-data';
const { BMap } = window;
export default {
  data() {
    return {
      list: [],
      pagesize: [3, 6, 9],
      currentPage: 1,
      total: 0,
      options: regionData,
      selectedOptions: [],
      map: null
    };
  },
  created() {
    this.loadData();
  },
  mounted () {
    this.map = new BMap.Map('bmap_container');
    const point = new BMap.Point(116.404, 39.915);
    this.map.centerAndZoom(point, 15);
  },
  methods: {
    async loadData() {
      const params = { pagenum: this.currentPage, pagesize: this.pagesize };
      const res = await this.$http.get('orders', { params });
      const data = res.data;
      const { meta: { status, msg } } = data;
      if (status === 200) {
        this.list = res.data.data.goods;
        this.total = res.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData();
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.currentPage = 1;
      this.loadData();
    },
    handleChange () {
      console.log('change');
    },
    handleMapMove () {
      const { map } = this;
      var point = new BMap.Point(116.404, 39.915);
      map.centerAndZoom(point, 15);
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker);
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
  overflow: auto;
}
.tb {
  margin-top: 10px;
}
#bmap_container {
  width: 500px;
  height: 300px;
}
.btn {
  margin: 10px 0;
}
</style>
