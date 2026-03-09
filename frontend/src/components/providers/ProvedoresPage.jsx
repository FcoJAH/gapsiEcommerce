import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Typography,
    Box, CircularProgress, Chip, Button,
} from '@mui/material';
import './ProvedoresPage.css';
import ViewProviderModal from "../common/ViewProviderModal";
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import IconButton from '@mui/material/IconButton';
import TablePagination from '@mui/material/TablePagination';
import AddProviderModal from '../common/AddProviderModal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import Tooltip from '@mui/material/Tooltip';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ProvedoresPage = () => {
    const [provedores, setProvedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openModal, setOpenModal] = useState(false);
    const [selectedProvedor, setSelectedProvedor] = useState(null);
    const [openViewModal, setOpenViewModal] = useState(false);
    const handleView = (provedor) => {
        setSelectedProvedor(provedor);
        setOpenViewModal(true);
    };
    const columns = [
        {
            field: 'activo',
            headerName: 'Estado',
            width: 80,
            align: 'center',
            renderCell: (params) => renderEstadoIcono(params.value)
        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            flex: 1,
            renderCell: (params) => (
                <Typography sx={{ fontWeight: 'bold', color: '#636363', fontSize: '14px' }}>
                    {params.value.toUpperCase()}
                </Typography>
            )
        },
        {
            field: 'razonSocial',
            headerName: 'Razón Social',
            flex: 1.5,
            renderCell: (params) => <span style={{ color: '#636363' }}>{params.value}</span>
        },
        {
            field: 'estatus',
            headerName: 'Estatus',
            width: 130,
            renderCell: (params) => {
                const status = getEstatusLabel(params.row.activo);
                return <Chip label={status.label} color={status.color} size="small" variant="outlined" />;
            }
        },
        {
            field: 'detalles',
            headerName: 'Detalles / Dirección',
            flex: 2,
            renderCell: (params) => (
                <Box sx={{ py: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#636363' }}>{params.row.detalles}</Typography>
                    <Typography variant="caption" sx={{ color: '#636363' }}>{params.row.direccion}</Typography>
                </Box>
            )
        },
        {
            field: 'contacto',
            headerName: 'Contacto',
            width: 120,
            renderCell: (params) => <span style={{ color: '#636363' }}>{params.value}</span>
        },
        {
            field: 'saldo',
            headerName: 'Saldo',
            width: 120,
            renderCell: (params) => (
                <span style={{ fontWeight: 'bold', color: '#636363' }}>
                    ${Number(params.value).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
            )
        },
        {
            field: 'createdAt',
            headerName: 'Fecha Inicio',
            width: 120,
            renderCell: (params) => <span style={{ color: '#636363' }}>{new Date(params.value).toLocaleDateString('es-MX')}</span>
        }
    ];

    const handleDownloadPDF = (provedor) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setTextColor(0, 91, 181);
        doc.text("Reporte de Proveedor", 14, 20);

        doc.setFontSize(12);
        doc.setTextColor(44, 62, 80);
        doc.text(`Proveedor: ${provedor.nombre.toUpperCase()}`, 14, 35);
        doc.text(`Razón Social: ${provedor.razonSocial}`, 14, 42);
        doc.text(`Fecha de Reporte: ${new Date().toLocaleDateString()}`, 14, 49);

        autoTable(doc, {
            startY: 60,
            head: [['Campo', 'Detalle']],
            body: [
                ['Nombre', provedor.nombre],
                ['Razón Social', provedor.razonSocial],
                ['Dirección', provedor.direccion],
                ['Contacto', provedor.contacto],
                ['Saldo', `$${Number(provedor.saldo).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`],
                ['Estatus', getEstatusLabel(provedor.activo).label],
            ],
            headStyles: { fillColor: [0, 91, 181] },
            alternateRowStyles: { fillColor: [248, 249, 250] },
        });

        doc.save(`Proveedor_${provedor.nombre.replace(/\s+/g, '_')}.pdf`);
    };

    const handlePrintAll = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setTextColor(0, 91, 181);
        doc.text("Reporte Completo de Proveedores", 14, 20);

        const tableData = provedores.map(p => [
            p.nombre.toUpperCase(),
            p.razonSocial,
            p.contacto,
            `$${Number(p.saldo).toLocaleString('es-MX', { minimumFractionDigits: 2 })}`,
            p.activo === 1 ? 'Activo' : p.activo === 0 ? 'Inactivo' : 'Pendiente'
        ]);

        autoTable(doc, {
            startY: 30,
            head: [['Nombre', 'Razón Social', 'Contacto', 'Saldo', 'Estatus']],
            body: tableData,
            headStyles: { fillColor: [0, 91, 181] },
            alternateRowStyles: { fillColor: [248, 249, 250] },
        });

        const stringData = doc.output('datauristring');
        const iframe = "<iframe width='100%' height='100%' src='" + stringData + "'></iframe>";
        const x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();
    };

    useEffect(() => {
        api.get('/provedores/all')
            .then(response => {
                setProvedores(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching provedores:', error);
                setLoading(false);
            });
        fetchProvedores();
    }, []);

    const fetchProvedores = async () => {
        setLoading(true);
        try {
            const response = await api.get('/provedores/all');
            setProvedores(response.data);
        } catch (error) {
            console.error('Error al cargar proveedores', error);
        } finally {
            setLoading(false);
        }
    };

    const renderEstadoIcono = (estado) => {
        const colors = { 0: 'red', 1: 'green', 2: 'orange' };
        return (
            <Box
                sx={{
                    width: 12, height: 12, borderRadius: '50%',
                    backgroundColor: colors[estado] || 'grey',
                    margin: 'auto'
                }}
            />
        );
    };

    const getEstatusLabel = (estado) => {
        if (estado === 0) return { label: "Inactivo", color: "error" };
        if (estado === 1) return { label: "Activo", color: "success" };
        return { label: "Pendiente", color: "warning" };
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#F8F9FA', height: '100vh' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <img src="/provedores.png" alt="Logo" style={{ height: '40px', marginRight: '15px' }} />
                <Typography variant="h5" component="h2" sx={{ color: '#6296cc', fontWeight: 'bold' }}>
                    Administración de proveedores
                </Typography>
            </Box>

            <Box sx={{ backgroundColor: 'white', padding: '5px' }}>
                <Box sx={{ display: 'flex', gap: 2, padding: '10px', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <IconButton
                        variant="contained"
                        sx={{
                            backgroundColor: '#0067d3',
                            textTransform: 'none',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            justifyContent: 'center',
                            color: 'white',
                            '&:hover': { backgroundColor: '#004488' }
                        }}
                        onClick={() => setOpenModal(true)}
                    >
                        <AddIcon />
                    </IconButton>
                    Agregar proveedor

                    <IconButton
                        variant="contained"
                        sx={{
                            backgroundColor: '#ff3000',
                            textTransform: 'none',
                            borderRadius: '50px',
                            fontWeight: 'bold',
                            justifyContent: 'center',
                            color: 'white',
                            '&:hover': { backgroundColor: '#7A1400' }
                        }}
                        onClick={() => {handlePrintAll()}}
                    >
                        <PrintIcon />
                    </IconButton>
                    Imprimir elemento
                </Box>

                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, mb: 3, mx: 'auto', width: 'auto', margin: ' 0px 20px 20px 20px' }}>
                    <Table aria-label="tabla proveedores">
                        <TableHead sx={{ backgroundColor: '#eeeeee' }}>
                            <TableRow>
                                <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Estado</TableCell>
                                <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Nombre</TableCell>
                                <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Razón Social</TableCell>
                                <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Estatus</TableCell>
                                <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Detalles / Dirección</TableCell>
                                <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Contacto</TableCell>
                                <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Saldo</TableCell>
                                <TableCell sx={{ color: 'black', fontWeight: 'bold' }}>Fecha Inicio</TableCell>
                                <TableCell sx={{ color: 'black', fontWeight: 'bold' }} align="center">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody
                            sx={{
                                '& tr:nth-of-type(odd)': {
                                    backgroundColor: '#F8F9FA'
                                },
                                '& tr:nth-of-type(even)': {
                                    backgroundColor: '#FFFFFF'
                                }
                            }}
                        >
                            {provedores
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((provedor) => {
                                    const estatus = getEstatusLabel(provedor.activo);
                                    return (
                                        <TableRow key={provedor.id} hover>
                                            <TableCell align="center">{renderEstadoIcono(provedor.activo)}</TableCell>
                                            <TableCell sx={{ fontWeight: '500', color: '#636363' }}>{provedor.nombre.toUpperCase()}</TableCell>
                                            <TableCell sx={{ color: '#636363' }}>{provedor.razonSocial}</TableCell>
                                            <TableCell>
                                                <Chip label={estatus.label} color={estatus.color} size="small" variant="outlined" />
                                            </TableCell>
                                            <TableCell sx={{ color: '#636363' }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{provedor.detalles}</Typography>
                                                    <Typography variant="caption" color="textSecondary">{provedor.direccion}</Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ color: '#636363' }}>{provedor.contacto}</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', color: '#636363' }}>
                                                ${Number(provedor.saldo).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                            </TableCell>
                                            <TableCell sx={{ color: '#636363' }}>
                                                {new Date(provedor.createdAt).toLocaleDateString('es-MX')}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                    <Tooltip title="Imprimir">
                                                        <IconButton size="small" onClick={() => handleDownloadPDF(provedor)}>
                                                            <DownloadIcon sx={{ color: '#005BB5' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Ver detalles">
                                                        <IconButton size="small" onClick={() => handleView(provedor)}>
                                                            <VisibilityIcon sx={{ color: '#F9A825' }} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={provedores.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Filas por página:"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    />
                </TableContainer>
                <AddProviderModal
                    isOpen={openModal}
                    onClose={() => setOpenModal(false)}
                    onRefresh={fetchProvedores}
                />
                <ViewProviderModal
                    isOpen={openViewModal}
                    onClose={() => setOpenViewModal(false)}
                    data={selectedProvedor}
                    onRefresh={fetchProvedores}
                />
            </Box>
        </Box>
    );
};

export default ProvedoresPage;