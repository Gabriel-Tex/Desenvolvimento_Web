class CPFValidation {

    // =============== construtor ===============

    constructor(CPF) {
        Object.defineProperty(this, "cleanCPF", {
            writable: false,
            enumerable: true,
            configurable: false,
            value: CPF.replace(/\D+/g, "")
        });
    }

    // =============== verificando se é uma sequência ===============

    itsSequence() {
        return this.cleanCPF.charAt(0).repeat(11) === this.cleanCPF;
    }

    // =============== gerando novo CPF ===============
    
        CPFGenerator() {
        const CPFBody = this.cleanCPF.slice(0, -2);

        const firstDigit = CPFValidation.digitGenerator(CPFBody);
        const secondDigit = CPFValidation.digitGenerator(CPFBody + firstDigit);

        this.newCPF = CPFBody + firstDigit + secondDigit;
    }

    // =============== gerando novo dígito ===============

    static digitGenerator(CPFBody) {
        let total = 0;
        let reverse = CPFBody.length + 1;

        for (let char of CPFBody) {
            total += reverse * Number(char);
            --reverse;
        }

        const digit = 11 - (total % 11);

        return digit <= 9 ? String(digit) : '0';
    }

    valid() {
        if (!this.cleanCPF) return false;
        if (typeof this.cleanCPF !== 'string') return false;
        if (this.cleanCPF.length !== 11) return false;
        if (this.itsSequence()) return false;
        this.CPFGenerator();

        return this.newCPF === this.cleanCPF;
    }

}

