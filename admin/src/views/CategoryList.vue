<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="230"> </el-table-column>
      <el-table-column prop="parent.name" label="上级分类"> </el-table-column>
      <el-table-column prop="name" label="分类名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- scope.row表示当前这一行数据 -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  //默认进来要去获取数据
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/categories");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(`确定要删除分类"${row.name}"吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async() => {
          //上面点击确定后将执行then方法
          const res = await this.$http.delete(`rest/categories/${row._id}`)
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //删除成功后重新获取数据刷新页面
          this.fetch()
        })
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
</style>