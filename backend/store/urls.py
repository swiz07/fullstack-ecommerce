from django.urls import path
from . import views

urlpatterns = [
    # Products
    path('products/', views.get_products),
    path('products/<int:id>/', views.get_product),

    # Categories
    path('categories/', views.get_categories),

    # Cart
    path('cart/', views.get_cart),
    path('cart/add/', views.add_to_cart),
    path('cart/remove/', views.remove_from_cart),
    path('cart/update/', views.update_cart_quantity),
    
    #Orders
    path('orders/create/', views.create_order),
]