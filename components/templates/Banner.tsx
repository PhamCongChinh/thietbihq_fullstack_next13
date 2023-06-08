import Image from "next/image"
import BannerImage from "@/public/images/banner.png"
const Banner = () => {
    return (
        <Image src={BannerImage} alt={"Banner"} width={30} height={30} className="w-full h-auto" priority/>
    )
}

export default Banner