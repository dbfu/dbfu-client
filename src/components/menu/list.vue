<template>
  <div>
    <search-form @search="search"></search-form>
    <!-- <div class="table-box">
      <Button style="margin-bottom: 10px;" type="primary">添加根菜单</Button>
      <Table :data="list" :columns="columns"></Table>
      <div style="text-align: right;padding-top: 14px;">
        <Page :total="100" show-total></Page>
      </div>
    </div> -->
    <!-- <New @close="close" :model="model" :isShow="visible"></New> -->
  </div>
</template>
<script>
export default {
  components: {
  
  },
  data() {
    return {
      visible: false,
      model: {},
      columns: [
        {
          title: "Name",
          key: "name",
          render: (h, params) => {
            let arrow = null;
            let lev = params.row.lev;
            if (params.row.isHasChildren) {
              arrow = h("Icon", {
                props: {
                  type: "arrow-left-b",
                  size: 18
                },
                on: {
                  click: e => {
                    this.hide(params.row);
                  }
                }
              });
              lev = lev - 1;
            }

            let list = [];
            for (let i = 0; i < lev; i++) {
              list.push(
                h("i", {
                  class: {
                    "ivu-icon-block": true
                  }
                })
              );
            }
            return h("div", [
              list,
              arrow,
              h(
                "strong",
                {
                  class: {
                    text: true
                  }
                },
                params.row.name
              )
            ]);
          }
        },
        {
          title: "id",
          key: "id"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "Address",
          key: "address"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.add(params.row);
                    }
                  }
                },
                "添加"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      list: [],
      data: []
    };
  },

  created() {
    this.$http.get("/api/list").then(res => {
      this.list = res.data;
      //this.getTreeData([...[], ...this.data]);
    });
  },
  methods: {
    getTreeData(model) {
      model.map((o, index) => {
        this.list.push(o);

        this.data.splice(this.data.findIndex(m => m.id == o.id), 1);

        let result = this.data.filter(item => item.parent == o.id);

        if (result && result.length) {
          this.getTreeData([...[], ...result]);
        }
      });
    },
    add(record) {
      this.visible = true;
      this.model = record;
    },
    close() {
      this.visible = false;
    },
    remove(index) {
      this.data.splice(index, 1);
    },
    ok() {},
    search(data) {
      console.log(data.name);
    }
  }
};
</script>
<style>
.ivu-table-cell .ivu-icon-arrow-left-b {
  display: inline-block;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
  cursor: pointer;
}
.ivu-table-cell .ivu-icon-block {
  display: inline-block;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;
}
.ivu-table-cell .text {
  display: inline-block;
  vertical-align: text-bottom;
}

.form-box {
  padding: 20px;
  padding-bottom: 0;
  background-color: #fafafa;
  border-radius: 4px;
}
.table-box {
  padding: 20px 0;
}
</style>
