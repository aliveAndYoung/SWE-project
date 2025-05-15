// Mock user data for offline login and demo
export const MOCK_USER = {
  email: 'mockuser@example.com',
  password: 'mockpassword',
  firstName: 'Mock',
  lastName: 'User',
  location: 'Mock City',
  ssn: '123-45-6789',
  dob: '1990-01-01',
  visaCardNumber: '4111111111111111',
  visaExpiry: '12/30',
  visaCW: '123',
  bookings: [
    {
      bookingId: 'mockb1',
      flight: {
        airline: 'MockAir',
        date: '2024-07-01',
        from: 'Mockville',
        to: 'Demo City',
        price: 199,
      },
    },
    {
      bookingId: 'mockb2',
      flight: {
        airline: 'DemoJet',
        date: '2024-08-15',
        from: 'Demo City',
        to: 'Mockville',
        price: 149,
      },
    },
  ],
}; 