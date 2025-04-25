import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';

const Admin = () => {
  // Hooks que siempre se ejecutan
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    stock: '',
    discount: '0'
  });
  const [editingId, setEditingId] = useState(null);

  // Verificación de admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const adminStatus = userDoc.data().isAdmin;
          setIsAdmin(adminStatus);
          if (!adminStatus) {
            navigate('/');
          }
        } else {
          navigate('/');
        }
      } else {
        navigate('/login');
      }
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading, navigate]);

  // Obtener productos solo si es admin
  useEffect(() => {
    const fetchProducts = async () => {
      if (isAdmin) {
        try {
          const querySnapshot = await getDocs(collection(db, 'products'));
          const productsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProducts(productsList);
        } catch (error) {
          console.error('Error al obtener productos:', error);
        }
      }
    };

    fetchProducts();
  }, [isAdmin]);

  // Si no es admin o está cargando, no mostrar nada
  if (loading || !isAdmin) {
    return null;
  }

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Crear o actualizar producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Calcular el precio con descuento
      const priceWithDiscount = formData.discount > 0 
        ? formData.price * (1 - formData.discount / 100)
        : formData.price;

      const productData = {
        ...formData,
        price: priceWithDiscount,
        originalPrice: formData.price // Guardamos el precio original
      };

      if (editingId) {
        // Actualizar producto
        const productRef = doc(db, 'products', editingId);
        await updateDoc(productRef, productData);
        setEditingId(null);
      } else {
        // Crear nuevo producto
        await addDoc(collection(db, 'products'), productData);
      }
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
        stock: '',
        discount: '0'
      });
      fetchProducts();
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  // Eliminar producto
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        fetchProducts();
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  // Editar producto
  const handleEdit = (product) => {
    setFormData(product);
    setEditingId(product.id);
  };

  return (
    <div className="px-22 py-8">
      <h2 className="flex justify-center font-semibold text-3xl mb-8 text-[#1C2838]">Administración de Productos</h2>
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-8 bg-[#D6DEE8] p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-[#1C2838]">
          {editingId ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1C2838]">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-[#1C2838]/20 bg-white px-4 py-2 text-[#1C2838] focus:border-[#1C2838] focus:outline-none focus:ring-1 focus:ring-[#1C2838] transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1C2838]">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-[#1C2838]/20 bg-white px-4 py-2 text-[#1C2838] focus:border-[#1C2838] focus:outline-none focus:ring-1 focus:ring-[#1C2838] transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1C2838]">Categoria</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-[#1C2838]/20 bg-white px-4 py-2 text-[#1C2838] focus:border-[#1C2838] focus:outline-none focus:ring-1 focus:ring-[#1C2838] transition-all"
              required
            >
              <option value="Camisetas">Camisetas</option>
              <option value="Jeans">Jeans</option>
              <option value="Joggers">Joggers</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1C2838]">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-[#1C2838]/20 bg-white px-4 py-2 text-[#1C2838] focus:border-[#1C2838] focus:outline-none focus:ring-1 focus:ring-[#1C2838] transition-all h-12"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1C2838]">URL de la imagen</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-[#1C2838]/20 bg-white px-4 py-2 text-[#1C2838] focus:border-[#1C2838] focus:outline-none focus:ring-1 focus:ring-[#1C2838] transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1C2838]">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border-2 border-[#1C2838]/20 bg-white px-4 py-2 text-[#1C2838] focus:border-[#1C2838] focus:outline-none focus:ring-1 focus:ring-[#1C2838] transition-all"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#1C2838]">Descuento (%)</label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              min="0"
              max="100"
              className="mt-1 block w-full rounded-lg border-2 border-[#1C2838]/20 bg-white px-4 py-2 text-[#1C2838] focus:border-[#1C2838] focus:outline-none focus:ring-1 focus:ring-[#1C2838] transition-all"
            />
          </div>
        </div>
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="bg-[#1C2838] text-white px-6 py-2 rounded-lg hover:bg-[#1C2838]/90 transition-all font-medium"
          >
            {editingId ? 'Actualizar' : 'Agregar'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({
                  name: '',
                  price: '',
                  description: '',
                  image: '',
                  stock: '',
                  discount: '0'
                });
              }}
              className="bg-white text-[#1C2838] border-2 border-[#1C2838] px-6 py-2 rounded-lg hover:bg-[#1C2838]/5 transition-all font-medium"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* Tabla de productos */}
      <div className='flex flex-col gap-4 my-24'>
        <div className='flex justify-start'>
          <h2 className="text-3xl font-semibold text-[#1C2838]">Productos</h2>
        </div>
        <div className="rounded-xl shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-[#1C2838]/20">
            <thead className="bg-[#1C2838]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Nombre</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Precio Original</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Descuento</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Precio con Descuento</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#1C2838]/20">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[#D6DEE8]/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-[#1C2838]">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#1C2838]">${product.originalPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#1C2838]">{product.discount > 0 ? `${product.discount}%` : '0%'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#1C2838]">${product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#1C2838]">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-[#1C2838]">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-[#1C2838] hover:text-[#1C2838]/80 mr-4 transition-colors"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-700 transition-colors"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;