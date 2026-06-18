import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import requests
from django.core.mail import send_mail
from reportlab.pdfgen import canvas
from django.conf import settings
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from django.http import HttpResponse
from django.db.models import Avg
from django.shortcuts import render, redirect, get_object_or_404
from .forms import BuyerForm, FarmerForm, CropForm, FeedbackForm
from .models import Farmer, Crop, Buyer, Order, Feedback, MandiPrice
from django.contrib import messages

def home(request):
    return render(request, 'home.html')

def farmer_register(request):
    if request.method == 'POST':
        form = FarmerForm(
          request.POST,
          request.FILES )

        if form.is_valid():
            form.save()
            messages.success(
                request,
                "Farmer registered successfully!"
            )

            return redirect('login')   

    else:
        form = FarmerForm()

    return render(
        request,
        'register.html',
        {'form': form}
    )

def farmer_login(request):

    if request.method == "POST":

        email = request.POST['email']
        password = request.POST['password']

        try:
            farmer = Farmer.objects.get(
                email=email,
                password=password
            )

            request.session['farmer_id'] = farmer.id
            request.session['farmer_name'] = farmer.name

            return redirect('dashboard')

        except Farmer.DoesNotExist:
            messages.error(
                request,
                "Invalid Email or Password"
            )

    return render(request,'login.html')


def dashboard(request):

    if 'farmer_id' not in request.session:
        return redirect('login')

    farmer_id = request.session['farmer_id']

    total_crops = Crop.objects.filter(
        farmer_id=farmer_id
    ).count()

    orders = Order.objects.filter(
        crop__farmer_id=farmer_id
    )

    total_orders = orders.count()

    pending_orders = orders.filter(
        status='Pending'
    ).count()

    accepted_orders = orders.filter(
        status='Accepted'
    ).count()

    rejected_orders = orders.filter(
        status='Rejected'
    ).count()

    crops = Crop.objects.filter(
        farmer_id=farmer_id
    )

    prices = []

    for crop in crops:
        prices.append(float(crop.price))

    if prices:

        average_price = round(
            np.mean(prices),
            2
        )

        highest_price = max(prices)

        lowest_price = min(prices)

    else:

        average_price = 0

        highest_price = 0

        lowest_price = 0

    df = pd.DataFrame(
        list(
            orders.values()
        )
    )

    total_dataframe_orders = len(df)

    crop_names = []
    crop_quantities = []

    for crop in crops:

        crop_names.append(
            crop.crop_name
        )

        crop_quantities.append(
            crop.quantity
        )

    # Bar Graph

    if crop_names:

        plt.figure(figsize=(8,5))

        plt.bar(
            crop_names,
            crop_quantities
        )

        plt.title(
            'Crop Quantity Analysis'
        )

        plt.xlabel(
            'Crop Name'
        )

        plt.ylabel(
            'Quantity'
        )

        plt.tight_layout()

        plt.savefig(
            'media/crop_graph.png'
        )

        plt.close()

    # Pie Chart

    if (
        pending_orders +
        accepted_orders +
        rejected_orders
    ) > 0:

        plt.figure(figsize=(5,5))

        plt.pie(
            [
                pending_orders,
                accepted_orders,
                rejected_orders
            ],
            labels=[
                'Pending',
                'Accepted',
                'Rejected'
            ],
            autopct='%1.1f%%'
        )

        plt.title(
            'Order Status Analysis'
        )

        plt.savefig(
            'media/order_pie_chart.png'
        )

        plt.close()

     

    total_revenue = 0

    crop_revenue = {}

    for order in orders:
        if order.status == 'Accepted':
            revenue = (
                order.quantity *
                float(order.crop.price)
            )

            total_revenue += revenue

            crop_name = order.crop.crop_name

            if crop_name not in crop_revenue:
                crop_revenue[crop_name] = 0

            crop_revenue[crop_name] += revenue

    if crop_revenue:
        plt.figure(figsize=(8,5))

        plt.bar(
            crop_revenue.keys(),
            crop_revenue.values()
        )

        plt.title("Revenue Analysis")
        plt.xlabel("Crop Name")
        plt.ylabel("Revenue")
        plt.tight_layout()
        plt.savefig("media/revenue_graph.png")
        plt.close()
    

    recent_feedbacks = Feedback.objects.filter(
    crop__farmer_id=farmer_id
        ).order_by('-id')[:5]    



    if crop_revenue:
        average_revenue = round(
            sum(crop_revenue.values()) / len(crop_revenue),
            2
        )
        highest_revenue_crop = max(crop_revenue, key=crop_revenue.get)
    else:
        average_revenue = 0
        highest_revenue_crop = ''


    recent_orders = Order.objects.filter(
      crop__farmer_id=farmer_id
    ).order_by('-id')[:5]

    weather = get_weather()

    latest_order = Order.objects.filter(
        crop__farmer_id=farmer_id
    ).order_by('-id').first()
 
    
    context = {

        'total_crops': total_crops,

        'total_orders': total_orders,

        'pending_orders': pending_orders,

        'accepted_orders': accepted_orders,

        'rejected_orders': rejected_orders,

        'average_price': average_price,

        'highest_price': highest_price,

        'lowest_price': lowest_price,

        'total_dataframe_orders':
        total_dataframe_orders,

        'graph_image':
        'crop_graph.png',

        'recent_feedbacks':
        recent_feedbacks,

        'total_revenue':
        total_revenue,

       'average_revenue':
        average_revenue,

       'highest_revenue_crop':
        highest_revenue_crop,

        'recent_orders':
        recent_orders,

        'weather': get_weather(),

        'latest_order': latest_order,

        'graph_revenue':
        'revenue_graph.png'
    }

    return render(
        request,
        'dashboard.html',
        context
    )

