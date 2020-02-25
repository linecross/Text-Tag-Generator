var textGeneratorApp = new Vue({
    el: '#textGeneratorApp',
    data: {
		text: {
			content: '測試',
			color: 'rgb(0,0,0)',
			fontSize: 12,
			fontFamily: '新細明體',
			letterSpacing: 0,
			marginLeft: 0,
			textShadow: '',
		},
		container: {
			backgroundColor: 'rgb(228,236,255)',
			width: 40,
			height: 14,
			borderRadius: 5,
			borderTopLeftRadius: 5,
			borderTopRightRadius: 5,
			borderBottomLeftRadius: 5,
			borderBottomRightRadius: 5,
			borderWidth: 1,
			borderTopWidth: 1,
			borderRightWidth: 1,
			borderBottomWidth: 1,
			borderLeftWidth: 1,
			borderColor: 'rgb(17,0,184)',
			borderTopColor: 'rgb(17,0,184)',
			borderBottomColor: 'rgb(17,0,184)',
			borderLeftColor: 'rgb(17,0,184)',
			borderRightColor: 'rgb(17,0,184)',
		},
		leftBox:{
			content: '',
			color: 'transparent',
			backgroundColor: 'transparent',
			fontSize: 8,
			fontFamily: 'Segoe UI Symbol',
			marginLeft: 0,
			textShadow: '',
		},
		box: {
			backgroundColor: 'transparent',
			paddingLeft: 0,
			paddingRight: 0,
			paddingTop: 0,
			paddingBottom: 0,
			borderRadius: 0,
			borderTopLeftRadius: 0,
			borderTopRightRadius: 0,
			borderBottomLeftRadius: 0,
			borderBottomRightRadius: 0,
			borderWidth: 0,
			borderTopWidth: 0,
			borderRightWidth: 0,
			borderBottomWidth: 0,
			borderLeftWidth: 0,
			borderColor: 'transparent',
			borderTopColor: 'transparent',
			borderBottomColor: 'transparent',
			borderLeftColor: 'transparent',
			borderRightColor: 'transparent',
		},
		isBoxMode: false,
		isDetailBorderMode: false,
		zoomLevel: 2,
	},
	mounted: function(){
		this.refreshCanvas();
		let vm = this;
		this.createColorPicker('text');
		this.createColorPicker('container');
		this.createColorPicker('leftBox');
		this.createColorPicker('box');
	},
	updated: function(){
		this.refreshCanvas();
	},
	methods: {
		createColorPicker(dataId){
			let vm = this;
			for (key of Object.keys(this[dataId])) {
				if (key.toLowerCase().includes('color')){
					let colorId = key;
					$('#' + dataId + '-' + colorId + '-cpicker').spectrum({
						chooseText: "確定",
						cancelText: "取消",
						showAlpha: true,
						showInput: true,
						allowEmpty: true,
						preferredFormat: "rgb",
						color: vm[dataId][colorId],
						clickoutFiresChange: true,
						change: function(color){
							vm[dataId][colorId] = color !== null ? color.toRgbString() : 'transparent';
						},
						move: function(color) {
							vm[dataId][colorId] = color !== null ? color.toRgbString() : 'transparent';
						},
					});
				}
			}
		},
		refreshCanvas(){
			html2canvas(document.getElementById('capture'), {backgroundColor:null, logging: false}).then(function(canvas) {
				canvas.id = 'myCanvas';
				let resultDiv = document.getElementById('result');
				let previewDiv = document.getElementById('preview');
				if (resultDiv.firstChild !== null){
					resultDiv.removeChild(resultDiv.firstChild);
					resultDiv.appendChild(canvas);
				}
				else{
					resultDiv.appendChild(canvas);
				}
			});
		},
		getStyle(obj, isFixDimension = false){
			let result = Object.assign({}, obj);
			for (key of Object.keys(result)){
				if (isNumber(result[key])){
					result[key] = result[key] + 'px';
				}
				let val = result[key];

				if (isFixDimension && key == 'height'){
					result['minHeight'] = val;
					result['maxHeight'] = val;
				}
				else if (isFixDimension && key == 'width'){
					result['minWidth'] = val;
					result['maxWidth'] = val;
				}
				else if (!this.isDetailBorderMode && key == 'borderRadius'){
					result['borderTopLeftRadius'] = val;
					result['borderTopRightRadius'] = val;
					result['borderBottomLeftRadius'] = val;
					result['borderBottomRightRadius'] = val;
				}
				else if (!this.isDetailBorderMode && (key == 'borderWidth' || key == 'borderColor')){
					result[key.replace('border', 'borderLeft')] = val;
					result[key.replace('border', 'borderRight')] = val;
					result[key.replace('border', 'borderTop')] = val;
					result[key.replace('border', 'borderBottom')] = val;
				}
			}
			return result;
		},
		saveImg(){
			let myCanvas = document.getElementById('myCanvas');
			let link = document.getElementById('link');
			
			link.setAttribute('download', this.text.content+'.png');
			link.setAttribute('href', myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
			link.click();
		},
		exportJson(){
			document.getElementById('jsonData').value = JSON.stringify(this.$data);
		},
		importJson(){
			let json = document.getElementById('jsonData').value;
			if (json.trim() !== ''){
				let jsonObj = JSON.parse(json);
				Object.keys(this.$data).forEach(key => this.$data[key] = null);
				Object.entries(jsonObj).forEach(entry => Vue.set(this.$data, entry[0], entry[1]));
			}
		}
	},
	computed: {
		previewZoom(){
			return 'transform: scale(' + this.zoomLevel+ ')';
		},
		textStyle(){
			return this.getStyle(this.text);
		},
		leftBoxStyle(){
			return this.getStyle(this.leftBox);
		},
		boxStyle(){
			return this.getStyle(this.box);
		},
		containerStyle(){
			return this.getStyle(this.container, true);
		}
	},
});



function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
  
  