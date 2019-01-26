import React from 'react'
import {create as FuncCreate} from '../../models/funcs'
import NumberFunc from '../../models/number-func'

class Func extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: props.func.value}
        this.handleChange = this.handleChange.bind(this)
        this.handleDrop = this.handleDrop.bind(this)
        this.handleDragOver = this.handleDragOver.bind(this)
        this.handleDoubleClick = this.handleDoubleClick.bind(this)
    }
    handleDoubleClick(event) {
        event.preventDefault()
        let index = event.target.getAttribute('paramindex')
        this.props.func.params[index] = new NumberFunc()
        this.forceUpdate()
    }
    handleChange(event) {
        try {
            this.props.func.value = parseFloat(event.target.value)
            this.setState({value: this.props.func.value})
        } catch(error) {
            console.error(error)
        }
    }
    handleDrop(event) {
        event.preventDefault()
        let index = event.target.getAttribute('paramindex')
        let typeName = event.dataTransfer.getData('type')
        this.props.func.params[index] = FuncCreate(typeName)
        this.forceUpdate()
    }
    handleDragOver(event) {
        event.preventDefault()
    }
    render() {
        let {func} = this.props
        switch (func.name) {
            case 'number':
                return <input type="text" className="number" onChange={this.handleChange} value={this.state.value} autoFocus />
            case 'thatis':
                let subc = func.params[0]
                if (subc) {
                    return <div className="thatis"><Func func={subc} key={Math.random()}/></div>
                } else {
                    return <div className="thatis">
                        <div className="placeHolder" onDrop={this.handleDrop} onDragOver={this.handleDragOver} onDoubleClick={this.handleDoubleClick} paramindex={0} key={Math.random()}></div>
                    </div>
                }
            default:
                let subcomponents = []
                for (let i = 0; i < func.length; i++) {
                    let subc = func.params[i]
                    if (subc) {
                        subcomponents.push(<Func func={subc} key={Math.random()}/>)
                    } else {
                        subcomponents.push(<div className="placeHolder" onDrop={this.handleDrop} onDragOver={this.handleDragOver} onDoubleClick={this.handleDoubleClick} paramindex={i} key={Math.random()}></div>)
                    }
                    if (i < func.length - 1) {
                        subcomponents.push(', ')
                    }
                }
                return <div className="func">{func.name}({subcomponents})</div>
        }
    }
}

export default Func