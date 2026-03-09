import React, { useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Box, Alert, DialogContentText
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import api from '../../api/axiosConfig';

const AddProviderModal = ({ isOpen, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        nombre: '', razonSocial: '', detalles: '',
        direccion: '', contacto: '', saldo: ''
    });
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [errorInfo, setErrorInfo] = useState({ title: '', message: '' });

    const handleSubmit = async () => {
        try {
            await api.post('/provedores/create', {
                ...formData,
                nombre: formData.nombre
            });
            setSuccessOpen(true);
        } catch (err) {
            const responseData = err.response?.data;

            let msg = "Ocurrió un error inesperado.";

            if (typeof responseData === 'string') {
                msg = responseData;
            } else if (responseData && responseData.mensaje) {
                msg = responseData.mensaje;
            }

            setErrorInfo({
                title: err.response?.status === 409 ? 'Proveedor Duplicado' : 'Error de Validación',
                message: msg
            });
            setErrorOpen(true);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ color: '#005BB5', fontWeight: 'bold' }}>Agregar Nuevo Proveedor</DialogTitle>
                <DialogContent dividers sx={{ maxWidth: '650px' }}>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <TextField label="Nombre" fullWidth onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                        <TextField label="Razón Social" fullWidth onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })} />
                        <TextField label="Detalles" fullWidth multiline rows={2} onChange={(e) => setFormData({ ...formData, detalles: e.target.value })} />
                        <TextField label="Dirección" fullWidth onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} />
                        <TextField label="Contacto" fullWidth onChange={(e) => setFormData({ ...formData, contacto: e.target.value })} />
                        <TextField label="Saldo" type="number" fullWidth onChange={(e) => setFormData({ ...formData, saldo: parseFloat(e.target.value) })} />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} sx={{ color: '#2C3E50' }}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: '#005BB5' }}>Guardar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={successOpen} onClose={() => { setSuccessOpen(false); onRefresh(); onClose(); }}>
                <DialogTitle sx={{ color: '#2E7D32', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon /> Registro Exitoso
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>El proveedor <strong>{formData.nombre.toUpperCase()}</strong> fue creado correctamente.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setSuccessOpen(false); onRefresh(); onClose(); }} variant="contained" color="success">Aceptar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={errorOpen} onClose={() => setErrorOpen(false)}>
                <DialogTitle sx={{ color: '#ff3000', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WarningAmberIcon /> {errorInfo.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {errorInfo.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setErrorOpen(false)} variant="contained" sx={{ backgroundColor: '#ff3000' }}>
                        Entendido
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddProviderModal;