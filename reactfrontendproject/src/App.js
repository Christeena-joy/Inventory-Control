import logo from './logo.svg';
import './App.css';
import Login from './components/auth/Login';
import ContactUs from './components/ContactUs';
import { Navbar } from './components/Navbar';
import { Homecards } from './components/admin/Homecards';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FullFeaturedCrudGrid from './components/user/FullFeaturedCrudGrid';
import ProductDashboard from './components/product/ProductDashboard';
import CategoryDashboard from './components/product/CategoryDashboard';
import SalesDashboard from './components/sales/SalesDashboard';
import SupplierDashboard from './components/supplier/SupplierDashboard';
import PurchasesCrud from './components/purchases/PurchasesCrud';
import About from './components/About';
import BackendDataDashboard from './components/customer/BackendDataDashboard';
import {UserHome} from './components/authuser/UserHome';
import LandingPage from './components/landing/LandingPage';
import { AuthProvider } from './components/auth/AuthProvider';
import { UserHomeDesign } from './components/authuser/UserHomeDesign';
import UserProductDashboard from './components/product/UserProductDashboard';
import CreateDetailedSale from './components/sales/saletransaction/CreateDetailedSale';
import NewSalesDashboard from './components/sales/NewSalesDashboard';
import CreateDetailedPurchase from './components/purchases/CreateDetailedPurchase';

function App() {
  return (
    <AuthProvider>
    <Router>
    <div className='App'>  
    <Routes>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/admin/home" element={<Homecards/>} />
      <Route path="/user/home" element={<UserHomeDesign/>} />
      <Route path="/contactus" element={<ContactUs/>}></Route>
      <Route path="auth/login" element={<Login/>} />
      <Route path="/help" element={<ContactUs />} />
      <Route path="/user" element={<FullFeaturedCrudGrid />} />
      <Route path="/admin/product" element={<ProductDashboard />} />
      <Route path="/user/product" element={<UserProductDashboard />} />
      <Route path="/categories" element={<CategoryDashboard />} />
      <Route path="/sales" element={<NewSalesDashboard />} />
      <Route path="/customer" element={<BackendDataDashboard />} />
      <Route path="/supplier" element={<SupplierDashboard />} />
      <Route path="/purchases" element={<PurchasesCrud/>} />
      <Route path="/about" element={<About />} />
      <Route path="/saletransaction/create" element={<CreateDetailedSale />} />
      <Route path='/purchasetransaction/create' element={<CreateDetailedPurchase/>} />
    </Routes>
    
         
    </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
