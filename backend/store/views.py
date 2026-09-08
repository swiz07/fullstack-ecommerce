from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Order, Product, Category, Cart, CartItem
from .serializers import ProductSerializer, CategorySerializer, CartSerializer, CartItemSerializer

@api_view(['GET'])
def get_products(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request, id):
    product=Product.objects.get(id=id)
    serializer=ProductSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])  
def get_categories(request):
    categories=Category.objects.all()
    serializer=CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_cart(request):
    cart, created=Cart.objects.get_or_create(user=None)
    serializer=CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
    product_id=request.data.get('product_id')
    product=Product.objects.get(id=product_id)
    cart, created=Cart.objects.get_or_create(user=None)
    item, created=CartItem.objects.get_or_create(cart=cart, product=product)

    if not created:
        item.quantity += 1
        item.save()
    return Response({'message': 'Product added to cart', "cart": CartSerializer(cart).data})    

@api_view(['POST'])
def update_cart_quantity(request):
    item_id=request.data.get('item_id')
    quantity=request.data.get('quantity')

    if not item_id or quantity is None:
        return Response({'error': 'Item ID and quantity are required'}, status=404)

    try:
        item=CartItem.objects.get(id=item_id)
        if int(quantity)<1:
            item.delete()
            return Response({'error': 'Quantity must be at least 1'}, status=404)

        item.quantity=quantity
        item.save()
        serializer=CartItemSerializer(item)
        return Response(serializer.data)
    except CartItem.DoesNotExist:
        return Response({'error':'Cart item not found'}, status=404)

@api_view(['POST'])
def remove_from_cart(request):
    item_id=request.data.get('item_id')
    CartItem.objects.filter(id=item_id).delete()
    return Response({'message': 'Item removed from cart'})

@api_view(['POST'])
def create_order(request):
    try:
        data=request.data
        name=data.get('name')
        address=data.get('address')
        phone=data.get('phone')
        payment_method=data.get('payment_method', 'COD')

        cart =Cart.objects.first()
        if not cart or not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=400)

        total_amount=sum(item.product.price * item.quantity for item in cart.items.all())

        #creates order instance
        order=Order.objects.create(
            user=None,
            total_amount=total_amount,
        )

        #creates order items
        for item in cart.items.all():
            order.items.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price,
            )

        #clears the cart
        cart.items.all().delete()

        return Response({
            "message": "Order created successfully",
            "order_id": order.id,
        })

    except Exception as e:
        return Response({'error': str(e)}, status=500)