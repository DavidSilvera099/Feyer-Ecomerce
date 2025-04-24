import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import registerImg from '../../assets/image-login.avif'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Crear documento del usuario en la colección 'users'
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        isAdmin: false, // Por defecto, los nuevos usuarios no son admin
        createdAt: new Date()
      });

      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está registrado');
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres');
      } else {
        setError('Error al crear la cuenta. Por favor, intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sección de la imagen */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src={registerImg} 
          alt="Ganado" 
          className="w-full h-full object-cover"
        />

      </div>

      {/* Sección del formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-5xl">
              Crear cuenta
            </h2>
            <p className="mt-2 text-md">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-semibold">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-md font-bold">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-subtitle focus:border-transparent transition-all"
                  placeholder="usuario@gmail.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-md font-bold">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-subtitle focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-md font-bold">
                  Confirmar contraseña
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-subtitle focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 text-white bg-[#000000] cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creando cuenta...
                  </span>
                ) : (
                  'Registrarse'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register; 