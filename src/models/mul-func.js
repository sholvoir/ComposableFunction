import Func from './func'

export default class MulFunc extends Func {
    constructor() {
        super('mul', 2)
    }
    eval() {
        let res = this.params[0].eval()
        for (let i = 1; i < this.length; i++) {
            res *= this.params[i].eval()
        }
        return res
    }
}