import React from 'react'
import {create as FuncCreate, list as FuncList} from '../../models/funcs'
import Func from '../FuncComponent'
import ThatIsFunc from '../../models/that-is-func'
import NumberFunc from '../../models/number-func'
import AddFunc from '../../models/add-func'

class Root extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasResult: false,
            result: ''
        }
        this.handleReset = this.handleReset.bind(this)
        this.handleRun = this.handleRun.bind(this)
        this.handleDrag = this.handleDrag.bind(this)
        this.thatis = new ThatIsFunc()
        this.funcIcons = []
        for (name in FuncList) {
            this.funcIcons.push(<img className="icon" src={require(`../../images/${name}.png`)} key={name} alt={name} onDragStart={this.handleDrag}/>)
        }
    }
    handleReset() {
        this.thatis = new ThatIsFunc()
        this.forceUpdate()
        this.setState({
            hasResult: false,
            result: ''
        })
    }
    handleRun() {
        try {
            let result = ' = ' + this.thatis.eval()
            this.setState({
                hasResult: true,
                result
            })
        } catch (error) {
            this.setState({
                hasResult: true,
                result: error.toString()
            })
        }
    }
    handleDrag(event) {
        event.dataTransfer.setData("type", event.target.alt)
    }
    render() {
        return <div>
            <div className="title">
                <button className="button" onClick={this.handleReset}>Reset</button>
                <button onClick={this.handleRun}>Run</button>
            </div>
            <Func func={this.thatis} />
            {this.state.hasResult && <div className="result">{this.state.result}</div>}
            <div>{this.funcIcons}</div>
        </div>
    }
}

export default Root