const mixins = {
	data() {
		return {

		}
	},
	filters: {

	},
	computed: {


	},
	methods: {
		onBack() {
			this.$router.back();
		},
		filterImg(url) {
			let flag = /(http|https)/.test(url);
			let host = process.env.VUE_APP_BASE_API;
			if (!flag && url) {
				if (!/data:image\/([^;]+).*/.test(url)) {
					if (url.indexOf('public') == 0) {
						url = host + url.replace('public', '');
					} else {
						url = host + url;
					}
				}
			}
			return url;
		},
		compressImg(img) {
			return new Promise((resolve) => {
				let quality = 0.5;  // 默认图片质量为0.7
				let image = new Image(); //新建一个img标签
				image.src = img;
				image.onload = () => {
					let canvas = document.createElement('canvas');
					let context = canvas.getContext('2d');
					// 定义 canvas 大小，也就是压缩后下载的图片大小
					let imageWidth = image.width; //压缩后图片的大小
					let imageHeight = image.height;
					canvas.width = imageWidth;
					canvas.height = imageHeight;
					context.drawImage(image, 0, 0, imageWidth, imageHeight);
					let base = canvas.toDataURL(this.getMimeType(img), quality);
					resolve(base);
				};
			});
		},
		getMimeType(urlData) {
			var arr = urlData.split(',');
			var mime = arr[0].match(/:(.*?);/)[1];
			return mime;
		},
		dataURLtoFile(dataurl, filename) {
			var arr = dataurl.split(',');
			var mime = arr[0].match(/:(.*?);/)[1];
			var bstr = atob(arr[1]);
			var n = bstr.length;
			var u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			//转换成file对象
			return new File([u8arr], filename, {
				type: mime
			});
			//转换成成blob对象
			//return new Blob([u8arr],{type:mime});
		}
	}
}
export {
	mixins
};
