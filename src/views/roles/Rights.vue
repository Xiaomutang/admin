<template>
  <el-card class="box-card">
    <my-breadcrumb level1="权限管理" level2="权限列表"></my-breadcrumb>
    <el-table
      class="tb"
      border
      stripe
      :data="list"
      style="width: 100%"
      height="478">
      <el-table-column
      type="index"
      width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-else-if="scope.row.level === '1'">二级</span>
          <span v-else-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      // const token = sessionStorage.getItem('token');
      // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      // this.$http.defaults.headers.common['Authorization'] = token;
      const res = await this.$http.get('rights/list');
      const data = res.data;
      const { meta: { status, msg } } = data;
      if (status === 200) {
        this.list = res.data.data;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
  .box-card {
    height: 99%;
    /* overflow: auto; */
  }

  .tb {
    margin-top: 10px;
  }
</style>
