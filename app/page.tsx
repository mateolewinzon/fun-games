import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-3xl">Welcome to tic-tac-toe</h1>
      <Link href="/play">
        <div className="flex justify-start w-fit p-2 border border-green-500">
          <span className="text-green-500">Play</span>
        </div>
      </Link>
    </section>
  );
}
