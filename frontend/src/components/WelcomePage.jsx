import React from 'react';
import { useState } from 'react';
import ModalInfo from './common/ModalInfo';

const WelcomePage = () => {
    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#ffffff'
        },
        card: {
            borderRadius: '8px',
            backgroundColor: '#fafafa',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            width: '500px'
        },
        logo: {
            width: '100px',
            marginBottom: '20px',
            marginTop: '20px'
        },
        button: {
            backgroundColor: '#008CBA',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginsize: '20px'
        },
        superior: {
            padding: '0px',
            backgroundColor: '#f2f2f2',
            height: '5vh',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid #ddd',
            justifyContent: 'space-between'
        },
        version: {
            margin: '20px',
            color: '#888',
            fontSize: '12px',
            display: 'flex',
            backgroundColor: '#ffffff',
            justifyContent: 'end'
        },
        aboutButton: {
            backgroundColor: '#f2f2f2',
            border: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '40px',
        }
    };

    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.superior}>
                    <h3 style={{ marginLeft: '40px', color: '#9c9c9c', justifyContent: 'start' }}>e-Commerce Gapsi</h3>
                    <button onClick={() => { setShowModal(true) }} style={styles.aboutButton}>︙</button>
                </div>
                <img src="../welcome.png" alt="Welcome" style={styles.logo} />
                <h2 style={{ color: '#9c9c9c' }}>Bienvenido Candidato 01</h2>
                <button style={styles.button} onClick={() => alert('¡Bienvenido a la plataforma de e-Commerce Gapsi!')}>Continuar</button>
                <div style={styles.version}>
                    <p style={{ marginRight: '10px' }}>version 0.0.1</p>
                </div>

                {showModal && (
                    <ModalInfo
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        title="Acerca de">
                        <p>Desarrollo para examente técnico.</p>
                        <p>Versión 0.0.1 - Desarrollado para Gapsi</p>
                    </ModalInfo>
                )}
            </div>
        </div>
    );
};
export default WelcomePage;
