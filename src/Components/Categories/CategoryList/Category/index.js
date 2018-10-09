import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import RecordTypesList from '../../../Shared/RecordTypesList'
import { filterRecordsByCategory } from '../../../../Functions/filter'
import { recordTypesReady } from '../../../../Store/storeReady'
import Loading from '../../../Shared/Loading'
import './style.css'

class Category extends Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.setState({open: !this.state.open})
  }
  render() {
    if(recordTypesReady(this.props)) {
      return (
        <React.Fragment>
          <h2
            onClick={this.onClick}
            className={
              this.state.open ?
              'functionalCategory lessChevron' :
              'functionalCategory moreChevron'
            }
          >{this.props.category.fields.name}</h2>
          <div className={ this.state.open ?
            'collapseList' :
            'collapseList closed'
          }>
            <RecordTypesList
              recordTypes={filterRecordsByCategory(this.props, this.props.category)}
            />
            <Link
              className='lastLink'
              to={`/records-by-category/${this.props.category.sys.id}`
            }>
              <div>View all record types for {this.props.category.fields.name}.</div>
            </Link>
          </div>
        </React.Fragment>
      )
    }
    return <Loading/>
  }

}

const mapStateToProps = (state) => { return { ...state } }
export default connect(mapStateToProps)(Category)
