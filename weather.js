// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: sun;

//defining colors
const stackColor = Color.dynamic(Color.white(), new Color("#242424", 1))
const mainColor = Color.dynamic(Color.black(), new Color("#dddddd", 1))





let widget = await createWidget()

Script.setWidget(widget)

if (config.runsInWidget) {
	Script.setWidget(widget)
} else {
	widget.presentSmall()
}

Script.complete()






async function createWidget() {
	
	let widget = new ListWidget()
	
	let topStack = widget.addStack()
	let bottomStack = widget.addStack()
	
	
	
	let location = await getLocation()
	let {lat, lon} = location
	//console.log(`${lat}  ${lon}`)
	
	let data = await getData(lat, lon)
	//console.log(data)
	
	
	
	let iconId = data.weather[0].icon
	//console.log(iconId)
	let img = await getImage(iconId)
	
	let temp = data.main.temp
	temp = Math.round(temp)+"°C"
	temp = String(temp)
	let desc = data.weather[0].description
	
	
	
	
	let image = topStack.addImage(img)
	let temperature = topStack.addText(temp)
	temperature.textColor = mainColor
	temperature.font = Font.boldMonospacedSystemFont(24)
	
	topStack.centerAlignContent()
	
		
	bottomStack.addSpacer(12)
	
	let description = bottomStack.addText(desc)
	description.font = Font.regularMonospacedSystemFont(15)
	description.textColor = mainColor
	
					
	widget.addSpacer(16)	
	return widget
}




async function getLocation(){
	let location = await Location.current()
	let lat = location.latitude	
	let lon = location.longitude
	
	return {lat: lat, lon: lon}
}


async function getData(lat,lon){
	units = "metric"	
	let appid = await args.widgetParameter
	
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}&units=${units}`
	
	let req = new Request(url)	
	let res = await req	
	let data = await req.loadJSON()
	
	return data
}



async function getImage(id){
	let url = `https://openweathermap.org/img/wn/${id}@4x.png`
	
	let req = new Request(url)	
	let res = await req	
	let img = await req.loadImage()
	
	return img
}								