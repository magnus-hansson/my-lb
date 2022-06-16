const signal = AbortSignal.timeout(43300)
const url = 'https://jsonplaceholder.typicode.com/todos/1'

const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3'
]

const fetchTodo = async (attempt) => {
  try {
    console.log(urls[attempt])
    const response = await fetch(urls[attempt], {
      signal
    })
    const todo = await response.json()

    return todo
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Operation timed out')

      if (attempt + 1 < urls.length) {
        return await fetchTodo(attempt + 1)
      } else {
        throw new Error('Operation timed out')
      }
    } else {
      console.error(error)
      throw new Error(error)
    }
  }
}
const main = async () => {
  let i = 0

  try {
    const res = await fetchTodo(i)
    console.log(res)
  } catch (err) {
    console.debug(err)
  }
}
main()
