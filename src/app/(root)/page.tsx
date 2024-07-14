import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import hero from "../../../public/assets/images/hero.png";
import AllEvent from "@/components/AllEvent/AllEvent";
import { getAllEvents } from "@/lib/actions/event";
import Search from "@/components/shared/Search/Search";
import { SearchParamProps } from "@/types";
import CategoryFilter from "@/components/shared/Search/CategoryFilter";

export default async function Home({searchParams}: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6
  })
  
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

        <div className="my-8 flex flex-col md:flex-row gap-3">
          <div className="w-full md:w-[50%]">
            <CategoryFilter />
          </div>

          <div className="w-full md:w-[50%]">
          <Search />
          </div>
        </div>

        <AllEvent 
          data={events?.data}
          emptyTitle="No Event Found"
          emptyStateSubtext="Come Back Later"
          collectionType="All_Event"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
    </div>
  );
}
