<template>
  <el-card class="box-card">
    <my-breadcrumb level1="权限管理" level2="角色列表"></my-breadcrumb>
    <el-row class="row-add">
      <el-col :span="24">
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      :data="list"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 15665
          <el-tag
            @close="handleClose" type="success" closable>

          </el-tag> -->
          <el-row
            class="level1"
            v-for="item1 in scope.row.children"
            :key="item1.id">
            <el-col :span="4">
              <el-tag closable>{{ item1.authName }}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row
                v-for="item2 in item1.children"
                :key="item2.id">
                <el-col :span="4">
                  <el-tag closable>{{ item2.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    class="level3"
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id">
                    {{ item3.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.children.length === 0">
            <el-col :span="24">未分配权限</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" ></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" ></el-button>
          <el-button @click="handleShowRightsDialog(scope.row)" plain size="mini" type="success" icon="el-icon-check" ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: true
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const res = await this.$http.get('roles');
      this.loading = false;
      const { meta: { status, msg } } = res.data;
      if (status === 200) {
        this.list = res.data.data;
      } else {
        this.$message.error(msg);
      }
    },
    handleClose() {

    }
  }
};
</script>

<style>
  .box-card {
    height: 98%;
    overflow: auto;
  }
  .row-add {
    margin-top: 10px;
  }
  .level3 {
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .level1 {
    margin-bottom: 10px;
  }
</style>
