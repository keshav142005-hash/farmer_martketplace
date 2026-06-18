from django import forms
from .models import Farmer, Crop, Buyer, Order, Feedback


class FarmerForm(forms.ModelForm):

    class Meta:
        model = Farmer
        fields = [
            'name',
            'email',
            'phone',
            'profile_pic',
            'address',
            'password'
        ]


class CropForm(forms.ModelForm):

    class Meta:
        model = Crop
        fields = [
            'crop_name',
            'quantity',
            'price',
            'description',
            'image'
        ]


class BuyerForm(forms.ModelForm):

    class Meta:
        model = Buyer
        fields = [
            'name',
            'email',
            'phone',
            'profile_pic',
            'address',
            'password'
        ]


class OrderForm(forms.ModelForm):

    class Meta:
        model = Order
        fields = [
            'quantity'
        ]


class FeedbackForm(forms.ModelForm):

    class Meta:
        model = Feedback
        fields = [
            'rating',
            'comment'
        ]