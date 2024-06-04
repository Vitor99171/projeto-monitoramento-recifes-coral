# Importa as bibliotecas necessárias do Flask e de suas extensões
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import subprocess
from pathlib import Path
import traceback

# Inicializa a aplicação Flask
app = Flask(__name__)

# Permite requisições Cross-Origin Resource Sharing (CORS)
CORS(app)

# Define o diretório para o upload de arquivos
UPLOAD_FOLDER = 'uploads'
RESULT_FOLDER = 'static/results'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Função para verificar se o tipo de arquivo é permitido
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Rota para receber e processar o upload de imagens
@app.route('/upload', methods=['POST'])
def upload_image():
    try:
        # Verifica se foi enviado um arquivo na requisição
        if 'image' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['image']
        # Verifica se o arquivo selecionado é vazio
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        # Verifica se o tipo de arquivo é permitido
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = Path(app.config['UPLOAD_FOLDER']) / filename
            file.save(file_path)

            # Comando para executar a detecção de objetos na imagem usando YOLOv5
            command = f"python yolov5/detect.py --weights models/best.pt --img 640 --source \"{file_path}\" --save-txt --save-conf --project static/results --name {file_path.stem} --exist-ok"
            print(f"Running command: {command}")

            try:
                # Executa o comando no shell e captura a saída
                result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
                print(f"Command stdout: {result.stdout}")
                print(f"Command stderr: {result.stderr}")
            except subprocess.CalledProcessError as e:
                # Captura e imprime erros do subprocesso
                print(f"Subprocess error: {e}")
                print(f"Subprocess stdout: {e.stdout}")
                print(f"Subprocess stderr: {e.stderr}")
                return jsonify({'error': 'Detection failed', 'details': e.stderr}), 500

            # Caminho para a imagem de resultado
            result_image_path = Path(RESULT_FOLDER) / (file_path.stem + '.jpg')
            if not result_image_path.exists():
                return jsonify({'error': 'Result image not found'}), 500

            # Retorna o nome da imagem de resultado
            return jsonify({'result': result_image_path.name})

        return jsonify({'error': 'File not allowed'}), 400
    except Exception as e:
        # Captura e imprime erros inesperados
        print("Unexpected error:", e)
        traceback.print_exc()
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

# Rota para fornecer imagens de resultado
@app.route('/results/<filename>')
def uploaded_file(filename):
    return send_from_directory(RESULT_FOLDER, filename)

# Inicializa o servidor Flask
if __name__ == "__main__":
    # Cria os diretórios de upload e de resultados se não existirem
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    os.makedirs(RESULT_FOLDER, exist_ok=True)
    # Inicia a aplicação Flask em modo de depuração
    app.run(debug=True)