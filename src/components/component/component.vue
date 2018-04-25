<template>
  <div class="contanier">
    <el-row style="height: calc(100vh - 130px);background-color: #fff;">
      <el-col style="height: 100%" :span="6">
        <el-card id="control-box" class="card-box">
          <span style="font-size: 14px;font-weight:600" slot="header">组件库</span>
          <el-collapse v-model="value1">
            <el-collapse-item title="系统组件" name="1">
              <!-- <span>系统组件</span> -->
              <el-row style="padding: 10px; padding-bottom: 0;">
                <el-col :span="12">
                  <div droppabled="true" data-type="el-row" data-style='{"minHeight":"200px"}' v-draggable class="list-item">row</div>
                </el-col>
                <el-col :span="12">
                  <div droppabled="true" data-type="el-col" data-props='{"span":8}' data-style='{"minHeight":"200px"}' v-draggable class="list-item">col</div>
                </el-col>
                <el-col :span="12">
                  <div droppabled="true" data-type="el-button" v-draggable data-text="按钮" class="list-item">button</div>
                </el-col>
                <el-col :span="12">
                  <div droppabled="true" data-type="label" v-draggable data-text="label" class="list-item">label</div>
                </el-col>
                <el-col :span="12">
                  <div droppabled="true" data-type="Input" v-draggable class="list-item">input</div>
                </el-col>
                <el-col :span="12">
                  <div droppabled="true" data-type="el-form" v-draggable data-style='{"minHeight":"200px"}' class="list-item">form</div>
                </el-col>
                <el-col :span="12">
                  <div droppabled="true" data-type="el-form-item" v-draggable class="list-item">form-item</div>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item title="自定义组件" name="2">
              <!-- <span>自定义组件</span> -->
              <el-row style="padding: 10px; padding-bottom: 0;">
                <el-col :span="12">
                  <div data-type="search-form" v-draggable data-style='{"minHeight":"200px"}' class="list-item">search-form</div>
                </el-col>
                <el-col :span="12">
                  <div class="list-item">按钮</div>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
      <el-col style="height: 100%" :span="13">
        <el-card v-droppable="drop" class="card-box view-box">
          <span style="font-size: 14px;font-weight:600" slot="header">组件</span>
          <d-view @click="selectView" v-for="(item,index) in viewList" :key="index" :params="item"></d-view>
        </el-card>
      </el-col>
      <el-col style="height: 100%" :span="5">
        <el-card style="height: 50%" class="card-box">
          <span style="font-size: 14px;font-weight:600" slot="header">属性</span>
          <attr :selected="selected" v-if="isSelect"></attr>
        </el-card>
        <el-card style="height: 50%" class="card-box">
          <div slot="header">
            <span style="font-size: 14px;font-weight:600">页面布局</span>
            <el-button @click="remove" v-if="isSelect" style="float: right; padding: 3px 0;" type="text">删除</el-button>
          </div>
          <el-tree :indent="14" ref="tree" :props="{label: 'type'}" :default-expanded-keys="expandeds" highlight-current :expand-on-click-node="false" node-key="nodeKey" default-expand-all empty-text="" @current-change="clickNode" :data="viewList"></el-tree>
        </el-card>
      </el-col>
    </el-row>
    <div class="fixed-bottom">
      <div class="button-box">
        <el-button size="small" @click="save" type="primary">保存</el-button>
        <el-button size="small" style="margin-left: 16px;">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import view from "../common/view";
import grid from "../common/grid";
import attr from "./attr";

