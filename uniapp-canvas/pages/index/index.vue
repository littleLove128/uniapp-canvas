<template>
	<view class="content">
		<view class="mark">备注：此示例是微信小程序利用canvas绘制弹框保存图片，后续可能会增加其他的例子</view>
		<view class="btn" @click="sharePoster">显示第一种弹框</view>
		<view class="btn" @click="sharePoster2">显示第二种弹框</view>
		<canvas-dialog ref="poster2"></canvas-dialog>
		<canvas-dialog2 ref="poster3"></canvas-dialog2>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ctx:'',
				show:false,
			}
		},
		onLoad() {
		},
		methods: {
			 sharePoster(){//显示第一种弹框
				this.$refs.poster2.showCanvas()
			},
			sharePoster2(){//显示第二种弹框
				this.$refs.poster3.showCanvas()
			},
			

		}
	}
</script>

<style lang="scss">
	// .content{
	// 	width: 100%;
	// 	height: 1500rpx;
	// 	background: rgba(0,0,0,.5);
	// }
.btn{
	width: 576.92rpx;
	height: 76.92rpx;
	background-image: linear-gradient(to right,#2EBEF3,#007EFF);
	color: #FFFFFF;
	font-size: 32.69rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20rpx auto;
	border-radius: 96.15rpx;
}
.mark{
	margin: 20rpx;
}
.myDialog{
	position: fixed;
	top:126rpx;
	right: 0;
	bottom: 0;
	left: 0;
	overflow: auto;
	margin: 0;
	z-index: 999;
	background: rgba(0,0,0,.5);
	// .myCanvas{
	// 	position: relative;
	// 	margin: 15vh auto 50px;
	// 	box-sizing: border-box;
	// 	border-radius: 19.23rpx;
	// 	width: 90%;
	// 	border-radius: 10px;
	// }
}
</style>
