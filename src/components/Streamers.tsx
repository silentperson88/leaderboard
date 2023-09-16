import React, { useEffect } from "react";
import styled from "styled-components";

interface StreamerProps {
  streamer: {
    userID: string;
    displayName: string;
    picture: string;
    score: number;
  };
  index: number;
  previousIndex: number;
  maxScore: number;
}

const StreamerContainer = styled.div`
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 10px;
  /* margin-bottom: 10px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.6s ease;
  background-size: 0% 100%; /* Initial background size */
  background-image: linear-gradient(
    to right,
    #007bff,
    #007bff
  ); /* Gradient color (change this to your desired color) */
  background-repeat: no-repeat;
  background-position: 0 0;
`;

const StreamerInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const RankCircle = styled.div`
  width: 24px;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
`;

const AvatarContainer = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background-color: #ccc;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const Player: React.FC<StreamerProps> = ({
  streamer,
  index,
  previousIndex,
  maxScore,
}) => {
  const [newPosition, setNewPosition] = React.useState<number>(index);

  // Calculate the new position
  useEffect(() => {
    const diff: number = previousIndex - index;
    // when the previous index is greater than the current index, it means the streamer is goingup
    if (diff > 0) {
      setNewPosition(-index);
    }
    // when the previous index is less than the current index, it means the streamer is going down
    else {
      setNewPosition(index);
    }
  }, [index, previousIndex]);

  // Calculate the score percentage
  const scorePercentage = (streamer.score / maxScore) * 100;

  return (
    <StreamerContainer
      style={{
        transform: `translateY(${newPosition * 10}px)`,
        backgroundSize: `${scorePercentage}% 100%`,
      }}
    >
      <StreamerInfo>
        <RankCircle
          style={{
            backgroundColor:
              index === 0 ? "red" : index <= 2 ? "orange" : "blue",
          }}
        >
          {index + 1}
        </RankCircle>
        <AvatarContainer />
        <span>{streamer.displayName}</span>
      </StreamerInfo>
      <span>Score: {streamer.score}</span>
    </StreamerContainer>
  );
};

export default Player;