export default {
  name: "page2",
  components: {
    "d-view": view,
    grid: grid,
    attr
  },
  data() {
    return {
      viewList: [],
      selected: {},
      value1: "1",
      expandeds: []
    };
  },
  computed: {
    isSelect() {
      return JSON.stringify(this.selected) !== "{}";
    }
  },
  methods: {
    selectView(params) {
      if (this.selected.className) {
        this.$set(this.selected.className, "selected", false);
      }
      this.$set(params.className, "selected", true);

      this.$refs.tree.setCurrentKey(params.nodeKey);

      this.selected = params;
    },
    drop(e, ui, self) {
      let type = $(ui.draggable).attr("data-type");
      let style = $(ui.draggable).attr("data-style");
      let id = $(self).attr("id");
      let text = $(ui.draggable).attr("data-text");
      let props = $(ui.draggable).attr("data-props");
      console.log($(ui.draggable).attr("droppabled"));

      if (style) {
        style = JSON.parse(style);
      } else {
        style = {};
      }

      if (props) {
        props = JSON.parse(props);
      } else {
        props = {};
      }

      let v = {
        type,
        parent: view.index,
        props,
        style,
        attrs: {},
        className: {},
        text: text,
        children: [],
        expand: true,
        directives: $(ui.draggable).attr("droppabled")
          ? [
              {
                name: "droppable",
                value: this.drop
              }
            ]
          : [],
        event: {}
      };

      if (id) {
        let index = id.toString();

        let view = {};
        let ids = index.split("-");

        if (ids.length) {
          for (let i = 0; i < ids.length; i++) {
            if (i === 0) {
              view = this.viewList[parseInt(ids[i])];
            } else {
              view = view.children[parseInt(ids[i])];
            }
          }
        } else {
          view = this.viewList[index];
        }

        id = index + "-" + view.children.length;

        v.attrs.id = id;
        v.index = view.children.length;
        v.nodeKey = id;
        this.expandeds.push(id);
        view.children.push(v);
      } else {
        // if (type !== "el-row") {
        //   this.$Message.warning("普通组件只能放到容器内！");
        //   return;
        // }

        let length = this.viewList.length;

        v.attrs.id = length;
        v.index = length;
        v.nodeKey = length;
        this.expandeds.push(length);
        this.viewList.push(v);
      }
    },
    save() {},
    clickNode(data) {
      let view = {};

      if (!data.attrs.id) {
        view = this.viewList[data.index];
      } else {
        view = this.getViewById(data.attrs.id);
      }
      if (this.selected.className) {
        this.$set(this.selected.className, "selected", false);
      }
      this.$set(view.className, "selected", true);

      this.selected = view;
    },
    remove() {
      let view = this.getViewById(this.selected.nodeKey, true);
      if (!view) {
        this.viewList.splice(this.selected.nodeKey, 1);
      } else {
        view.children.splice(this.selected.index, 1);
      }
      this.selected = {};
    },
    getViewById(id, isParent) {
      let ids = id.toString().split("-");
      let view = {};
      let length = isParent ? ids.length - 1 : ids.length;

      if (length) {
        for (let i = 0; i < length; i++) {
          if (i === 0) {
            view = this.viewList[parseInt(ids[i])];
          } else {
            view = view.children[parseInt(ids[i])];
          }
        }
      } else {
        view = null;
      }

      return view;
    }
  }
};
</script>
<style>
.contanier .ivu-card-body {
  padding: 10px;
}
.list-item {
  height: 34px;
  line-height: 34px;
  width: 92%;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 0 2px #ccc;
  white-space: nowrap;
  padding: 0 10px;
  user-select: none;
  cursor: move;
  background-color: #fff;
  margin-bottom: 12px;
  max-width: 120px;
}
.contanier .ivu-collapse-content {
  padding: 0 10px;
}
.contanier .ivu-collapse-content > .ivu-collapse-content-box {
  padding-top: 12px;
  padding-bottom: 0px;
}
.contanier .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  padding-left: 20px;
}
.contanier .ivu-card-head {
  font-weight: 600;
}
.contanier .card-box {
  height: 100%;
  overflow: auto;
  overflow: hidden;
  /* padding: 10px 0; */
}
.contanier .el-card__body {
  overflow: auto;
  height: calc(100% - 43px);
  padding: 10px 20px;
}
.view-box .el-card__body {
  overflow: auto;
  height: calc(100% - 43px);
  padding: 5px;
}
.contanier .fixed-bottom {
  position: fixed;
  left: 200px;
  right: 0;
  height: 50px;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.067);
}
.contanier .fixed-bottom .button-box {
  height: 50px;
  margin-left: 50px;
  line-height: 50px;
}
.contanier .el-collapse-item__content {
  padding-bottom: 10px;
}
.contanier .el-card__header {
  padding: 10px 14px;
}
.contanier .el-form--label-top .el-form-item__label {
  padding: 0;
}
.contanier .el-form-item {
  margin-bottom: 8px;
}
</style>
