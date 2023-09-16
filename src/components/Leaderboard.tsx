import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Streamer from "./Streamers";

interface LeaderboardProps {
  Streamers: {
    userID: string;
    displayName: string;
    picture: string;
    score: number;
  }[];
}

const LeaderboardContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Leaderboard: React.FC<LeaderboardProps> = ({ Streamers }) => {
  const [sortedStreamers, setSortedStreamers] = useState(Streamers);
  const [previousIndices, setPreviousIndices] = useState<number[]>([]);
  const [maxScore, setMaxScore] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Add random points to each streamer
      const newStreamers = sortedStreamers.map((streamer) => ({
        ...streamer,
        score: streamer.score + Math.floor(Math.random() * 1000),
      }));

      // Sort streamers based on their new points
      newStreamers.sort((a, b) => b.score - a.score);

      // Calculate the previous indices for each streamer
      const newPreviousIndices = sortedStreamers.map(
        (streamer) =>
          previousIndices[
            newStreamers.findIndex((s) => s.userID === streamer.userID)
          ]
      );

      // Calculate the new max score
      const newMaxScore = newStreamers.reduce((acc, streamer) => {
        if (streamer.score > acc) {
          return streamer.score;
        }
        return acc;
      }, 0);
      console.log(newMaxScore);

      // Update the state
      setMaxScore(newMaxScore);
      setSortedStreamers(newStreamers);
      setPreviousIndices(newPreviousIndices);
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, [sortedStreamers, previousIndices]);

  return (
    <LeaderboardContainer>
      {sortedStreamers.map((streamer, index) => (
        <Streamer
          key={streamer.userID}
          index={index}
          streamer={streamer}
          previousIndex={previousIndices[index]}
          maxScore={maxScore}
        />
      ))}
    </LeaderboardContainer>
  );
};

export default Leaderboard;
