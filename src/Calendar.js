import React, { useState, useEffect } from 'react'
import { SmallCalendar } from './SmallCalendar'
import { LargeCalendar } from './LargeCalendar'

import { api } from './api'

const Calendar = props => {
  const [gigs, setGigs] = useState(undefined)

  useEffect(() => {
    let { token } = props
    api.get(`widgets`, {
      params: { access_token: token }
    }).then(({ data }) => setGigs(data))
  }, [props.token])

  if (props.type === 'large') {
    return <LargeCalendar {...props} gigs={gigs} />
  } else {
    return <SmallCalendar {...props} gigs={gigs} />
  }
}

export { Calendar }

export default Calendar
