import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Home from "./components/Home/Home";
import DoctorHome from "./components/DoctorHome/DoctorHome";
import DoctorBooking from "./components/Booking/DoctorBooking";
import BookingSuccess from "./components/Booking/BookingSuccess";
import BookingInvoice from "./components/Booking/BookingInvoice";
import DoctorProfile from "./components/Doctor/DoctorProfile/DoctorProfile";
import Appointments from "./components/Doctor/Appointments/Appointments";
import MyPatients from "./components/Doctor/MyPatients/MyPatients";
import Reviews from "./components/Doctor/Reviews/Reviews";
import Schedule from "./components/Doctor/Schedule/Schedule";
import ProfileSetting from "./components/Doctor/ProfileSetting/ProfileSetting";
import ChangePassword from "./components/Doctor/ChangePassword/ChangePassword";

// Admin Components
import AdminDashboard from "./components/Admin/Dashboard";
import AdminAppointments from "./components/Admin/Appointments";
import Doctors from "./components/Admin/Doctors";
import Patients from "./components/Admin/Patients";
import AdminPrescription from "./components/Admin/adminPrescription";
import AdminBlogs from "./components/Admin/AdminBlog";
import AdminReviews from "./components/Admin/Reviews";
import AddNewDoctor from "./components/Admin/AddDoctor";
import AdminContacts from "./components/Admin/Contacts";
import PatientFavouriteDoctor from "./components/Doctor/PatientFavourite/PatientFavourite";
import DoctorInvoice from "./components/Doctor/Invoice/DoctorInvoice";
import SearchDoctor from "./components/Doctor/SearchDoctor/SearchDoctor";
import Blogs from "./components/Doctor/Blogs/Blogs";
import BlogsEdit from "./components/Doctor/Blogs/BlogsEdit";
import AddBlog from "./components/Doctor/Blogs/AddBlog";
import Blog from "./components/Blog/Blog";
import BlogDetails from "./components/Blog/BlogDetails";
import Contact from "./components/Contact";
import About from "./components/About";

// import AppointmentPage from "./components/Appointment/AppointmentPage";
import TrackAppointment from "./components/TrackAppointment/TrackAppointment";
import Treatment from "./components/Doctor/Treatment/Treatment";
import Prescription from "./components/Doctor/Prescription/Prescription";
import PrescriptionView from "./components/Doctor/Prescription/PrescriptionView";
import TreatmentEdit from "./components/Doctor/Treatment/TreatmentEdit";
import ViewAppointment from "./components/Doctor/Appointments/ViewAppointment";
import ForgotPassword from "./components/Login/ForgotPassword";
import Dashboard from "./components/Doctor/Dashboard/Dashboard";
import PatientMedicalHistory from "./components/Doctor/PatientHistory/PatientMedicalHistory";
import PrivateOutlet from "./components/Shared/PrivateOutlet";
import NotFound from "./components/UI/NotFound";
import Login from "./components/Login/Login";

import Reports from "./components/Patient/Reports";
import DoctorRequest from "./components/Admin/DoctorRequest";

import ReactGA from "react-ga4";
ReactGA.initialize("G-1XJ4G1HEG1");

function App() {
  return (
    <>
      <Router>
        {/* For SEO */}
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Nirog Sathi: Video Consultations, Book Appointments & More
          </title>
          <meta
            name="title"
            content="Nirog Sathi: Video Consultations, Book Appointments & More"
          />
          <meta
            name="description"
            content="Book appointments with top doctors, access digital health records, and manage prescriptions online."
          />
          <meta
            name="keywords"
            content="Book doctor appointments, Digital health records, Online doctor consultations, Healthcare platform, Nirog Sathi healthcare, Connect with top doctors, Digital Health Solutions"
          />
          <link rel="canonical" href="https://nirogsathi.com/" />
        </Helmet>

        <Routes>
          {/* Dashboard Routs */}
          <Route element={<PrivateOutlet />}>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/dashboard/appointments" element={<Appointments />} />

            <Route
              path="/dashboard/appointments/:id"
              element={<ViewAppointment />}
            />
            <Route
              path="/dashboard/appointment/treatment/:id"
              element={<Treatment />}
            />
            <Route
              path="/dashboard/appointment/treatment/edit/:id"
              element={<TreatmentEdit />}
            />
            <Route path="/dashboard/my-patients" element={<MyPatients />} />
            <Route
              path="/dashboard/patient-medical-history"
              element={<PatientMedicalHistory />}
            />
            <Route path="/dashboard/prescription" element={<Prescription />} />
            <Route
              path="/dashboard/prescription/:id"
              element={<PrescriptionView />}
            />
            <Route path="/dashboard/schedule" element={<Schedule />} />
            <Route path="/dashboard/invoices" element={<DoctorInvoice />} />
            <Route path="/dashboard/reviews" element={<Reviews />} />
            <Route
              path="/dashboard/profile-setting"
              element={<ProfileSetting />}
            />
            <Route path="/dashboard/blogs" element={<Blogs />} />
            <Route path="/dashboard/blogs/:id" element={<BlogsEdit />} />
            <Route path="/dashboard/blogs/create" element={<AddBlog />} />
            <Route
              path="/dashboard/change-password"
              element={<ChangePassword />}
            />

            {/* For Patient dashboard */}
            <Route
              path="/dashboard/favourite"
              element={<PatientFavouriteDoctor />}
            />
            <Route path="/dashboard/reports" element={<Reports />} />
          </Route>

          {/* Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/digital-doctors" element={<DoctorHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/doctors" element={<SearchDoctor />} />
          <Route path="/doctors/profile/:id" element={<DoctorProfile />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/track-appointment" element={<TrackAppointment />} />
          <Route
            path="/reset-password/:userId/:uniqueString"
            element={<ForgotPassword />}
          />
          {/* <Route path="/appointment" element={<AppointmentPage />} /> */}

          <Route path="/booking/:doctorId" element={<DoctorBooking />} />
          <Route path="/booking/success/:id" element={<BookingSuccess />} />
          <Route path="/booking/invoice/:id" element={<BookingInvoice />} />

          {/* Admin Dashboard  */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/doctor-requests" element={<DoctorRequest />} />

          <Route path="/admin/appointments" element={<AdminAppointments />} />
          <Route path="/admin/doctors" element={<Doctors />} />
          <Route path="/admin/addDoctor" element={<AddNewDoctor />} />
          <Route path="/admin/patients" element={<Patients />} />
          <Route path="/admin/prescription" element={<AdminPrescription />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/contact" element={<AdminContacts />} />

          {/* Error 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
