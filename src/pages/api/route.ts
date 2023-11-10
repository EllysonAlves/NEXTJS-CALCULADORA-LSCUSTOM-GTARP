import { NextApiRequest, NextApiResponse } from 'next';
import {google} from 'googleapis';

type SheetForm = {
    costumizador: string
    tipo: number
    quantidade: number
    imgVeiculo: string
    imgOS: string
    imgComprovante: string
    valorEmpresa: number
    valorMaoDeObra: number
    result: number    
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    
    const body = req.body as SheetForm;
    try {
      // preparar auth
      
      const auth = new google.auth.GoogleAuth( {
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        },
        scopes: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/spreadsheets'
        ]
      });

      const sheets = google.sheets({
        auth,
        version: 'v4'
      });

      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'A1:F1',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [
                [body.costumizador,`=IFS(${body.tipo}=1800;"S";${body.tipo}=1400;"A";${body.tipo}=1250;"B";${body.tipo}=940;"C";${body.tipo}=720;"D";${body.tipo}=1260;"M")`,body.quantidade,`=IMAGE("${body.imgVeiculo}")`,`=IMAGE("${body.imgOS}")`,`=IMAGE("${body.imgOS}")`,body.valorEmpresa,body.valorMaoDeObra,body.result]
            ]
        }
        
      });
      console.log('Resposta da API:', response.data);
      
      // Realize a lógica de processamento do formulário, como salvar os dados em um banco de dados
      // Simule uma resposta bem-sucedida
      res.status(200).json({ message: 'Formulário enviado com sucesso', data: response.data});
    } catch (error) {
      // Em caso de erro, envie uma resposta de erro
      
      res.status(500).json({ error: 'Erro no servidor' });
    }
  } else {
    // Se a solicitação não for do tipo POST, retorne um erro de método não permitido
    res.status(405).json({ error: 'Método não permitido' });
  }
};