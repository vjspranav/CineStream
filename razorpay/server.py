from urllib import response
from flask import Flask, request
import razorpay

app = Flask(__name__)

# Create an application that creates razorpay order and other things using rest api requests

@app.route('/create_order', methods=['POST'])
def create_order():
    # Get key_id and key_secret from request header
    key_id = request.headers.get('rp_key_id')
    key_secret = request.headers.get('rp_key_secret')
    # Get amount from request body
    amount = str(request.json.get('amount'))
    print(amount)
    # Create razorpay client
    client = razorpay.Client(auth=(key_id, key_secret))

    # reciept from request body
    receipt = request.json.get('receipt')

    # Create order
    order = client.order.create({'amount': amount, 'currency': 'INR', 'receipt': receipt})

    # response = {
    #     'order_id': order['id'],
    #     'order_status': order['status'],
    #     'order_receipt': order['receipt'],
    #     'order_amount': order['amount'],
    #     'order_currency': order['currency'],
    #     'order_created_at': order['created_at']
    # }

    # return response
    # Return order id
    return order
 
@app.route('/hello', methods=['GET'])
def hello():
    return 'Hello World'


if __name__ == '__main__':
    app.run(debug=True)