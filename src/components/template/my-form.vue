<template>
  <div class="form-box">
    <el-form :model="model" :rules="rules" label-width="80px" ref="formValidate" :label-position="labelPosition">
      <el-row :gutter="gutter">
        <el-col v-for="item in fileds" :key="item.valueKey" :span="span">
          <el-form-item :label="item.title" :prop="item.valueKey">
            <el-input size="small" v-if="item.type=='el-input'" v-model="model[item.valueKey]" :placeholder="item.placeholder" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div class="btn-group">
          <el-button @click="submit" size="small" type="primary">确定</el-button>
          <el-button size="small">取消</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    fileds: {
      default() {
        return [
          {
            type: "el-input",
            title: "名称",
            key: "name"
          }
        ];
      },
      type: Array
    },
    labelPosition: {
      default: "right",
      type: String
    }
  },
  data() {
    return {
      span: 8,
      gutter: 32,
      model: {},
      rules: {}
    };
  },
  watch: {
    model: {
      handler: function(value) {
        console.log(value);
      },
      deep: true
    }
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
        this.$set(this.rules, item.key, [
          {
            required: item.required,
            message: "请输入活动名称",
            trigger: "blur"
          }
        ]);
      });
    },
    getFormData() {
      return this.model;
    },
    reset() {
      this.$refs.formValidate.resetFields();
    },
    submit() {
      this.$emit("submit", this.model);
    }
  }
};
</script>
<style scoped>
.form-box {
  padding: 20px;
  padding-bottom: 24px;
  background-color: #fafafa;
  border-radius: 4px;
}
.btn-group {
  text-align: right;
  margin-top: 5px;
}
</style>

