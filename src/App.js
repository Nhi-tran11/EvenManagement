
import './App.css';
import Header from './components/Header';
import EventGrid from './components/EventGrid';
import EventDetails from './components/EventDetails';
import BookingForm from './components/BookingForm';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEvent from './components/CreateEvent';
import MyBookings from './components/BookingForm';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<EventGrid />} />
            <Route path="/events" element={<EventGrid />} />
            <Route path="/event-details" element={<EventDetails />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
