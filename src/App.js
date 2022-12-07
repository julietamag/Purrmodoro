import './App.css';
import React, { useState, useEffect } from 'react';
import sound from './cat_sound.mp3';
import cat_sleepy from './sleepy_cat.jpeg';
import cat_working from './work_cat.jpeg';

function App() {
  const [displayTime, setDisplayTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(3);
  const [sessionTime, setSessionTime] = useState(5);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [audioBreak, setAudioBreak] = useState(new Audio(sound))
  const [imageCat, setImageCat] = useState('');
  const [bgColor, setBgColor] = useState(false)

  function playSound() {
    audioBreak.volume = 1;
    audioBreak.currentTime = 0;
    audioBreak.play();
  }

  // format time to look like time metric
  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    // if seconds/minutes is less than 10, add a zero and then the seconds/minutes : else just show them as they are + always add a : in the middle
    return (minutes < 10 ? '0' + minutes : minutes) +
      ':' +
      (seconds < 10 ? '0' + seconds : seconds)
  }

  // Change the break and session timer amount and block this function if the timer is running
  // Do not let the timers go below 0 or above 60
  function changeTime(amount, type) {
    if (!timerOn) {
      if (type === 'break') {
        if (breakTime <= 60 && amount < 0) {
          return;
        } else if (breakTime >= 60 * 60 && amount > 0) {
          return;
        } else {
          setBreakTime((prev) => prev + amount)
        }
      }

      if (type === 'session') {
        if (sessionTime <= 60 && amount < 0) {
          return;
        } else if (sessionTime >= 60 * 60 && amount > 0) {
          return;
        } else {
          setSessionTime((prev) => prev + amount)
          setDisplayTime(sessionTime + amount)
        }
      }
    }
  }

  // RESET BUTTON
  function handleReset() {
    setBreakTime(5 * 60);
    setDisplayTime(25 * 60);
    setSessionTime(25 * 60);
  }

  // HANDLE THE STATE OF ON BREAK; INSIDE THE INTERVAL DOESNT WORK
  useEffect(() => {
    if (displayTime <= 0) {
      if (!onBreak) {
        setOnBreak(true);
        playSound();
        setImageCat(cat_sleepy);
        setBgColor(true);
        setDisplayTime(breakTime);
      } else if (onBreak) {
        setOnBreak(false);
        playSound();
        setImageCat(cat_working);
        setBgColor(false);
        setDisplayTime(sessionTime);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayTime])

  // PLAY && PAUSE BUTTON
  // DIMINISH DIPLAY TIMER BY ONE SEC UNTIL THE CONDITION REACHES 0
  function handlePlayPause() {
    if (!timerOn) {
      setImageCat(cat_working);
      let interval = setInterval(() => {
        setDisplayTime((prev) => {
          const newTimeLeft = prev - 1;
          if (newTimeLeft >= 0) {
            return prev - 1;
          }
        })
      }, 1000)
      // make sure localStorage is clean
      localStorage.clear();
      // GET THE ID OF THE INTERVAL
      localStorage.setItem('interval-id', interval);
    }

    // PAUSE THE TIMER
    if (timerOn) {
      clearInterval(localStorage.getItem('interval-id'))
    }

    // SET THE TIMER STATE TO BE ON IF ITS OFF AND VICEVERSA
    setTimerOn(!timerOn)
  }


  return (
    <div 
    className = {!bgColor ? 'App session' : 'App break'}
    >
      <h1 id='title'>The Faboulous Purrmodoro Timer</h1>
      <div id='length-container'>
        <Length
          title={'break length'}
          changeTime={changeTime}
          type={'break'}
          time={breakTime}
          formatTime={formatTime}
        />

        <Length
          title={'session length'}
          changeTime={changeTime}
          type={'session'}
          time={sessionTime}
          formatTime={formatTime}
        />
      </div>

      <div id='timer-container'>
        <div id='timer-label'>
          {onBreak ? <h2>Break</h2> : <h2>Session</h2>}
          <div id='time-left'>{formatTime(displayTime)}</div>
        </div>
      </div>
      <div id='controllers-container'>
        <button
          id='start_stop'
          onClick={handlePlayPause}
        >
          {timerOn ?
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-pause-fill" viewBox="0 0 16 16">
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-play-fill" viewBox="0 0 16 16">
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          }
        </button>
        <button
          id='reset'
          onClick={handleReset}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
          </svg>
        </button>
      </div>
      <div id='image-container'>
        <img src={imageCat} alt='' />
      </div>
    </div>
  );
}

function Length({ title, changeTime, type, time, formatTime }) {
  return (
    <div className='Length'>
      <div className='timer'>
        <div id='labels'>
          <div id='break-label'>
            <h2 className='length-title'>{title}</h2>
            <div id='break-time'>
              <button
                id='break-decrement'
                onClick={() => changeTime(-60, type)}
              ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                </svg></button>
              <div id='break-length'>{formatTime(time)}</div>
              <button
                id='break-increment'
                onClick={() => changeTime(60, type)}
              ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
