import Image from "next/image"
import LogoImage from "@/public/images/logo.png"

const Logo = () => {
    return(
        <Image src={LogoImage} alt={"Logo"}/>
    )
}
export default Logo