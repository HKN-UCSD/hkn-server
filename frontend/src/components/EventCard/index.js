import React from 'react';
import styles from './styles';
import { EventResponseTypeEnum } from '../../services/api/models/EventResponse';
import logo from '../../images/hkn-logo-black.png'

const dateTimeFormat = new Intl.DateTimeFormat('en-US', { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
const timeFormat = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' });

function capitalize(str) {
  if (str === undefined || str.length === 0)
    return '';
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function typeColor(type) {
  switch (type) {
    case EventResponseTypeEnum.Professional:
      return '#c3a1fc';
    case EventResponseTypeEnum.Social:
      return '#43e8B6';
    case EventResponseTypeEnum.Technical:
      return '#8daeed';
    case EventResponseTypeEnum.Mentorship:
      return '#ff8800';
    default:
      return '#000000';
  }
}

export function EventCard(props) {
  const event = props.event;
  let dateTime = dateTimeFormat.format(new Date(event.startDate)) + ' - ' + timeFormat.format(new Date(event.endDate));
  if (dateTime.indexOf(dateTime.slice(-2)) !== dateTime.length - 2)
    dateTime = dateTime.replace(dateTime.slice(-2), '');

  return <a key={event.id} href={'events/' + event.id} style={{all: 'unset', cursor: 'pointer'}}><div style={styles.card}>
    <div style={styles.frame}>
      <img style={styles.image} alt='' src={logo} />
    </div>
    <div style={styles.bar}>
      <div style={styles.info}>{dateTime}<br/>{event.location}</div>
      <div style={{ ...styles.type, backgroundColor: typeColor(event.type) }}>{capitalize(event.type)}</div>
    </div>
  </div>
  </a>
}