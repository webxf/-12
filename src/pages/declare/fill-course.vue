<template>
    <view class="container">
        <u-search placeholder="请输入搜索关键字" :show-action="false" bgColor="#fff" searchIconColor="#92939A" placeholderColor="#92939A" v-model="queryParams.key"></u-search>
        <view class="monitor_box">
			<view class="monitor" v-for="el in tabList" :key="el.name">
				<view class="p1">
					{{el.name}}
				</view>
				<view class="p2">
					{{el.num}}
				</view>
			</view>
		</view>
		<!-- <u-tabs :list="tabList"></u-tabs> -->
        <view class="content">
            <!-- <view class="item" :style="{background:'url('+item.img+')',backgroundSize:'100% 100%'}" v-for="(item,index) in videoList" :key="item.videoId + index" @click="palyVideo(item.video)">
                <text>{{item.name}}
				</text>
            </view> -->
        </view>
        <view class="view-box" v-if="show">
            <video-play ref="videoPlayRef" :url="videoSrc" @close="close" :closeable="true"></video-play>
        </view>
    </view>
</template>
<script>
import VideoPlay from './components/VideoPlay.vue'
export default{
    components:{
        VideoPlay
    },
    data(){
        return{
            queryParams:{
                key:''
            },
            show:false,
            tabList:[
                {name: '设备总数',num:'0'},
                {name: '在线总数',num:'0'},
                {name: '离线数',num:'0'},
            ],
            videoList:[{
					name: '你相信有灵魂伴侣吗',
					img: 'http://img.kaiyanapp.com/945fa937f0955b31224314a4eeef59b8.jpeg?imageMogr2/quality/100',
					video: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=5544&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true',
					videoId: '1'
				}, {
					name: '2020 奥斯卡提名动画短片：「勿忘我」',
					img: 'http://img.kaiyanapp.com/4bb009bdb0518331f05195e1c3b8dd2d.jpeg?imageMogr2/quality/60/format/jpg',
					video: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=184884&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true',
					videoId: '2'
				}, {
					name: '2020 奥斯卡最佳动画短片提名：「女儿」',
					img: 'http://img.kaiyanapp.com/e573ac166b01c8e33f1756f542004e8e.png?imageMogr2/quality/60/format/jpg',
					video: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=186094&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true',
					videoId: '3'
				}, {
					name: '获奖搞笑恐怖动画短片：「死神来了蜗牛版」',
					img: 'http://img.kaiyanapp.com/52ef4e573ed5d4189413ebeeab9ae7f2.png?imageMogr2/quality/60/format/jpg',
					video: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=189046&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true',
					videoId: '4'
				}, {
					name: '科比 NBA 职业生涯的 40 个好球！',
					img: 'http://img.kaiyanapp.com/ad8bd426e87829e0ba1f480f003da216.jpeg?imageMogr2/quality/60/format/jpg',
					video: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=185895&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true',
					videoId: '5'
				}, {
					name: '高燃女性群像混剪：The Lady「平权之声」',
					img: 'http://img.kaiyanapp.com/ccbc65d60ad0af98b8b40dd8842068d8.png?imageMogr2/quality/60/format/jpg',
					video: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=190478&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true',
					videoId: '6'
				}, {
					name: '战斗女神踩点混剪：性感女神，在线揍人',
					img: 'http://img.kaiyanapp.com/51ed6d181e19d635ff56528762f4f6b6.jpeg?imageMogr2/quality/60/format/jpg',
					video: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=182072&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true',
					videoId: '7'
				}, {
					name: '换个角度看印度，友好包容的文明古国',
					img: 'http://img.kaiyanapp.com/940ccd4fc7f78b17aeea1d1544b1c7bb.jpeg?imageMogr2/quality/60/format/jpg',
					video: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=173634&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true',
					videoId: '8'
				}, {
					name: '泰国温馨广告：祝你生日快乐',
					img: 'http://img.kaiyanapp.com/fd70a1e670f6c9cc0a272495a257d4c3.png?imageMogr2/quality/60/format/jpg',
					video: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=187719&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true',
					videoId: '9'
				}, {
					name: '卡妹最新 SNL 现场首演强势新单「Easy」',
					img: 'http://img.kaiyanapp.com/c51d878668c73578be66b87ea1119ac1.jpeg?imageMogr2/quality/60/format/jpg',
					video: 'https://baobab.kaiyanapp.com/api/v1/playUrl?vid=175743&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true',
					videoId: '10'
				}],
            videoSrc:"https://baobab.kaiyanapp.com/api/v1/playUrl?vid=185895&resourceType=video&editionType=default&source=aliyun&playUrlType=url_oss&ptl=true"
        }
    },
    mounted(){
    },
    methods:{
        palyVideo(url){
            this.show = true;
            this.videoSrc = url;
        },
        close(){
            this.show = false
        }
    }
}
</script>

<style lang="scss" scoped>
.container{
    padding: 30rpx 30rpx 0 30rpx;
    background: #F9FAFA;
}
.monitor_box{
	width: 100%;
	height: 120rpx;
	padding: 10rpx;
	display: flex;
	justify-content: space-between;
	.monitor{
		width: 30%;
		height: 100%;
		font-size: 28rpx;
		background: #fff;
		border: 20rpx;
			
		.p1{
			width: 100%;
			text-align: center;
			line-height: 60rpx;
			font-weight: 600;
		}
		.p2{
			width: 100%;
			font-size: 26rpx;
			text-align: center;
			line-height: 60rpx;
		}
	}

}
.content{
    margin-top: 30rpx;
    display: grid;
    grid-template-columns:repeat(2,1fr);
    grid-column-gap:20rpx;
    grid-row-gap:20rpx;
    .item{
        height: 190rpx;
        background: #fff;
        font-size: 24rpx;
        border-radius: 24rpx;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 20rpx;
        background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbkimg.cdn.bcebos.com%2Fpic%2F267f9e2f07082838807999dab299a9014d08f18c&refer=http%3A%2F%2Fbkimg.cdn.bcebos.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673428918&t=60f2d9472f663debcaa5c1d7d859debe') no-repeat center center;
        background-size:100% 100%;
        color: #fff;
    }
}
.view-box{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>