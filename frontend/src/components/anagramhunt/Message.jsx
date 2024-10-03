
function Message(props) {
    const styles = {
        display: props.message.length !== 0 ? 'block' : 'none',
        backgroundColor: props.message.length !== 0 ? 'greenyellow' : 'white',
        fontSize: 'small',
        fontWeight: '500',
        borderRadius: '4px',
        padding: '20px'
    }
    return (
        <>
            <div style={styles} className="card">
                <div className="card-body">
                    <h6 className="success-message">{props.message}</h6>
                </div>
            </div>
            
        </>

    )
}

export default Message;
