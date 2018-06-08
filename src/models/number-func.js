import Func from './func'

export default class NumberFunc extends Func {
    constructor() {
        super('number')
        this.value = 0
    }
    eval() {
        return this.value
    }
}
