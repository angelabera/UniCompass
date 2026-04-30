import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create sample colleges
  const colleges = [
    {
      name: 'Indian Institute of Technology (IIT) Bombay',
      location: 'Mumbai, Maharashtra',
      description: 'One of the premier engineering institutes in India, known for its excellent placements and research facilities.',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png',
      imageUrl: 'https://techportal.in/wp-content/uploads/2023/11/iit-bombay.jpg',
      rating: 4.9,
      fees: 250000,
      courses: {
        create: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 250000 },
          { name: 'B.Tech Electrical Engineering', duration: '4 Years', fees: 250000 },
          { name: 'M.Tech Data Science', duration: '2 Years', fees: 150000 }
        ]
      },
      placements: {
        create: [
          { year: 2023, highestPackage: 15000000, averagePackage: 2500000, placementPercentage: 98 },
          { year: 2022, highestPackage: 12000000, averagePackage: 2300000, placementPercentage: 99 }
        ]
      }
    },
    {
      name: 'Delhi Technological University (DTU)',
      location: 'New Delhi, Delhi',
      description: 'Formerly DCE, it is one of the oldest engineering colleges in India with a strong alumni network.',
      logo: 'https://upload.wikimedia.org/wikipedia/en/b/b5/DTU%2C_Delhi_official_logo.png',
      imageUrl: 'https://img.collegepravesh.com/2015/02/Delhi-Technological-University.jpg',
      rating: 4.5,
      fees: 190000,
      courses: {
        create: [
          { name: 'B.Tech Software Engineering', duration: '4 Years', fees: 190000 },
          { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: 190000 }
        ]
      },
      placements: {
        create: [
          { year: 2023, highestPackage: 8200000, averagePackage: 1500000, placementPercentage: 95 },
          { year: 2022, highestPackage: 6400000, averagePackage: 1400000, placementPercentage: 94 }
        ]
      }
    },
    {
      name: 'Birla Institute of Technology and Science (BITS) Pilani',
      location: 'Pilani, Rajasthan',
      description: 'A premier private institute known for its zero-attendance policy and entrepreneurial culture.',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Rqqg60vKbBN3WjdkkXvdO6jR116-4ZV91Q&s',
      rating: 4.8,
      fees: 450000,
      courses: {
        create: [
          { name: 'B.E. Computer Science', duration: '4 Years', fees: 450000 },
          { name: 'B.E. Electronics & Instrumentation', duration: '4 Years', fees: 450000 }
        ]
      },
      placements: {
        create: [
          { year: 2023, highestPackage: 6000000, averagePackage: 2000000, placementPercentage: 97 },
          { year: 2022, highestPackage: 5500000, averagePackage: 1800000, placementPercentage: 96 }
        ]
      }
    },
    {
      name: 'National Institute of Technology (NIT) Trichy',
      location: 'Tiruchirappalli, Tamil Nadu',
      description: 'Ranked consistently as the top NIT in India, offering excellent academics and campus life.',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/49/NIT_Trichy_logo.svg/1200px-NIT_Trichy_logo.svg.png',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9kA_ORDaQ55uW72dg6bzaQwxT8vgMmOPmw&s',
      rating: 4.6,
      fees: 150000,
      courses: {
        create: [
          { name: 'B.Tech Computer Science', duration: '4 Years', fees: 150000 },
          { name: 'B.Tech Production Engineering', duration: '4 Years', fees: 150000 }
        ]
      },
      placements: {
        create: [
          { year: 2023, highestPackage: 5000000, averagePackage: 1200000, placementPercentage: 92 },
          { year: 2022, highestPackage: 4500000, averagePackage: 1100000, placementPercentage: 90 }
        ]
      }
    },
    {
      name: 'Vellore Institute of Technology (VIT)',
      location: 'Vellore, Tamil Nadu',
      description: 'A leading private university known for its massive infrastructure and high placement volume.',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/VIT_Logo.png/1200px-VIT_Logo.png',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXr46q-f-rnvkY7efsuajxc_hQde2l6kKAsg&s',
      rating: 4.3,
      fees: 300000,
      courses: {
        create: [
          { name: 'B.Tech Information Technology', duration: '4 Years', fees: 300000 },
          { name: 'B.Tech Electronics', duration: '4 Years', fees: 300000 }
        ]
      },
      placements: {
        create: [
          { year: 2023, highestPackage: 4000000, averagePackage: 800000, placementPercentage: 90 },
          { year: 2022, highestPackage: 3500000, averagePackage: 750000, placementPercentage: 88 }
        ]
      }
    },
    { name: 'IIT Delhi', location: 'Delhi', description: 'Premier institute with focus on engineering and research.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.9, fees: 240000, courses: { create: [{ name: 'B.Tech Computer Science', duration: '4 Years', fees: 240000 }] }, placements: { create: [{ year: 2023, highestPackage: 14000000, averagePackage: 2400000, placementPercentage: 97 }] } },
    { name: 'IIT Kanpur', location: 'Kanpur, Uttar Pradesh', description: 'Known for strong research programs and placements.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.8, fees: 230000, courses: { create: [{ name: 'B.Tech Mechanical', duration: '4 Years', fees: 230000 }] }, placements: { create: [{ year: 2023, highestPackage: 13000000, averagePackage: 2200000, placementPercentage: 96 }] } },
    { name: 'IIT Madras', location: 'Chennai, Tamil Nadu', description: 'South India\'s leading technical institute.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.8, fees: 235000, courses: { create: [{ name: 'B.Tech Civil', duration: '4 Years', fees: 235000 }] }, placements: { create: [{ year: 2023, highestPackage: 13500000, averagePackage: 2300000, placementPercentage: 96 }] } },
    { name: 'IIT Kharagpur', location: 'Kharagpur, West Bengal', description: 'India\'s first IIT with excellent infrastructure.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.7, fees: 220000, courses: { create: [{ name: 'B.Tech Aerospace', duration: '4 Years', fees: 220000 }] }, placements: { create: [{ year: 2023, highestPackage: 12500000, averagePackage: 2100000, placementPercentage: 95 }] } },
    { name: 'IIT Roorkee', location: 'Roorkee, Uttarakhand', description: 'Historic engineering institute focused on practical learning.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.6, fees: 210000, courses: { create: [{ name: 'B.Tech Chemical', duration: '4 Years', fees: 210000 }] }, placements: { create: [{ year: 2023, highestPackage: 11500000, averagePackage: 1900000, placementPercentage: 94 }] } },
    { name: 'NIT Rourkela', location: 'Rourkela, Odisha', description: 'One of the top NITs with strong placements.', imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1000', rating: 4.4, fees: 140000, courses: { create: [{ name: 'B.Tech IT', duration: '4 Years', fees: 140000 }] }, placements: { create: [{ year: 2023, highestPackage: 4500000, averagePackage: 1100000, placementPercentage: 91 }] } },
    { name: 'NIT Warangal', location: 'Warangal, Telangana', description: 'Leading NIT in South India with good placement records.', imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1000', rating: 4.3, fees: 145000, courses: { create: [{ name: 'B.Tech ECE', duration: '4 Years', fees: 145000 }] }, placements: { create: [{ year: 2023, highestPackage: 4300000, averagePackage: 1000000, placementPercentage: 89 }] } },
    { name: 'NIT Surathkal', location: 'Mangaluru, Karnataka', description: 'Premier NIT known for quality education and placements.', imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1000', rating: 4.5, fees: 160000, courses: { create: [{ name: 'B.Tech Civil', duration: '4 Years', fees: 160000 }] }, placements: { create: [{ year: 2023, highestPackage: 5500000, averagePackage: 1300000, placementPercentage: 93 }] } },
    { name: 'BITS Goa', location: 'Goa', description: 'BITS campus with excellent faculty and research opportunities.', imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1000', rating: 4.7, fees: 460000, courses: { create: [{ name: 'B.E. Mechanical', duration: '4 Years', fees: 460000 }] }, placements: { create: [{ year: 2023, highestPackage: 5800000, averagePackage: 1950000, placementPercentage: 96 }] } },
    { name: 'BITS Hyderabad', location: 'Hyderabad, Telangana', description: 'BITS campus offering diverse engineering programs.', imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1000', rating: 4.6, fees: 455000, courses: { create: [{ name: 'B.E. Chemical', duration: '4 Years', fees: 455000 }] }, placements: { create: [{ year: 2023, highestPackage: 5600000, averagePackage: 1900000, placementPercentage: 95 }] } },
    { name: 'MVIT Bangalore', location: 'Bangalore, Karnataka', description: 'Top private engineering college in Bangalore.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.2, fees: 280000, courses: { create: [{ name: 'B.Tech IT', duration: '4 Years', fees: 280000 }] }, placements: { create: [{ year: 2023, highestPackage: 3200000, averagePackage: 700000, placementPercentage: 87 }] } },
    { name: 'Manipal University', location: 'Manipal, Karnataka', description: 'Deemed university with excellent academic standards.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.4, fees: 320000, courses: { create: [{ name: 'B.Tech Computer Science', duration: '4 Years', fees: 320000 }] }, placements: { create: [{ year: 2023, highestPackage: 3800000, averagePackage: 850000, placementPercentage: 89 }] } },
    { name: 'Amrita Vishwa Vidyapeetham', location: 'Coimbatore, Tamil Nadu', description: 'Educational institution with focus on values and excellence.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.3, fees: 310000, courses: { create: [{ name: 'B.Tech Aerospace', duration: '4 Years', fees: 310000 }] }, placements: { create: [{ year: 2023, highestPackage: 3600000, averagePackage: 800000, placementPercentage: 88 }] } },
    { name: 'SRM Institute of Science and Technology', location: 'Chennai, Tamil Nadu', description: 'Large private engineering institute with global connections.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.1, fees: 290000, courses: { create: [{ name: 'B.Tech ECE', duration: '4 Years', fees: 290000 }] }, placements: { create: [{ year: 2023, highestPackage: 3400000, averagePackage: 750000, placementPercentage: 86 }] } },
    { name: 'Savitribai Phule Pune University', location: 'Pune, Maharashtra', description: 'Historic university with strong academics and infrastructure.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.2, fees: 200000, courses: { create: [{ name: 'B.Tech Mechanical', duration: '4 Years', fees: 200000 }] }, placements: { create: [{ year: 2023, highestPackage: 3100000, averagePackage: 700000, placementPercentage: 85 }] } },
    { name: 'Anna University', location: 'Chennai, Tamil Nadu', description: 'Major technical university with multiple affiliated colleges.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 180000, courses: { create: [{ name: 'B.Tech Civil', duration: '4 Years', fees: 180000 }] }, placements: { create: [{ year: 2023, highestPackage: 2800000, averagePackage: 650000, placementPercentage: 83 }] } },
    { name: 'Delhi University', location: 'New Delhi, Delhi', description: 'Premier university with multiple science and engineering colleges.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.1, fees: 150000, courses: { create: [{ name: 'B.Sc Physics', duration: '3 Years', fees: 150000 }] }, placements: { create: [{ year: 2023, highestPackage: 2500000, averagePackage: 600000, placementPercentage: 80 }] } },
    { name: 'Kalindi College', location: 'New Delhi, Delhi', description: 'Women\'s college offering quality science and commerce education.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 3.9, fees: 120000, courses: { create: [{ name: 'B.A Psychology', duration: '3 Years', fees: 120000 }] }, placements: { create: [{ year: 2023, highestPackage: 1800000, averagePackage: 450000, placementPercentage: 75 }] } },
    { name: 'Ramakrishna Mission Vivekananda College', location: 'Delhi', description: 'Spiritual and educational institution with quality academics.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 110000, courses: { create: [{ name: 'B.Com', duration: '3 Years', fees: 110000 }] }, placements: { create: [{ year: 2023, highestPackage: 1600000, averagePackage: 400000, placementPercentage: 72 }] } },
    { name: 'Madras Christian College', location: 'Chennai, Tamil Nadu', description: 'Historic college with academic excellence and social responsibility.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 130000, courses: { create: [{ name: 'B.A English', duration: '3 Years', fees: 130000 }] }, placements: { create: [{ year: 2023, highestPackage: 2000000, averagePackage: 500000, placementPercentage: 78 }] } },
    { name: 'St. Xavier\'s College', location: 'Mumbai, Maharashtra', description: 'Prestigious Jesuit educational institution.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.3, fees: 140000, courses: { create: [{ name: 'B.Sc Physics', duration: '3 Years', fees: 140000 }] }, placements: { create: [{ year: 2023, highestPackage: 2200000, averagePackage: 550000, placementPercentage: 82 }] } },
    { name: 'Loyola College', location: 'Chennai, Tamil Nadu', description: 'Jesuit institution known for academic excellence.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.2, fees: 135000, courses: { create: [{ name: 'B.Sc Chemistry', duration: '3 Years', fees: 135000 }] }, placements: { create: [{ year: 2023, highestPackage: 2100000, averagePackage: 520000, placementPercentage: 80 }] } },
    { name: 'Miranda House', location: 'New Delhi, Delhi', description: 'Leading women\'s college with excellent academics.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.1, fees: 125000, courses: { create: [{ name: 'B.A English', duration: '3 Years', fees: 125000 }] }, placements: { create: [{ year: 2023, highestPackage: 1900000, averagePackage: 480000, placementPercentage: 77 }] } },
    { name: 'Presidency University', location: 'Bangalore, Karnataka', description: 'Private university with focus on critical thinking.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.2, fees: 250000, courses: { create: [{ name: 'B.A Economics', duration: '3 Years', fees: 250000 }] }, placements: { create: [{ year: 2023, highestPackage: 2400000, averagePackage: 600000, placementPercentage: 81 }] } },
    { name: 'Christ University', location: 'Bangalore, Karnataka', description: 'Autonomous Christian university with global perspective.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.3, fees: 260000, courses: { create: [{ name: 'B.Com Finance', duration: '3 Years', fees: 260000 }] }, placements: { create: [{ year: 2023, highestPackage: 2500000, averagePackage: 620000, placementPercentage: 83 }] } },
    { name: 'Ashoka University', location: 'Sonipat, Haryana', description: 'New generation liberal arts university in India.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.4, fees: 300000, courses: { create: [{ name: 'B.A Psychology', duration: '4 Years', fees: 300000 }] }, placements: { create: [{ year: 2023, highestPackage: 2800000, averagePackage: 700000, placementPercentage: 85 }] } },
    { name: 'Flame University', location: 'Pune, Maharashtra', description: 'New liberal arts and sciences university.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.2, fees: 320000, courses: { create: [{ name: 'B.A Political Science', duration: '4 Years', fees: 320000 }] }, placements: { create: [{ year: 2023, highestPackage: 2600000, averagePackage: 650000, placementPercentage: 84 }] } },
    { name: 'NMIMS Mumbai', location: 'Mumbai, Maharashtra', description: 'Prestigious management and business institute.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.4, fees: 350000, courses: { create: [{ name: 'B.Com Management', duration: '3 Years', fees: 350000 }] }, placements: { create: [{ year: 2023, highestPackage: 3200000, averagePackage: 800000, placementPercentage: 88 }] } },
    { name: 'IIIT Hyderabad', location: 'Hyderabad, Telangana', description: 'Specialized institute for IT education and research.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.7, fees: 280000, courses: { create: [{ name: 'B.Tech IT', duration: '4 Years', fees: 280000 }] }, placements: { create: [{ year: 2023, highestPackage: 4200000, averagePackage: 950000, placementPercentage: 92 }] } },
    { name: 'IIIT Delhi', location: 'New Delhi, Delhi', description: 'Premier IT institute in national capital region.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.6, fees: 275000, courses: { create: [{ name: 'B.Tech Computer Science', duration: '4 Years', fees: 275000 }] }, placements: { create: [{ year: 2023, highestPackage: 4100000, averagePackage: 920000, placementPercentage: 91 }] } },
    { name: 'IIIT Bangalore', location: 'Bangalore, Karnataka', description: 'Leading IT institute with strong tech focus.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.6, fees: 280000, courses: { create: [{ name: 'B.Tech IT', duration: '4 Years', fees: 280000 }] }, placements: { create: [{ year: 2023, highestPackage: 4200000, averagePackage: 950000, placementPercentage: 91 }] } },
    { name: 'PEC Chandigarh', location: 'Chandigarh', description: 'Historic engineering college with research focus.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.3, fees: 160000, courses: { create: [{ name: 'B.Tech Mechanical', duration: '4 Years', fees: 160000 }] }, placements: { create: [{ year: 2023, highestPackage: 3500000, averagePackage: 800000, placementPercentage: 87 }] } },
    { name: 'Thapar University', location: 'Patiala, Punjab', description: 'Premier engineering and research institute.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.4, fees: 240000, courses: { create: [{ name: 'B.Tech Civil', duration: '4 Years', fees: 240000 }] }, placements: { create: [{ year: 2023, highestPackage: 3800000, averagePackage: 860000, placementPercentage: 88 }] } },
    { name: 'UPES Dehradun', location: 'Dehradun, Uttarakhand', description: 'University with focus on energy and environment.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.1, fees: 220000, courses: { create: [{ name: 'B.Tech Petroleum', duration: '4 Years', fees: 220000 }] }, placements: { create: [{ year: 2023, highestPackage: 3200000, averagePackage: 750000, placementPercentage: 84 }] } },
    { name: 'Nirma University', location: 'Ahmedabad, Gujarat', description: 'Educational institution with diverse programs.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.2, fees: 210000, courses: { create: [{ name: 'B.Tech IT', duration: '4 Years', fees: 210000 }] }, placements: { create: [{ year: 2023, highestPackage: 3400000, averagePackage: 790000, placementPercentage: 86 }] } },
    { name: 'DAIICT', location: 'Gandhinagar, Gujarat', description: 'Dhirubhai Ambani Institute of IT and Communication.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.5, fees: 280000, courses: { create: [{ name: 'B.Tech IT', duration: '4 Years', fees: 280000 }] }, placements: { create: [{ year: 2023, highestPackage: 4000000, averagePackage: 900000, placementPercentage: 89 }] } },
    { name: 'IIIT Allahabad', location: 'Allahabad, Uttar Pradesh', description: 'Premier IT institute in North India.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.4, fees: 270000, courses: { create: [{ name: 'B.Tech Computer Science', duration: '4 Years', fees: 270000 }] }, placements: { create: [{ year: 2023, highestPackage: 3900000, averagePackage: 880000, placementPercentage: 88 }] } },
    { name: 'Mumbai University', location: 'Mumbai, Maharashtra', description: 'Historic university with strong science programs.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 130000, courses: { create: [{ name: 'B.Sc Physics', duration: '3 Years', fees: 130000 }] }, placements: { create: [{ year: 2023, highestPackage: 2300000, averagePackage: 580000, placementPercentage: 79 }] } },
    { name: 'Bangalore University', location: 'Bangalore, Karnataka', description: 'Major university with multiple colleges.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 3.9, fees: 120000, courses: { create: [{ name: 'B.A English', duration: '3 Years', fees: 120000 }] }, placements: { create: [{ year: 2023, highestPackage: 2000000, averagePackage: 500000, placementPercentage: 75 }] } },
    { name: 'Osmania University', location: 'Hyderabad, Telangana', description: 'Prestigious university in Hyderabad.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 3.9, fees: 100000, courses: { create: [{ name: 'B.Com', duration: '3 Years', fees: 100000 }] }, placements: { create: [{ year: 2023, highestPackage: 1700000, averagePackage: 420000, placementPercentage: 72 }] } },
    { name: 'Lucknow University', location: 'Lucknow, Uttar Pradesh', description: 'Established university with diverse academic offerings.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 3.8, fees: 80000, courses: { create: [{ name: 'B.A History', duration: '3 Years', fees: 80000 }] }, placements: { create: [{ year: 2023, highestPackage: 1400000, averagePackage: 350000, placementPercentage: 68 }] } },
    { name: 'Patna University', location: 'Patna, Bihar', description: 'Historic university of North India.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 3.7, fees: 75000, courses: { create: [{ name: 'B.Sc Mathematics', duration: '3 Years', fees: 75000 }] }, placements: { create: [{ year: 2023, highestPackage: 1200000, averagePackage: 300000, placementPercentage: 65 }] } },
    { name: 'Banaras Hindu University', location: 'Varanasi, Uttar Pradesh', description: 'Central university with global recognition.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.1, fees: 140000, courses: { create: [{ name: 'B.Tech Engineering', duration: '4 Years', fees: 140000 }] }, placements: { create: [{ year: 2023, highestPackage: 2500000, averagePackage: 600000, placementPercentage: 80 }] } },
    { name: 'Aligarh Muslim University', location: 'Aligarh, Uttar Pradesh', description: 'Central university with diverse academic programs.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 110000, courses: { create: [{ name: 'B.Tech Electronics', duration: '4 Years', fees: 110000 }] }, placements: { create: [{ year: 2023, highestPackage: 2200000, averagePackage: 550000, placementPercentage: 78 }] } },
    { name: 'Jawaharlal Nehru University', location: 'New Delhi, Delhi', description: 'Central university with strong research programs.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.2, fees: 100000, courses: { create: [{ name: 'B.A International Relations', duration: '3 Years', fees: 100000 }] }, placements: { create: [{ year: 2023, highestPackage: 2400000, averagePackage: 600000, placementPercentage: 82 }] } },
    { name: 'University of Hyderabad', location: 'Hyderabad, Telangana', description: 'Central university with strong research orientation.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 105000, courses: { create: [{ name: 'B.Sc Physics', duration: '3 Years', fees: 105000 }] }, placements: { create: [{ year: 2023, highestPackage: 2100000, averagePackage: 530000, placementPercentage: 78 }] } },
    { name: 'Pondicherry University', location: 'Puducherry', description: 'Central university with academic excellence.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 3.8, fees: 90000, courses: { create: [{ name: 'B.Com', duration: '3 Years', fees: 90000 }] }, placements: { create: [{ year: 2023, highestPackage: 1600000, averagePackage: 400000, placementPercentage: 72 }] } },
    { name: 'Gautam Buddha University', location: 'Noida, Uttar Pradesh', description: 'State university with modern infrastructure.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 3.9, fees: 115000, courses: { create: [{ name: 'B.Tech Computer Science', duration: '4 Years', fees: 115000 }] }, placements: { create: [{ year: 2023, highestPackage: 2000000, averagePackage: 490000, placementPercentage: 74 }] } },
    { name: 'Jamia Millia Islamia', location: 'New Delhi, Delhi', description: 'Central university with diverse programs.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 3.9, fees: 95000, courses: { create: [{ name: 'B.Tech Engineering', duration: '4 Years', fees: 95000 }] }, placements: { create: [{ year: 2023, highestPackage: 1800000, averagePackage: 450000, placementPercentage: 71 }] } },
    { name: 'University of Delhi Science Colleges', location: 'New Delhi, Delhi', description: 'Premier science colleges under Delhi University.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.1, fees: 120000, courses: { create: [{ name: 'B.Sc Chemistry', duration: '3 Years', fees: 120000 }] }, placements: { create: [{ year: 2023, highestPackage: 2200000, averagePackage: 560000, placementPercentage: 79 }] } },
    { name: 'Cluster Innovation Centre', location: 'New Delhi, Delhi', description: 'Innovation focused center under Delhi University.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 110000, courses: { create: [{ name: 'B.Tech Applied Technology', duration: '4 Years', fees: 110000 }] }, placements: { create: [{ year: 2023, highestPackage: 2300000, averagePackage: 580000, placementPercentage: 80 }] } },
    { name: 'Ramakrishna Mission Vivekananda Institute of Alumnae', location: 'Kolkata, West Bengal', description: 'Women\'s institute with strong academic foundation.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 3.9, fees: 100000, courses: { create: [{ name: 'B.A English', duration: '3 Years', fees: 100000 }] }, placements: { create: [{ year: 2023, highestPackage: 1700000, averagePackage: 430000, placementPercentage: 73 }] } },
    { name: 'Sri Sivasubramaniya Nadar College of Engineering', location: 'Chennai, Tamil Nadu', description: 'Private engineering college with industry connections.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.2, fees: 250000, courses: { create: [{ name: 'B.Tech Electrical', duration: '4 Years', fees: 250000 }] }, placements: { create: [{ year: 2023, highestPackage: 3300000, averagePackage: 770000, placementPercentage: 85 }] } },
    { name: 'College of Engineering Guindy', location: 'Chennai, Tamil Nadu', description: 'Oldest engineering college in Asia, India.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.3, fees: 180000, courses: { create: [{ name: 'B.Tech Mechanical', duration: '4 Years', fees: 180000 }] }, placements: { create: [{ year: 2023, highestPackage: 3700000, averagePackage: 840000, placementPercentage: 87 }] } },
    { name: 'IIT Guwahati', location: 'Guwahati, Assam', description: 'North East India\'s leading technical institute.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.5, fees: 200000, courses: { create: [{ name: 'B.Tech Computer Science', duration: '4 Years', fees: 200000 }] }, placements: { create: [{ year: 2023, highestPackage: 10000000, averagePackage: 1800000, placementPercentage: 93 }] } },
    { name: 'IIT BHU', location: 'Varanasi, Uttar Pradesh', description: 'IIT as part of Banaras Hindu University.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.4, fees: 195000, courses: { create: [{ name: 'B.Tech Civil', duration: '4 Years', fees: 195000 }] }, placements: { create: [{ year: 2023, highestPackage: 9800000, averagePackage: 1750000, placementPercentage: 92 }] } },
    { name: 'Siksha O Anusandhan', location: 'Bhubaneswar, Odisha', description: 'Deemed to be university with various programs.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 180000, courses: { create: [{ name: 'B.Tech IT', duration: '4 Years', fees: 180000 }] }, placements: { create: [{ year: 2023, highestPackage: 2900000, averagePackage: 680000, placementPercentage: 81 }] } },
    { name: 'NIT Calicut', location: 'Calicut, Kerala', description: 'Top NIT in South India with strong academics.', imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1000', rating: 4.4, fees: 155000, courses: { create: [{ name: 'B.Tech Electronics', duration: '4 Years', fees: 155000 }] }, placements: { create: [{ year: 2023, highestPackage: 4800000, averagePackage: 1150000, placementPercentage: 90 }] } },
    { name: 'ISM Dhanbad', location: 'Dhanbad, Jharkhand', description: 'Premier mining and allied engineering institute.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.2, fees: 170000, courses: { create: [{ name: 'B.Tech Mining', duration: '4 Years', fees: 170000 }] }, placements: { create: [{ year: 2023, highestPackage: 3600000, averagePackage: 820000, placementPercentage: 86 }] } },
    { name: 'National Law School of India University', location: 'Bangalore, Karnataka', description: 'Premier law school with strong legal education.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.4, fees: 180000, courses: { create: [{ name: 'B.A LLB', duration: '5 Years', fees: 180000 }] }, placements: { create: [{ year: 2023, highestPackage: 2500000, averagePackage: 600000, placementPercentage: 88 }] } },
    { name: 'Delhi School of Economics', location: 'New Delhi, Delhi', description: 'Top economics and social science institute.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.3, fees: 130000, courses: { create: [{ name: 'B.A Economics', duration: '3 Years', fees: 130000 }] }, placements: { create: [{ year: 2023, highestPackage: 2300000, averagePackage: 570000, placementPercentage: 85 }] } },
    { name: 'Hindu College', location: 'New Delhi, Delhi', description: 'Historic college affiliated with Delhi University.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 115000, courses: { create: [{ name: 'B.A English', duration: '3 Years', fees: 115000 }] }, placements: { create: [{ year: 2023, highestPackage: 1900000, averagePackage: 480000, placementPercentage: 78 }] } },
    { name: 'Delhi College of Arts and Commerce', location: 'New Delhi, Delhi', description: 'Premier college for arts and commerce in Delhi.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.1, fees: 125000, courses: { create: [{ name: 'B.Com', duration: '3 Years', fees: 125000 }] }, placements: { create: [{ year: 2023, highestPackage: 2100000, averagePackage: 520000, placementPercentage: 80 }] } },
    { name: 'Ramjas College', location: 'New Delhi, Delhi', description: 'Women\'s college with strong academics.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 120000, courses: { create: [{ name: 'B.A Psychology', duration: '3 Years', fees: 120000 }] }, placements: { create: [{ year: 2023, highestPackage: 2000000, averagePackage: 500000, placementPercentage: 79 }] } },
    { name: 'Hans Raj College', location: 'New Delhi, Delhi', description: 'Men\'s college with excellent infrastructure.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.1, fees: 118000, courses: { create: [{ name: 'B.Sc Physics', duration: '3 Years', fees: 118000 }] }, placements: { create: [{ year: 2023, highestPackage: 2150000, averagePackage: 530000, placementPercentage: 81 }] } },
    { name: 'St. Stephen\'s College', location: 'New Delhi, Delhi', description: 'Liberal arts college with strong academics.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.2, fees: 140000, courses: { create: [{ name: 'B.A Philosophy', duration: '3 Years', fees: 140000 }] }, placements: { create: [{ year: 2023, highestPackage: 2400000, averagePackage: 600000, placementPercentage: 83 }] } },
    { name: 'Shri Ram College of Commerce', location: 'New Delhi, Delhi', description: 'Premier commerce college in India.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.3, fees: 145000, courses: { create: [{ name: 'B.Com', duration: '3 Years', fees: 145000 }] }, placements: { create: [{ year: 2023, highestPackage: 2600000, averagePackage: 650000, placementPercentage: 85 }] } },
    { name: 'Rajdhani College', location: 'New Delhi, Delhi', description: 'Science and commerce college under Delhi University.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 110000, courses: { create: [{ name: 'B.Sc Chemistry', duration: '3 Years', fees: 110000 }] }, placements: { create: [{ year: 2023, highestPackage: 1950000, averagePackage: 490000, placementPercentage: 77 }] } },
    { name: 'Ramakrishna Mission Residential College', location: 'Narendrapur, West Bengal', description: 'Residential college with focus on values and excellence.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.1, fees: 135000, courses: { create: [{ name: 'B.Sc Physics', duration: '3 Years', fees: 135000 }] }, placements: { create: [{ year: 2023, highestPackage: 2200000, averagePackage: 550000, placementPercentage: 82 }] } },
    { name: 'Delhi Institute of Advanced Studies', location: 'New Delhi, Delhi', description: 'Institute focused on advanced research and studies.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.1, fees: 160000, courses: { create: [{ name: 'M.A Economics', duration: '2 Years', fees: 160000 }] }, placements: { create: [{ year: 2023, highestPackage: 2700000, averagePackage: 670000, placementPercentage: 87 }] } },
    { name: 'Jamia Hamdard', location: 'New Delhi, Delhi', description: 'University with focus on pharmaceutical and medical sciences.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 200000, courses: { create: [{ name: 'B.Pharm', duration: '4 Years', fees: 200000 }] }, placements: { create: [{ year: 2023, highestPackage: 3200000, averagePackage: 750000, placementPercentage: 84 }] } },
    { name: 'Indraprastha Institute of Information Technology', location: 'New Delhi, Delhi', description: 'IT focused autonomous institute.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.4, fees: 260000, courses: { create: [{ name: 'B.Tech IT', duration: '4 Years', fees: 260000 }] }, placements: { create: [{ year: 2023, highestPackage: 4100000, averagePackage: 920000, placementPercentage: 90 }] } },
    { name: 'Netaji Subhas University of Technology', location: 'New Delhi, Delhi', description: 'Technical institute with strong industry connections.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.2, fees: 185000, courses: { create: [{ name: 'B.Tech Mechanical', duration: '4 Years', fees: 185000 }] }, placements: { create: [{ year: 2023, highestPackage: 3400000, averagePackage: 800000, placementPercentage: 86 }] } },
    { name: 'Ambedkar University Delhi', location: 'New Delhi, Delhi', description: 'Central university with research focus.', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000', rating: 4.0, fees: 125000, courses: { create: [{ name: 'B.A Sociology', duration: '3 Years', fees: 125000 }] }, placements: { create: [{ year: 2023, highestPackage: 2150000, averagePackage: 540000, placementPercentage: 79 }] } },
    { name: 'Jaypee Institute of Information Technology', location: 'Noida, Uttar Pradesh', description: 'Private IT institute with placements focus.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 4.3, fees: 320000, courses: { create: [{ name: 'B.Tech Computer Science', duration: '4 Years', fees: 320000 }] }, placements: { create: [{ year: 2023, highestPackage: 4500000, averagePackage: 1050000, placementPercentage: 89 }] } },
    { name: 'Galgotias University', location: 'Greater Noida, Uttar Pradesh', description: 'Private university with diverse programs.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 3.9, fees: 270000, courses: { create: [{ name: 'B.Tech ECE', duration: '4 Years', fees: 270000 }] }, placements: { create: [{ year: 2023, highestPackage: 3800000, averagePackage: 880000, placementPercentage: 84 }] } },
    { name: 'Shobhit University', location: 'Meerut, Uttar Pradesh', description: 'Private university with good engineering programs.', imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000', rating: 3.8, fees: 250000, courses: { create: [{ name: 'B.Tech IT', duration: '4 Years', fees: 250000 }] }, placements: { create: [{ year: 2023, highestPackage: 3300000, averagePackage: 750000, placementPercentage: 80 }] } }
  ];

  for (const college of colleges) {
    await prisma.college.create({
      data: college
    });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
