<template>
    <view :class="['card-container', isShadow ? 'card-container-shadow' : '']" :style="[cardStyle]">
        <view>
            <slot name="header">
                <view class="header" :style="[headerStyle]" v-if="title || value">
                    <text class="title" :style="[titleStyle]" @tap.stop="titleClick">
                        <text :class="titleIcon" :style="[titleIconStyle]" class="titleIcon"></text>
                        {{ title }}
                    </text>
                    <text class="value" :style="[valueStyle]" @tap.stop="valueClick">
                        {{ value }}
                        <text :class="valueIcon" :style="[valueIconStyle]" class="valueIcon"></text>
                    </text>
                </view>
            </slot>
        </view>
        <view class="body" :style="[bodyStyle]">
            <slot></slot>
        </view>
        <view class="footer" :style="[footerStyle]" v-if="isFooter($slots)">
            <slot name="footer"></slot>
        </view>
    </view>
</template>

<script>
export default {
    name: "card",
    props: {
        title: {
            type: String,
            default: ''
        },
        titleIcon: {
            type: String,
            default: ''
        },
        titleIconStyle: {
            type: Object,
            default: () => { }
        },
        value: {
            type: String,
            default: ''
        },
        valueIcon: {
            type: String,
            default: ''
        },
        valueIconStyle: {
            type: Object,
            default: () => { }
        },
        cardStyle: {
            type: Object,
            default: () => { }
        },
        titleStyle: {
            type: Object,
            default: () => { }
        },
        valueStyle: {
            type: Object,
            default: () => { }
        },
        headerStyle: {
            type: Object,
            default: () => { }
        },
        bodyStyle: {
            type: Object,
            default: () => { }
        },
        footerStyle: {
            type: Object,
            default: () => { }
        },
        isShadow: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            footer: false
        }
    },
    methods: {
        // 点击副标题事件分发
        valueClick () {
            this.$emit("valueClick")
        },
        // 点击标题事件分发
        titleClick () {
            this.$emit("titleClick")
        },
        isFooter (slots) {
            return slots?.footer
        }
    }
}
</script>

<style scoped lang="scss">
.card-container {
    background-color: #ffffff !important;
    border-radius: 24rpx;

    .header {
        line-height: 80rpx;
        font-size: 35rpx;
        position: relative;
        display: flex;
        justify-content: space-between;

        &::after {
            content: "";
            width: 100%;
            position: absolute;
            bottom: 0;
            border-bottom: 1px solid #f5f6f8;
        }

        .title {
            margin-left: 20rpx;

            .titleIcon {
                margin-right: 10rpx;
            }
        }

        .value {
            margin-right: 20rpx;

            .valueIcon {
                margin-left: 10rpx;
            }
        }
    }

    .body {
        line-height: 60rpx;
        padding: 30rpx;
    }

    .footer {
        line-height: 80rpx;
        position: relative;
        padding: 20rpx;

        &::before {
            content: "";
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            border-bottom: 1px solid #f5f6f8;
        }

        .footer-slot {}
    }
}

.card-container-shadow {
    box-shadow: 0px 2px 15px 0px rgba(46, 111, 240, 0.26);
}
</style>
