import {Navigate, Route, Routes} from 'react-router-dom';
import {Box, Container} from '@mui/material';
import {AppLayout} from './layout/AppLayout';
import {RequireAuth} from '@/features/auth/RequireAuth';
import {SignInPage} from '@/features/auth/SignInPage';
import {DashboardPage} from '@/features/dashboard/DashboardPage';
import {EquipmentListPage} from '@/features/equipment/EquipmentListPage';
import {EquipmentFormPage} from '@/features/equipment/EquipmentFormPage';
import {EquipmentViewPage} from '@/features/equipment/EquipmentViewPage';


export default function App() {
    return (
        <Box sx={{ minHeight: '100dvh', display: 'flex' }}>
            <Routes>
                <Route path="/signin" element={<SignInPage />} />

                <Route
                    element={
                        <RequireAuth>
                            <AppLayout />
                        </RequireAuth>
                    }
                >
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />


                    {/* Equipment CRUD */}
                    <Route path="/equipment" element={<EquipmentListPage />} />
                    <Route path="/equipment/new" element={<EquipmentFormPage mode="create" />} />
                    <Route path="/equipment/:id" element={<EquipmentViewPage />} />
                    <Route path="/equipment/:id/edit" element={<EquipmentFormPage mode="edit" />} />
                </Route>


                <Route path="*" element={<Container sx={{ py: 6 }}>Not Found</Container>} />
            </Routes>
        </Box>
    );
}