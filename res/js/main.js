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
		uiConfig:{
			isBoxMode: false,
			isDetailBorderMode: false,
			useNumberInput: false,
			showStyleOperation: false,
			zoomLevel: 5,
		},
		styles: {
			preset: {},
			selected: '',
			newStyleName: ''
		},
	},
	mounted: function(){
		this.createColorPicker('text');
		this.createColorPicker('container');
		this.createColorPicker('leftBox');
		this.createColorPicker('box');

		this.styles.preset = stylePreset;
		let localStyles = localStorage.getItem("localStyles");
		if (localStyles != null){
			this.styles.preset.local = JSON.parse(localStyles);
		}
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

					vm.$watch(dataId + '.' + colorId, function(newValue, oldValue) {
						this.setColorPicker(dataId + '-' + colorId);
					});
				}
			}
		},
		setColorPicker(key){
			
			let inputColor = $('#' + key).val();
			let spectrumColor = $('#' + key + '-cpicker').spectrum('get');
			// if (isColor(inputColor) && !isSameColor(inputColor, spectrumColor)){
				if (isColor(inputColor)){
				$('#' + key + '-cpicker').spectrum('set',inputColor);
			}
		},
		refreshCanvas(){
			html2canvas(document.getElementById('capture'), {
				backgroundColor:null, 
				logging: false,
				allowTaint: true,
				useCORS: true,
			}).then(function(canvas) {
				canvas.id = 'myCanvas';
				let resultDiv = document.getElementById('result');
				resultDiv.innerHTML = '';
				resultDiv.appendChild(canvas);
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
				else if (!this.uiConfig.isDetailBorderMode && key == 'borderRadius'){
					result['borderTopLeftRadius'] = val;
					result['borderTopRightRadius'] = val;
					result['borderBottomLeftRadius'] = val;
					result['borderBottomRightRadius'] = val;
				}
				else if (!this.uiConfig.isDetailBorderMode && (key == 'borderWidth' || key == 'borderColor')){
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
			let exportData = Object.assign({}, this.$data);
			delete exportData.styles;
			document.getElementById('jsonData').value = JSON.stringify(exportData);
		},
		importJson(json){
			if (json == null || json == undefined){
				json = document.getElementById('jsonData').value;
			}
			if (json.trim() !== ''){
				let jsonObj = JSON.parse(json);

				if (jsonObj.text != null){
					Vue.set(this.$data, 'text', jsonObj.text);
				}
				if (jsonObj.container != null){
					Vue.set(this.$data, 'container', jsonObj.container);
				}
				if (jsonObj.leftBox != null){
					Vue.set(this.$data, 'leftBox', jsonObj.leftBox);
				}
				if (jsonObj.box != null){
					Vue.set(this.$data, 'box', jsonObj.box);
				}
				if (jsonObj.uiConfig != null){
					Vue.set(this.$data, 'uiConfig', jsonObj.uiConfig);
				}

				this.$forceUpdate();
				
			}
		},
		saveLocalStyle(){
			if (this.styles.newStyleName.trim() != ''){
				let exportData = Object.assign({}, this.$data);
				delete exportData.style;
				this.styles.preset.local[this.styles.newStyleName] = JSON.stringify(exportData);

				localStorage.setItem("localStyles", JSON.stringify(this.$data.styles.preset.local));
				this.styles.selected = 'local-'+this.styles.newStyleName;
				this.styles.newStyleName = '';
				this.$forceUpdate();
			}
		},
		deleteLocalStyle(){
			if (this.styles.selected.startsWith('local-')){
				let styleName = this.styles.selected.replace('local-', '');
				delete this.styles.preset.local[styleName];
				localStorage.setItem("localStyles", JSON.stringify(this.$data.styles.preset.local));
				this.$forceUpdate();
			}
			
		}
	},
	computed: {
		numInputType(){
			return this.uiConfig.useNumberInput ? 'number' : 'range';
		},
		previewZoom(){
			return 'transform: scale(' + this.uiConfig.zoomLevel+ ')';
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
	watch:{
		"styles.selected": function(val, oldVal){
			if (val === null || val === undefined || val === ''){
				return;
			}
			this.importJson(resolve(this.styles.preset, val));
			if (val.startsWith('local-')){
				this.styles.newStyleName = val.replace('local-', '');
			}
		},
	}
});



function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
  
function isColor(strColor){
	var s = new Option().style;
	s.color = strColor;
	return s.color != null && s.color != '';
}

function isSameColor(str1, str2){
	if (str1 === str2){
		return true;
	}

	var s1 = new Option().style;
	var s2 = new Option().style;
	s1.color = str1;
	s2.color = str2;
	return s1.color == s2.color;
}

function resolve(obj, path) {
    return path.split('-').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj || self)
}