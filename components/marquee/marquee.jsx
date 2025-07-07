import React from 'react';
import { Box } from '@mui/material';

const marquee = ({ speed = 8 }) => {
  const marqueeItems = ["GIVE", "SHARE", "HELP", "CARE", "HOPE", "LOVE"];
  
  return (
    <Box sx={{
      width: '50%',
      overflow: 'hidden',
      position: 'relative',
      py: 4,
      mx: 'auto',
    }}>
      <Box sx={{
        display: 'flex',
        width: 'max-content',
        animation: `scroll ${speed}s linear infinite`,
        '@keyframes scroll': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      }}>
        {[...marqueeItems, ...marqueeItems].map((item, index) => (
          <Box 
            key={index}
            component="p"
            sx={{
              color: '#147d06', // Changed to match your heading color
              fontFamily: 'var(--font-marquee)',
              fontWeight: 600,
              fontSize: '2rem',
              mx: 4,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              letterSpacing: '0.8px',
              textTransform: 'uppercase'
            }}
          >
            {item}
          </Box>
        ))}
      </Box>
      
      {/* Gradient fade effects */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '100px',
        background: 'linear-gradient(to right, white, transparent)',
        zIndex: 2
      }} />
      <Box sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: '100px',
        background: 'linear-gradient(to left, white, transparent)',
        zIndex: 2
      }} />
    </Box>
  );
};

export default marquee;