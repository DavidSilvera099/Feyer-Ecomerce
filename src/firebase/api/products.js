import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

//Traer todos los productos
export const fetchProducts = async ({ setProducts, setLoading }) => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef);
    const querySnapshot = await getDocs(q);
    const productsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(productsList);
  } catch (error) {
    console.error("Error al obtener productos:", error);
  } finally {
    setLoading(false);
  }
};

// Traer los productos por su Id
export const fetchProduct = async ({ setProduct, setLoading, id }) => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProduct(docSnap.data());
    } else {
      console.log("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
  } finally {
    setLoading(false);
  }
};
