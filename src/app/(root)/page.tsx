import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import hero from "../../../public/assets/images/hero.png";

export default function Home() {
  return (
    <div className="px-6 md:px-12 lg:px-24 xl:px-32">
        <div className="flex flex-col md:flex-row items-center max-md:gap-y-8 md:gap-x-4 my-10">
            <div className="w-full md:w-[50%] flex flex-col gap-y-6">
                <p className="text-3xl md:text-3xl lg:text-4xl font-semibold">Host, Connect, Celebrate: Your Events, Our Platform!</p>
                <p>Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community</p>
                <Button className="bg-purple-600 w-full sm:w-fit">
                  <Link href="#events">Explore Now</Link>
                </Button>
            </div>
            <div className="w-full md:w-[50%] flex justify-center">
              <Image src={hero} alt="" width={400} height={400} placeholder="blur"/>
            </div>
        </div>

        <div id="events" className="my-10">
          <p className="text-3xl font-semibold">Trust by <br /> Thousands of Events</p>
        </div>

        <div className="my-8 flex flex-col">
            search
            category
        </div>
    </div>
  );
}
