import React, { useState, useEffect } from 'react'

import { Popover } from 'antd'
import format from 'date-fns/format'

import { api } from './api'

const defaultImage = 'https://s3.amazonaws.com/jyve-public-assets/j_on_white_logo.png'

// TODO: use react emotion to style the Gig properly

const Gig = props => {
  const { gigId } = props

  const [performers, setPerformers] = useState([])
  const [gig, setGig] = useState(undefined)
  const [first, setFirst] = useState(undefined)

  useEffect(async () => {
    await api.get(`api/gigs/${gigId}`)
      .then(({ data }) => {
        setGig(data)
        return data
      })

    await api.get(`api/gigs/${gigId}/performers`)
      .then(({ data }) => {
        setPerformers(data)
        setFirst(data[0])
      })
  }, [props.gigId])

  return (
    !gig ? <div><span>Loading...</span></div>
      : <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flex: 1 }}>
          <img
            src={gig.imageUrl || defaultImage}
            style={{ width: 100, height: 100, borderRadius: 4, marginRight: 8 }}
          />
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: 0 }}>
              {first ? <a style={{ color: props.primary }} href={first ? `https://jyve.io/${first.prettyUrl}` : ''}>{gig.name}</a> : <div>{gig.name}</div>}
            </h3>
            <strong>
              at <a style={{ color: props.primary }} href={`https://jyve.io/${gig.venue.prettyUrl}`}>{gig.venue.name}</a>
            </strong>
            <p>{format(gig.startDate, 'h:mm')} - {format(gig.endDate, 'h:mm A')}</p>
          </div>
          {performers.length <= 1 ? undefined
            : performers.map(p =>
              <div style={{ flex: 1 }}><a href={`https://jyve.io/${p.prettyUrl}`}>{p.name}</a></div>
            )
          }
        </div>
        <div style={{ flex: 1, margin: '10px 10px auto 10px' }}>{gig.description}</div>
      </div>
  )
}

const Gigs = ({ gigs, ...restProps }) =>
  Array.isArray(gigs) ? (
    gigs.map(gig => <Gig key={gig.id} {...restProps} gigId={gig.id} />)
  ) : (
    <Gig gigId={gigs.id} {...restProps} />
  )

export const GigPopover = props => {
  const { gigs, primary } = props
  return <Popover content={<Gigs gigs={gigs} primary={primary} />}>{props.children}</Popover>
}
