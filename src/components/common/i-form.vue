<template>
  <el-form :model="model" label-width="80px" ref="formValidate" label-position="right">
    <el-row :gutter="gutter">
      <el-col v-for="item in fileds" :key="item.key" :span="span">
        <el-form-item :label="item.title" :prop="item.key">
          <el-input size="small" v-if="item.type=='text'" v-model="model[item.key]" :placeholder="item.placeholder" />
        </el-form-item>
      </el-col>
    </el-row>
    <slot></slot>
  </el-form>
</template>
<script>
export default {
  props: {
    fileds: {
      default() {
        return [];
      },
      type: Array
    }
  },
  data() {
    return {
      span: 8,
      gutter: 32,
      model: {}
    };
  },
  created() {
    this.setInitValue();
  },
  methods: {
    setInitValue() {
      this.fileds.map(item => {
        if (item.defaultValue) {
          this.$set(this.model, item.key, item.defaultValue);
        }
      });
    },
    getFormData() {
      return this.model;
    },
    reset() {
      this.$refs.formValidate.resetFields();
    }
  }
};
</script>
