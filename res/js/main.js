const INPUT_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];
const TEXTGEN_JSON_KEYS=['text', 'container', 'leftBox', 'rightBox', 'box', 'uiConfig'];

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
			marginTop: 0,
			whiteSpace: 'nowrap',
			backgroundColor: 'transparent',
			width: 'auto',
			height: 'auto',
			customCss: '',
		},
		container: {
			backgroundColor: 'rgb(228,236,255)',
			backgroundImage: '',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'auto',
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
			customCss: '',
		},
		leftBox:{
			content: '',
			color: 'transparent',
			backgroundColor: 'transparent',
			fontSize: 8,
			fontFamily: 'Segoe UI Symbol',
			letterSpacing: 0,
			marginLeft: 0,
			marginTop: 0,
			whiteSpace: 'nowrap',
			width: 'auto',
			height: 'auto',
			customCss: '',
		},
		rightBox:{
			content: '',
			color: 'transparent',
			backgroundColor: 'transparent',
			fontSize: 8,
			fontFamily: 'Segoe UI Symbol',
			letterSpacing: 0,
			marginLeft: 0,
			marginTop: 0,
			whiteSpace: 'nowrap',
			width: 'auto',
			height: 'auto',
			customCss: '',
		},
		box: {
			backgroundColor: 'transparent',
			backgroundImage: '',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'auto',
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
			customCss: '',
		},
		uiConfig:{
			isBoxMode: false,
			isDetailBorderMode: false,
			isImageMode: false,
		},
		userConfig:{
			useNumberInput: false,
			showStyleOperation: false,
			isRealtimeRender: true,
			isAdvEdit: false,
			htmlZoomLevel: 0,
			zoomLevel: 5,
		},
		styles: {
			preset: {},
			selected: '',
			newStyleName: ''
		},
		sys: {
			needRender: true,
			forceRender: false,
		},
	},
	mounted: function(){
		this.createColorPicker('text');
		this.createColorPicker('container');
		this.createColorPicker('leftBox');
		this.createColorPicker('rightBox');
		this.createColorPicker('box');

		let userConfig = localStorage.getItem("userConfig");
		if (userConfig != null){
			this.userConfig = JSON.parse(userConfig);
		}

		this.styles.preset = stylePreset;
		let localStyles = localStorage.getItem("localStyles");
		if (localStyles != null){
			this.styles.preset.local = JSON.parse(localStyles);
		}

		this.sys.forceRender = true;
		this.refreshCanvas();
	},
	updated: function(){
		this.refreshCanvas('data-change');
	},
	methods: {
		triggerUIChange(evt){
			// if (INPUT_TAGS.includes(evt.target.tagName)){
				this.refreshCanvas('ui-change');
			// }
		},
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
							vm.triggerUIChange();
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
			// let spectrumColor = $('#' + key + '-cpicker').spectrum('get');
			// if (isColor(inputColor) && !isSameColor(inputColor, spectrumColor)){
			if (isColor(inputColor)){
				$('#' + key + '-cpicker').spectrum('set',inputColor);
			}
		},
		refreshCanvas(triggerType){
			if (!(this.sys.needRender || this.sys.forceRender)){
				return;
			}
			if (!this.sys.forceRender && (!this.userConfig.isRealtimeRender && triggerType == 'data-change')){
				return;
			}
			
			let x = document.getElementById('capture').offsetLeft;
			let y = document.getElementById('capture').offsetTop;
			let width = Math.ceil(document.getElementById("capture").getBoundingClientRect().width);
			let height = Math.ceil(document.getElementById("capture").getBoundingClientRect().height);

			let options = {
				backgroundColor: null, 
				logging: false,
				allowTaint: true,
				x: x,
				y: y,
				width: width,
				height: height,
				scrollX: 0,
				scrollY: 0,
			};

			html2canvas(document.getElementById('capture'), options).then(function(canvas) {
				let canvasEle = document.getElementById('myCanvas');
				canvasEle.remove();
				canvas.id = 'myCanvas';
				let resultDiv = document.getElementById('result');
				resultDiv.appendChild(canvas);
			});

			this.sys.needRender = false;
			this.sys.forceRender = false;
		},
		getStyle(obj, isFixDimension = false, debugItem){
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

			for (key of Object.keys(result)){
				delete result['borderRadius'];
				delete result['borderWidth'];
				delete result['borderColor'];
			}

			if (result['customCss'] != null && result['customCss'].length > 0){
				let cssArr = result['customCss'].split(';');
				for (let cssStr of cssArr){
					let css = cssStr.split(':');
					if (css.length == 2){
						let prop = _.camelCase(css[0].trim());
						let val = css[1].trim();
						result[prop] = val;
					}
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
		uploadImage(key){
			let input = document.getElementById(key+'-image-file-input');
			if (input.files && input.files[0]) {
				let fileReader = new FileReader();
				
				let vm = this;
				fileReader.onload = function (e) {
					document.getElementById(key+'-image-file-preview').src = e.target.result;
					vm[key].backgroundImage = "url("+e.target.result+")";
				}
				
				fileReader.readAsDataURL(input.files[0]);
			}
		},
		clearImage(key){
			document.getElementById(key+'-image-file-form').reset();
			document.getElementById(key+'-image-file-preview').src = '#';
			this[key].backgroundImage = '';
		},
		exportJson(){
			let exportData = Object.assign({}, this.$data);
			Object.keys(exportData)
				.filter(key => !TEXTGEN_JSON_KEYS.includes(key))
				.forEach(key => delete exportData[key]);
			document.getElementById('jsonData').value = JSON.stringify(exportData);
		},
		importJson(json){
			if (json == null || json == undefined){
				json = document.getElementById('jsonData').value;
			}
			if (json.trim() !== ''){
				let jsonObj = JSON.parse(json);

				for (let key of TEXTGEN_JSON_KEYS){
					if (jsonObj[key] != null){
						Vue.set(this.$data, key, jsonObj[key]);
					}
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
		},
		exportLocalStyles(){
			let json = JSON.stringify(this.$data.styles.preset.local);
			let blob = new Blob([json], {type: "application/json; charset=utf-8"});
			saveAs(blob, "localStyles.json");
		},
		uploadJsonFile(){
			document.getElementById('json-file-input').click();
		},
		importLocalStyles(){
			let input = document.getElementById('json-file-input');
			if (input.files && input.files[0]) {
				let fileReader = new FileReader();
				
				let vm = this;
				fileReader.onload = function (e) {
					if (e.target.result.trim() !== ''){
						let styles = JSON.parse(e.target.result);
						let importedStyle = [];
						for (key of Object.keys(styles)){
							let style = JSON.parse(styles[key]);
							let isValidStyle = false;
							let backup = vm.styles.preset.local[key];
							vm.styles.preset.local[key] = {};
							let cleanStyle = {};
							for (propKey of Object.keys(style)){
								if (TEXTGEN_JSON_KEYS.includes(propKey)){
									cleanStyle[propKey] = style[propKey];
									isValidStyle = true;
								}
							}
							if (!isValidStyle){
								delete vm.styles.preset.local[key];
								if (backup != null && backup != {}){
									vm.styles.preset.local[key] = backup;
								}
							}
							else{
								vm.styles.preset.local[key] = JSON.stringify(cleanStyle);
								importedStyle.push(key);
							}
						}
						if (importedStyle.length > 0){
							alert("已匯入下列模板：\n" + importedStyle.join('\n'));
							localStorage.setItem("localStyles", JSON.stringify(vm.$data.styles.preset.local));
							vm.$forceUpdate();
						}
						else{
							alert("模板格式錯誤，無法匯入。");
						}
					}
				}
				
				fileReader.readAsText(input.files[0]);
			}
		},
		toggleSection(key){
			$('#'+key+'-config-section').toggleClass('collapse');
		},
	},
	computed: {
		hideNumLabel(){
			return this.userConfig.useNumberInput || this.userConfig.isAdvEdit;
		},
		numRangeInputType(){
			return this.userConfig.isAdvEdit ? 'text' : this.userConfig.useNumberInput ? 'number' : 'range';
		},
		numInputType(){
			return this.userConfig.isAdvEdit ? 'text' : 'number';
		},
		htmlZoom(){
			let width = Math.ceil(document.getElementById("capture").getBoundingClientRect().width);
			width = width + 'px';
			return 'transform: scale(' + this.userConfig.htmlZoomLevel+ '); width:'+width;
		},
		htmlZoomWrapper(){
			let height = Math.ceil(document.getElementById("capture").getBoundingClientRect().height);
			let width = Math.ceil(document.getElementById("capture").getBoundingClientRect().width);
			height = height * this.userConfig.htmlZoomLevel + 'px';
			width = width * this.userConfig.htmlZoomLevel + 'px';
			return 'height:' + height + '; max-width:' + width;
		},
		previewZoom(){
			let width = Math.ceil(document.getElementById("capture").getBoundingClientRect().width);
			width = width + 'px';
			return 'transform: scale(' + this.userConfig.zoomLevel+ '); width:'+width;
		},
		textStyle(){
			this.sys.needRender = true;
			return this.getStyle(this.text);
		},
		leftBoxStyle(){
			this.sys.needRender = true;
			return this.getStyle(this.leftBox);
		},
		rightBoxStyle(){
			this.sys.needRender = true;
			return this.getStyle(this.rightBox);
		},
		boxStyle(){
			this.sys.needRender = true;
			return this.getStyle(this.box);
		},
		containerStyle(){
			this.sys.needRender = true;
			return this.getStyle(this.container, true);
		},
	},
	watch:{
		"styles.selected": function(val, oldVal){
			if (val === null || val === undefined || val === ''){
				return;
			}
			this.sys.needRender = true;
			this.sys.forceRender = true;
			this.importJson(resolve(this.styles.preset, val));
			if (val.startsWith('local-')){
				this.styles.newStyleName = val.replace('local-', '');
			}
		},
		"uiConfig.isDetailBorderMode": function(val, oldVal){
			this.sys.needRender = true;
			this.sys.forceRender = true;
		},
		"userConfig": {
			handler:  function(val, oldVal){
				localStorage.setItem("userConfig", JSON.stringify(this.userConfig));
			},
			deep: true,
		}
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