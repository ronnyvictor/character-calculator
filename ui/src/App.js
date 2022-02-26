import { createContext, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'
import Form from './components/Form';
import Results from './components/Results';
import './App.css';

export const CalculationContext = createContext()

function App() {
  return (
    <>
   <Form />
    </>
  );
}

export default App;
