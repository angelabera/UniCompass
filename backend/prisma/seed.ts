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
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1000',
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
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000',
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
      imageUrl: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&q=80&w=1000',
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
      imageUrl: 'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=1000',
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
      imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
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
    }
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
