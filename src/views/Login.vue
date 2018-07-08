<template>
  <div class="login-wrap">
    <el-form class="login-from" label-position="top" label-width="80px" :model="formData">
      <h2>用户登录</h2>
      <el-form-item label="名称">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-button @click="handleLogin" class="btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async handleLogin() {
      const res = await this.$http.post('login', this.formData);
      console.log(1);
      const data = res.data;
      const { meta: { status, msg } } = data;
      if (status === 200) {
        const { data: {token} } = data;
        this.$message.success(msg);
        sessionStorage.setItem('token', token);
        this.$router.push({
          name: 'home'
        });
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>
  .btn {
    width: 100%;
  }
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-wrap .login-from {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
  }

  .login-wrap .login-from .login-btn {
    width: 100%;
  }
</style>
