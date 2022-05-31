<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="活动id" width="180"> </el-table-column>
    <el-table-column prop="name" label="活动名称" width="180">
    </el-table-column>
    <el-table-column prop="description" label="活动内容"> </el-table-column>
    <el-table-column label="操作" width="180px">
      <template slot-scope="scope">
        <!-- 修改按钮 -->
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="staffCheck(scope.row)"
          >查看详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  created() {
    this.getAllActivityList();
  },
  data() {
    return {
      tableData: [
        {
          id: "",
          name: "",
          description: "",
        },
      ],
    };
  },
  methods: {
    async getAllActivityList() {
      const { data: res } = await this.$http.post("/activity/managerCheck");
      this.tableData = res;
    },

    staffCheck(row) {
        let routeInfo = this.$router.resolve({
        path: "/managerPassActivityView",
        query: { aid: row.id },
      });
      window.open(routeInfo.href, "_self");
    }
    
  },
};
</script>
