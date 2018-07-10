<template>
  <el-dialog title="添加用户" :visible.sync="userFormVisible">
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
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="determine">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      userFormVisible: true
    };
  },
  methods: {
    async determine() {
      const token = sessionStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = token;
      const res = await this.$http.post('users', this.form);
      console.log(res);
      const data = res.data;
      const { meta: { status, msg } } = data;
      if (status === 201) {
        this.$message.success(msg);
        this.$router.push({ name: 'users' });
      } else {
        this.$message.error(msg);
      }
    },
    cancel() {
      this.$router.push({ name: 'users' });
    }
  }
};
</script>

<style>

</style>
