const secretTitle = document.getElementById("secretTitle")
const secretPage = document.getElementById("secretPage")
const backButton = document.getElementById("backButton")
const normalImage = document.getElementById("normalImage")
const normalImage2 = document.getElementById("normalImage2")
const normalLink = document.getElementById("normalLink")

secretTitle.addEventListener("click", function  () {
    document.body.classList.add("dark-mode")
   secretTitle.style.display = "none"
   document.querySelector("body > p").style.display = "none"
   normalLink.style.display = "none"
   normalImage.style.display = "none"
   normalImage2.style.display = "none"
   secretPage.style.display = "block"
})

backButton.addEventListener("click", function ()  {
    document.body.classList.remove("dark-mode")
    secretPage.style.display = "none"
    secretTitle.style.display = "block"
    document.querySelector("body > p").style.display = "block"
    normalImage2.style.display = "block"
    normalImage.style.display = "block"
    normalLink.style.display = "block"
})

const fileInput = document.getElementById("fileInput")
const fileList = document.getElementById("fileList")

const uploadedFiles = []

fileInput.addEventListener("change", function () {
    const file = fileInput.files[0]

    if (!file) {
        return
    }

    uploadedFiles.push({
        file: file, 
        addedAt: new Date()
    })

    uploadedFiles.sort(function (first, second) {
        return first.addedAt - second.addedAt
    })

    showFiles()
    fileInput.value = ""
})

function showFiles() {
    fileList.innerHTML = ""

    uploadedFiles.forEach(function (fileData) {
        const listItem = document.createElement("li")
        const downloadButton = document.createElement("button")
        const deleteButton = document.createElement("button")

        listItem.textContent =
            fileData.file.name + " - " +
            fileData.addedAt.toLocaleString() + " "

        downloadButton.textContent = "Ladda ner"
        deleteButton.textContent = "Radera"

        downloadButton.addEventListener("click", function () {
            const downloadLink = document.createElement("a")

            downloadLink.href = URL.createObjectURL(fileData.file)
            downloadLink.download = fileData.file.name
            downloadLink.click()

            URL.revokeObjectURL(downloadLink.href)
        })

        deleteButton.addEventListener("click", function () {
            const fileIndex = uploadedFiles.indexOf(fileData)

            uploadedFiles.splice(fileIndex, 1)
            showFiles()
        })

        listItem.appendChild(downloadButton)
        listItem.appendChild(deleteButton)
        fileList.appendChild(listItem)
    })
}