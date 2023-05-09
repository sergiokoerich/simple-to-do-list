const localStorageKey = 'window.localStorage'

function validateIfExistNewTask()
{
    let values     = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let exists     = values.find(x => x.name == inputValue)
    return !exists ? false : true
}


function newTask ()
{
    let input = document.getElementById('input-new-task')
    input.style.border = ''

    //validation
    if(!input.value)
    {
        input.style.border = '2px solid rgb(255, 8, 0)'
        alert('Type something to add to your list')
    }
    else if(validateIfExistNewTask())
    {
        alert('A task with the same name already exists, please enter a valid task')
    }
    else
    {
        //increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function showValues ()
    {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        let list = document.getElementById('to-do-list')
        list.innerHTML = ''
        for(let i = 0; i < values.length; i++)
        {
            list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16"><path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/></svg></button></li>`
        }
    }

function removeItem(data)
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
}

showValues()


