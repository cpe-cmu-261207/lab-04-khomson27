let mdiv = document.createElement('div')
mdiv.classList.add('mdiv')

let countdone = 0
let arr = []
let size = 0

if (localStorage.length == 0) localStorage.setItem('datas', JSON.stringify(arr))

const input = document.querySelector('input')
input.addEventListener('keyup', (enter) => {
    if(enter.keyCode === 13) Clickaddtask()  
})

const Clickaddtask = () => {
    let value = document.querySelector('input').value

    if (value == '') alert("Task cannot be empty.")
    else {
        let objectvalue = {content: value, status: 'yet'}
        arr.push(objectvalue)
        localStorage.setItem('datas', JSON.stringify(arr))
        countdone = 0
        restate()
        showdata()
    }
}

function restate () {
    const re = document.querySelector('.mdiv')
    if (re != null) re.remove()
    mdiv = document.createElement('div')
    mdiv.classList.add('mdiv')
    document.getElementById("sack").appendChild(mdiv)
    arr = JSON.parse(localStorage.getItem('datas'))
    size = arr.length
}

function showdata() {
    document.getElementById("sack").appendChild(mdiv)
    arr = JSON.parse(localStorage.getItem('datas'))
    size = arr.length

    for (let i=size-1;i>=0;i--) {
        const textspan = document.createElement('span')
        const mspan  = document.createElement('span')
        const deletebtn = document.createElement('button')
        const donebtn = document.createElement('button')
        let index

        deletebtn.classList.add('delbtn')
        deletebtn.innerHTML = "Delete"
        deletebtn.addEventListener('click', () =>{
            if (size === 1) {
                arr = []
                localStorage.setItem('datas', JSON.stringify(arr))
            }else{
                let stack = []
                for (let j=0;j<size;j++) 
                    if (j != index) stack.push(arr[j])
                arr = stack
                localStorage.setItem('datas', JSON.stringify(arr))
            }
            mdiv.removeChild(mspan)
            countdone = 0
            restate()
            showdata()
        })

        donebtn.classList.add('donbtn')
        donebtn.innerHTML = "Done"
        donebtn.addEventListener('click', () => {
            if (arr[index].status != 'done') {
                let stack = []
                let target = 0
                for (let j=0;j<size;j++) {    
                    if(j != countdone){
                        if (target === index) target++
                        stack[j] = arr[target++]
                    }else {
                        stack.push({content: arr[index].content, status: 'done'})
                    }
                }
                index = countdone
                arr = stack
                localStorage.setItem('datas', JSON.stringify(arr))
                countdone = 0
                restate()
                showdata()
            }
        })

        index  = i
        if (arr[i].status === 'done') countdone++
        if (arr[i].status === 'done') {
            mspan.classList.add('doneactive')
            donebtn.classList.remove('donbtn')
            donebtn.classList.add('donebtn')
            deletebtn.classList.remove('delbtn') 
            deletebtn.classList.add('donebtn')
        }
        textspan.classList.add('textspan')
        mspan.classList.add('mspan')
        textspan.append(arr[i].content)
        mspan.append(textspan)
        mspan.append(donebtn)
        mspan.append(deletebtn)
        mspan.append(document.createElement('br'))
        mdiv.append(mspan)
    }
    console.log('size = ' + size)
}
showdata()
