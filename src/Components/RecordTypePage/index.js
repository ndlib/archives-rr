import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Loading from 'Components/Shared/Loading'
import { recordTypesReady } from 'Store/storeReady'
import RecordTypeNav from './RecordTypeNav'
import RecordType from 'Components/Shared/RecordType'
import * as html2canvas from 'html2canvas'
import * as jsPDF from 'jspdf'
import LoadingOverlay from 'react-loading-overlay'

import './style.css'

class RecordTypePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isPrinting: false,
    }

    this.print = this.print.bind(this)
  }

  print (saveAll) {
    const canvasOptions = {
      width: 1210,
      windowWidth: Math.max(window.innerWidth, 1210), // Allows all text to be visible even if browser has to scroll
      windowHeight: Math.max(window.innerHeight, 900 * this.props.recordList.length),
    }
    const pdf = jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: 'letter',
      compress: true,
    })

    this.setState({
      isPrinting: true,
    })
    // Prevent scrolling by adding a special css class
    document.body.classList.add('noScroll')
    // Move to the top of screen. This is important so the canvas captures the right spot
    window.scrollTo(0, 0)

    const list = saveAll ? this.props.recordList : [this.props.recordType]
    // Add all of the pages to the pdf sequentially
    list.reduce((promiseChain, currentRecord) => {
      return promiseChain.then(() => {
        const input = document.getElementById(currentRecord.sys.id)
        return html2canvas(input, canvasOptions)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png')
            const heightFactor = canvas.height / canvas.width // Needed to maintain aspect ratio
            // Add a new page for every record after the first one
            if (currentRecord !== list[0]) {
              pdf.addPage()
            }
            pdf.addImage(imgData, 'PNG', 0.2, 0.2, 10.6, 11 * heightFactor - 0.4)
          })
      })
    }, Promise.resolve([])).then(() => {
      // Save the pdf now that all pages have been added
      pdf.save('download.pdf')

      document.body.classList.remove('noScroll')
      this.setState({
        isPrinting: false,
      })
    })
  }

  render () {
    if (this.props.isLoading) {
      return <Loading />
    }

    return (
      <div className='recordTypePage'>
        { !this.state.isPrinting && (
          <RecordTypeNav currentId={this.props.recordId} recordTypes={this.props.recordList} print={this.print} />
        )}
        { (this.state.isPrinting ? this.props.recordList : [this.props.recordType]).map(record => (
          <RecordType key={record.sys.id} recordType={record} />
        ))}
        <LoadingOverlay
          active={this.state.isPrinting}
          text='Saving to PDF...'
          spinner={<Loading />}
          className={'printingOverlay'}
          styles={{
            overlay: (base) => ({
              ...base,
              background: 'rgba(80, 80, 80, 0.5)',
            }),
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const isLoading = !recordTypesReady(state)
  const recordId = ownProps.match.params.id
  const recordList = isLoading ? [] : state.contentReducer.recordTypes.filter((rec) => {
    return rec.sys.id === recordId || rec.searchResults
  })
  const recordType = recordList.find(s => {
    return s.sys.id === recordId
  })

  return {
    isLoading: isLoading,
    recordId: recordId,
    recordList: recordList,
    recordType: recordType,
  }
}

export default withRouter(connect(mapStateToProps)(RecordTypePage))
