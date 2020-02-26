const stylePreset = {

    default: {
        '預設1': '{"text":{"content":"測試","color":"rgb(0,0,0)","fontSize":12,"fontFamily":"新細明體","letterSpacing":0,"marginLeft":0,"textShadow":"","marginTop":"0"},"container":{"backgroundColor":"rgb(228,236,255)","width":40,"height":14,"borderRadius":5,"borderTopLeftRadius":5,"borderTopRightRadius":5,"borderBottomLeftRadius":5,"borderBottomRightRadius":5,"borderWidth":1,"borderTopWidth":1,"borderRightWidth":1,"borderBottomWidth":1,"borderLeftWidth":1,"borderColor":"rgb(17,0,184)","borderTopColor":"rgb(17,0,184)","borderBottomColor":"rgb(17,0,184)","borderLeftColor":"rgb(17,0,184)","borderRightColor":"rgb(17,0,184)"},"leftBox":{"content":"","color":"transparent","backgroundColor":"transparent","fontSize":8,"fontFamily":"Segoe UI Symbol","marginLeft":0,"textShadow":"","marginTop":"0"},"box":{"backgroundColor":"transparent","paddingLeft":0,"paddingRight":0,"paddingTop":0,"paddingBottom":0,"borderRadius":0,"borderTopLeftRadius":0,"borderTopRightRadius":0,"borderBottomLeftRadius":0,"borderBottomRightRadius":0,"borderWidth":0,"borderTopWidth":0,"borderRightWidth":0,"borderBottomWidth":0,"borderLeftWidth":0,"borderColor":"transparent","borderTopColor":"transparent","borderBottomColor":"transparent","borderLeftColor":"transparent","borderRightColor":"transparent"},"uiConfig":{"isBoxMode":false,"isDetailBorderMode":false,"useNumberInput":false,"zoomLevel":5,"showStyleOperation":true}}',
        '預設2': '{"text":{"content":"閒聊","color":"rgb(0,0,0)","fontSize":12,"fontFamily":"新細明體","letterSpacing":0,"marginLeft":0,"textShadow":"","marginTop":"0"},"container":{"backgroundColor":"transparent","width":40,"height":14,"borderRadius":"26","borderTopLeftRadius":"0","borderTopRightRadius":"0","borderBottomLeftRadius":"0","borderBottomRightRadius":"0","borderWidth":"2","borderTopWidth":"2","borderRightWidth":"0","borderBottomWidth":"2","borderLeftWidth":"0","borderColor":"rgb(17,0,184)","borderTopColor":"rgb(255, 0, 0)","borderBottomColor":"rgb(255, 0, 0)","borderLeftColor":"rgb(17,0,184)","borderRightColor":"rgb(17,0,184)"},"leftBox":{"content":"","color":"transparent","backgroundColor":"transparent","fontSize":8,"fontFamily":"Segoe UI Symbol","marginLeft":"0","textShadow":"","marginTop":"0"},"box":{"backgroundColor":"transparent","paddingLeft":0,"paddingRight":0,"paddingTop":0,"paddingBottom":0,"borderRadius":0,"borderTopLeftRadius":0,"borderTopRightRadius":0,"borderBottomLeftRadius":0,"borderBottomRightRadius":0,"borderWidth":0,"borderTopWidth":0,"borderRightWidth":0,"borderBottomWidth":0,"borderLeftWidth":0,"borderColor":"transparent","borderTopColor":"transparent","borderBottomColor":"transparent","borderLeftColor":"transparent","borderRightColor":"transparent"},"uiConfig":{"isBoxMode":false,"isDetailBorderMode":true,"useNumberInput":false,"zoomLevel":5,"showStyleOperation":true}}',
        '預設3': '{"text":{"content":"祈求","color":"rgb(0,0,0)","fontSize":12,"fontFamily":"新細明體","letterSpacing":0,"marginLeft":0,"textShadow":"","marginTop":"0"},"container":{"backgroundColor":"rgb(178, 255, 220)","width":40,"height":"17","borderRadius":"26","borderTopLeftRadius":"30","borderTopRightRadius":"0","borderBottomLeftRadius":"0","borderBottomRightRadius":"30","borderWidth":"2","borderTopWidth":"0","borderRightWidth":"0","borderBottomWidth":"0","borderLeftWidth":"0","borderColor":"rgb(17,0,184)","borderTopColor":"rgb(255, 0, 0)","borderBottomColor":"rgb(255, 0, 0)","borderLeftColor":"rgb(17,0,184)","borderRightColor":"rgb(17,0,184)"},"leftBox":{"content":"","color":"transparent","backgroundColor":"transparent","fontSize":8,"fontFamily":"Segoe UI Symbol","marginLeft":0,"textShadow":"","marginTop":"0"},"box":{"backgroundColor":"transparent","paddingLeft":0,"paddingRight":0,"paddingTop":0,"paddingBottom":0,"borderRadius":0,"borderTopLeftRadius":0,"borderTopRightRadius":0,"borderBottomLeftRadius":0,"borderBottomRightRadius":0,"borderWidth":0,"borderTopWidth":0,"borderRightWidth":0,"borderBottomWidth":0,"borderLeftWidth":0,"borderColor":"transparent","borderTopColor":"transparent","borderBottomColor":"transparent","borderLeftColor":"transparent","borderRightColor":"transparent"},"uiConfig":{"isBoxMode":false,"isDetailBorderMode":true,"useNumberInput":false,"zoomLevel":5,"showStyleOperation":true}}',
        '預設4': '{"text":{"content":"測試","color":"rgb(0,0,0)","fontSize":12,"fontFamily":"新細明體","letterSpacing":0,"marginLeft":0,"marginTop":0,"textShadow":""},"container":{"backgroundColor":"rgb(228,236,255)","width":"42","height":14,"borderRadius":5,"borderTopLeftRadius":5,"borderTopRightRadius":5,"borderBottomLeftRadius":5,"borderBottomRightRadius":5,"borderWidth":1,"borderTopWidth":1,"borderRightWidth":1,"borderBottomWidth":1,"borderLeftWidth":1,"borderColor":"rgb(17,0,184)","borderTopColor":"rgb(17,0,184)","borderBottomColor":"rgb(17,0,184)","borderLeftColor":"rgb(17,0,184)","borderRightColor":"rgb(17,0,184)"},"leftBox":{"content":"❤","color":"rgb(255, 0, 0)","backgroundColor":"transparent","fontSize":8,"fontFamily":"Segoe UI Symbol","marginLeft":0,"marginTop":0,"textShadow":""},"box":{"backgroundColor":"transparent","paddingLeft":0,"paddingRight":0,"paddingTop":0,"paddingBottom":0,"borderRadius":0,"borderTopLeftRadius":0,"borderTopRightRadius":0,"borderBottomLeftRadius":0,"borderBottomRightRadius":0,"borderWidth":0,"borderTopWidth":0,"borderRightWidth":0,"borderBottomWidth":0,"borderLeftWidth":0,"borderColor":"transparent","borderTopColor":"transparent","borderBottomColor":"transparent","borderLeftColor":"transparent","borderRightColor":"transparent"},"uiConfig":{"isBoxMode":true,"isDetailBorderMode":false,"useNumberInput":false,"showStyleOperation":true,"zoomLevel":"5"}}',
        '預設5': '{"text":{"content":"文字","color":"rgb(0,0,0)","fontSize":12,"fontFamily":"新細明體","letterSpacing":0,"marginLeft":0,"marginTop":0,"textShadow":""},"container":{"backgroundColor":"rgb(240,225,255)","width":"36","height":14,"borderRadius":5,"borderTopLeftRadius":"0","borderTopRightRadius":"0","borderBottomLeftRadius":"0","borderBottomRightRadius":"0","borderWidth":1,"borderTopWidth":"0","borderRightWidth":1,"borderBottomWidth":1,"borderLeftWidth":"9","borderColor":"rgb(17,0,184)","borderTopColor":"rgb(181,181,181)","borderBottomColor":"rgb(181,181,181)","borderLeftColor":"rgb(156,65,255)","borderRightColor":"rgb(181,181,181)"},"leftBox":{"content":"","color":"rgba(0, 0, 0, 0)","backgroundColor":"transparent","fontSize":8,"fontFamily":"Segoe UI Symbol","marginLeft":0,"marginTop":0,"textShadow":""},"box":{"backgroundColor":"transparent","paddingLeft":0,"paddingRight":0,"paddingTop":0,"paddingBottom":0,"borderRadius":0,"borderTopLeftRadius":0,"borderTopRightRadius":0,"borderBottomLeftRadius":0,"borderBottomRightRadius":0,"borderWidth":0,"borderTopWidth":0,"borderRightWidth":0,"borderBottomWidth":0,"borderLeftWidth":0,"borderColor":"transparent","borderTopColor":"transparent","borderBottomColor":"transparent","borderLeftColor":"transparent","borderRightColor":"transparent"},"uiConfig":{"isBoxMode":false,"isDetailBorderMode":true,"useNumberInput":false,"showStyleOperation":true,"zoomLevel":"5"}}',
    },
    custom: {
        '測試1': '{"text":{"content":"測試","color":"rgb(255, 225, 171)","fontSize":12,"fontFamily":"新細明體","letterSpacing":0,"marginLeft":0,"textShadow":"1px 1px #99581d"},"container":{"backgroundColor":"transparent","width":40,"height":14,"borderRadius":5,"borderTopLeftRadius":5,"borderTopRightRadius":5,"borderBottomLeftRadius":5,"borderBottomRightRadius":5,"borderWidth":1,"borderTopWidth":1,"borderRightWidth":1,"borderBottomWidth":1,"borderLeftWidth":1,"borderColor":"transparent","borderTopColor":"rgb(17,0,184)","borderBottomColor":"rgb(17,0,184)","borderLeftColor":"rgb(17,0,184)","borderRightColor":"rgb(17,0,184)"},"leftBox":{"content":"","color":"transparent","backgroundColor":"transparent","fontSize":8,"fontFamily":"Segoe UI Symbol","marginLeft":0,"textShadow":""},"box":{"backgroundColor":"transparent","paddingLeft":0,"paddingRight":0,"paddingTop":0,"paddingBottom":0,"borderRadius":0,"borderTopLeftRadius":0,"borderTopRightRadius":0,"borderBottomLeftRadius":0,"borderBottomRightRadius":0,"borderWidth":0,"borderTopWidth":0,"borderRightWidth":0,"borderBottomWidth":0,"borderLeftWidth":0,"borderColor":"transparent","borderTopColor":"transparent","borderBottomColor":"transparent","borderLeftColor":"transparent","borderRightColor":"transparent"},"uiConfig":{"isBoxMode":false,"isDetailBorderMode":false,"useNumberInput":false,"zoomLevel":5,"showStyleOperation":true}}',
    },
    local: {

    }

}