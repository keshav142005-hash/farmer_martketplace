from django.contrib import admin
from .models import Buyer, Farmer, Crop, Order, Feedback, MandiPrice

admin.site.register(Farmer)
admin.site.register(Crop)
admin.site.register(Buyer)
admin.site.register(Order)
admin.site.register(Feedback)
admin.site.register(MandiPrice)