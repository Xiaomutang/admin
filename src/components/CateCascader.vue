<template>
  <el-cascader
    expand-trigger="hover"
    :options="options"
    change-on-select
    :props="{
      label: 'cat_name',
      value: 'cat_id',
      children: 'children'
    }"
    v-model="selectedOptions2"
    @change="handleChange">
  </el-cascader>
</template>

<script>
export default {
  props: {
    type: {
      type: [String, Number],
      default: 2
    }
  },
  data() {
    return {
      options: [],
      selectedOptions2: []
    };
  },
  async created() {
    const res = await this.$http({
      url: '/categories',
      params: {
        type: this.type
      }
    });
    this.options = res.data.data;
  },
  methods: {
    handleChange() {
      this.$emit('gaibianle', this.selectedOptions2);
    }
  }
};
</script>

<style>

</style>
