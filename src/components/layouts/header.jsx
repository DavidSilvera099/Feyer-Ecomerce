import React, { useState, useEffect } from 'react'
import logo from '../../assets/logo feyer.svg'
import { IoBagOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().isAdmin);
        }
      } else {
        setIsAdmin(false); // Reset isAdmin cuando no hay usuario
      }
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false); // Reset isAdmin inmediatamente al desloguearse
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header>
        <div className='flex justify-between items-center px-22 py-2 shadow-md'>
            <div>
                <Link to="/">
                    <img src={logo} alt="logo" className='w-20 h-20' />
                </Link>
            </div>
            <nav>
                <ul className='flex justify-between items-center gap-8 text-xl font-light'>
                    <li> <Link to="/">Inicio</Link></li>
                    <li> <Link to="/products">Productos</Link></li>
                    <li> <Link to="/offers">Ofertas</Link></li>
                    {isAdmin && <li> <Link to="/admin">Administrador</Link></li>}
                </ul>
            </nav>
            <div className='flex justify-between items-center gap-4'>
                {user && (
                    <Link to="/cart" className="text-3xl cursor-pointer">
                        <IoBagOutline />
                    </Link>
                )}
                {!user ? (
                    <Link to="/login" className="text-2xl cursor-pointer">
                        <FaRegUser />
                    </Link>
                ) : (
                    <button onClick={handleLogout} className="text-2xl cursor-pointer">
                        <FiLogOut />
                    </button>
                )}
            </div>
        </div>
    </header>
  )
}

export default Header