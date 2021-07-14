import './bouncing.css'

export const Bouncing = ({size, color, backgroundColor}) => {
    const bouncing = {
        backgroundColor,
    }
    const circle ={
        width: parseInt(size),
        height: parseInt(size),
        backgroundColor: color,
        borderRadius: "50%"
    }

    return (
        <div className="bouncing" style={bouncing}>
            <div classNames="circle" style={circle}></div>
            <div classNames="circle" style={circle}></div>
            <div classNames="circle" style={circle}></div>
        </div>
    )
}
