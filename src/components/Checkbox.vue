<template>
    <view class="checkbox-wrapper" @click="onInput">
        <div class="checkbox" :class="{ checked }"></div>
        <slot></slot>
    </view>
</template>
<script>
export default {
    name: "Checkbox",
    props: {
        value: {
            type: [Boolean, String, Number],
            default: false,
        },
    },
    data () {
        return {
            checked: false,
        };
    },
    watch: {
        value: {
            handler (val) {
                this.checked = val;
            },
            immediate: true,
        },
    },
    methods: {
        onInput () {
            this.$emit("input", !this.checked);
            this.$emit("change", !this.checked);
            this.checked = !this.checked;
        },
    },
};
</script>
<style lang="scss" scoped>
.checkbox-wrapper {
    font-size: 9rpx;
    color: #333;
    display: flex;
    margin: 8rpx 0;
}

.checkbox {
    width: 13rpx;
    height: 13rpx;
    border-radius: 2rpx;
    border: 1rpx solid #cdcdcd;
    margin-right: 4rpx;
    background-color: #fff;

    &.checked {
        border: none;
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient x1='100%25' y1='50%25' x2='0%25' y2='50%25' id='a'%3E%3Cstop stop-color='%23FF8B00' offset='0%25'/%3E%3Cstop stop-color='%23FF4B00' offset='100%25'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Crect fill='url(%23a)' width='24' height='24' rx='4'/%3E%3Cpath d='M19 7.913a.895.895 0 0 1-.264.636l-8.203 8.202c-.273.273-.555.631-1.002.184l-4.242-4.35a.94.94 0 0 1-.085-1.262.895.895 0 0 1 1.31-.045l3.38 3.38a.143.143 0 0 0 .205 0l7.402-7.407a.805.805 0 0 1 .792-.224c.41.1.7.464.707.886z' fill='%23FFF' fill-rule='nonzero'/%3E%3C/g%3E%3C/svg%3E");
        background-size: contain;
    }
}
</style>
  