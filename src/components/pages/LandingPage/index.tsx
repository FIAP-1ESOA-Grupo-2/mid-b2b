import { Frame1 } from "./Content/Frame1"
import { Frame2 } from "./Content/Frame2"
import { Frame3 } from "./Content/Frame3"
import { Frame4 } from "./Content/Frame4"
import { Frame5 } from "./Content/Frame5"
import { Frame6 } from "./Content/Frame6"
import { FooterLP } from "./Footer"
import { HeaderLP } from "./Header"

const LandingPage = () => {
    return (
        <section className="h-screen overflow-y-scroll">
            <HeaderLP/>
            <Frame1 />
            <Frame2 />
            <Frame3 />
            <Frame4 />
            <Frame5 />
            <Frame6 />
            <FooterLP />
        </section>
    )
}

export default LandingPage