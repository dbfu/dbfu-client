<template>
  <el-form :model="selected.props" size="mini" label-position="top">
    <el-form-item label="名称">
      <h3>{{selected.type}}</h3>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="bgColor" content="背景颜色"></tip>
      <el-color-picker alpha v-model="bgColor"></el-color-picker>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="span" content="栅格的占位格数，可选值为0~24的整数"></tip>
      <el-input-number v-model="span"></el-input-number>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="offset" content="栅格左侧的间隔格数，间隔内不可以有栅格"></tip>
      <el-input-number v-model="offset"></el-input-number>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="push" content="栅格向右移动格数"></tip>
      <el-input-number v-model="push"></el-input-number>
    </el-form-item>
    <el-form-item>
      <tip slot="label" title="pull" content="栅格向左移动格数"></tip>
      <el-input-number v-model="pull"></el-input-number>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    selected: {
      default: {},
      type: Object
    }
  },
  data() {
    return {
      bgColor: "",
      span: 8,
      offset: 0,
      push: 0,
      pull: 0
    };
  },
  watch: {
    bgColor(value) {
      this.$set(this.selected.style, "backgroundColor", value);
    },
    span(value) {
      this.$set(this.selected.props, "span", value);
    },
    offset(value) {
      this.$set(this.selected.props, "offset", value);
    },
    push(value) {
      this.$set(this.selected.props, "push", value);
    },
    pull(value) {
      this.$set(this.selected.props, "pull", value);
    },
    selected(value) {
      if (value.style) {
        this.bgColor = value.style.backgroundColor;
      }
      if (value.props) {
        this.span = value.props.span;
        this.offset = value.props.offset;
        this.push = value.props.push;
        this.pull = value.props.pull;
      }
    }
  }
};
</script>
