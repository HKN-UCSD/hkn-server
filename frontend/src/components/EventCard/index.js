import React from 'react';
//import styles from './styles';
import styles from './styles.module.css';
import { EventResponseTypeEnum } from '../../services/api/models/EventResponse';
import { format } from 'date-fns';
import imgTechnical from '../../images/default-event/technical.png'
import imgProfessional from '../../images/default-event/professional.png'
import imgSocial from '../../images/default-event/social.png'
import imgMentorship from '../../images/default-event/mentorship.png'

function capitalize(str) {
  if (str === undefined || str.length === 0)
    return '';
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

function typeImage(type) {
  switch (type) {
    case EventResponseTypeEnum.Professional:
      return imgProfessional;
    case EventResponseTypeEnum.Social:
      return imgSocial;
    case EventResponseTypeEnum.Technical:
      return imgTechnical;
    case EventResponseTypeEnum.Mentorship:
      return imgMentorship;
    default:
      return '';
  }
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
  let dateTime = format(new Date(event.startDate), 'E, M/d, h:mm a') + ' - ' + format(new Date(event.endDate), 'h:mm a');
  if (dateTime.indexOf(dateTime.slice(-2)) !== dateTime.length - 2)
    dateTime = dateTime.replace(dateTime.slice(-2), '');

  return <a key={event.id} href={'events/' + event.id} style={{ all: 'unset', cursor: 'pointer' }}>
    <div className={styles.card}>
      <div className={styles.frame}>
        <img className={styles.image} alt='' src={typeImage(event.type)} />
        <div className={styles.cover}>
          <div className={styles.spacer}/>
          <div className={styles.title}>{event.name}</div>
          <div className={styles.spacer} />
        </div>
      </div>
      <div className={styles.bar}>
        <div className={styles.info}>{dateTime}<br />{event.location}</div>
        <div className={styles.type} style={{ backgroundColor: typeColor(event.type) }}>{capitalize(event.type)}</div>
      </div>
    </div>
  </a>
}