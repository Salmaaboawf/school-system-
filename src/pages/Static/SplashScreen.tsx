// import React from 'react'
import  splashLogo from '../../assets/splashLogo.png'
function SplashScreen() {
  return (
    <div style={styles.container}>
    <img src={splashLogo} alt="" />
  </div>
  )
}
const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      backgroundColor: '#f0f0f0', 
    },
    logo: {
      width: '50px', 
    },
  };
export default SplashScreen


// import React, { useEffect, useState } from "react";
// import logo from "../logo.svg";

// const SplashMessage = () => {
//   return (
//     <div>
//       <img src={splashLogo} className="App-logo" alt="logo" />
//     </div>
//   );
// };

// const withSplashScreen = (WrappedComponent) => {
//   return () => {
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//       const loadData = async () => {
//         try {
//           // Simulate loading time
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//         } catch (err) {
//           console.error(err);
//         } finally {
//           setLoading(false);
//         }
//       };

//       loadData();
//     }, []);

//     if (loading) return <SplashMessage />;
    
//     return <WrappedComponent />;
//   };
// };

// export default withSplashScreen
// https://stackademic.com/blog/creating-a-splash-screen-in-your-react-web-app