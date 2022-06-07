<template>
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="活动id" width="180"> </el-table-column>
    <el-table-column prop="name" label="活动名称" width="180">
    </el-table-column>
    <el-table-column prop="description" label="活动简述"> </el-table-column>
    <el-table-column label="操作" width="180px">
      <template slot-scope="scope">
        <!-- 查看活动详情 -->
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="toActivityInfo(scope.row)"
          >详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },

  methods: {
    toActivityInfo(row) {
      let routeInfo = this.$router.resolve({
        path: "/toActivityInfo",
        query: { aid: row.id },
      });
      window.open(routeInfo.href, "_self");
    },
    getTeachersActivityLists(){
      let param = new URLSearchParams()
      param.append("Mentorname", window.sessionStorage.getItem("username"));
      this.$http({
        url: '/activity/getActivityByMentorname',
        data: param,
        method: "post"
      }).then((res) => {
        this.tableData = res.data
      })
    }
  },


  mounted() {
    this.getTeachersActivityLists()
  }
};
</script>
