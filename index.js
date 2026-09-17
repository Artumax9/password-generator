
export function generatePasswords(length = 12) {
  if (typeof length !== "number" || Number.isNaN(length)) {
    throw new Error("Length must be a number")
  }
  if (length < 8 || length > 20) {
    throw new Error("Length must be between 8 and 20")
  }
  // Generate a random password of the specified length
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const symbols = "!@#$%^&*()_+={}|:;<>.?/-"
  const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+={}|:;<>.?/-"
  let password = ""
  password += upperCase.charAt(Math.floor(Math.random() * upperCase.length))
  password += symbols.charAt(Math.floor(Math.random() * symbols.length))
  for (let i = 0; i < length - 2; i++) {
    password += allChars.charAt(Math.floor(Math.random() * allChars.length)) // Add a random character from the characters string
  }
  let passwordArray = password.split("")
  passwordArray = shuffleArray(passwordArray)
  password = passwordArray.join("")
  return password

}

export function shuffleArray(passwordArray) {
  // Empezamos desde el último elemento y vamos hacia atrás
  for (let i = passwordArray.length - 1; i > 0; i--) {

    // Elegimos un índice al azar desde el 0 hasta el valor de i
    let j = Math.floor(Math.random() * (i + 1));

    // Intercambiamos el elemento en la posición i con el de la posición j
    let temporary = passwordArray[i];
    passwordArray[i] = passwordArray[j];
    passwordArray[j] = temporary;
  }

  return passwordArray;
}

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

function copyToClipboard(event) {

  const inputEl = event.target
  const passwordToCopy = inputEl.value

  if (!passwordToCopy || passwordToCopy == passwordCopiedMsg) return

  navigator.clipboard.writeText(passwordToCopy)
    .then(() => {
      event.target.value = passwordCopiedMsg

      setTimeout(() => {
        inputEl.value = passwordToCopy
      }, 1200)

    })

    .catch((error) => {
      console.log("Error while attempting to copy the password: ", error)
    }
    )

}

passOneEl.addEventListener("click", copyToClipboard)
passTwoEl.addEventListener("click", copyToClipboard)

