import React from 'react'
import { scoreToolkit } from '../Verovio'
import { Spinner } from 'react-bootstrap'
import EventEmitter from '../EventEmitter'
import AccidentalsModal from './AccidentalsModal'
import FacsimileModal from './FacsimileModal'
import StavesModal from './StavesModal'
import './Score.css'

class Score extends React.Component {
  state = {
    svg: null
  }

  constructor(props) {
    super(props)
    this.scoreViewRef = React.createRef(null)
  }

  async componentDidMount() {
    const meiData = await fetch(`/data/${this.props.mei}`).then(response => response.text())

    scoreToolkit.setOptions({
      svgViewBox: true,
      adjustPageHeight: true,
      pageHeight: 60000,
      footer: 'none'
    })
    scoreToolkit.loadData(meiData)

    this.setState({
      meiData,
      svg: scoreToolkit.renderToSVG(1, {})
    })
  }


  componentDidUpdate() {
    if (document.getElementById('score-view')) {
      EventEmitter.dispatch('scoreIsReady', this.scoreViewRef)
    } else {
      console.error('This should not happen')
    }
  }

  render() {
    return (
      <>
        <div className='options'>
          <AccidentalsModal />
          <FacsimileModal />
          <StavesModal />
        </div>

        <div>
          {
            this.state.svg
             ? <div ref={this.scoreViewRef} id='score-view' dangerouslySetInnerHTML={{__html: this.state.svg}}/>
             : <Spinner animation='grow'/>
          }
        </div>
      </>
    )
  }
}

export default Score;