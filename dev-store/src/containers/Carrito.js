import React, { useContext } from "react";
import "../assets/css/Carrito.css";
import ItemCarrito from "../components/ItemCarrito";
import Contexto from "../context/Contexto";

export default function Carrito() {
  const { carrito, eliminarCarrito, db, ref, push } = useContext(Contexto);
  const refe = ref(db, "compritas/");
  const guardar = () => {
    push(refe, carrito);
  };
  return (
    <>
      <div className="carrito">
        <div className="carrito-listadito">
          {carrito.map((item, i) => (
            <ItemCarrito
              {...item}
              key={i}
              eliminarCarrito={eliminarCarrito}
            ></ItemCarrito>
          ))}
        </div>

        <div className="carrito-precio">
          Total a pagar <br />
          <strong>U$D 3400</strong>
        </div>
      </div>
      <button onClick={guardar}>COMPRAR</button>
    </>
  );
}
