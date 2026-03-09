import React, { useState } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    Button, TextField, Box, Alert, Typography 
} from '@mui/material';
import api from '../../api/axiosConfig';

const AddProviderModal = ({ isOpen, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        nombre: '', razonSocial: '', detalles: '', 
        direccion: '', contacto: '', saldo: ''
    });
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            await api.post('/provedores/create', formData);
            onRefresh();
            onClose();
        } catch (err) {
            // Capturar errores en consola sin mostrarlo
            if (err.response && err.response.data) {
                setError(err.response.data); 
            } else {
                setError("Error al registrar el proveedor.");
            }
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ color: '#005BB5', fontWeight: 'bold' }}>
                Agregar Nuevo Proveedor
            </DialogTitle>
            
            <DialogContent dividers sx={{ maxWidth: '650px' }}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField label="Nombre" fullWidth onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
                    <TextField label="Razón Social" fullWidth onChange={(e) => setFormData({...formData, razonSocial: e.target.value})} />
                    <TextField label="Detalles" fullWidth multiline rows={2} onChange={(e) => setFormData({...formData, detalles: e.target.value})} />
                    <TextField label="Dirección" fullWidth onChange={(e) => setFormData({...formData, direccion: e.target.value})} />
                    <TextField label="Contacto" fullWidth onChange={(e) => setFormData({...formData, contacto: e.target.value})} />
                    <TextField label="Saldo" type="number" fullWidth onChange={(e) => setFormData({...formData, saldo: parseFloat(e.target.value)})} />
                </Box>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} sx={{ color: '#2C3E50' }}>Cancelar</Button>
                <Button 
                    onClick={handleSubmit} 
                    variant="contained" 
                    sx={{ backgroundColor: '#005BB5', '&:hover': { backgroundColor: '#004488' } }}
                >
                    Guardar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProviderModal;