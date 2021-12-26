from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Author(models.Model):
    user= models.OneToOneField(User,default=None,on_delete=models.CASCADE)
    birth_date = models.DateField('Date of birth')
    bio = models.TextField(max_length=500, blank=True,null=True) 
    photo=models.ImageField(default='default.png', blank=True)
    def __str__(self):
        return f'{self.user.username}'
    class Meta:
        ordering=['user']