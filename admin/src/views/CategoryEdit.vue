<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    //同 id:function(){
    // return this.$route.params.id;
    id: {},
  },
  data() {
    return {
      model: {},
      parents:[],
    };
  },
  methods: {
    async save() {
      let res;
      //这样实现了新建和修改并存在一个方法里面
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/categories", this.model);
      }

      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功啦^_^",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);
      // console.log(res)
      this.model = res.data;
    },
    async fetchParents(){
      const res = await this.$http.get(`rest/categories`);
      //获取到的并不是直接的选项，而只是一个父级的数据
      this.parents = res.data
    }
  },
  created() {
    //执行一个方法去自动获取数据
    this.id && this.fetch();
    this.fetchParents()
  },
};
</script>

<style>
</style>