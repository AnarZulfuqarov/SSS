import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import why from "/src/assets/why.jpeg";
import kran from "/src/assets/kran.png";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTranslation } from "react-i18next";

function WhyChoose() {
    const { t } = useTranslation();
    const kranRef = useRef(null);
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Sticky scroll effekti – sürükləmə aktiv olmadıqda
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            console.log("Current scrollY:", scrollY);
            const kranElem = kranRef.current;
            if (kranElem && !dragging) {
                const startSticky =50;        // Hərəkətin başlama nöqtəsi
                const maxTranslate = 200;          // Maksimum translate (px)
                const factor = 0.07;               // Hər piksel üçün əlavə hərəkət
                if (scrollY > startSticky) {
                    const translateY = Math.min((scrollY - startSticky) * factor, maxTranslate);
                    kranElem.style.transform = `translateY(${translateY}px)`;
                } else {
                    kranElem.style.transform = "translateY(0px)";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [dragging]);

    // Draggable funksionallığı üçün mouse hadisələri
    useEffect(() => {
        const kranElem = kranRef.current;
        if (!kranElem) return;

        const handleMouseDown = (e) => {
            setDragging(true);
            // Elementin sol və üst koordinatlarına nisbətən mouse mövqeyini hesablayırıq
            const rect = kranElem.getBoundingClientRect();
            setOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
            // Draggable rejimə girərkən keçid effektini dayandırırıq
            kranElem.classList.add("dragging");
        };

        const handleMouseMove = (e) => {
            if (!dragging) return;
            // Yeni koordinatları ofsetlə birlikdə təyin edirik
            kranElem.style.left = e.clientX - offset.x + "px";
            kranElem.style.top = e.clientY - offset.y + "px";
        };

        const handleMouseUp = () => {
            setDragging(false);
            kranElem.classList.remove("dragging");
        };

        kranElem.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            kranElem.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [dragging, offset]);

    return (
        <div id="whyChoose">
            <div className="container" data-aos="fade-up">
                <div className="head">
                    <div className="head-left" data-aos="fade-right">
                        <hr />
                        <h4>{t("whyChoose.head.left")}</h4>
                    </div>
                    <div className="head-right" data-aos="fade-left" data-aos-delay="100">
                        <h1>{t("whyChoose.head.right")}</h1>
                    </div>
                    <img
                        ref={kranRef}
                        className="sticky-kran"
                        src={kran}
                        alt={t("whyChoose.head.kranAlt")}
                        data-aos="zoom-in"
                        data-aos-delay="200"
                    />
                </div>
            </div>
            <div className="whyChoose">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-md-12 col-sm-12 col-xs-12" data-aos="fade-right">
                            <div className="image">
                                <img src={why} alt={t("whyChoose.imageAlt")} />
                            </div>
                        </div>
                        <div className="col-6 col-md-12 col-sm-12 col-xs-12" data-aos="fade-left">
                            <div className="text">
                                <h2>{t("whyChoose.text.title")}</h2>
                                <p>{t("whyChoose.text.description")}</p>
                                <div className="row" data-aos="fade-up" data-aos-delay="150">
                                    <div className="col-6 left-list">
                                        <ul>
                                            <li>{t("whyChoose.list.item1")}</li>
                                            <li>{t("whyChoose.list.item2")}</li>
                                            <li>{t("whyChoose.list.item3")}</li>
                                        </ul>
                                    </div>
                                    <div className="col-6 right-list">
                                        <ul>
                                            <li>{t("whyChoose.list.item4")}</li>
                                            <li>{t("whyChoose.list.item5")}</li>
                                            <li>{t("whyChoose.list.item6")}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="back" data-aos="fade-in"></div>
            </div>
        </div>
    );
}

export default WhyChoose;
