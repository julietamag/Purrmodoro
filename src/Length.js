export function Length({ title, changeTime, type, time, formatTime }) {
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
                ><svg id='menos' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                  </svg>
                  <div id='menos_p'>-</div>
                  </button>
                <div id='break-length'>{formatTime(time)}</div>
                <button
                  id='break-increment'
                  onClick={() => changeTime(60, type)}
                ><svg id='mas' xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                  <div id='mas_p'>+</div>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }