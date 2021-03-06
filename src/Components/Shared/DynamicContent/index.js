import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'

import { pagesReady } from 'Store/storeReady'
import Loading from 'Components/Shared/Loading'

// This component connects to the 'page' content type on Contentful and will
// add the title and text entered there onto specific pages based on the slug
const DynamicContent = ({ slug, children, ...props }) => {
  if (pagesReady(props)) {
    // find the page with matching slug or return a (mostly) empty page object
    const page = props.contentReducer.pages.find(
      page => {
        return page.fields.slug === slug
      },
    ) || { fields: {} }

    return (
      <>
        <h1>{page.fields.name}</h1>
        <div className='text-content'>
          <ReactMarkdown source={page.fields.mainText} linkTarget='_blank' />
        </div>
        {children}
        {page.fields.afterText
          ? <div className='text-content'><ReactMarkdown source={page.fields.afterText} linkTarget='_blank' /></div>
          : null}
      </>
    )
  }
  return <Loading />
}

DynamicContent.propTypes = {
  slug: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return { ...state }
}

export default connect(mapStateToProps)(DynamicContent)
