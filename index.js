import { generatePasswords } from "./src/generator.js"

const generatebtn = document.querySelector(".main-btn")
const lengthInput = document.getElementById("pass-length")
const passOneEl = document.getElementById("pass-1")
const passTwoEl = document.getElementById("pass-2")
const lengthErrorEl = document.getElementById("length-error")

generatebtn.addEventListener("click", function () {
  let passwordLength = parseInt(lengthInput.value)

  try {
    const newPasswordOne = generatePasswords(passwordLength)
    const newPasswordTwo = generatePasswords(passwordLength)
    passOneEl.value = newPasswordOne
    passTwoEl.value = newPasswordTwo
    lengthErrorEl.textContent = ""

  } catch (error) {
    lengthErrorEl.textContent = error.message
  }

})

const themeSelect = document.getElementById("theme-select")
const mainContainer = document.querySelector("main")

themeSelect.addEventListener("change", function (event) {
  const selectedOption = event.target.value

  if (selectedOption === "light-theme") {

    mainContainer.classList.add("light-theme")

  } else {
    mainContainer.classList.remove("light-theme")

  }

})

const passwordCopiedMsg = "Password copied! 📋"
const copyStatusEl = document.getElementById("copy-status")

function copyToClipboard(event) {

  const inputEl = event.target
  const passwordToCopy = inputEl.value

  if (!passwordToCopy || passwordToCopy == passwordCopiedMsg) return

  navigator.clipboard.writeText(passwordToCopy)
    .then(() => {
      inputEl.value = passwordCopiedMsg
      copyStatusEl.textContent = "Password copied to clipboard"

      setTimeout(() => {
        inputEl.value = passwordToCopy
      }, 1200)

    })

    .catch((error) => {
      copyStatusEl.textContent = "Could not copy the password"
      console.error("Error while attempting to copy the password: ", error)
    })

}

function handleCopyKeydown(event) {
  if (event.key === "Enter") {
    copyToClipboard(event)
  }
}

passOneEl.addEventListener("click", copyToClipboard)
passOneEl.addEventListener("keydown", handleCopyKeydown)
passTwoEl.addEventListener("click", copyToClipboard)
passTwoEl.addEventListener("keydown", handleCopyKeydown)
