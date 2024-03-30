import Link from "next/link";

function GameLink({ path, name }: { path: string; name: string }) {
  return (
    <li className="w-max">
      <Link href={path}>
        <div className="flex p-2 border-2 border-green-500 rounded">
          <span className="text-green-500">{name}</span>
        </div>
      </Link>
    </li>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">Fun Games</h1>
        <h3>Some fun classic games to play with friends. 😎</h3>
      </div>
      <ul className="flex flex-col gap-4">
        <GameLink path="/connect-four" name="Connect Four" />
        <GameLink path="/tic-tac-toe" name="Tic Tac Toe" />
      </ul>
    </div>
  );
}
