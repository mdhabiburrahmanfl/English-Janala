const loadLesson = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all"
    fetch(url)
        .then(res => res.json())
        .then((json) => displayLesson(json.data))

}
const displayLesson = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    lessons.forEach((lesson) => {
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
                    <button  class=" btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                    </button>
        `
        lessonContainer.append(btnDiv);
    });
}
loadLesson()
