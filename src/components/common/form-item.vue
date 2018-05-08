<template>
    <el-col :span="8">
        <el-form-item :label="label">
            <slot></slot>
        </el-form-item>
    </el-col>
</template>
<script>
export default {
    props: {
        label: {
            default: "label",
            type: String
        }
    }
};
</script>
