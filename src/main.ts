import {v4} from 'uuid'
import Toastify from 'toastify-js'

import "toastify-js/src/toastify.css"
import './style.css'

const taskForm = document.querySelector<HTMLFormElement>('#taskForm')
const tasksList = document.querySelector<HTMLDivElement>('#tasksList')

interface Task {
  id: string
  title: string 
  description: string
}

let tasks: Task[] = []

taskForm?.addEventListener('submit', e => {
  e.preventDefault()

  const title = taskForm['title'] as unknown as HTMLInputElement
  const description = taskForm['description'] as unknown as HTMLTextAreaElement

  tasks.push({
    title: title.value,
    description: description.value,
    id: v4()
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))

  Toastify({
    text: 'Tasks agregada',
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();

  renderTasks(tasks)

  taskForm.reset()
  title.focus()
})

document.addEventListener('DOMContentLoaded', () => {
  tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  renderTasks(tasks)
})

function renderTasks(tasks: Task[]) {

  tasksList!.innerHTML = ''

  tasks.forEach(task => {
    const taskElement = document.createElement('div')
    taskElement.className= 'bg-zinc-800 mb-1 p-4 rounded-lg hover:bg-zinc-600 hover:cursor-pointer'

    const header = document.createElement('header')
    header.className = 'flex justify-between'

    const description = document.createElement('p')
    description.innerHTML = task.description

    const title = document.createElement('span')
    title.innerHTML = task.title

    const btnDelete = document.createElement('button')
    btnDelete.className= 'bg-red-500 px-2 py-1 rounded-md'
    btnDelete.innerHTML = 'Delete'

    btnDelete.addEventListener('click', () => {
      const index = tasks.findIndex(t => t.id === task.id)
      tasks.splice(index, 1)
      localStorage.setItem('tasks', JSON.stringify(tasks))
      renderTasks(tasks)
    })

    header.append(title)
    header.append(description)
    header.append(btnDelete)


    taskElement.append(header)
    taskElement.append(description)
    tasksList?.append(taskElement)

    const id = document.createElement('p')
    id.innerText = task.id
    id.className = 'text-gray-400 text-xs'
  })
}
