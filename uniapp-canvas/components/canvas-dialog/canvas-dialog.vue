<template>
	<view>
		<view class="canvas-dialog" v-if="visiable">
			<view class="distance"></view>
			<view class="icon-a-chutubiao iconfont iconPos" @click.stop="hiddenCanvas()"></view>
			<canvas canvas-id="posterid" style="width: 750rpx;height: 1000rpx;" class="myCanvas" disable-scroll="true" @touchstart=""
				@touchmove="" @touchend=""></canvas>
				<!-- // touchstart touchmove touchend 这三个事件的作用是防止canvas 滚动 -->
				<view class="savePictureBtn" @click.stop="savePoster()">保存分享图 </view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				qrcode:"https://res.wx.qq.com/wxdoc/dist/assets/img/WXACode.fa3d686a.png",
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
		// 	rank:{
		// 		type:Number,
		// 		default:0
		// 	},
		// 	rankName:{
		// 		type:String,
		// 		default:''
		// 	},
		// 	powerVal:{
		// 		type:Number,
		// 		default:0
		// 	}
		// },
		methods:{
			//显示
			showCanvas(){
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

				
				ctx.drawImage('/static/share.png',20,0, 360, 450);
				// 头像// //绘制网络图片
				let baner2 = await this.downloadImage('https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png') //改成自己的图片地址
				if (baner2.tempFilePath) {
					ctx.save()
					ctx.drawImage(baner2.tempFilePath,180,180,58,58 );
					ctx.restore()
				}
				this.canvasFont(ctx,14, '#8C8D8D', '微信用户', 170, 260)
				this.canvasFont(ctx,30, '#53B997', '20', 130, 300)
				this.canvasFont(ctx,30, '#53B997', '100', 210, 300)
				this.canvasFont(ctx,14, '#8C8D8D', '草之力排名', 110, 320)
				this.canvasFont(ctx,14, '#8C8D8D', '战力值', 210, 320)
				//小程序码
				let qrcodeImg = await this.downloadImage(this.qrcode)
				if (qrcodeImg.tempFilePath) {
					ctx.save()
					ctx.drawImage(qrcodeImg.tempFilePath,80,350,62,62 );
					ctx.restore()
				}
				this.canvasFont(ctx,14, '#000', '长按扫描查看详情', 160, 370)
				ctx.drawImage("/static/logo.png",160, 380, 28, 28) //气象台的logo
				this.canvasFont(ctx,10, '#8C8D8D', '深圳市气象局(台)', 200, 400)
				
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
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(result) {
								uni.showToast({
									title: '图片保存成功',
									icon: 'success',
									duration: 2000
								})
							},
							
						})
					},
					complete(res){//不管成功或者失败都会执行
						console.log('canvas转成图片结果',res)
					}
				},this);
			},
		}
	}
</script>

<style lang="scss">
	@import '~@/static/icons/iconfont.css';
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
	.canvas-dialog{
		position: fixed;
		top:0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: auto;
		margin: 0;
		z-index: 999;
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
		}
		
	}
</style>
