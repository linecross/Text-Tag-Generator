var textGeneratorApp = new Vue({
    el: '#textGeneratorApp',
    data: {
		text: {
			input: '測試',
			color: 'rgb(0,0,0)',
			fontSize: 12,
			fontFamily: '新細明體',
			letterSpacing: 0,
			marginLeft: 0,
			textShadow: '',
		},
		container: {
			backgroundColor: 'rgb(228,236,255)',
			width: 30,
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
		isContainerAdvance: false,
		zoomLevel: 5,
	},
	mounted: function(){
		this.refreshCanvas();
		let vm = this;
		this.createColorPicker('text');
		this.createColorPicker('container');
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
						preferredFormat: "rgb",
						color: vm[dataId][colorId],
						clickoutFiresChange: true,
						move: function(color) {
							vm[dataId][colorId] = color.toRgbString();
						},
					});
				}
			}
		},
		refreshCanvas(){
			html2canvas(document.getElementById('capture'), {backgroundColor:null, logging: false}).then(function(canvas) {
				canvas.id = 'myCanvas';
				let resultDiv = document.getElementById('result');
				if (resultDiv.firstChild !== null){
					resultDiv.removeChild(resultDiv.firstChild);
					resultDiv.appendChild(canvas);
				}
				else{
					resultDiv.appendChild(canvas);
				}
			});
		},
		getStyle(obj){
			let result = Object.assign({}, obj);
			for (key of Object.keys(result)){
				if (isNumber(result[key])){
					result[key] = result[key] + 'px';
				}
				let val = result[key];

				if (key == 'height'){
					result['minHeight'] = val;
					result['maxHeight'] = val;
				}
				else if (key == 'width'){
					result['minWidth'] = val;
					result['maxWidth'] = val;
				}
				else if (!this.isContainerAdvance && key == 'borderRadius'){
					result['borderTopLeftRadius'] = val;
					result['borderTopRightRadius'] = val;
					result['borderBottomLeftRadius'] = val;
					result['borderBottomRightRadius'] = val;
				}
				else if (!this.isContainerAdvance && (key == 'borderWidth' || key == 'borderColor')){
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
			
			link.setAttribute('download', this.text.input+'.png');
			link.setAttribute('href', myCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
			link.click();
		},
	},
	computed: {
		previewZoom(){
			return 'transform: scale(' + this.zoomLevel+ ')';
		},
		textStyle(){
			return this.getStyle(this.text);
		},
		containerStyle(){
			return this.getStyle(this.container);
		}
	},
});



function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
  
  