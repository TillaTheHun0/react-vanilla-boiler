import React from 'react'
import BigCalendar from 'react-big-calendar'
import styled from 'react-emotion'
import moment from 'moment'

import { GigPopover } from './GigPopover'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = BigCalendar.momentLocalizer(moment)

const DAY_FORMAT = 'YYYY-MM-DD'

const accessors = {
  titleAccessor: 'name',
  startAccessor: 'startDate',
  endAccessor: 'endDate',
  views: ['month'],
  formats: {
    dayFormat: DAY_FORMAT
  }
}

const LargeCalendar = props => {
  let {
    gigs = [],
    primary = '#a89be8', // primary color of calendar
    secondary = 'white' // text color
  } = props

  const StyledBigCalendar = styled(BigCalendar)`
    height: 80vw;
    width: 95vw;
    margin: auto;
  
    .rbc-month-view {
      border-radius: 20px;
    }

    .rbc-month-view .rbc-month-row:first-child {
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
    }

    .rbc-month-view .rbc-month-row:last-child {
      border-bottom-right-radius: 20px;
      border-bottom-left-radius: 20px;
    }

    .rbc-event {
      background-color: ${primary};
    }

    .rbc-today {
      color: ${secondary};
    }
  `

  // TODO: Tyler. Make this prettier
  if (!gigs) return <span>Loading...</span>

  return (
    <div>
      <StyledBigCalendar
        localizer={localizer}
        events={gigs}
        components={{
          eventWrapper: props => {
            return <GigPopover gigs={props.event} primary={primary}>{props.children}</GigPopover>
          }
        }}
        {...accessors}
      />
    </div>
  )
}

export { LargeCalendar }
