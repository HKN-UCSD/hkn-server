import React from 'react';
import styles from './styles';
import { EventResponseTypeEnum } from '../../services/api/models/EventResponse';
import logo from '../../images/hkn-logo-black.png'

const dateTimeFormat = new Intl.DateTimeFormat("en-US", { weekday: "short", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit" });

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
function day(dateStr) {
  const t = dateStr.indexOf('T');
  return dateStr.slice(t-5, t).replace('-','/');
}
function date(dateStr) {
}
function time(dateStr) {
  const t = dateStr.indexOf('T');
  return dateStr.slice(t+1, t+6);
}

function typeColor(type) {
  switch (type) {
    case EventResponseTypeEnum.Professional:
      return "#c3a1fc";
    case EventResponseTypeEnum.Social:
      return "#43e8B6";
    case EventResponseTypeEnum.Technical:
      return "#8daeed";
    case EventResponseTypeEnum.Mentorship:
      return "#ff8800";
  }
}

export function EventCard(props) {
  const event = props.event;
  let dateTime = dateTimeFormat.format(new Date(event.startDate)) + " - " + timeFormat.format(new Date(event.endDate));
  if (dateTime.indexOf(dateTime.slice(-2)) !== dateTime.length - 2)
    dateTime = dateTime.replace(dateTime.slice(-2), "");

  return <div key={event.id} style={styles.card}>
    <div style={styles.frame}>
      <img style={styles.image} src={logo} />
    </div>
    <div style={styles.bar}>
      <div style={styles.info}>{dateTime}<br/>{event.location}</div>
      <div style={{ ...styles.type, backgroundColor: typeColor(event.type) }}>{capitalize(event.type)}</div>
    </div>
  </div>
}