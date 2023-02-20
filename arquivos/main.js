
const KEY = "efb519ffa3e047cebdba546fdcfd63d2"
const url = `https://api.rawg.io/api/games?key=${KEY}`

const games_carrousel  = document.querySelectorAll(".games-carrousel")
const popular_games    = document.querySelectorAll('[data-games="popular"]')
const play_again_games = document.querySelectorAll('[data-games="play-again"]')
const action_games     = document.querySelectorAll('[data-games="action"]')
const adventure_games  = document.querySelectorAll('[data-games="adventure"]')

const search_btn       = document.querySelector("#search-btn")
const search_container = document.querySelector("#search-container")
const search_input     = document.querySelector("#search-input")

games_carrousel.forEach(carrousel => {
	new ScrollBooster({
	  viewport: carrousel,
	  scrollMode: 'native',
	  direction: 'horizontal'
	});
})

search_btn.addEventListener("click", () => {
	search_input.focus()
	search_container.classList.remove("border-transparent", "w-7", "bg-transparent")
	search_container.classList.add("border-white", "w-72", "bg-neutral-700")
})

search_input.addEventListener("focusout", () => {
	search_container.classList.add("border-transparent", "w-7", "bg-transparent")
	search_container.classList.remove("border-white", "w-72", "bg-neutral-700")
})

function getGames(genre, count){
	const genres = genre ? `&genres=${genre}&` : "&"
	return fetch(`${url}${genres}page_size=${count}&page=3`)
			.then(response => response.json())
				.then(data => data.results)
}

async function setGames(carrousel_item, genre, count){
	const games = await getGames(genre, count)

	for(i = 0; i < carrousel_item.length; i++){
		carrousel_item[i].children[1].innerHTML = `<img src="${games[i].background_image}" alt="${games[i].name}">`
	}
}

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

setGames(popular_games, "", 6)

scrollTrigger({
	selector: "#play-again-carrousel",
	offeset: 700,
	execute: () => setGames(play_again_games, "indie", 6),
	// viewTrigger: true
})

scrollTrigger({
	selector: "#action-carrousel",
	offeset: 600,
	execute: () => setGames(action_games, "action", 6),
	// viewTrigger: true
})

scrollTrigger({
	selector: "#adventure-carrousel",
	offeset: 500,
	execute: () => setGames(adventure_games, "adventure", 6),
	// viewTrigger: true
})
