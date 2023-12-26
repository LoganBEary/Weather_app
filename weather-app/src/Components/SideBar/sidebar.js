import './sidebar.css'

const SideBar = (props) => {

    const plusMinus = props.isToggled ? "-" : "+"
    return(
        <>
        <div className='sidebar-container'>
            <button className="new-search" id="search" onClick={props.togglePop}>{plusMinus}</button>
        </div>

        </>
    )
}

export default SideBar