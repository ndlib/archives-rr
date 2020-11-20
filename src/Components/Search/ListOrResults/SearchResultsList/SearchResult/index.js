import React, { createElement } from 'react'
import { Link } from 'react-router-dom'
import Highligter from 'react-highlight-words'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import './style.css'

const SearchResult = ({ result, recordTypes, ...props }) => {
  let searchWords = []
  if (props && props.searchReducer && props.searchReducer.terms) {
    searchWords = props.searchReducer.terms
  }
  const recordFromResult = recordTypes.find(
    record => {
      return record.sys.id === result.id
    },
  ) || { id: '', fieldsWithTerm: [], hitCount: 0 }

  const makeSnippets = (textElements) => {
    const charThreshold = 15
    const output = []
    let charsSinceMark = -1

    textElements.forEach((el, elIndex) => {
      let snippetText = el.props.children
      if (el.type === 'mark') {
        charsSinceMark = 0
      } else {
        let leftText = ''
        let rightText = ''
        const split = el.props.children.split(' ')

        // Don't include a left side snippet if there was no mark (matching term) before this span
        if (charsSinceMark > -1) {
          // Starting from the left, start adding words until we meet the char threshold
          let i = 0
          while (i < split.length && charsSinceMark < charThreshold) {
            if (i > 0) {
              leftText += ' '
            }
            leftText += split[i]
            charsSinceMark += split[i].length
            i++
          }
        }

        // Only do rightText if there is a highlighted term after this span.
        if (elIndex < textElements.length - 1 && textElements[elIndex + 1].type === 'mark') {
          let j = split.length - 1
          while (j >= 0 && rightText.length < charThreshold) {
            if (j < split.length - 1) {
              rightText = ' ' + rightText
            }
            rightText = split[j] + rightText
            j--
          }
        }

        // The +1 is for a space, so we won't get ... if the only thing between leftText and rightText is a space.
        if (leftText.length + rightText.length + 1 < el.props.children.length) {
          // Adding space makes it a little more clear that text is omitted between two snippets
          snippetText = (leftText && rightText) ? `${leftText} ... ${rightText}` : `${leftText}...${rightText}`
        }
      }
      if (snippetText !== '...') {
        output.push(createElement(el.type, {
          ...el.props,
          children: snippetText,
          key: el.key,
        }))
      }
    })
    return createElement('span', { children: output })
  }

  return (
    <div className='result'>
      <Link to={`/recordType/${result.id}?${props.match.params.search}`}>
        <Highligter
          highlightClassName='term-match'
          searchWords={result.fieldsWithTerm.includes('recordType') ? searchWords : []}
          autoEscape
          textToHighlight={recordFromResult.fields.recordType}
        />
      </Link>
      {result.fieldsWithTerm.map(field => {
        // don't repeat the recordType field because that's the "name"
        // don't display functional category because it's different
        if (field === 'recordType' || field === 'category') {
          return null
        }

        return (
          <div
            key={field}
            className='resultField'
          >
            {
              makeSnippets(Highligter({
                highlightClassName: 'term-match',
                searchWords: result.fieldsWithTerm.includes(field) ? searchWords : [],
                autoEscape: true,
                textToHighlight: recordFromResult.fields[field],
              }).props.children)
            }
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { ...state }
}
export default withRouter(connect(mapStateToProps)(SearchResult))
