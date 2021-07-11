// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: book-open;
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
	let stack = widget.addStack()
	
	
	let parameters = (args.widgetParameter || ";First insert text into the widget's parameter").split(';').reverse()

	let [text, size] = parameters
	
	
	let display = stack.addText(text)
	
	display.centerAlignText()
	display.font = Font.semiboldSystemFont(parseInt(size) || 18)
	
	return widget
}
