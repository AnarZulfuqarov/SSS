import  {useState} from "react";
import './index.scss'
import sponsor1 from "/src/assets/SponsorImage/1.png"
import sponsor2 from "/src/assets/SponsorImage/2.png"
import sponsor3 from "/src/assets/SponsorImage/3.png"
import sponsor4 from "/src/assets/SponsorImage/4.png"
import sponsor5 from "/src/assets/SponsorImage/5.png"
import sponsor6 from "/src/assets/SponsorImage/6.png"
import sponsor7 from "/src/assets/SponsorImage/7.png"
import sponsor8 from "/src/assets/SponsorImage/8.png"
import sponsor9 from "/src/assets/SponsorImage/9.png"
import sponsor10 from "/src/assets/SponsorImage/10.png"
import sponsor11 from "/src/assets/SponsorImage/11.png"
import sponsor12 from "/src/assets/SponsorImage/12.png"
import sponsor13 from "/src/assets/SponsorImage/13.png"
import sponsor14 from "/src/assets/SponsorImage/14.png"
import sponsor15 from "/src/assets/SponsorImage/15.png"
import sponsor16 from "/src/assets/SponsorImage/16.png"
import sponsor17 from "/src/assets/SponsorImage/17.png"
import sponsor18 from "/src/assets/SponsorImage/18.png"
import sponsor19 from "/src/assets/SponsorImage/19.png"
import sponsor20 from "/src/assets/SponsorImage/20.png"
import sponsor21 from "/src/assets/SponsorImage/21.png"
import sponsor22 from "/src/assets/SponsorImage/22.png"
import sponsor23 from "/src/assets/SponsorImage/23.png"

const sponsorImages = [
    sponsor1, sponsor2, sponsor3, sponsor4, sponsor5, sponsor6,
    sponsor7, sponsor8, sponsor9, sponsor10, sponsor11, sponsor12,
    sponsor13, sponsor14, sponsor15, sponsor16, sponsor17, sponsor18,
    sponsor19,sponsor20,sponsor21,sponsor22, sponsor23,

];

function Sponsor() {


    const [brands] = useState(() => {
        const repeatedBrands = [];
        for (let i = 0; i < 100; i++) {
            repeatedBrands.push(...sponsorImages);
        }
        return repeatedBrands;
    });

    return (
        <section id="logoScrollHome">
            <div className="wrapper left">
                {brands.map((brand, index) => (
                    <div className="box" key={index}>
                        <img src={brand} alt="Logo" />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Sponsor;