import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalInfo from '../common/ModalInfo';
import { Button, IconButton, Typography, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './WelcomePage.css';
import api from '../../api/axiosConfig';

const WelcomePage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [info, setInfo] = useState({ welcome: '', version: '' });

    useEffect(() => {
        const fetchSystemData = async () => {
            try {
                const [resWelcome, resVersion] = await Promise.all([
                    api.get('/system/welcome'),
                    api.get('/system/version')
                ]);
                setInfo({ welcome: resWelcome.data, version: resVersion.data });
            } catch (err) {
                console.error("Error al cargar info del sistema");
            }
        };
        fetchSystemData();
    }, []);

    const fetchSystemData = async () => {
        try {
            const [resWelcome, resVersion] = await Promise.all([
                api.get('/system/welcome'),
                api.get('/system/version')
            ]);
            setInfo({ welcome: resWelcome.data, version: resVersion.data });
        } catch (err) {
            //Errores en caso de que no cargue la información del sistema
            console.error("Detalle del error:", err.response || err);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="superior">
                    <Typography variant="h6" sx={{ marginLeft: '40px', color: '#9c9c9c' }}>
                        e-Commerce Gapsi
                    </Typography>

                    <IconButton
                        onClick={() => setShowModal(true)}
                        sx={{ marginRight: '10px' }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </div>

                <Box sx={{ padding: '20px' }}>
                    <img src="/welcome.png" alt="Welcome" className='logo' />

                    <Typography variant="h4" sx={{ color: '#2C3E50', marginY: '20px' }}>
                        {info.welcome || 'Cargando...'}
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/provedores')}
                        sx={{
                            backgroundColor: '#0099cc',
                            padding: '10px 40px',
                            '&:hover': { backgroundColor: '#004488' }
                        }}
                    >
                        Continuar
                    </Button>
                </Box>

                <div className="version">
                    <Typography variant="caption" sx={{ marginRight: '10px', color: '#888', marginTop: '10px', marginBottom: '10px' }}>
                        {info.version ? `Versión ${info.version}` : 'Cargando...'}
                    </Typography>
                </div>

                <ModalInfo
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    title="Acerca de"
                >
                    <p>Desarrollo para examen técnico.</p>
                    <p>Versión 0.0.1 - Desarrollado para Gapsi</p>
                </ModalInfo>
            </div>
        </div>
    );
};

export default WelcomePage;