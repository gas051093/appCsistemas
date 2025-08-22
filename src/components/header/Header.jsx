import './header.scss'
function Header(props) {
    return (
        <>
            <div className='header ps-3'>
                <h1 className='m-0'>{props.title}</h1>
                <p>{ props.subTitle}</p>
            </div>
        </>
    )
}

export default Header