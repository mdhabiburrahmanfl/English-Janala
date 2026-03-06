// This function creates HTML span buttons from an array
// Example: ["good","nice"] -> <span>good</span><span>nice</span>
const createElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`) // loop array and create span
    return htmlElements.join(""); // join all spans into one string
}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}


// This function controls the spinner (loading indicator)
const manageSpinner = (status) => {

    // If status is true → show spinner and hide words
    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("wordContainer").classList.add("hidden");

    }
    // If status is false → hide spinner and show words
    else {
        document.getElementById("wordContainer").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}


// This function loads all lessons from API
const loadLesson = () => {

    const url = "https://openapi.programming-hero.com/api/levels/all"

    fetch(url) // request API
        .then(res => res.json()) // convert response to JSON
        .then((json) => displayLesson(json.data)) // send lesson data to display function

}


// This function removes active class from all lesson buttons
const removeActive = () => {

    const lessonBtn = document.querySelectorAll(".lesson-btn") // select all lesson buttons

    // remove active class from each button
    lessonBtn.forEach(lesson => lesson.classList.remove("active"));
}


// This function loads words for a specific lesson level
const loadLevelWord = (id) => {

    manageSpinner(true); // show loading spinner

    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url)
        .then(res => res.json())
        .then((data) => {

            // select the clicked lesson button
            const clickBtn = document.getElementById(`lesson-btn-${id}`);

            removeActive(); // remove active class from others

            clickBtn.classList.add("active") // make clicked button active

            displayLevelWord(data.data) // display words of that level
        });
}


// This function loads details of a specific word using async/await
const loadWordDetail = async (id) => {

    const url = `https://openapi.programming-hero.com/api/word/${id}`

    const res = await fetch(url); // fetch API
    const details = await res.json(); // convert to JSON

    displayWordDetails(details.data); // send data to display function
}



// Example API response structure (word details)
/*
{
"status": true,
"message": "successfully fetched a word details",
"data": {
"word": "Eager",
"meaning": "আগ্রহী",
"pronunciation": "ইগার",
"level": 1,
"sentence": "The kids were eager to open their gifts.",
"points": 1,
"partsOfSpeech": "adjective",
"synonyms": [
"enthusiastic",
"excited",
"keen"
],
"id": 5
}
}
*/


// This function shows word details inside a modal
const displayWordDetails = (word) => {

    const detailsBox = document.getElementById("details-container")

    // Create modal content using template string
    detailsBox.innerHTML = `
    <div>
        <h2 class="text-2xl font-bold mb-2">${word.word} ( <i class="fa-solid fa-microphone-lines"></i> : ${word.meaning})</h2>
    </div>
    <div>
        <h2 class="text-2xl mb-2">${word.word}</h2>
        <p class="bangla-font">${word.meaning}</p>
    </div>
    <div>
        <h2 class="text-2xl mb-2">Example:</h2>
        <p class="bangla-font">${word.sentence}</p>
    </div>
    <div>
        <h5 class="bangla-font text-2xl mb-2">Synonyms:</h5>
        <div> ${createElements(word.synonyms)} </div>
    </div>
    
    `

    // open modal
    document.getElementById("word_modal").showModal();
}



// This function displays words of a selected lesson
const displayLevelWord = (words) => {

    const wordContainer = document.getElementById("wordContainer");

    wordContainer.innerHTML = ""; // clear previous words

    // If no words found
    if (words.length === 0) {

        wordContainer.innerHTML = `
            <div class="empty-lesson text-center mt-10 h-80 justify-center bg-[#F8F8F890] flex flex-col col-span-full">
                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                <p class="bangla-font text-[12px]  text-[#5c5652] mb-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="bangla-font font-medium text-xl/8 md:text-3xl/10">নেক্সট Lesson এ যান।</h2>
            </div>
            `

        manageSpinner(false) // hide spinner
        return;
    }


    // Loop through each word
    words.forEach((word) => {

        const createDiv = document.createElement("div")

        // create card for each word
        createDiv.innerHTML = `
            <div class="bg-white rounded-xl py-8 px-5 text-center shadow-sm space-y-8 h-[326px]">
            <h2 class="font-bold text-3xl/6">${word.word ? word.word : " word টি নাই "}</h2>
            <p class=" text-xl/6 ">Meaning/Pronounciation</p>
            <p class="bangla-font font-semibold text-3xl">"${word.meaning ? word.meaning : "পাওয়া যাইনি"} / ${word.pronunciation ? word.pronunciation : "শব্দ পাওয়া যাইনি "}"</p>

                <div  class="flex justify-between items-center ">

                    <!-- button for word details -->
                    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>

                    <!-- button for sound -->
                    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>

                </div>
            </div>
            `;

        wordContainer.append(createDiv); // add card to container
    });

    manageSpinner(false); // hide spinner after loading
}



// This function displays lesson buttons
const displayLesson = (lessons) => {

    const lessonContainer = document.getElementById("lesson-container");

    lessonContainer.innerHTML = ""; // clear previous lessons

    lessons.forEach((lesson) => {

        const btnDiv = document.createElement("div")

        btnDiv.innerHTML = `
            <button 
                id="lesson-btn-${lesson.level_no}" 
                onclick="loadLevelWord(${lesson.level_no})" 
                class=" btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `

        lessonContainer.append(btnDiv); // add lesson button
    });
};


// load lessons when page loads
loadLesson();



// Search button event
document.getElementById("search-btn").addEventListener("click", () => {

    removeActive(); // remove active lesson button

    const input = document.getElementById("search-input");

    const searchValue = input.value.trim().toLowerCase(); // get search text

    console.log(searchValue); // print search text


    // fetch all words from API
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then((res) => res.json())

        .then((data) => {

            const allWords = data.data; // get all words

            // filter words that include search text
            const filterWords = allWords.filter((word) =>
                word.word.toLowerCase().includes(searchValue)
            );

            // display filtered words
            displayLevelWord(filterWords)

        });

});