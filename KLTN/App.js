import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './View/components/login/Login';
import TeacherLogin from './View/components/login/TeacherLogin';
import ForgotPasswordActivity from './View/ForgotPasswordActivity';
import UpdatePassword from './View/components/update/UpdatePassword';
import Phonghoc from './View/components/phong/Phonghoc';
import AddNewRow from './View/components/add/AddNewRow';
import Edituser from './View//components/user/Edituser';
import AdminLogin from './View/components/login/AdminLogin';
import PhongHocSV from './View/components/phong/PhongHocSV'; // Import PhongHocSV component
import PhongHocGV from './View/components/phong/PhongHocGV'; // Import PhongHocGV component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />{/* Route for the Login page */}
        <Route path="/teacher-login" element={<TeacherLogin />} />{/* Route for the Teacher Login page */}
        <Route path="/phonghocgv" element={<PhongHocGV />} />{/* Route for the PhongHocGV page (teacher classroom schedule) */}
        <Route path="/forgot-password" element={<ForgotPasswordActivity />} />{/* Route for Forgot Password page */}
        <Route path="/update-password" element={<UpdatePassword />} />{/* Route for Update Password page */}
        <Route path="/phonghoc" element={<Phonghoc />} />{/* Route for Phonghoc (classroom management) page */}
        <Route path="/edit-user" element={<Edituser />} />{/* Route for editing user information */}
        <Route path="/add-new-room" element={<AddNewRow />} />{/* Route for adding a new room */}
        <Route path="/admin-login" element={<AdminLogin />} />{/* Route for Admin Login page */}
        <Route path="/phonghocsv" element={<PhongHocSV />} />{/* Route for PhongHocSV (student classroom schedule) page */}
      </Routes>
    </Router>
  );
};

export default App;
