import Func from './func'

export default class ThatIsFunc extends Func {
    constructor() {
        super('thatis', 1)
    }
    eval() {
        return this.params[0].eval()
    }
}