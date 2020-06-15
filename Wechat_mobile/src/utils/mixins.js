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
		}
	}
}
export {
	mixins
};
