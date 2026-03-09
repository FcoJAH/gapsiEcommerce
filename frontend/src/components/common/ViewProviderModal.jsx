import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Divider, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import api from "../../api/axiosConfig";

const ViewProviderModal = ({ isOpen, onClose, data, onRefresh }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [targetStatus, setTargetStatus] = useState(null);

    const handleStatusChange = async () => {
        try {
            await api.put(`/provedores/${data.id}/status/${targetStatus}`);
            onRefresh();
            setConfirmOpen(false);
            onClose();
        } catch (error) {
            console.error("Error al cambiar estado:", error);
        }
    };

    const confirmAction = (status) => {
        setTargetStatus(status);
        setConfirmOpen(true);
    };

    if (!data) return null;

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ color: '#005BB5', fontWeight: 'bold' }}>
                    Detalles del Proveedor
                </DialogTitle>
                <DialogContent dividers sx={{ maxWidth: '650px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Typography variant="subtitle2" sx={{ color: '#636363' }}>Nombre</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>{data.nombre.toUpperCase()}</Typography>

                        <Divider />

                        <Typography variant="subtitle2" sx={{ color: '#636363' }}>Razón Social</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{data.razonSocial}</Typography>

                        <Typography variant="subtitle2" sx={{ color: '#636363' }}>Dirección</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{data.direccion}</Typography>

                        <Typography variant="subtitle2" sx={{ color: '#636363' }}>Contacto</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{data.contacto}</Typography>

                        <Typography variant="subtitle2" sx={{ color: '#636363' }}>Saldo Actual</Typography>
                        <Typography variant="h6" sx={{ color: '#005BB5' }}>${Number(data.saldo).toFixed(2)}</Typography>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2, flexWrap: 'wrap', gap: 1 }}>
                    <Button onClick={onClose} sx={{ color: '#2C3E50' }}>Cerrar</Button>

                    {/* Botón Pendiente (siempre disponible) */}
                    {data.activo !== 2 && (
                        <Button startIcon={<PendingIcon />} onClick={() => confirmAction(2)} sx={{ color: '#F9A825' }}>
                            Pendiente
                        </Button>
                    )}

                    {/* Botón Desactivar (si está Activo o Pendiente) */}
                    {(data.activo === 1 || data.activo === 2) && (
                        <Button startIcon={<DeleteIcon />} onClick={() => confirmAction(0)} sx={{ color: '#ff3000' }}>
                            Desactivar
                        </Button>
                    )}

                    {/* Botón Activar (si está Inactivo o Pendiente) */}
                    {(data.activo === 0 || data.activo === 2) && (
                        <Button startIcon={<CheckCircleIcon />} onClick={() => confirmAction(1)} sx={{ color: '#2E7D32' }}>
                            Activar
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            {/* Modal de Confirmación Único */}
            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Confirmar acción</DialogTitle>
                <DialogContent>
                    <Typography>
                        ¿Estás seguro de que deseas cambiar el estatus a 
                        **{targetStatus === 2 ? 'PENDIENTE' : targetStatus === 1 ? 'ACTIVO' : 'INACTIVO'}** para el proveedor {data.nombre.toUpperCase()}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
                    <Button onClick={handleStatusChange} color="primary" variant="contained">Confirmar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ViewProviderModal;