def farmer_logout(request):

    request.session.flush()

    return redirect('login')



def add_crop(request):

    if 'farmer_id' not in request.session:
        return redirect('login')

    if request.method == 'POST':

        form = CropForm(
            request.POST,
            request.FILES
        )

        if form.is_valid():

            crop = form.save(
                commit=False
            )

            crop.farmer = Farmer.objects.get(
                id=request.session['farmer_id']
            )

            try:

                mandi = MandiPrice.objects.get(
                    crop_name__iexact=crop.crop_name
                )

                crop.market_price = mandi.market_price

            except MandiPrice.DoesNotExist:

                crop.market_price = crop.price

            crop.save()

            return redirect(
                'crop_list'
            )

    else:

        form = CropForm()

    return render(
        request,
        'add_crop.html',
        {
            'form': form
        }
    )

def crop_list(request):

    if 'farmer_id' not in request.session:
        return redirect('login')

    crops = Crop.objects.filter(
        farmer_id=request.session['farmer_id']
    )

    return render(
        request,
        'crop_list.html',
        {'crops': crops}
    )

def edit_crop(request, crop_id):

    crop = get_object_or_404(
        Crop,
        id=crop_id
    )

    if request.method == "POST":

        form = CropForm(
            request.POST,
            request.FILES,
            instance=crop
        )

        if form.is_valid():

            form.save()

            return redirect('crop_list')

    else:

        form = CropForm(instance=crop)

    return render(
        request,
        'edit_crop.html',
        {'form': form}
    )


def delete_crop(request, crop_id):

    crop = Crop.objects.get(
        id=crop_id
    )

    crop.delete()

    return redirect('crop_list')

def buyer_register(request):

    if request.method == 'POST':

        form = BuyerForm(
            request.POST,
            request.FILES
            )

        if form.is_valid():

            form.save()

            messages.success(
                request,
                "Buyer registered successfully!"
            )

            return redirect('buyer_login')

    else:

        form = BuyerForm()

    return render(
        request,
        'buyer_register.html',
        {'form': form}
    )

def buyer_login(request):

    if request.method == 'POST':

        email = request.POST['email']
        password = request.POST['password']

        try:

            buyer = Buyer.objects.get(
                email=email,
                password=password
            )

            request.session['buyer_id'] = buyer.id
            request.session['buyer_name'] = buyer.name

            return redirect('buyer_dashboard')

        except Buyer.DoesNotExist:

            messages.error(
                request,
                'Invalid Email or Password'
            )

    return render(
        request,
        'buyer_login.html'
    )

def marketplace(request):

    crops = Crop.objects.all()

    search = request.GET.get('search')

    if search:

        crops = crops.filter(
            crop_name__icontains=search
        ) | Crop.objects.filter(
            farmer__name__icontains=search
        )

    max_price = request.GET.get('max_price')

    if max_price:
        crops = crops.filter(
            price__lte=max_price
        )

    return render(
        request,
        'marketplace.html',
        {'crops': crops}
    )


