
function scrollTrigger({selector, offeset = 0, execute, viewTrigger}){
	const position = document.querySelector(selector).getBoundingClientRect()
	const triggerTop = position.top - offeset
	const triggerBottom = position.bottom
	var stopTrigger = false

	window.addEventListener("scroll", () => {
		if(window.scrollY > triggerTop && window.scrollY < triggerBottom){
			if(!stopTrigger){
				execute()
			}
			stopTrigger = true
		}
	})

	if(viewTrigger){
		const trigger = document.createElement("span")
		trigger.style.width = "50px"
		trigger.style.height = "5px"
		trigger.style.background = "red"
		trigger.style.position = "absolute"
		trigger.style.top = `${triggerTop}px`
		trigger.style.right = "0px"
		trigger.style.color = "red"
		document.querySelector("body").appendChild(trigger)
	}
}