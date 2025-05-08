import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Import videos from local src/videos folder
import residential from '../videos/residential.mp4';
import commercial from '../videos/commercial.mp4';
import repair from '../videos/repair.mp4';
import solar from '../videos/solar.mp4';

const projects = [
  {
    id: 1,
    title: 'Modern Residential Roof Installation',
    description: 'Complete roof replacement for a modern home in Austin',
    video: residential,
  },
  {
    id: 2,
    title: 'Commercial Building Roofing',
    description: 'New roofing system for a commercial complex',
    video: commercial,
  },
  {
    id: 3,
    title: 'Roof Repair After Storm Damage',
    description: 'Emergency repair services following severe weather',
    video: repair,
  },
  {
    id: 4,
    title: 'Solar Roof Panel Installation',
    description: 'Integrating solar panels with existing roofing',
    video: solar,
  },
];

const VideoCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="video-carousel">
      <Slider {...settings}>
        {projects.map((project) => (
          <div key={project.id} className="px-3 pb-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-medium">
              <div className="relative">
                <video
                  src={project.video}
                  controls
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default VideoCarousel;
