<template>
  <div v-droppable="drop" class="form-box">
    <el-form :model="model" label-width="80px" ref="formValidate" :label-position="position">
      <el-row :gutter="gutter">
        <slot></slot>
      </el-row>
      <el-row>
        <div class="btn-group">
          <el-button size="small" type="primary">确定</el-button>
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
        return [];
      },
      type: Array
    },
    "labelPosition": {
      default: "right",
      type: String
    }
  },
  data() {
    return {
      span: 8,
      gutter: 32,
      model: {},
      position: "right"
    };
  },
  created() {
    this.setInitValue();
  },
  watch: {
    "labelPosition"(value) {
      this.position = value;
    }
  },
  computed: {
    viewList() {
      return this.$store.state.viewList;
    }
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
    },
    drop(e, ui, self) {
      let id = $(self).attr("id");
      let box = this.viewList[id];

      let item = {
        type: "my-form-item",
        attrs: {},
        className: {},
        children: [],
        style: {},
        props: {},
        parent: id
      };

      let length = box.children.length;

      item.attrs.id = id + "-" + length;
      item.index = length;
      item.nodeKey = id + "-" + length;

      let type = $(ui.draggable).attr("data-type");
      let className = $(ui.draggable).attr("data-class");
      let text = $(ui.draggable).attr("data-text");
      let props = $(ui.draggable).attr("data-props");

      if (className) {
        className = { [className]: true };
      } else {
        className = {};
      }

      if (props) {
        props = JSON.parse(props);
      } else {
        props = {};
      }

      let v = {
        type,
        parent: item.index,
        props,
        style: {},
        attrs: {},
        className: className,
        text: text,
        children: [],
        expand: true,
        event: {}
      };

      v.attrs.id = item.attrs.id + "-0";
      v.index = 0;
      v.nodeKey = item.attrs.id + "-0";

      item.children.push(v);

      box.children.push(item);

      if (box.props.fileds) {
        box.props.fileds.push({
          type: type,
          title: "label",
          key: "name"
        });
      } else {
        this.$set(box.props, "fileds", [
          {
            type: type,
            title: "label",
            key: "name"
          }
        ]);
      }
      console.log(box);
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

