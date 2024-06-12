"use client";
import axios from "axios";

const elObjetoMagico = {
  /* propiedades magicas del objeto */
};

const ButtonCompra = () => {
  /* la magia de la compra al back */
  const handdleInput = () => {
    alert("la magia de la compra");
    axios
      .post("la api que me va a pasar joel", elObjetoMagico)
      .then(
        (res) => (window.location.href = res.data.response.body.init_point)
      );
  };
  return (
    <div className="buttonPrimary">
      <button onClick={() => handdleInput()}>button para comprar</button>
    </div>
  );
};

export default ButtonCompra;
