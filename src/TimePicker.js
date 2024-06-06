import React, { useState } from 'react';
import styled from 'styled-components';

const TimePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 250px;
  background-color: #f5f5f5;
`;

const TimeDisplay = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputField = styled.input`
  width: 40px;
  text-align: center;
  font-size: 24px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const ClockContainer = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClockNumber = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  ${({ x, y, isSecond, isSelected }) => `
    transform: translate(${x}px, ${y}px);
    color: ${isSelected ? 'white' : isSecond ? 'black' : 'inherit'};
    background-color: ${isSelected ? 'blue' : 'transparent'};
  `}
`;

const CenterDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  z-index: 1;
`;

const HandLine = styled.div`
  position: absolute;
  width: 90px; /* adjust the length to reach the edge */
  height: 2px;
  background-color: black;
  top: 50%;
  left: 50%;
  transform-origin: left center; /* transform origin at the start of the line */
  ${({ angle }) => `
    transform: rotate(${angle-90}deg);
  `}
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  &:first-child {
    margin-right: 10px;
  }
  &:hover {
    background-color: #0056b3;
  }
`;

const hourPositions = [
  { number: 1, x: 45, y: -78, angle: 30 },
  { number: 2, x: 78, y: -45, angle: 60 },
  { number: 3, x: 90, y: 0, angle: 90 },
  { number: 4, x: 78, y: 45, angle: 120 },
  { number: 5, x: 45, y: 78, angle: 150 },
  { number: 6, x: 0, y: 90, angle: 180 },
  { number: 7, x: -45, y: 78, angle: 210 },
  { number: 8, x: -78, y: 45, angle: 240 },
  { number: 9, x: -90, y: 0, angle: 270 },
  { number: 10, x: -78, y: -45, angle: 300 },
  { number: 11, x: -45, y: -78, angle: 330 },
  { number: 12, x: 0, y: -90, angle: 0 },
];

const minutePositions = [
  { number: 0, x: 0, y: -90, angle: 0, isSecond: true },
  { number: 5, x: 45, y: -78, angle: 30, isSecond: true },
  { number: 10, x: 78, y: -45, angle: 60, isSecond: true },
  { number: 15, x: 90, y: 0, angle: 90, isSecond: true },
  { number: 20, x: 78, y: 45, angle: 120, isSecond: true },
  { number: 25, x: 45, y: 78, angle: 150, isSecond: true },
  { number: 30, x: 0, y: 90, angle: 180, isSecond: true },
  { number: 35, x: -45, y: 78, angle: 210, isSecond: true },
  { number: 40, x: -78, y: 45, angle: 240, isSecond: true },
  { number: 45, x: -90, y: 0, angle: 270, isSecond: true },
  { number: 50, x: -78, y: -45, angle: 300, isSecond: true },
  { number: 55, x: -45, y: -78, angle: 330, isSecond: true },
];

const calculateAngle = (number, isMinute) => {
  if (isMinute) {
    return number * 6;
  } else {
    return number * 30;
  }
};

const TimePicker = () => {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(15);
  const [displayMode, setDisplayMode] = useState('minutes'); // 'hours' or 'minutes'
  const [selectedAngle, setSelectedAngle] = useState((minutes / 60) * 360);
  const [selectedNumber, setSelectedNumber] = useState(minutes);

  const handleTimeChange = (number, isMinute) => {
    const angle = calculateAngle(number, isMinute);
    if (displayMode === 'hours') {
      setHours(number);
    } else {
      setMinutes(number);
    }
    setSelectedAngle(angle);
    setSelectedNumber(number);
  };

  const handleInputClick = (mode) => {
    setDisplayMode(mode);
    setSelectedNumber(mode === 'hours' ? hours : minutes);
  };

  return (
    <TimePickerContainer>
      <TimeDisplay>
        <InputField
          type="number"
          value={String(hours).padStart(2, '0')}
          onClick={() => handleInputClick('hours')}
          readOnly
        />
        :
        <InputField
          type="number"
          value={String(minutes).padStart(2, '0')}
          onClick={() => handleInputClick('minutes')}
          readOnly
        />
      </TimeDisplay>
      <ClockContainer>
        <CenterDot />
        <HandLine angle={selectedAngle} />
        {(displayMode === 'hours' ? hourPositions : minutePositions).map(({ number, x, y, angle, isSecond }) => (
          <ClockNumber
            key={number}
            x={x}
            y={y}
            isSecond={isSecond}
            isSelected={number === selectedNumber}
            onClick={() => handleTimeChange(number, displayMode === 'minutes')}
          >
            {number}
          </ClockNumber>
        ))}
      </ClockContainer>
      <ButtonContainer>
        <Button>Cancel</Button>
        <Button>Add</Button>
      </ButtonContainer>
    </TimePickerContainer>
  );
};

export default TimePicker;
