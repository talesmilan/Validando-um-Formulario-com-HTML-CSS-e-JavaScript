class ValidaCPF {
    // Construtor
    constructor(cpfRecebido) {
        // Transforma o número da string do CPF em uma string de apenas números
        this.cpfLimpo = cpfRecebido.replace(/\D+/g, '')
    }
    valida() {
        // Checa se o CPF tem 11 digitos
        if(this.cpfLimpo.length !== 11) return false
        // Usa um método para checar se o número do CPF é uma sequencia
        if(this.eSequencia()) return false
        // Armazena em uma variável o número do CPF sem os dois últimos digitos
        const cpfParcial = this.cpfLimpo.slice(0, -2)
        // Usa um método cria digito para criar o penúltimo e último digito
        const penultimoDigito = this.criaDigito(cpfParcial)
        const ultimoDigito = this.criaDigito(cpfParcial + penultimoDigito)
        // Junta os números novamente
        const novoCpf = cpfParcial + penultimoDigito + ultimoDigito
        // Compara se o número do CPF é igual ao resultado
        return novoCpf === this.cpfLimpo
    }
    // Método que cria o último e penúltimo digito
    criaDigito(cpfParcial) {
        const cpfArray = Array.from(cpfParcial);
        // Faz o cálculo necessário para criar os digitos
        let contagemRegressiva = cpfArray.length + 1;
        const total = cpfArray.reduce((acumulador, valor) => {
          acumulador += (contagemRegressiva * Number(valor));
          contagemRegressiva--;
          return acumulador;
        }, 0);
        const digito = 11 - (total % 11);
        // Se o digito for maior que 9 ele será 0
        return digito > 9 ? '0' : String(digito);
      };
    // Método que checa se o CPF é uma sequencia
    eSequencia() {
        const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
        return sequencia === this.cpfLimpo;
    }
}
