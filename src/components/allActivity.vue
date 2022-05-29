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
          @click="lookActivityInfo(scope.row)"
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
      if (window.sessionStorage.getItem("userRole") > 1) {
        const { data: res } = await this.$http.post("/activity/findAll");
        this.tableData = res;
      } else {
        const { data: res } = await this.$http.post("/activity/userFind");
        this.tableData = res;
      }
    },
    lookActivityInfo(row) {
      if (window.sessionStorage.getItem("userRole") == 1) {
        let routeInfo1 = this.$router.resolve({
          path: "/activityInfoForSignUp",
          query: { aid: row.id },
        });
        window.open(routeInfo1.href, "_self");
      }
      if (window.sessionStorage.getItem("userRole") == 2) {
        let routeInfo2 = this.$router.resolve({
          path: "/activityInfoForTeacher",
          query: { aid: row.id },
        });
        window.open(routeInfo2.href, "_self");
      }
    },
  },
};
</script>
