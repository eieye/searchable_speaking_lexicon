// MON 13-MAR-23
// PLAIN AUDIO PLAYBACK





/*
function playAudio(src) {

	const audioElement = new Audio(src);

// 	audioElement.addEventListener("loadeddata", () => {
//   	let duration = audioElement.duration;
// 	});
// 	audioElement.addEventListener("click", (e) => {
// 		console.log(e);
// 		console.log(`ALT KEY: ${e.altKey}`);
// 	});

	console.log(audioElement);

	audioElement.play();

}
*/



// FRI 17-MAR-23
// CHECK IF PLAYBACKRATE CAN BE SET	


function playAudio(src) {

	const audioElement = new Audio(src);

// 	audioElement.addEventListener("loadeddata", () => {
//   	let duration = audioElement.duration;
// 	});
// 	audioElement.addEventListener("click", (e) => {
// 		console.log(e);
// 		console.log(`ALT KEY: ${e.altKey}`);
// 	});

	console.log(audioElement);
	audioElement.playbackRate = 1;

	audioElement.play();

}