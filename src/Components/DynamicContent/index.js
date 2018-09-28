import React from 'react'
import { connect } from 'react-redux'

import { pagesReady } from '../../Store/storeReady'
import Loading from '../Loading'

const DynamicContent = ({slug, children, ...props}) => {
  if(pagesReady(props)) {
    let page = props.contentReducer.pages.filter(
      page => {
        return page.fields.slug === slug
      }
    ).shift()
    return (
      <React.Fragment>
        <h1>{page.fields.name}</h1>
        <div className='text-content'>{page.fields.mainText}</div>
        { children}
        { page.fields.afterText ? <div className='text-content'>{page.fields.afterText}</div> : null}
      </React.Fragment>
    )
  }
  return <Loading/>
}

const mapStateToProps = (state) => { return { ...state } }

export default connect(mapStateToProps)(DynamicContent)
