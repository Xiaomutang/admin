<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品添加"></my-breadcrumb>
    <el-row class="row-add">
    </el-row>
    <el-steps :active="stepActive" finish-status="success" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <el-tabs tab-position="left" v-model="activeName" @tab-click="handleTabClick">
    <el-tab-pane label="基本信息" name="0">
      <el-form ref="form" :model="form" label-width="80px" label-position="top">
        <el-form-item label="商品名称">
          <el-input v-model="form.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="form.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="form.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="form.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <CateCascader
            type="3"
            @gaibianle="handleGaiBianLe">
          </CateCascader>
        </el-form-item>
      </el-form>
      <el-button @click="handleNextStep">下一步</el-button>
    </el-tab-pane>
    <el-tab-pane label="商品图片" name="1">
      <el-upload
        class="upload-demo"
        :headers="headers"
        action="http://localhost:8888/api/private/v1/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="handleUploadSuccess"
        :file-list="fileList2"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-row>
        <el-col :span="4">
          <el-button @click="handleNextStep">下一步</el-button>
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="商品详情" name="2">
      <quill-editor
        v-model="form.goods_introduce"
        ref="myQuillEditor"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)">
      </quill-editor>
      <el-row>
        <el-col :span="4">
          <el-button type="primary" @click="handleAdd">立即创建</el-button>
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
  </el-card>
</template>

<script>
import CateCascader from '@/components/CateCascader';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
  data() {
    return {
      activeName: '0',
      stepActive: 0,
      form: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: '',
        goods_introduce: '',
        pics: []
      },
      fileList2: [],
      headers: {
        Authorization: window.sessionStorage.getItem('token')
      }
    };
  },
  methods: {
    handleGaiBianLe(data) {
      this.form.goods_cat = data.join(',');
    },
    handleNextStep() {
      this.activeName = Number.parseInt(this.activeName) + 1 + '';
      this.stepActive++;
    },
    async handleAdd() {
      const res = await this.$http({
        url: '/goods',
        method: 'post',
        data: this.form
      });
      const { meta } = res.data;
      // console.log(res.data.data.pics);
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: meta.msg
        });
      } else if (meta.status === 400) {
        this.$message({
          type: 'warning',
          message: meta.msg
        });
      }
    },
    onEditorBlur () {
      console.log('onEditorBlur');
    },
    onEditorFocus () {
      console.log('onEditorFocus');
    },
    onEditorReady () {
      console.log('onEditorReady');
    },
    handleTabClick(tab) {
      // console.log('handleTabClick')
      // console.log(tab.index)
      this.stepActive = tab.index - 0;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      const index = this.form.pics.findIndex(function (item) {
        return item.pic === file.response.data.tmp_path;
      });
      if (index !== -1) {
        this.form.pics.splice(index, 1);
      }
    },
    handlePreview(file) {
      console.log(file);
    },
    handleUploadSuccess(response, file, fileList) {
      this.form.pics.push({
        pic: response.data.tmp_path
      });
    }
  },
  components: {
    CateCascader,
    quillEditor
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
