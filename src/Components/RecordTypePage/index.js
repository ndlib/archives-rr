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
import PrintFooter from './PrintFooter'

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
        const footer = document.getElementById(`printFooter_${currentRecord.sys.id}`)
        return Promise.all([html2canvas(input, canvasOptions), html2canvas(footer, canvasOptions)])
          .then((results) => {
            const [recordCanvas, footerCanvas] = results
            // Add the record to the pdf
            const imgData = recordCanvas.toDataURL('image/png')
            const heightFactor = recordCanvas.height / recordCanvas.width // Needed to maintain aspect ratio
            // Add a new page for every record after the first one
            if (currentRecord !== list[0]) {
              pdf.addPage()
            }
            pdf.addImage(imgData, 'PNG', 0.2, 0.2, 10.6, 11 * heightFactor - 0.4)
            // Now append the footer
            const footerImgData = footerCanvas.toDataURL('image/png')
            pdf.addImage(footerImgData, 'PNG', 0.2, 11 * heightFactor, 10.6, 1)
          })
      })
    }, Promise.resolve([])).then(() => {
      // Save the pdf now that all pages have been added
      pdf.save('download.pdf')

      if (this.props.instantDownload) {
        // Redirect back to the previous page they clicked on download from.
        this.props.history.goBack()
      } else {
        document.body.classList.remove('noScroll')
        this.setState({
          isPrinting: false,
        })
      }
    })
  }

  componentDidUpdate () {
    if (!this.props.isLoading && this.props.instantDownload && !this.state.isPrinting) {
      this.print(this.props.recordList.length)
    }
  }

  render () {
    if (this.props.isLoading) {
      return <Loading />
    }

    return (
      <div className='recordTypePage'>
        {!this.state.isPrinting && (
          <RecordTypeNav
            currentId={this.props.recordId}
            recordTypes={this.props.recordList}
            print={this.print}
            location={this.props.location}
          />
        )}
        {(this.state.isPrinting ? this.props.recordList : [this.props.recordType]).map(record => (
          <React.Fragment key={record.sys.id}>
            <RecordType recordType={record} />
            <PrintFooter isSaving={this.state.isPrinting} recordId={record.sys.id} />
          </React.Fragment>
        ))}
        <LoadingOverlay
          active={this.state.isPrinting}
          text='Saving to PDF...'
          spinner={<Loading />}
          className='printingOverlay'
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
  const searchParams = new URLSearchParams(ownProps.location.search)
  return {
    isLoading: isLoading,
    recordId: recordId,
    recordList: recordList,
    recordType: recordType,
    instantDownload: searchParams.get('download') === 'true',
  }
}

export default withRouter(connect(mapStateToProps)(RecordTypePage))
