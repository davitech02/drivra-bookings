import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import AdminRoute from '../components/feature/AdminRoute';

const Home = lazy(() => import('../pages/home/page'));
const Properties = lazy(() => import('../pages/properties/page'));
const PropertyDetail = lazy(() => import('../pages/property-detail/page'));
const Checkout = lazy(() => import('../pages/checkout/page'));
const CheckoutConfirmation = lazy(() => import('../pages/checkout/confirmation/page'));
const PaymentFailed = lazy(() => import('../pages/checkout/payment-failed/page'));
const NotFound = lazy(() => import('../pages/NotFound'));
const About = lazy(() => import('../pages/about/page'));
const Contact = lazy(() => import('../pages/contact/page'));
const Terms = lazy(() => import('../pages/terms/page'));
const Privacy = lazy(() => import('../pages/privacy/page'));
const RefundPolicy = lazy(() => import('../pages/refund-policy/page'));
const PaymentSecurity = lazy(() => import('../pages/payment-security/page'));
const Faq = lazy(() => import('../pages/faq/page'));
const Dashboard = lazy(() => import('../pages/dashboard/page'));
const AdminLogin = lazy(() => import('../pages/admin/login/page'));
const AdminDashboard = lazy(() => import('../pages/admin/page'));
const AdminProperties = lazy(() => import('../pages/admin/properties/page'));
const AdminBookings = lazy(() => import('../pages/admin/bookings/page'));
const AdminUsersPage = lazy(() => import('../pages/admin/users/page'));
const AdminPayments = lazy(() => import('../pages/admin/payments/page'));
const AdminContactMessages = lazy(() => import('../pages/admin/contact-messages/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/properties',
    element: <Properties />,
  },
  {
    path: '/properties/:id',
    element: <PropertyDetail />,
  },
  {
    path: '/checkout/:bookingId',
    element: <Checkout />,
  },
  {
    path: '/checkout/confirmation/:bookingId',
    element: <CheckoutConfirmation />,
  },
  {
    path: '/checkout/payment-failed/:bookingId',
    element: <PaymentFailed />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/refund-policy',
    element: <RefundPolicy />,
  },
  {
    path: '/payment-security',
    element: <PaymentSecurity />,
  },
  {
    path: '/faq',
    element: <Faq />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: 'properties',
        element: <AdminProperties />,
      },
      {
        path: 'bookings',
        element: <AdminBookings />,
      },
      {
        path: 'payments',
        element: <AdminPayments />,
      },
      {
        path: 'users',
        element: <AdminUsersPage />,
      },
      {
        path: 'contact-messages',
        element: <AdminContactMessages />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;