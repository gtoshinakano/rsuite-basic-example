import React from 'react';
import './App.css';
import 'rsuite/dist/styles/rsuite-default.css';
import { Nav, Icon, Calendar, Whisper, Popover, Badge } from 'rsuite';
import { getDate } from 'date-fns'

function App() {
  return (
    <div className="App">
      <div className="App-container">
        <header className="App-header">
          <Nav>
            <Nav.Item icon={<Icon icon="home" />}>Home</Nav.Item>
            <Nav.Item>All</Nav.Item>
            <Nav.Item>Work</Nav.Item>
            <Nav.Item>Day Off</Nav.Item>
            <Nav.Item>Tasks</Nav.Item>
          </Nav>
        </header>
        <div>
          <Calendar
            className="calendar-container"
            bordered
            renderCell={renderCell}
          />
        </div>
      </div>
    </div>
  );
}

function getTodoList(date) {
  const day = getDate(date);

  switch (day) {
    case 20:
      return [
        { time: '10:30 am', title: 'Meeting' },
        { time: '12:00 pm', title: 'Almuerzo' }
      ];
    case 7:
      return [
        { time: '09:30 pm', title: 'Exercicios' },
        { time: '12:30 pm', title: 'Almuerzo' },
        { time: '05:00 pm', title: 'Nihongakkou' },
        { time: '06:30 pm', title: 'Jantar' },
        { time: '10:00 pm', title: 'Dormir' }
      ];
    case 11:
      return [
        { time: '09:30 pm', title: 'Beber' },
        { time: '12:30 pm', title: 'Cair' },
        { time: '05:00 pm', title: 'Levantar' },
      ];
    case 12:
      return [
        { time: '09:30 pm', title: 'Acordar' },
        { time: '12:30 pm', title: 'Cafe' },
        { time: '05:00 pm', title: 'Comer' },
        { time: '06:30 pm', title: 'Beber' },
        { time: '10:00 pm', title: 'Dormir' }
      ];
    default:
      return [];
  }
}

function renderCell(date) {
  const list = getTodoList(date);
  const displayList = list.filter((item, index) => index < 2);

  if (list.length) {
    const moreCount = list.length - displayList.length;
    const moreItem = (
      <li>
        <Whisper
          placement="top"
          trigger="click"
          speaker={
            <Popover>
              {list.map((item, index) => (
                <p key={index}>
                  <b>{item.time}</b> - {item.title}
                </p>
              ))}
            </Popover>
          }
        >
          <a>{moreCount} more</a>
        </Whisper>
      </li>
    );

    return (
      <ul className="calendar-todo-list">
        {displayList.map((item, index) => (
          <li key={index}>
            <Badge /> <b>{item.time}</b> - {item.title}
          </li>
        ))}
        {moreCount ? moreItem : null}
      </ul>
    );
  }

  return null;
}


export default App;
