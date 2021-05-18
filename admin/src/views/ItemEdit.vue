<template>
  <div class="about">
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <!-- $http是axios，.defaults是他的默认参数，里面有一个baseURL -->
      <!-- 用:headers给他传递我们需要的那个Authorization的header
          :headers="{Authorization:}"  但是我们一般是在全局定义一个函数 -->
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    };
  },
  methods: {
    afterUpload(res) {
      // console.log(res);
      //Vue的显示赋值
      this.$set(this.model, "icon", res.url);
      //  this.model.icon = res.url
    },
    async save() {
      let res;
      //这样实现了新建和修改并存在一个方法里面
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/items", this.model);
      }

      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功啦^_^",
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      // console.log(res)
      this.model = res.data;
    },
  },
  created() {
    //执行一个方法去自动获取数据
    this.id && this.fetch();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>