def crop_detail(request, crop_id):

    crop = get_object_or_404(
        Crop,
        id=crop_id
    )

    average_rating = Feedback.objects.filter(
        crop=crop
    ).aggregate(
        Avg('rating')
    )['rating__avg']

    feedbacks = Feedback.objects.filter(
        crop=crop
    ).order_by('-id')

    context = {

        'crop': crop,

        'average_rating':
        average_rating,

        'feedbacks':
        feedbacks,
    }

    return render(
        request,
        'crop_detail.html',
        context
    )

def farmer_orders(request):

    orders = Order.objects.filter(
        crop__farmer_id=request.session['farmer_id']
    )

    return render(
        request,
        'farmer_orders.html',
        {'orders': orders}
    )

def place_order(request, crop_id):

    if 'buyer_id' not in request.session:
        return redirect('buyer_login')

    crop = Crop.objects.get(id=crop_id)

    if request.method == 'POST':

        quantity = int(request.POST['quantity'])

        if quantity <= 0:
            return HttpResponse(
                "Quantity must be greater than 0"
            )

        if quantity > crop.quantity:
            return HttpResponse(
                "Not Enough Stock Available"
            )

        buyer = Buyer.objects.get(
            id=request.session['buyer_id']
        )

        Order.objects.create(
            crop=crop,
            buyer=buyer,
            quantity=quantity
        )

        crop.quantity -= quantity
        crop.save()

        try:

            send_mail(
                'New Crop Order',
                f'''
              New Order Received

              Crop : {crop.crop_name}

              Buyer : {buyer.name}

              Quantity : {quantity}

              Status : Pending
                ''',
                settings.EMAIL_HOST_USER,
                [crop.farmer.email],
                fail_silently=True
            )

        except:
            pass

        return redirect(
            'buyer_dashboard'
        )

    return render(
        request,
        'place_order.html',
        {
            'crop': crop
        }
    )


def accept_order(request, order_id):

    order = Order.objects.get(id=order_id)

    order.status = "Accepted"

    order.save()

    return redirect('farmer_orders')


def reject_order(request, order_id):

    order = Order.objects.get(id=order_id)

    order.status = "Rejected"

    order.save()

    return redirect('farmer_orders')



def buyer_orders(request):

    orders = Order.objects.filter(
        buyer_id=request.session['buyer_id']
    )

    return render(
        request,
        'buyer_orders.html',
        {'orders': orders}
    )


def buyer_dashboard(request):

    if 'buyer_id' not in request.session:
        return redirect('buyer_login')

    buyer_id = request.session['buyer_id']

    orders = Order.objects.filter(
        buyer_id=buyer_id
    )

    total_orders = orders.count()

    pending_orders = orders.filter(
        status='Pending'
    ).count()

    accepted_orders = orders.filter(
        status='Accepted'
    ).count()

    rejected_orders = orders.filter(
        status='Rejected'
    ).count()

    total_spent = 0

    for order in orders:

        total_spent += (
            order.quantity *
            float(order.crop.price)
        )

    df = pd.DataFrame(
        list(
            orders.values()
        )
    )

    total_dataframe_orders = len(df)

    crop_names = []

    crop_quantities = []

    for order in orders:

        crop_names.append(
            order.crop.crop_name
        )

        crop_quantities.append(
            order.quantity
        )

    if crop_names:

        plt.figure(figsize=(8,5))

        plt.bar(
            crop_names,
            crop_quantities
        )

        plt.title(
            'Buyer Purchase Analysis'
        )

        plt.xlabel(
            'Crop Name'
        )

        plt.ylabel(
            'Quantity'
        )

        plt.tight_layout()

        plt.savefig(
            'media/buyer_graph.png'
        )

        plt.close()

    if (
      pending_orders +
      accepted_orders +
      rejected_orders
    ) > 0:

        plt.figure(figsize=(5,5))

        plt.pie(
            [
                pending_orders,
                accepted_orders,
                rejected_orders
            ],
            labels=[
                'Pending',
                'Accepted',
                'Rejected'
            ],
            autopct='%1.1f%%'
        )

        plt.title(
            'Buyer Order Status'
        )

        plt.savefig(
            'media/buyer_pie_chart.png'
        )

        plt.close()


    buyer_feedbacks = Feedback.objects.filter(
      buyer_id=buyer_id
    ).order_by('-id')[:5]    

    recent_orders = Order.objects.filter(
      buyer_id=buyer_id
    ).order_by('-id')[:5]
   
    context = {

        'total_orders':
        total_orders,

        'pending_orders':
        pending_orders,

        'accepted_orders':
        accepted_orders,

        'rejected_orders':
        rejected_orders,

        'total_spent':
        total_spent,

        'total_dataframe_orders':
        total_dataframe_orders,

        'graph_image':
        'buyer_graph.png',

        'buyer_feedbacks':
        buyer_feedbacks,

        'recent_orders': recent_orders,
    }

    return render(
        request,
        'buyer_dashboard.html',
        context
    )

