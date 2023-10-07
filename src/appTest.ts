import axios from 'axios'

export function hello() { 
    console.log('Sugeng Rawuh!')
} 

export async function fetchDummyTodos() { 
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        console.log(response.data.filter((data:any) => data.id <= 10))
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

export async function postDummyTodo(data: any) { 
    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data)
        console.log(response.data)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}