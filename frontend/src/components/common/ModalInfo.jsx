const ModalInfo = ({ isOpen, onClose, title, children }) => {
    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        modal: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        },
        closeButton: {
            backgroundColor: '#ccc',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer'
        }
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>{title}</h2>
                <div>{children}</div>
                <button onClick={onClose} style={styles.closeButton}>Cerrar</button>
            </div>
        </div>
    );
};

export default ModalInfo;