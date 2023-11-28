const toggleDark = () => {
    // to something
}
const toggleLocales = () => {
    // do something
}
const toGuide = () => {
    // do something
}
const Footer = () => {
    return (
        <footer className="bg-white shadow dark:bg-gray-900">
            <nav className="text-xl mt-6">
                <div className="i-carbon-campsite"/>
                <a className="icon-btn mx-2 !outline-none" onClick={toggleDark()}>
                    <div className="carbon-sun dark:carbon-moon"/>
                    다크모드
                </a>

                <a className="icon-btn mx-2" onClick={toggleLocales()}>
                    <div i-carbon-language/>
                    언어
                </a>

                <a className="icon-btn mx-2" onClick={toGuide()}>
                    <div i-carbon-dicom-overlay/>
                    가이드
                </a>
                <a className="icon-btn mx-2" rel="noreferrer" href="https://github.com/socketbear/vue-dev-guide"
                   target="_blank" title="GitHub">
                    <div i-carbon-logo-github/>
                </a>
            </nav>
        </footer>
    )
}

export default Footer
