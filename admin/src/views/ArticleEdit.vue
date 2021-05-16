<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor
          useCustomImageHandler
          @image-added="handleImageAdded"
          v-model="model.body"
        ></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    //同 id:function(){
    // return this.$route.params.id;
    id: {},
  },
  components: {
    VueEditor,
  },
  data() {
    return {
      model: {},
      categories: [],
    };
  },
  methods: {
    async save() {
      let res;
      //这样实现了新建和修改并存在一个方法里面
      if (this.id) {
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/articles", this.model);
      }

      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功啦^_^",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      // console.log(res)
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      //获取到的并不是直接的选项，而只是一个父级的数据
      this.categories = res.data;
    },

    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      //平时是提交json数据，现在是要上传文件，所以必须要提交表单数据
      const formData = new FormData();
      //这里的file是因为后端接口也是写的file
      formData.append("file", file);
      //这里我们用自己定义的axios提交数据
      const res = await this.$http.post("upload", formData);
      //这里是插件定义的方法，insertEmbed表示嵌入一个元素image到对应光标的位置，图片的地址就是第三个参数。
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
  },
  created() {
    //执行一个方法去自动获取数据
    this.id && this.fetch();
    this.fetchCategories();
  },
};
</script>

<style>
</style>