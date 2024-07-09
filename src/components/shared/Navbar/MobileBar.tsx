import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image";
import menuPic from "../../../../public/assets/icons/menu.svg";
import NavLink from "./NavLink";

const MobileBar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Image src={menuPic} width={24} height={24} alt="menu-picture" className="cursor-pointer" />
            </SheetTrigger>
            <SheetContent className="w-[55%] sm:w-[40%] md:hidden">
                <NavLink />
            </SheetContent>
        </Sheet>
    );
};

export default MobileBar;