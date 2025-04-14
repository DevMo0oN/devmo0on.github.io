document.addEventListener('DOMContentLoaded', () => {
  VANTA.NET({
    el: "#background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 1000.00,
    minWidth: 1000.00,
    scale: 1.00,
    scaleMobile: 0.75,
    color: 0xff1a1a,           
    backgroundColor: 0x1a1a1a,  
    points: 15.00,
    maxDistance: 20.00,
    spacing: 15.00
  });
});
