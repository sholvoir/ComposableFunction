import Func from './func'

export default class SubFunc extends Func {
    constructor() {
        super('sub', 2)
    }
    eval() {
        let res = this.params[0].eval()
        for (let i = 1; i < this.length; i++) {
            res -= this.params[i].eval()
        }
        return res
    }
}