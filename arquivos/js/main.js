
const KEY = "key=efb519ffa3e047cebdba546fdcfd63d2"
const url = `https://api.rawg.io/api`

const body = document.querySelector("body")

const modal_container          = document.querySelector("#modal-container")
const modal                    = document.querySelector("#modal")
const close_modal              = document.querySelector("#close-modal")
const modal_game_platforms     = document.querySelector("#game-platforms")
const modal_game_name          = document.querySelector("#game-name")
const modal_game_background    = document.querySelector("#modal-game-background")
const modal_game_public_rating = document.querySelector("#game-public-rating")
const modal_game_release_date  = document.querySelector("#game-release-date")
const modal_game_rating        = document.querySelector("#game-rating")
const modal_game_description   = document.querySelector("#game-description")
const modal_game_genres        = document.querySelector("#game-genres")

const games_carrousel  = document.querySelectorAll(".games-carrousel")
const games            = document.querySelectorAll(".games")

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
	removeUI("modal-container", "animate__fadeOut")
	body.classList.remove("overflow-hidden")

	modal_game_platforms.innerHTML = ""
	modal_game_background.src = ""
	modal_game_genres.innerHTML = ""
})

const gamesArray = []

function fetchGames(){
	fetch(`${url}/games?${KEY}&page_size=6`).then(response => response.json())
		.then(data => {
			setGames(data.results)
		})
}
fetchGames()

function setGames(games){
	const element = document.querySelectorAll(".games[data-games=popular]")

	games.forEach((game, index) => {
		const banner = element[index].children[1]
		element[index].dataset.gameId = game.id
		banner.innerHTML = `<img src="${game.background_image}" alt="${game.name}">`

		element[index].addEventListener("click", findGame)
	})
}

function findGame(e){
	const gameId = e.target.offsetParent.dataset.gameId
	const game = gamesArray.find(g => g.id == gameId)

	if(game){
		setModal(game)
	}else{
		fetch(`${url}/games/${gameId}?${KEY}`).then(response => response.json())
			.then(data => {
				setModal(data)
				gamesArray.push(data)
			})
	}
	
}

function setModal(game){
	console.log(game)
	showUI("modal-container", "animate__fadeIn")
}

// const getRDR2 = () => {
// 	const redead = fetch(`${url}&search=red-dead-redemption-2`).then(response => response.json())
// 	.then(data => console.log(data))
// }

// const getGames = async (search, genre, count) => {
// 	const genres = genre ? `&genres=${genre}&` : "&"

// 	const gamesFetched = await fetch(
// 		`${url}${genres}page_size=${count}&page=3`
// 	)
// 	.then(response => response.json()).then(data => data.results)

// 	for(index in gamesFetched){
// 		games_array.push(gamesFetched[index])		
// 	}
// 	return gamesFetched
// }

// const setGames = async (carrousel_item, genre, count) => {
// 	const games = await getGames(genre, count)

// 	for(i = 0; i < carrousel_item.length; i++){
// 		const {name, background_image} = games[i]

// 		carrousel_item[i].dataset.name = name
// 		carrousel_item[i].children[1].innerHTML = `<img src="${background_image}" alt="${name}">`
// 		carrousel_item[i].addEventListener("click", setModalInfo)
// 	}
// }

// function setModalInfo(e){
// 	modal_container.classList.add("flex")
// 	modal_container.classList.remove("hidden")
// 	body.classList.add("overflow-hidden")

// 	const {
// 		name,
// 		platforms,
// 		esrb_rating,
// 		ratings,
// 		genres, 
// 		short_screenshots,
// 		released
// 	} = games_array.find(game => game.name == e.target.offsetParent.dataset.name)

// 	modal_game_name.innerHTML = name
	
// 	platforms.forEach(({ platform }) => {
// 		switch(platform.id){
// 			case 1:
// 			case 14:
// 				modal_game_platforms.innerHTML += `<i class="fa-brands fa-xbox text-white mx-1"></i>`
// 				break
// 			case 3:
// 			case 5:
// 				modal_game_platforms.innerHTML += `<i class="fa-brands fa-apple text-white mx-1"></i>`
// 				break
// 			case 4:
// 				modal_game_platforms.innerHTML += `<i class="fa-brands fa-windows text-white mx-1"></i>`
// 				break
// 			case 6:
// 				modal_game_platforms.innerHTML += `<i class="fa-brands fa-linux text-white mx-1"></i>`
// 				break
// 			case 16:
// 			case 18:
// 			case 19:
// 				modal_game_platforms.innerHTML += `<i class="fa-brands fa-playstation text-white mx-1"></i>`
// 				break
// 			case 21:
// 				modal_game_platforms.innerHTML += `<i class="fa-brands fa-android text-white mx-1"></i>`
// 				break
// 		}
// 	})

// 	const randomIndex = Math.floor(Math.random() * short_screenshots.length - 0)
// 	modal_game_background.src = short_screenshots[randomIndex].image

// 	const gameReleaseDate = new Date(released).getFullYear()
// 	modal_game_release_date.innerHTML = gameReleaseDate

// 	modal_game_rating.innerHTML = esrb_rating ? esrb_rating.name : "Não classificado"
// 	modal_game_rating.style.background = "#a18257"
// 	if(esrb_rating){
// 		switch(esrb_rating.id){
// 			case 1:
// 			case 2:
// 				modal_game_rating.style.background = "rgb(22 101 52)"
// 				break
// 			case 3:
// 				modal_game_rating.style.background = "rgb(133 77 14)"
// 				break
// 			case 4:
// 				modal_game_rating.style.background = "rgb(153 27 27)"
// 				break
// 		}
// 	}

// 	const higherRating = ratings.reduce((acc, rating) => acc.count > rating.count ? acc : rating, {})
// 	modal_game_public_rating.innerHTML = higherRating ? higherRating.title : "Sem avaliações"
// 	modal_game_public_rating.style.color = "white"
// 	switch(higherRating.id){
// 		case 1:
// 		case 3:
// 			modal_game_public_rating.style.color = "#ba6829"
// 			break
// 		case 2:
// 		case 4:
// 		case 5:
// 			modal_game_public_rating.style.color = "#0b9616"
// 			break
// 	}

// 	const genre = genres.map(({ name }) => ` ${name}`)
// 	modal_game_genres.innerHTML = genre
// }

// search_btn.addEventListener("click", () => {
// 	search_input.focus()
// 	search_container.classList.remove("border-transparent", "w-7", "bg-transparent")
// 	search_container.classList.add("border-white", "w-72", "bg-neutral-700")
// })

// search_input.addEventListener("focusout", () => {
// 	search_container.classList.add("border-transparent", "w-7", "bg-transparent")
// 	search_container.classList.remove("border-white", "w-72", "bg-neutral-700")
// })

// setGames(popular_games, "", 6)

// scrollTrigger({
// 	selector: "#play-again-carrousel",
// 	offeset: 700,
// 	execute: () => setGames(play_again_games, "indie", 6),
// 	// viewTrigger: true
// })

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