def export_excel(request):

    if 'farmer_id' in request.session:

        orders = Order.objects.filter(
            crop__farmer_id=request.session['farmer_id']
        )

        filename = 'farmer_report.xlsx'

        data = []

        for order in orders:

            data.append({

                'Crop':
                order.crop.crop_name,

                'Buyer':
                order.buyer.name,

                'Quantity':
                order.quantity,

                'Status':
                order.status,

                'Price':
                order.crop.price,
            })

    elif 'buyer_id' in request.session:

        orders = Order.objects.filter(
            buyer_id=request.session['buyer_id']
        )

        filename = 'buyer_report.xlsx'

        data = []

        for order in orders:

            data.append({

                'Crop':
                order.crop.crop_name,

                'Farmer':
                order.crop.farmer.name,

                'Quantity':
                order.quantity,

                'Status':
                order.status,

                'Price':
                order.crop.price,
            })

    else:

        return redirect('home')

    df = pd.DataFrame(data)

    response = HttpResponse(
        content_type=
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    response[
        'Content-Disposition'
    ] = f'attachment; filename={filename}'

    df.to_excel(
        response,
        index=False
    )

    return response



def export_pdf(request):

    response = HttpResponse(
        content_type='application/pdf'
    )

    p = canvas.Canvas(response)

    p.setFont(
        "Helvetica",
        14
    )

    y = 800

    if 'farmer_id' in request.session:

        response[
            'Content-Disposition'
        ] = 'attachment; filename="farmer_report.pdf"'

        p.drawString(
            100,
            y,
            "Farmer Report"
        )

        y -= 40

        orders = Order.objects.filter(
            crop__farmer_id=request.session['farmer_id']
        )

        for order in orders:

            text = (
                f"Crop: {order.crop.crop_name} | "
                f"Buyer: {order.buyer.name} | "
                f"Qty: {order.quantity} | "
                f"Status: {order.status}"
            )

            p.drawString(
                40,
                y,
                text
            )

            y -= 25

    elif 'buyer_id' in request.session:

        response[
            'Content-Disposition'
        ] = 'attachment; filename="buyer_report.pdf"'

        p.drawString(
            100,
            y,
            "Buyer Report"
        )

        y -= 40

        orders = Order.objects.filter(
            buyer_id=request.session['buyer_id']
        )

        for order in orders:

            text = (
                f"Crop: {order.crop.crop_name} | "
                f"Farmer: {order.crop.farmer.name} | "
                f"Qty: {order.quantity} | "
                f"Status: {order.status}"
            )

            p.drawString(
                40,
                y,
                text
            )

            y -= 25

    else:

        return redirect('home')

    p.save()

    return response


def add_feedback(request, crop_id):

    if 'buyer_id' not in request.session:
        return redirect('buyer_login')

    crop = Crop.objects.get(
        id=crop_id
    )

    if request.method == 'POST':

        form = FeedbackForm(
            request.POST
        )

        if form.is_valid():

            feedback = form.save(
                commit=False
            )

            feedback.crop = crop

            feedback.buyer = Buyer.objects.get(
                id=request.session['buyer_id']
            )

            feedback.save()

            return redirect(
                'marketplace'
            )

    else:

        form = FeedbackForm()

    return render(
        request,
        'add_feedback.html',
        {'form': form}
    )


def farmer_profile(request):

    if 'farmer_id' not in request.session:
        return redirect('login')

    farmer = Farmer.objects.get(
        id=request.session['farmer_id']
    )

    total_crops = Crop.objects.filter(
        farmer=farmer
    ).count()

    total_orders = Order.objects.filter(
        crop__farmer=farmer
    ).count()

    total_revenue = 0

    accepted_orders = Order.objects.filter(
        crop__farmer=farmer,
        status='Accepted'
    )

    for order in accepted_orders:

        total_revenue += (
            order.quantity *
            order.crop.price
        )

    context = {

        'farmer': farmer,

        'total_crops': total_crops,

        'total_orders': total_orders,

        'total_revenue': total_revenue,
    }

    return render(
        request,
        'farmer_profile.html',
        context
    )


def edit_profile(request):

    if 'farmer_id' not in request.session:
        return redirect('login')

    farmer = Farmer.objects.get(
        id=request.session['farmer_id']
    )

    if request.method == 'POST':

        form = FarmerForm(
            request.POST,
            request.FILES,
            instance=farmer
        )

        if form.is_valid():

            form.save()

            return redirect(
                'farmer_profile'
            )

    else:

        form = FarmerForm(
            instance=farmer
        )

    return render(
        request,
        'edit_profile.html',
        {'form': form}
    )


def buyer_profile(request):

    if 'buyer_id' not in request.session:
        return redirect(
            'buyer_login'
        )

    buyer = Buyer.objects.get(
        id=request.session['buyer_id']
    )

    return render(
        request,
        'buyer_profile.html',
        {
            'buyer': buyer
        }
    )

def edit_buyer_profile(request):

    if 'buyer_id' not in request.session:
        return redirect(
            'buyer_login'
        )

    buyer = Buyer.objects.get(
        id=request.session['buyer_id']
    )

    if request.method == 'POST':

        form = BuyerForm(
            request.POST,
            request.FILES,
            instance=buyer
        )

        if form.is_valid():

            form.save()

            return redirect(
                'buyer_profile'
            )

    else:

        form = BuyerForm(
            instance=buyer
        )

    return render(
        request,
        'edit_buyer_profile.html',
        {'form': form}
    )

def get_weather():

    city = "Patna"

    url = (
        f"https://api.openweathermap.org/data/2.5/weather"
        f"?q={city}"
        f"&appid={settings.WEATHER_API_KEY}"
        f"&units=metric"
    )

    try:

        response = requests.get(url)

        data = response.json()

        return {

            "temp":
            data["main"]["temp"],

            "humidity":
            data["main"]["humidity"],

            "weather":
            data["weather"][0]["description"]
        }

    except:

        return {

            "temp": 0,
            "humidity": 0,
            "weather": "Unavailable"
        }


def download_invoice(request, order_id):

    if 'buyer_id' not in request.session:
        return redirect('buyer_login')

    order = Order.objects.get(
        id=order_id
    )

    response = HttpResponse(
        content_type='application/pdf'
    )

    response[
        'Content-Disposition'
    ] = f'attachment; filename=invoice_{order.id}.pdf'

    p = canvas.Canvas(response)

    p.setFont(
        "Helvetica-Bold",
        18
    )

    p.drawString(
        180,
        800,
        "Farmer Marketplace"
    )

    p.setFont(
        "Helvetica",
        14
    )

    p.drawString(
        240,
        770,
        "Invoice"
    )

    p.line(
        50,
        750,
        550,
        750
    )

    p.drawString(
        50,
        700,
        f"Invoice ID : {order.id}"
    )

    p.drawString(
        50,
        670,
        f"Buyer : {order.buyer.name}"
    )

    p.drawString(
        50,
        640,
        f"Farmer : {order.crop.farmer.name}"
    )

    p.drawString(
        50,
        610,
        f"Crop : {order.crop.crop_name}"
    )

    p.drawString(
        50,
        580,
        f"Quantity : {order.quantity}"
    )

    p.drawString(
        50,
        550,
        f"Price Per Unit : ₹{order.crop.price}"
    )

    total = (
        order.quantity *
        float(order.crop.price)
    )

    p.drawString(
        50,
        520,
        f"Total Amount : ₹{total}"
    )

    p.drawString(
        50,
        490,
        f"Status : {order.status}"
    )

    p.drawString(
        50,
        460,
        f"Order Date : {order.order_date}"
    )

    p.save()

    return response


def cancel_order(request, order_id):

    order = Order.objects.get(id=order_id)

    if order.status == "Pending":
        order.delete()

    return redirect('buyer_orders')


def about(request):

    return render(
        request,
        'about.html'
    )


def contact(request):

    return render(
        request,
        'contact.html'
    )