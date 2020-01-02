class UserController{
    constructor(formId, tableId, fields){
        this.formEl = document.getElementById(formId)
        this.fields = fields
        this.tableEl = document.getElementById(tableId)

        this.onSubmit()
    }

    onSubmit(){

        this.formEl.addEventListener('submit', event => {
            
            event.preventDefault()
            
            let btn = this.formEl.querySelector('[type=submit]')

            btn.disabled = true

            let values = this.getValues()

            if (!values) {
                btn.disabled = false
                return false
            }

            this.addLine(values)

            console.log(values)

            this.formEl.reset()

            btn.disabled = false
        })        
    }

    getPhoto(){

        let fileReader = new FileReader()

        console.log(this.fields, typeof [...this.fields])

        let elements = [...this.fields].filter(item => {

            console(item)
            if (item.name === 'Photo'){
                return item
            }
        })

        fileReader.onload = () =>{

        }

        fileReader.readAsDataURL()
    }

    getValues(){

        let user = {}

        let isValid = true

        this.fields.forEach(function (field, index) {

            if (['name', 'email', 'password'].indexOf(field.name) > -1 && !field.value){
                field.parentElement.classList.add('has-error')
                isValid = false
            }

            

            if (field.name == 'gender'){
        
                if (field.checked) {
                    user[field.name] = field.value
                }
        
            } else if (field.name == 'admin'){
                user[field.name] = field.checked

            } else {
                user[field.name] = field.value
            }
        
        })

        if (!isValid) {
            return false
        }

        return new User(
            user.name,
            user.gender,
            user.birth,
            user.country,
            user.email,
            user.password,
            user.photo,
            user.admin
        )

     
    }

    addLine(user){

        let tr = document.createElement('tr')

        tr.dataset.user = user
    
        tr.innerHTML = `
                <tr>
                    <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${(user.admin) ? 'Sim' : 'Não'}</td>
                    <td>${Utils.dateFormat(user.register)}</td>
                    <td>
                        <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                        <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
                    </td>
                </tr>
        `
        this.tableEl.appendChild(tr)

        this.updateCount()
    
    }
    
    updateCount(){
        let numberUsers = 13
        let numberAdmin = 2

       document.querySelector('#number-users').innerHTML = numberUsers
       document.querySelector('#number-users-admin').innerHTML = numberAdmin
    }

}