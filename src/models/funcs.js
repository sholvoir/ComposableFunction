import add from './add-func'
import sub from './sub-func'
import mul from './mul-func'
import div from './div-func'

const factory = { add, sub, mul, div }

export const create =  typeName => {
    let cons = factory[typeName]
    if (cons) return new cons()
    else return null
}

export const list = factory