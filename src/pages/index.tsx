"use client"
import styles from './index.module.css';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export default function Home() {

  

  const [value1, setValue1] = React.useState<number>(0);
  const [value2, setValue2] = React.useState<number>(0);
  
  //const [result, setResult] = React.useState<number>(0);


 
  const handleNumero2Change = (e: SelectChangeEvent) => {
    setValue2(Number(e.target.value));
  };

  const handleNumero1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(Number(e.target.value));
  };

  const result = value1 * value2;
  const valorMecanico = result * 0.35;
  const valorAprendiz = result * 0.30;
  const valorMaquina = result - valorMecanico;
  const valorMaquinaAprendiz = result - valorAprendiz;
  const valorMaoAprendiz = result - valorMaquinaAprendiz;
  const valorMao = result - valorMaquina;


  console.log({value1})
  console.log({value2})
  console.log({result})
  console.log({valorMecanico})
  console.log({valorAprendiz})
  console.log({valorMaquina})
  console.log({valorMao})



  const [vendedor, setVendedor] = React.useState('');
  const [cliente, setCliente] = React.useState('');
  const [imgVeiculo, setImgVeiculo] = React.useState('');
  const [img, setImg] = React.useState('');

  const [formData, setFormData] = React.useState({
    costumizador: '',
    tipo: 0,
    quantidade: 0,
    imgVeiculo: '',
    imgOS: '',
    imgComprovante: '',
    valorEmpresa: null,
    valorMaoDeObra: null,
    result: 0,
    
    
  });

  console.log(formData)

  const handleText1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVendedor(e.target.value);
  };

  const handleText2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente(e.target.value);
  };

  const handleText3Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImgVeiculo(e.target.value);
  };

  const handleText4Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImg(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // validação dos campos
    if (!formData.costumizador || !formData.imgComprovante || !formData.imgVeiculo || !formData.imgOS || !formData.valorEmpresa || !formData.valorMaoDeObra) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    } else {
      const response = await fetch('/api/route', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 405) {
        // Tratar o caso em que o método não é permitido
        console.error('Método não permitido. Verifique a configuração do servidor.');
        alert('Erro no servidor. Tente novamente mais tarde.');
      } else {
        // Continuar como antes
        const content = await response.json();
        console.log(content);
        alert(content.data.tableRange);
        setVendedor('');
        setCliente('');
        setImgVeiculo('');
        setImg('');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Verifica se o campo deve ser tratado como número
    const updatedValue = name === 'tipo' || name === 'quantidade' || name === 'result'
      ? parseFloat(value)
      : value;
  
    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };

  formData.result = result;
  formData.tipo = value2;
  formData.quantidade = value1;
 
  return (
      <main className={styles.main}>

        <div className={styles.containerBox}>

          <div className={styles.box1}>  
            <div className={styles.boxTitulo}>
              <h1>Calculadora Benny's</h1>
            </div>
            <div className={styles.boxInputs1}>            
              <FormControl variant='standard' sx={{ m: 1, width: '25ch' }}>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  type='number'
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={handleNumero2Change}
                  value={String(value2)}
                  name="tipo"
                  label="Age"
                  
                >
                  <strong> CARRO </strong> 
                  <MenuItem value={720}>D</MenuItem>
                  <MenuItem value={940}>C</MenuItem>
                  <MenuItem value={1250}>B</MenuItem>
                  <MenuItem value={1400}>A</MenuItem>
                  <MenuItem value={1800}>S</MenuItem>  
                  <strong> MOTO </strong>   
                  <MenuItem value={1260}>M</MenuItem>       
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: '25ch' }}>
                <TextField
                    value={value1}
                    onChange={handleNumero1Change}
                    id="filled-number"
                    label="Quantidade"
                    name='quantidade'
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
              </FormControl>

            </div>                                                     
          </div>
          <section className={styles.sectionTotal}>
              <div className={styles.boxTotal}>
                <div>
                  <h1>MECANICO</h1>
                  <h2>VALOR TOTAL</h2>
                </div> 
                <div>
                  <p>{result}</p>
                </div>
                <div>
                  <h2>VALOR NA MAQUINA</h2>
                </div> 
                <div>
                  <p>{valorMaquina}</p>
                </div>
                <div>
                  <h2>VALOR NA MÃO</h2>
                </div> 
                <div>
                  <p>{valorMao}</p>
                </div>
              </div> 
              <div className={styles.boxTotalAprendiz}>
                <div>
                  <h1>APRENDIZ</h1>
                  <h2>VALOR TOTAL</h2>
                </div> 
                <div>
                  <p>{result}</p>
                </div>
                <div>
                  <h2>VALOR NA MAQUINA</h2>
                </div> 
                <div>
                  <p>{valorMaquinaAprendiz}</p>
                </div>
                <div>
                  <h2>VALOR NA MÃO</h2>
                </div> 
                <div>
                  <p>{valorMaoAprendiz}</p>
                </div>
              </div> 
          </section>             
        </div>   
        <form className={styles.box2} onSubmit={handleSubmit}>
            <div className={styles.boxTitulo}>
              <h1>Informações do pedido</h1>
            </div>
            <div className={styles.boxInputs2}>
              
              <FormControl sx={{ m: 1, width: '20ch' }}>
                <TextField
                    value={formData.costumizador}
                    onChange={handleInputChange}
                    id="filled-number"
                    label="Nome do Custumizador"
                    name='costumizador'
                    type="text"
                    variant="standard"
                  />
              </FormControl>
              <FormControl sx={{ m: 1, width: '32ch' }}>
                <TextField
                    value={formData.imgVeiculo}
                    onChange={handleInputChange}
                    id="filled-number"
                    label="Link da imagem do veiculo"
                    name='imgVeiculo'
                    type="text"
              
                    variant="standard"
                  />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                    value={formData.imgOS}
                    onChange={handleInputChange}
                    id="filled-number"
                    label="Link da imagem do OS"
                    name='imgOS'
                    type="text"
                    variant="standard"
                  />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                    value={formData.imgComprovante}
                    onChange={handleInputChange}
                    id="filled-number"
                    label="Link da imagem do comprovante"
                    name='imgComprovante'
                    type="text"
                    variant="standard"
                  />
              </FormControl>
              <FormControl sx={{ m: 1, width: '20ch' }}>
                <TextField
                    value={formData.valorEmpresa}
                    onChange={handleInputChange}
                    id="filled-number"
                    label="Valor da maquina"
                    name='valorEmpresa'
                    type="number"
                    variant="standard"
                  />
              </FormControl>
              <FormControl sx={{ m: 1, width: '32ch' }}>
                <TextField
                    value={formData.valorMaoDeObra}
                    onChange={handleInputChange}
                    id="filled-number"
                    label="Valor na mão"
                    name='valorMaoDeObra'
                    type="number"
                    variant="standard"
                  />
              </FormControl>
              <input value={formData.result} type="hidden" name="result" id="" />
              <input value={formData.quantidade} type="hidden" name="quantidade" id="" />
              <input value={formData.tipo} type="hidden" name="tipo" id="" />
            </div>  
            <Button sx={{ mt: 4 }} type="submit" variant="outlined">
                Registrar Pedido
            </Button>      
        </form>

      </main>
  )
}
