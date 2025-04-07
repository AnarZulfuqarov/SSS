import "./index.scss"
import why from '/src/assets/why.jpeg'
function WhyChoose() {
    return (
        <div id={"whyChoose"}>
            <div className={"container"}>
                <div className={"head"}>
                    <div className={"head-left"}>
                        <hr/>
                        <h4>Biz niyə seçməlisiz?</h4>
                    </div>
                    <div className={"head-right"}>
                        <h1>Bizimlə Daha Etibarlı, Daha Keyfiyyətli</h1>
                    </div>
                </div>
            </div>
            <div className={"whyChoose"}>
                <div className={"container"}>
                    <div className={"row"}>
                        <div className={"col-6"}>
                            <div className={"image"}>
                                <img src={why} alt="why" />
                            </div>
                        </div>
                        <div className={"col-6"}>
                            <div className={"text"}>
                                <h2>Layihələriniz Üçün Təminatımız</h2>
                                <p>Biz hər bir layihəyə yalnız bir iş kimi deyil, məsuliyyət və etibar layihəsi kimi yanaşırıq. Müştəri məmnuniyyətini əsas prioritet kimi qəbul edərək, sizə problemsiz, şəffaf və etibarlı bir əməkdaşlıq vəd edirik.</p>
                                <div className="row">
                                    <div className="col-6 left-list">
                                        <ul>
                                            <li>Vaxtında Təslim</li>
                                            <li>Vaxtında Təslim</li>
                                            <li>Vaxtında Təslim</li>
                                        </ul>
                                    </div>

                                    <div className="col-6 right-list">
                                        <ul>
                                            <li>Vaxtında Təslim</li>
                                            <li>Vaxtında Təslim</li>
                                            <li>Vaxtında Təslim</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"back"}></div>
            </div>

        </div>
    );
}

export default WhyChoose;