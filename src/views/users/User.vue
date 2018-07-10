<template>
  <el-card class="box-card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input v-model="searchValue" class="searchInput" clearable placeholder="请输入内容">
          <el-button @click="handleSearch" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain @click="addUserFormVisible=true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      stripe
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="创建日期">
        <template slot-scope="scope">
          {{ scope.row.create_time | format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch
            @change="handleSwitch(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" ></el-button>
          <el-button @click="handleDelete(scope.row.id)" plain size="mini" type="danger" icon="el-icon-delete" ></el-button>
          <el-button plain size="mini" type="success" icon="el-icon-check" ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog @closed="handleClosed" title="添加用户" :visible.sync="addUserFormVisible">
      <el-form label-position="right" label-width="120px" :model="form">
        <el-form-item label="用户名">
            <el-input v-model="form.username"  auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="form.email" ></el-input>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="form.mobile" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: true,
      pagesize: 2,
      currentPage: 1,
      total: 0,
      searchValue: '',
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addUserFormVisible: false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const token = sessionStorage.getItem('token');
      // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      this.$http.defaults.headers.common['Authorization'] = token;
      const params = { pagenum: this.currentPage, pagesize: this.pagesize, query: this.searchValue };
      const res = await this.$http.get('users', { params });
      this.loading = false;
      const data = res.data;
      const { meta: { status, msg } } = data;
      if (status === 200) {
        const { data: { users } } = data;
        this.list = users;
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
    async handleAdd() {
      const res = await this.$http.post('users', this.form);
      console.log(res);
      const data = res.data;
      const { meta: { status, msg } } = data;
      if (status === 201) {
        this.$message.success(msg);
        this.addUserFormVisible = false;
        this.loadData();
      } else {
        this.$message.error(msg);
      }
    },
    handleClosed() {
      for (let key in this.form) {
        this.form[key] = '';
      }
    },
    handleSearch() {
      this.loadData();
    },
    async handleSwitch(user) {
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`);
      const data = res.data;
      const { meta: { status, msg } } = data;
      if (status === 200) {
        this.$message.success(msg);
        this.loadData();
      } else {
        this.$message.error(msg);
      }
    },
    async handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`users/${id}`);
        const data = res.data;
        const { meta: { status } } = data;
        if (status === 200) {
          this.currentPage = 1;
          this.loadData();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.searchArea {
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .searchInput {
  width: 350px;
}
</style>
