<template>
  <div>
    <SearchForm></SearchForm>
    <ContentBody>
      <my-table url="/api/list" :column="column"></my-table>
    </ContentBody>
  </div>
</template>
<script>
import Panel from "../common/panel";


export default {
  components: {
    Panel
  },
  data() {
    return {
      column: [
        {
          title: "名称",
          key: "name"
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "创建时间",
          key: "create_time"
        },
        {
          title: "备注",
          key: "remark"
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    create() {
      this.$router.push({ path: "/main/data-source/add" });
    }
  }
};
</script>
<style scoped>

</style>
