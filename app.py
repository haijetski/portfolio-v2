from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Carregar variáveis de ambiente
load_dotenv()
 
app = Flask(__name__)

# Configurações de email
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')

        # Criar email
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS  # Email onde você receberá as mensagens
        msg['Subject'] = f'Nova mensagem do portfólio de {name}'

        body = f"""
        Nome: {name}
        Email: {email}
        Mensagem: {message}
        """

        msg.attach(MIMEText(body, 'plain'))

        # Enviar email
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.send_message(msg)

        return jsonify({'message': 'Mensagem enviada com sucesso!'}), 200

    except Exception as e:
        print(f'Erro: {str(e)}')
        return jsonify({'error': 'Erro ao enviar mensagem'}), 500

if __name__ == '__main__':
    app.run(debug=True)