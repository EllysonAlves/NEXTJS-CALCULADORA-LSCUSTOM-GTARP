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
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha,styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { purple,yellow,green } from '@mui/material/colors';

export default function Home() {

  

  const [value1, setValue1] = React.useState<number>(0);
  const [value2, setValue2] = React.useState<number>(0);
  
  //const [result, setResult] = React.useState<number>(0);


 
  const handleNumero2Change = (e: SelectChangeEvent) => {
    setValue2(Number(e.target.value));
    updateValores(Number(e.target.value), value1);
  };
  
  const handleNumero1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(Number(e.target.value));
    updateValores(value2, Number(e.target.value));
  };
  
  const updateValores = (tipo: number, quantidade: number) => {
    const result = tipo * quantidade;
    const valorMecanico = result * 0.35;
    const valorAprendiz = result * 0.30;
    const valorMaquina = result - valorMecanico;
    const valorMaquinaAprendiz = result * 0.7; // 70% do valor total
    const valorMaoAprendiz = result - valorMaquinaAprendiz; // Valor na mão do Aprendiz
    const valorMao = result - valorMaquina;
  
    setFormData({
      ...formData,
      valorEmpresa: valorMaquina,
      valorMaoDeObra: valorMao,
    });
  };

  const result = value1 * value2;
  const valorMecanico = result * 0.35;
  const valorAprendiz = result * 0.30;
  const valorMaquina = result - valorMecanico;
  const valorMaquinaAprendiz = result - valorAprendiz; // Aprendiz usa 70% do valor total
  const valorMao = result - valorMaquina;
  const valorMaoAprendiz = result - valorMaquinaAprendiz;


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
    valorEmpresa: 0,
    valorMaoDeObra: 0,
    result: 0,
    
  });


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
  
    const formDataValid = formData.costumizador && formData.imgComprovante && formData.imgVeiculo && formData.imgOS && formData.valorEmpresa && formData.valorMaoDeObra && formData.result;
  
    if (!formDataValid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }

  
    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 405) {
        console.error('Método não permitido. Verifique a configuração do servidor.');
        alert('Erro no servidor. Tente novamente mais tarde.');
        setError(true);
      } else {
        const content = await response.json();
        console.log(content);
        alert('Pedido registrado com sucesso!!');

        setFormData({
          costumizador: '',
          tipo: 0,
          quantidade: 0,
          imgVeiculo: '',
          imgOS: '',
          imgComprovante: '',
          valorEmpresa: 0,
          valorMaoDeObra: 0,
          result: 0,
        });
        setVendedor('');
        setCliente('');
        setImgVeiculo('');
        setImg('');
        
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      setError(true);
    } finally {
      setSuccess(false);
      setLoading(false);
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

  const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
      color: purple[600],
      '&:hover': {
        backgroundColor: alpha(purple[800], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: yellow[600],
      '&:hover': {
        backgroundColor: alpha(yellow[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: yellow[600],
    },
    '& .MuiSwitch-switchBase + .MuiSwitch-track': {
      backgroundColor: purple[600],
    },
  }));

      // button loading submit

      const [loading, setLoading] = React.useState(false);
      const [success, setSuccess] = React.useState(false);
      const [error, setError] = React.useState(false);
      const timer = React.useRef<number>();

      const buttonSx = {
            ...(success && {
              bgcolor:  green[50],
              '&:hover': {
                bgcolor: green[700],
              },
            }),
          };

          React.useEffect(() => {
            return () => {
              clearTimeout(timer.current);
            };
          }, []);

          const handleButtonClick = (event: React.FormEvent) => {
            if (!loading) {
              setSuccess(false);
              setLoading(true);
              setError(false);
          
              handleSubmit(event); // Chama a submissão do formulário passando o evento
            }
          };
          // termina aqui 

      const [checked, setChecked] = React.useState(false);
      
      const [myData, setMyData] = React.useState<number>(0);

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
      
        let newValorEmpresa = 0;
        let newValorMaoDeObra = 0;
      
        if (!event.target.checked) {
          // se for mecânico
          newValorEmpresa = valorMaquina;
          newValorMaoDeObra = valorMao;
          setMyData(1); // Altera myData para 1
        } else {
          // se for aprendiz
          newValorEmpresa = valorMaquinaAprendiz;
          newValorMaoDeObra = valorMaoAprendiz;
          setMyData(2); // Altera myData para 2
        }
      
        setFormData({
          ...formData,
          valorEmpresa: newValorEmpresa,
          valorMaoDeObra: newValorMaoDeObra,
        });
      
        console.log(`valor da valorEmpresa é ${newValorEmpresa}`);
        console.log(`valor da valorMaoDeObra é ${newValorMaoDeObra}`);
      };

      console.log(`valor da valorEmpresa é ${formData.valorEmpresa}`);
      console.log(`valor da valorEmpresa é ${formData.valorMaoDeObra}`);
      console.log(`valorMaquina: ${valorMaquina}`);
      console.log(`valorMao: ${valorMao}`);
      console.log(`valorMaquinaAprendiz: ${valorMaquinaAprendiz}`);
      console.log(`valorMaoAprendiz: ${valorMaoAprendiz}`);

  return (
      <main className={styles.main}>

        <div className={styles.containerBox}>

          <div className={styles.box1}>  
            <div className={styles.boxTitulo}>
              <h1>Calculadora Los Santos Customs  </h1>
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
                  <h1>CUSTOMIZADOR</h1>
                  <h2>VALOR TOTAL</h2>
                </div> 
                <div>
                  <p>${result}</p>
                </div>
                <Divider />
                <Divider />
                <Divider />
                <div>
                  <h2>VALOR NA MAQUINA</h2>
                </div> 
                <div>
                  <p>${valorMaquina}</p>
                </div>
                <Divider />
                <Divider />
                <Divider />
                <div>
                  <h2>VALOR NA MÃO</h2>
                </div> 
                <div>
                  <p>${valorMao}</p>
                </div>
              </div> 
              <div className={styles.boxTotalAprendiz}>
                <div>
                  <h1>APRENDIZ</h1>
                  <h2>VALOR TOTAL</h2>
                </div> 
                <div>
                  <p>${result}</p>
                </div>
                <Divider />
                <Divider />
                <Divider />
                <div>
                  <h2>VALOR NA MAQUINA</h2>
                </div> 
                <div>
                  <p>${valorMaquinaAprendiz}</p>
                </div>
                <Divider />
                <Divider />
                <Divider />
                <div>
                  <h2>VALOR NA MÃO</h2>
                </div> 
                <div>
                  <p>${valorMaoAprendiz}</p>
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
                    label="Nome do Customizador"
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
              <FormControl fullWidth sx={{ m: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ justifyContent: 'center', mb:4 }}>
                  <Typography sx={{ color: 'black' }}>Customizador</Typography>
                  <PinkSwitch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <Typography sx={{ color: 'black' }}>Aprendiz</Typography>
                </Stack>
              </FormControl>
              <input value={formData.result} type="hidden" name="result" id="" />
              <input value={formData.quantidade} type="hidden" name="quantidade" id="" />
              <input value={formData.tipo} type="hidden" name="tipo" id="" />
            </div>   
            <Button
              color="warning"
              variant="outlined"
              sx={buttonSx}
              type="submit"
              disabled={loading}
              onClick={handleButtonClick}
            >
              {loading ? 'Enviando...' : success ? 'Sucesso!' : error ? 'Falha ao Enviar' : 'Registrar Pedido'}
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: 'relative',
                  bottom: '4%',
                  right: '0',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            )}    
        </form>

      </main>
  )
}
