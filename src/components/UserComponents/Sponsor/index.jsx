import { useState } from "react";
import "./index.scss";
import sponsor1 from "/src/assets/SponsorImage/1.png";
import sponsor2 from "/src/assets/SponsorImage/2.png";
import sponsor3 from "/src/assets/SponsorImage/3.png";
import sponsor4 from "/src/assets/SponsorImage/4.png";
import sponsor5 from "/src/assets/SponsorImage/5.png";
import sponsor6 from "/src/assets/SponsorImage/6.png";
import sponsor7 from "/src/assets/SponsorImage/7.png";
import sponsor8 from "/src/assets/SponsorImage/8.png";
import sponsor9 from "/src/assets/SponsorImage/9.png";
import sponsor14 from "/src/assets/SponsorImage/14.png";
import sponsor15 from "/src/assets/SponsorImage/15.png";
import sponsor16 from "/src/assets/SponsorImage/16.png";
import sponsor17 from "/src/assets/SponsorImage/17.png";
import sponsor18 from "/src/assets/SponsorImage/18.png";
import sponsor19 from "/src/assets/SponsorImage/19.png";
import sponsor20 from "/src/assets/SponsorImage/20.png";
import sponsor21 from "/src/assets/SponsorImage/21.png";
import sponsor22 from "/src/assets/SponsorImage/22.png";
import sponsor23 from "/src/assets/SponsorImage/23.png";

const sponsorImages = [
    sponsor1, sponsor2, sponsor3, sponsor4, sponsor5, sponsor6,
    sponsor7, sponsor8, sponsor9, sponsor14, sponsor15, sponsor16,
    sponsor17, sponsor18, sponsor19, sponsor20, sponsor21, sponsor22, sponsor23
];

const sponsorLinks = [
    "https://www.colibri.az/",
    "https://www.nwconstruction.com/",
    "https://tikkurila.com/",
    "http://marcan.az/",
    "https://www.ahghotelresort.com/",
    "https://shahdag.az/az",
    "https://marzgroup.az/",
    "https://www.zivella.com/az/",
    "https://www.nnconstruction.az/",
    "https://www.akkord.az/",
    "https://bakusteel.com/",
    "https://www.pashabank.az/lang,az/",
    "https://santral.az/",
    "https://caspian-energy.az/",
    "https://kontakt.az/?utm_source=google&utm_medium=cpc&utm_campaign=GSN%20|%20Brandname%20&%20R%C9%99qibl%C9%99r&utm_content=AZE%20|%20Kontakt%20Home%20Responsive&utm_ad=436155632587&utm_term=kontakt%20home&matchtype=p&device=c&GeoLoc=9220239&placement=&network=g&campaign_id=1571055800&adset_id=101613926295&ad_id=436155632587&gad_source=1&gclid=Cj0KCQjw2N2_BhCAARIsAK4pEkXJ2qa6YTjXdHKoYUhY8OMj5QmPkqgTM-OKZXo2-P_H4_3Zdv_IcsQaAgtAEALw_wcB",
    "https://siyazantoyuq.az/",
    "https://pasha-holding.az/en/construction/pasha-construction/",
    "https://www.kapitalbank.az/",
    "https://www.macegroup.com/"
];

function Sponsor() {
    const [brands] = useState(() => {
        const repeatedBrands = [];
        // Hər iki array-ı eyni sırada təkrarlamaq üçün (məsələn, 100 dəfə)
        for (let i = 0; i < 100; i++) {
            sponsorImages.forEach((image, index) => {
                repeatedBrands.push({ src: image, link: sponsorLinks[index] });
            });
        }
        return repeatedBrands;
    });

    return (
        <section id="logoScrollHome">
            <div className="wrapper left">
                {brands.map((brand, index) => (
                    <div className="box" key={index}>
                        <a href={brand.link} target="_blank" rel="noopener noreferrer">
                            <img src={brand.src} alt="Logo" />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Sponsor;
