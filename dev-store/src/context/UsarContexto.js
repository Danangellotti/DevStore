import Contexto from "./Contexto";
import axios from "axios";
import { useReducer } from "react";
import Reducer from "./Reducer";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push } from "firebase/database";
// Initialize Firebase
export default function UsarContexto(props) {
  const firebaseConfig = {
    apiKey: "AIzaSyAIG2i2DcieQEXy-pzicqkmQamUwjKwc2s",
    authDomain: "dev-store-3a43e.firebaseapp.com",
    projectId: "dev-store-3a43e",
    storageBucket: "dev-store-3a43e.appspot.com",
    messagingSenderId: "247876108096",
    appId: "1:247876108096:web:c1df46f51088fc6fb7c4a5",
    measurementId: "G-DPEWLYNNCW",
  };
  const appp = initializeApp(firebaseConfig);

  const db = getDatabase();
  const refe = ref(db, "productos/");
  const { children } = props;
  const estadoInicial = {
    productos: [],
    carrito: [],
  };
  const [state, dispatch] = useReducer(Reducer, estadoInicial);
  const listameProductos = async () => {
    const res = await axios.get(
      "https://devrockstore-default-rtdb.firebaseio.com/productos.json"
    );
    dispatch({ type: "LISTAME_PRODUCTOS", payload: res.data });
    console.log(res.data, "desde usar contexto");
  };
  const agregarCarrito = (item) => {
    console.log("agregamos a carrito", item);
    dispatch({ type: "AGREGAR_CARRITO", payload: item });
  };
  const eliminarCarrito = (item) => {
    console.log("eliminar carrito", item);
    dispatch({ type: "ELIMINAR_CARRITO", payload: item });
  };
  return (
    <Contexto.Provider
      value={{
        productos: state.productos,
        carrito: state.carrito,
        listameProductos,
        agregarCarrito,
        eliminarCarrito,
        onValue,
        ref,
        db,
        push,
      }}
    >
      {children}
    </Contexto.Provider>
  );
}
