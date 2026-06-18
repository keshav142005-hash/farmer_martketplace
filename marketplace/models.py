from django.db import models

class Farmer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    profile_pic = models.ImageField(
    upload_to='farmers/',
    default='farmers/default.png',
    blank=True)
    address = models.TextField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Crop(models.Model):

    farmer = models.ForeignKey(
        Farmer,
        on_delete=models.CASCADE
    )

    crop_name = models.CharField(
        max_length=100
    )

    quantity = models.IntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    market_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )

    description = models.TextField()

    image = models.ImageField(
        upload_to='crops/'
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.crop_name


class Buyer(models.Model):

    name = models.CharField(max_length=100)

    email = models.EmailField(unique=True)

    phone = models.CharField(max_length=15)

    profile_pic = models.ImageField(
        upload_to='buyers/',
        default='buyers/default.png',
        blank=True
    )

    address = models.TextField()

    password = models.CharField(max_length=100)

    def __str__(self):
        return self.name



class Order(models.Model):

    crop = models.ForeignKey(
        Crop,
        on_delete=models.CASCADE
    )

    buyer = models.ForeignKey(
        Buyer,
        on_delete=models.CASCADE
    )

    quantity = models.IntegerField()

    status = models.CharField(
        max_length=20,
        default='Pending'
    )

    order_date = models.DateTimeField(
        auto_now_add=True
    )

    cancel_reason = models.TextField(
     blank=True,
     null=True
    )

    def __str__(self):
        return f"{self.buyer.name} - {self.crop.crop_name}"    

    

class Feedback(models.Model):

    crop = models.ForeignKey(
        Crop,
        on_delete=models.CASCADE
    )

    buyer = models.ForeignKey(
        Buyer,
        on_delete=models.CASCADE
    )

    rating = models.IntegerField()

    comment = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.crop.crop_name    


class MandiPrice(models.Model):

    crop_name = models.CharField(max_length=100)

    market_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.crop_name    