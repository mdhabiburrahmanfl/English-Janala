const loadLesson = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
        .then(res => res.json())
        .then((json) => displayLesson(json.data))

}
const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn")
    // console.log(lessonBtn)
    lessonBtn.forEach(lesson => lesson.classList.remove("active"));
}

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            removeActive();
            clickBtn.classList.add("active")
            displayLevel(data.data)
        });
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url)
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details);
}
const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById("details-container")
    detailsBox.innerHTML = `Hi I am from js`
    document.getElementById("word_modal").showModal()
}

const displayLevel = (words) => {
    const wordContainer = document.getElementById("wordContainer");
    wordContainer.innerHTML = "";

    if (words.length === 0) {
        wordContainer.innerHTML = `
            <div class="empty-lesson text-center mt-10 h-80 justify-center bg-[#F8F8F890] flex flex-col col-span-full">
                <img class="mx-auto" src="./assets/alert-error.png" alt="">
                <p class="bangla-font text-[12px]  text-[#5c5652] mb-3">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="bangla-font font-medium text-xl/8 md:text-3xl/10">নেক্সট Lesson এ যান।</h2>
            </div>
            `
    }

    words.forEach((word) => {
        const createDiv = document.createElement("div")
        createDiv.innerHTML = `
            <div class="bg-white rounded-xl py-8 px-5 text-center shadow-sm space-y-8 h-[326px]">
            <h2 class="font-bold text-3xl/6">${word.word ? word.word : " word টি নাই "}</h2>
            <p class=" text-xl/6 ">Meaning/Pronounciation</p>
            <p class="bangla-font font-semibold text-3xl">"${word.meaning ? word.meaning : "পাওয়া যাইনি"} / ${word.pronunciation ? word.pronunciation : "শব্দ পাওয়া যাইনি "}"</p>
                <div  class="flex justify-between items-center ">
                    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
            `;
        wordContainer.append(createDiv);
    })
}
const displayLesson = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    lessons.forEach((lesson) => {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
                    <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class=" btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                    </button>
        `
        lessonContainer.append(btnDiv);
    });
};
loadLesson();
