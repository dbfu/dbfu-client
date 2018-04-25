<template>
    <div>
        {{title}}
        <el-tooltip :transfer="true" placement="top-start">
            <span style="white-space: normal;" v-text="content" slot="content"></span>
            <i size="28px" class="el-icon-info"></i>
        </el-tooltip>
    </div>
</template>
<script>
export default {
  props: {
      title: String,
      content: String
  }
}
</script>

