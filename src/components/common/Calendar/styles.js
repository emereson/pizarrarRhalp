import { css } from '@emotion/react';

export const calendar = css`
  background: transparent;
  border: solid 1.5px white;
  padding-left: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  width: 100%;

  .react-calendar__navigation {
    border: 0px;
    margin-bottom: 0px;
    display: flex;
    justify-content: center;
  }
  .react-calendar__viewContainer {
    height: 240px;
    margin-left: -1px;
    margin-right: -1px;
    margin-bottom: -1px;
  }
  .react-calendar__month-view {
    display: flex;
    height: inherit;
    @media (max-width: 576px) {
      border: none;
    }
  }

  .react-calendar__navigation__label {
    border: none;
    color: white;
    font-size: 12px;
    opacity: 1 !important;
    flex-grow: 0.5 !important;
    background-color: transparent !important;
    :hover {
      background: transparent;
    }
    :focus {
      background: transparent;
    }
  }

  .react-calendar__navigation__arrow {
    color: white;
    min-width: 44px;
    background: none;
    font-size: 26px;
    border: none;
  }

  .react-calendar__navigation button:enabled:hover {
    background-color: transparent;
  }
  .react-calendar__navigation button:enabled:focus {
    background-color: transparent;
  }

  .react-calendar__month-view__weekdays {
    border: 0.8px solid white;
    border-left: none;
    color: black;
    @media (max-width: 576px) {
      border: none;
      border-top: 1px solid white;
      border-bottom: 1px solid white;
      margin-left: 1px;
      width: 99%;
    }
  }

  .react-calendar__month-view__days__day {
    border: none;
    background-color: transparent;
    border-bottom: 0.5px solid white;
    border-right: 0.5px solid white;
    height: 35px;
    @media (max-width: 576px) {
    }
  }

  .react-calendar__tile {
    @media (max-width: 576px) {
      padding: 0.3em 0.5em;
    }
  }
  .react-calendar__tile--active {
    background: rgb(137, 134, 213, 0.8);
    color: white;
    font-weight: bold;
    text-decoration-line: none;
  }

  .react-calendar__tile--now {
    background-color: transparent;
    abbr {
      color: #e0e325 !important;
      font-size: 18px !important;
    }
  }

  .react-calendar__tile:enabled:hover {
    background-color: rgba(153, 198, 255, 0.4);

    abbr {
      color: #33ff00 !important;
    }
  }

  .react-calendar__tile:enabled:focus {
    background: rgb(137, 134, 213, 0.8);

    abbr {
      color: #33ff00 !important;
    }
  }

  .react-calendar__month-view__weekdays {
    color: white;
    text-align: center;
    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__navigation__next2-button,
  .react-calendar__navigation__prev2-button {
    display: none;
  }

  .react-calendar__month-view__days abbr {
    color: white;
    font-size: 16px;
    // font-weight: bold;
  }

  @media (max-width: 576px) {
    // max-width: 75vw;
  }
`;
