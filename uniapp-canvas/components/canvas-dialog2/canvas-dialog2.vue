<template>
	<view>
		<view class="canvas-dialog" v-if="visiable">
			<view class="distance"></view>
			<view class="icon-a-chutubiao iconfont iconPos" @click.stop="hiddenCanvas()"></view>
			<canvas canvas-id="posterid" style="width: 750rpx;height: 1000rpx;" class="myCanvas" disable-scroll="true" @touchstart=""
				@touchmove="" @touchend=""></canvas>
			<view class="savePictureBtn" @click="savePoster()">保存图片</view>
		</view>
	</view>
</template>

<script>
	
	export default{
		data(){
			return {
				qrcode:"https://oss.zhangyubk.com/cmqrcode.jpg",
				visiable:false
			}
		},
		// props:{
		// 	avatar:{
		// 		type:String,
		// 		default:''
		// 	},
		// 	userName:{
		// 		type:String,
		// 		default:''
		// 	},
		// },
		methods:{
			//显示
			showCanvas(){
				// console.log('我被调用了')
				this.visiable = true
				this.setStopter();
			},
			hiddenCanvas(){
				console.log('点击关闭')
				this.visiable = false
			},
			async setStopter() { //画海报
				uni.showLoading({
				    title: '加载中...',
					mask: true
				})
				var _this = this
				var ctx = uni.createCanvasContext('posterid',_this) //创建画笔
			
				ctx.drawImage('/static/share.png',20,0, 360, 450); //背景图
				// 头像
				let baner2 = await this.downloadImage('https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png') //改成自己的图片地址
				if (baner2.tempFilePath) {
					ctx.save()
					ctx.drawImage(baner2.tempFilePath,180,180,58,58 );
					ctx.restore()
				}
				this.canvasFont(ctx,14, '#8C8D8D', '微信用户', 170, 260)
				this.drawRoundRect(ctx, 48, 280, 304, 75, 75, '#E5F4F7')
				// 头像
				let baner3 = await this.downloadImage('https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png') //改成自己的图片地址
				if (baner3.tempFilePath) {
					ctx.save()
					ctx.drawImage(baner3.tempFilePath,70,290,54,54 );
					ctx.restore()
				}
				this.canvasFont(ctx,15, '#7F7F7F', '完成5个站打卡', 170, 310)
				this.canvasFont(ctx,12, '#7F7F7F', '打卡站：5/5', 170, 330)
				//小程序码
				let qrcodeImg = await this.downloadImage(this.qrcode)
				if (qrcodeImg.tempFilePath) {
					ctx.save()
					ctx.drawImage(qrcodeImg.tempFilePath,80,370,62,62 );
					ctx.restore()
				}
				this.canvasFont(ctx,14, '#000', '长按扫描查看详情', 160, 390)
				ctx.drawImage("/static/logo.png",160, 400, 28, 28) //气象台的logo
				this.canvasFont(ctx,10, '#8C8D8D', '深圳市气象局(台)', 200, 420)
				
				// ctx.draw()
				//延迟渲染
				setTimeout(()=>{
					ctx.draw(true,()=>{
						uni.hideLoading()
					})
				},500)
				console.log('绘画完成')
			
			},
			canvasFont(ctx,fs, color, txt, x, y) { //绘制文字
				ctx.setFontSize(fs)
				ctx.setFillStyle(color)
				ctx.fillText(txt, x, y)
			},
			//圆角矩形
			drawRoundRect(ctx, x, y, width, height, radius, color){
				ctx.save();
				ctx.beginPath();
				ctx.setFillStyle(color); 
				ctx.setStrokeStyle(color)
				ctx.setLineJoin('round');  //交点设置成圆角
				ctx.setLineWidth(radius);
				ctx.strokeRect(x + radius/2, y + radius/2, width - radius , height - radius );
				ctx.fillRect(x + radius, y + radius, width - radius * 2, height - radius * 2);
				ctx.stroke();
				ctx.closePath();
			},
			downloadImage(url) { //绘制网络图片，网络图片需要先缓存到本地再绘制
				return new Promise((resolve, reject) => {
					uni.downloadFile({ // 还可以使用 uni.getImageInfo 方法
						url: url,
						success: (res) => {
							return resolve(res)
						},
						fail: (err) => {
							return reject(err)
						}
					})
				})
			},
			//保存图片到相册
			savePoster() { //保存海报
				uni.canvasToTempFilePath({
					canvasId: 'posterid',
					success: function(res) {
						console.log(res)
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(result) {
								uni.showToast({
									title: '图片保存成功',
									icon: 'success',
									duration: 2000
								})
							}
						})
					}
				},this);
			},
		}
	}
</script>

<style lang="scss">
	@import '~@/static/icons/iconfont.css';
	.canvas-dialog{
		position: fixed;
		top:0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: auto;
		margin: 0;
		z-index: 33;
		height: 100%;
		background: rgba(0,0,0,.5);
		.savePictureBtn{
			position: absolute;
			width: 442.3rpx;
			height: 76.92rpx;
			font-size: 30.76rpx;
			border-radius: 38.46rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			left: 50%;
			transform: translateX(-50%);
			color: #FFFFFF;
			background-color: #53B997;
			z-index: 100;
			
		}
		
	}
	.iconPos{
		font-family: fontsize;
		color: #FFFFFF;
		position: absolute;
		right:28.84rpx;
		top: 120rpx;
		z-index: 100;
	}
	.distance{
		margin-top: 50px;
	}
</style>
