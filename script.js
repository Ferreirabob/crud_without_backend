const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sName = document.querySelector('#m-name')
const sPhone = document.querySelector('#m-phone')
const sMail = document.querySelector('#m-mail')
const btnSave = document.querySelector('#btnSave')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sName.value = itens[index].name
    sPhone.value = itens[index].phone
    sMail.value = itens[index].mail
    id = index
  } else {
    sName.value = ''
    sPhone.value = ''
    sMail.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.phone}</td>
    <td>${item.mail}</td>
    <td class="action">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="action">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSave.onclick = e => {
  
  if (sName.value == '' || sPhone.value == '' || sMail.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].name = sName.value
    itens[id].phone = sPhone.value
    itens[id].mail = sMail.value
  } else {
    itens.push({'name': sName.value, 'phone': sPhone.value, 'mail': sMail.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
