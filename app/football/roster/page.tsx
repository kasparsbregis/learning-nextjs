import TeamList from "@/components/TeamList";
import { players } from "@/data/team-roster";

const TeamRoster = () => {
  return (
    <section className="flex flex-col items-center h-[calc(100vh-3.5rem)] pt-20">
      <h1 className="text-3xl font-bold">Team Roster</h1>
      <div className="mt-5 flex flex-col">
        <h3>List of all the players:</h3>
        <ul className="max-w-[400px] w-full">
          <li className="grid grid-cols-3 gap-4">
            <div>Number</div>
            <div>Name</div>
            <div>Position</div>
          </li>
          {players.map((player) => (
            <TeamList key={player.id} player={player} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TeamRoster;
