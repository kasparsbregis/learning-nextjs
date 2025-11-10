"use client";

import { Player } from "@/data/team-roster";

const TeamList = ({ player }: { player: Player }) => {
  return (
    <li>
      <div className="grid grid-cols-3 gap-4">
        <p>{player.id}</p>
        <p>{player.name}</p>
        <p>{player.position}</p>
      </div>
    </li>
  );
};

export default TeamList;
