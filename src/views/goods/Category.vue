<template>
  <el-card class="box-card">
    <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
    <el-row class="row-add">
      <el-col :span="24">
        <el-button @click="handleShowAdd" type="success" plain>添加分类</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="loading"
      stripe
      border
      :data="list"
      style="width: 100%">
      <el-tree-grid
        prop="cat_name"
        label="分类名称"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
        :indentSize="30">
      </el-tree-grid>
      <!-- <el-table-column
        prop="cat_name"
        label="分类名称"
        width="180">
      </el-table-column> -->
      <el-table-column
        prop="name"
        label="级别"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" type="primary" icon="el-icon-edit" @click="handleShowEdit(scope.row)"></el-button>
          <el-button plain size="mini" type="danger" icon="el-icon-delete" ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog title="添加分类" :visible.sync="addFormDialog">
      <el-form :model="addForm" ref="addForm">
        <el-form-item label="分类名称" label-width="100px" prop="cat_name">
          <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" label-width="100px">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            change-on-select
            :props="{
              label: 'cat_name',
              value: 'cat_id',
              children: 'children'
            }"
            v-model="selectedOptions2">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑分类" :visible.sync="editFormDialog">
      <el-form :model="editForm" ref="addForm">
        <el-form-item label="分类名称" label-width="100px" prop="cat_name">
          <el-input v-model="editForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import ElTreeGrid from 'element-tree-grid';
export default {
  data() {
    return {
      list: [],
      pagenum: 1,
      pagesize: 5,
      total: 0,
      loading: true,
      addFormDialog: false,
      addForm: {
        cat_name: ''
      },
      options: [],
      selectedOptions2: [],
      editFormDialog: false,
      editForm: {
        cat_name: ''
      }
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const { data: resData } = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      this.loading = false;
      // console.log(resData);
      const { meta: { status, msg } } = resData;
      if (status === 200) {
        this.list = resData.data.result;
        this.total = resData.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    async handleShowAdd() {
      this.addFormDialog = true;
      const res = await this.$http({
        url: 'categories',
        params: {
          type: 2
        }
      });
      // console.log(res);
      this.options = res.data.data;
    },
    async handleAdd() {
      const formData = {
        ...this.addForm,
        cat_level: this.selectedOptions2.length,
        cat_pid: this.selectedOptions2[this.selectedOptions2.length - 1]
      };
      const res = await this.$http({
        url: 'categories',
        method: 'post',
        data: formData
      });
      console.log(res);
      const { meta: { status, msg } } = res.data;
      if (status === 201) {
        this.addFormDialog = false;
        this.$message.success(msg);
        this.loadData();
        this.$refs['addForm'].resetFields();
        this.selectedOptions2 = [];
      }
    },
    handleShowEdit(cat) {
      this.editFormDialog = true;
      this.editForm = cat;
    },
    handleEdit() {

    }
  },
  components: {
    ElTreeGrid: ElTreeGrid
  }
};
</script>

<style>
.box-card {
  height: 100%;
  overflow: auto;
}
.row-add {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
