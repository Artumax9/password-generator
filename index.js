
function generatePasswords(length = 12) {
  if (typeof length !== "number") {
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
    console.log(password.length)
    console.log(password)
  }
  let passwordArray = password.split("")
  passwordArray = shuffleArray(passwordArray)
  password = passwordArray.join("")
  console.log(password)
  return password

}

function shuffleArray(passwordArray) {
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





generatebtn.addEventListener("click", function () {
  let passwordLength = parseInt(lengthInput.value)

  try {
    const newPasswordOne = generatePasswords(passwordLength)
    const newPasswordTwo = generatePasswords(passwordLength)
    passOneEl.value = newPasswordOne
    passTwoEl.value = newPasswordTwo
    console.log("Contraseña generada:", newPasswordOne)
    console.log("Contraseña generada:", newPasswordTwo)


  } catch (error) {
    console.log(error.message)

  }

})
