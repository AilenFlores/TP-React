import React, { useState } from 'react';
import Style from './MoviesOrder.module.css';

const MoviesOrder = ({ sortField, setSortField, sortOrder, setSortOrder }) => {
    return (
      <div className={Style.sortContainer}>
        <label>Ordenar por:</label>
        <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
          <option value="">-- Seleccionar --</option>
          <option value="año">Año</option>
          <option value="rating">Rating</option>
        </select>
  
        <label>Orden:</label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
    );
  };
  

export default MoviesOrder;