
const KEY = "efb519ffa3e047cebdba546fdcfd63d2"
const url = `https://api.rawg.io/api/games?key=${KEY}`

const body = document.querySelector("body")

const modal_container = document.querySelector("#modal-container")
const modal = document.querySelector("#modal")
const close_modal = document.querySelector("#close-modal")
const modal_game_platforms = document.querySelector("#game-platforms")
const modal_game_name = document.querySelector("#game-name")
const modal_game_background = document.querySelector("#modal-game-background")
const modal_game_release_date = document.querySelector("#game-release-date")
const modal_game_rating = document.querySelector("#game-rating")
const modal_game_description = document.querySelector("#game-description")

const games_carrousel  = document.querySelectorAll(".games-carrousel")
const games  = document.querySelectorAll(".games")

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

close_modal.addEventListener("click", () => {
	modal_container.classList.add("hidden")
	modal_container.classList.remove("flex")
	body.classList.add("overflow-auto")
	body.classList.remove("overflow-hidden")
})

games.forEach(game => {
	game.addEventListener("click", () => {
		if(game.dataset.name){
			const d_div = games_array.find(g => g.name == game.dataset.name)
			modal_container.classList.add("flex")
			modal_container.classList.remove("hidden")
			body.classList.add("overflow-hidden")
			body.classList.remove("overflow-auto")

			modal_game_name.innerHTML = d_div.name
			modal_game_platforms.innerHTML = ""
			d_div.platforms.forEach(p => {
				modal_game_platforms.innerHTML += `<p class="text-white mx-1">${p.platform.name}</p>`
			})
			modal_game_background.src = d_div.short_screenshots[1].image
			const date = new Date(d_div.released)
			modal_game_release_date.innerHTML = date.getFullYear()
			modal_game_rating.innerHTML = d_div.esrb_rating ? d_div.esrb_rating.name : "Não classificado"
			modal_game_rating.style.background = "#a18257"
			switch(d_div.esrb_rating.id){
				case 1:
				case 2:
					modal_game_rating.style.background = "rgb(22 101 52)"
					break
				case 3:
					modal_game_rating.style.background = "rgb(133 77 14)"
					break
				case 4:
					modal_game_rating.style.background = "rgb(153 27 27)"
					break
			}
		}
	})
})

const games_array = []

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
		carrousel_item[i].dataset.name = `${games[i].name}`
		carrousel_item[i].children[1].innerHTML = `<img src="${games[i].background_image}" alt="${games[i].name}">`
		games_array.push(games[i])
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

// scrollTrigger({
// 	selector: "#action-carrousel",
// 	offeset: 600,
// 	execute: () => setGames(action_games, "action", 6),
// 	// viewTrigger: true
// })

// scrollTrigger({
// 	selector: "#adventure-carrousel",
// 	offeset: 500,
// 	execute: () => setGames(adventure_games, "adventure", 6),
// 	// viewTrigger: true
// })
