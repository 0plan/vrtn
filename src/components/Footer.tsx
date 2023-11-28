import { Link } from 'react-router-dom'

const toggleDark = () => {
    // to something
}
const toggleLocales = () => {
    // do something
}
const Footer = () => {
    return (
        <div>
            Test dynamic routes: <br />
            <Link to="/users/userA">/users/userA</Link>
            <br />
            <Link to="/users/userA/posts/1">/users/userA/posts/1</Link>
            <br />
            <Link to="/users/userA/posts/2">/users/userA/posts/2</Link>
            <br />
            <Link to="/users/userB">/users/userB</Link>
            <br />
            <Link to="/users/userB/posts/1">/users/userB/posts/1</Link>
            <br />
            <Link to="/users/userB/posts/2">/users/userB/posts/2</Link>
        </div>
        // <footer className="bg-white shadow dark:bg-gray-900">
        //     <nav className="text-xl mt-6">
        //         <Link className="icon-btn mx-2" to="/" >
        //             <div className="i-carbon-campsite"/>
        //             title="t('button.home')"
        //         </Link>
        //
        //         <button className="icon-btn mx-2 !outline-none" title="t('button.toggle_dark')" onClick={toggleDark()}>
        //             <div className="i carbon-sun dark:carbon-moon"/>
        //         </button>
        //
        //         <a className="icon-btn mx-2" title="t('button.toggle_langs')" onClick={toggleLocales()}>
        //             <div className="i-carbon-language"/>
        //         </a>
        //
        //         <Link className="icon-btn mx-2" to="/" >
        //             <div className="i-carbon-dicom-overlay"/>
        //             title="t('button.guide')"
        //         </Link>
        //
        //         <a className="icon-btn mx-2" rel="noreferrer" href="https://github.com/socketbear/vue-dev-guide"
        //            target="_blank" title="GitHub">
        //             <div className="i-carbon-logo-github"/>
        //         </a>
        //     </nav>
        // </footer>
    )
}

export default Footer
