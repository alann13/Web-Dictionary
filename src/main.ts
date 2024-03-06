import './style.css'

window.addEventListener('DOMContentLoaded', () => {
  const dictionaryApi = 'https://api.dictionaryapi.dev/api/v2/entries/en'

  const formElement = document.querySelector<HTMLFormElement>('#form-sender')
  const contentSection = document.getElementById('content-section')

  formElement?.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(formElement)
    const searchedWord = formData.get('word-input')

    try {
      const response = await fetch(`${dictionaryApi}/${searchedWord}`)
      const data = await response.json()

      if (!data.length) {
        const emojiCtn = document.createElement('div')
        const h2 = document.createElement('h2')
        const p = document.createElement('p')

        emojiCtn.textContent = '😕'
        h2.textContent = data.title
        p.textContent = `${data.message}${data.resolution}`

        contentSection?.replaceChildren(emojiCtn, h2, p)
      } else {
        const [wordInfo] = data
        const h2 = document.createElement('h2')

        h2.textContent = wordInfo.word

        console.log(wordInfo)
        contentSection?.replaceChildren(h2)
      }
    } catch (error) {
      console.log('error', error)
    }
  })

  console.log('we up')
})
