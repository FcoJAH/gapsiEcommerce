import React from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    Typography 
} from '@mui/material';

const ModalInfo = ({ isOpen, onClose, title, children }) => {
    return (
        <Dialog 
            open={isOpen} 
            onClose={onClose}
            aria-labelledby="modal-title"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="modal-title" sx={{ color: '#2C3E50', fontWeight: 'bold' }}>
                {title}
            </DialogTitle>

            <DialogContent dividers>
                <Typography variant="body1" component="div" sx={{ color: '#2C3E50' }}>
                    {children}
                </Typography>
            </DialogContent>

            <DialogActions sx={{ padding: '15px' }}>
                <Button 
                    onClick={onClose} 
                    variant="contained" 
                    sx={{ 
                        backgroundColor: '#005BB5', 
                        '&:hover': { backgroundColor: '#004488' } 
                    }}
                >
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalInfo;