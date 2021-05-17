<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button native-type="submit" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
   async login() {
     const res = await this.$http.post('login',this.model)
    localStorage.token = res.data.token
    //sessionStorage 浏览器关掉之后就没了
    this.$router.push('/')
    this.$message({
      type:'success',
      message:'登录成功了噢'
    })
    },
  },
  data() {
    return {
      model: {},
    };
  },
};
</script>
<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>