import './index.scss'

function Navbar() {

    return (
        <section id={"navbar"}>
            <div className="container">
                <div className={"row"}>
                    <div className={"box col-3 col-md-6 col-sm-12 col-xs-12"}>
                            Salam1
                    </div>
                    <div className={"col-3 col-md-6 col-sm-12 col-xs-12"}>
                        <div className={"box"}>
                            Salam2
                        </div>
                    </div>
                    <div className={"col-3 col-md-6 col-sm-12 col-xs-12"}>
                        <div className={"box"}>
                            Salam3
                        </div>
                    </div>
                    <div className={"col-3 col-md-6 col-sm-12 col-xs-12"}>
                        <div className={"box"}>
                            Salam4
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Navbar;