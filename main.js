class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos()
    }
    // Método que captura o evento submit
    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }
    // Método que envia o formulário
    handleSubmit(e) {
        e.preventDefault()
        const camposValidos = this.camposSaoValidos()
        const senhasValidas = this.senhasSaoValidas()
        // Se os campos e as senhas são validos o formulário é enviado
        if (camposValidos && senhasValidas) {
            alert("Formulário enviado.")
            this.formulario.submit()
        }
    }
    // Método que checa se as senhas são válidas
    senhasSaoValidas() {
        let valido = true
        // Armazena os campos senha e repetir senha em duas variáveis
        const senha = this.formulario.querySelector('.senha')
        const repetirSenha = this.formulario.querySelector('.repetir_senha')
        // Checa se a senha tem entre 6 e 12 digitos
        if (senha.value.length < 6 || senha.value.length > 12) {
            valido = false
            this.criaErro(senha, "A senha precisam ter entre 6 e 12 digitos.")
        }
        // Checa se a senha é igual a senha repetida
        if (senha.value !== repetirSenha.value) {
            valido = false
            this.criaErro(senha, "As senhas precisam ser iguais.")
            this.criaErro(repetirSenha, "As senhas precisam ser iguais.")
        }
        return valido
    }
    // Método que checa se os campos são válidos
    camposSaoValidos() {
        let valido = true
        // Impede que apareça mensagens de erros repetidas
        for (let mesagemDeErro of this.formulario.querySelectorAll('.mensagem_de_erro')) {
            mesagemDeErro.remove()
        }
        // Faz um loop com os campos de texto
        for (let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText
            // Se os campos de textos ou senhas estiverem vazios exibe uma mensagem de erro
            if (!campo.value) {
                this.criaErro(campo, `Preencha o campo "${label}".`)
                valido = false
            }
            // Chama um método para validar o CPF
            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) {
                    valido = false
                }
            }
            // Chama um método para validar o usuário
            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) {
                    valido = false
                }
            }
        }
        return valido
    }
    // Método que valida o usuário
    validaUsuario(campo) {
        const usuario = campo.value
        let valido = true
        // Se o usuário não tiver entre 3 a 12 caracteres exibe uma mensagem de erro
        if (usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, "O usuário deve ter de 3 a 12 caracteres.")
            valido = false
        }
        // Checa se foi digitado apenas letras e números no usuário e se não foi exibe uma mensagem de erro
        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, "O nome de usuário precisa ter apenas letras ou/e números.")
            valido = false
        }
        return true
    }
    // Método que valida o CPF
    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value)
        // Checa se o número do CPF é válido
        if (!cpf.valida()) {
            this.criaErro(campo, "CPF inválido.")
            return false
        } else {
            return true
        }
    }
    // Método que cria uma mensagem de erro
    criaErro(campo, mensagem) {
        const div = document.createElement('div')
        div.innerHTML = mensagem
        div.classList.add('mensagem_de_erro')
        campo.insertAdjacentElement('afterend', div)
    }
}

const valida = new ValidaFormulario()